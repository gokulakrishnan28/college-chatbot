// src/llm/gemmaLLM.js

import { intelligentLLM } from './intelligentLLM.js';
class GemmaLLM {
  constructor() {
    this.generator = null;
    this.isInitialized = false;
    this.initializationPromise = null;
  }

  async initialize() {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        console.log('🔄 Initializing Gemma-2B model...');
        
        // Use a lighter model for faster initialization
        this.generator = await (
          'text2text-generation',
          'Xenova/LaMini-Flan-T5-783M', // Lightweight alternative
          {
            quantized: true,
            progress_callback: (data) => {
              console.log(`📦 Loading: ${data.status} - ${data.file}`);
            }
          }
        );
        
        this.isInitialized = true;
        console.log('✅ Gemma LLM initialized successfully');
      } catch (error) {
        console.error('❌ Gemma initialization failed:', error);
        // Fallback to knowledgebase-only mode
        this.isInitialized = false;
      }
    })();

    return this.initializationPromise;
  }

  async processMessage(message) {
    // Always try knowledgebase first (fastest)
    const kbResponse = await intelligentLLM.processMessage(message);
    
    // If knowledgebase provided a good response, use it
    if (this.isConfidentResponse(kbResponse)) {
      return kbResponse;
    }

    // If Gemma is available and initialized, use it for enhancement
    if (this.isInitialized && this.generator) {
      try {
        const enhancedResponse = await this.enhanceWithGemma(message, kbResponse);
        return enhancedResponse;
      } catch (error) {
        console.warn('⚠️ Gemma enhancement failed, using knowledgebase:', error);
        return kbResponse;
      }
    }

    // Fallback to knowledgebase response
    return kbResponse;
  }

  async enhanceWithGemma(userMessage, kbResponse) {
    const prompt = this.createSSMIETPrompt(userMessage, kbResponse);
    
    const response = await this.generator(prompt, {
      max_new_tokens: 100,
      temperature: 0.3, // Low temperature for consistent responses
      repetition_penalty: 1.1,
      do_sample: true,
    });

    return this.cleanGemmaResponse(response[0].generated_text);
  }

  createSSMIETPrompt(userMessage, kbResponse) {
    return `You are SSMIET College Assistant. Provide helpful, accurate information about SSM Institute of Engineering and Technology.

Context: ${kbResponse}

User Question: ${userMessage}

Assistant Response:`;
  }

  cleanGemmaResponse(response) {
    // Remove any prompt remnants and clean up the response
    return response
      .replace(/Assistant Response:/g, '')
      .replace(/Context:.*?User Question:.*?/gs, '')
      .replace(/You are SSMIET College Assistant\./g, '')
      .trim()
      .split('\n')[0]; // Take only the first line
  }

  isConfidentResponse(response) {
    const weakIndicators = [
      "I'm still learning",
      "That's an interesting question",
      "Could you try asking",
      "I'm specialized in SSMIET information",
      "As your SSMIET assistant"
    ];
    
    return !weakIndicators.some(indicator => response.includes(indicator));
  }

  // Memory management
  async cleanup() {
    if (this.generator) {
      try {
        // Clear model from memory
        this.generator = null;
        this.isInitialized = false;
        this.initializationPromise = null;
        
        // Force garbage collection if available
        if (global.gc) {
          global.gc();
        }
        
        console.log('🧹 Gemma LLM cleaned up');
      } catch (error) {
        console.warn('Cleanup warning:', error);
      }
    }
  }
}

// Singleton instance
export const gemmaLLM = new GemmaLLM();