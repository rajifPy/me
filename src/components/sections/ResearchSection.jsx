'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/data/translations'
import { FileText, X, Calendar, Tag, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { researchPapers, researchCategories, getResearchStats } from '@/data/research'

export default function ResearchSection() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const t = useTranslation(language)
  const r = t.research

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
      'Time Series': 'bg-pink-500',
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
            <span className="text-accent-blue">//</span> {r.title}
          </h2>
        </div>
        <p className="text-accent-blue text-sm">{r.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: <FileText size={18} className="text-accent-teal" />, label: r.papers, value: stats.totalPapers },
          { icon: <BookOpen size={18} className="text-accent-blue" />, label: r.totalPages, value: stats.totalPages },
          { icon: <Tag size={18} className="text-accent-orange" />, label: r.categories, value: stats.categories },
          { icon: <Calendar size={18} className="text-accent-pink" />, label: r.latest, value: stats.latestYear },
        ].map((s, i) => (
          <div key={i} className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
            <div className="flex items-center gap-2 mb-1">{s.icon}<span className="text-xs">{s.label}</span></div>
            <p className={`text-2xl font-bold ${textClass}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <p className="text-xs mb-2 text-accent-blue">{r.filterBy}</p>
        <div className="flex flex-wrap gap-2">
          {researchCategories.map(category => (
            <button key={category} onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded text-xs transition-all ${
                selectedCategory === category
                  ? 'bg-accent-teal text-dark-bg font-bold'
                  : `${bgSecondary} hover:bg-accent-teal/20 border ${borderClass}`
              }`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-xs mb-4">
        <span className="text-accent-blue">{r.showing}</span>
        <span className="text-accent-teal font-bold">{filteredPapers.length}</span>
        <span className="text-accent-blue">
          {' '}{filteredPapers.length === 1 ? r.paper : r.papers2}
        </span>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map(paper => (
          <div key={paper.id}
            className={`${bgSecondary} border-2 ${borderClass} rounded-lg p-4 hover:border-accent-teal transition-all cursor-pointer`}
            onClick={() => setSelectedPaper(paper)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-accent-teal flex-shrink-0" />
                <span className={`${getCategoryColor(paper.category)} text-white text-xs px-2 py-1 rounded-full`}>
                  {paper.category}
                </span>
              </div>
              <span className="text-xs text-accent-blue">{paper.year}</span>
            </div>
            <h3 className={`font-bold text-base mb-2 line-clamp-2 ${textClass}`}>{paper.title}</h3>
            <p className="text-xs mb-2 text-accent-blue">{paper.author}</p>
            <p className="text-sm mb-3 line-clamp-3">{paper.abstract}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {paper.keywords.slice(0, 3).map((kw, idx) => (
                <span key={idx} className={`text-xs px-2 py-0.5 rounded ${
                  theme === 'dark' ? 'bg-dark-border text-accent-teal' : 'bg-light-border text-accent-blue'
                }`}>{kw}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs flex items-center gap-1">
                <BookOpen size={14} className="text-accent-orange" />
                {paper.pages} {r.totalPages?.toLowerCase() || 'pages'}
              </span>
              <button className="flex items-center gap-1 text-xs text-accent-teal hover:underline">
                {r.readPaper}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPapers.length === 0 && (
        <div className={`text-center py-12 border-2 border-dashed ${borderClass} rounded-lg`}>
          <FileText size={48} className="mx-auto mb-3 opacity-30" />
          <p className={`text-base mb-1 ${textClass}`}>{r.noFound}</p>
          <p className="text-xs">{r.noFoundHint}</p>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className={`${bgPrimary} border-2 border-accent-teal rounded-lg w-full max-w-5xl h-[90vh] flex flex-col`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
              <div className="flex-1 min-w-0 mr-4">
                <h2 className={`text-lg font-bold mb-1 truncate ${textClass}`}>{selectedPaper.title}</h2>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-accent-blue">{selectedPaper.author}</span>
                  <span className="text-accent-orange">•</span>
                  <span className="text-accent-orange">{selectedPaper.year}</span>
                  <span className="text-accent-orange">•</span>
                  <span className="text-accent-pink">{selectedPaper.pages} {r.totalPages?.toLowerCase()}</span>
                </div>
              </div>
              <button onClick={() => setSelectedPaper(null)} className="hover:text-white transition-colors flex-shrink-0" aria-label="Close">
                <X size={24} />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded text-white/60 text-xs font-bold">
                  © Muhammad Rajif Al Farikhi - Protected Document
                </div>
              </div>
              <iframe
                src={`${selectedPaper.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full" title={selectedPaper.title}
                style={{ border: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(transparent 95%, rgba(0,0,0,0.05) 100%)' }} />
            </div>

            {/* Modal Footer */}
            <div className={`border-t ${borderClass} p-4`}>
              <div className="flex items-center justify-between">
                <div className="text-xs space-y-1">
                  <p><span className="text-accent-blue">{r.published}</span> {selectedPaper.published}</p>
                  <p><span className="text-accent-blue">{r.doi}</span> {selectedPaper.doi}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-accent-teal">
                    {r.page} {currentPage} {r.of} {selectedPaper.pages}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={`p-2 rounded ${bgSecondary} hover:bg-accent-teal/20 transition-colors`}
                      disabled={currentPage === 1}>
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => setCurrentPage(Math.min(selectedPaper.pages, currentPage + 1))}
                      className={`p-2 rounded ${bgSecondary} hover:bg-accent-teal/20 transition-colors`}
                      disabled={currentPage === selectedPaper.pages}>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="mt-3">
                <p className="text-xs text-accent-blue mb-2">{r.keywords}</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPaper.keywords.map((kw, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded ${
                      theme === 'dark' ? 'bg-dark-border text-accent-teal' : 'bg-light-border text-accent-blue'
                    }`}>{kw}</span>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-xs text-center">
                <p className="text-accent-orange">{r.protected}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        iframe { user-select: none; -webkit-user-select: none; }
      `}</style>
    </div>
  )
}
