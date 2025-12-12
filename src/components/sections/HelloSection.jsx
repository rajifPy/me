'use client'

import { useTheme } from '@/context/ThemeContext'
import SnakeGame from '@/components/game/SnakeGame'

export default function HelloSection() {
  const { theme } = useTheme()

  return (
    <div className="max-w-6xl flex items-center gap-16 flex-wrap">
      <div className="flex-1 min-w-[300px]">
        <p className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Hi all, I am</p>
        <h1 className={`text-5xl mb-2 font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Muhammad Rajif
        </h1>
        <h1 className={`text-5xl mb-6 font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Al Farikhi
        </h1>
        <p className="text-accent-blue text-2xl mb-16">
          <span className="text-accent-teal">&gt;</span> Data Enthusiast
        </p>
        
        <div className="space-y-2 mb-8">
          <p>// complete the game to continue</p>
          <p>// you can also see it on my Github page</p>
          <p className="mt-4">
            <span className="text-accent-blue">const</span>{' '}
            <span className="text-accent-teal">githubLink</span>{' '}
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>=</span>{' '}
            <a href="https://github.com/rajfiPy" className="text-accent-pink hover:underline">
              "https://github.com/rajfiPy"
            </a>
          </p>
        </div>
      </div>

      <SnakeGame />
    </div>
  )
}