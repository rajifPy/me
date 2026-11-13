'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── TIMESTAMP LIRIK (dalam detik) ───────────────────────────────────────────
const RAW_LYRICS = [
  { startTime: 9.89,   text: "All I knew this morning when I woke" },
  { startTime: 15.68,  text: "Is I know something now, know something now" },
  { startTime: 19.23,  text: "I didn't before" },
  { startTime: 21.61,  text: "And all I've seen since eighteen hours ago" },
  { startTime: 26.63,  text: "Is green eyes and freckles and your smile" },
  { startTime: 29.03,  text: "In the back of my mind making me feel like" },
  { startTime: 33.01,  text: "I just want to know you better, know you better, know you better now" },
  { startTime: 39.12,  text: "I just want to know you better, know you better, know you better now" },
  { startTime: 45.14,  text: "I just want to know you better, know you better, know you better now" },
  { startTime: 51.14,  text: "I just want to know you, know you, know you" },
  { startTime: 56.12,  text: "'Cause all I know is we said hello" },
  { startTime: 59.16,  text: "And your eyes look like coming home" },
  { startTime: 62.02,  text: "All I know is a simple name" },
  { startTime: 66.05,  text: "Everything has changed" },
  { startTime: 68.40,  text: "All I know is you held the door" },
  { startTime: 71.32,  text: "You'll be mine and I'll be yours" },
  { startTime: 74.07,  text: "All I know since yesterday" },
  { startTime: 77.83,  text: "Is everything has changed" },
  { startTime: 87.62,  text: "And all my walls stood tall, painted blue" },
  { startTime: 94.03,  text: "But I'll take 'em down, take 'em down" },
  { startTime: 96.70,  text: "And open up the door for you" },
  { startTime: 99.66,  text: "And all I feel in my stomach is butterflies" },
  { startTime: 104.53, text: "The beautiful kind, makin' up for lost time" },
  { startTime: 107.31, text: "Taking flight, making me feel like" },
  { startTime: 111.04, text: "I just want to know you better, know you better, know you better now" },
  { startTime: 117.10, text: "I just want to know you better, know you better, know you better now" },
  { startTime: 123.09, text: "I just want to know you better, know you better, know you better now" },
  { startTime: 129.05, text: "I just want to know you, know you, know you" },
  { startTime: 134.12, text: "'Cause all I know is we said hello" },
  { startTime: 137.04, text: "And your eyes look like coming home" },
  { startTime: 139.96, text: "All I know is a simple name" },
  { startTime: 144.12, text: "Everything has changed" },
  { startTime: 146.45, text: "All I know is you held the door" },
  { startTime: 149.33, text: "You'll be mine and I'll be yours" },
  { startTime: 152.03, text: "All I know since yesterday" },
  { startTime: 155.82, text: "Is everything has changed" },
  { startTime: 159.41, text: "Come back and tell me why" },
  { startTime: 162.52, text: "I'm feeling like I've missed you all this time" },
  { startTime: 171.54, text: "And meet me there tonight" },
  { startTime: 174.66, text: "And let me know that it's not all in my mind" },
  { startTime: 180.59, text: "I, I, I just want to know you better, know you better, know you better now" },
  { startTime: 189.12, text: "I just want to know you, know you, know you" },
  { startTime: 194.34, text: "All I know is we said hello" },
  { startTime: 197.14, text: "And your eyes look like coming home" },
  { startTime: 200.02, text: "All I know is a simple name" },
  { startTime: 204.12, text: "Everything has changed" },
  { startTime: 206.42, text: "All I know is you held the door" },
  { startTime: 209.32, text: "You'll be mine and I'll be yours" },
  { startTime: 211.95, text: "All I know since yesterday" },
  { startTime: 215.88, text: "Is everything has changed" },
  { startTime: 218.40, text: "All I know is we said hello" },
  { startTime: 221.80, text: "Dust off your highest hopes" },
  { startTime: 224.36, text: "All I know is pouring rain" },
  { startTime: 227.84, text: "And everything has changed" },
  { startTime: 230.32, text: "All I know is a newfound grace" },
  { startTime: 233.38, text: "All my days I'll know your face" },
  { startTime: 236.33, text: "All I know since yesterday" },
  { startTime: 239.91, text: "Is everything has changed" },
]

// ─── endTime persis di startTime lirik berikutnya ─────────────────────────────
const LYRICS = RAW_LYRICS.map((lyric, idx) => {
  const next = RAW_LYRICS[idx + 1]
  const endTime = next ? next.startTime : lyric.startTime + 3.5
  return { ...lyric, endTime }
})

function getSectionColor(text) {
  if (!text) return { from: '#43D9AD', to: '#4D5BCE', glow: '#43D9AD' }

  const t = text.toLowerCase()

  // Hook utama / perubahan besar
  if (t.includes('everything has changed')) {
    return { from: '#FEA55F', to: '#E99287', glow: '#FEA55F' }
  }

  // "I just want to know you..."
  if (t.includes('know you better') || t.includes('just want to know you')) {
    return { from: '#43D9AD', to: '#4D5BCE', glow: '#43D9AD' }
  }

  // Bridge / renungan
  if (
    t.includes('come back') ||
    t.includes('meet me') ||
    t.includes('missed you') ||
    t.includes('in my mind')
  ) {
    return { from: '#C5D3E0', to: '#43D9AD', glow: '#4D5BCE' }
  }

  // Bagian "All I know..." / chorus
  if (
    t.includes('all i know') ||
    t.includes('eyes look like') ||
    t.includes('held the door') ||
    t.includes("mine and i'll be yours") ||
    t.includes('since yesterday')
  ) {
    return { from: '#FEA55F', to: '#E99287', glow: '#FEA55F' }
  }

  // Verse / default
  return { from: '#C5D3E0', to: '#43D9AD', glow: '#4D5BCE' }
}

function Equalizer({ color, reverse }) {
  const heights = [8, 13, 6, 11, 5]
  const delays  = [0, 0.1, 0.2, 0.05, 0.15]
  const bars    = reverse ? [...heights].reverse() : heights

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2.5,
        height: 14,
        transform: reverse ? 'scaleX(-1)' : 'none',
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2.5,
            height: h,
            borderRadius: 2,
            background: color,
            transformOrigin: 'bottom',
            animation: `ltEqBar 0.55s ease-in-out ${delays[i]}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function LyricsTicker({ isPlaying }) {
  const { theme } = useTheme()
  void theme // tetap dipertahankan sesuai permintaan, tanpa mengubah UI

  const [currentText, setCurrentText] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  const [mounted, setMounted] = useState(false)

  const rafRef = useRef(null)
  const prevTextRef = useRef(null)
  const playStartRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      setCurrentText(null)
      prevTextRef.current = null
    } else {
      playStartRef.current = Date.now()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying || !mounted) return

    const tick = () => {
      let ct = null

      if (typeof window !== 'undefined' && window.__portfolioAudio) {
        ct = window.__portfolioAudio.currentTime
      }

      if (ct === null && typeof document !== 'undefined') {
        const els = document.querySelectorAll('audio')
        for (const el of els) {
          if (el.currentTime > 0) {
            ct = el.currentTime
            break
          }
        }
      }

      if (ct === null && playStartRef.current) {
        ct = (Date.now() - playStartRef.current) / 1000
      }

      if (ct !== null) {
        let found = null

        for (const lyric of LYRICS) {
          if (ct >= lyric.startTime && ct < lyric.endTime) {
            found = lyric.text
            break
          }
        }

        if (found !== prevTextRef.current) {
          prevTextRef.current = found
          setCurrentText(found)
          setAnimKey(k => k + 1)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying, mounted])

  if (!mounted) return null
  if (!isPlaying && !currentText) return null

  const colors = getSectionColor(currentText)

  return (
    <>
      <style>{`
        @keyframes ltIn {
          0%   { opacity: 0; transform: translateY(16px) scale(0.96); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   }
        }
        @keyframes ltShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes ltGlow {
          0%, 100% { opacity: 0.2; transform: scaleX(0.6); }
          50%       { opacity: 0.6; transform: scaleX(1.1); }
        }
        @keyframes ltEqBar {
          0%, 100% { transform: scaleY(0.2); }
          50%       { transform: scaleY(1);   }
        }
        @keyframes ltMetaIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        .lt-lyric-text {
          font-family: 'Fira Code', monospace;
          font-weight: 700;
          font-size: clamp(1rem, 4.5vw, 1.65rem);
          letter-spacing: 0.015em;
          line-height: 1.35;
          text-align: center;
          white-space: pre-wrap;
          word-break: break-word;
          padding: 0 16px;
          margin: 0;
          background: linear-gradient(
            120deg,
            var(--lt-from) 0%,
            var(--lt-to)   35%,
            var(--lt-from) 55%,
            var(--lt-to)   100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: ltIn 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1), ltShimmer 4s linear infinite;
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          maxWidth: 560,
          marginTop: 20,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            opacity: isPlaying ? 1 : 0,
            transition: 'opacity 0.5s ease',
            animation: isPlaying ? 'ltMetaIn 0.5s ease forwards' : 'none',
          }}
        >
          <Equalizer color={colors.from} />
          <span
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
              padding: '2px 12px',
              borderRadius: 99,
              whiteSpace: 'nowrap',
              color: colors.glow,
              border: `1px solid ${colors.glow}35`,
              background: `${colors.glow}10`,
            }}
          >
            ♪ Everything Has Changed — Taylor Swift ft. Ed Sheeran
          </span>
          <Equalizer color={colors.to} reverse />
        </div>

        <div
          style={{
            position: 'relative',
            minHeight: '2.4em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {currentText && (
            <p
              key={animKey}
              className="lt-lyric-text"
              style={{
                '--lt-from': colors.from,
                '--lt-to':   colors.to,
              }}
            >
              {currentText}
            </p>
          )}
        </div>

        <div
          style={{
            height: 2,
            borderRadius: 99,
            background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
            boxShadow: `0 0 12px ${colors.glow}80`,
            animation: currentText ? 'ltGlow 2s ease-in-out infinite' : 'none',
            opacity: currentText ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>
    </>
  )
}
