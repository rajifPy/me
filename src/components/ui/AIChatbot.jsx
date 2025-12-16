import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

export default function AIChatbot({ theme = 'dark' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Rajif\'s AI assistant. I can answer questions about his skills, projects, experience, and more. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const systemPrompt = `You are an AI assistant for Muhammad Rajif Al Farikhi's portfolio website. You help visitors learn about Rajif's background, skills, and experience.

Key Information about Rajif:
- Data Enthusiast specializing in Data Analysis and Machine Learning
- Bachelor's in Information Systems from Universitas Airlangga (2020-2024, GPA: 3.3/4.0)
- Former Machine Learning student at Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)
- Currently working as Data Analyst at UNAIR's Information Systems department
- Skills: Python (75%), SQL (75%), Machine Learning (60%), Tableau (50%), Data Analysis (80%)
- Location: Surabaya, Indonesia
- Contact: mrajifalfarikhi@gmail.com, +6281460326800
- GitHub: rajfiPy
- LinkedIn: muhammadrajifalfarikhi

Notable Projects:
1. Healthcare Database - Database optimization for UNAIR health service
2. ML Bangkit Project - Machine Learning capstone from Bangkit Academy
3. Social Analytics - Social media analytics dashboard with 50% growth metrics
4. LoveRegex - NLP web app for learning regular expressions

Experience:
- Data Analyst at UNAIR (Jan 2025 - Feb 2025)
- ML Student at Bangkit Academy (Feb 2021 - Dec 2022)
- Head of Media & Information at UKMKI UNAIR (Feb 2022 - Dec 2022)

Certifications:
- Data Science Fundamentals (Bangkit Academy)
- Machine Learning Path (Bangkit Academy)
- SQL for Data Analysis (DataCamp)
- Data Visualization with Tableau

Please provide helpful, concise, and friendly responses. If asked about specific technical details, reference his actual skills and projects. Keep responses under 150 words unless more detail is specifically requested.`;

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: messages
            .filter(m => m.role !== 'system')
            .map(m => ({
              role: m.role,
              content: m.content
            }))
            .concat([{ role: 'user', content: inputMessage }])
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        const assistantMessage = {
          role: 'assistant',
          content: data.content[0].text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are Rajif's technical skills?",
    "Tell me about his projects",
    "What's his educational background?",
    "How can I contact him?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const bgPrimary = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const bgSecondary = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
          }`}
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-[380px] h-[600px] rounded-2xl shadow-2xl flex flex-col z-50 border-2 ${borderColor} ${bgPrimary}`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${borderColor} ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-teal-600 to-blue-600'
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } text-white rounded-t-2xl`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot size={24} />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Rajif's AI Assistant</h3>
                <p className="text-xs opacity-90">Always here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${bgSecondary}`}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    theme === 'dark' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Bot size={18} />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? theme === 'dark'
                        ? 'bg-teal-600 text-white'
                        : 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-white/70' : textSecondary
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  theme === 'dark' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Bot size={18} />
                </div>
                <div className={`rounded-2xl px-4 py-2 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <Loader2 size={18} className="animate-spin text-teal-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className={`px-4 py-2 border-t ${borderColor} ${bgPrimary}`}>
              <p className={`text-xs mb-2 flex items-center gap-1 ${textSecondary}`}>
                <Sparkles size={12} />
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-teal-500/20 text-gray-300'
                        : 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className={`p-4 border-t ${borderColor} ${bgPrimary} rounded-b-2xl`}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Rajif..."
                className={`flex-1 px-4 py-2 rounded-full border ${borderColor} focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white focus:ring-teal-500'
                    : 'bg-white text-gray-900 focus:ring-blue-500'
                }`}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-full transition-all ${
                  !inputMessage.trim() || isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-110'
                } ${
                  theme === 'dark'
                    ? 'bg-teal-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
            <p className={`text-xs mt-2 text-center ${textSecondary}`}>
              Powered by Claude AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
