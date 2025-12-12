'use client'

import { useTheme } from '@/context/ThemeContext'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const { theme } = useTheme()
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  return (
    <footer className={`border-t ${borderClass} px-6 py-3 flex items-center justify-between text-sm flex-shrink-0`}>
      <div className="flex items-center gap-4">
        <span>find me in:</span>
        <a href="https://twitter.com" className="hover:text-accent-teal transition-colors">
          <Twitter size={18} />
        </a>
        <a href="https://linkedin.com/in/muhammadrajifalfarikhi" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal transition-colors">
          <Linkedin size={18} />
        </a>
      </div>
      <a href="https://github.com/rajfiPy" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 hover:text-accent-teal border-l ${borderClass} pl-4 transition-colors`}>
        @rajfiPy
        <Github size={18} />
      </a>
    </footer>
  )
}