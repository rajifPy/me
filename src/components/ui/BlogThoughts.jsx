// src/components/ui/BlogThoughts.jsx
'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { MessageSquare, Clock, Calendar, Tag, TrendingUp, Filter, X, ChevronRight, BookOpen } from 'lucide-react'
import { blogThoughts, blogCategories, getBlogByCategory, getBlogStats, getPopularPosts } from '@/data/blogThoughts'

export default function BlogThoughts() {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)
  const [showPopular, setShowPopular] = useState(false)
  
  const stats = getBlogStats()
  const filteredPosts = getBlogByCategory(selectedCategory)
  const popularPosts = getPopularPosts(3)

  const getCategoryColor = (category) => {
    const colors = {
      'Insights': 'bg-blue-500',
      'Technical': 'bg-green-500',
      'Personal': 'bg-purple-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getWordCount = (content) => {
    return content.split(/\s+/).length
  }

  const getReadTime = (content) => {
    const words = getWordCount(content)
    const minutes = Math.ceil(words / 200) // Average reading speed
    return `${minutes} min read`
  }

  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  const bgSecondary = theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
  const bgPrimary = theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900'

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="text-accent-teal" size={28} />
            <h2 className={`text-2xl font-bold ${textClass}`}>
              <span className="text-accent-blue">//</span> Thoughts & Insights
            </h2>
          </div>
          <p className="text-accent-blue text-sm">
            Personal blog about data science, tech, and career learnings
          </p>
        </div>
        <button
          onClick={() => setShowPopular(!showPopular)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
            showPopular 
              ? 'bg-accent-teal text-dark-bg font-bold'
              : `${bgSecondary} hover:bg-accent-teal/20 border ${borderClass}`
          }`}
        >
          <TrendingUp size={16} />
          <span className="hidden sm:inline">Recent</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare size={18} className="text-accent-teal" />
            <span className="text-xs">Posts</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.totalPosts}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={18} className="text-accent-pink" />
            <span className="text-xs">Total Words</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.totalWords.toLocaleString()}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <Tag size={18} className="text-accent-blue" />
            <span className="text-xs">Categories</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.totalCategories}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={18} className="text-accent-orange" />
            <span className="text-xs">Latest</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.latestYear}</p>
        </div>
      </div>

      {/* Popular Posts Sidebar */}
      {showPopular && (
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-4 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold flex items-center gap-2 ${textClass}`}>
              <TrendingUp size={18} className="text-accent-orange" />
              Most Recent
            </h3>
            <button
              onClick={() => setShowPopular(false)}
              className="hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-3">
            {popularPosts.map((post, idx) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`p-3 rounded cursor-pointer transition-all hover:border-accent-teal border ${borderClass}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-2xl font-bold text-accent-teal">#{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm mb-1 line-clamp-2 ${textClass}`}>
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-accent-blue" />
                        {formatDate(post.date)}
                      </span>
                      <span>•</span>
                      <span>{getReadTime(post.content)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
