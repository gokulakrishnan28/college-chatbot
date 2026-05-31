// src/components/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { getLLMResponse } from '../services/api';
import './Chatbot.css';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [currentTypingText, setCurrentTypingText] = useState('');
    const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
    const messagesEndRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const inputRef = useRef(null);

    // Toggle chat visibility
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Keep cursor in input bar always
    useEffect(() => {
        if (isChatOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isChatOpen, isTyping]);

    // SLOWER Typewriter effect - changed from 30ms to 80ms and from +10 to +3
    useEffect(() => {
        if (isTyping && currentTypingText && currentTypingIndex < currentTypingText.length) {
            const timer = setTimeout(() => {
                // Add fewer characters at a time (3 instead of 10) for slower appearance
                setCurrentTypingIndex(prev => prev + 3);
                // Scroll during typing
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ 
                        behavior: "smooth",
                        block: "end"
                    });
                }
            }, 40); // Increased from 30ms to 80ms for slower typing
            return () => clearTimeout(timer);
        } else if (isTyping && currentTypingIndex >= currentTypingText.length) {
            setIsTyping(false);
            // Final scroll when typing completes
            setTimeout(() => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ 
                        behavior: "smooth",
                        block: "end"
                    });
                }
            }, 50);
        }
    }, [isTyping, currentTypingText, currentTypingIndex]);

    // Auto-scroll to bottom for new messages
    const scrollToBottom = () => {
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ 
                    behavior: "smooth",
                    block: "end"
                });
            }
        }, 100);
    };

    // Scroll when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize with welcome message when chat opens
    useEffect(() => {
        if (isChatOpen && messages.length === 0) {
            const welcomeMessage = {
                text: "Hello! Welcome to SSMIET Assistant!\n\nI'm here to help you with information about:\n• Courses & Programs\n• Admissions Process\n• Fee Structure\n• Placement Information\n• Campus Facilities\n\nWhat would you like to know today?",
                sender: 'bot',
                timestamp: new Date(),
                isTyped: true
            };
            setMessages([welcomeMessage]);
        }
    }, [isChatOpen]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        // Add user message
        const userMessage = { 
            text: input, 
            sender: 'user', 
            timestamp: new Date(),
            isTyped: true
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Get AI response
            const aiResponse = await getLLMResponse(input);
            
            // Add bot message placeholder
            const botMessage = { 
                text: '', 
                sender: 'bot', 
                timestamp: new Date(),
                isTyped: false,
                fullText: aiResponse
            };
            setMessages(prev => [...prev, botMessage]);
            
            // Start SLOWER typewriter effect
            setCurrentTypingText(aiResponse);
            setCurrentTypingIndex(0);
            setIsTyping(true);
            
            // Keep focus on input
            if (inputRef.current) {
                inputRef.current.focus();
            }
            
        } catch (error) {
            console.error('Error getting response:', error);
            const errorMessage = { 
                text: "Sorry, I encountered an error. Please try again.", 
                sender: 'bot',
                timestamp: new Date(),
                isTyped: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // UPDATED: One-click quick action
    const handleQuickAction = async (query) => {
        if (isLoading || isTyping) return;
        
        // Add user message immediately
        const userMessage = { 
            text: query, 
            sender: 'user', 
            timestamp: new Date(),
            isTyped: true
        };
        setMessages(prev => [...prev, userMessage]);
        
        setIsLoading(true);
        
        try {
            // Get AI response
            const aiResponse = await getLLMResponse(query);
            
            // Add bot message placeholder
            const botMessage = { 
                text: '', 
                sender: 'bot', 
                timestamp: new Date(),
                isTyped: false,
                fullText: aiResponse
            };
            setMessages(prev => [...prev, botMessage]);
            
            // Start SLOWER typewriter effect
            setCurrentTypingText(aiResponse);
            setCurrentTypingIndex(0);
            setIsTyping(true);
            
            // Keep focus on input
            if (inputRef.current) {
                inputRef.current.focus();
            }
            
        } catch (error) {
            console.error('Error getting response:', error);
            const errorMessage = { 
                text: "Sorry, I encountered an error. Please try again.", 
                sender: 'bot',
                timestamp: new Date(),
                isTyped: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Update the message with typed text
    useEffect(() => {
        if (isTyping && currentTypingText) {
            const displayedText = currentTypingText.substring(0, currentTypingIndex);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.sender === 'bot' && !lastMessage.isTyped) {
                    lastMessage.text = displayedText;
                    if (currentTypingIndex >= currentTypingText.length) {
                        lastMessage.isTyped = true;
                    }
                }
                return newMessages;
            });
        }
    }, [currentTypingIndex, currentTypingText, isTyping]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = [
        { label: "📚 Courses", query: "What courses are available?" },
        { label: "🎓 Admissions", query: "Admission process" },
        { label: "💵 Fees", query: "Fee structure" },
        { label: "💼 Placements", query: "Placement information" },
        { label: "🏫 Facilities", query: "Campus facilities" }
    ];

    const clearChat = () => {
        const welcomeMessage = {
            text: " Hello! Welcome to SSMIET Assistant!\n\nI'm here to help you with information about:\n• Courses & Programs\n• Admissions Process\n• Fee Structure\n• Placement Information\n• Campus Facilities\n\nWhat would you like to know today?",
            sender: 'bot',
            timestamp: new Date(),
            isTyped: true
        };
        setMessages([welcomeMessage]);
        setIsTyping(false);
        setCurrentTypingText('');
        setCurrentTypingIndex(0);
        // Focus input after clearing
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };

    return (
        <>
            {/* Chat with us Toggle Button */}
            <button className="chatbot-toggle-btn" onClick={toggleChat}>
                <span className="toggle-btn-icon">💬Chat with us</span>
                <span className="toggle-btn-text"></span>
            </button>

            {/* Chat Popup */}
            {isChatOpen && (
                <div className="chatbot-popup open">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="header-left">
                            <div className="college-logo">SSMIET</div>
                            <div className="header-info">
                                <div className="college-name">SSMIET Assistant</div>
                                <div className="status">
                                    <div className={`online-dot ${isTyping ? 'typing' : 'online'}`}></div>
                                    <span>{isTyping ? 'Typing...' : 'Online'}</span>
                                </div>
                            </div>
                        </div>
                        <button className="close-btn" onClick={closeChat} title="Close Chat">×</button>
                    </div>

                    {/* Chat Messages */}
                    <div className="chat-messages" ref={chatMessagesRef}>
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                <div className="message-content">
                                    <div className="message-text">
                                        {message.text}
                                        {isTyping && index === messages.length - 1 && (
                                            <span className="typing-cursor">|</span>
                                        )}
                                    </div>
                                    <div className="message-time">
                                        {message.timestamp.toLocaleTimeString([], { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && !isTyping && (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="quick-action-btn"
                                onClick={() => handleQuickAction(action.query)}
                                disabled={isLoading || isTyping}
                            >
                                <span className="action-icon">{action.label.split(' ')[0]}</span>
                                {action.label.split(' ').slice(1).join(' ')}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="chat-input-container">
                        <form className="chat-input-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                            <div className="input-wrapper">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="chat-input"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your question here..."
                                    disabled={isLoading || isTyping}
                                />
                                <button 
                                    type="submit" 
                                    className="send-button"
                                    disabled={isLoading || isTyping || input.trim() === ''}
                                >
                                    ➤
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="chat-footer">
                        <div className="language-indicator">English</div>
                        <div className="powered-by">Powered by SSMIET AI</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;