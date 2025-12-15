'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Camera } from 'lucide-react'

// Sample photos - Replace with your actual photos
const photos = [
  {
    id: 1,
    url: '/12358.png', // Ganti dengan foto Anda
    caption: 'Working on data projects',
    category: 'Work'
  },
  {
    id: 2,
    url: '/images/photos/photo2.jpg',
    caption: 'Team collaboration',
    category: 'Work'
  },
  // ... tambahkan foto lainnya
]

export default function PhotoAlbum() {
  const { theme } = useTheme()
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const categories = ['All', ...new Set(photos.map(p => p.category))]
  
  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory)

  // Prevent context menu and dragging
  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault()
    const preventDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('dragstart', preventDragStart)

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('dragstart', preventDragStart)
    }
  }, [])

  const openPhoto = (photo) => {
    setSelectedPhoto(photo)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const closePhoto = () => {
    setSelectedPhoto(null)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const navigatePhoto = (direction) => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredPhotos.length
    } else {
      newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    }
    
    setSelectedPhoto(filteredPhotos[newIndex])
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1))
    if (zoom <= 1.5) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true)
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closePhoto()
      if (e.key === 'ArrowRight') navigatePhoto('next')
      if (e.key === 'ArrowLeft') navigatePhoto('prev')
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedPhoto, filteredPhotos])

  const borderClass = theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  const bgSecondary = theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900'

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Camera className="text-accent-teal" size={24} />
          <h3 className={`text-xl font-bold ${textClass}`}>
            Photo Album
          </h3>
        </div>
        <span className="text-sm text-accent-blue">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
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

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openPhoto(photo)}
            className={`relative group cursor-pointer overflow-hidden rounded-lg border-2 ${borderClass} 
              hover:border-accent-teal transition-all duration-300 aspect-square`}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Protective overlay */}
            <div className="absolute inset-0 bg-transparent z-10 select-none pointer-events-none" />
            
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
            />
            
            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3`}>
              <p className="text-white text-sm font-medium">{photo.caption}</p>
            </div>

            {/* Watermark overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-white/50 font-bold">© Protected</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closePhoto}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Close button */}
          <button
            onClick={closePhoto}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 
              transition-colors z-50"
            aria-label="Close"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigatePhoto('prev')
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
              bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Previous"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigatePhoto('next')
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
              bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Next"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomOut()
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut size={20} className="text-white" />
            </button>
            <div className="px-4 py-2 rounded-full bg-white/10 text-white text-sm">
              {Math.round(zoom * 100)}%
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomIn()
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn size={20} className="text-white" />
            </button>
          </div>

          {/* Photo container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Protective overlay */}
            <div className="absolute inset-0 z-20 select-none pointer-events-none" />
            
            {/* Watermark */}
            <div className="absolute top-4 right-4 z-30 text-white/30 text-xs font-bold pointer-events-none select-none">
              © Muhammad Rajif Al Farikhi
            </div>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className={`max-w-full max-h-full object-contain select-none ${
                zoom > 1 ? 'cursor-move' : 'cursor-default'
              }`}
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: zoom > 1 ? 'auto' : 'none'
              }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onMouseDown={handleMouseDown}
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-center font-medium">{selectedPhoto.caption}</p>
              <p className="text-white/60 text-center text-sm">{selectedPhoto.category}</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 left-4 text-white/50 text-xs space-y-1">
            <p>← → Navigate</p>
            <p>ESC Close</p>
            <p>Drag to pan (when zoomed)</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
