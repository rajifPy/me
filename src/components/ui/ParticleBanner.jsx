'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'

// ─────────────────────────────────────────────────────────────────────────────
// 3-D Shape generators
// ─────────────────────────────────────────────────────────────────────────────
function genDNA(n, r) {
  const pts = []
  const turns = 2.5, rad = r * 0.45, h = r * 1.1
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2 * turns
    const phase = (i % 2) * Math.PI
    pts.push([
      Math.cos(t + phase) * rad,
      (i / n - 0.5) * h,
      Math.sin(t + phase) * rad,
    ])
  }
  return pts
}

function genTorus(n, r) {
  const pts = []
  const R = r * 0.7, rr = r * 0.28
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.random() * Math.PI * 2
    pts.push([
      (R + rr * Math.cos(phi)) * Math.cos(theta),
      rr * Math.sin(phi),
      (R + rr * Math.cos(phi)) * Math.sin(theta),
    ])
  }
  return pts
}

function genHeart(n, r) {
  const pts = []
  const sc = r * 0.045
  for (let i = 0; i < n; i++) {
    const t   = Math.random() * Math.PI * 2
    const rnd = Math.random()
    pts.push([
      rnd * 16 * Math.pow(Math.sin(t), 3) * sc,
      -rnd * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * sc,
      (Math.random() - 0.5) * r * 0.25,
    ])
  }
  return pts
}

function genInfinity(n, r) {
  const pts = []
  const sc = r * 0.55
  for (let i = 0; i < n; i++) {
    const t = Math.random() * Math.PI * 2
    const d = 1 + Math.sin(t) * Math.sin(t)
    pts.push([
      sc * Math.cos(t) / d,
      (Math.random() - 0.5) * r * 0.08,
      sc * Math.sin(t) * Math.cos(t) / d,
    ])
  }
  return pts
}

function genSpiral(n, r) {
  const pts = []
  const turns = 5, hs = r * 0.3
  for (let i = 0; i < n; i++) {
    const t     = (i / n) * Math.PI * 2 * turns
    const rr    = (t / (Math.PI * 2 * turns)) * r
    const angle = t + (Math.random() - 0.5) * 0.2
    pts.push([rr * Math.cos(angle), (i / n - 0.5) * hs, rr * Math.sin(angle)])
  }
  return pts
}

function genCube(n, r) {
  const pts = []
  const half = r * 0.55
  for (let i = 0; i < n; i++) {
    // Randomly pick one of the 6 faces
    const face = Math.floor(Math.random() * 6)
    let x, y, z
    const u = (Math.random() - 0.5) * 2 * half
    const v = (Math.random() - 0.5) * 2 * half
    switch (face) {
      case 0: x =  half; y = u; z = v; break
      case 1: x = -half; y = u; z = v; break
      case 2: y =  half; x = u; z = v; break
      case 3: y = -half; x = u; z = v; break
      case 4: z =  half; x = u; y = v; break
      default: z = -half; x = u; y = v; break
    }
    pts.push([x, y, z])
  }
  return pts
}

// ─────────────────────────────────────────────────────────────────────────────
// Data tables
// ─────────────────────────────────────────────────────────────────────────────
const SHAPES = [
  { name: 'DNA Helix',  nameID: 'Heliks DNA',   icon: '🧬', gen: genDNA      },
  { name: 'Torus',      nameID: 'Torus',         icon: '🍩', gen: genTorus    },
  { name: 'Heart',      nameID: 'Hati',          icon: '♥',  gen: genHeart    },
  { name: 'Infinity ∞', nameID: 'Tak Hingga ∞',  icon: '∞',  gen: genInfinity },
  { name: 'Spiral',     nameID: 'Spiral',        icon: '🌀', gen: genSpiral   },
  { name: 'Cube',    nameID: 'Kubus',   icon: '🧊', gen: genCube    },
]

const SCHEMES = [
  { label: 'fire',    h0: 0,   h1: 50,  s: 0.9,  l: 0.60, grad: 'linear-gradient(135deg,#ff4500,#ffcc00)' },
  { label: 'neon',    h0: 290, h1: 190, s: 1.0,  l: 0.65, grad: 'linear-gradient(135deg,#ff00ff,#00ffff)' },
  { label: 'nature',  h0: 85,  h1: 165, s: 0.8,  l: 0.55, grad: 'linear-gradient(135deg,#00ff44,#66ffcc)' },
  { label: 'rainbow', h0: 0,   h1: 360, s: 0.85, l: 0.60, grad: 'linear-gradient(135deg,red,violet)'       },
]

// ─────────────────────────────────────────────────────────────────────────────
// Math helpers
// ─────────────────────────────────────────────────────────────────────────────
const N         = 1800
const MORPH_DUR = 1.9
const SIZE_FRAC = 0.25
const MIN_ZOOM  = 0.4
const MAX_ZOOM  = 3.0
const ZOOM_STEP = 0.15

function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

function hashNoise(n) { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x) }
function noise2(x, y, t) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const a = hashNoise(xi + yi * 57 + t * 31)
  const b = hashNoise(xi + 1 + yi * 57 + t * 31)
  const c = hashNoise(xi + (yi + 1) * 57 + t * 31)
  const d = hashNoise(xi + 1 + (yi + 1) * 57 + t * 31)
  const ux = xf * xf * (3 - 2 * xf)
  const uy = yf * yf * (3 - 2 * yf)
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
}

function project(x, y, z, rotX, rotY, cx, cy) {
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
  const ny  =  y * cosX - z * sinX
  const nz  =  y * sinX + z * cosX
  const nx  =  x * cosY + nz * sinY
  const nz2 = -x * sinY + nz * cosY
  const fov = 700
  const scale = fov / (fov + nz2 + 400)
  return { sx: cx + nx * scale, sy: cy + ny * scale, scale }
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ParticleBanner() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isDark = theme === 'dark'

  const canvasRef = useRef(null)
  const stateRef  = useRef({
    rotX: -0.3, rotY: 0.4,
    isDragging: false, lastMX: 0, lastMY: 0,
    pts3D: [], srcPts: [], tgtPts: [],
    morphT: 1, morphStart: 0, isMorphing: false,
    shapeIdx: 0, schemeIdx: 0,
    rafId: null, lastTime: 0,
    isDark: isDark,
    // zoom state
    zoom: 1.0,
    panX: 0,
    panY: 0,
    isPanning: false,
    panStartX: 0,
    panStartY: 0,
    panOriginX: 0,
    panOriginY: 0,
    // pinch state
    lastPinchDist: null,
  })

  const [currentShape,  setCurrentShape]  = useState(0)
  const [currentScheme, setCurrentScheme] = useState(0)
  const [morphing,      setMorphing]      = useState(false)
  const [showHint,      setShowHint]      = useState(true)
  const [fps,           setFps]           = useState(0)
  const [zoomLevel,     setZoomLevel]     = useState(1.0)
  const fpsRef = useRef({ frames: 0, last: 0 })

  useEffect(() => { stateRef.current.isDark = isDark }, [isDark])

  // ── zoom helpers ──────────────────────────────────────────────
  const clampZoom = (z) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z))

  const applyZoom = useCallback((newZoom, originX, originY) => {
    const s = stateRef.current
    const clamped = clampZoom(newZoom)
    const ratio = clamped / s.zoom
    // Adjust pan so zoom pivots around origin
    s.panX = originX + (s.panX - originX) * ratio
    s.panY = originY + (s.panY - originY) * ratio
    s.zoom = clamped
    setZoomLevel(clamped)
  }, [])

  const zoomIn = useCallback(() => {
    const s = stateRef.current
    applyZoom(s.zoom + ZOOM_STEP, 0, 0)
  }, [applyZoom])

  const zoomOut = useCallback(() => {
    const s = stateRef.current
    applyZoom(s.zoom - ZOOM_STEP, 0, 0)
  }, [applyZoom])

  const resetZoom = useCallback(() => {
    const s = stateRef.current
    s.zoom = 1.0
    s.panX = 0
    s.panY = 0
    setZoomLevel(1.0)
  }, [])

  // ── shape builder ─────────────────────────────────────────────
  const buildShape = useCallback((idx, r) => SHAPES[idx].gen(N, r), [])

  const initPts = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const r = Math.min(canvas.width, canvas.height) * SIZE_FRAC
    const s = stateRef.current
    s.pts3D  = buildShape(s.shapeIdx, r).map(p => [...p])
    s.srcPts = s.pts3D.map(p => [...p])
    s.tgtPts = s.pts3D.map(p => [...p])
  }, [buildShape])

  // ── morph trigger ─────────────────────────────────────────────
  const triggerMorph = useCallback(() => {
    const s = stateRef.current
    if (s.isMorphing) return
    s.isMorphing = true
    s.morphStart = performance.now() / 1000
    s.morphT     = 0
    s.srcPts     = s.pts3D.map(p => [...p])
    s.shapeIdx   = (s.shapeIdx + 1) % SHAPES.length
    const canvas = canvasRef.current
    const r = canvas ? Math.min(canvas.width, canvas.height) * SIZE_FRAC : 150
    s.tgtPts = buildShape(s.shapeIdx, r)
    setCurrentShape(s.shapeIdx)
    setMorphing(true)
  }, [buildShape])

  // ── animation loop ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas.width  = rect.width
      canvas.height = rect.height
      initPts()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    function frame(ts) {
      const t = ts / 1000
      const s = stateRef.current

      fpsRef.current.frames++
      if (t - fpsRef.current.last >= 1) {
        setFps(fpsRef.current.frames)
        fpsRef.current.frames = 0
        fpsRef.current.last   = t
      }

      s.lastTime = t
      const W = canvas.width, H = canvas.height
      // Apply zoom + pan transform via center offset
      const cx = W / 2 + s.panX
      const cy = H / 2 + s.panY

      // trail fade — slightly thicker to clear zoomed content
      ctx.fillStyle = s.isDark ? 'rgba(1,18,39,0.20)' : 'rgba(245,245,245,0.24)'
      ctx.fillRect(0, 0, W, H)

      // auto-rotate
      if (!s.isDragging && !s.isPanning) {
        s.rotY += 0.0015
        s.rotX += 0.0003 * Math.sin(t * 0.2)
      }

      const scheme = SCHEMES[s.schemeIdx]

      // morph update
      if (s.isMorphing) {
        s.morphT = Math.min((t - s.morphStart) / MORPH_DUR, 1)
        const et    = easeInOut(s.morphT)
        const burst = 70 * Math.sin(s.morphT * Math.PI)
        if (s.morphT >= 1) {
          s.isMorphing = false
          s.pts3D  = s.tgtPts.map(p => [...p])
          s.srcPts = s.pts3D.map(p => [...p])
          setMorphing(false)
        } else {
          for (let i = 0; i < N; i++) {
            const sx = s.srcPts[i][0], sy = s.srcPts[i][1], sz = s.srcPts[i][2]
            const tx = s.tgtPts[i][0], ty = s.tgtPts[i][1], tz = s.tgtPts[i][2]
            const mx = (sx + tx) / 2 + (Math.random() - 0.5) * burst
            const my = (sy + ty) / 2 + (Math.random() - 0.5) * burst
            const mz = (sz + tz) / 2 + (Math.random() - 0.5) * burst
            const u = 1 - et, v = et
            s.pts3D[i][0] = u * u * sx + 2 * u * v * mx + v * v * tx
            s.pts3D[i][1] = u * u * sy + 2 * u * v * my + v * v * ty
            s.pts3D[i][2] = u * u * sz + 2 * u * v * mz + v * v * tz
          }
        }
      } else {
        const breath = 1 + Math.sin(t * 0.4) * 0.012
        const freq   = 0.012, ts2 = t * 0.04
        for (let i = 0; i < N; i++) {
          const ox = s.srcPts[i][0] * breath
          const oy = s.srcPts[i][1] * breath
          const oz = s.srcPts[i][2] * breath
          const nx = noise2(ox * freq,      oy * freq,      ts2) * 2 - 1
          const ny = noise2(oy * freq + 10, oz * freq + 10, ts2) * 2 - 1
          const nz = noise2(oz * freq + 20, ox * freq + 20, ts2) * 2 - 1
          s.pts3D[i][0] += (ox + nx * 16 - s.pts3D[i][0]) * 0.06
          s.pts3D[i][1] += (oy + ny * 16 - s.pts3D[i][1]) * 0.06
          s.pts3D[i][2] += (oz + nz * 16 - s.pts3D[i][2]) * 0.06
        }
      }

      // project + depth sort — zoom applied via scaled coordinates
      const maxR = Math.min(W, H) * SIZE_FRAC
      const zoom = s.zoom
      const projected = s.pts3D.map(p => {
        const pr  = project(p[0] * zoom, p[1] * zoom, p[2] * zoom, s.rotX, s.rotY, cx, cy)
        const len = Math.sqrt(p[0] ** 2 + p[1] ** 2 + p[2] ** 2)
        return { ...pr, norm: Math.min(len / maxR, 1) }
      })
      projected.sort((a, b) => a.scale - b.scale)

      // draw particles
      for (const p of projected) {
        const { sx, sy, scale, norm } = p
        // Clip to canvas bounds for performance
        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue

        const h    = scheme.h0 + norm * (scheme.h1 - scheme.h0)
        const sPct = Math.round(scheme.s * 100)
        const lPct = Math.round(scheme.l * 100)
        const size = Math.max(0.4, scale * 2.5 * Math.sqrt(zoom))
        const alpha = s.isMorphing
          ? (0.3 + 0.7 * Math.abs(Math.sin(s.morphT * Math.PI)))
          : 0.88

        if (scale > 0.68 && !s.isMorphing) {
          ctx.shadowColor = `hsl(${h},${sPct}%,${lPct}%)`
          ctx.shadowBlur  = size * 3.5
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${h},${sPct}%,${lPct}%,${alpha})`
        ctx.fill()
      }
      ctx.shadowBlur = 0

      s.rafId = requestAnimationFrame(frame)
    }

    stateRef.current.rafId = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(stateRef.current.rafId)
      ro.disconnect()
    }
  }, [initPts])

  // ── pointer / keyboard / wheel events ────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const s = stateRef.current
    let dragged = false

    // ── Mouse drag (rotate when not panning) ─────────────────
    const onDown = e => {
      // Middle mouse or Ctrl+drag = pan, else rotate
      if (e.button === 1 || e.ctrlKey) {
        s.isPanning = true
        s.panStartX = e.clientX
        s.panStartY = e.clientY
        s.panOriginX = s.panX
        s.panOriginY = s.panY
      } else {
        s.isDragging = true
      }
      dragged = false
      s.lastMX = e.clientX; s.lastMY = e.clientY
    }
    const onUp = () => { s.isDragging = false; s.isPanning = false }
    const onMove = e => {
      if (s.isPanning) {
        dragged = true
        s.panX = s.panOriginX + (e.clientX - s.panStartX)
        s.panY = s.panOriginY + (e.clientY - s.panStartY)
        return
      }
      if (!s.isDragging) return
      const dx = e.clientX - s.lastMX, dy = e.clientY - s.lastMY
      if (Math.abs(dx) + Math.abs(dy) > 2) dragged = true
      s.rotY += dx * 0.005; s.rotX += dy * 0.005
      s.lastMX = e.clientX; s.lastMY = e.clientY
    }
    const onClick = e => {
      if (!dragged && !e.ctrlKey && e.button === 0) triggerMorph()
    }

    // ── Scroll to zoom ────────────────────────────────────────
    const onWheel = e => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      // origin relative to canvas center
      const ox = (e.clientX - rect.left) - canvas.width / 2
      const oy = (e.clientY - rect.top)  - canvas.height / 2
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
      applyZoom(s.zoom + delta, ox, oy)
    }

    // ── Touch events ──────────────────────────────────────────
    const getDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const onTouchStart = e => {
      if (e.touches.length === 2) {
        s.lastPinchDist = getDistance(e.touches)
        s.isDragging = false
      } else {
        s.isDragging = true; dragged = false
        s.lastMX = e.touches[0].clientX; s.lastMY = e.touches[0].clientY
      }
    }
    const onTouchMove = e => {
      if (e.touches.length === 2 && s.lastPinchDist !== null) {
        e.preventDefault()
        const dist = getDistance(e.touches)
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2
        const rect = canvas.getBoundingClientRect()
        const ox = midX - rect.left - canvas.width / 2
        const oy = midY - rect.top  - canvas.height / 2
        const scale = dist / s.lastPinchDist
        applyZoom(s.zoom * scale, ox, oy)
        s.lastPinchDist = dist
        return
      }
      if (!s.isDragging) return
      const dx = e.touches[0].clientX - s.lastMX
      const dy = e.touches[0].clientY - s.lastMY
      if (Math.abs(dx) + Math.abs(dy) > 2) dragged = true
      s.rotY += dx * 0.005; s.rotX += dy * 0.005
      s.lastMX = e.touches[0].clientX; s.lastMY = e.touches[0].clientY
    }
    const onTouchEnd = e => {
      if (e.touches.length < 2) s.lastPinchDist = null
      s.isDragging = false
    }

    // ── Keyboard ──────────────────────────────────────────────
    const onKey = e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); triggerMorph() }
      if (e.key === 'ArrowRight') s.rotY += 0.08
      if (e.key === 'ArrowLeft')  s.rotY -= 0.08
      if (e.key === 'ArrowUp')    s.rotX -= 0.08
      if (e.key === 'ArrowDown')  s.rotX += 0.08
      if (e.key === '+' || e.key === '=') applyZoom(s.zoom + ZOOM_STEP, 0, 0)
      if (e.key === '-')                  applyZoom(s.zoom - ZOOM_STEP, 0, 0)
      if (e.key === '0')                  resetZoom()
    }

    canvas.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('mousemove',  onMove)
    canvas.addEventListener('click',      onClick)
    canvas.addEventListener('wheel',      onWheel, { passive: false })
    canvas.addEventListener('touchstart', onTouchStart,  { passive: true })
    window.addEventListener('touchend',   onTouchEnd)
    window.addEventListener('touchmove',  onTouchMove,   { passive: false })
    window.addEventListener('keydown',    onKey)

    return () => {
      canvas.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('mousemove',  onMove)
      canvas.removeEventListener('click',      onClick)
      canvas.removeEventListener('wheel',      onWheel)
      canvas.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('keydown',    onKey)
    }
  }, [triggerMorph, applyZoom, resetZoom])

  // hide hint after 4 s
  useEffect(() => {
    const id = setTimeout(() => setShowHint(false), 4000)
    return () => clearTimeout(id)
  }, [])

  const changeScheme = (i) => {
    stateRef.current.schemeIdx = i
    setCurrentScheme(i)
  }

  const shapeLbl = language === 'id'
    ? SHAPES[currentShape].nameID
    : SHAPES[currentShape].name

  const accent   = isDark ? '#43D9AD' : '#0D9488'
  const border   = isDark ? '#1E2D3D' : '#E0E0E0'
  const bgCard   = isDark ? '#011221' : '#FFFFFF'
  const textMute = isDark ? '#607B96' : '#9CA3AF'
  const mono     = "'Fira Code', monospace"

  const zoomPct = Math.round(zoomLevel * 100)
  const zoomBarW = ((zoomLevel - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100

  return (
    <div className="w-full max-w-5xl mx-auto select-none">

      {/* ── Section header ── */}
      <div className="mb-4">
        <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <span className="text-accent-blue">//</span>{' '}
          {language === 'id' ? 'visualisasi-partikel' : 'particle-visualizer'}
        </h2>
        <p style={{ fontFamily: mono, fontSize: 11, color: textMute, letterSpacing: '.05em' }}>
          {language === 'id'
            ? '// 6 bentuk 3-D · klik untuk morph · drag rotasi · scroll/pinch untuk zoom'
            : '// 6 3-D shapes · click to morph · drag to rotate · scroll/pinch to zoom'}
        </p>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-xl overflow-hidden"
           style={{ background: bgCard, border: `1px solid ${border}` }}>

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5"
             style={{ borderBottom: `1px solid ${border}` }}>

          {/* Traffic-light dots */}
          <div className="flex items-center gap-2">
            {['#FF5F57','#FFBD2E','#28C840'].map(c => (
              <span key={c} style={{ width:11, height:11, borderRadius:'50%', background:c, display:'inline-block' }} />
            ))}
          </div>

          {/* Shape label */}
          <div className="flex items-center gap-2">
            {morphing && (
              <span style={{
                fontFamily: mono, fontSize: 10,
                padding: '2px 10px', borderRadius: 20,
                background: 'rgba(67,217,173,0.12)', color: '#43D9AD',
                border: '1px solid rgba(67,217,173,0.3)',
                animation: 'pbPulse 1.4s ease-in-out infinite',
              }}>
                morphing...
              </span>
            )}
            <span style={{ fontFamily: mono, fontSize: 12, color: accent, letterSpacing: '.05em' }}>
              {SHAPES[currentShape].icon}&nbsp;{shapeLbl}
            </span>
          </div>

          {/* Scheme picker */}
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: mono, fontSize: 10, color: textMute }}>
              {language === 'id' ? 'warna' : 'scheme'}
            </span>
            {SCHEMES.map((sc, i) => (
              <button key={i} onClick={() => changeScheme(i)} title={sc.label}
                style={{
                  width: 18, height: 18, borderRadius: '50%', background: sc.grad,
                  border: 'none', cursor: 'pointer', padding: 0,
                  outline: currentScheme === i ? `2px solid ${isDark ? '#fff' : '#333'}` : '2px solid transparent',
                  outlineOffset: 2,
                  transform: currentScheme === i ? 'scale(1.35)' : 'scale(1)',
                  transition: 'transform .2s ease, outline-color .2s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Canvas area ── */}
        <div style={{ position: 'relative', height: 420 }}>
          <canvas
            ref={canvasRef}
            style={{
              display: 'block', width: '100%', height: '100%',
              cursor: zoomLevel > 1 ? 'grab' : 'crosshair',
            }}
          />

          {/* Hint overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            opacity: showHint ? 1 : 0,
            transition: 'opacity .8s ease',
          }}>
            <span style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '.1em',
              color:      isDark ? 'rgba(67,217,173,.7)'  : 'rgba(13,148,136,.7)',
              background: isDark ? 'rgba(1,18,39,.65)'    : 'rgba(255,255,255,.85)',
              padding: '7px 18px', borderRadius: 20,
              border: `1px solid ${isDark ? 'rgba(67,217,173,.25)' : 'rgba(13,148,136,.25)'}`,
            }}>
              {language === 'id'
                ? 'klik morph · drag rotasi · scroll zoom'
                : 'click to morph · drag to rotate · scroll to zoom'}
            </span>
          </div>

          {/* FPS */}
          <span style={{
            position: 'absolute', top: 10, left: 12,
            fontFamily: mono, fontSize: 9,
            color: isDark ? 'rgba(96,123,150,.5)' : 'rgba(180,180,180,.8)',
            letterSpacing: '.06em', pointerEvents: 'none',
          }}>
            {fps} fps
          </span>

          {/* Zoom level badge */}
          <span style={{
            position: 'absolute', top: 10, right: 12,
            fontFamily: mono, fontSize: 10,
            color: zoomLevel !== 1 ? accent : (isDark ? 'rgba(96,123,150,.5)' : 'rgba(180,180,180,.7)'),
            background: isDark ? 'rgba(1,18,39,.6)' : 'rgba(255,255,255,.7)',
            padding: '2px 8px', borderRadius: 10,
            border: `1px solid ${zoomLevel !== 1 ? accent + '40' : 'transparent'}`,
            pointerEvents: 'none',
            transition: 'color .2s, border-color .2s',
          }}>
            {zoomPct}%
          </span>

          {/* Watermark */}
          <span style={{
            position: 'absolute', bottom: 10, right: 12,
            fontFamily: mono, fontSize: 9,
            color: isDark ? 'rgba(96,123,150,.35)' : 'rgba(180,180,180,.6)',
            letterSpacing: '.06em', pointerEvents: 'none',
          }}>
            rajif.dev · particles
          </span>
        </div>

        {/* ── Bottom controls ── */}
        <div className="flex items-center justify-between px-4 py-3 flex-wrap gap-3"
             style={{ borderTop: `1px solid ${border}` }}>

          {/* Left: morph button */}
          <button
            onClick={triggerMorph}
            disabled={morphing}
            className="pb-morph-btn"
            style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '.06em',
              padding: '6px 20px', borderRadius: 4,
              cursor: morphing ? 'not-allowed' : 'pointer',
              border: `1px solid ${accent}`,
              color: accent,
              background: morphing ? `${accent}12` : 'transparent',
              opacity: morphing ? 0.5 : 1,
              transition: 'all .2s ease',
            }}
          >
            {language === 'id' ? '▶ ganti-bentuk' : '▶ next-shape'}
          </button>

          {/* Center: zoom controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Zoom out */}
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= MIN_ZOOM}
              title={language === 'id' ? 'Perkecil' : 'Zoom out'}
              style={{
                width: 30, height: 30, borderRadius: 6,
                border: `1px solid ${border}`,
                background: 'transparent',
                color: zoomLevel <= MIN_ZOOM ? (isDark ? '#1E2D3D' : '#DDD') : textMute,
                cursor: zoomLevel <= MIN_ZOOM ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, lineHeight: 1,
                transition: 'all .15s ease',
                fontFamily: mono,
              }}
            >
              −
            </button>

            {/* Zoom bar track */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pct = (e.clientX - rect.left) / rect.width
                const newZoom = MIN_ZOOM + pct * (MAX_ZOOM - MIN_ZOOM)
                applyZoom(newZoom, 0, 0)
              }}
              style={{
                width: 80, height: 4,
                background: isDark ? '#1E2D3D' : '#E0E0E0',
                borderRadius: 2, overflow: 'hidden',
                cursor: 'pointer', position: 'relative',
              }}
            >
              <div style={{
                height: '100%',
                width: `${zoomBarW}%`,
                background: `linear-gradient(90deg, ${accent}, #4D5BCE)`,
                borderRadius: 2,
                transition: 'width .1s ease',
              }} />
            </div>

            {/* Zoom in */}
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= MAX_ZOOM}
              title={language === 'id' ? 'Perbesar' : 'Zoom in'}
              style={{
                width: 30, height: 30, borderRadius: 6,
                border: `1px solid ${border}`,
                background: 'transparent',
                color: zoomLevel >= MAX_ZOOM ? (isDark ? '#1E2D3D' : '#DDD') : textMute,
                cursor: zoomLevel >= MAX_ZOOM ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, lineHeight: 1,
                transition: 'all .15s ease',
                fontFamily: mono,
              }}
            >
              +
            </button>

            {/* Reset zoom */}
            {zoomLevel !== 1 && (
              <button
                onClick={resetZoom}
                title={language === 'id' ? 'Reset zoom' : 'Reset zoom'}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  border: `1px solid ${accent}40`,
                  background: `${accent}10`,
                  color: accent,
                  cursor: 'pointer',
                  fontSize: 10, fontFamily: mono,
                  letterSpacing: '.04em',
                  transition: 'all .15s ease',
                }}
              >
                {language === 'id' ? 'reset' : 'reset'}
              </button>
            )}
          </div>

          {/* Right: shape progress pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {SHAPES.map((_, i) => (
              <div key={i} style={{
                width:  i === currentShape ? 22 : 6,
                height: 6,
                borderRadius: 3,
                background: i === currentShape ? accent : (isDark ? '#1E2D3D' : '#D0D0D0'),
                transition: 'all .35s ease',
              }} />
            ))}
          </div>
        </div>

        {/* ── Zoom hint bar ── */}
        <div style={{
          padding: '6px 16px',
          borderTop: `1px solid ${border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 8,
          background: isDark ? 'rgba(1,18,39,0.4)' : 'rgba(248,248,248,0.7)',
        }}>
          <span style={{ fontFamily: mono, fontSize: 9, color: isDark ? '#1E2D3D' : '#CACACA', letterSpacing: '.06em' }}>
            {language === 'id'
              ? 'scroll = zoom · ctrl+drag = pan · pinch = zoom (touch) · +/- = zoom · 0 = reset'
              : 'scroll = zoom · ctrl+drag = pan · pinch = zoom (touch) · +/- keys = zoom · 0 = reset'}
          </span>
          <span style={{ fontFamily: mono, fontSize: 9, color: isDark ? '#1E2D3D' : '#CACACA', letterSpacing: '.06em' }}>
            {language === 'id'
              ? `${MIN_ZOOM * 100}% – ${MAX_ZOOM * 100}%`
              : `${MIN_ZOOM * 100}% – ${MAX_ZOOM * 100}%`}
          </span>
        </div>
      </div>

      {/* ── Shape legend ── */}
      <div className="mt-3 flex flex-wrap gap-2">
        {SHAPES.map((sh, i) => (
          <span key={i} style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '.05em',
            padding: '3px 12px', borderRadius: 20, cursor: 'default',
            background: i === currentShape
              ? (isDark ? 'rgba(67,217,173,.15)' : 'rgba(13,148,136,.1)')
              : 'transparent',
            border: `1px solid ${i === currentShape ? accent : border}`,
            color:  i === currentShape ? accent : textMute,
            transition: 'all .3s ease',
          }}>
            {sh.icon}&nbsp;{language === 'id' ? sh.nameID : sh.name}
          </span>
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pbPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .pb-morph-btn:hover:not(:disabled) {
          background: ${isDark ? '#43D9AD' : '#0D9488'} !important;
          color: #011221 !important;
        }
      `}</style>
    </div>
  )
}
