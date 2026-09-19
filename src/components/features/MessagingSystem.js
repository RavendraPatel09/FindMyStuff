import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Paperclip, Image, X, Shield, Clock, CheckCheck, Check, Smile } from 'lucide-react';

const MessagingSystem = ({ item, currentUser, recipient, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const emojis = ['😀', '😊', '👍', '❤️', '🎉', '👋', '🤝', '✅', '💡', '📍'];

  useEffect(() => {
    // Load mock messages or from localStorage
    const savedMessages = localStorage.getItem(`messages-${item?.id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Mock initial message
      setMessages([
        {
          id: 1,
          sender: 'system',
          text: 'This conversation is secure and your personal information is protected.',
          timestamp: new Date().toISOString(),
          system: true
        }
      ]);
    }
  }, [item]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if the recipient is blocked by the current user
  useEffect(() => {
    try {
      const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
      setIsBlocked(recipient ? blockedUsers.includes(recipient) : false);
    } catch (e) {
      setIsBlocked(false);
    }
  }, [recipient]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!newMessage.trim() || isBlocked) return;

    const message = {
      id: Date.now(),
      sender: currentUser || 'You',
      text: newMessage,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(`messages-${item?.id}`, JSON.stringify(updatedMessages));
    setNewMessage('');

    // Simulate recipient typing
    setTimeout(() => setTyping(true), 1000);
    
    // Simulate recipient response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: recipient || item?.reportedBy || 'Other User',
        text: `Thanks for contacting me about the ${item?.name}. When can we meet to verify?`,
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };
      setMessages(prev => [...prev, response]);
      setTyping(false);
    }, 3000);
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  Secure Chat - {item?.name || 'Item'}
                </h3>
                <p className="text-xs opacity-90 flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>End-to-end encrypted • No personal info shared</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isBlocked && (
          <div className="bg-red-50 text-red-700 px-4 py-2 text-sm border-b border-red-100">
            You have blocked {recipient}. Unblock them from Blocked Users to send messages.
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === (currentUser || 'You') ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.system ? (
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm max-w-md">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>{message.text}</span>
                  </div>
                </div>
              ) : (
                <div
                  className={`max-w-md ${
                    message.sender === (currentUser || 'You')
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  } px-4 py-3 rounded-2xl shadow-sm`}
                >
                  <p className="text-sm font-medium mb-1 opacity-70">
                    {message.sender}
                  </p>
                  <p className="text-sm">{message.text}</p>
                  <div className={`flex items-center justify-between mt-2 text-xs ${
                    message.sender === (currentUser || 'You') ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === (currentUser || 'You') && (
                      <span className="ml-2">
                        {message.status === 'delivered' ? (
                          <CheckCheck className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t rounded-b-xl">
          <div className="flex items-end space-x-2">
            <button
              onClick={() => !isBlocked && fileInputRef.current?.click()}
              className={`p-2 text-gray-500 hover:text-gray-700 transition-colors ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  alert(`Image attachment: ${file.name} (Feature coming soon)`);
                }
              }}
            />
            <button
              onClick={() => !isBlocked && alert('Image upload feature coming soon!')}
              className={`p-2 text-gray-500 hover:text-gray-700 transition-colors ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Image className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => !isBlocked && setShowEmojis(!showEmojis)}
                className={`p-2 text-gray-500 hover:text-gray-700 transition-colors ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Smile className="w-5 h-5" />
              </button>
              {showEmojis && (
                <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-xl border p-2">
                  <div className="grid grid-cols-5 gap-1">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="text-2xl hover:bg-gray-100 rounded p-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a secure message..."
                disabled={isBlocked}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isBlocked ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
            </div>
            
            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || isBlocked}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            <Clock className="w-3 h-3 inline mr-1" />
            Messages are encrypted and will be deleted after 7 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
