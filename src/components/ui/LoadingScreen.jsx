'use client'

import { useState, useEffect, useRef } from 'react'

// ── Pixel-art SVG paths for "PRESS START" (identical to Button by Cobp) ────────
const PixelTextSVG = () => ( ... ) // sama seperti kode sebelumnya, tidak berubah

// ── Pixel-art character SVG — dua grup bergantian (tidak dihapus) ──────────────
const PixelCharSVG = () => ( ... ) // sama persis seperti di kode asli, tidak berubah

// ── The green pixel-art button (styled after the Cobp button shape) ────────────
const PixelButton = ({ pressed }) => ( ... ) // sama seperti kode sebelumnya

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('boot')      // boot -> ready -> exit
  const [cursorVisible, setCursorVisible] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [lightUp, setLightUp] = useState(false)

  // Boot phase: tunggu 3 detik (durasi loading bar) lalu pindah ke ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('ready')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Blinking cursor (opsional, bisa dipertahankan untuk efek)
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (phase !== 'ready' || clicked) return
    setClicked(true)
    setPressed(true)
    setLightUp(true)
    setTimeout(() => setPressed(false), 150)
    setTimeout(() => {
      setPhase('exit')
      setTimeout(() => onComplete?.(), 600)
    }, 300)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#011627',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Fira Code', 'Courier New', monospace",
        overflow: 'hidden',
        cursor: phase === 'ready' ? 'pointer' : 'default',
        transition: phase === 'exit' ? 'opacity 0.5s ease, transform 0.5s ease' : 'none',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      <style>{`
        /* semua CSS dari kode asli, termasuk animasi untuk karakter, button, dll */
        /* ... (salin persis dari kode asli) ... */
        @keyframes bar-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .bar-fill-animation {
          animation: bar-fill 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        /* ... dan seterusnya ... */
      `}</style>

      {/* Scanlines + vignette layer */}
      <div className="ls-scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Light-up overlay */}
      <div className="light-up-overlay" style={{ opacity: lightUp ? 1 : 0 }}>
        <span />
      </div>

      {/* Main content */}
      <div
        className={phase === 'ready' ? 'ls-ready' : ''}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 560,
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Top bar */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          borderBottom: '1px solid #1E2D3D',
          paddingBottom: 10,
        }}>
          <span style={{ color: '#4D5BCE', fontSize: 11, letterSpacing: '0.12em' }}>PORTFOLIO_OS v1.0.0</span>
          <span style={{ color: '#607B96', fontSize: 11 }}>murfhi</span>
        </div>

        {/* Pixel-art "PRESS START" text */}
        <div className="pixel-text-wrapper" style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <PixelTextSVG />
        </div>

        {/* Pixel button + karakter di atasnya (tidak dihapus) */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <PixelButton pressed={pressed} />
          {/* Karakter pixel art - posisi di atas tombol */}
          <div style={{
            position: 'absolute',
            bottom: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'transform 0.3s ease',
            pointerEvents: 'none',
          }}>
            <PixelCharSVG />
          </div>
        </div>

        {/* Loading bar dengan animasi fill */}
        <div style={{
          width: '100%',
          height: 4,
          background: '#1E2D3D',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          <div
            className={phase === 'boot' ? 'bar-fill-animation' : ''}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #4D5BCE, #43D9AD)',
              borderRadius: 2,
              width: phase === 'ready' ? '100%' : '0%',
            }}
          />
        </div>

        {/* Status: hanya "loading..." saat boot, lalu "PRESS ANY KEY" saat ready */}
        <div style={{ textAlign: 'center', height: 28 }}>
          {phase === 'ready' && (
            <div className="glitch-wrap press-blink">
              <span style={{ color: '#43D9AD', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                — PRESS ANY KEY TO ENTER —
              </span>
              <span className="glitch-a" style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                — PRESS ANY KEY TO ENTER —
              </span>
              <span className="glitch-b" style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                — PRESS ANY KEY TO ENTER —
              </span>
            </div>
          )}
          {phase === 'boot' && (
            <span style={{ color: '#1E2D3D', fontSize: 12 }}>loading...</span>
          )}
        </div>

        {/* Footer */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 24,
          paddingTop: 10,
          borderTop: '1px solid #1E2D3D',
        }}>
          <span style={{ color: '#1E2D3D', fontSize: 10, letterSpacing: '0.08em' }}>© 2024 RAJIF PORTFOLIO</span>
          <span style={{ color: '#1E2D3D', fontSize: 10, letterSpacing: '0.08em' }}>SURABAYA, ID</span>
        </div>
      </div>
    </div>
  )
}
