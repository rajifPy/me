'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react'

export default function AIChatbot() {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Rajif's AI assistant. I can answer questions about his skills, projects, experience, and more. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const systemPrompt = `You are an AI assistant for Muhammad Rajif Al Farikhi's portfolio website. You help visitors learn about Rajif's background, skills, and experience.

Key Information about Rajif:
- Data Enthusiast specializing in Data Analysis and Machine Learning
- Bachelor's in Information Systems from Universitas Airlangga (2020-2024, GPA: 3.3/4.0)
- Former Machine Learning student at Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)
- Currently working as Data Analyst at UNAIR's Information Systems department
- Skills: Python (75%), SQL (75%), Machine Learning (60%), Tableau (50%), Data Analysis (80%)
- Location: Surabaya, Indonesia
- Contact: mrajifalfarikhi@gmail.com, +6281460326800
- GitHub: rajfiPy, LinkedIn: muhammadrajifalfarikhi

Notable Projects:
1. Healthcare Database - Database optimization for UNAIR health service
2. ML Bangkit Project - Machine Learning capstone from Bangkit Academy
3. Social Analytics - Social media analytics dashboard with 50% growth metrics
4. LoveRegex - NLP web app for learning regular expressions
5. Web Kost Management - Template for boarding house management with React & PostgreSQL

Experience:
- Data Analyst at UNAIR (Jan 2025 - Feb 2025) - Database repair and normalization
- ML Student at Bangkit Academy (Feb 2021 - Dec 2022) - Completed ML fundamentals to advanced AI
- Head of Media & Information at UKMKI UNAIR (Feb 2022 - Dec 2022) - Led social media strategy, 50% follower growth

Certifications: Data Science Fundamentals, Machine Learning Path, SQL for Data Analysis, Data Visualization with Tableau, Python for Data Science, Google Analytics

Technical Skills:
- Programming: Python (75%), SQL (75%), R (70%), JavaScript (50%)
- Data Science: Machine Learning (60%), Data Analysis (80%), Deep Learning (40%), NLP (50%)
- Tools: Pandas (90%), NumPy (60%), Scikit-learn (75%), TensorFlow (60%)
- Visualization: Tableau (50%), Matplotlib (75%), Seaborn (75%), Plotly (75%)
- Database: PostgreSQL (75%), MySQL (75%), MongoDB (50%)

Please provide helpful, concise, and friendly responses. Keep responses under 150 words unless more detail is requested. Always be encouraging and professional.`

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputMessage.trim()
    setInputMessage('')
    setIsLoading(true)

    try {
      const conversationHistory = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role,
          content: m.content
        }))
        .concat([{ role: 'user', content: currentInput }])

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: conversationHistory
        })
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.content && data.content[0] && data.content[0].text) {
        const assistantMessage = {
          role: 'assistant',
          content: data.content[0].text,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact Rajif directly at mrajifalfarikhi@gmail.com',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "What are Rajif's technical skills?",
    "Tell me about his projects",
    "What's his educational background?",
    "How can I contact him?"
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 50)
  }

  // Safe theme classes
  const bgPrimary = theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
  const bgSecondary = theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'

  if (!theme) return null // Wait for theme to load

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50 bg-gradient-to-r from-accent-teal to-accent-blue text-white"
          aria-label="Open AI chat assistant"
          type="button"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-orange rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 w-[95vw] sm:w-[380px] h-[90vh] sm:h-[600px] rounded-2xl shadow-2xl flex flex-col z-50 border-2 ${borderColor} ${bgPrimary}`}
          style={{ maxWidth: '95vw', maxHeight: '90vh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-dark-border bg-gradient-to-r from-accent-teal to-accent-blue text-white rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot size={24} />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Rajif AI Assistant</h3>
                <p className="text-xs opacity-90">Always here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Close chat"
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${bgSecondary}`}>
            {messages.map((message, index) => (
              <div
                key={`msg-${index}-${message.timestamp.getTime()}`}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-teal/20 text-accent-teal">
                    <Bot size={18} />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-accent-teal text-white'
                      : theme === 'dark' 
                        ? 'bg-dark-border text-white' 
                        : 'bg-white text-gray-900 border border-light-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-white/70' : 'text-accent-blue'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-blue/20 text-accent-blue">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-teal/20 text-accent-teal">
                  <Bot size={18} />
                </div>
                <div className={`rounded-2xl px-4 py-2 ${
                  theme === 'dark' ? 'bg-dark-border' : 'bg-white border border-light-border'
                }`}>
                  <Loader2 size={18} className="animate-spin text-accent-teal" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className={`px-4 py-2 border-t ${borderColor} ${bgPrimary} flex-shrink-0`}>
              <p className="text-xs mb-2 flex items-center gap-1 text-accent-blue">
                <Sparkles size={12} />
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={`quick-${idx}`}
                    onClick={() => handleQuickQuestion(question)}
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      theme === 'dark'
                        ? 'bg-dark-border hover:bg-accent-teal/20 text-gray-300'
                        : 'bg-light-border hover:bg-accent-blue/20 text-gray-700'
                    }`}
                    type="button"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className={`p-4 border-t ${borderColor} ${bgPrimary} rounded-b-2xl flex-shrink-0`}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about Rajif..."
                className={`flex-1 px-4 py-2 rounded-full border ${borderColor} focus:outline-none focus:ring-2 focus:ring-accent-teal ${
                  theme === 'dark' 
                    ? 'bg-dark-secondary text-white placeholder-gray-500' 
                    : 'bg-white text-gray-900 placeholder-gray-400'
                }`}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-full transition-all bg-accent-teal text-white ${
                  !inputMessage.trim() || isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-110 hover:shadow-lg'
                }`}
                aria-label="Send message"
                type="button"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
            <p className="text-xs mt-2 text-center text-accent-blue">
              Powered by murfhi
            </p>
          </div>
        </div>
      )}
    </>
  )
}
