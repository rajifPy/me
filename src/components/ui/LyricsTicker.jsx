'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { MUSIC_EVENT } from './MusicToggle'

// ─── LIRIK RESMI "On & On" - Cartoon, Jéja ft. Daniel Levi ───
const LYRICS = [
  // Verse 1
  { time: 11.0, text: "Hold me close 'til I get up" },
  { time: 14.0, text: "Time is barely on our side" },
  { time: 18.0, text: "I don't wanna waste what's left" },
  { time: 22.0, text: "The storms we chase are leadin' us" },
  { time: 25.0, text: "And love is all we'll ever trust, yeah" },
  { time: 29.0, text: "No, I don't wanna waste what's left" },

  // Chorus 1
  { time: 33.0, text: "And on and on we'll go" },
  { time: 38.0, text: "Through the wastelands, through the highways" },
  { time: 40.0, text: "'Til my shadow turns to sunrays" },
  { time: 42.0, text: "And on and on we'll go" },
  { time: 49.0, text: "Through the wastelands, through the highways" },
  { time: 51.0, text: "And on and on we'll go" },

  // Verse 2
  { time: 83.0, text: "Finding life along the way" },
  { time: 87.0, text: "Melodies we haven't played" },
  { time: 89.0, text: "No, I don't want no rest" },
  { time: 94.0, text: "Echoin' around these walls" },
  { time: 97.0, text: "Fighting to create a song" },
  { time: 100.0, text: "I don't wanna miss a beat" },

  // Chorus 2
  { time: 104.0, text: "And on and on we'll go" },
  { time: 110.0, text: "Through the wastelands, through the highways" },
  { time: 111.0, text: "'Til my shadow turns to sunrays" },
  { time: 114.0, text: "And on and on we'll go" },
  { time: 121.0, text: "Through the wastelands, through the highways" },
  { time: 122.0, text: "And on and on we'll go" },

  // Bridge
  { time: 148.0, text: "And we'll grow in number" },
  { time: 152.0, text: "Fueled by thunder, see the horizon" },
  { time: 156.0, text: "Turn us to thousands" },
  { time: 159.0, text: "And we'll grow in number" },
  { time: 163.0, text: "Fueled by thunder, see the horizon" },
  { time: 167.0, text: "Turn us to thousands" },

  // Chorus 3 (final)
  { time: 173.0, text: "And on and on we'll go" },
  { time: 176.0, text: "Through the wastelands, through the highways" },
  { time: 177.0, text: "'Til my shadow turns to sunrays" },
  { time: 180.0, text: "And on and on we'll go" },
  { time: 187.0, text: "Through the wastelands, through the highways" },
  { time: 188.0, text: "And on and on we'll go" },

  // Outro
  { time: 195.0, text: "♪ On & On — Cartoon, Jéja ft. Daniel Levi ♪" },
]

// Gabungan semua lirik untuk ticker scroll
const TICKER_CONTENT = LYRICS.map(l => l.text).join('   ·   ')

export default function LyricsTicker({ isPlaying }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [visible, setVisible] = useState(false)
  const [activeLyric, setActiveLyric] = useState('')
  const [mounted, setMounted] = useState(false)

  const tickerRef = useRef(null)
  const innerRef = useRef(null)
  const posRef = useRef(0)
  const rafRef = useRef(null)
  const audioRef = useRef(null)
  const animationFrameRef = useRef(null)

  // ── Dapatkan referensi ke elemen audio dari MusicToggle ─────────────────
  useEffect(() => {
    const findAudio = () => {
      const audioElements = document.querySelectorAll('audio')
      for (let audio of audioElements) {
        if (audio.src && audio.src.includes('/audio/on_on.mp3')) {
          audioRef.current = audio
          break
        }
      }
    }

    findAudio()
    const interval = setInterval(() => {
      if (!audioRef.current) findAudio()
      else clearInterval(interval)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // ── Fade in/out dengan isPlaying ────────────────────────────────────────
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isPlaying) {
      setVisible(true)
    } else {
      const t = setTimeout(() => setVisible(false), 600)
      return () => clearTimeout(t)
    }
  }, [isPlaying, mounted])

  // ── Scroll ticker animation ─────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || !innerRef.current) return
    const speed = 0.7

    const tick = () => {
      if (!innerRef.current) return
      posRef.current -= speed
      const totalW = innerRef.current.scrollWidth / 2
      if (Math.abs(posRef.current) >= totalW) posRef.current = 0
      innerRef.current.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPlaying])

  // ── Sinkronisasi lirik berdasarkan currentTime audio ────────────────────
  useEffect(() => {
    if (!isPlaying || !audioRef.current) return

    const updateLyricByTime = () => {
      const audio = audioRef.current
      if (!audio || audio.paused) return

      const currentTime = audio.currentTime

      // Detik 0-11 adalah intro instrumental, belum ada vokal
      if (currentTime < 11.0) {
        setActiveLyric('')
        animationFrameRef.current = requestAnimationFrame(updateLyricByTime)
        return
      }

      // Cari lirik terakhir yang waktunya <= currentTime
      let activeIndex = -1
      for (let i = LYRICS.length - 1; i >= 0; i--) {
        if (LYRICS[i].time <= currentTime) {
          activeIndex = i
          break
        }
      }

      // Jika tidak ada lirik yang cocok, kosongkan
      if (activeIndex === -1) {
        setActiveLyric('')
      } else {
        setActiveLyric(LYRICS[activeIndex].text)
      }

      animationFrameRef.current = requestAnimationFrame(updateLyricByTime)
    }

    animationFrameRef.current = requestAnimationFrame(updateLyricByTime)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying])

  // Reset lirik saat musik berhenti
  useEffect(() => {
    if (!isPlaying) {
      setActiveLyric('')
    }
  }, [isPlaying])

  if (!mounted) return null

  const accent = isDark ? '#43D9AD' : '#0D9488'
  const accentBlue = isDark ? '#4D5BCE' : '#3B4BCA'
  const bg = isDark ? 'rgba(1, 18, 39, 0.75)' : 'rgba(255,255,255,0.75)'
  const borderClr = isDark ? 'rgba(67,217,173,0.2)' : 'rgba(13,148,136,0.25)'

  return (
    <>
      <style>{`
        @keyframes lt-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lt-pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes lt-active-glow {
          0%,100% { text-shadow: 0 0 8px ${accent}40; }
          50%     { text-shadow: 0 0 20px ${accent}80, 0 0 40px ${accent}30; }
        }
        @keyframes lt-shimmer {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        .lt-active-lyric {
          background: linear-gradient(
            90deg,
            ${accent} 0%,
            ${accentBlue} 40%,
            ${accent} 60%,
            ${accentBlue} 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: lt-active-glow 2s ease-in-out infinite,
                     lt-shimmer 3s linear infinite;
        }
        .lt-ticker-track {
          overflow: hidden;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
        }
        .lt-ticker-inner {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform;
        }
        .lt-wrapper {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .lt-wrapper.hidden {
          opacity: 0 !important;
          pointer-events: none;
          transform: translateY(8px);
        }
        .lt-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div
        className={`lt-wrapper ${visible ? 'visible' : 'hidden'}`}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 580,
          marginTop: 20,
        }}
      >
        {/* Active lyric line — hanya tampil jika ada lirik */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
            minHeight: 28,
          }}
        >
          {activeLyric && (
            <>
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                  flexShrink: 0,
                  animation: 'lt-pulse-dot 1.5s ease-in-out infinite',
                }}
              />
              <span
                key={activeLyric}
                className="lt-active-lyric"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                }}
              >
                {activeLyric}
              </span>
            </>
          )}
        </div>

        {/* Scrolling ticker */}
        <div
          style={{
            background: bg,
            border: `1px solid ${borderClr}`,
            borderRadius: 8,
            padding: '6px 0',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div className="lt-ticker-track" ref={tickerRef}>
            <div className="lt-ticker-inner" ref={innerRef}>
              {[TICKER_CONTENT, TICKER_CONTENT].map((content, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 11,
                    color: isDark ? 'rgba(96,123,150,0.7)' : 'rgba(74,85,104,0.6)',
                    padding: '0 24px',
                    letterSpacing: '0.03em',
                    userSelect: 'none',
                  }}
                >
                  {content}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 10,
              marginTop: 3,
            }}
          >
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 9,
                color: isDark ? 'rgba(67,217,173,0.4)' : 'rgba(13,148,136,0.5)',
                letterSpacing: '0.08em',
              }}
            >
              ♪ On & On — Cartoon, Jéja ft. Daniel Levi
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
