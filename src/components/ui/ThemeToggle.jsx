'use client'

import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    try {
      toggleTheme()
    } catch (error) {
      console.error('Theme toggle error:', error)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg transition-all ${
        theme === 'dark'
          ? 'bg-dark-border hover:bg-accent-teal/20 text-accent-teal'
          : 'bg-light-border hover:bg-accent-blue/20 text-accent-blue'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
