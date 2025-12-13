// src/components/sections/AboutSection.jsx
'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { experiences } from '@/data/experience'
import { certifications } from '@/data/certifications'
import { codeSnippets, snippetCategories } from '@/data/codeSnippets'
import CodeSnippet from '@/components/ui/CodeSnippet'
import CertificationBadges from '@/components/ui/CertificationBadges'

export default function AboutSection({ activeTab }) {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')

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
          
          {/* Category Filter */}
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

  return (
    <div className="max-w-4xl">
      {!activeTab && renderBio()}
      {activeTab === 'bio' && renderBio()}
      {activeTab === 'university' && renderEducation('university')}
      {activeTab === 'high-school' && renderEducation('high-school')}
      {activeTab === 'code-samples' && renderCodeSnippets()}
      {activeTab === 'certifications' && renderCertifications()}
    </div>
  )
}
