// src/app/page.js
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'
import HelloSection from '@/components/sections/HelloSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ResearchSection from '@/components/sections/ResearchSection'
import ContactSection from '@/components/sections/ContactSection'
import AIChatbot from '@/components/ui/AIChatbot'
import { useVisitTracker } from '@/hooks/useVisitTracker'
import CommandPalette from '@/components/ui/CommandPalette'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function Home() {
  const [activeSection, setActiveSection] = useState('hello')
  const [activeTab, setActiveTab] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState([])
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // Controls whether the loading screen is shown
  const [showLoading, setShowLoading] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)

  useVisitTracker(activeSection)

  useEffect(() => {
    setMounted(true)

    // Show loading screen only if not seen in this session
    const seen = sessionStorage.getItem('portfolio_intro_seen')
    if (!seen) {
      setShowLoading(true)
    } else {
      setLoadingDone(true)
    }
  }, [])

  useEffect(() => {
    if (activeSection !== 'projects') {
      setSelectedFilters([])
    }
  }, [activeSection])

  const handleLoadingComplete = () => {
    sessionStorage.setItem('portfolio_intro_seen', '1')
    setShowLoading(false)
    setLoadingDone(true)
  }

  const showSidebar = activeSection === 'about-me' || activeSection === 'projects'

  if (!mounted) return null

  return (
    <>
      {/* Loading screen — rendered on top */}
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Main portfolio — always rendered but hidden until loading is done */}
      <div
        className={`min-h-screen font-mono flex flex-col ${
          theme === 'dark'
            ? 'bg-dark-bg text-dark-text'
            : 'bg-light-bg text-light-text'
        }`}
        style={{
          opacity: loadingDone ? 1 : 0,
          transition: loadingDone ? 'opacity 0.5s ease 0.1s' : 'none',
          pointerEvents: loadingDone ? 'auto' : 'none',
        }}
      >
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
              <div className={`border-b ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}
                flex items-center h-10 flex-shrink-0`}>
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
              {activeSection === 'hello'      && <HelloSection />}
              {activeSection === 'about-me'   && <AboutSection activeTab={activeTab} />}
              {activeSection === 'projects'   && <ProjectsSection selectedFilters={selectedFilters} />}
              {activeSection === 'research'   && <ResearchSection />}
              {activeSection === 'contact-me' && <ContactSection />}
            </div>
          </main>
        </div>

        <Footer />
        <AIChatbot activeSection={activeSection} />
        <CommandPalette setActiveSection={setActiveSection} setActiveTab={setActiveTab} />
      </div>
    </>
  )
}
