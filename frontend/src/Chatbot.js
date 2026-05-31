// src/components/Chatbot.js
// src/components/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { getLLMResponse } from '../services/api';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isTyping) return;

    // Add user message
    const userMessage = { 
      text: inputMessage.trim(), 
      sender: 'user', 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and set typing state
    const userInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get LLM response
      const llmResponse = await getLLMResponse(userInput);
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        // Add bot message
        const botMessage = { 
          text: llmResponse, 
          sender: 'bot', 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      console.error('LLM Error:', error);
      const errorMessage = { 
        text: "I'm having trouble connecting right now. Please try again in a moment.", 
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when first opening
      setTimeout(() => {
        setMessages([{
          text: "Hello! I'm your SSMIET assistant. How can I help you today?",
          sender: 'bot',
          timestamp: new Date()
        }]);
      }, 500);
    }
  };

  const handleQuickAction = (action) => {
    const quickMessages = {
      courses: "What courses does SSMIET offer?",
      admissions: "Tell me about the admission process",
      fees: "What is the fee structure?",
      placements: "What are the placement opportunities?",
      contact: "What are the contact details?"
    };
    
    setInputMessage(quickMessages[action]);
    // Auto-send the quick action message
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="chatbot-container">
      {/* Chat Toggle Button */}
      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        <span className="toggle-btn-icon">💬</span>
        <span className="toggle-btn-text">Chat with us</span>
      </button>

      {/* Chat Popup */}
      <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-left">
            <div className="college-logo">SSM</div>
            <div className="header-info">
              <div className="college-name">SSMIET Assistant</div>
              <div className="status">
                <div className={`online-dot ${isTyping ? 'offline' : 'online'}`}></div>
                <span>{isTyping ? 'Typing...' : 'Online'}</span>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChat}>×</button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            className="quick-action-btn" 
            onClick={() => handleQuickAction('courses')}
            disabled={isTyping}
          >
            <span className="action-icon">📚</span>
            Courses
          </button>
          <button 
            className="quick-action-btn" 
            onClick={() => handleQuickAction('admissions')}
            disabled={isTyping}
          >
            <span className="action-icon">🎓</span>
            Admissions
          </button>
          <button 
            className="quick-action-btn" 
            onClick={() => handleQuickAction('fees')}
            disabled={isTyping}
          >
            <span className="action-icon">💰</span>
            Fees
          </button>
          <button 
            className="quick-action-btn" 
            onClick={() => handleQuickAction('placements')}
            disabled={isTyping}
          >
            <span className="action-icon">💼</span>
            Placements
          </button>
        </div>

        {/* Messages Area */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-container">
          <div className="chat-input-form">
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                disabled={isTyping}
              />
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                ➤
              </button>
            </div>
          </div>
          <div className="chat-footer">
            <div className="language-indicator">English</div>
            <div className="powered-by">
              Powered by SSMIET AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;