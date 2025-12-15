'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { ChevronDown, ChevronRight, Folder, FileText, Mail, Phone, X, Menu, Code2, Award, Zap, Camera } from 'lucide-react'
import { techFilters } from '@/data/projects'

export default function Sidebar({ activeSection, activeTab, setActiveTab, selectedFilters, setSelectedFilters }) {
  const { theme } = useTheme()
  const [openFolders, setOpenFolders] = useState({ 
    'personal-info': true, 
    'education': true,
    'professional': true 
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleFolder = (folder) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }))
  }

  const toggleFilter = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
  }

  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  const bgClass = theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setMobileOpen(false)
  }

  const sidebarContent = (
    <>
      {activeSection === 'about-me' && (
        <div className="p-4">
          <div className="mb-2">
            <button
              onClick={() => toggleFolder('personal-info')}
              className="flex items-center gap-2 hover:text-accent-teal transition-colors w-full"
            >
              {openFolders['personal-info'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Folder size={16} className="text-accent-pink" />
              <span className="text-sm">personal-info</span>
            </button>
            
            {openFolders['personal-info'] && (
              <div className="ml-6 mt-2 space-y-2">
                <button
                  onClick={() => handleTabClick('bio')}
                  className={`flex items-center gap-2 transition-colors text-sm ${
                    activeTab === 'bio' ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  <FileText size={14} />
                  <span>bio</span>
                </button>

                <button
                  onClick={() => handleTabClick('skills')}
                  className={`flex items-center gap-2 transition-colors text-sm ${
                    activeTab === 'skills' ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  <Zap size={14} className="text-accent-teal" />
                  <span>skills</span>
                </button>

                <button
                  onClick={() => handleTabClick('code-samples')}
                  className={`flex items-center gap-2 transition-colors text-sm ${
                    activeTab === 'code-samples' ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  <Code2 size={14} className="text-accent-blue" />
                  <span>code-samples</span>
                </button>

                <button
                  onClick={() => handleTabClick('certifications')}
                  className={`flex items-center gap-2 transition-colors text-sm ${
                    activeTab === 'certifications' ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  <Award size={14} className="text-accent-orange" />
                  <span>certifications</span>
                </button>

                {/* NEW: Photos Button */}
                <button
                  onClick={() => handleTabClick('photos')}
                  className={`flex items-center gap-2 transition-colors text-sm ${
                    activeTab === 'photos' ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  <Camera size={14} className="text-accent-pink" />
                  <span>photos</span>
                </button>
                
                <div>
                  <button
                    onClick={() => toggleFolder('education')}
                    className="flex items-center gap-2 hover:text-white transition-colors text-sm"
                  >
                    {openFolders['education'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <Folder size={14} className="text-accent-blue" />
                    <span>education</span>
                  </button>
                  
                  {openFolders['education'] && (
                    <div className="ml-6 mt-1 space-y-1">
                      <button
                        onClick={() => handleTabClick('university')}
                        className={`flex items-center gap-2 text-xs transition-colors ${
                          activeTab === 'university' ? 'text-white' : 'hover:text-white'
                        }`}
                      >
                        <FileText size={12} />
                        <span>university</span>
                      </button>
                      <button
                        onClick={() => handleTabClick('high-school')}
                        className={`flex items-center gap-2 text-xs transition-colors ${
                          activeTab === 'high-school' ? 'text-white' : 'hover:text-white'
                        }`}
                      >
                        <FileText size={12} />
                        <span>high-school</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center gap-2">
              <ChevronDown size={16} />
              <span className="text-sm">contacts</span>
            </div>
            <div className="ml-6 space-y-2">
              <a 
                href="mailto:mrajifalfarikhi@gmail.com" 
                className="flex items-center gap-2 hover:text-white transition-colors text-sm"
              >
                <Mail size={14} />
                <span>email</span>
              </a>
              <a 
                href="tel:081460326800" 
                className="flex items-center gap-2 hover:text-white transition-colors text-sm"
              >
                <Phone size={14} />
                <span>phone</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'projects' && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ChevronDown size={16} />
              <span className="text-sm font-semibold">projects</span>
            </div>
            {selectedFilters.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-accent-orange hover:text-accent-orange/80 transition-colors"
              >
                clear all
              </button>
            )}
          </div>
          
          {selectedFilters.length > 0 && (
            <div className="mb-3 text-xs text-accent-blue">
              {selectedFilters.length} {selectedFilters.length === 1 ? 'filter' : 'filters'} selected
            </div>
          )}

          <div className="space-y-2">
            {techFilters.map((filter) => (
              <label 
                key={filter.name} 
                className={`flex items-center gap-2 cursor-pointer transition-colors p-2 rounded ${
                  selectedFilters.includes(filter.name)
                    ? theme === 'dark' 
                      ? 'bg-accent-teal/10 text-white' 
                      : 'bg-accent-blue/10 text-gray-900'
                    : 'hover:text-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter.name)}
                  onChange={() => toggleFilter(filter.name)}
                  className={`w-4 h-4 rounded cursor-pointer ${
                    theme === 'dark'
                      ? 'accent-accent-teal'
                      : 'accent-accent-blue'
                  }`}
                />
                <span className="text-xs flex-1">{filter.icon} {filter.name}</span>
                {selectedFilters.includes(filter.name) && (
                  <span className="text-xs text-accent-teal">✓</span>
                )}
              </label>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-dark-border">
            <p className="text-xs text-accent-blue mb-2">// filter tips:</p>
            <p className="text-xs opacity-60">Select multiple filters to see projects that use any of the selected technologies</p>
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg ${
          theme === 'dark' ? 'bg-accent-teal text-dark-bg' : 'bg-accent-blue text-white'
        }`}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block w-64 border-r ${borderClass} flex-shrink-0 overflow-y-auto`}>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className={`absolute left-0 top-0 bottom-0 w-64 border-r ${borderClass} ${bgClass} overflow-y-auto shadow-xl`}>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
