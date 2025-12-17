// src/components/ui/BlogThoughts.jsx
'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { MessageSquare, Heart, Clock, Calendar, Tag, TrendingUp, Filter, X, ChevronRight } from 'lucide-react'
import { blogThoughts, blogCategories, getBlogByCategory, getBlogStats, getPopularPosts } from '@/data/blogThoughts'

export default function BlogThoughts() {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [showPopular, setShowPopular] = useState(false)
  
  const stats = getBlogStats()
  const filteredPosts = getBlogByCategory(selectedCategory)
  const popularPosts = getPopularPosts(3)

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

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
          <span className="hidden sm:inline">Popular</span>
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
            <Heart size={18} className="text-accent-pink" />
            <span className="text-xs">Likes</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.totalLikes}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare size={18} className="text-accent-blue" />
            <span className="text-xs">Comments</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.totalComments}</p>
        </div>
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={18} className="text-accent-orange" />
            <span className="text-xs">Avg Read</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{stats.avgReadTime}m</p>
        </div>
      </div>

      {/* Popular Posts Sidebar */}
      {showPopular && (
        <div className={`${bgSecondary} border ${borderClass} rounded-lg p-4 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold flex items-center gap-2 ${textClass}`}>
              <TrendingUp size={18} className="text-accent-orange" />
              Most Popular
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
                        <Heart size={12} className="text-accent-pink" />
                        {post.likes}
                      </span>
                      <span>•</span>
                      <span>{post.readTime} read</span>
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
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-accent-teal" />
          <span className="text-xs font-medium">Filter by category:</span>
        </div>
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

      {/* Results Counter */}
      <div className="text-xs mb-4">
        <span className="text-accent-blue">// showing </span>
        <span className="text-accent-teal font-bold">{filteredPosts.length}</span>
        <span className="text-accent-blue">
          {' '}{filteredPosts.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`${bgSecondary} border-2 ${borderClass} rounded-lg p-4 cursor-pointer 
              transition-all hover:border-accent-teal hover:shadow-lg group`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <span className={`${getCategoryColor(post.category)} text-white text-xs px-2 py-1 rounded-full`}>
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <Clock size={12} className="text-accent-blue" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className={`font-bold text-base mb-2 line-clamp-2 group-hover:text-accent-teal transition-colors ${textClass}`}>
              {post.title}
            </h3>

            {/* Content Preview */}
            <p className="text-sm mb-3 line-clamp-3">{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                    theme === 'dark'
                      ? 'bg-dark-border text-accent-teal'
                      : 'bg-light-border text-accent-blue'
                  }`}
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-dark-border">
              <div className="flex items-center gap-2 text-xs">
                <Calendar size={12} className="text-accent-orange" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(post.id)
                  }}
                  className="flex items-center gap-1 text-xs hover:text-accent-pink transition-colors"
                >
                  <Heart
                    size={14}
                    className={likedPosts.has(post.id) ? 'fill-accent-pink text-accent-pink' : ''}
                  />
                  <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <span className="flex items-center gap-1 text-xs">
                  <MessageSquare size={14} />
                  {post.comments}
                </span>
              </div>
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
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className={`${bgPrimary} border-2 border-accent-teal rounded-lg w-full max-w-3xl my-8`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex items-start justify-between p-6 border-b ${borderClass}`}>
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${getCategoryColor(selectedPost.category)} text-white text-xs px-2 py-1 rounded-full`}>
                    {selectedPost.category}
                  </span>
                  <span className="text-xs flex items-center gap-1">
                    <Calendar size={12} className="text-accent-orange" />
                    {formatDate(selectedPost.date)}
                  </span>
                  <span className="text-xs flex items-center gap-1">
                    <Clock size={12} className="text-accent-blue" />
                    {selectedPost.readTime} read
                  </span>
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${textClass}`}>
                  {selectedPost.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="hover:text-white transition-colors flex-shrink-0"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="prose prose-sm max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-dark-border">
                <p className="text-xs text-accent-blue mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 ${
                        theme === 'dark'
                          ? 'bg-dark-border text-accent-teal'
                          : 'bg-light-border text-accent-blue'
                      }`}
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement */}
              <div className={`flex items-center justify-between pt-4 border-t ${borderClass}`}>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(selectedPost.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      likedPosts.has(selectedPost.id)
                        ? 'bg-accent-pink/20 text-accent-pink'
                        : `${bgSecondary} hover:bg-accent-pink/20`
                    }`}
                  >
                    <Heart
                      size={18}
                      className={likedPosts.has(selectedPost.id) ? 'fill-accent-pink' : ''}
                    />
                    <span className="font-medium">
                      {selectedPost.likes + (likedPosts.has(selectedPost.id) ? 1 : 0)}
                    </span>
                  </button>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare size={18} />
                    <span>{selectedPost.comments} comments</span>
                  </div>
                </div>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-dark-border hover:bg-accent-teal/20'
                      : 'bg-light-border hover:bg-accent-blue/20'
                  }`}
                >
                  Share
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
