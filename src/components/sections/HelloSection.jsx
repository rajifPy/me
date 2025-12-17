'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import SnakeGame from '@/components/game/SnakeGame'

export default function HelloSection() {
  const { theme } = useTheme()
  const [showContent, setShowContent] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  useEffect(() => {
    setShowContent(false)
    const timer = setTimeout(() => setShowContent(true), 100)
    
    // Mark typewriter as complete after animation
    const typewriterTimer = setTimeout(() => {
      setTypewriterComplete(true)
    }, 3200) // 0.9s delay + 2.2s animation + 0.1s buffer

    return () => {
      clearTimeout(timer)
      clearTimeout(typewriterTimer)
    }
  }, [])

  return (
    <div className="max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
      <div className="flex-1 min-w-[280px] w-full">
        {/* Greeting with fade-in */}
        <p 
          className={`mb-2 md:mb-4 text-sm md:text-base transition-all duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Hi all, I am
        </p>

        {/* First Name with slide-in from left */}
        <h1 
          className={`text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 font-normal transition-all duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          style={{ 
            transitionDelay: showContent ? '0.2s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' // bounce effect
          }}
        >
          Muhammad Rajif
        </h1>

        {/* Last Name with slide-in from left (delayed) */}
        <h1 
          className={`text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 font-normal transition-all duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          style={{ 
            transitionDelay: showContent ? '0.4s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          Al Farikhi
        </h1>

        {/* Role with typewriter effect */}
        <div className="text-accent-blue text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 lg:mb-16 min-h-[2rem] md:min-h-[2.5rem]">
          {/* Arrow symbol with fade-in */}
          <span 
            className={`text-accent-teal transition-all duration-500 inline-block ${
              showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: showContent ? '0.6s' : '0s' }}
          >
            &gt;
          </span>{' '}
          
          {/* Typewriter text container */}
          <span className="relative inline-block">
            <span
              className={`${
                showContent && !typewriterComplete ? 'typewriter-role' : ''
              } ${
                showContent ? 'opacity-100' : 'opacity-0'
              } inline-block transition-opacity duration-300`}
              style={{ 
                animationDelay: showContent ? '0.8s' : '0s',
                minWidth: typewriterComplete ? 'auto' : '0'
              }}
            >
              Data Enthusiast
            </span>
          </span>
        </div>

        {/* Instructions with sequential fade-in */}
        <div className="space-y-2 mb-6 md:mb-8 text-xs md:text-sm">
          <p 
            className={`transition-all duration-700 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: showContent ? '3.0s' : '0s' }}
          >
            // complete the game to continue
          </p>
          <p 
            className={`transition-all duration-700 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: showContent ? '3.2s' : '0s' }}
          >
            // you can also see it on my Github page
          </p>
          <p 
            className={`mt-4 break-all transition-all duration-700 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: showContent ? '3.4s' : '0s' }}
          >
            <span className="text-accent-blue">const</span>{' '}
            <span className="text-accent-teal">githubLink</span>{' '}
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>=</span>{' '}
            <a 
              href="https://github.com/rajfiPy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-pink hover:underline transition-all hover:text-accent-orange"
            >
              "https://github.com/rajfiPy"
            </a>
          </p>
        </div>
      </div>

      {/* Snake Game with scale-in animation */}
      <div 
        className={`w-full lg:w-auto flex justify-center transition-all duration-1000 ${
          showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ 
          transitionDelay: showContent ? '1.0s' : '0s',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <SnakeGame />
      </div>
    </div>
  )
}
