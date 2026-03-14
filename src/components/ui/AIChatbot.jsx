'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'
import {
  X, Send, RefreshCw, Copy, Check,
  ChevronDown, Sparkles, Bot, User
} from 'lucide-react'

// ─── Knowledge Base ────────────────────────────────────────────────────────────
const KB = {
  name: 'Muhammad Rajif Al Farikhi',
  role: 'Data Enthusiast & Analyst',
  location: 'Surabaya, Indonesia',
  email: 'mrajifalfarikhi@gmail.com',
  phone: '+6281460326800',
  github: 'github.com/rajfiPy',
  linkedin: 'linkedin.com/in/muhammadrajifalfarikhi',
  education: [
    {
      school: 'Universitas Airlangga',
      degree: 'Bachelor of Information Systems',
      period: '2020–2024',
      gpa: '3.3/4.0',
      focus: 'Data Analytics & Information Systems',
    },
    { school: "MAS Hasyim Asy'ari", degree: 'Science Major', period: '2017–2020', location: 'Jepara' },
  ],
  experience: [
    {
      title: 'Data Analyst',
      company: 'Information Systems & Digitalization, UNAIR',
      period: 'Jan–Feb 2025',
      highlights: ['Repaired and optimized healthcare database systems', 'Heavy data cleaning, deduplication, normalization'],
    },
    {
      title: 'Machine Learning Student',
      company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
      period: 'Feb 2021–Dec 2022',
      highlights: ['Completed the full Machine Learning path', 'Built a capstone NLP fact-checking system'],
    },
    {
      title: 'Head of Media & Information Division',
      company: 'UKMKI Universitas Airlangga',
      period: 'Feb–Dec 2022',
      highlights: ['Grew social media followers by 50%', 'Won Best Staff award'],
    },
  ],
  skills: {
    top: ['Data Analysis (80%)', 'Pandas (90%)', 'Python (75%)', 'SQL (75%)', 'Time Series (75%)'],
    programming: ['Python', 'SQL', 'R', 'JavaScript'],
    ds: ['Data Analysis', 'Machine Learning', 'NLP', 'Deep Learning', 'Time Series'],
    tools: ['Pandas', 'Scikit-learn', 'TensorFlow', 'NumPy', 'Jupyter'],
    viz: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI'],
    db: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  projects: [
    { name: 'Web Kost Management', tech: 'React + PostgreSQL', desc: 'Property management system for boarding houses', link: 'kostmanagerv1.vercel.app' },
    { name: 'LoveRegex', tech: 'Flask + Python + NLP', desc: 'Interactive regex learning platform with real-time feedback', link: 'loveregex.vercel.app' },
    { name: 'ML Bangkit Capstone', tech: 'Python + NLP', desc: 'NLP-based fact-checking system' },
    { name: 'Healthcare Database', tech: 'SQL + PostgreSQL', desc: 'Database optimization for UNAIR health service' },
    { name: 'Social Analytics Dashboard', tech: 'Tableau', desc: 'Social media analytics achieving 50% growth metrics' },
  ],
  certs: [
    'Data Science Fundamentals — Bangkit Academy (2022)',
    'Machine Learning Path — Bangkit/Google (2022)',
    'SQL for Data Analysis — DataCamp (2023)',
    'Data Visualization with Tableau — Tableau (2023)',
    'Python for Data Science — IBM (2023)',
    'Google Analytics — Google (2023)',
  ],
}

// ─── Response Generator ────────────────────────────────────────────────────────
function getResponse(raw) {
  const q = raw.toLowerCase().trim()

  if (/^(hi|hello|hey|halo|hola|sup|yo|howdy|good\s*(morning|afternoon|evening))/.test(q)) {
    return [
      ["Hey there! 👋", "I'm here to tell you all about Rajif — his work, skills, projects, whatever you're curious about.", "What would you like to know?"],
      ["Hi! 😊", "Happy to chat about Rajif's background.", "Ask me about his skills, experience, projects, or how to get in touch!"],
      ["Hello! 👋", "I know Rajif's portfolio inside out.", "Feel free to ask me anything — skills, projects, experience, you name it."],
    ][Math.floor(Math.random() * 3)]
  }

  if (/who are you|what are you|introduce yourself|about (you|yourself)/.test(q)) {
    return ["I'm a custom AI assistant built into Rajif's portfolio. 🤖", "I know everything about him — his background, skills, projects, and experience.", "What would you like to know?"]
  }

  if (/who is rajif|about rajif|tell me about (him|rajif)|introduce rajif/.test(q)) {
    return [
      `Rajif — short for ${KB.name} — is a ${KB.role} based in ${KB.location}. 📍`,
      "He graduated from Universitas Airlangga with a degree in Information Systems, focusing on data analytics.",
      "His strongest suit is turning messy data into clear insights. Best at data analysis, SQL, and Python.",
      "Oh, and he built a snake game into his portfolio landing page, which tells you something about him. 🐍",
    ]
  }

  if (/skill|tech(nolog|nical)|stack|know|good at|expert|best at|proficien|language|tool/.test(q)) {
    return [
      "Great question! Rajif's toolkit is pretty solid. 🛠️",
      `His strongest areas: **${KB.skills.top.join(', ')}**.`,
      `Programming languages: ${KB.skills.programming.join(', ')}.`,
      `Data science side: ${KB.skills.ds.join(', ')}.`,
      `Visualization: ${KB.skills.viz.join(', ')}.`,
      "If I had to pick one standout — Pandas at 90% proficiency. He's basically fluent in it. 🐼",
    ]
  }

  if (/python/.test(q)) {
    return [
      "Python is Rajif's main weapon. 🐍",
      "He's been using it for 3 years across 15+ projects — 75% proficiency.",
      "Go-to stack: Pandas for data wrangling, Scikit-learn for ML, Matplotlib/Seaborn for visualization.",
      "He's also done Flask for web backend (check out LoveRegex) and TensorFlow for deep learning.",
    ]
  }

  if (/\bsql\b|database|postgres|mysql|query/.test(q)) {
    return [
      "SQL is one of Rajif's core skills — 75%, 3 years, 12+ projects. 💾",
      "Works with PostgreSQL and MySQL — complex window functions, CTEs, query optimization.",
      "Most recent SQL project: repairing a healthcare database at UNAIR. Real production data.",
    ]
  }

  if (/machine.?learn|ml\b|deep.?learn|neural|tensorflow|sklearn|model|\bai\b|artificial/.test(q)) {
    return [
      "ML is something Rajif takes seriously — full Bangkit Academy ML path backed by Google. 🤖",
      "Proficiency at 60%, 10+ ML projects covering supervised/unsupervised learning.",
      "His Bangkit capstone was a fact-checking system using NLP text classification.",
      "Still growing in deep learning (40%) — honest about it, which matters in data work.",
    ]
  }

  if (/experience|work|job|career|employ|intern|professional|background/.test(q)) {
    return [
      "Rajif has a mix of real-world and training experience. Quick rundown: 📋",
      `**${KB.experience[0].title}** at ${KB.experience[0].company} (${KB.experience[0].period}) — ${KB.experience[0].highlights[0]}.`,
      `**${KB.experience[1].title}** at ${KB.experience[1].company} (${KB.experience[1].period}) — ${KB.experience[1].highlights[1]}.`,
      `**${KB.experience[2].title}** at ${KB.experience[2].company} — grew social media 50% and won Best Staff. 🏆`,
    ]
  }

  if (/education|study|university|college|school|degree|gpa|academic|unair/.test(q)) {
    return [
      `Rajif studied at **${KB.education[0].school}** — ${KB.education[0].degree}, graduating in 2024. 🎓`,
      `GPA: ${KB.education[0].gpa}. Focus: ${KB.education[0].focus}.`,
      "Also completed Bangkit Academy's ML program — backed by Google, Tokopedia, Gojek, and Traveloka.",
    ]
  }

  if (/project|portfolio|build|create|make|develop|\bapp\b|web|work on/.test(q)) {
    return [
      "Rajif has some interesting projects across the stack. Highlights: 🚀",
      `**${KB.projects[0].name}** (${KB.projects[0].tech}) — ${KB.projects[0].desc}. Live at ${KB.projects[0].link}.`,
      `**${KB.projects[1].name}** (${KB.projects[1].tech}) — ${KB.projects[1].desc}. Live at ${KB.projects[1].link}.`,
      `**${KB.projects[2].name}** (${KB.projects[2].tech}) — ${KB.projects[2].desc}.`,
      "Projects lean toward data and ML, but the React project shows he can go full-stack.",
    ]
  }

  if (/kost|kostmanager|boarding/.test(q)) {
    return [
      "Web Kost Management is a property management system Rajif built for boarding house businesses. 🏠",
      `Stack: ${KB.projects[0].tech}.`,
      "Live at kostmanagerv1.vercel.app — worth checking out to see his full-stack work.",
    ]
  }

  if (/regex|loveregex/.test(q)) {
    return [
      "LoveRegex is one of his more creative projects — an interactive regex learning platform. 💡",
      `Built with ${KB.projects[1].tech}, gives real-time feedback as you practice regular expressions.`,
      "Live at loveregex.vercel.app. Surprisingly fun to use.",
    ]
  }

  if (/cert(ification|ificate|ified)|credential|badge|course/.test(q)) {
    return [
      "Rajif has stacked up some solid certifications: 📜",
      ...KB.certs.map(c => `✓ ${c}`),
      "The Bangkit ones are particularly notable — very competitive program.",
    ]
  }

  if (/contact|reach|email|phone|connect|hire|work with|get in touch|linkedin|github/.test(q)) {
    return [
      "Here's how to reach Rajif: 📬",
      `📧 Email: ${KB.email}`,
      `📱 Phone: ${KB.phone}`,
      `💼 LinkedIn: ${KB.linkedin}`,
      `💻 GitHub: ${KB.github}`,
      "Open to data analyst roles and project collaborations. Best to reach out via email or LinkedIn!",
    ]
  }

  if (/hire|available|open to|opportunit|\bjob\b|position|role|recruit|freelanc/.test(q)) {
    return [
      "Rajif is open to data analyst roles and collaborations. 🙌",
      "Background strongest in data analysis, SQL, and Python-based projects.",
      `Best way to reach out: ${KB.email} or LinkedIn at ${KB.linkedin}.`,
    ]
  }

  if (/fun fact|interesting|personality|hobbies|about him personally|unique/.test(q)) {
    return [
      "A few things that make Rajif stand out: 🌟",
      "• Believes data cleaning is literally 80% of the job",
      "• Built a snake game into his portfolio landing page",
      "• Originally from a village — passionate about rural youth empowerment",
      "• Active blogger writing about data, career, and life",
    ]
  }

  if (/snake|game/.test(q)) {
    return [
      "Ha, yeah — Rajif embedded a fully playable snake game in his portfolio's landing page. 🐍",
      "You have to play through it (or skip it) to 'unlock' the rest of the portfolio.",
      "Fun way to show personality and a subtle flex that he can build interactive games too.",
    ]
  }

  if (/blog|write|writing|article|post|thought/.test(q)) {
    return [
      "Rajif writes on a few topics: 📝",
      "• Data cleaning best practices (strong opinions — 80% of the job, he says)",
      "• Career journey from student to analyst",
      "• SQL optimization techniques",
      "• Rural youth empowerment and tech access",
      "Practical and honest writing. Worth a read in the About section.",
    ]
  }

  if (/tableau|visuali|dashboard|chart|plot|graph|matplotlib|seaborn|plotly/.test(q)) {
    return [
      "Visualization is a solid part of Rajif's skillset. 📊",
      "Matplotlib & Seaborn for Python charts, Plotly for interactive dashboards, Tableau for BI.",
      "Built a social analytics dashboard tracking 50% growth metrics — in his projects.",
    ]
  }

  if (/strength|weakness|improve|grow|learning/.test(q)) {
    return [
      "Rajif's clear strengths: data analysis, SQL, Pandas, Python — all 75%+ proficiency. 💪",
      "Still growing: deep learning (40%) and Docker/MLOps (45%). He's honest about gaps.",
      "Not pretending to know things he doesn't — that matters a lot in data work.",
    ]
  }

  if (/thank|thanks|thx|\bty\b|cheers|appreciate/.test(q)) {
    return [
      ["Happy to help! 😊", "Feel free to ask anything else about Rajif."],
      ["Anytime! 👋", "Let me know if there's anything else you'd like to know."],
      ["Of course! 🙌", "Is there anything else about Rajif I can help with?"],
    ][Math.floor(Math.random() * 3)]
  }

  if (/^(yes|no|ok|okay|sure|yep|nope|alright|cool|nice|great|wow|awesome)[\s!.]*$/.test(q)) {
    return ["Got it! 😄", "Anything else you'd like to know about Rajif?"]
  }

  return [
    ["Hmm, I'm not sure I caught that! 🤔", "I'm best at questions about Rajif's skills, experience, projects, or how to contact him.", "Could you rephrase, or try one of the quick topics below?"],
    ["That one's a bit outside my knowledge base. 😅", "Try asking about his skills, projects, work experience, or education!"],
    ["Not quite sure what you're asking. 🙏", "I'm best at questions like: *What are his skills?* or *Tell me about his projects.*"],
  ][Math.floor(Math.random() * 3)]
}

// ─── Suggestion chips ──────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: '🛠 Skills', prompt: 'What are his strongest skills?' },
  { label: '🚀 Projects', prompt: 'Tell me about his projects' },
  { label: '💼 Experience', prompt: "What's his work experience?" },
  { label: '📬 Contact', prompt: 'How can I reach Rajif?' },
  { label: '🎓 Education', prompt: "What's his educational background?" },
  { label: '📜 Certs', prompt: 'What certifications does he have?' },
]

// ─── Typewriter hook ───────────────────────────────────────────────────────────
// FIX: queue-based so rapid sends don't corrupt earlier messages
function useTypewriter() {
  const [isTyping, setIsTyping] = useState(false)
  const timersRef = useRef([])

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  // type() resolves exactly one bot message, then calls onDone.
  // Caller is responsible for not overlapping calls (queue in component).
  const type = useCallback((chunks, onProgress, onDone) => {
    clearAll()
    setIsTyping(true)

    let chunkIdx = 0
    let charIdx = 0
    let currentText = ''

    const tick = () => {
      const chunk = chunks[chunkIdx]
      if (!chunk) {
        setIsTyping(false)
        onDone?.()
        return
      }
      if (charIdx < chunk.length) {
        currentText += chunk[charIdx]
        charIdx++
        onProgress(chunkIdx, currentText, false)
        const ch = chunk[charIdx - 1]
        const delay = /[.!?]/.test(ch) ? 55 : ch === ',' ? 35 : ch === ' ' ? 10 : 16
        timersRef.current.push(setTimeout(tick, delay))
      } else {
        onProgress(chunkIdx, currentText, true)
        chunkIdx++
        charIdx = 0
        currentText = ''
        if (chunkIdx < chunks.length) {
          timersRef.current.push(setTimeout(tick, 260))
        } else {
          setIsTyping(false)
          onDone?.()
        }
      }
    }

    timersRef.current.push(setTimeout(tick, 100))
  }, [clearAll])

  const stop = useCallback(() => {
    clearAll()
    setIsTyping(false)
  }, [clearAll])

  useEffect(() => () => clearAll(), [clearAll])

  return { type, stop, isTyping }
}

// ─── Render markdown-ish message content ──────────────────────────────────────
function MsgContent({ text }) {
  if (!text) return null
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {text.split('\n').map((line, i) => {
        if (!line) return <div key={i} className="h-1" />
        if (/^\*\*(.+)\*\*$/.test(line.trim())) {
          return <p key={i} className="font-semibold text-accent-teal mt-1.5 first:mt-0">{line.replace(/\*\*/g, '')}</p>
        }
        const html = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        if (/^[•✓✗*-]/.test(line.trim())) {
          return <p key={i} className="pl-3 border-l-2 border-accent-teal/30" dangerouslySetInnerHTML={{ __html: html }} />
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AIChatbot({ activeSection }) {
  const { theme } = useTheme()

  // ── All hooks declared unconditionally (Rules of Hooks compliant) ──
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(null)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      displayed: ["Hey! 👋\n\nI'm Rajif's AI assistant.\n\nAsk me anything — or pick a topic below!"],
      done: true,
      timestamp: new Date(),
    },
  ])

  const { type, stop, isTyping } = useTypewriter()
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // FIX: message queue — pending bot responses wait their turn
  const queueRef = useRef([])       // Array of { chunks, msgIdx }
  const processingRef = useRef(false)

  const processQueue = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return
    processingRef.current = true
    const { chunks, msgIdx } = queueRef.current[0]

    type(
      chunks,
      (chunkIdx, text) => {
        setMessages(list => {
          if (!list[msgIdx]) return list
          const copy = [...list]
          const disp = [...copy[msgIdx].displayed]
          disp[chunkIdx] = text
          copy[msgIdx] = { ...copy[msgIdx], displayed: disp }
          return copy
        })
      },
      () => {
        // Mark message done
        setMessages(list => {
          if (!list[msgIdx]) return list
          const copy = [...list]
          copy[msgIdx] = { ...copy[msgIdx], done: true }
          return copy
        })
        // Dequeue and process next
        queueRef.current.shift()
        processingRef.current = false
        processQueue()
      }
    )
  }, [type])

  // Auto-scroll
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isMinimized])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, isMinimized])

  // Cleanup on unmount
  useEffect(() => () => { stop(); queueRef.current = []; processingRef.current = false }, [stop])

  // ── Conditional render AFTER all hooks ──
  if (activeSection !== 'hello') return null

  const sendMessage = (text) => {
    const userText = (text || input).trim()
    if (!userText) return
    setInput('')

    const userMsg = {
      role: 'user',
      displayed: [userText],
      done: true,
      timestamp: new Date(),
    }

    const chunks = getResponse(userText)

    // FIX: use functional setState to safely capture the real msgIdx
    setMessages(prev => {
      const botMsg = {
        role: 'assistant',
        displayed: Array(chunks.length).fill(''),
        done: false,
        timestamp: new Date(),
      }
      const next = [...prev, userMsg, botMsg]
      const msgIdx = next.length - 1

      // Enqueue and kick off if idle
      queueRef.current.push({ chunks, msgIdx })
      // Use setTimeout(0) so setState settles before processQueue reads messages
      setTimeout(() => processQueue(), 0)

      return next
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const reset = () => {
    stop()
    queueRef.current = []
    processingRef.current = false
    setInput('')
    setMessages([{
      role: 'assistant',
      displayed: ["Fresh start! 🔄\n\nWhat would you like to know about Rajif?"],
      done: true,
      timestamp: new Date(),
    }])
  }

  const copyMsg = (text, i) => {
    navigator.clipboard.writeText(text)
    setCopied(i)
    setTimeout(() => setCopied(null), 2000)
  }

  const getFullText = (msg) => msg.displayed.filter(Boolean).join('\n\n')

  const isDark = theme === 'dark'
  const bg     = isDark ? 'bg-[#011627]'  : 'bg-white'
  const bgSub  = isDark ? 'bg-[#011221]'  : 'bg-gray-50'
  const border = isDark ? 'border-[#1E2D3D]' : 'border-gray-200'
  const muted  = isDark ? 'text-[#607B96]'   : 'text-gray-400'
  const bold   = isDark ? 'text-white'        : 'text-gray-900'

  return (
    <>
      {/* ── FAB ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3
            rounded-full shadow-lg transition-all hover:scale-105 active:scale-95
            ${isDark ? 'bg-accent-teal text-[#011627]' : 'bg-accent-blue text-white'}`}
          aria-label="Open AI chatbot"
        >
          <Sparkles size={18} />
          <span className="text-sm font-semibold">Ask AI</span>
        </button>
      )}

      {/* ── Chat window ── */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-40 flex flex-col rounded-2xl
            shadow-2xl border transition-all duration-200
            ${bg} ${border}
            ${isMinimized ? 'h-14 w-72' : 'w-[22rem] h-[580px]'}`}
          style={{ maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 48px)' }}
        >
          {/* Header */}
          <div className={`flex items-center gap-3 px-4 py-3 border-b rounded-t-2xl flex-shrink-0 ${bgSub} ${border}`}>
            <div className="relative flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                ${isDark ? 'bg-accent-teal/20' : 'bg-accent-blue/10'}`}>
                <Bot size={16} className={isDark ? 'text-accent-teal' : 'text-accent-blue'} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2"
                style={{ borderColor: isDark ? '#011221' : '#f9fafb' }} />
            </div>

            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${bold}`}>Rajif's AI</p>
              {!isMinimized && (
                <p className={`text-xs truncate ${muted}`}>
                  {isTyping ? (
                    <span className="flex items-center gap-1">
                      <span className="inline-flex gap-0.5">
                        {[0, 1, 2].map(i => (
                          <span key={i} className="w-1 h-1 bg-accent-teal rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }} />
                        ))}
                      </span>
                      typing...
                    </span>
                  ) : 'Ask me anything'}
                </p>
              )}
            </div>

            <div className="flex items-center gap-0.5">
              <button onClick={reset} title="Reset chat"
                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#1E2D3D]' : 'hover:bg-gray-100'}`}>
                <RefreshCw size={13} className={muted} />
              </button>
              <button onClick={() => setIsMinimized(v => !v)}
                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#1E2D3D]' : 'hover:bg-gray-100'}`}>
                <ChevronDown size={13} className={`${muted} transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
              </button>
              <button onClick={() => { setIsOpen(false); setIsMinimized(false) }}
                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#1E2D3D]' : 'hover:bg-gray-100'}`}>
                <X size={13} className={muted} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 min-h-0">
                {messages.map((msg, i) => {
                  const text = getFullText(msg)
                  const isUser = msg.role === 'user'
                  const showCursor = !isUser && i === messages.length - 1 && !msg.done

                  return (
                    <div key={i} className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5
                        ${isUser
                          ? isDark ? 'bg-accent-blue/30' : 'bg-accent-blue/10'
                          : isDark ? 'bg-accent-teal/20' : 'bg-accent-teal/10'}`}>
                        {isUser
                          ? <User size={12} className="text-accent-blue" />
                          : <Bot size={12} className="text-accent-teal" />}
                      </div>

                      {/* Bubble */}
                      <div className="group relative max-w-[80%]">
                        <div className={`px-3 py-2.5 rounded-2xl
                          ${isUser
                            ? 'bg-accent-blue text-white rounded-tr-sm'
                            : isDark
                              ? `${bgSub} ${bold} rounded-tl-sm border ${border}`
                              : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                          {isUser
                            ? <p className="text-sm leading-relaxed">{text}</p>
                            : (
                              <div>
                                <MsgContent text={text} />
                                {showCursor && (
                                  <span className="inline-block w-0.5 h-3.5 bg-accent-teal ml-0.5 align-middle animate-pulse" />
                                )}
                              </div>
                            )}
                        </div>

                        {/* Timestamp + copy */}
                        <div className={`flex items-center gap-1 mt-1 px-0.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-[10px] ${muted}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {!isUser && msg.done && text && (
                            <button onClick={() => copyMsg(text, i)}
                              className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded ${muted}`}>
                              {copied === i ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion chips — always visible */}
              <div className={`px-4 pt-2 pb-1 border-t ${border} flex-shrink-0`}>
                <p className={`text-[10px] mb-1.5 ${muted}`}>Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s.label}
                      onClick={() => sendMessage(s.prompt)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all active:scale-95
                        ${isDark
                          ? `border-[#1E2D3D] ${muted} hover:border-accent-teal hover:text-accent-teal`
                          : `border-gray-200 text-gray-400 hover:border-accent-blue hover:text-accent-blue`}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input — never disabled */}
              <div className="px-4 pb-4 pt-2 flex-shrink-0">
                <div className={`flex gap-2 items-end rounded-xl border px-3 py-2 transition-colors
                  ${isDark
                    ? `${bgSub} border-[#1E2D3D] focus-within:border-accent-teal`
                    : 'bg-gray-50 border-gray-200 focus-within:border-accent-blue'}`}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question here..."
                    rows={1}
                    className={`flex-1 bg-transparent text-sm resize-none outline-none
                      max-h-20 min-h-[20px] leading-5
                      ${isDark
                        ? 'text-white placeholder:text-[#607B96]'
                        : 'text-gray-900 placeholder:text-gray-400'}`}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className={`flex-shrink-0 p-1.5 rounded-lg transition-all
                      ${!input.trim()
                        ? 'opacity-25 cursor-not-allowed'
                        : isDark
                          ? 'bg-accent-teal text-[#011627] hover:bg-accent-teal/80 active:scale-95'
                          : 'bg-accent-blue text-white hover:bg-accent-blue/80 active:scale-95'}`}
                  >
                    <Send size={15} />
                  </button>
                </div>
                <p className={`text-[10px] mt-1.5 text-center ${muted}`}>
                  Enter to send · Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
