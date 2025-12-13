'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'
import HelloSection from '@/components/sections/HelloSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState('hello')
  const [activeTab, setActiveTab] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState([])
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset filters when changing sections
  useEffect(() => {
    if (activeSection !== 'projects') {
      setSelectedFilters([])
    }
  }, [activeSection])

  const showSidebar = activeSection === 'about-me' || activeSection === 'projects'

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen font-mono flex flex-col ${
      theme === 'dark' 
        ? 'bg-dark-bg text-dark-text' 
        : 'bg-light-bg text-light-text'
    }`}>
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <Sidebar 
            activeSection={activeSection} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          {activeTab && activeSection === 'about-me' && (
            <div className={`border-b ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'} flex items-center h-10 flex-shrink-0`}>
              <div className={`flex items-center gap-2 px-3 md:px-4 border-r ${
                theme === 'dark' ? 'border-dark-border bg-dark-secondary' : 'border-light-border bg-light-secondary'
              } h-full`}>
                <span className="text-xs md:text-sm truncate max-w-[120px] md:max-w-none">
                  {activeTab}
                </span>
                <button 
                  onClick={() => setActiveTab(null)} 
                  className="hover:text-accent-teal flex-shrink-0"
                  aria-label="Close tab"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
            {activeSection === 'hello' && <HelloSection />}
            {activeSection === 'about-me' && <AboutSection activeTab={activeTab} />}
            {activeSection === 'projects' && (
              <ProjectsSection selectedFilters={selectedFilters} />
            )}
            {activeSection === 'contact-me' && <ContactSection />}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
