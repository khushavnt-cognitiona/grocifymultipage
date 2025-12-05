import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaMinus, FaUser, FaSmile } from "react-icons/fa";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm GrociBot. How can I help you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  // Predefined responses based on keywords
  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("order") || lowerText.includes("track")) {
      return "You can track your orders in the 'My Orders' section. Would you like me to take you there?";
    }
    if (lowerText.includes("refund") || lowerText.includes("return")) {
      return "Refunds are processed within 5-7 business days. You can initiate a return from the Order Details page.";
    }
    if (lowerText.includes("payment") || lowerText.includes("pay")) {
      return "We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD).";
    }
    if (lowerText.includes("hello") || lowerText.includes("hi")) {
      return "Hello! How can I assist you with your grocery shopping today? 🍎";
    }
    if (lowerText.includes("offer") || lowerText.includes("discount")) {
      return "Check out our 'Offers' section for the latest deals! You can get up to 50% off on fresh fruits today.";
    }
    return "I'm not sure I understand. You can ask about orders, payments, refunds, or offers. Or contact our support team at support@grocify.com.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponseText = getBotResponse(userMsg.text);
      const botMsg = {
        id: messages.length + 2,
        text: botResponseText,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "Track my order 📦",
    "Refund policy 💸",
    "Payment options 💳",
    "Today's offers 🎉"
  ];

  const handleQuickReply = (text) => {
    setInputText(text);
    // Automatically send after a short delay to simulate click-to-send
    setTimeout(() => {
       // We can't easily trigger the form submit event programmatically in a clean way here without extracting logic, 
       // so we'll just replicate the logic.
       if (!text.trim()) return;

        const userMsg = {
          id: messages.length + 1,
          text: text,
          sender: "user",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        setTimeout(() => {
          const botResponseText = getBotResponse(userMsg.text);
          const botMsg = {
            id: messages.length + 2,
            text: botResponseText,
            sender: "bot",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMsg]);
          setIsTyping(false);
        }, 1500);
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 mb-4 animate-slideUp flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <FaRobot className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">GrociBot</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(true)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <FaMinus />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-orange-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-orange-100' : 'text-gray-400'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickReply(reply)}
                className="whitespace-nowrap bg-white border border-orange-200 text-orange-600 text-xs px-3 py-1 rounded-full hover:bg-orange-50 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center gap-2 ${
          isOpen && !isMinimized ? 'hidden' : 'flex'
        }`}
      >
        <FaRobot className="text-2xl" />
        <span className="font-bold hidden md:inline">Chat with us</span>
      </button>
    </div>
  );
};

export default AIChatbot;
