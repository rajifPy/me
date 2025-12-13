// src/components/ui/CertificationBadges.jsx
'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Award, ExternalLink, Calendar, Building2, CheckCircle2, X } from 'lucide-react'

export default function CertificationBadges({ certifications }) {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCert, setSelectedCert] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  const categories = ['All', ...new Set(certifications.map(cert => cert.category))]

  const filteredCerts = selectedCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory)

  const getCategoryColor = (category) => {
    const colors = {
      'Data Science': 'bg-blue-500',
      'Machine Learning': 'bg-purple-500',
      'Database': 'bg-green-500',
      'Visualization': 'bg-yellow-500',
      'Programming': 'bg-red-500',
      'Analytics': 'bg-pink-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  const bgSecondary = theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Award className="text-accent-teal" size={24} />
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Certifications
          </h3>
          <span className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="text-accent-teal" size={16} />
            <span className="text-accent-teal font-bold">{certifications.length}</span>
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <p className="text-xs mb-2 text-accent-blue">// filter by category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded text-xs transition-all ${
                selectedCategory === category
                  ? 'bg-accent-teal text-dark-bg font-bold'
                  : `${bgSecondary} hover:bg-accent-teal/20 border ${borderClass}`
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-xs">
        <span className="text-accent-blue">// showing </span>
        <span className="text-accent-teal font-bold">{filteredCerts.length}</span>
        <span className="text-accent-blue">
          {' '}{filteredCerts.length === 1 ? 'certification' : 'certifications'}
        </span>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            onMouseEnter={() => setHoveredId(cert.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedCert(cert)}
            className={`${bgSecondary} border-2 rounded-lg p-4 cursor-pointer transition-all ${
              hoveredId === cert.id
                ? 'border-accent-teal transform scale-105 shadow-lg shadow-accent-teal/20'
                : `${borderClass} hover:border-accent-teal/50`
            }`}
          >
            {/* Logo & Category Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{cert.logo}</div>
              <span className={`${getCategoryColor(cert.category)} text-white text-xs px-2 py-1 rounded-full`}>
                {cert.category}
              </span>
            </div>

            {/* Certification Name */}
            <h4 className={`font-bold text-base mb-2 line-clamp-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {cert.name}
            </h4>

            {/* Issuer */}
            <div className="flex items-center gap-2 mb-2 text-xs">
              <Building2 size={14} className="text-accent-blue flex-shrink-0" />
              <span className="line-clamp-1">{cert.issuer}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 mb-3 text-xs">
              <Calendar size={14} className="text-accent-orange flex-shrink-0" />
              <span>{cert.date}</span>
              <span className="text-accent-teal">•</span>
              <span className="text-accent-teal">{cert.validity}</span>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {cert.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2 py-0.5 rounded ${
                    theme === 'dark'
                      ? 'bg-dark-border text-accent-teal'
                      : 'bg-light-border text-accent-blue'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* View Details Button */}
            <button className={`w-full py-2 rounded transition-colors text-xs font-medium ${
              theme === 'dark'
                ? 'bg-dark-border hover:bg-accent-teal text-white hover:text-dark-bg'
                : 'bg-light-border hover:bg-accent-blue text-gray-900 hover:text-white'
            }`}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCerts.length === 0 && (
        <div className={`text-center py-12 border-2 border-dashed ${borderClass} rounded-lg`}>
          <Award size={48} className="mx-auto mb-3 opacity-30" />
          <p className={`text-base mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            No certifications found
          </p>
          <p className="text-xs">Try selecting a different category</p>
        </div>
      )}

      {/* Modal Detail */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className={`${bgSecondary} border-2 border-accent-teal rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            {/* Modal Header */}
            <div className={`flex items-start justify-between p-4 md:p-6 border-b ${borderClass}`}>
              <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                <div className="text-5xl md:text-6xl flex-shrink-0">{selectedCert.logo}</div>
                <div className="min-w-0">
                  <h2 className={`text-xl md:text-2xl font-bold mb-2 break-words ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedCert.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 size={16} className="text-accent-blue flex-shrink-0" />
                    <span className="truncate">{selectedCert.issuer}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="hover:text-white transition-colors flex-shrink-0 ml-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-accent-teal font-bold mb-2 text-sm">Description</h3>
                <p className="leading-relaxed text-sm">{selectedCert.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'} p-3 rounded-lg`}>
                  <p className="text-accent-blue text-xs mb-1">Issue Date</p>
                  <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCert.date}
                  </p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'} p-3 rounded-lg`}>
                  <p className="text-accent-blue text-xs mb-1">Validity</p>
                  <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCert.validity}
                  </p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'} p-3 rounded-lg`}>
                  <p className="text-accent-blue text-xs mb-1">Category</p>
                  <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCert.category}
                  </p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'} p-3 rounded-lg`}>
                  <p className="text-accent-blue text-xs mb-1">Credential ID</p>
                  <p className={`font-bold text-xs break-all ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCert.credentialId}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-accent-teal font-bold mb-3 text-sm">Skills Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        theme === 'dark'
                          ? 'bg-dark-border text-accent-teal'
                          : 'bg-light-border text-accent-blue'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Link */}
              <a
                href={selectedCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-accent-teal hover:bg-accent-teal/80 text-dark-bg py-2.5 md:py-3 rounded-lg transition-colors font-bold text-sm"
              >
                <ExternalLink size={18} />
                <span>Verify Credential</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
