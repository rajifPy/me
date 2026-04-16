'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Camera } from 'lucide-react'

// Import photos from data file
import { photos, photoCategories } from '@/data/photos'

// ─── Zoom Lens Hook ────────────────────────────────────────────────────────────
function useZoomLens(zoomFactor = 2.5) {
  const [lens, setLens] = useState({ visible: false, x: 0, y: 0, bgX: 0, bgY: 0, bgSize: '' })
  const imgRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    setLens(prev => ({ ...prev, visible: true }))
  }, [])

  const handleMouseLeave = useCallback(() => {
    setLens(prev => ({ ...prev, visible: false }))
  }, [])

  const handleMouseMove = useCallback((e) => {
    const img = imgRef.current
    if (!img) return

    const rect = img.getBoundingClientRect()
    const lensSize = 100 // lens diameter in px

    // Cursor position relative to image
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Clamp so lens stays inside image bounds
    const lensHalf = lensSize / 2
    const clampedX = Math.max(lensHalf, Math.min(rect.width - lensHalf, x))
    const clampedY = Math.max(lensHalf, Math.min(rect.height - lensHalf, y))

    // Background position for the zoomed view
    const bgX = -((clampedX - lensHalf) * zoomFactor)
    const bgY = -((clampedY - lensHalf) * zoomFactor)
    const bgSize = `${rect.width * zoomFactor}px ${rect.height * zoomFactor}px`

    setLens({
      visible: true,
      // Position lens centered on cursor (relative to card)
      lensLeft: clampedX - lensHalf,
      lensTop: clampedY - lensHalf,
      bgX,
      bgY,
      bgSize,
    })
  }, [zoomFactor])

  return { lens, imgRef, handleMouseEnter, handleMouseLeave, handleMouseMove }
}

// ─── Photo Card with Zoom Lens ─────────────────────────────────────────────────
function PhotoCard({ photo, index, onOpen, theme }) {
  const { lens, imgRef, handleMouseEnter, handleMouseLeave, handleMouseMove } = useZoomLens(2.5)
  const [loaded, setLoaded] = useState(false)
  const isDark = theme === 'dark'

  return (
    <div
      onClick={() => onOpen(photo)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`
        relative group cursor-crosshair overflow-hidden rounded-lg border-2 aspect-square
        transition-all duration-300
        ${isDark
          ? 'border-[#1E2D3D] hover:border-[#43D9AD] bg-[#011221]'
          : 'border-gray-200 hover:border-teal-500 bg-gray-100'
        }
      `}
      style={{ animation: `photoFadeUp 0.5s ease-out ${index * 0.05}s both` }}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <Camera className="opacity-20" size={32} />
        </div>
      )}

      {/* Protective overlay — blocks right-click & drag */}
      <div className="absolute inset-0 z-10 select-none pointer-events-none" />

      {/* Main image */}
      <img
        ref={imgRef}
        src={photo.url}
        alt={photo.caption}
        draggable="false"
        onContextMenu={e => e.preventDefault()}
        onLoad={() => setLoaded(true)}
        onError={e => {
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23011221" width="400" height="300"/%3E%3Ctext x="200" y="150" text-anchor="middle" fill="%2343D9AD" font-size="20" font-family="monospace"%3EImage Not Found%3C/text%3E%3C/svg%3E'
          setLoaded(true)
        }}
        className={`w-full h-full object-cover transition-all duration-500 select-none pointer-events-none ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      />

      {/* ── Zoom Lens ──────────────────────────────────────────────────────── */}
      {lens.visible && loaded && (
        <div
          className="absolute z-20 rounded-full border-2 shadow-xl pointer-events-none"
          style={{
            width: 100,
            height: 100,
            left: lens.lensLeft,
            top: lens.lensTop,
            backgroundImage: `url('${photo.url}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: lens.bgSize,
            backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
            border: isDark
              ? '2px solid rgba(67,217,173,0.8)'
              : '2px solid rgba(13,148,136,0.8)',
            boxShadow: isDark
              ? '0 0 0 1px rgba(67,217,173,0.3), 0 8px 32px rgba(0,0,0,0.6)'
              : '0 0 0 1px rgba(13,148,136,0.3), 0 8px 32px rgba(0,0,0,0.3)',
            // Crosshair lines
            backgroundClip: 'padding-box',
          }}
        >
          {/* Crosshair lines inside lens */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-0 right-0"
              style={{
                height: 1,
                background: isDark ? 'rgba(67,217,173,0.5)' : 'rgba(13,148,136,0.5)',
                transform: 'translateY(-50%)',
              }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0"
              style={{
                width: 1,
                background: isDark ? 'rgba(67,217,173,0.5)' : 'rgba(13,148,136,0.5)',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        </div>
      )}

      {/* Hover caption overlay */}
      <div className="absolute inset-0 z-30 bg-gradient-to-t from-black/80 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        flex flex-col justify-end p-3 pointer-events-none">
        <p className="text-white text-sm font-medium mb-1 select-none">{photo.caption}</p>
        <div className="flex items-center justify-between">
          <span className="text-teal-400 text-xs select-none">{photo.category}</span>
          <span className="text-white/50 text-xs select-none">🔍 hover to zoom</span>
        </div>
      </div>

      {/* Copyright watermark on hover */}
      <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100
        transition-opacity pointer-events-none">
        <span className="text-xs text-white/50 font-bold bg-black/40 px-2 py-1 rounded select-none">
          © Protected
        </span>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PhotoAlbum({ theme = 'dark' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxZoom, setLightboxZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const isDark = theme === 'dark'
  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedCategory)

  // Prevent right-click / drag globally on images
  useEffect(() => {
    const block = e => { if (e.target.tagName === 'IMG') e.preventDefault() }
    document.addEventListener('contextmenu', block)
    document.addEventListener('dragstart', block)
    return () => {
      document.removeEventListener('contextmenu', block)
      document.removeEventListener('dragstart', block)
    }
  }, [])

  const openPhoto = photo => {
    setSelectedPhoto(photo)
    setLightboxZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const closePhoto = () => {
    setSelectedPhoto(null)
    setLightboxZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const navigate = dir => {
    const i = filteredPhotos.findIndex(p => p.id === selectedPhoto.id)
    const next = dir === 'next'
      ? (i + 1) % filteredPhotos.length
      : (i - 1 + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhoto(filteredPhotos[next])
    setLightboxZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  // Keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return
    const handler = e => {
      if (e.key === 'Escape') closePhoto()
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedPhoto, filteredPhotos])

  const borderClass = isDark ? 'border-[#1E2D3D]' : 'border-gray-200'
  const bgSec = isDark ? 'bg-[#011221]' : 'bg-gray-100'
  const textClass = isDark ? 'text-white' : 'text-gray-900'

  return (
    <div className="w-full">
      <style>{`
        @keyframes photoFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Camera className="text-teal-400" size={24} />
          <h3 className={`text-xl font-bold ${textClass}`}>Photo Album</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-teal-400/60 hidden sm:block">
            // hover thumbnail to zoom
          </span>
          <span className={`text-sm ${isDark ? 'text-[#607B96]' : 'text-gray-400'}`}>
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          </span>
        </div>
      </div>

      {/* ── Category Filter ─────────────────────────────────────────── */}
      <div className="mb-6">
        <p className={`text-xs mb-2 ${isDark ? 'text-[#4D5BCE]' : 'text-blue-500'}`}>
          // filter by category
        </p>
        <div className="flex flex-wrap gap-2">
          {photoCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-400 text-gray-900 font-bold'
                  : `${bgSec} hover:bg-teal-400/20 border ${borderClass}`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Photo Grid ──────────────────────────────────────────────── */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPhotos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              onOpen={openPhoto}
              theme={theme}
            />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 border-2 border-dashed ${borderClass} rounded-lg ${bgSec}`}>
          <Camera size={48} className="mx-auto mb-3 opacity-30" />
          <p className={`text-base mb-1 ${textClass}`}>No photos found</p>
          <p className="text-xs text-gray-500">Try selecting a different category</p>
        </div>
      )}

      {/* ── Lightbox Modal ──────────────────────────────────────────── */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closePhoto}
          onMouseMove={e => {
            if (isDragging && lightboxZoom > 1) {
              setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y,
              })
            }
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Close */}
          <button
            onClick={closePhoto}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Navigation */}
          {filteredPhotos.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); navigate('prev') }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); navigate('next') }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </>
          )}

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
            <button
              onClick={e => { e.stopPropagation(); setLightboxZoom(z => Math.max(z - 0.5, 1)); if (lightboxZoom <= 1.5) setPosition({ x: 0, y: 0 }) }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ZoomOut size={20} className="text-white" />
            </button>
            <div className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {Math.round(lightboxZoom * 100)}%
            </div>
            <button
              onClick={e => { e.stopPropagation(); setLightboxZoom(z => Math.min(z + 0.5, 3)) }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ZoomIn size={20} className="text-white" />
            </button>
          </div>

          {/* Image container */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 z-20 select-none pointer-events-none" />

            {/* Watermark */}
            <div className="absolute top-4 right-4 z-30 text-white/30 text-xs font-bold pointer-events-none select-none bg-black/30 px-3 py-1 rounded">
              © Muhammad Rajif Al Farikhi
            </div>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              draggable="false"
              onContextMenu={e => e.preventDefault()}
              className={`max-w-full max-h-full object-contain select-none ${
                lightboxZoom > 1 ? 'cursor-move' : 'cursor-default'
              }`}
              style={{
                transform: `scale(${lightboxZoom}) translate(${position.x / lightboxZoom}px, ${position.y / lightboxZoom}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: lightboxZoom > 1 ? 'auto' : 'none',
              }}
              onMouseDown={e => {
                if (lightboxZoom > 1) {
                  setIsDragging(true)
                  setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
                }
              }}
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
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

          {/* Keyboard hint */}
          <div className="absolute top-4 left-4 text-white/50 text-xs space-y-1 bg-black/30 p-3 rounded">
            <p>← → Navigate</p>
            <p>ESC Close</p>
            <p>Drag to pan when zoomed</p>
          </div>
        </div>
      )}
    </div>
  )
}
