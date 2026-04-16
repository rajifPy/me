'use client'

import { useState, useEffect, useRef, useCallback, WheelEvent } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Camera, RotateCcw } from 'lucide-react'
import { photos, photoCategories } from '@/data/photos'

// ─── Zoom Lens Hook (thumbnail hover) ─────────────────────────────────────────
function useZoomLens(zoomFactor = 2.5) {
  const [lens, setLens] = useState({ visible: false })
  const imgRef = useRef(null)

  const handleMouseEnter = useCallback(() => setLens(prev => ({ ...prev, visible: true })), [])
  const handleMouseLeave = useCallback(() => setLens(prev => ({ ...prev, visible: false })), [])

  const handleMouseMove = useCallback((e) => {
    const img = imgRef.current
    if (!img) return
    const rect = img.getBoundingClientRect()
    const lensSize = 100
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const lensHalf = lensSize / 2
    const clampedX = Math.max(lensHalf, Math.min(rect.width - lensHalf, x))
    const clampedY = Math.max(lensHalf, Math.min(rect.height - lensHalf, y))
    setLens({
      visible: true,
      lensLeft: clampedX - lensHalf,
      lensTop: clampedY - lensHalf,
      bgX: -((clampedX - lensHalf) * zoomFactor),
      bgY: -((clampedY - lensHalf) * zoomFactor),
      bgSize: `${rect.width * zoomFactor}px ${rect.height * zoomFactor}px`,
    })
  }, [zoomFactor])

  return { lens, imgRef, handleMouseEnter, handleMouseLeave, handleMouseMove }
}

// ─── Photo Card ────────────────────────────────────────────────────────────────
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
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <Camera className="opacity-20" size={32} />
        </div>
      )}
      <div className="absolute inset-0 z-10 select-none pointer-events-none" />
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
        className={`w-full h-full object-cover transition-all duration-500 select-none pointer-events-none group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      />

      {/* Zoom lens on thumbnail */}
      {lens.visible && loaded && (
        <div
          className="absolute z-20 rounded-full pointer-events-none"
          style={{
            width: 100, height: 100,
            left: lens.lensLeft, top: lens.lensTop,
            backgroundImage: `url('${photo.url}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: lens.bgSize,
            backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
            border: isDark ? '2px solid rgba(67,217,173,0.8)' : '2px solid rgba(13,148,136,0.8)',
            boxShadow: '0 0 0 1px rgba(67,217,173,0.3), 0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          <div className="absolute top-1/2 left-0 right-0" style={{ height: 1, background: 'rgba(67,217,173,0.5)', transform: 'translateY(-50%)' }} />
          <div className="absolute left-1/2 top-0 bottom-0" style={{ width: 1, background: 'rgba(67,217,173,0.5)', transform: 'translateX(-50%)' }} />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 z-30 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
        <p className="text-white text-sm font-medium mb-1 select-none">{photo.caption}</p>
        <div className="flex items-center justify-between">
          <span className="text-teal-400 text-xs select-none">{photo.category}</span>
          <span className="text-white/50 text-xs select-none">🔍 click to open</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-xs text-white/50 font-bold bg-black/40 px-2 py-1 rounded select-none">© Protected</span>
      </div>
    </div>
  )
}

// ─── Lightbox with full zoom UX ────────────────────────────────────────────────
function Lightbox({ photo, allPhotos, onClose, onNavigate, theme }) {
  const isDark = theme === 'dark'

  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [posStart, setPosStart] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef(null)
  const imgRef = useRef(null)

  const MIN_ZOOM = 1
  const MAX_ZOOM = 5
  const ZOOM_STEP = 0.4

  const currentIndex = allPhotos.findIndex(p => p.id === photo.id)

  // Reset zoom on photo change
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setIsAnimating(true)
    const t = setTimeout(() => setIsAnimating(false), 350)
    return () => clearTimeout(t)
  }, [photo.id])

  const clampPosition = useCallback((pos, currentZoom) => {
    if (!containerRef.current || !imgRef.current) return pos
    const cRect = containerRef.current.getBoundingClientRect()
    const overflow = {
      x: Math.max(0, (cRect.width * (currentZoom - 1)) / 2),
      y: Math.max(0, (cRect.height * (currentZoom - 1)) / 2),
    }
    return {
      x: Math.max(-overflow.x, Math.min(overflow.x, pos.x)),
      y: Math.max(-overflow.y, Math.min(overflow.y, pos.y)),
    }
  }, [])

  const zoomTo = useCallback((newZoom, originX = 0, originY = 0) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom))
    setZoom(clamped)
    if (clamped === 1) {
      setPosition({ x: 0, y: 0 })
    } else {
      setPosition(prev => {
        // Adjust position to zoom toward origin point
        const scaleDelta = clamped / zoom
        const newPos = {
          x: originX + (prev.x - originX) * scaleDelta,
          y: originY + (prev.y - originY) * scaleDelta,
        }
        return clampPosition(newPos, clamped)
      })
    }
  }, [zoom, clampPosition])

  // Scroll-to-zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const originX = (e.clientX - rect.left - rect.width / 2)
    const originY = (e.clientY - rect.top - rect.height / 2)
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    zoomTo(zoom + delta, originX / zoom, originY / zoom)
  }, [zoom, zoomTo])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  // Drag to pan
  const handleMouseDown = useCallback((e) => {
    if (zoom <= 1) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setPosStart({ ...position })
  }, [zoom, position])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    const newPos = {
      x: posStart.x + (e.clientX - dragStart.x),
      y: posStart.y + (e.clientY - dragStart.y),
    }
    setPosition(clampPosition(newPos, zoom))
  }, [isDragging, dragStart, posStart, zoom, clampPosition])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  // Double-click to zoom in/out at cursor
  const handleDoubleClick = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    if (zoom > 1) {
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    } else {
      const originX = (e.clientX - rect.left - rect.width / 2) / zoom
      const originY = (e.clientY - rect.top - rect.height / 2) / zoom
      zoomTo(2.5, originX, originY)
    }
  }, [zoom, zoomTo])

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate('next')
      if (e.key === 'ArrowLeft') onNavigate('prev')
      if (e.key === '+' || e.key === '=') zoomTo(zoom + ZOOM_STEP)
      if (e.key === '-') zoomTo(zoom - ZOOM_STEP)
      if (e.key === '0') { setZoom(1); setPosition({ x: 0, y: 0 }) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNavigate, zoom, zoomTo])

  // Prevent right-click
  useEffect(() => {
    const block = (e) => { if (e.target.tagName === 'IMG') e.preventDefault() }
    document.addEventListener('contextmenu', block)
    return () => document.removeEventListener('contextmenu', block)
  }, [])

  const zoomPercent = Math.round(zoom * 100)
  const isZoomed = zoom > 1

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.97)' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <style>{`
        @keyframes lb-enter {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes lb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .lb-img-enter { animation: lb-enter 0.32s cubic-bezier(0.34,1.56,0.64,1) both; }
        .zoom-pill { transition: all 0.2s ease; }
        .zoom-btn {
          width: 36px; height: 36px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
        }
        .zoom-btn:hover { background: rgba(67,217,173,0.15); border-color: rgba(67,217,173,0.4); color: #43D9AD; }
        .zoom-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .zoom-btn:disabled:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); }
        .nav-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .nav-btn:hover { background: rgba(67,217,173,0.2); border-color: rgba(67,217,173,0.5); }
        .zoom-crosshair { cursor: crosshair; }
        .zoom-grab { cursor: grab; }
        .zoom-grabbing { cursor: grabbing; }
        .zoom-bar-track {
          width: 120px; height: 4px;
          background: rgba(255,255,255,0.12);
          border-radius: 2px;
          overflow: hidden;
        }
        .zoom-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #43D9AD, #4D5BCE);
          border-radius: 2px;
          transition: width 0.2s ease;
        }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs font-mono">
            {currentIndex + 1} / {allPhotos.length}
          </span>
          <span className="text-white/70 text-sm font-medium truncate max-w-[200px]">{photo.caption}</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(67,217,173,0.15)', color: '#43D9AD', border: '1px solid rgba(67,217,173,0.3)' }}
          >
            {photo.category}
          </span>
        </div>
        <button
          onClick={onClose}
          className="zoom-btn"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Main image area ──────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center min-h-0 relative px-16">
        {/* Nav buttons */}
        {allPhotos.length > 1 && (
          <>
            <button
              onClick={() => onNavigate('prev')}
              className="nav-btn absolute left-4"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="nav-btn absolute right-4"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image container */}
        <div
          ref={containerRef}
          className={`relative flex items-center justify-center w-full h-full overflow-hidden
            ${isDragging ? 'zoom-grabbing' : isZoomed ? 'zoom-grab' : 'zoom-crosshair'}
          `}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          style={{ userSelect: 'none' }}
        >
          {/* Protective overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none select-none"
            onContextMenu={e => e.preventDefault()}
          />

          {/* Watermark */}
          <div
            className="absolute top-4 right-4 z-30 pointer-events-none select-none text-xs font-bold px-3 py-1 rounded"
            style={{ color: 'rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)' }}
          >
            © Muhammad Rajif Al Farikhi
          </div>

          {/* Zoom hint overlay — shows briefly */}
          {isAnimating && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              style={{
                animation: 'lb-fade 0.3s ease both',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 11,
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.1)',
                whiteSpace: 'nowrap',
                fontFamily: 'monospace',
              }}
            >
              scroll to zoom · double-click to zoom in · drag to pan
            </div>
          )}

          {/* Zoom grid lines — visible when zoomed */}
          {isZoomed && (
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(67,217,173,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(67,217,173,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                opacity: Math.min(1, (zoom - 1) * 0.8),
              }}
            />
          )}

          {/* The image */}
          <img
            ref={imgRef}
            src={photo.url}
            alt={photo.caption}
            draggable={false}
            onContextMenu={e => e.preventDefault()}
            className={`max-w-full max-h-full object-contain select-none ${isAnimating ? 'lb-img-enter' : ''}`}
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.4,0,0.2,1)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              pointerEvents: 'none',
              maxHeight: 'calc(100vh - 180px)',
            }}
          />
        </div>
      </div>

      {/* ── Bottom toolbar ───────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Keyboard hints */}
        <div className="hidden sm:flex items-center gap-4 text-white/25 text-xs font-mono">
          <span>← → navigate</span>
          <span>scroll / +- zoom</span>
          <span>dbl-click zoom</span>
          <span>0 reset</span>
          <span>ESC close</span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            className="zoom-btn"
            onClick={() => zoomTo(zoom - ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
          >
            <ZoomOut size={15} />
          </button>

          {/* Zoom bar + percentage */}
          <div className="flex items-center gap-2 px-2">
            <div className="zoom-bar-track">
              <div
                className="zoom-bar-fill"
                style={{ width: `${((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100}%` }}
              />
            </div>
            <span
              className="zoom-pill text-xs tabular-nums font-mono w-10 text-center"
              style={{ color: isZoomed ? '#43D9AD' : 'rgba(255,255,255,0.4)' }}
            >
              {zoomPercent}%
            </span>
          </div>

          <button
            className="zoom-btn"
            onClick={() => zoomTo(zoom + ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
          >
            <ZoomIn size={15} />
          </button>

          {/* Reset */}
          <button
            className="zoom-btn"
            onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }) }}
            disabled={zoom === 1 && position.x === 0 && position.y === 0}
            aria-label="Reset zoom"
          >
            <RotateCcw size={14} />
          </button>

          {/* Fit to screen (max non-crop zoom) */}
          <button
            className="zoom-btn"
            onClick={() => zoomTo(MAX_ZOOM)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Max zoom"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PhotoAlbum({ theme = 'dark' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const isDark = theme === 'dark'

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const block = e => { if (e.target.tagName === 'IMG') e.preventDefault() }
    document.addEventListener('contextmenu', block)
    document.addEventListener('dragstart', block)
    return () => {
      document.removeEventListener('contextmenu', block)
      document.removeEventListener('dragstart', block)
    }
  }, [])

  const navigate = useCallback((dir) => {
    if (!selectedPhoto) return
    const i = filteredPhotos.findIndex(p => p.id === selectedPhoto.id)
    const next = dir === 'next'
      ? (i + 1) % filteredPhotos.length
      : (i - 1 + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhoto(filteredPhotos[next])
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Camera className="text-teal-400" size={24} />
          <h3 className={`text-xl font-bold ${textClass}`}>Photo Album</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-teal-400/60 hidden sm:block">// hover to zoom · click to open</span>
          <span className={`text-sm ${isDark ? 'text-[#607B96]' : 'text-gray-400'}`}>
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          </span>
        </div>
      </div>

      {/* Category Filter */}
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

      {/* Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPhotos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              onOpen={setSelectedPhoto}
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

      {/* Lightbox */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          allPhotos={filteredPhotos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={navigate}
          theme={theme}
        />
      )}
    </div>
  )
}
