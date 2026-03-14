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
  nickname: 'Rajif',
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
    {
      school: "MAS Hasyim Asy'ari",
      degree: 'Science Major',
      period: '2017–2020',
      location: 'Jepara',
    },
  ],

  experience: [
    {
      title: 'Data Analyst',
      company: 'Information Systems & Digitalization, UNAIR',
      period: 'Jan–Feb 2025',
      highlights: [
        'Repaired and optimized healthcare database systems',
        'Did heavy data cleaning, deduplication, and normalization',
      ],
    },
    {
      title: 'Machine Learning Student',
      company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
      period: 'Feb 2021–Dec 2022',
      highlights: [
        'Completed the full Machine Learning path',
        'Built a capstone NLP fact-checking system',
      ],
    },
    {
      title: 'Head of Media & Information Division',
      company: 'UKMKI Universitas Airlangga',
      period: 'Feb–Dec 2022',
      highlights: [
        'Grew social media followers by 50%',
        'Won Best Staff award',
      ],
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
    {
      name: 'Web Kost Management',
      tech: 'React + PostgreSQL',
      desc: 'Property management system for boarding houses',
      link: 'kostmanagerv1.vercel.app',
    },
    {
      name: 'LoveRegex',
      tech: 'Flask + Python + NLP',
      desc: 'Interactive regex learning platform with real-time feedback',
      link: 'loveregex.vercel.app',
    },
    {
      name: 'ML Bangkit Capstone',
      tech: 'Python + NLP',
      desc: 'NLP-based fact-checking system',
    },
    {
      name: 'Healthcare Database',
      tech: 'SQL + PostgreSQL',
      desc: 'Database optimization for UNAIR health service',
    },
    {
      name: 'Social Analytics Dashboard',
      tech: 'Tableau',
      desc: 'Social media analytics that achieved 50% growth metrics',
    },
  ],

  certs: [
    'Data Science Fundamentals — Bangkit Academy (2022)',
    'Machine Learning Path — Bangkit/Google (2022)',
    'SQL for Data Analysis — DataCamp (2023)',
    'Data Visualization with Tableau — Tableau (2023)',
    'Python for Data Science — IBM (2023)',
    'Google Analytics — Google (2023)',
  ],

  funFacts: [
    'Believes data cleaning is literally 80% of the job',
    'Built a snake game into this portfolio landing page',
    'Originally from a village — passionate about rural youth empowerment',
    'Active blogger writing about data, career, and life',
  ],
}

// ─── Response Generator ────────────────────────────────────────────────────────
// Each intent returns an array of "chunks" — short strings that get typed out
// with small pauses between them, simulating natural thought flow.

function getResponse(raw) {
  const q = raw.toLowerCase().trim()

  // ── Greetings ──
  if (/^(hi|hello|hey|halo|hola|sup|yo|howdy|good\s*(morning|afternoon|evening))/.test(q)) {
    const greets = [
      ["Hey there! 👋", "I'm here to tell you all about Rajif — his work, skills, projects, whatever you're curious about.", "What would you like to know?"],
      ["Hi! 😊", "Happy to chat about Rajif's background.", "Ask me about his skills, experience, projects, or how to get in touch with him!"],
      ["Hello! 👋", "I know Rajif's portfolio inside out.", "Feel free to ask me anything — skills, projects, experience, you name it."],
    ]
    return greets[Math.floor(Math.random() * greets.length)]
  }

  // ── Who are you / what are you ──
  if (/who are you|what are you|introduce yourself|about (you|yourself)/.test(q)) {
    return [
      "I'm a custom AI assistant built into Rajif's portfolio. 🤖",
      "I know everything about him — his background, skills, projects, and experience.",
      "Think of me as his always-available representative. What would you like to know about him?",
    ]
  }

  // ── Who is Rajif / about him ──
  if (/who is rajif|about rajif|tell me about (him|rajif)|introduce rajif/.test(q)) {
    return [
      `Rajif — short for ${KB.name} — is a ${KB.role} based in ${KB.location}. 📍`,
      "He graduated from Universitas Airlangga with a degree in Information Systems, focusing on data analytics.",
      "His strongest suit is turning messy data into clear insights. He's particularly good at data analysis, SQL, and Python.",
      "Oh, and he built a snake game into his portfolio landing page, which tells you something about him. 🐍",
    ]
  }

  // ── Skills ──
  if (/skill|tech(nolog|nical)|stack|know|good at|expert|best at|proficien|language|tool/.test(q)) {
    return [
      "Great question! Rajif's toolkit is pretty solid. 🛠️",
      `His strongest areas are: **${KB.skills.top.join(', ')}**.`,
      `For programming, he works mainly with: ${KB.skills.programming.join(', ')}.`,
      `Data science-wise: ${KB.skills.ds.join(', ')}.`,
      `And for visualization: ${KB.skills.viz.join(', ')}.`,
      "If I had to pick one standout — Pandas at 90% proficiency. He's basically fluent in it. 🐼",
    ]
  }

  // ── Python specifically ──
  if (/python/.test(q)) {
    return [
      "Python is Rajif's main weapon. 🐍",
      "He's been using it for 3 years across 15+ projects — sitting at 75% proficiency.",
      "His go-to stack: Pandas for data wrangling, Scikit-learn for ML, Matplotlib/Seaborn for visualization.",
      "He's also done Flask for web backend (check out LoveRegex), and TensorFlow for deep learning work.",
    ]
  }

  // ── SQL ──
  if (/\bsql\b|database|postgres|mysql|query/.test(q)) {
    return [
      "SQL is one of Rajif's core skills — 75%, 3 years, 12+ projects. 💾",
      "He works with PostgreSQL and MySQL primarily. He's done complex window functions, CTEs, query optimization, the whole thing.",
      "His most recent SQL project was repairing and optimizing a healthcare database at UNAIR — real production data, not just toy datasets.",
    ]
  }

  // ── Machine Learning / AI ──
  if (/machine.?learn|ml\b|deep.?learn|neural|tensorflow|sklearn|model|ai\b|artificial/.test(q)) {
    return [
      "ML is something Rajif takes seriously — he went through the full Bangkit Academy ML path backed by Google. 🤖",
      "His proficiency is at 60%, and he's done 10+ ML projects covering supervised/unsupervised learning.",
      "For deep learning specifically, he uses TensorFlow and has done NLP work — his Bangkit capstone was a fact-checking system using text classification.",
      "He's honest about still growing in this area, which honestly makes him more trustworthy as a data professional.",
    ]
  }

  // ── Experience / work ──
  if (/experience|work|job|career|employ|intern|professional|background/.test(q)) {
    const exp = KB.experience
    return [
      "Rajif has a mix of real-world and training experience. Here's the quick rundown: 📋",
      `**${exp[0].title}** at ${exp[0].company} (${exp[0].period}) — ${exp[0].highlights[0]}.`,
      `**${exp[1].title}** at ${exp[1].company} (${exp[1].period}) — ${exp[1].highlights[1]}.`,
      `And before that, **${exp[2].title}** at ${exp[2].company} — grew social media 50% and won Best Staff. 🏆`,
      "Still early in his career, but already has solid real-world data experience.",
    ]
  }

  // ── Education ──
  if (/education|study|university|college|school|degree|gpa|academic|unair/.test(q)) {
    const uni = KB.education[0]
    return [
      `Rajif studied at **${uni.school}** — ${uni.degree}, graduating in ${uni.period.split('–')[1]}. 🎓`,
      `GPA: ${uni.gpa}. His focus was ${uni.focus}.`,
      "He also went through Bangkit Academy's ML program, which is run in partnership with Google, Tokopedia, Gojek, and Traveloka — very competitive program.",
    ]
  }

  // ── Projects ──
  if (/project|portfolio|build|create|make|develop|app|web|work on/.test(q)) {
    return [
      "Rajif has some interesting projects across the stack. Let me highlight a few: 🚀",
      `**${KB.projects[0].name}** (${KB.projects[0].tech}) — ${KB.projects[0].desc}. Live at ${KB.projects[0].link}.`,
      `**${KB.projects[1].name}** (${KB.projects[1].tech}) — ${KB.projects[1].desc}. Live at ${KB.projects[1].link}.`,
      `**${KB.projects[2].name}** (${KB.projects[2].tech}) — ${KB.projects[2].desc}.`,
      "His projects lean heavily toward data and ML, which makes sense given his focus. The React project shows he can go full-stack when needed.",
    ]
  }

  // ── Specific projects ──
  if (/kost|kostmanager|boarding/.test(q)) {
    const p = KB.projects[0]
    return [
      `Web Kost Management is a property management system Rajif built for boarding house businesses. 🏠`,
      `Stack: ${p.tech}.`,
      `It's live at kostmanagerv1.vercel.app — worth checking out if you want to see his full-stack work.`,
    ]
  }

  if (/regex|loveregex/.test(q)) {
    const p = KB.projects[1]
    return [
      `LoveRegex is one of his more creative projects — an interactive regex learning platform. 💡`,
      `Built with ${p.tech}, it gives you real-time feedback as you practice regular expressions.`,
      `Live at loveregex.vercel.app. It's surprisingly fun to use.`,
    ]
  }

  // ── Certifications ──
  if (/cert(ification|ificate|ified)|credential|badge|course|licensed/.test(q)) {
    return [
      "Rajif has stacked up some solid certifications: 📜",
      ...KB.certs.map(c => `✓ ${c}`),
      "The Bangkit ones are particularly notable since that program is highly competitive.",
    ]
  }

  // ── Contact ──
  if (/contact|reach|email|phone|connect|hire|work with|get in touch|linkedin|github/.test(q)) {
    return [
      "Here's how to reach Rajif: 📬",
      `📧 Email: ${KB.email}`,
      `📱 Phone: ${KB.phone}`,
      `💼 LinkedIn: ${KB.linkedin}`,
      `💻 GitHub: ${KB.github}`,
      "He's open to data analyst roles and project collaborations. Best to reach out via email or LinkedIn!",
    ]
  }

  // ── Availability / hiring ──
  if (/hire|available|open to|opportunit|job|position|role|recruit|freelanc/.test(q)) {
    return [
      "From what I know, Rajif is open to data analyst roles and collaborations. 🙌",
      "His background is strongest in data analysis, SQL, and Python-based projects.",
      `Best way to reach out: ${KB.email} or LinkedIn at ${KB.linkedin}.`,
    ]
  }

  // ── Fun facts / personality ──
  if (/fun fact|interesting|personality|hobbies|about him personally|unique|quirk/.test(q)) {
    return [
      "A few things that make Rajif stand out: 🌟",
      ...KB.funFacts.map(f => `• ${f}`),
    ]
  }

  // ── Snake game ──
  if (/snake|game/.test(q)) {
    return [
      "Ha, yeah — Rajif embedded a fully playable snake game in his portfolio's landing page. 🐍",
      "You have to play through it (or skip it) to 'unlock' the rest of the portfolio.",
      "It's a fun way to show personality and also a subtle flex that he can build interactive games too.",
    ]
  }

  // ── Blog / writing ──
  if (/blog|write|writing|article|post|thought/.test(q)) {
    return [
      "Rajif writes on a few topics: 📝",
      "• Data cleaning best practices — he has strong opinions here (80% of the job, he says)",
      "• Career journey from student to analyst",
      "• SQL optimization techniques",
      "• Rural youth empowerment and tech access",
      "His writing is practical and honest — no fluff. Worth a read in the About section.",
    ]
  }

  // ── Visualization ──
  if (/tableau|visuali|dashboard|chart|plot|graph|matplotlib|seaborn|plotly/.test(q)) {
    return [
      "Visualization is a solid part of Rajif's skillset. 📊",
      "He uses Matplotlib and Seaborn for Python-based charts, Plotly for interactive dashboards, and Tableau for business intelligence work.",
      "He built a social analytics dashboard that tracked 50% growth metrics — that's in his projects.",
      "If you want interactive viz, ask him about Plotly. If you want BI dashboards, Tableau is his go-to.",
    ]
  }

  // ── Strengths / weakness ──
  if (/strength|weakness|improve|grow|learning|weakness/.test(q)) {
    return [
      "Rajif's clear strengths: data analysis, SQL, Pandas, and Python — these are all at 75%+ proficiency. 💪",
      "Areas he's still growing in: deep learning (40%) and Docker/MLOps (45%). He's honest about these gaps.",
      "What I respect is that he's not pretending to know things he doesn't — that matters a lot in data work.",
    ]
  }

  // ── Thanks ──
  if (/thank|thanks|thx|ty\b|cheers|appreciate/.test(q)) {
    const replies = [
      ["Happy to help! 😊", "Feel free to ask anything else about Rajif."],
      ["Anytime! 👋", "Let me know if there's anything else you'd like to know."],
      ["Of course! 🙌", "Is there anything else about Rajif I can help you with?"],
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }

  // ── Yes/No/Short affirmations ──
  if (/^(yes|no|ok|okay|sure|yep|nope|alright|cool|nice|great|wow|awesome)[\s!.]*$/.test(q)) {
    return [
      "Got it! 😄",
      "Anything else you'd like to know about Rajif?",
    ]
  }

  // ── Default fallback ──
  const fallbacks = [
    [
      "Hmm, I'm not sure I caught that! 🤔",
      "I'm best at answering questions about Rajif's skills, experience, projects, or how to contact him.",
      "Could you rephrase, or pick one of those topics?",
    ],
    [
      "That one's a bit outside my knowledge base. 😅",
      "I'm specifically tuned to talk about Rajif's portfolio.",
      "Try asking about his skills, projects, work experience, or education!",
    ],
    [
      "I want to give you a good answer, but I'm not quite sure what you're asking. 🙏",
      "I'm best at questions like: *What are his skills?* or *Tell me about his projects.*",
      "What would you like to know?",
    ],
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

// ─── Suggestion chips ──────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: '🛠 Skills', prompt: "What are his strongest skills?" },
  { label: '🚀 Projects', prompt: "Tell me about his projects" },
  { label: '💼 Experience', prompt: "What's his work experience?" },
  { label: '📬 Contact', prompt: "How can I reach Rajif?" },
]

// ─── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter() {
  const [typingId, setTypingId] = useState(null)
  const timersRef = useRef([])

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  // chunks: string[] — each gets typed out in sequence with a pause between
  const type = useCallback((messageIndex, chunks, onChunkDone, onAllDone) => {
    clearAll()
    const id = Date.now()
    setTypingId(id)

    let chunkIdx = 0
    let charIdx = 0
    let currentText = ''

    const typeChar = () => {
      const chunk = chunks[chunkIdx]
      if (charIdx < chunk.length) {
        currentText += chunk[charIdx]
        charIdx++
        onChunkDone(messageIndex, chunkIdx, currentText)
        // Vary speed: faster for spaces, slower after punctuation
        const ch = chunk[charIdx - 1]
        const delay = /[.!?]/.test(ch) ? 60 : ch === ',' ? 40 : ch === ' ' ? 12 : 18
        timersRef.current.push(setTimeout(typeChar, delay))
      } else {
        // Chunk done — pause then start next
        onChunkDone(messageIndex, chunkIdx, currentText, true)
        chunkIdx++
        charIdx = 0
        currentText = ''
        if (chunkIdx < chunks.length) {
          timersRef.current.push(setTimeout(typeChar, 280))
        } else {
          setTypingId(null)
          onAllDone?.()
        }
      }
    }

    timersRef.current.push(setTimeout(typeChar, 120))
    return id
  }, [clearAll])

  const stop = useCallback(() => {
    clearAll()
    setTypingId(null)
  }, [clearAll])

  useEffect(() => () => clearAll(), [clearAll])

  return { type, stop, isTyping: typingId !== null }
}

// ─── Render message text with basic markdown ───────────────────────────────────
function MessageBubble({ content, isDark }) {
  if (!content) return null
  const lines = content.split('\n')
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (!line) return <div key={i} className="h-1" />
        // Bold-only line → header style
        if (/^\*\*(.+)\*\*$/.test(line.trim())) {
          return (
            <p key={i} className="font-semibold text-accent-teal mt-2 first:mt-0">
              {line.replace(/\*\*/g, '')}
            </p>
          )
        }
        // Inline bold
        const html = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        // Bullet / list item
        if (/^[•✓✗*-]/.test(line.trim())) {
          return (
            <p key={i} className="pl-3 border-l-2 border-accent-teal/30 text-sm"
              dangerouslySetInnerHTML={{ __html: html }} />
          )
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function AIChatbot({ activeSection }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(null)

  // messages shape: { role, chunks: string[], displayed: string[], done: boolean, timestamp }
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      chunks: ["Hey! 👋", "I'm Rajif's AI assistant.", "Ask me about his skills, projects, experience — anything!"],
      displayed: ["Hey! 👋\n\nI'm Rajif's AI assistant.\n\nAsk me about his skills, projects, experience — anything!"],
      done: true,
      timestamp: new Date(),
    },
  ])

  const { type, stop, isTyping } = useTypewriter()
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  if (activeSection !== 'hello') return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => inputRef.current?.focus(), 80)
  }, [isOpen, isMinimized])

  const sendMessage = (text) => {
    const userText = (text || input).trim()
    if (!userText || isTyping) return
    setInput('')

    const userMsg = {
      role: 'user',
      chunks: [userText],
      displayed: [userText],
      done: true,
      timestamp: new Date(),
    }

    const chunks = getResponse(userText)
    const botMsg = {
      role: 'assistant',
      chunks,
      displayed: Array(chunks.length).fill(''),
      done: false,
      timestamp: new Date(),
    }

    setMessages(prev => {
      const next = [...prev, userMsg, botMsg]
      const botIndex = next.length - 1

      type(
        botIndex,
        chunks,
        // onChunkDone: update the specific chunk's displayed text
        (msgIdx, chunkIdx, text, chunkComplete) => {
          setMessages(list => {
            const copy = [...list]
            const msg = { ...copy[msgIdx] }
            const disp = [...msg.displayed]
            disp[chunkIdx] = text
            copy[msgIdx] = { ...msg, displayed: disp }
            return copy
          })
        },
        // onAllDone
        () => {
          setMessages(list => {
            const copy = [...list]
            copy[botIndex] = { ...copy[botIndex], done: true }
            return copy
          })
        }
      )

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
    setInput('')
    setMessages([{
      role: 'assistant',
      chunks: ["Fresh start! 🔄", "What would you like to know about Rajif?"],
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

  // Flatten displayed chunks into a single string for rendering
  const getDisplayText = (msg) =>
    msg.displayed.filter(Boolean).join('\n\n')

  // Theme helpers
  const bg = isDark ? 'bg-[#011627]' : 'bg-white'
  const bgSub = isDark ? 'bg-[#011221]' : 'bg-gray-50'
  const border = isDark ? 'border-[#1E2D3D]' : 'border-gray-200'
  const muted = isDark ? 'text-[#607B96]' : 'text-gray-400'
  const bold = isDark ? 'text-white' : 'text-gray-900'

  const isFirstMsg = messages.length <= 1

  return (
    <>
      {/* FAB */}
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

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-40 flex flex-col rounded-2xl
            shadow-2xl border transition-all duration-200
            ${bg} ${border}
            ${isMinimized ? 'h-14 w-72' : 'w-[22rem] h-[560px]'}`}
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
              <button onClick={reset} title="Reset"
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
              {/* Message list */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                {messages.map((msg, i) => {
                  const text = getDisplayText(msg)
                  const isUser = msg.role === 'user'
                  const isLast = i === messages.length - 1
                  const showCursor = !isUser && isLast && !msg.done

                  return (
                    <div key={i} className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5
                        ${isUser
                          ? isDark ? 'bg-accent-blue/30' : 'bg-accent-blue/10'
                          : isDark ? 'bg-accent-teal/20' : 'bg-accent-teal/10'
                        }`}>
                        {isUser
                          ? <User size={12} className="text-accent-blue" />
                          : <Bot size={12} className="text-accent-teal" />}
                      </div>

                      {/* Bubble */}
                      <div className={`group relative max-w-[80%]`}>
                        <div className={`px-3 py-2.5 rounded-2xl
                          ${isUser
                            ? 'bg-accent-blue text-white rounded-tr-sm text-sm leading-relaxed'
                            : isDark
                              ? `${bgSub} ${bold} rounded-tl-sm border ${border}`
                              : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                          }`}>
                          {isUser
                            ? <p className="text-sm leading-relaxed">{text}</p>
                            : (
                              <div>
                                <MessageBubble content={text} isDark={isDark} />
                                {/* Blinking cursor while typing */}
                                {showCursor && (
                                  <span className="inline-block w-0.5 h-3.5 bg-accent-teal ml-0.5 align-middle animate-pulse" />
                                )}
                              </div>
                            )
                          }
                        </div>

                        {/* Timestamp + copy */}
                        <div className={`flex items-center gap-1 mt-1 px-0.5
                          ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-[10px] ${muted}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {!isUser && msg.done && text && (
                            <button onClick={() => copyMsg(text, i)}
                              className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded ${muted}`}>
                              {copied === i
                                ? <Check size={10} className="text-green-400" />
                                : <Copy size={10} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {isFirstMsg && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map(s => (
                    <button key={s.label} onClick={() => sendMessage(s.prompt)}
                      disabled={isTyping}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all
                        disabled:opacity-40
                        ${isDark
                          ? `border-[#1E2D3D] ${muted} hover:border-accent-teal hover:text-accent-teal`
                          : 'border-gray-200 text-gray-400 hover:border-accent-blue hover:text-accent-blue'
                        }`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className={`px-4 pb-4 pt-2 border-t flex-shrink-0 ${border}`}>
                <div className={`flex gap-2 items-end rounded-xl border px-3 py-2 transition-colors
                  ${isDark
                    ? `${bgSub} border-[#1E2D3D] focus-within:border-accent-teal`
                    : 'bg-gray-50 border-gray-200 focus-within:border-accent-blue'
                  }`}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isTyping ? 'Waiting for response...' : 'Ask about Rajif...'}
                    rows={1}
                    disabled={isTyping}
                    className={`flex-1 bg-transparent text-sm resize-none outline-none
                      max-h-20 min-h-[20px] leading-5 disabled:opacity-50
                      ${isDark
                        ? 'text-white placeholder:text-[#607B96]'
                        : 'text-gray-900 placeholder:text-gray-400'
                      }`}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isTyping}
                    className={`flex-shrink-0 p-1.5 rounded-lg transition-all
                      ${!input.trim() || isTyping
                        ? 'opacity-25 cursor-not-allowed'
                        : isDark
                          ? 'bg-accent-teal text-[#011627] hover:bg-accent-teal/80'
                          : 'bg-accent-blue text-white hover:bg-accent-blue/80'
                      }`}>
                    <Send size={15} />
                  </button>
                </div>
                <p className={`text-[10px] mt-1.5 text-center ${muted}`}>
                  Enter to send · No API needed
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
