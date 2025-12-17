'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import SnakeGame from '@/components/game/SnakeGame'

export default function HelloSection() {
  const { theme } = useTheme()
  const [showContent, setShowContent] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false) // 

  useEffect(() => {
    if (!hasAnimated) {
      // Hanya jalankan sekali saat mount
      setShowContent(false)
      const timer = setTimeout(() => {
        setShowContent(true)
        setHasAnimated(true) // Tandai bahwa animasi sudah pernah dijalankan
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [hasAnimated]) 

  return (
    <div className="max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
      <div className="flex-1 min-w-[280px] w-full">
        {/* Greeting text with fade-in */}
        <p className={`mb-2 md:mb-4 text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'} ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
          Hi all, I am
        </p>

        {/* Name with slide-in and bounce */}
        <h1 className={`text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'} ${showContent ? 'animate-slide-bounce' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          Muhammad Rajif
        </h1>

        <h1 className={`text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'} ${showContent ? 'animate-slide-bounce' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          Al Farikhi
        </h1>

        {/* Role with typewriter effect */}
        <p className="text-accent-blue text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 lg:mb-16">
          <span className={`text-accent-teal ${showContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
            &gt;
          </span>{' '}
          <span
            className={`inline-block ${
              showContent && !hasAnimated ? 'typewriter-role' : '' // 🆕 Gunakan kelas CSS, bukan animate-* Tailwind
            }`}
            style={{
              animationDelay: '0.9s',
              // Jika ingin fade-in juga, tambahkan class "fade-in"
              // className: `${showContent && !hasAnimated ? 'typewriter-role fade-in' : ''}`
            }}
          >
            Data Enthusiast
          </span>
        </p>

        <div className="space-y-2 mb-6 md:mb-8 text-xs md:text-sm">
          <p>// complete the game to continue</p>
          <p>// you can also see it on my Github page</p>
          <p className="mt-4 break-all">
            <span className="text-accent-blue">const</span>{' '}
            <span className="text-accent-teal">githubLink</span>{' '}
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>=</span>{' '}
            <a href="https://github.com/rajfiPy" className="text-accent-pink hover:underline">
              "https://github.com/rajfiPy"
            </a>
          </p>
        </div>
      </div>

      <div className="w-full lg:w-auto flex justify-center">
        <SnakeGame />
      </div>
    </div>
  )
}
