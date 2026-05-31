import axios from 'axios';
import * as cheerio from 'cheerio';
import natural from 'natural';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';

export class WebsiteLearner {
    constructor() {
        this.websiteData = [];
        this.sentenceEncoder = null;
        this.tfidf = new natural.TfIdf();
        this.tokenizer = new natural.WordTokenizer();
        this.stemmer = natural.PorterStemmer;
        this.learnedKnowledge = new Map();
    }

    // Initialize TensorFlow.js sentence encoder
    async initializeEncoder() {
        if (!this.sentenceEncoder) {
            this.sentenceEncoder = await UniversalSentenceEncoder.load();
            console.log('Sentence encoder loaded');
        }
    }

    // Extract content from website URL
    async learnFromURL(url, maxPages = 10) {
        try {
            console.log(`Learning from: ${url}`);
            
            const visited = new Set();
            const toVisit = [url];
            const learnedData = [];

            while (toVisit.length > 0 && learnedData.length < maxPages) {
                const currentUrl = toVisit.shift();
                
                if (visited.has(currentUrl)) continue;
                visited.add(currentUrl);

                try {
                    const pageData = await this.extractPageContent(currentUrl);
                    learnedData.push(pageData);

                    // Extract and add new links to visit
                    const newLinks = this.extractInternalLinks(pageData.content, url);
                    newLinks.forEach(link => {
                        if (!visited.has(link) && !toVisit.includes(link)) {
                            toVisit.push(link);
                        }
                    });

                    console.log(`✓ Learned from: ${currentUrl}`);
                } catch (error) {
                    console.log(`✗ Failed to learn from: ${currentUrl}`, error.message);
                }
            }

            this.websiteData = learnedData;
            await this.processLearnedData();
            return learnedData;
        } catch (error) {
            console.error('Error learning from website:', error);
            return [];
        }
    }

    // Extract content from a single page
    async extractPageContent(url) {
        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SSMIET-Chatbot/1.0)'
            }
        });

        const $ = cheerio.load(response.data);
        
        // Remove unwanted elements
        $('script, style, nav, footer, header').remove();

        // Extract structured content
        const pageData = {
            url: url,
            title: $('title').text().trim(),
            headings: [],
            paragraphs: [],
            links: [],
            metadata: {}
        };

        // Extract headings
        $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
            const text = $(elem).text().trim();
            if (text) pageData.headings.push({
                level: elem.name,
                text: text
            });
        });

        // Extract paragraphs with meaningful content
        $('p').each((i, elem) => {
            const text = $(elem).text().trim();
            if (text && text.length > 20) {
                pageData.paragraphs.push(text);
            }
        });

        // Extract links
        $('a[href]').each((i, elem) => {
            const text = $(elem).text().trim();
            const href = $(elem).attr('href');
            if (text && href) {
                pageData.links.push({ text, href });
            }
        });

        // Extract metadata
        pageData.metadata = {
            description: $('meta[name="description"]').attr('content') || '',
            keywords: $('meta[name="keywords"]').attr('content') || ''
        };

        // Combine all content for full text
        pageData.content = this.combineContent(pageData);
        
        return pageData;
    }

    // Combine extracted content into meaningful text
    combineContent(pageData) {
        const contentParts = [];

        // Add title
        if (pageData.title) contentParts.push(pageData.title);

        // Add headings
        pageData.headings.forEach(heading => {
            contentParts.push(heading.text);
        });

        // Add paragraphs
        contentParts.push(...pageData.paragraphs);

        return contentParts.join('\n');
    }

    // Extract internal links from content
    extractInternalLinks(content, baseUrl) {
        const links = [];
        const urlPattern = /https?:\/\/[^\s]+/g;
        const matches = content.match(urlPattern) || [];

        matches.forEach(match => {
            if (match.includes(baseUrl)) {
                links.push(match);
            }
        });

        return links;
    }

    // Process learned data for efficient retrieval
    async processLearnedData() {
        await this.initializeEncoder();

        // Build TF-IDF model
        this.websiteData.forEach(page => {
            const tokens = this.tokenizer.tokenize(page.content.toLowerCase());
            const stemmedTokens = tokens.map(token => this.stemmer.stem(token));
            this.tfidf.addDocument(stemmedTokens.join(' '));
        });

        // Generate embeddings for each page
        for (const page of this.websiteData) {
            const embedding = await this.sentenceEncoder.embed([page.content]);
            page.embedding = await embedding.array();
        }

        console.log(`Processed ${this.websiteData.length} pages`);
    }

    // Semantic search using embeddings
    async semanticSearch(query, topK = 3) {
        await this.initializeEncoder();

        const queryEmbedding = await this.sentenceEncoder.embed([query]);
        const queryVector = await queryEmbedding.array();

        const similarities = this.websiteData.map(page => {
            const similarity = this.cosineSimilarity(queryVector[0], page.embedding[0]);
            return { page, similarity };
        });

        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK)
            .filter(item => item.similarity > 0.3);
    }

    // Keyword search using TF-IDF
    keywordSearch(query, topK = 3) {
        const queryTokens = this.tokenizer.tokenize(query.toLowerCase());
        const stemmedQuery = queryTokens.map(token => this.stemmer.stem(token)).join(' ');

        const scores = [];
        this.tfidf.tfidfs(stemmedQuery, (i, measure) => {
            scores.push({ index: i, score: measure });
        });

        return scores
            .sort((a, b) => b.score - a.score)
            .slice(0, topK)
            .map(score => this.websiteData[score.index]);
    }

    // Hybrid search combining semantic and keyword
    async hybridSearch(query, topK = 3) {
        const [semanticResults, keywordResults] = await Promise.all([
            this.semanticSearch(query, topK),
            Promise.resolve(this.keywordSearch(query, topK))
        ]);

        // Combine and deduplicate results
        const allResults = new Map();

        semanticResults.forEach(result => {
            allResults.set(result.page.url, {
                ...result.page,
                score: result.similarity,
                type: 'semantic'
            });
        });

        keywordResults.forEach(page => {
            if (!allResults.has(page.url)) {
                allResults.set(page.url, {
                    ...page,
                    score: page.score || 0.5,
                    type: 'keyword'
                });
            }
        });

        return Array.from(allResults.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }

    // Calculate cosine similarity
    cosineSimilarity(vecA, vecB) {
        const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
        const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
        const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
        
        return dotProduct / (normA * normB);
    }

    // Get learned knowledge statistics
    getStatistics() {
        return {
            totalPages: this.websiteData.length,
            totalContent: this.websiteData.reduce((sum, page) => sum + page.content.length, 0),
            averageContentLength: this.websiteData.reduce((sum, page) => sum + page.content.length, 0) / this.websiteData.length,
            uniqueHeadings: new Set(this.websiteData.flatMap(page => page.headings.map(h => h.text))).size
        };
    }
}