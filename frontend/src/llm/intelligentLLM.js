import { getFacultyInfo } from './knowledgeBase.js';

export const processWithLLM = async (query, conversationHistory) => {
  try {
    // Enhance LLM prompt with knowledge base context
    const kbContext = getRelevantKnowledgeContext(query);
    
    const prompt = `
      Context from knowledge base: ${kbContext}
      
      Conversation history: ${JSON.stringify(conversationHistory.slice(-5))}
      
      User question: ${query}
      
      Please provide a helpful response based on the context above. If the context doesn't contain relevant information, use your general knowledge but indicate this is not from our official knowledge base.
    `;

    // Call your LLM API here
    const response = await callYourLLMAPI(prompt);
    return response;
  } catch (error) {
    console.error('Error in LLM processing:', error);
    throw error;
  }
};

const getRelevantKnowledgeContext = (query) => {
  // Get top 3 most relevant knowledge base entries
  const relevantEntries = knowledgeBase.entries
    .filter(entry => 
      entry.keywords.some(keyword => 
        query.toLowerCase().includes(keyword.toLowerCase())
      )
    )
    .slice(0, 3)
    .map(entry => `Q: ${entry.question} A: ${entry.answer}`)
    .join('\n\n');

  return relevantEntries || 'No specific context found in knowledge base.';
};