'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsSection({ selectedFilters }) {
  const { theme } = useTheme()

  // Filter projects based on selected technologies
  const filteredProjects = selectedFilters && selectedFilters.length > 0
    ? projects.filter(project => 
        project.tech.some(tech => selectedFilters.includes(tech))
      )
    : projects

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Filter Info */}
      {selectedFilters && selectedFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-accent-blue">// filtering by:</span>
          {selectedFilters.map(filter => (
            <span 
              key={filter}
              className={`text-xs px-3 py-1 rounded-full border ${
                theme === 'dark' 
                  ? 'border-accent-teal text-accent-teal bg-accent-teal/10' 
                  : 'border-accent-blue text-accent-blue bg-accent-blue/10'
              }`}
            >
              {filter}
            </span>
          ))}
          <span className="text-sm ml-2">
            ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})
          </span>
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg mb-2">No projects found</p>
          <p className="text-sm text-accent-blue">Try selecting different filters</p>
        </div>
      )}
    </div>
  )
}
