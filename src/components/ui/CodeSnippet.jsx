// src/components/ui/CodeSnippet.jsx
'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Copy, Check } from 'lucide-react'

export default function CodeSnippet({ snippet }) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getLanguageColor = (language) => {
    const colors = {
      python: '#3776AB',
      sql: '#CC2927',
      javascript: '#F7DF1E'
    }
    return colors[language] || '#43D9AD'
  }

  const highlightPython = (code) => {
    let highlighted = code.replace(
      /\b(def|class|import|from|return|if|else|elif|for|while|in|as|with|try|except|finally|raise|pass|break|continue|yield|lambda|and|or|not|is|None|True|False)\b/g,
      '<span class="text-[#C586C0]">$1</span>'
    )
    
    highlighted = highlighted.replace(
      /(["'`])(.*?)\1/g,
      '<span class="text-[#CE9178]">$1$2$1</span>'
    )
    
    highlighted = highlighted.replace(
      /(#.*$)/gm,
      '<span class="text-[#6A9955]">$1</span>'
    )
    
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      '<span class="text-[#DCDCAA]">$1</span>('
    )
    
    highlighted = highlighted.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="text-[#B5CEA8]">$1</span>'
    )
    
    return highlighted
  }

  const highlightSQL = (code) => {
    let highlighted = code.replace(
      /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|HAVING|AS|WITH|CASE|WHEN|THEN|ELSE|END|AND|OR|NOT|IN|EXISTS|DISTINCT|COUNT|SUM|AVG|MAX|MIN|OVER|PARTITION BY|NTILE)\b/gi,
      '<span class="text-[#569CD6]">$&</span>'
    )
    
    highlighted = highlighted.replace(
      /(["'`])(.*?)\1/g,
      '<span class="text-[#CE9178]">$1$2$1</span>'
    )
    
    highlighted = highlighted.replace(
      /(--.*$)/gm,
      '<span class="text-[#6A9955]">$1</span>'
    )
    
    highlighted = highlighted.replace(
      /\b(\d+)\b/g,
      '<span class="text-[#B5CEA8]">$1</span>'
    )
    
    return highlighted
  }

  const getHighlightedCode = () => {
    if (snippet.language === 'python') {
      return highlightPython(snippet.code)
    } else if (snippet.language === 'sql') {
      return highlightSQL(snippet.code)
    }
    return snippet.code
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${
      theme === 'dark' ? 'border-dark-border' : 'border-light-border'
    }`}>
      {/* Header - IMPROVED RESPONSIVE */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 sm:px-4 py-3 border-b ${
        theme === 'dark' 
          ? 'bg-dark-secondary border-dark-border' 
          : 'bg-light-secondary border-light-border'
      }`}>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold mb-1 text-sm sm:text-base truncate ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {snippet.title}
          </h3>
          <p className="text-xs text-accent-blue line-clamp-2 sm:line-clamp-1">
            {snippet.description}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span 
            className="text-xs px-2 py-1 rounded whitespace-nowrap"
            style={{ 
              backgroundColor: `${getLanguageColor(snippet.language)}20`,
              color: getLanguageColor(snippet.language)
            }}
          >
            {snippet.language}
          </span>
          <button
            onClick={copyToClipboard}
            className={`p-2 rounded transition-colors ${
              theme === 'dark'
                ? 'hover:bg-dark-border'
                : 'hover:bg-light-border'
            }`}
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <Check size={16} className="text-accent-teal" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Code Block - IMPROVED RESPONSIVE */}
      <div className={`p-3 sm:p-4 overflow-x-auto ${
        theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-gray-50'
      }`}>
        {/* Wrapper untuk horizontal scroll di mobile */}
        <div className="min-w-max sm:min-w-0">
          <pre className="text-xs sm:text-sm">
            <code 
              dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
              className={`font-mono ${theme === 'dark' ? 'text-[#D4D4D4]' : 'text-gray-800'}`}
            />
          </pre>
        </div>
      </div>

      {/* Footer - IMPROVED RESPONSIVE */}
      <div className={`px-3 sm:px-4 py-2 text-xs flex items-center gap-2 ${
        theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
      }`}>
        <span className="text-accent-pink">•</span>
        <span className="text-accent-blue truncate">{snippet.category}</span>
      </div>
    </div>
  )
}
