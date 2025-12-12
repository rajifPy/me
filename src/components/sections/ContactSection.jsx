'use client'

import { useTheme } from '@/context/ThemeContext'
import { Mail, Phone, Linkedin, Github } from 'lucide-react'

export default function ContactSection() {
  const { theme } = useTheme()
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  return (
    <div className="max-w-4xl">
      <h2 className={`text-2xl mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <span>//</span> Get In Touch
      </h2>

      <div className="space-y-6">
        <div>
          <p className="text-accent-blue mb-4">
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>const</span> contactInfo = {'{'}
          </p>
          <div className="pl-8 space-y-3">
            <p className="flex items-center gap-3">
              <Mail size={18} className="text-accent-teal" />
              <span className="text-accent-teal">email</span>: 
              <a href="mailto:mrajifalfarikhi@gmail.com" className="text-accent-pink hover:underline ml-2">
                "mrajifalfarikhi@gmail.com"
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={18} className="text-accent-teal" />
              <span className="text-accent-teal">phone</span>: 
              <a href="tel:081460326800" className="text-accent-pink hover:underline ml-2">
                "+6281460326800"
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Linkedin size={18} className="text-accent-teal" />
              <span className="text-accent-teal">linkedin</span>: 
              <a href="https://www.linkedin.com/in/muhammadrajifalfarikhi" target="_blank" rel="noopener noreferrer" className="text-accent-pink hover:underline ml-2">
                "muhammadrajifalfarikhi"
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Github size={18} className="text-accent-teal" />
              <span className="text-accent-teal">github</span>: 
              <a href="https://github.com/rajfiPy" target="_blank" rel="noopener noreferrer" className="text-accent-pink hover:underline ml-2">
                "rajfiPy"
              </a>
            </p>
          </div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{'}'}</p>
        </div>

        <div className={`mt-12 p-6 border ${borderClass} rounded-lg`}>
          <p className="mb-4">
            <span className="text-accent-teal">console</span>.<span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>log</span>(
            <span className="text-accent-pink">"Let's work together on data projects!"</span>)
          </p>
          <p>// Available for Data Analyst roles</p>
          <p>// Open to collaborations & opportunities</p>
        </div>
      </div>
    </div>
  )
}