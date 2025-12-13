'use client'

import { useTheme } from '@/context/ThemeContext'
import { Mail, Phone, Linkedin, Github } from 'lucide-react'

export default function ContactSection() {
  const { theme } = useTheme()
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-xl md:text-2xl mb-6 md:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <span>//</span> Get In Touch
      </h2>

      <div className="space-y-4 md:space-y-6">
        <div className="text-sm md:text-base">
          <p className="text-accent-blue mb-4">
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>const</span> contactInfo = {'{'}
          </p>
          <div className="pl-4 md:pl-8 space-y-2 md:space-y-3">
            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 break-all">
              <span className="flex items-center gap-2">
                <Mail size={16} className="md:w-[18px] md:h-[18px] text-accent-teal flex-shrink-0" />
                <span className="text-accent-teal">email</span>:
              </span>
              <a href="mailto:mrajifalfarikhi@gmail.com" className="text-accent-pink hover:underline sm:ml-2">
                "mrajifalfarikhi@gmail.com"
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="flex items-center gap-2">
                <Phone size={16} className="md:w-[18px] md:h-[18px] text-accent-teal flex-shrink-0" />
                <span className="text-accent-teal">phone</span>:
              </span>
              <a href="tel:081460326800" className="text-accent-pink hover:underline sm:ml-2">
                "+6281460326800"
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 break-all">
              <span className="flex items-center gap-2">
                <Linkedin size={16} className="md:w-[18px] md:h-[18px] text-accent-teal flex-shrink-0" />
                <span className="text-accent-teal">linkedin</span>:
              </span>
              <a href="https://www.linkedin.com/in/muhammadrajifalfarikhi" target="_blank" rel="noopener noreferrer" className="text-accent-pink hover:underline sm:ml-2">
                "muhammadrajifalfarikhi"
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="flex items-center gap-2">
                <Github size={16} className="md:w-[18px] md:h-[18px] text-accent-teal flex-shrink-0" />
                <span className="text-accent-teal">github</span>:
              </span>
              <a href="https://github.com/rajfiPy" target="_blank" rel="noopener noreferrer" className="text-accent-pink hover:underline sm:ml-2">
                "rajfiPy"
              </a>
            </p>
          </div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{'}'}</p>
        </div>

        <div className={`mt-8 md:mt-12 p-4 md:p-6 border ${borderClass} rounded-lg text-sm md:text-base`}>
          <p className="mb-4 break-words">
            <span className="text-accent-teal">console</span>.<span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>log</span>(
            <span className="text-accent-pink">"Let's work together on data projects!"</span>)
          </p>
          <p className="text-xs md:text-sm">// Available for Data Analyst roles</p>
          <p className="text-xs md:text-sm">// Open to collaborations & opportunities</p>
        </div>
      </div>
    </div>
  )
