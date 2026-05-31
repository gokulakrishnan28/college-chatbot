// backend/server.js
const express = require('express');
const cors = require('cors');
const { getLLMResponse } = require('./llm/model');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('📨 Received:', message);
        
        const response = await getLLMResponse(message);
        
        res.json({ 
            success: true, 
            response: response 
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.json({ 
            success: true, 
            response: "I'm having trouble processing your request. Please try again." 
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'LLM Server Running' });
});

app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
});