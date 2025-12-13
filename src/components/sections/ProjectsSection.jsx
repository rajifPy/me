'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  const { theme } = useTheme()
  const [selectedFilters, setSelectedFilters] = useState([])

  const filteredProjects = selectedFilters.length > 0
    ? projects.filter(p => p.tech.some(t => selectedFilters.includes(t)))
    : projects

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
