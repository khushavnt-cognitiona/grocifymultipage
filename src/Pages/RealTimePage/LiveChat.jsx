import React, { useState, useEffect, useRef } from "react";
import { FaRocketchat, FaPaperPlane, FaTimes, FaRobot, FaUser } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Welcome to Grocify! 👋 How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-responses
  const autoResponses = {
    "hi": "Hello! How can I assist you with your shopping today? 😊",
    "hello": "Hi there! What can I help you find? 🛒",
    "price": "Our prices are updated in real-time! Check out our live price tracker for the best deals! 💰",
    "delivery": "We offer FREE delivery on orders above $50! Standard delivery takes 2-3 business days. 🚚",
    "help": "I can help you with:\n• Product information\n• Order tracking\n• Delivery info\n• Returns & refunds\n\nWhat would you like to know? 🤔",
    "order": "You can track your order in real-time from 'My Orders' section. Need specific help? 📦",
    "payment": "We accept all major credit cards, PayPal, and digital wallets. All payments are 100% secure! 💳",
    "return": "Easy 30-day returns! Just go to 'My Orders' and select the item you want to return. 🔄"
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate typing
    setIsTyping(true);
    
    // Auto-reply after 1-2 seconds
    setTimeout(() => {
      setIsTyping(false);
      
      // Find matching response
      const lowerInput = inputMessage.toLowerCase();
      let responseText = "Thanks for your message! Our support team will get back to you shortly. In the meantime, check out our FAQ section! 😊";
      
      for (const [key, value] of Object.entries(autoResponses)) {
        if (lowerInput.includes(key)) {
          responseText = value;
          break;
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const quickReplies = [
    "Track my order",
    "Delivery info",
    "Payment options",
    "Return policy"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-full max-w-md animate-slideUp">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-white/20 p-2 rounded-full">
                  <MdSupportAgent className="text-2xl" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold">Live Support</h3>
                <p className="text-xs opacity-90">We're online now!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-full transition-all"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slideInRight`}
            >
              <div className={`flex items-end gap-2 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-orange-500 to-red-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                }`}>
                  {message.sender === "user" ? (
                    <FaUser className="text-white text-xs" />
                  ) : (
                    <FaRobot className="text-white text-xs" />
                  )}
                </div>

                {/* Message Bubble */}
                <div>
                  <div className={`rounded-2xl p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-br-none"
                      : "bg-white shadow-md rounded-bl-none"
                  }`}>
                    <p className={`text-sm whitespace-pre-line ${
                      message.sender === "user" ? "text-white" : "text-gray-800"
                    }`}>
                      {message.text}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 animate-slideInRight">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
                <FaRobot className="text-white text-xs" />
              </div>
              <div className="bg-white shadow-md rounded-2xl rounded-bl-none p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputMessage(reply);
                  setTimeout(() => handleSend(), 100);
                }}
                className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-xs font-semibold transition-all"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-300 rounded-full px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transition-all hover:scale-110"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Button Component
export const LiveChatButton = ({ onClick }) => {
  const [bounce, setBounce] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(b => !b);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all ${
        bounce ? "animate-bounce" : ""
      }`}
    >
      <FaRocketchat className="text-3xl" />
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
        1
      </span>
    </button>
  );
};

export default LiveChat;
