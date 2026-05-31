import { getFacultyInfo } from './knowledgeBase.js';

// Simple keyword-based search
export const searchKnowledgeBase = (query) => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  console.log('Searching knowledge base for:', lowercaseQuery);
  console.log('Knowledge base entries:', knowledgeBase.entries.length);

  // Find matching entries
  const matches = knowledgeBase.entries.filter(entry => {
    // Check question
    if (entry.question.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    
    // Check keywords
    if (entry.keywords && entry.keywords.some(keyword => 
        lowercaseQuery.includes(keyword.toLowerCase()))) {
      return true;
    }
    
    // Check answer (optional)
    if (entry.answer.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    
    return false;
  });

  console.log('Found matches:', matches.length);
  
  if (matches.length > 0) {
    // Return the best match (you can enhance this with scoring)
    return {
      found: true,
      answer: matches[0].answer,
      source: 'knowledge_base',
      confidence: 'high'
    };
  }
  
  return {
    found: false,
    answer: null,
    source: 'knowledge_base', 
    confidence: 'low'
  };
};

// Enhanced search with multiple matches
export const searchKnowledgeBaseEnhanced = (query) => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  const matches = knowledgeBase.entries.map(entry => {
    let score = 0;
    
    // Score based on question match
    if (entry.question.toLowerCase().includes(lowercaseQuery)) {
      score += 3;
    }
    
    // Score based on keyword matches
    if (entry.keywords) {
      entry.keywords.forEach(keyword => {
        if (lowercaseQuery.includes(keyword.toLowerCase())) {
          score += 2;
        }
      });
    }
    
    // Score based on answer match
    if (entry.answer.toLowerCase().includes(lowercaseQuery)) {
      score += 1;
    }
    
    return { ...entry, score };
  }).filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return matches;
};