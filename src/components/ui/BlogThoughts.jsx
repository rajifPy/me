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
    const minutes = Math.ceil(words / 200)
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

      {/* Category Filter */}
      <div className="mb-6">
        <p className="text-xs mb-2 text-accent-blue">// filter by category</p>
        <div className="flex flex-wrap gap-2">
          {blogCategories.map(category => (
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

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`${bgSecondary} border-2 ${borderClass} rounded-lg p-4 cursor-pointer transition-all hover:border-accent-teal`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`${getCategoryColor(post.category)} text-white text-xs px-2 py-1 rounded-full`}>
                {post.category}
              </span>
              <span className="text-xs text-accent-blue">{formatDate(post.date)}</span>
            </div>

            <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${textClass}`}>
              {post.title}
            </h3>

            <p className="text-sm mb-3 line-clamp-3">
              {post.content.substring(0, 150)}...
            </p>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-accent-orange" />
                <span>{getReadTime(post.content)}</span>
              </div>
              <button className="flex items-center gap-1 text-accent-teal hover:underline">
                Read more
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className={`text-center py-12 border-2 border-dashed ${borderClass} rounded-lg`}>
          <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
          <p className={`text-base mb-1 ${textClass}`}>No posts found</p>
          <p className="text-xs">Try selecting a different category</p>
        </div>
      )}

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${bgPrimary} border-2 border-accent-teal rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`sticky top-0 ${bgSecondary} border-b ${borderClass} p-4 flex items-center justify-between z-10`}>
              <div className="flex items-center gap-3">
                <span className={`${getCategoryColor(selectedPost.category)} text-white text-xs px-3 py-1 rounded-full`}>
                  {selectedPost.category}
                </span>
                <span className="text-xs text-accent-blue">{formatDate(selectedPost.date)}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <h1 className={`text-3xl font-bold mb-4 ${textClass}`}>
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-accent-orange" />
                  <span>{getReadTime(selectedPost.content)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-accent-blue" />
                  <span>{getWordCount(selectedPost.content)} words</span>
                </div>
              </div>

              <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
                {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('##')) {
                    return (
                      <h2 key={idx} className="text-2xl font-bold mt-6 mb-4 text-accent-teal">
                        {paragraph.replace('##', '').trim()}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={idx} className="text-xl font-bold mt-4 mb-2 text-accent-blue">
                        {paragraph.replace(/\*\*/g, '').trim()}
                      </h3>
                    )
                  }
                  return (
                    <p key={idx} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-dark-border">
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-3 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-dark-border text-accent-teal'
                          : 'bg-light-border text-accent-blue'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
