import React from 'react';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
    return (
        <div className="chatbot-widget">
            <div className="chatbot-header">
                <h3>SSMIET Assistant</h3>
                <button className="close-btn">×</button>
            </div>
            <div className="chatbot-body">
                {/* Chat messages will go here */}
            </div>
            <div className="chatbot-input">
                <input type="text" placeholder="Ask me about SSMIET..." />
                <button>Send</button>
            </div>
        </div>
    );
};

export default ChatbotWidget;