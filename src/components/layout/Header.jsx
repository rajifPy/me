'use client'

import { useTheme } from '@/context/ThemeContext'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Header({ activeSection, setActiveSection }) {
  const { theme } = useTheme()
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  return (
    <header className={`border-b ${borderClass} flex items-center justify-between px-6 h-14 flex-shrink-0`}>
      <div className="text-sm">murfhi</div>
      
      <nav className="flex h-full">
        {['_hello', '_about-me', '_projects', '_contact-me'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveSection(item.replace('_', ''))}
            className={`px-6 border-r ${borderClass} h-full hover:text-accent-teal transition-colors ${
              activeSection === item.replace('_', '') 
                ? 'text-white border-b-2 border-accent-orange' 
                : ''
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <a 
          href="https://github.com/rajfiPy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-accent-teal transition-colors"
        >
          _contact-me
        </a>
      </div>
    </header>
  )
}