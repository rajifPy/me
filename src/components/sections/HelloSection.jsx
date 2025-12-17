'use client'

import { useTheme } from '@/context/ThemeContext'
import SnakeGame from '@/components/game/SnakeGame'
import { useState, useEffect } from 'react'

export default function HelloSection() {
  const { theme } = useTheme()
  const [displayText, setDisplayText] = useState({
    intro: '',
    name1: '',
    name2: '',
    role: '',
    github: ''
  })
  const [isTyping, setIsTyping] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)

  const introText = "Hi all, I am"
  const name1Text = "Muhammad Rajif"
  const name2Text = "Al Farikhi"
  const roleText = "> Data Enthusiast"
  const githubText = 'const githubLink = "https://github.com/rajfiPy"'

  useEffect(() => {
    // Start typing animation after component mounts
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isTyping) return

    const typeWriter = async () => {
      // Type intro text
      for (let i = 0; i <= introText.length; i++) {
        setDisplayText(prev => ({ ...prev, intro: introText.substring(0, i) }))
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      await new Promise(resolve => setTimeout(resolve, 200))

      // Type first name with bounce effect
      for (let i = 0; i <= name1Text.length; i++) {
        setDisplayText(prev => ({ ...prev, name1: name1Text.substring(0, i) }))
        await new Promise(resolve => setTimeout(resolve, 60))
      }
      setCurrentLine(1) // Trigger bounce animation for first name
      await new Promise(resolve => setTimeout(resolve, 400))

      // Type second name with bounce effect
      for (let i = 0; i <= name2Text.length; i++) {
        setDisplayText(prev => ({ ...prev, name2: name2Text.substring(0, i) }))
        await new Promise(resolve => setTimeout(resolve, 60))
      }
      setCurrentLine(2) // Trigger bounce animation for second name
      await new Promise(resolve => setTimeout(resolve, 400))

      // Type role text
      for (let i = 0; i <= roleText.length; i++) {
        setDisplayText(prev => ({ ...prev, role: roleText.substring(0, i) }))
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      await new Promise(resolve => setTimeout(resolve, 300))

      // Type github text
      for (let i = 0; i <= githubText.length; i++) {
        setDisplayText(prev => ({ ...prev, github: githubText.substring(0, i) }))
        await new Promise(resolve => setTimeout(resolve, 30))
      }
    }

    typeWriter()
  }, [isTyping])

  return (
    <div className="max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
      <div className="flex-1 min-w-[280px] w-full">
        {/* Intro Text */}
        <p className={`mb-2 md:mb-4 text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-mono`}>
          {displayText.intro}
          <span className="animate-pulse">|</span>
        </p>

        {/* First Name with Typewriter and Bounce */}
        <h1 className={`
          text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 font-normal
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          ${currentLine >= 1 ? 'animate-bounce-subtle' : ''}
          transition-all duration-300 ease-out
          transform ${currentLine >= 1 ? 'translate-y-0' : 'translate-y-2'}
          font-mono
        `}>
          {displayText.name1}
          {displayText.name1.length < name1Text.length && <span className="animate-pulse">|</span>}
        </h1>

        {/* Second Name with Typewriter and Bounce */}
        <h1 className={`
          text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 font-normal
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          ${currentLine >= 2 ? 'animate-bounce-subtle' : ''}
          transition-all duration-300 ease-out
          transform ${currentLine >= 2 ? 'translate-y-0' : 'translate-y-2'}
          font-mono
        `}>
          {displayText.name2}
          {displayText.name2.length < name2Text.length && <span className="animate-pulse">|</span>}
        </h1>

        {/* Role Text with Typewriter */}
        <p className="text-accent-blue text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 lg:mb-16 font-mono">
          <span className="text-accent-teal">{displayText.role.charAt(0)}</span>
          {displayText.role.substring(1)}
          {displayText.role.length < roleText.length && <span className="animate-pulse">|</span>}
        </p>
        
        {/* GitHub Text with Typewriter */}
        <div className="space-y-2 mb-6 md:mb-8 text-xs md:text-sm font-mono">
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            // complete the game to continue
          </p>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            // you can also see it on my Github page
          </p>
          <p className="mt-4 break-all">
            {displayText.github.substring(0, 6)}
            <span className="text-accent-blue">{displayText.github.substring(6, 12)}</span>
            {displayText.github.substring(12, 19)}
            <span className="text-accent-teal">{displayText.github.substring(19, 29)}</span>
            {displayText.github.substring(29, 30)}
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              {displayText.github.substring(30, 31)}
            </span>
            {displayText.github.substring(31)}
            {displayText.github.length < githubText.length && <span className="animate-pulse">|</span>}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-auto flex justify-center">
        <SnakeGame />
      </div>

      {/* Add custom animations to global styles */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 0.5s ease-in-out;
        }
        .animate-pulse {
          animation: blink 0.7s infinite;
          font-weight: normal;
          margin-left: 2px;
        }
        .font-mono {
          font-family: 'Fira Code', 'Cascadia Code', 'Source Code Pro', monospace;
        }
      `}</style>
    </div>
  )
}
