'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { FileText, X, Calendar, Tag, BookOpen, ExternalLink, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { researchPapers, researchCategories, getResearchStats } from '@/data/research'

export default function ResearchSection() {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const stats = getResearchStats()

  const filteredPapers = selectedCategory === 'All'
    ? researchPapers
    : researchPapers.filter(paper => paper.category === selectedCategory)

  const getCategoryColor = (category) => {
    const colors = {
      'Machine Learning': 'bg-purple-500',
      'Data Visualization': 'bg-blue-500',
      'Database': 'bg-green-500',
      'NLP': 'bg-orange-500',
      'Time Series': 'bg-pink-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  const bgSecondary = theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
  const bgPrimary = theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900'

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-accent-teal" size={28} />
          <h2 className={`text-2xl font-bold ${textClass}`}>
            <span className="text-accent-blue">//</span> Research Papers
          </h2>
        </div>
        <p className="text-accent-blue text-sm">
          Published research and academic work in data science and machine learning
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={18} className="text-accent-teal" />
            <span className="text-xs">Papers</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.totalPapers}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={18} className="text-accent-blue" />
            <span className="text-xs">Total Pages</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.totalPages}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <Tag size={18} className="text-accent-orange" />
            <span className="text-xs">Categories</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.categories}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={18} className="text-accent-pink" />
            <span className="text-xs">Latest</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.latestYear}</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <p className="text-xs mb-2 text-accent-blue">// filter by category</p>
        <div className="flex flex-wrap gap-2">
          {researchCategories.map(category => (
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
      <div className="text-xs mb-4">
        <span className="text-accent-blue">// showing </span>
        <span className="text-accent-teal font-bold">{filteredPapers.length}</span>
        <span className="text-accent-blue">
          {' '}{filteredPapers.length === 1 ? 'paper' : 'papers'}
        </span>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            className={`${bgSecondary} border-2 ${borderClass} rounded-lg p-4 hover:border-accent-teal transition-all cursor-pointer`}
            onClick={() => setSelectedPaper(paper)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-accent-teal flex-shrink-0" />
                <span className={`${getCategoryColor(paper.category)} text-white text-xs px-2 py-1 rounded-full`}>
                  {paper.category}
                </span>
              </div>
              <span className="text-xs text-accent-blue">{paper.year}</span>
            </div>

            {/* Title */}
            <h3 className={`font-bold text-base mb-2 line-clamp-2 ${textClass}`}>
              {paper.title}
            </h3>

            {/* Author */}
            <p className="text-xs mb-2 text-accent-blue">{paper.author}</p>

            {/* Abstract */}
            <p className="text-sm mb-3 line-clamp-3">{paper.abstract}</p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {paper.keywords.slice(0, 3).map((keyword, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2 py-0.5 rounded ${
                    theme === 'dark'
                      ? 'bg-dark-border text-accent-teal'
                      : 'bg-light-border text-accent-blue'
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs flex items-center gap-1">
                <BookOpen size={14} className="text-accent-orange" />
                {paper.pages} pages
              </span>
              <button className="flex items-center gap-1 text-xs text-accent-teal hover:underline">
                <Eye size={14} />
                Read Paper
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPapers.length === 0 && (
        <div className={`text-center py-12 border-2 border-dashed ${borderClass} rounded-lg`}>
          <FileText size={48} className="mx-auto mb-3 opacity-30" />
          <p className={`text-base mb-1 ${textClass}`}>No papers found</p>
          <p className="text-xs">Try selecting a different category</p>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className={`${bgPrimary} border-2 border-accent-teal rounded-lg w-full max-w-5xl h-[90vh] flex flex-col`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
              <div className="flex-1 min-w-0 mr-4">
                <h2 className={`text-lg font-bold mb-1 truncate ${textClass}`}>
                  {selectedPaper.title}
                </h2>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-accent-blue">{selectedPaper.author}</span>
                  <span className="text-accent-orange">•</span>
                  <span className="text-accent-orange">{selectedPaper.year}</span>
                  <span className="text-accent-orange">•</span>
                  <span className="text-accent-pink">{selectedPaper.pages} pages</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPaper(null)}
                className="hover:text-white transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* PDF Viewer - Protected from download */}
            <div className="flex-1 overflow-hidden relative">
              {/* Watermark overlay */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded text-white/60 text-xs font-bold">
                  © Muhammad Rajif Al Farikhi - Protected Document
                </div>
              </div>

              {/* PDF Embed with restrictions */}
              <iframe
                src={`${selectedPaper.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full"
                title={selectedPaper.title}
                style={{
                  border: 'none',
                  pointerEvents: 'auto'
                }}
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Protective overlay to prevent download attempts */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(transparent 95%, rgba(0,0,0,0.05) 100%)'
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className={`border-t ${borderClass} p-4`}>
              <div className="flex items-center justify-between">
                <div className="text-xs space-y-1">
                  <p><span className="text-accent-blue">Published:</span> {selectedPaper.published}</p>
                  <p><span className="text-accent-blue">DOI:</span> {selectedPaper.doi}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-xs text-accent-teal">
                    Page {currentPage} of {selectedPaper.pages}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={`p-2 rounded ${bgSecondary} hover:bg-accent-teal/20 transition-colors`}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(selectedPaper.pages, currentPage + 1))}
                      className={`p-2 rounded ${bgSecondary} hover:bg-accent-teal/20 transition-colors`}
                      disabled={currentPage === selectedPaper.pages}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="mt-3">
                <p className="text-xs text-accent-blue mb-2">Keywords:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPaper.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded ${
                        theme === 'dark'
                          ? 'bg-dark-border text-accent-teal'
                          : 'bg-light-border text-accent-blue'
                      }`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="mt-3 text-xs text-center">
                <p className="text-accent-orange">
                  ⚠️ This document is protected. Downloading is not permitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        iframe {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>
    </div>
  )
}
