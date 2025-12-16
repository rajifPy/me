// src/components/sections/AboutSection.jsx
'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { TrendingUp, Award, Calendar, Briefcase, Code2, BarChart3, Filter } from 'lucide-react'
import { experiences } from '@/data/experience'
import { certifications } from '@/data/certifications'
import { codeSnippets, snippetCategories } from '@/data/codeSnippets'
import { skillsData, getSkillStats } from '@/data/skills'
import CodeSnippet from '@/components/ui/CodeSnippet'
import CertificationBadges from '@/components/ui/CertificationBadges'
import PhotoAlbum from '@/components/ui/PhotoAlbum'

export default function AboutSection({ activeTab }) {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Skills Matrix states
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('level')

  const renderBio = () => (
    <div className="space-y-4 md:space-y-6">
      <h2 className={`text-xl md:text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <span className="text-accent-blue">//</span> About Me
      </h2>
      <div className="space-y-3 md:space-y-4 text-sm md:text-base">
        <p>
          <span className="text-accent-blue">const</span>{' '}
          <span className="text-accent-teal">bio</span>{' '}
          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>=</span>{' '}
          {'{'}
        </p>
        <div className="pl-4 md:pl-8 space-y-2">
          <p className="break-words">
            <span className="text-accent-teal">name</span>:{' '}
            <span className="text-accent-pink">"Muhammad Rajif Al Farikhi"</span>,
          </p>
          <p>
            <span className="text-accent-teal">role</span>:{' '}
            <span className="text-accent-pink">"Data Enthusiast"</span>,
          </p>
          <p>
            <span className="text-accent-teal">location</span>:{' '}
            <span className="text-accent-pink">"Surabaya, Indonesia"</span>,
          </p>
          <p className="break-words">
            <span className="text-accent-teal">interests</span>: [
            <span className="text-accent-pink">"Data Analysis"</span>,{' '}
            <span className="text-accent-pink">"Machine Learning"</span>,{' '}
            <span className="text-accent-pink">"Data Visualization"</span>]
          </p>
        </div>
        <p>{'}'}</p>
      </div>

      <div className="mt-6 md:mt-8">
        <h3 className={`text-lg md:text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Experience</h3>
        <div className="space-y-4 md:space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className={`p-3 md:p-4 border rounded ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
              <h4 className="text-accent-teal font-semibold text-sm md:text-base">{exp.title}</h4>
              <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{exp.company}</p>
              <p className="text-xs md:text-sm text-accent-blue">{exp.period} • {exp.location}</p>
              <p className="mt-2 text-sm md:text-base">{exp.description}</p>
              {exp.achievements && (
                <ul className="mt-2 list-disc list-inside space-y-1 text-xs md:text-sm">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEducation = (type) => (
    <div className="space-y-6">
      <h2 className={`text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <span className="text-accent-blue">//</span> Education
      </h2>
      {type === 'university' ? (
        <div className={`p-4 border rounded ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
          <h3 className="text-accent-teal font-semibold">Universitas Airlangga</h3>
          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Bachelor of Information Systems</p>
          <p className="text-sm text-accent-blue">2020 - 2024 • Surabaya, Indonesia</p>
          <ul className="mt-4 space-y-2">
            <li>• GPA: 3.3/4.0</li>
            <li>• Focus: Data Analytics & Information Systems</li>
            <li>• Active in academic competitions</li>
          </ul>
        </div>
      ) : (
        <div className={`p-4 border rounded ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
          <h3 className="text-accent-teal font-semibold">MAS Hasyim Asy'ari</h3>
          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Science Major</p>
          <p className="text-sm text-accent-blue">2017 - 2020 • Jepara, Indonesia</p>
          <ul className="mt-4 space-y-2">
            <li>• Mathematics & Science focus</li>
            <li>• Active in extracurricular activities</li>
          </ul>
        </div>
      )}
    </div>
  )

  const renderCodeSnippets = () => {
    const filteredSnippets = selectedCategory === 'All' 
      ? codeSnippets 
      : codeSnippets.filter(snippet => snippet.category === selectedCategory)

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className={`text-xl md:text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <span className="text-accent-blue">//</span> Code Samples
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {snippetCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  selectedCategory === category
                    ? theme === 'dark'
                      ? 'bg-accent-teal text-dark-bg'
                      : 'bg-accent-blue text-white'
                    : theme === 'dark'
                      ? 'bg-dark-border text-white hover:bg-dark-border/80'
                      : 'bg-light-border text-gray-900 hover:bg-light-border/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-accent-blue mb-4">
          // Showing {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''}
        </div>

        <div className="space-y-6">
          {filteredSnippets.map(snippet => (
            <CodeSnippet key={snippet.id} snippet={snippet} />
          ))}
        </div>

        {filteredSnippets.length === 0 && (
          <div className={`text-center py-12 border rounded ${
            theme === 'dark' ? 'border-dark-border' : 'border-light-border'
          }`}>
            <p className="text-lg mb-2">No code snippets found</p>
            <p className="text-sm text-accent-blue">Try selecting a different category</p>
          </div>
        )}
      </div>
    )
  }

  const renderCertifications = () => (
    <div className="space-y-6">
      <h2 className={`text-xl md:text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <span className="text-accent-blue">//</span> Professional Certifications
      </h2>
      <CertificationBadges certifications={certifications} />
    </div>
  )

  const renderSkills = () => {
    const categories = ['All', ...Object.keys(skillsData)]
    const stats = getSkillStats()

    const getSkillLevel = (level) => {
      if (level >= 85) return { label: 'Expert', color: 'text-accent-teal', bgColor: 'bg-accent-teal' }
      if (level >= 70) return { label: 'Advanced', color: 'text-accent-blue', bgColor: 'bg-accent-blue' }
      if (level >= 50) return { label: 'Intermediate', color: 'text-accent-orange', bgColor: 'bg-accent-orange' }
      return { label: 'Beginner', color: 'text-accent-pink', bgColor: 'bg-accent-pink' }
    }

    const getFilteredSkills = () => {
      let skills = selectedSkillCategory === 'All'
        ? Object.values(skillsData).flat()
        : skillsData[selectedSkillCategory] || []

      return skills.sort((a, b) => {
        if (sortBy === 'level') return b.level - a.level
        if (sortBy === 'years') return b.years - a.years
        if (sortBy === 'projects') return b.projects - a.projects
        return 0
      })
    }

    const filteredSkills = getFilteredSkills()

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl md:text-2xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="text-accent-blue">//</span> Skills & Technologies
            </h2>
            <p className="text-sm text-accent-blue">
              Technical expertise based on {stats.totalProjects}+ projects
            </p>
          </div>
          <TrendingUp size={28} className="text-accent-teal" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<Code2 size={18} className="text-accent-teal" />} label="Skills" value={stats.totalSkills} theme={theme} />
          <StatCard icon={<Award size={18} className="text-accent-blue" />} label="Expert" value={stats.expertSkills} theme={theme} />
          <StatCard icon={<Briefcase size={18} className="text-accent-orange" />} label="Projects" value={stats.totalProjects} theme={theme} />
          <StatCard icon={<Calendar size={18} className="text-accent-pink" />} label="Avg Exp" value={`${stats.avgYears}y`} theme={theme} />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter size={14} className="text-accent-teal" />
              <span className="text-xs font-medium">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedSkillCategory(category)}
                  className={`px-3 py-1.5 rounded text-xs transition-all ${
                    selectedSkillCategory === category
                      ? 'bg-accent-teal text-dark-bg font-bold scale-105'
                      : theme === 'dark'
                        ? 'bg-dark-border hover:bg-dark-border/80'
                        : 'bg-light-border hover:bg-light-border/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-1.5 rounded text-xs border ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-dark-border text-white'
                  : 'bg-white border-light-border text-gray-900'
              }`}
            >
              <option value="level">By Level</option>
              <option value="years">By Experience</option>
              <option value="projects">By Projects</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs ${
                  viewMode === 'grid' ? 'bg-accent-teal text-dark-bg' : 'bg-dark-border'
                }`}
              >
                <BarChart3 size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded text-xs ${
                  viewMode === 'list' ? 'bg-accent-teal text-dark-bg' : 'bg-dark-border'
                }`}
              >
                <Code2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Skills Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map(skill => (
              <SkillCard key={skill.name} skill={skill} theme={theme} hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} getSkillLevel={getSkillLevel} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSkills.map(skill => (
              <SkillListItem key={skill.name} skill={skill} theme={theme} getSkillLevel={getSkillLevel} />
            ))}
          </div>
        )}

        {/* Legend */}
        <div className={`border rounded p-3 text-xs ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-accent-teal rounded-full"></div>Expert (85+)</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-accent-blue rounded-full"></div>Advanced (70-84)</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-accent-orange rounded-full"></div>Intermediate (50-69)</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {!activeTab && renderBio()}
      {activeTab === 'bio' && renderBio()}
      {activeTab === 'skills' && renderSkills()}
      {activeTab === 'university' && renderEducation('university')}
      {activeTab === 'high-school' && renderEducation('high-school')}
      {activeTab === 'code-samples' && renderCodeSnippets()}
      {activeTab === 'certifications' && renderCertifications()}
      {/* FIXED: Pass theme prop to PhotoAlbum */}
      {activeTab === 'photos' && <PhotoAlbum theme={theme} />}
    </div>
  )
}

// Skill Card Component
function SkillCard({ skill, theme, hoveredSkill, setHoveredSkill, getSkillLevel }) {
  const levelInfo = getSkillLevel(skill.level)
  const isHovered = hoveredSkill === skill.name

  return (
    <div
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
      className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
        isHovered ? 'border-accent-teal scale-105 shadow-lg shadow-accent-teal/20' : theme === 'dark' ? 'border-dark-border' : 'border-light-border'
      } ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl">{skill.icon}</span>
          <div className="min-w-0">
            <h5 className={`font-bold text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {skill.name}
            </h5>
            <span className={`text-xs ${levelInfo.color}`}>{levelInfo.label}</span>
          </div>
        </div>
        <span className={`text-base font-bold ${levelInfo.color}`}>{skill.level}%</span>
      </div>
      <p className="text-xs mb-2 line-clamp-2">{skill.description}</p>
      <div className={`w-full h-1.5 rounded-full overflow-hidden mb-2 ${theme === 'dark' ? 'bg-dark-border' : 'bg-light-border'}`}>
        <div className={`h-full ${levelInfo.bgColor}`} style={{ width: `${skill.level}%` }} />
      </div>
      <div className="flex justify-between text-xs">
        <span className="flex items-center gap-1"><Calendar size={10} className="text-accent-blue" />{skill.years}y</span>
        <span className="flex items-center gap-1"><Briefcase size={10} className="text-accent-orange" />{skill.projects}p</span>
      </div>
    </div>
  )
}

// Skill List Item Component
function SkillListItem({ skill, theme, getSkillLevel }) {
  const levelInfo = getSkillLevel(skill.level)

  return (
    <div className={`border rounded p-3 ${theme === 'dark' ? 'bg-dark-secondary border-dark-border' : 'bg-light-secondary border-light-border'}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{skill.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h5 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h5>
            <span className={`text-xs px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-dark-border' : 'bg-light-border'} ${levelInfo.color}`}>
              {levelInfo.label}
            </span>
          </div>
          <p className="text-xs line-clamp-1">{skill.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#1E2D3D' : '#E0E0E0' }}>
            <div className={`h-full ${levelInfo.bgColor}`} style={{ width: `${skill.level}%` }} />
          </div>
          <span className={`text-sm font-bold ${levelInfo.color}`}>{skill.level}%</span>
          <span className="text-xs flex items-center gap-1"><Calendar size={10} />{skill.years}y</span>
          <span className="text-xs flex items-center gap-1"><Briefcase size={10} />{skill.projects}p</span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, theme }) {
  return (
    <div className={`rounded p-2 border ${theme === 'dark' ? 'bg-dark-secondary border-dark-border' : 'bg-light-secondary border-light-border'}`}>
      <div className="flex items-center gap-1 mb-1">{icon}</div>
      <p className="text-xs opacity-70">{label}</p>
      <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value}</p>
    </div>
  )
}
