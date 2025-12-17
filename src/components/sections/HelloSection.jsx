'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import SnakeGame from '@/components/game/SnakeGame'

export default function HelloSection() {
  const { theme } = useTheme()
  const [showContent, setShowContent] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)
  const [displayedTexts, setDisplayedTexts] = useState({
    greeting: '',
    firstName: '',
    lastName: '',
    role: '',
    instruction1: '',
    instruction2: '',
    githubLine: ''
  })

  const fullTexts = {
    greeting: 'Hi all, I am',
    firstName: 'Muhammad Rajif',
    lastName: 'Al Farikhi',
    role: 'Data Enthusiast',
    instruction1: '// complete the game to continue',
    instruction2: '// you can also see it on my Github page',
    githubLine: 'const githubLink = "https://github.com/rajfiPy"'
  }

  const typewriterSpeed = {
    greeting: 40,
    firstName: 30,
    lastName: 30,
    role: 30,
    instruction1: 15,
    instruction2: 15,
    githubLine: 10
  }

  const delays = {
    greeting: 100,
    firstName: 800,
    lastName: 1600,
    role: 2400,
    instruction1: 3600,
    instruction2: 4600,
    githubLine: 5600
  }

  useEffect(() => {
    setShowContent(false)
    const timer = setTimeout(() => setShowContent(true), 100)

    // Animate greeting
    setTimeout(() => {
      animateText('greeting', 0)
    }, delays.greeting)

    // Animate first name
    setTimeout(() => {
      animateText('firstName', 0)
    }, delays.firstName)

    // Animate last name
    setTimeout(() => {
      animateText('lastName', 0)
    }, delays.lastName)

    // Animate role
    setTimeout(() => {
      animateText('role', 0)
      setTimeout(() => {
        setTypewriterComplete(true)
      }, fullTexts.role.length * typewriterSpeed.role + 300)
    }, delays.role)

    // Animate instructions
    setTimeout(() => {
      animateText('instruction1', 0)
    }, delays.instruction1)

    setTimeout(() => {
      animateText('instruction2', 0)
    }, delays.instruction2)

    // Animate github line
    setTimeout(() => {
      animateText('githubLine', 0)
    }, delays.githubLine)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const animateText = (key, index) => {
    if (index <= fullTexts[key].length) {
      setDisplayedTexts(prev => ({
        ...prev,
        [key]: fullTexts[key].substring(0, index)
      }))
      
      setTimeout(() => {
        animateText(key, index + 1)
      }, typewriterSpeed[key])
    }
  }

  // Render colored github line with animation
  const renderGithubLine = () => {
    const text = displayedTexts.githubLine
    const fullText = fullTexts.githubLine
    
    // Find the URL part
    const urlStart = fullText.indexOf('"') + 1
    const urlEnd = fullText.lastIndexOf('"')
    const url = fullText.substring(urlStart, urlEnd)
    
    // Split the text into parts for coloring
    let beforeUrl = ''
    let urlPart = ''
    let afterUrl = ''
    
    if (text.length <= urlStart) {
      beforeUrl = text
    } else if (text.length <= urlEnd) {
      beforeUrl = fullText.substring(0, urlStart)
      urlPart = text.substring(urlStart, text.length)
    } else {
      beforeUrl = fullText.substring(0, urlStart)
      urlPart = fullText.substring(urlStart, urlEnd)
      afterUrl = text.substring(urlEnd)
    }

    return (
      <p className="mt-4 break-all">
        <span className="text-accent-blue">const</span>{' '}
        <span className="text-accent-teal">githubLink</span>{' '}
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>=</span>{' '}
        {beforeUrl}
        {urlPart && (
          <a 
            href="https://github.com/rajfiPy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent-pink hover:underline transition-all hover:text-accent-orange"
          >
            {urlPart}
          </a>
        )}
        {afterUrl}
      </p>
    )
  }

  return (
    <div className="max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
      <div className="flex-1 min-w-[280px] w-full">
        {/* Greeting with typewriter effect */}
        <p 
          className={`mb-2 md:mb-4 text-sm md:text-base transition-all duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${showContent ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            minHeight: '1.5em',
            fontFamily: "'Fira Code', monospace"
          }}
        >
          {displayedTexts.greeting}
          {displayedTexts.greeting.length < fullTexts.greeting.length && (
            <span className="animate-pulse inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"></span>
          )}
        </p>

        {/* First Name with typewriter effect */}
        <h1 
          className={`text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 font-normal transition-all duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${showContent ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            minHeight: '1.2em',
            fontFamily: "'Fira Code', monospace"
          }}
        >
          {displayedTexts.firstName}
          {displayedTexts.firstName.length < fullTexts.firstName.length && (
            <span className="animate-pulse inline-block w-[3px] h-[1.2em] bg-current ml-1 align-middle"></span>
          )}
        </h1>

        {/* Last Name with typewriter effect */}
        <h1 
          className={`text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 font-normal transition-all duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${showContent ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            minHeight: '1.2em',
            fontFamily: "'Fira Code', monospace"
          }}
        >
          {displayedTexts.lastName}
          {displayedTexts.lastName.length < fullTexts.lastName.length && (
            <span className="animate-pulse inline-block w-[3px] h-[1.2em] bg-current ml-1 align-middle"></span>
          )}
        </h1>

        {/* Role with enhanced typewriter effect */}
        <div className="text-accent-blue text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 lg:mb-16 min-h-[2rem] md:min-h-[2.5rem]">
          {/* Arrow symbol */}
          <span 
            className={`text-accent-teal transition-all duration-500 inline-block ${
              displayedTexts.role.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            &gt;
          </span>{' '}
          
          {/* Typewriter text */}
          <span className="relative inline-block">
            <span
              className={`inline-block ${
                !typewriterComplete ? 'typewriter-role' : ''
              }`}
              style={{ 
                fontFamily: "'Fira Code', monospace",
                borderRight: !typewriterComplete ? '2px solid' : 'none',
                animationDelay: '0s',
                animationDuration: '0.8s'
              }}
            >
              {displayedTexts.role}
              {displayedTexts.role.length < fullTexts.role.length && !typewriterComplete && (
                <span className="animate-pulse inline-block w-[2px] h-[1.2em] bg-current ml-1 align-middle"></span>
              )}
            </span>
          </span>
        </div>

        {/* Instructions with typewriter effect */}
        <div className="space-y-2 mb-6 md:mb-8 text-xs md:text-sm">
          <p 
            className="transition-all duration-300"
            style={{ 
              minHeight: '1.2em',
              fontFamily: "'Fira Code', monospace"
            }}
          >
            {displayedTexts.instruction1}
            {displayedTexts.instruction1.length < fullTexts.instruction1.length && (
              <span className="animate-pulse inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"></span>
            )}
          </p>
          
          <p 
            className="transition-all duration-300"
            style={{ 
              minHeight: '1.2em',
              fontFamily: "'Fira Code', monospace"
            }}
          >
            {displayedTexts.instruction2}
            {displayedTexts.instruction2.length < fullTexts.instruction2.length && (
              <span className="animate-pulse inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"></span>
            )}
          </p>

          {/* GitHub line with syntax highlighting */}
          <div 
            className="transition-all duration-300"
            style={{ 
              minHeight: '1.2em',
              fontFamily: "'Fira Code', monospace"
            }}
          >
            {renderGithubLine()}
            {displayedTexts.githubLine.length < fullTexts.githubLine.length && (
              <span className="animate-pulse inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"></span>
            )}
          </div>
        </div>
      </div>

      {/* Snake Game with delayed scale-in animation */}
      <div 
        className={`w-full lg:w-auto flex justify-center transition-all duration-1000 ${
          typewriterComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ 
          transitionDelay: typewriterComplete ? '0.5s' : '0s',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <SnakeGame />
      </div>
    </div>
  )
}
