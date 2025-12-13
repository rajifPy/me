'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { Menu, X } from 'lucide-react'

export default function Header({ activeSection, setActiveSection }) {
  const { theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  const navItems = ['_hello', '_about-me', '_projects', '_contact-me']

  return (
    <header className={`border-b ${borderClass} flex items-center justify-between px-4 md:px-6 h-14 flex-shrink-0`}>
      <div className="text-sm font-bold">murfhi</div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex h-full">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveSection(item.replace('_', ''))}
            className={`px-4 lg:px-6 border-r ${borderClass} h-full hover:text-accent-teal transition-colors text-sm ${
              activeSection === item.replace('_', '') 
                ? 'text-white border-b-2 border-accent-orange' 
                : ''
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:text-accent-teal transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop Contact */}
        <a 
          href="https://github.com/rajfiPy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hidden md:block hover:text-accent-teal transition-colors text-sm"
        >
          _contact-me
        </a>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`absolute top-14 left-0 right-0 border-b ${borderClass} ${
          theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
        } md:hidden z-50`}>
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item.replace('_', ''))
                  setMobileMenuOpen(false)
                }}
                className={`px-6 py-3 border-b ${borderClass} hover:text-accent-teal transition-colors text-left ${
                  activeSection === item.replace('_', '') 
                    ? 'text-white bg-accent-teal/10' 
                    : ''
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
