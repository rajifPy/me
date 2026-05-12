'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── On & On by Cartoon ft. Daniel Levi (NCS) lyrics ─────────────────────────
const LYRICS = [
  { text: 'I see the light fading out',           time: 0    },
  { text: 'A lonely satellite',                    time: 3.5  },
  { text: 'The war inside my head',                time: 7    },
  { text: "Won't stop, but I'll survive",          time: 10.5 },
  { text: 'I taste the rain rushing down',         time: 14   },
  { text: 'My throat is cracked and dry',          time: 17.5 },
  { text: 'So help me out',                        time: 21   },
  { text: 'I close my eyes',                       time: 24.5 },
  { text: 'And on and on the world will turn',     time: 28   },
  { text: "It doesn't care that you're hurting",   time: 31.5 },
  { text: 'And on and on the sun will rise',       time: 35   },
  { text: "It doesn't care that you're not ready", time: 38.5 },
  { text: 'The burning starts in my chest',        time: 42   },
  { text: 'A fire in the sky',                     time: 45.5 },
  { text: 'The words you said',                    time: 49   },
  { text: 'They echo through my mind',             time: 52.5 },
  { text: 'I taste the rain rushing down',         time: 56   },
  { text: 'My throat is cracked and dry',          time: 59.5 },
  { text: 'So help me out',                        time: 63   },
  { text: 'I close my eyes',                       time: 66.5 },
  { text: 'And on and on the world will turn',     time: 70   },
  { text: "It doesn't care that you're hurting",   time: 73.5 },
  { text: 'And on and on the sun will rise',       time: 77   },
  { text: "It doesn't care that you're not ready", time: 80.5 },
  { text: 'On and on',                             time: 84   },
  { text: 'And on and on',                         time: 87.5 },
  { text: 'On and on',                             time: 91   },
  { text: 'The world will turn',                   time: 94.5 },
  { text: 'And on and on the world will turn',     time: 98   },
  { text: "It doesn't care that you're hurting",   time: 101.5},
  { text: 'And on and on the sun will rise',       time: 105  },
  { text: "It doesn't care that you're not ready", time: 108.5},
  { text: 'On and on',                             time: 112  },
  { text: '♪  On & On — Cartoon ft. Daniel Levi  ♪', time: 116 },
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
              ♪ On & On — NCS
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
