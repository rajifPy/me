'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { ChevronDown, ChevronRight, Folder, FileText, Mail, Phone, X, Menu } from 'lucide-react'
import { techFilters } from '@/data/projects'


export default function Sidebar({ activeSection, activeTab, setActiveTab }) {
  const { theme } = useTheme()
  const [openFolders, setOpenFolders] = useState({ 'personal-info': true, 'education': true })
  const [selectedFilters, setSelectedFilters] = useState([])

  const toggleFolder = (folder) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }))
  }

  const toggleFilter = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  return (
    <aside className={`w-64 border-r ${borderClass} flex-shrink-0 overflow-y-auto`}>
      {activeSection === 'about-me' && (
        <div className="p-4">
          <div className="mb-2">
            <button
              onClick={() => toggleFolder('personal-info')}
              className="flex items-center gap-2 hover:text-accent-teal transition-colors w-full"
            >
              {openFolders['personal-info'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Folder size={16} className="text-accent-pink" />
              <span>personal-info</span>
            </button>
            
            {openFolders['personal-info'] && (
              <div className="ml-6 mt-2 space-y-2">
                <button
                  onClick={() => setActiveTab('bio')}
                  className={`flex items-center gap-2 transition-colors ${activeTab === 'bio' ? 'text-white' : 'hover:text-white'}`}
                >
                  <Folder size={14} className="text-accent-pink" />
                  <span>bio</span>
                </button>
                
                <div>
                  <button
                    onClick={() => toggleFolder('education')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    {openFolders['education'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <Folder size={14} className="text-accent-blue" />
                    <span>education</span>
                  </button>
                  
                  {openFolders['education'] && (
                    <div className="ml-6 mt-1 space-y-1">
                      <button
                        onClick={() => setActiveTab('university')}
                        className={`flex items-center gap-2 text-sm transition-colors ${activeTab === 'university' ? 'text-white' : 'hover:text-white'}`}
                      >
                        <FileText size={12} />
                        <span>university</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('high-school')}
                        className={`flex items-center gap-2 text-sm transition-colors ${activeTab === 'high-school' ? 'text-white' : 'hover:text-white'}`}
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
              <span>contacts</span>
            </div>
            <div className="ml-6 space-y-2">
              <a href="mailto:mrajifalfarikhi@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} />
                <span className="text-sm">email</span>
              </a>
              <a href="tel:081460326800" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} />
                <span className="text-sm">phone</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'projects' && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <ChevronRight size={16} />
            <span>projects</span>
          </div>
          <div className="space-y-2">
            {techFilters.map((filter) => (
              <label key={filter.name} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter.name)}
                  onChange={() => toggleFilter(filter.name)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">{filter.icon} {filter.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
