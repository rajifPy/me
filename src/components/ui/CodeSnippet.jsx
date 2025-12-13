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

  // Improved syntax highlighting untuk Python
  const highlightPython = (code) => {
    const lines = code.split('\n')
    
    return lines.map((line, lineIndex) => {
      let highlightedLine = line
      
      // Comments (prioritas tinggi)
      if (line.trim().startsWith('#')) {
        return (
          <div key={lineIndex} className="text-green-500">
            {line}
          </div>
        )
      }
      
      // Strings - detect and highlight
      const stringRegex = /(["'`])((?:(?!\1)[^\\]|\\.)*)\1/g
      const parts = []
      let lastIndex = 0
      let match
      
      while ((match = stringRegex.exec(line)) !== null) {
        // Add text before string
        if (match.index > lastIndex) {
          parts.push(
            <span key={`${lineIndex}-text-${lastIndex}`}>
              {highlightKeywords(line.substring(lastIndex, match.index))}
            </span>
          )
        }
        
        // Add string
        parts.push(
          <span key={`${lineIndex}-string-${match.index}`} className="text-orange-300">
            {match[0]}
          </span>
        )
        
        lastIndex = match.index + match[0].length
      }
      
      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(
          <span key={`${lineIndex}-text-${lastIndex}`}>
            {highlightKeywords(line.substring(lastIndex))}
          </span>
        )
      }
      
      return (
        <div key={lineIndex}>
          {parts.length > 0 ? parts : highlightKeywords(line)}
        </div>
      )
    })
  }

  // Helper function untuk highlight keywords
  const highlightKeywords = (text) => {
    const keywords = ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 
                      'for', 'while', 'in', 'as', 'with', 'try', 'except', 'finally', 
                      'raise', 'pass', 'break', 'continue', 'yield', 'lambda', 'and', 
                      'or', 'not', 'is', 'None', 'True', 'False']
    
    const parts = []
    const words = text.split(/(\s+|[()[\]{},.:=+\-*/<>!])/)
    
    words.forEach((word, i) => {
      if (keywords.includes(word)) {
        parts.push(
          <span key={i} className="text-purple-400 font-semibold">
            {word}
          </span>
        )
      } else if (/^\d+\.?\d*$/.test(word)) {
        // Numbers
        parts.push(
          <span key={i} className="text-blue-300">
            {word}
          </span>
        )
      } else if (/^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/.test(word)) {
        // Functions
        parts.push(
          <span key={i} className="text-yellow-300">
            {word}
          </span>
        )
      } else {
        parts.push(<span key={i}>{word}</span>)
      }
    })
    
    return parts
  }

  // Improved syntax highlighting untuk SQL
  const highlightSQL = (code) => {
    const lines = code.split('\n')
    
    return lines.map((line, lineIndex) => {
      // Comments
      if (line.trim().startsWith('--')) {
        return (
          <div key={lineIndex} className="text-green-500">
            {line}
          </div>
        )
      }
      
      let highlightedLine = line
      
      // SQL Keywords
      const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 
                       'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'AS', 'WITH', 
                       'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AND', 'OR', 'NOT', 
                       'IN', 'EXISTS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 
                       'MIN', 'OVER', 'PARTITION BY', 'NTILE']
      
      const parts = []
      let remainingLine = line
      
      // Check for strings first
      const stringMatch = remainingLine.match(/(["'`])(.*?)\1/)
      if (stringMatch) {
        const beforeString = remainingLine.substring(0, stringMatch.index)
        const afterString = remainingLine.substring(stringMatch.index + stringMatch[0].length)
        
        parts.push(
          <span key={`${lineIndex}-before`}>
            {highlightSQLKeywords(beforeString, keywords)}
          </span>
        )
        parts.push(
          <span key={`${lineIndex}-string`} className="text-orange-300">
            {stringMatch[0]}
          </span>
        )
        parts.push(
          <span key={`${lineIndex}-after`}>
            {highlightSQLKeywords(afterString, keywords)}
          </span>
        )
        
        return <div key={lineIndex}>{parts}</div>
      }
      
      return (
        <div key={lineIndex}>
          {highlightSQLKeywords(line, keywords)}
        </div>
      )
    })
  }

  const highlightSQLKeywords = (text, keywords) => {
    const parts = []
    let currentText = text
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      const newParts = []
      
      if (typeof currentText === 'string') {
        const splits = currentText.split(regex)
        const matches = currentText.match(regex) || []
        
        splits.forEach((split, i) => {
          newParts.push(split)
          if (matches[i]) {
            newParts.push(
              <span className="text-blue-400 font-semibold">
                {matches[i]}
              </span>
            )
          }
        })
        
        currentText = newParts
      }
    })
    
    return currentText
  }

  const getHighlightedCode = () => {
    if (snippet.language === 'python') {
      return highlightPython(snippet.code)
    } else if (snippet.language === 'sql') {
      return highlightSQL(snippet.code)
    }
    return snippet.code.split('\n').map((line, i) => <div key={i}>{line}</div>)
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${
      theme === 'dark' ? 'border-dark-border' : 'border-light-border'
    }`}>
      {/* Header */}
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

      {/* Code Block */}
      <div className={`p-3 sm:p-4 overflow-x-auto ${
        theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-gray-50'
      }`}>
        <pre className="text-xs sm:text-sm font-mono">
          <code className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
            {getHighlightedCode()}
          </code>
        </pre>
      </div>

      {/* Footer */}
      <div className={`px-3 sm:px-4 py-2 text-xs flex items-center gap-2 ${
        theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
      }`}>
        <span className="text-accent-pink">•</span>
        <span className="text-accent-blue truncate">{snippet.category}</span>
      </div>
    </div>
  )
}
