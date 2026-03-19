'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  const { theme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  const isDark = theme === 'dark'
  const isEN = language === 'en'

  const handleToggle = () => {
    if (isAnimating) return
    setIsAnimating(true)
    toggleLanguage()
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      onClick={handleToggle}
      title={isEN ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
      aria-label={isEN ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
      className={`
        relative flex items-center gap-0 rounded-full border-2 overflow-hidden
        transition-all duration-300 ease-out select-none
        hover:scale-105 active:scale-95
        ${isDark
          ? 'border-[#1E2D3D] hover:border-accent-teal bg-[#011221]'
          : 'border-gray-200 hover:border-accent-blue bg-white'
        }
        ${isAnimating ? 'scale-95' : ''}
      `}
      style={{ width: '68px', height: '30px' }}
    >
      {/* Sliding background pill */}
      <div
        className={`
          absolute top-[2px] bottom-[2px] rounded-full z-10
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isEN
            ? 'left-[2px] w-[30px] bg-accent-teal shadow-[0_0_8px_rgba(67,217,173,0.5)]'
            : 'left-[34px] w-[30px] bg-accent-orange shadow-[0_0_8px_rgba(254,165,95,0.5)]'
          }
        `}
      />

      {/* EN Label */}
      <div
        className={`
          relative z-20 flex items-center justify-center
          font-bold text-[10px] tracking-wider
          transition-all duration-300
          ${isEN
            ? 'text-[#011221] w-[34px]'
            : `w-[34px] ${isDark ? 'text-[#607B96]' : 'text-gray-400'}`
          }
        `}
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        EN
      </div>

      {/* ID Label */}
      <div
        className={`
          relative z-20 flex items-center justify-center
          font-bold text-[10px] tracking-wider
          transition-all duration-300
          ${!isEN
            ? 'text-[#011221] w-[34px]'
            : `w-[34px] ${isDark ? 'text-[#607B96]' : 'text-gray-400'}`
          }
        `}
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        ID
      </div>

      {/* Ripple flash on click */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none" />
      )}
    </button>
  )
}
