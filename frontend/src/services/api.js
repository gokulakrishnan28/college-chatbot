// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getLLMResponse = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, { 
            message: message 
        });
        
        if (response.data.success) {
            return response.data.response;
        } else {
            throw new Error('Failed to get response');
        }
    } catch (error) {
        console.error('API Error:', error);
        // Fallback response if backend is down
        return "I'm having trouble connecting to the server. Please make sure the backend is running.";
    }
};

// Health check
export const checkBackendHealth = async () => {
    try {
        const response = await axios.get(`${API_URL}/health`);
        return response.data;
    } catch (error) {
        return { status: 'offline' };
    }
};