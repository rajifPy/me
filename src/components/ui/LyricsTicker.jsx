'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── Sparks by Coldplay lyrics ───────────────────────────────────────────────
const LYRICS = [
  { text: 'Did I drive you away?',              time: 32.43  },
  { text: "I know what you'll say",             time: 38.17  },
  { text: 'You say, "Oh, sing one you know"',   time: 41.32  },
  { text: 'But I promise you this',             time: 53.80  },
  { text: "I'll always look out for you",       time: 59.10  },
  { text: "Yeah, that's what I'll do",          time: 66.95  },
  { text: 'I say, oh',                          time: 72.91  },
  { text: 'I say, oh',                          time: 83.19  },
  { text: 'My heart is yours',                  time: 116.61 },
  { text: "It's you that I hold on to",         time: 121.73 },
  { text: "Yeah, that's what I do",             time: 129.57 },
  { text: 'And I know I was wrong',             time: 137.24 },
  { text: "But I won't let you down",           time: 142.56 },
  { text: 'Oh yeah, I will, yeah',              time: 146.52 },
  { text: 'I will, yes, I will, yeah',          time: 149.18 },
  { text: 'I said, oh',                         time: 156.27 },
  { text: 'I cry, oh',                          time: 166.71 },
  { text: 'Yeah, I saw sparks',                 time: 176.36 },
  { text: 'Yeah, I saw sparks',                 time: 181.66 },
  { text: 'And I saw sparks',                   time: 186.96 },
  { text: 'Yeah, I saw sparks',                 time: 192.21 },
  { text: 'Sing it out',                        time: 197.88 },
  { text: 'La, la, la, la, oh',                 time: 200.17 },
  { text: 'La, la, la, la, oh',                 time: 205.39 },
  { text: 'La, la, la, la, oh',                 time: 210.58 },
  { text: 'La, la, la, la, oh',                 time: 215.85 },
  { text: '♪  Sparks — Coldplay  ♪',            time: 221.50 },
]

// Flat lyrics array for the ticker — all joined for seamless loop
const TICKER_CONTENT = LYRICS.map(l => l.text).join('   ·   ')

export default function LyricsTicker({ isPlaying }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [visible, setVisible] = useState(false)
  const [activeLine, setActiveLine] = useState(0)
  const [mounted, setMounted] = useState(false)

  const tickerRef = useRef(null)
  const innerRef  = useRef(null)
  const posRef    = useRef(0)
  const rafRef    = useRef(null)
  const timeRef   = useRef(0)
  const lyricTimerRef = useRef(null)

  // ── Fade in/out with isPlaying ───────────────────────────────────────────
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isPlaying) {
      setVisible(true)
    } else {
      // Fade out with delay
      const t = setTimeout(() => setVisible(false), 600)
      return () => clearTimeout(t)
    }
  }, [isPlaying, mounted])

  // ── Scrolling ticker animation ────────────────────────────────────────────
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

  // ── Cycle through lyric lines when playing ────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(lyricTimerRef.current)
      return
    }

    lyricTimerRef.current = setInterval(() => {
      setActiveLine(prev => (prev + 1) % LYRICS.length)
    }, 3500)

    return () => clearInterval(lyricTimerRef.current)
  }, [isPlaying])

  if (!mounted) return null

  const accent     = isDark ? '#43D9AD' : '#0D9488'
  const accentBlue = isDark ? '#4D5BCE' : '#3B4BCA'
  const bg         = isDark ? 'rgba(1, 18, 39, 0.75)' : 'rgba(255,255,255,0.75)'
  const borderClr  = isDark ? 'rgba(67,217,173,0.2)'  : 'rgba(13,148,136,0.25)'
  const activeLine_ = LYRICS[activeLine]?.text || ''

  return (
    <>
      <style>{`
        @keyframes lt-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lt-fade-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(8px); }
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
          animation: lt-active-glow 2s ease-in-out infinite;
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
        {/* ── Active lyric line ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
            minHeight: 28,
          }}
        >
          {/* Live dot */}
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

          {/* The active lyric */}
          <span
            key={activeLine}
            className="lt-active-lyric"
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.04em',
              animation: `lt-fade-in 0.4s ease both, lt-shimmer 3s linear infinite`,
            }}
          >
            {activeLine_}
          </span>
        </div>

        {/* ── Scrolling ticker ── */}
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
              {/* Duplicate for seamless loop */}
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

          {/* Song credit */}
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
              ♪ Sparks — Coldplay
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
