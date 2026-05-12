'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── LIRIK DENGAN TIMESTAMP (muncul dan hilang seperti Spotify) ───
// Setiap objek: startTime (detik), text (lirik), endTime akan dihitung otomatis
const RAW_LYRICS = [
  { startTime: 11.0, text: "Hold me close 'til I get up" },
  { startTime: 14.0, text: "Time is barely on our side" },
  { startTime: 18.0, text: "I don't wanna waste what's left" },
  { startTime: 22.0, text: "The storms we chase are leadin' us" },
  { startTime: 25.0, text: "And love is all we'll ever trust, yeah" },
  { startTime: 29.0, text: "No, I don't wanna waste what's left" },
  // Chorus 1
  { startTime: 33.0, text: "And on and on we'll go" },
  { startTime: 38.0, text: "Through the wastelands, through the highways" },
  { startTime: 40.0, text: "'Til my shadow turns to sunrays" },
  { startTime: 42.0, text: "And on and on we'll go" },
  { startTime: 49.0, text: "Through the wastelands, through the highways" },
  { startTime: 51.0, text: "And on and on we'll go" },
  // Verse 2 (setelah jeda instrumental sampai 1:23)
  { startTime: 83.0, text: "Finding life along the way" },
  { startTime: 87.0, text: "Melodies we haven't played" },
  { startTime: 89.0, text: "No, I don't want no rest" },
  { startTime: 94.0, text: "Echoin' around these walls" },
  { startTime: 97.0, text: "Fighting to create a song" },
  { startTime: 100.0, text: "I don't wanna miss a beat" },
  // Chorus 2
  { startTime: 104.0, text: "And on and on we'll go" },
  { startTime: 110.0, text: "Through the wastelands, through the highways" },
  { startTime: 111.0, text: "'Til my shadow turns to sunrays" },
  { startTime: 114.0, text: "And on and on we'll go" },
  { startTime: 121.0, text: "Through the wastelands, through the highways" },
  { startTime: 122.0, text: "And on and on we'll go" },
  // Bridge
  { startTime: 148.0, text: "And we'll grow in number" },
  { startTime: 152.0, text: "Fueled by thunder, see the horizon" },
  { startTime: 156.0, text: "Turn us to thousands" },
  { startTime: 159.0, text: "And we'll grow in number" },
  { startTime: 163.0, text: "Fueled by thunder, see the horizon" },
  { startTime: 167.0, text: "Turn us to thousands" },
  // Chorus 3 (penutup)
  { startTime: 173.0, text: "And on and on we'll go" },
  { startTime: 176.0, text: "Through the wastelands, through the highways" },
  { startTime: 177.0, text: "'Til my shadow turns to sunrays" },
  { startTime: 180.0, text: "And on and on we'll go" },
  { startTime: 187.0, text: "Through the wastelands, through the highways" },
  { startTime: 188.0, text: "And on and on we'll go" },
]

// Hitung endTime untuk setiap lirik (durasi tampil sampai startTime berikutnya)
// Baris terakhir: tampil 3 detik lalu hilang
const LYRICS_WITH_END = RAW_LYRICS.map((lyric, idx) => {
  const nextStart = RAW_LYRICS[idx + 1]?.startTime
  const endTime = nextStart ? nextStart : lyric.startTime + 3.0
  return { ...lyric, endTime }
})

export default function LyricsTicker({ isPlaying }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [visible, setVisible] = useState(false)
  const [currentLyric, setCurrentLyric] = useState(null) // null = tidak ada lirik
  const [mounted, setMounted] = useState(false)

  const audioRef = useRef(null)
  const animationFrameRef = useRef(null)

  // ── Cari elemen audio dari MusicToggle ─────────────────────────────────
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

  // ── Fade in/out container berdasarkan isPlaying ────────────────────────
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isPlaying) {
      setVisible(true)
    } else {
      const t = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(t)
    }
  }, [isPlaying, mounted])

  // ── Sinkronisasi lirik berdasarkan currentTime audio ──────────────────
  useEffect(() => {
    if (!isPlaying || !audioRef.current) {
      // Jika berhenti, kosongkan lirik
      setCurrentLyric(null)
      return
    }

    const updateLyric = () => {
      const audio = audioRef.current
      if (!audio || audio.paused) {
        setCurrentLyric(null)
        animationFrameRef.current = requestAnimationFrame(updateLyric)
        return
      }

      const currentTime = audio.currentTime
      let foundLyric = null

      for (const lyric of LYRICS_WITH_END) {
        if (currentTime >= lyric.startTime && currentTime < lyric.endTime) {
          foundLyric = lyric.text
          break
        }
      }

      setCurrentLyric(foundLyric)
      animationFrameRef.current = requestAnimationFrame(updateLyric)
    }

    animationFrameRef.current = requestAnimationFrame(updateLyric)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying])

  // Reset lirik saat isPlaying berubah dari false ke true (lagu mulai ulang)
  useEffect(() => {
    if (isPlaying) {
      setCurrentLyric(null)
    }
  }, [isPlaying])

  if (!mounted) return null

  const accent = isDark ? '#43D9AD' : '#0D9488'
  const bg = isDark ? 'rgba(1, 18, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)'
  const textColor = isDark ? '#E5E9F0' : '#1E293B'

  return (
    <>
      <style>{`
        @keyframes lyricFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes lyricFadeOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
        }
        @keyframes glowPulse {
          0% {
            text-shadow: 0 0 0px ${accent}, 0 0 0px ${accent}40;
          }
          100% {
            text-shadow: 0 0 12px ${accent}, 0 0 24px ${accent}60;
          }
        }
        .lyric-text {
          animation: lyricFadeIn 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards,
                     lyricFadeOut 0.35s ease-in forwards 2.5s;
          animation-fill-mode: forwards;
        }
        .lyric-container {
          transition: opacity 0.4s ease, transform 0.4s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .lyric-container.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(8px);
        }
        .lyric-container.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .lyric-glow {
          background: linear-gradient(
            120deg,
            ${accent} 0%,
            ${isDark ? '#4D5BCE' : '#3B4BCA'} 40%,
            ${accent} 60%,
            ${isDark ? '#4D5BCE' : '#3B4BCA'} 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <div
        className={`lyric-container ${visible ? 'visible' : 'hidden'}`}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          marginTop: 20,
          marginBottom: 8,
          padding: '16px 20px',
          borderRadius: 20,
          background: bg,
          border: `1px solid ${accent}30`,
          boxShadow: `0 8px 20px rgba(0,0,0,0.2), 0 0 0 1px ${accent}10 inset`,
          textAlign: 'center',
          minHeight: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {currentLyric ? (
          <p
            key={currentLyric}
            className="lyric-text lyric-glow"
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 'clamp(1rem, 5vw, 1.6rem)',
              fontWeight: 600,
              letterSpacing: '0.02em',
              lineHeight: 1.4,
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {currentLyric}
          </p>
        ) : (
          <p
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.85rem',
              color: isDark ? 'rgba(96,123,150,0.6)' : 'rgba(74,85,104,0.6)',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            ♪ ~ ♪
          </p>
        )}
      </div>

      {/* Optional: kecil penanda lagu */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 4,
          fontSize: 10,
          fontFamily: "'Fira Code', monospace",
          color: isDark ? 'rgba(67,217,173,0.4)' : 'rgba(13,148,136,0.5)',
          letterSpacing: '0.08em',
        }}
      >
        On & On — Cartoon, Jéja ft. Daniel Levi
      </div>
    </>
  )
}
