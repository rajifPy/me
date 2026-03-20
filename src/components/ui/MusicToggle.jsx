'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'

export default function MusicToggle() {
  const { theme } = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const audioRef = useRef(null)
  const isDark = theme === 'dark'

  // Ganti src dengan file musik lo-fi kamu di /public/audio/
  useEffect(() => {
    const audio = new Audio('/audio/sparks.mp3')
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const handleToggle = async () => {
    if (isAnimating) return
    setIsAnimating(true)

    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        // autoplay blocked — still show as playing state
        setIsPlaying(true)
      }
    }

    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <>
      <style>{`
        @keyframes bar1 {
          0%, 100% { height: 4px; }
          25%       { height: 14px; }
          50%       { height: 8px; }
          75%       { height: 12px; }
        }
        @keyframes bar2 {
          0%, 100% { height: 12px; }
          20%       { height: 5px; }
          50%       { height: 16px; }
          80%       { height: 7px; }
        }
        @keyframes bar3 {
          0%, 100% { height: 8px; }
          30%       { height: 16px; }
          60%       { height: 4px; }
          90%       { height: 12px; }
        }
        @keyframes bar4 {
          0%, 100% { height: 14px; }
          35%       { height: 6px; }
          65%       { height: 14px; }
          85%       { height: 9px; }
        }
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .music-bar {
          width: 3px;
          border-radius: 2px;
          transition: height 0.2s ease;
        }
        .music-bar.playing.b1 { animation: bar1 0.9s ease-in-out infinite; }
        .music-bar.playing.b2 { animation: bar2 0.7s ease-in-out infinite 0.15s; }
        .music-bar.playing.b3 { animation: bar3 0.8s ease-in-out infinite 0.05s; }
        .music-bar.playing.b4 { animation: bar4 0.75s ease-in-out infinite 0.25s; }
        .music-ripple {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          pointer-events: none;
          animation: ripple 0.5s ease-out forwards;
        }
      `}</style>

      <button
        onClick={handleToggle}
        title={isPlaying ? 'Pause music' : 'Play lo-fi music'}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 68,
          height: 30,
          borderRadius: 9999,
          border: `2px solid ${isDark
            ? isPlaying ? '#43D9AD' : '#1E2D3D'
            : isPlaying ? '#0D9488' : '#E0E0E0'
          }`,
          background: isDark
            ? isPlaying ? 'rgba(67,217,173,0.08)' : '#011221'
            : isPlaying ? 'rgba(13,148,136,0.06)' : '#FFFFFF',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.15s ease',
          transform: isAnimating ? 'scale(0.93)' : 'scale(1)',
          fontFamily: "'Fira Code', monospace",
        }}
      >
        {/* Ripple on click */}
        {isAnimating && (
          <span
            className="music-ripple"
            style={{
              background: isDark
                ? 'rgba(67,217,173,0.25)'
                : 'rgba(13,148,136,0.2)',
            }}
          />
        )}

        {isPlaying ? (
          /* Equalizer bars */
          <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 18 }}>
            {['b1', 'b2', 'b3', 'b4'].map((cls, i) => (
              <span
                key={cls}
                className={`music-bar playing ${cls}`}
                style={{
                  height: [8, 14, 6, 12][i],
                  background: isDark ? '#43D9AD' : '#0D9488',
                }}
              />
            ))}
          </span>
        ) : (
          /* Static icon — pause-like bars hinting at music */
          <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 18 }}>
            {[4, 10, 6, 13].map((h, i) => (
              <span
                key={i}
                className="music-bar"
                style={{
                  height: h,
                  background: isDark ? '#607B96' : '#94A3B8',
                }}
              />
            ))}
          </span>
        )}
      </button>
    </>
  )
}
