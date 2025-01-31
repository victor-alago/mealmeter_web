import React, { useState } from 'react';
import styles from '../assets/css/ChatBot.module.css';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa'; // Import a robot icon
import axios from 'axios';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleChat = () => {
        if (isOpen) {
            // If closing the chat, clear all messages
            setMessages([]);
        } else {
            // If opening the chat, add a welcome message
            setMessages([{ role: 'assistant', content: 'Hi there! How can I assist you today?' }]);
        }
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = { role: 'user', content: inputMessage };
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/chat/message',
                { message: inputMessage },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const botResponse = { role: 'assistant', content: response.data.response };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Something went wrong. Please try again later.' },
            ]);
        }
        setLoading(false);
    };

    return (
        <>
            <div className={styles.chatButton} onClick={toggleChat}>
                {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
            </div>
            {isOpen && (
                <div className={styles.chatContainer}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerContent}>
                            <FaRobot className={styles.assistantIcon} />
                            <h4>MealBot</h4>
                        </div>
                        <button onClick={toggleChat}><FiX /></button>
                    </div>
                    <div className={styles.chatBody}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}
                            >
                                <span>{msg.content}</span>
                            </div>
                        ))}
                        {loading && <div className={styles.loading}>Typing...</div>}
                    </div>
                    <div className={styles.chatInputContainer}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;