'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('language')
    if (saved === 'id' || saved === 'en') {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en')
  }

  if (!mounted) return null

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export default LanguageProvider
