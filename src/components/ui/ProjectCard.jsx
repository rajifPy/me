'use client'

import { useTheme } from '@/context/ThemeContext'

export default function ProjectCard({ project }) {
  const { theme } = useTheme()
  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'

  const getTechIcon = (tech) => {
    const icons = {
      'Python': '🐍',
      'SQL': '💾',
      'Tableau': '📊',
      'PostgreSQL': '💾',
      'Machine Learning': '🤖',
      'Data Science': '📈',
      'Analytics': '📉',
      'Pandas': '🐼',
      'Data Visualization': '📊'
    }
    return icons[tech] || '⚡'
  }

  return (
    <div className={`border ${borderClass} rounded-lg overflow-hidden hover:border-accent-teal/50 transition-all group`}>
      <div className={`relative h-48 overflow-hidden ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <div className={`w-6 h-6 rounded flex items-center justify-center ${theme === 'dark' ? 'bg-dark-border' : 'bg-light-border'}`}>
            <span className="text-xs">{getTechIcon(project.tech[0])}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-accent-blue text-sm mb-2">
          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Project {project.id}</span> // {project.name}
        </h3>
        <p className="text-sm mb-4">{project.description}</p>
        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-4 py-2 rounded text-sm transition-colors ${
            theme === 'dark'
              ? 'bg-dark-border text-white hover:bg-accent-teal/20'
              : 'bg-light-border text-gray-900 hover:bg-accent-blue/20'
          }`}
        >
          view-project
        </a>
      </div>
    </div>
  )
}