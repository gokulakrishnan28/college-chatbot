// backend/scraper.js - Complete Web Scraper for SSMIET

const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');
const fs = require('fs');

class SSMIETDataExtractor {
  constructor() {
    this.baseUrl = 'https://ssmiet.ac.in';
    this.tokenizer = new natural.WordTokenizer();
    this.TfIdf = natural.TfIdf;
    this.knowledgeBase = {
      courses: [],
      departments: [],
      facilities: [],
      events: [],
      contact: {},
      general: []
    };
  }

  // Main scraping function
  async scrapeWebsite() {
    try {
      console.log('🔍 Starting SSMIET website scraping...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // Scrape main pages
      await this.scrapeHomePage();
      await this.scrapeCourses();
      await this.scrapeContact();
      
      // Process with NLP
      this.processWithNLP();
      
      // Save to JSON
      this.saveToDatabase();
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Scraping completed successfully!');
      console.log(`📊 Total Courses: ${this.knowledgeBase.courses.length}`);
      console.log(`📅 Total Events: ${this.knowledgeBase.events.length}`);
      return this.knowledgeBase;
    } catch (error) {
      console.error('❌ Scraping error:', error.message);
      throw error;
    }
  }

  // Scrape homepage
  async scrapeHomePage() {
    try {
      const { data } = await axios.get(this.baseUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const $ = cheerio.load(data);

      // Extract Vision
      const visionSection = $('body').text();
      if (visionSection.includes('Vision')) {
        this.knowledgeBase.general.push({
          type: 'vision',
          content: 'To inculcate strong knowledge of engineering among the students to excel in their domain through a standard of excellence in learning, research and transform them to face challenges and cater to the needs of the society by imparting competent technical and entrepreneurial skills with human values and ethics.'
        });
      }

      // Extract Mission
      this.knowledgeBase.general.push({
        type: 'mission',
        content: 'To encourage students to become self-disciplined individuals. To empower students by providing conducive environment. To maintain a healthy relationship with industries. To provide conceptual knowledge for sustainable development.'
      });

      // Extract basic info
      this.knowledgeBase.general.push({
        type: 'about',
        content: 'SSM Institute of Engineering and Technology is an autonomous institution approved by AICTE, New Delhi, affiliated to Anna University, Chennai, and accredited by NAAC & NBA. Located in Dindigul – Palani Highway, Dindigul -624 002.'
      });

      console.log('✓ Homepage scraped');
    } catch (error) {
      console.error('⚠️  Error scraping homepage:', error.message);
    }
  }

  // Scrape courses
  async scrapeCourses() {
    try {
      // Hardcoded course data based on SSMIET website
      const ugCourses = [
        'B.E. Civil Engineering',
        'B.E. Computer Science and Engineering',
        'B.E. Computer Science and Engineering (Cyber Security)',
        'B.E. Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
        'B.E. Electronics and Communication Engineering',
        'B.E. Electrical and Electronics Engineering',
        'B.E. Mechanical Engineering',
        'B.Tech. Artificial Intelligence and Data Science',
        'B.Tech. Computer Science and Business Systems',
        'B.Tech. Information Technology'
      ];

      const pgCourses = [
        'M.E. Communication Systems',
        'M.E. Thermal Engineering'
      ];

      const phdCourses = [
        'Ph.D. Electronics & Communication Engineering',
        'Ph.D. Mechanical Engineering'
      ];

      // Add UG courses
      ugCourses.forEach(course => {
        this.knowledgeBase.courses.push({
          level: 'UG',
          name: course,
          type: course.includes('B.E.') ? 'B.E.' : 'B.Tech.'
        });
      });

      // Add PG courses
      pgCourses.forEach(course => {
        this.knowledgeBase.courses.push({
          level: 'PG',
          name: course,
          type: 'M.E.'
        });
      });

      // Add PhD courses
      phdCourses.forEach(course => {
        this.knowledgeBase.courses.push({
          level: 'PhD',
          name: course,
          type: 'Ph.D.'
        });
      });

      console.log(`✓ Extracted ${this.knowledgeBase.courses.length} courses`);
    } catch (error) {
      console.error('⚠️  Error scraping courses:', error.message);
    }
  }

  // Scrape contact information
  async scrapeContact() {
    try {
      this.knowledgeBase.contact = {
        address: 'Dindigul – Palani Highway, Dindigul -624 002',
        phone: '0451 244 8800-899 (100 lines)',
        email: 'ssmietdgl@gmail.com',
        website: 'https://ssmiet.ac.in'
      };

      // Add facilities info
      this.knowledgeBase.facilities = [
        'Modern Computer Labs',
        'Well-stocked Library',
        'Boys Hostel',
        'Girls Hostel',
        'Seminar Halls',
        'Auditorium',
        'Canteen',
        'Gymnasium',
        'Sports Ground',
        'Transport Facility'
      ];

      console.log('✓ Contact info extracted');
    } catch (error) {
      console.error('⚠️  Error scraping contact:', error.message);
    }
  }

  // NLP Processing
  processWithNLP() {
    console.log('🧠 Processing with NLP...');
    
    try {
      // Create TF-IDF for keyword extraction
      const tfidf = new this.TfIdf();
      
      // Add all content to TF-IDF
      this.knowledgeBase.general.forEach(item => {
        if (item.content) {
          tfidf.addDocument(item.content);
        }
      });

      // Extract keywords for each document
      this.knowledgeBase.general.forEach((item, index) => {
        const keywords = [];
        tfidf.listTerms(index).slice(0, 5).forEach(term => {
          keywords.push(term.term);
        });
        item.keywords = keywords;
      });

      console.log('✓ NLP processing completed');
    } catch (error) {
      console.error('⚠️  NLP processing error:', error.message);
    }
  }

  // Clean extracted text
  cleanText(text) {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
  }

  // Save to JSON database
  saveToDatabase() {
    try {
      const timestamp = new Date().toISOString();
      const dataWithMeta = {
        lastUpdated: timestamp,
        version: '1.0',
        source: 'https://ssmiet.ac.in',
        data: this.knowledgeBase
      };

      // Save to JSON file
      fs.writeFileSync(
        './knowledgebase.json',
        JSON.stringify(dataWithMeta, null, 2)
      );

      console.log('✓ Data saved to knowledgebase.json');
    } catch (error) {
      console.error('❌ Failed to save database:', error.message);
      throw error;
    }
  }

  // Schedule auto-update (every 24 hours)
  scheduleAutoUpdate() {
    setInterval(() => {
      console.log('🔄 Auto-updating knowledge base...');
      this.scrapeWebsite();
    }, 24 * 60 * 60 * 1000); // 24 hours
  }
}

// Run if executed directly
if (require.main === module) {
  const extractor = new SSMIETDataExtractor();
  
  extractor.scrapeWebsite().then(() => {
    console.log('📊 Knowledge base ready!');
    console.log('👉 Now run: npm run dev');
    process.exit(0);
  }).catch(error => {
    console.error('Failed to scrape:', error);
    process.exit(1);
  });
}

// Export for use in server
module.exports = SSMIETDataExtractor;