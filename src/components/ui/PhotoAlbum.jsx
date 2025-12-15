'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Camera } from 'lucide-react'

// Import photos from data file
import { photos, photoCategories } from '@/data/photos'

export default function PhotoAlbum({ theme = 'dark' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState({})

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory)

  // Prevent context menu and dragging
  useEffect(() => {
    const preventContextMenu = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
      }
    }
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

  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
  const bgSecondary = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const bgPrimary = theme === 'dark' ? 'bg-gray-900' : 'bg-white'

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Camera className="text-teal-400" size={24} />
          <h3 className={`text-xl font-bold ${textClass}`}>
            Photo Album
          </h3>
        </div>
        <span className="text-sm text-blue-400">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <p className="text-xs mb-2 text-blue-400">// filter by category</p>
        <div className="flex flex-wrap gap-2">
          {photoCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded text-xs transition-all ${
                selectedCategory === category
                  ? 'bg-teal-400 text-gray-900 font-bold'
                  : `${bgSecondary} hover:bg-teal-400/20 border ${borderClass}`
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openPhoto(photo)}
            className={`relative group cursor-pointer overflow-hidden rounded-lg border-2 ${borderClass} 
              hover:border-teal-400 transition-all duration-300 aspect-square ${bgSecondary}`}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
            }}
          >
            {/* Loading Skeleton */}
            {!imageLoaded[photo.id] && (
              <div className={`absolute inset-0 ${bgSecondary} animate-pulse`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="text-gray-500" size={32} />
                </div>
              </div>
            )}

            {/* Protective overlay */}
            <div className="absolute inset-0 bg-transparent z-10 select-none pointer-events-none" />
            
            <img
              src={photo.url}
              alt={photo.caption}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 select-none pointer-events-none ${
                imageLoaded[photo.id] ? 'opacity-100' : 'opacity-0'
              }`}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onLoad={() => setImageLoaded(prev => ({ ...prev, [photo.id]: true }))}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23011221" width="400" height="300"/%3E%3Ctext x="200" y="150" text-anchor="middle" fill="%2343D9AD" font-size="20" font-family="monospace"%3EImage Not Found%3C/text%3E%3C/svg%3E'
                setImageLoaded(prev => ({ ...prev, [photo.id]: true }))
              }}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
            />
            
            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3`}>
              <p className="text-white text-sm font-medium mb-1">{photo.caption}</p>
              <span className="text-teal-400 text-xs">{photo.category}</span>
            </div>

            {/* Watermark overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-white/50 font-bold bg-black/30 px-2 py-1 rounded">© Protected</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className={`text-center py-12 border-2 border-dashed ${borderClass} rounded-lg ${bgSecondary}`}>
          <Camera size={48} className="mx-auto mb-3 opacity-30" />
          <p className={`text-base mb-1 ${textClass}`}>No photos found</p>
          <p className="text-xs text-gray-500">Try selecting a different category</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
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
          {filteredPhotos.length > 1 && (
            <>
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
            </>
          )}

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
            <div className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
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
            <div className="absolute top-4 right-4 z-30 text-white/30 text-xs font-bold pointer-events-none select-none bg-black/30 px-3 py-1 rounded">
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p className="text-white text-center font-medium mb-1">{selectedPhoto.caption}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-teal-400 text-sm">{selectedPhoto.category}</span>
                <span className="text-white/50">•</span>
                <span className="text-white/60 text-sm">
                  {filteredPhotos.findIndex(p => p.id === selectedPhoto.id) + 1} / {filteredPhotos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 left-4 text-white/50 text-xs space-y-1 bg-black/30 p-3 rounded">
            <p>← → Navigate photos</p>
            <p>ESC Close viewer</p>
            <p>Drag to pan when zoomed</p>
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
