'use client'

import { useTheme } from '@/context/ThemeContext'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const { theme } = useTheme()
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  return (
    <footer className={`border-t ${borderClass} px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs md:text-sm flex-shrink-0`}>
      <div className="flex items-center gap-3 md:gap-4">
        <span className="hidden sm:inline">find me in:</span>
        <a href="https://twitter.com" className="hover:text-accent-teal transition-colors" aria-label="Twitter">
          <Twitter size={16} className="md:w-[18px] md:h-[18px]" />
        </a>
        <a href="https://linkedin.com/in/muhammadrajifalfarikhi" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal transition-colors" aria-label="LinkedIn">
          <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
        </a>
      </div>
      <a href="https://github.com/rajfiPy" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 hover:text-accent-teal sm:border-l ${borderClass} sm:pl-4 transition-colors`}>
        <span className="truncate">@rajfiPy</span>
        <Github size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" />
      </a>
    </footer>
  )
}
