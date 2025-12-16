'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { MessageCircle, X, Send, Settings, Loader2, RefreshCw, Copy, Check } from 'lucide-react'

// Portfolio data for RAG context
const portfolioContext = `
Name: Muhammad Rajif Al Farikhi
Role: Data Enthusiast & Analyst
Location: Surabaya, Indonesia
Email: mrajifalfarikhi@gmail.com
Phone: +6281460326800

EDUCATION:
- Universitas Airlangga - Bachelor of Information Systems (2020-2024), GPA: 3.3/4.0
- Focus: Data Analytics & Information Systems

EXPERIENCE:
1. Data Analyst at Information Systems and Digitalization, UNAIR (Jan 2025 - Feb 2025)
   - Database repairs and optimization for health service unit
   - Data cleaning and normalization
   
2. Machine Learning Student at Bangkit Academy (Feb 2021 - Dec 2022)
   - Google, Tokopedia, Gojek, Traveloka partnership
   - ML fundamentals to advanced AI techniques
   
3. Head Division Media & Information at UKMKI Universitas Airlangga (Feb 2022 - Dec 2022)
   - Increased social media followers by 50%

SKILLS:
Programming: Python (75%), SQL (75%), R (70%), JavaScript (50%)
Data Science: Machine Learning (60%), Data Analysis (80%), Deep Learning (40%), NLP (50%)
Tools: Pandas (90%), Scikit-learn (75%), TensorFlow (60%), Jupyter (75%)
Visualization: Tableau (50%), Matplotlib (75%), Seaborn (75%), Plotly (75%)
Database: PostgreSQL (75%), MySQL (75%), MongoDB (50%)

CERTIFICATIONS:
- Data Science Fundamentals (Bangkit Academy, 2022)
- Machine Learning Path (Bangkit Academy, 2022)
- SQL for Data Analysis (DataCamp, 2023)
- Data Visualization with Tableau (Tableau, 2023)
- Python for Data Science (IBM, 2023)
- Google Analytics Certification (Google, 2023)

PROJECTS:
1. Healthcare Database - SQL, PostgreSQL
2. ML Bangkit Project - Python, Machine Learning
3. Social Analytics Dashboard - Tableau, Analytics
4. Web Kost Management - React, PostgreSQL
5. LoveRegex - Flask, NLP, Python
`;

// MODIFIED: Add activeSection prop
export default function AIChatbot({ activeSection }) {
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
  const [showSettings, setShowSettings] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // ADDED: Close chatbot when leaving hello section
  useEffect(() => {
    if (activeSection !== 'hello' && isOpen) {
      setIsOpen(false)
    }
  }, [activeSection, isOpen])

  // MODIFIED: Only render if in hello section
  if (activeSection !== 'hello') {
    return null
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await generateAIResponse(inputMessage, portfolioContext)
      
      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request. Please try again or rephrase your question.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (query, context) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology')) {
      return `Rajif has strong skills in:\n\n**Programming Languages:**\n- Python (75%) - 3 years, 15+ projects\n- SQL (75%) - 3 years, 12+ projects\n- R (70%) - 2 years, 8+ projects\n\n**Data Science & ML:**\n- Data Analysis (80%) - 20+ projects\n- Machine Learning (60%) - 10+ projects\n- Time Series (75%) - 6+ projects\n\n**Tools:**\n- Pandas (90%) - Expert level\n- Tableau (50%) - 10+ dashboards\n- TensorFlow (60%) - Deep learning projects\n\nWould you like to know more about any specific skill?`
    }
    
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      return `**Rajif's Professional Experience:**\n\n**1. Data Analyst** at UNAIR (Jan 2025 - Feb 2025)\n- Database repairs and optimization for health service system\n- Data cleaning and normalization\n\n**2. Machine Learning Student** at Bangkit Academy (Feb 2021 - Dec 2022)\n- Partnership with Google, Tokopedia, Gojek, Traveloka\n- Completed intensive ML training program\n\n**3. Head Division Media & Information** at UKMKI UNAIR (Feb 2022 - Dec 2022)\n- Led social media strategy\n- Increased followers by 50%\n- Awarded Best Staff\n\nWould you like details about any specific role?`
    }
    
    if (lowerQuery.includes('education') || lowerQuery.includes('university') || lowerQuery.includes('study')) {
      return `**Education Background:**\n\n**Universitas Airlangga** (2020-2024)\n- Bachelor of Information Systems\n- GPA: 3.3/4.0\n- Focus: Data Analytics & Information Systems\n- Active in academic competitions\n\n**MAS Hasyim Asy'ari** (2017-2020)\n- Science Major\n- Mathematics & Science focus\n\nHe also completed Bangkit Academy's Machine Learning program with certifications in Data Science and ML.`
    }
    
    if (lowerQuery.includes('project')) {
      return `**Notable Projects:**\n\n1. **Healthcare Database** (SQL, PostgreSQL)\n   - Database optimization for UNAIR health service\n   - Data cleaning and normalization\n\n2. **ML Bangkit Project** (Python, ML)\n   - Capstone project from Bangkit Academy\n   - Fact-checking system using NLP\n\n3. **Social Analytics Dashboard** (Tableau)\n   - Achieved 50% growth in metrics\n   - Interactive visualizations\n\n4. **Web Kost Management** (React, PostgreSQL)\n   - Property management system\n   - Full-stack development\n\n5. **LoveRegex** (Flask, NLP, Python)\n   - Interactive regex learning platform\n   - Real-time feedback system\n\nWould you like more details about any project?`
    }
    
    if (lowerQuery.includes('certification') || lowerQuery.includes('certificate')) {
      return `**Professional Certifications:**\n\n✓ Data Science Fundamentals (Bangkit Academy, 2022)\n✓ Machine Learning Path (Bangkit Academy, 2022)\n✓ SQL for Data Analysis (DataCamp, 2023)\n✓ Data Visualization with Tableau (Tableau, 2023)\n✓ Python for Data Science (IBM, 2023)\n✓ Google Analytics Certification (Google, 2023)\n\nAll certifications are verifiable with credential IDs.`
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
      return `**Contact Information:**\n\n📧 Email: mrajifalfarikhi@gmail.com\n📱 Phone: +6281460326800\n📍 Location: Surabaya, Indonesia\n\n🔗 LinkedIn: linkedin.com/in/muhammadrajifalfarikhi\n💻 GitHub: github.com/rajfiPy\n\nFeel free to reach out for collaboration opportunities or data projects!`
    }
    
    if (lowerQuery.includes('python')) {
      return `**Python Expertise:**\n\nRajif has **75% proficiency** in Python with:\n- **3 years** of experience\n- **15+ projects** completed\n\n**Specializations:**\n- Data analysis with Pandas (90% proficiency)\n- Machine learning with Scikit-learn (75%)\n- Deep learning with TensorFlow (60%)\n- Data visualization with Matplotlib & Seaborn\n- Web scraping and automation\n\nHe uses Python daily for data analysis, ML projects, and automation tasks.`
    }
    
    if (lowerQuery.includes('sql') || lowerQuery.includes('database')) {
      return `**Database & SQL Skills:**\n\n**SQL Proficiency:** 75% (3 years, 12+ projects)\n\n**Databases:**\n- PostgreSQL (75%) - Advanced queries, optimization\n- MySQL (75%) - Relational database management\n- MongoDB (50%) - NoSQL for unstructured data\n\n**Expertise:**\n- Complex query optimization\n- Database design and normalization\n- Data cleaning and ETL processes\n- Performance tuning\n\nRecent project: Healthcare database repairs at UNAIR.`
    }
    
    if (lowerQuery.includes('machine learning') || lowerQuery.includes('ml ')) {
      return `**Machine Learning Expertise:**\n\n**Proficiency:** 60% (2 years, 10+ projects)\n\n**Skills:**\n- Supervised & unsupervised learning\n- Model optimization and evaluation\n- Feature engineering\n- Scikit-learn (75% proficiency)\n- TensorFlow (60% proficiency)\n\n**Experience:**\n- Completed Bangkit Academy ML Path\n- Built end-to-end ML projects\n- Capstone: Fact-checking system using NLP\n\n**Also skilled in:**\n- Deep Learning (40%)\n- NLP (50%)\n- Time Series Analysis (75%)`
    }
    
    if (lowerQuery.includes('strength') || lowerQuery.includes('best at')) {
      return `**Rajif's Top Strengths:**\n\n🌟 **Data Analysis** (80%)\n- 3 years experience, 20+ projects\n- Strong statistical foundation\n\n🐼 **Pandas** (90%)\n- Expert-level data manipulation\n- 18+ projects\n\n📊 **Visualization** (75%)\n- Matplotlib, Seaborn, Plotly\n- Tableau dashboards\n\n💾 **SQL** (75%)\n- PostgreSQL, MySQL expertise\n- Database optimization\n\n📈 **Time Series** (75%)\n- Forecasting and analysis\n- 6+ projects\n\nHis analytical mindset and technical skills make him excel in turning data into actionable insights!`
    }
    
    if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('hey')) {
      return `Hello! 👋 I'm here to help you learn about Rajif's background and skills.\n\nI can tell you about:\n- His technical skills and proficiency levels\n- Work experience and achievements\n- Education background\n- Projects and portfolio\n- Certifications\n- How to contact him\n\nWhat would you like to know?`
    }
    
    return `I'd be happy to help you learn about Rajif! Here are some topics I can discuss:\n\n• **Skills & Technologies** - Programming languages, tools, frameworks\n• **Experience** - Work history and achievements\n• **Education** - Academic background and certifications\n• **Projects** - Portfolio and notable work\n• **Contact** - How to reach him\n\nPlease ask me about any of these topics, or ask a specific question!`
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm Rajif's AI assistant. I can answer questions about his skills, projects, experience, and more. How can I help you today?",
        timestamp: new Date()
      }
    ])
  }

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const formatMessage = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} className="font-bold text-accent-teal mt-2">{line.slice(2, -2)}</div>
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        return <div key={i} className="ml-4 text-sm">{line}</div>
      }
      if (/^\d+\./.test(line.trim())) {
        return <div key={i} className="ml-4 text-sm">{line}</div>
      }
      if (line.trim() === '') {
        return <div key={i} className="h-2"></div>
      }
      return <div key={i} className="text-sm">{line}</div>
    })
  }

  const bgPrimary = theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
  const bgSecondary = theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  const textClass = theme === 'dark' ? 'text-dark-text' : 'text-light-text'

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all hover:scale-110 z-40 ${
            theme === 'dark' 
              ? 'bg-accent-teal text-dark-bg hover:bg-accent-teal/90' 
              : 'bg-accent-blue text-white hover:bg-accent-blue/90'
          }`}
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 h-[600px] rounded-lg shadow-2xl border-2 overflow-hidden flex flex-col z-40 ${
          bgPrimary
        } ${borderClass}`}>
          <div className={`${bgSecondary} border-b ${borderClass} p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <MessageCircle size={24} className="text-accent-teal" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg"></div>
              </div>
              <div>
                <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  AI Assistant
                </h3>
                <p className="text-xs text-accent-blue">Ask me about Rajif</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-dark-border rounded transition-colors"
                aria-label="Settings"
              >
                <Settings size={18} />
              </button>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-dark-border rounded transition-colors"
                aria-label="Reset conversation"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-dark-border rounded transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-accent-teal text-dark-bg'
                    : `${bgSecondary} ${textClass}`
                } rounded-lg p-3 relative group`}>
                  <div className="whitespace-pre-wrap">
                    {message.role === 'assistant' 
                      ? formatMessage(message.content)
                      : message.content
                    }
                  </div>
                  <div className="text-xs mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(message.content, index)}
                      className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-dark-border"
                      aria-label="Copy message"
                    >
                      {copiedIndex === index ? (
                        <Check size={14} className="text-accent-teal" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className={`${bgSecondary} rounded-lg p-3 flex items-center gap-2`}>
                  <Loader2 size={16} className="animate-spin text-accent-teal" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className={`border-t ${borderClass} p-4`}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skills, projects, experience..."
                className={`flex-1 ${bgSecondary} border ${borderClass} rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent-teal ${textClass}`}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-lg transition-colors ${
                  !inputMessage.trim() || isLoading
                    ? 'bg-dark-border opacity-50 cursor-not-allowed'
                    : 'bg-accent-teal hover:bg-accent-teal/80 text-dark-bg'
                }`}
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {['Skills', 'Experience', 'Projects', 'Contact'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInputMessage(`Tell me about ${suggestion.toLowerCase()}`)
                    inputRef.current?.focus()
                  }}
                  className={`text-xs px-3 py-1 rounded-full border ${borderClass} hover:border-accent-teal transition-colors`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
