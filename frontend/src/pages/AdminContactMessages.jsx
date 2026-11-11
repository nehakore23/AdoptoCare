import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../api/axios';
import Navbar from '../components/Navbar';
import './AdminContactMessages.css';
import { FaEnvelope, FaInbox, FaEnvelopeOpen, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

export default function AdminContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);
    const [filter, setFilter] = useState('all'); // all, unread, read
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
        fetchUnreadCount();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            console.log('[DEBUG] Fetching contact messages...');
            const response = await AuthAPI.get('/contact/messages');
            console.log('[DEBUG] Contact messages response:', response.data);
            setMessages(response.data);
            setError('');
        } catch (err) {
            console.error('Failed to fetch messages:', err);
            console.error('Error details:', err.response?.data);
            setError('Failed to load messages. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await AuthAPI.get('/contact/messages/count/unread');
            setUnreadCount(response.data.unreadCount);
        } catch (err) {
            console.error('Failed to fetch unread count:', err);
        }
    };

    const markAsRead = async (messageId) => {
        try {
            await AuthAPI.put(`/contact/messages/${messageId}/read`);
            fetchMessages();
            fetchUnreadCount();
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    const respondToMessage = async (messageId) => {
        if (!responseText.trim()) {
            alert('Please enter a response');
            return;
        }

        try {
            await AuthAPI.put(`/contact/messages/${messageId}/respond`, {
                response: responseText
            });
            setResponseText('');
            setSelectedMessage(null);
            fetchMessages();
            fetchUnreadCount();
        } catch (err) {
            console.error('Failed to respond:', err);
            alert('Failed to send response. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getFilteredMessages = () => {
        switch (filter) {
            case 'unread':
                return messages.filter(msg => !msg.isRead);
            case 'read':
                return messages.filter(msg => msg.isRead);
            default:
                return messages;
        }
    };

    const filteredMessages = getFilteredMessages();

    const stats = [
        {
            color: '#fff',
            icon: <FaInbox />,
            value: messages.length,
            label: 'Total Messages',
            description: 'All contact messages'
        },
        {
            color: '#fff',
            icon: <FaEnvelope />,
            value: unreadCount,
            label: 'Unread',
            description: 'Unread messages'
        },
        {
            color: '#fff',
            icon: <FaEnvelopeOpen />,
            value: messages.length - unreadCount,
            label: 'Read',
            description: 'Read messages'
        }
    ];

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="admin-contact-page">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading contact messages...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', width: '100vw', background: '#F8F9FA', padding: 0, boxSizing: 'border-box' }}>
                <div className="container-fluid px-4" style={{ paddingTop: '2.5rem' }}>
                  
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                        <div>
                            <h1 className="fw-bold mb-2 letter-spacing-1 fs-2" style={{ letterSpacing: 1, color: '#2C3E50' }}>
                                <FaEnvelope style={{ marginRight: 6, verticalAlign: 'middle' }} /> Contact Messages
                            </h1>
                            <p className="mb-0 fs-5" style={{ color: '#6C757D' }}>View and manage all contact messages from database</p>
                        </div>
                        <button
                            className="btn px-4 py-2 rounded-3 shadow-sm fw-bold"
                            onClick={() => navigate('/dashboard/admin')}
                            style={{
                                letterSpacing: '1px',
                                background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
                                color: '#FFFFFF',
                                border: 'none'
                            }}
                        >
                            <FaArrowLeft style={{ marginRight: 6, verticalAlign: 'middle' }} /> Back to Dashboard
                        </button>
                    </div>
                    
                    <div className="row g-4 mb-4 flex-nowrap overflow-auto justify-content-center" style={{ marginLeft: 0, marginRight: 0 }}>
                        {stats.map((stat, idx) => (
                            <div className="col-md-2 col-8" key={stat.label} style={{ minWidth: 220, maxWidth: 220, flex: '0 0 220px' }}>
                                <div
                                    className="card shadow"
                                    style={{
                                        borderRadius: '20px',
                                        background: '#2C3E50',
                                        border: '1px solid #2C3E50',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        padding: '2rem',
                                        minHeight: '280px',
                                        maxHeight: '320px',
                                        height: '100%',
                                        maxWidth: '220px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        marginBottom: '1.5rem'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '2.5rem',
                                            color: '#F4EBD3',
                                            background: 'linear-gradient(135deg, #555879 0%, #98A1BC 100%)',
                                            borderRadius: '16px',
                                            padding: '1rem',
                                            marginBottom: '1.5rem',
                                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-block',
                                            width: 'fit-content',
                                            margin: '0 auto 1.5rem auto'
                                        }}
                                    >
                                        {stat.icon}
                                    </div>
                                    <h5 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: '500', color: '#fff', marginBottom: '0.5rem' }}>{stat.label}</h5>
                                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>{stat.value}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#fff', marginTop: '0.5rem', fontWeight: '400', lineHeight: '1.4', opacity: '0.8' }}>{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    
                    <div className="d-flex gap-2 mb-4 justify-content-center">
                        <button 
                            className={`btn px-3 py-2 rounded-pill fw-bold ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                            style={filter === 'all' ? { 
                                background: 'linear-gradient(135deg, #F4B942 0%, #E6A532 100%)', 
                                color: '#2C3E50', 
                                border: 'none' 
                            } : {
                                background: '#ffffff',
                                color: '#2C3E50',
                                border: '1px solid #2C3E50'
                            }}
                        >
                            All Messages
                        </button>
                        <button 
                            className={`btn px-3 py-2 rounded-pill fw-bold ${filter === 'unread' ? 'active' : ''}`}
                            onClick={() => setFilter('unread')}
                            style={filter === 'unread' ? { 
                                background: 'linear-gradient(135deg, #F4B942 0%, #E6A532 100%)', 
                                color: '#2C3E50', 
                                border: 'none' 
                            } : {
                                background: '#ffffff',
                                color: '#2C3E50',
                                border: '1px solid #2C3E50'
                            }}
                        >
                            Unread ({unreadCount})
                        </button>
                        <button 
                            className={`btn px-3 py-2 rounded-pill fw-bold ${filter === 'read' ? 'active' : ''}`}
                            onClick={() => setFilter('read')}
                            style={filter === 'read' ? { 
                                background: 'linear-gradient(135deg, #F4B942 0%, #E6A532 100%)', 
                                color: '#2C3E50', 
                                border: 'none' 
                            } : {
                                background: '#ffffff',
                                color: '#2C3E50',
                                border: '1px solid #2C3E50'
                            }}
                        >
                            Read
                        </button>
                    </div>

                    
                    <div className="card shadow-lg" style={{ borderRadius: '20px', background: '#2C3E50', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)', border: '1px solid #2C3E50', marginBottom: '2.5rem', transition: 'all 0.3s ease' }}>
                        <div className="card-header d-flex align-items-center justify-content-between rounded-top px-4 py-3" style={{ background: '#2C3E50', color: '#ffffff' }}>
                            <h5 className="mb-0 fw-bold fs-4 letter-spacing-1"><FaEnvelope style={{ marginRight: 6, verticalAlign: 'middle' }} /> Contact Messages from Database ({messages.length})</h5>
                            <button
                                className="btn btn-sm px-3 py-1 rounded-pill fw-bold"
                                onClick={fetchMessages}
                                title="Refresh"
                                style={{ 
                                    background: 'linear-gradient(135deg, #F4B942 0%, #E6A532 100%)',
                                    color: '#2C3E50',
                                    border: 'none'
                                }}
                            >
                                &#x21bb; Refresh
                            </button>
                        </div>
                        <div className="card-body p-0" style={{ background: '#2C3E50', borderRadius: '0 0 20px 20px' }}>
                            {messages.length === 0 ? (
                                <div className="text-center py-5">
                                    <h5 style={{ color: '#555879' }}>No messages found in database</h5>
                                    <p style={{ color: '#555879' }}>The database might not have any contact messages or there's a connection issue</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0 align-middle">
                                        <thead style={{ background: '#2C3E50', color: '#ffffff' }}>
                                            <tr>
                                                <th style={{ color: '#ffffff', textAlign: 'center' }}><FaEnvelope style={{ marginRight: 6, verticalAlign: 'middle' }} /> Name</th>
                                                <th style={{ color: '#ffffff', textAlign: 'center' }}><FaEnvelope style={{ marginRight: 6, verticalAlign: 'middle' }} /> Email</th>
                                                <th style={{ color: '#ffffff', textAlign: 'center' }}><FaEnvelope style={{ marginRight: 6, verticalAlign: 'middle' }} /> Subject</th>
                                                <th style={{ color: '#ffffff', textAlign: 'center' }}><FaCheckCircle style={{ marginRight: 6, verticalAlign: 'middle' }} /> Status</th>
                                                <th style={{ color: '#ffffff', textAlign: 'center' }}><FaEnvelope style={{ marginRight: 6, verticalAlign: 'middle' }} /> Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMessages.map((message) => (
                                                <tr key={message.id} style={{ background: '#fff' }} onClick={() => setSelectedMessage(message)}>
                                                    <td style={{ color: '#111' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div
                                                                className="message-avatar"
                                                                style={{ width: '40px', height: '40px', fontSize: '1.5rem', marginRight: '1rem', background: '#FFD700', color: '#2C3E50', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
                                                            >
                                                                <FaEnvelope />
                                                            </div>
                                                            <div className="message-info">
                                                                <div className="message-name" style={{ color: '#111' }}>{message.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ color: '#111', textAlign: 'center' }}>{message.email}</td>
                                                    <td style={{ color: '#111', textAlign: 'center' }}>{message.subject}</td>
                                                    <td style={{ color: '#111', textAlign: 'center' }}>
                                                        <span className={`status-badge ${message.isRead ? 'active' : 'inactive'}`} style={{ background: message.isRead ? '#28A745' : '#6C757D', color: '#fff' }}>
                                                            {message.isRead ? 'Read' : 'Unread'}
                                                        </span>
                                                    </td>
                                                    <td style={{ color: '#111', textAlign: 'center' }}>{formatDate(message.createdAt)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

               
                    {selectedMessage && (
                        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Message from {selectedMessage.name}</h2>
                                    <button 
                                        className="close-btn"
                                        onClick={() => setSelectedMessage(null)}
                                    >
                                        ×
                                    </button>
                                </div>
                                
                                <div className="modal-body">
                                    <div className="message-details">
                                        <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                                        <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                                        <p><strong>Date:</strong> {formatDate(selectedMessage.createdAt)}</p>
                                        <p><strong>Status:</strong> {selectedMessage.isRead ? 'Read' : 'Unread'}</p>
                                    </div>
                                    
                                    <div className="message-content">
                                        <h3>Message:</h3>
                                        <p>{selectedMessage.message}</p>
                                    </div>

                                    {selectedMessage.adminResponse && (
                                        <div className="admin-response">
                                            <h3>Your Response:</h3>
                                            <p>{selectedMessage.adminResponse}</p>
                                            <small>Responded on: {formatDate(selectedMessage.respondedAt)}</small>
                                        </div>
                                    )}

                                    {!selectedMessage.adminResponse && !selectedMessage.isRead && (
                                        <div className="response-section" style={{
                                            backgroundColor: 'white',
                                            padding: '20px',
                                            borderRadius: '8px',
                                            border: '1px solid #e0e0e0',
                                            marginTop: '20px'
                                        }}>
                                            <div className="response-actions">
                                                <button 
                                                    className="mark-read-btn"
                                                    onClick={() => markAsRead(selectedMessage.id)}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #F4B942 0%, #E6A532 100%)',
                                                        color: '#2C3E50',
                                                        border: 'none',
                                                        padding: '10px 20px',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Mark as Read
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 