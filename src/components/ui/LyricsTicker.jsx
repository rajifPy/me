'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── TIMESTAMP LIRIK (dalam detik) ───────────────────────────────────────────
const RAW_LYRICS = [
  // Verse 1
  { startTime: 11.0,  text: "Hold me close 'til I get up" },
  { startTime: 14.0,  text: "Time is barely on our side" },
  { startTime: 18.0,  text: "I don't wanna waste what's left" },
  { startTime: 22.0,  text: "The storms we chase are leadin' us" },
  { startTime: 25.0,  text: "And love is all we'll ever trust, yeah" },
  { startTime: 29.0,  text: "No, I don't wanna waste what's left" },
  // Chorus 1
  { startTime: 33.0,  text: "And on and on we'll go" },
  { startTime: 38.0,  text: "Through the wastelands, through the highways" },
  { startTime: 40.0,  text: "'Til my shadow turns to sunrays" },
  { startTime: 42.0,  text: "And on and on we'll go" },
  { startTime: 49.0,  text: "Through the wastelands, through the highways" },
  { startTime: 51.0,  text: "And on and on we'll go" },
  // Verse 2
  { startTime: 83.0,  text: "Finding life along the way" },
  { startTime: 87.0,  text: "Melodies we haven't played" },
  { startTime: 89.0,  text: "No, I don't want no rest" },
  { startTime: 94.0,  text: "Echoin' around these walls" },
  { startTime: 97.0,  text: "Fighting to create a song" },
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
  // Chorus penutup
  { startTime: 173.0, text: "And on and on we'll go" },
  { startTime: 176.0, text: "Through the wastelands, through the highways" },
  { startTime: 177.0, text: "'Til my shadow turns to sunrays" },
  { startTime: 180.0, text: "And on and on we'll go" },
  { startTime: 187.0, text: "Through the wastelands, through the highways" },
  { startTime: 188.0, text: "And on and on we'll go" },
]

// ─── PERUBAHAN UTAMA ─────────────────────────────────────────────────────────
// Setiap lirik akan tampil minimal 2 detik (selama tidak berbenturan dengan lirik berikutnya)
const LYRICS = RAW_LYRICS.map((lyric, idx) => {
  const next = RAW_LYRICS[idx + 1]
  let endTime
  if (next) {
    const desiredEnd = lyric.startTime + 2.0          // target tampil 2 detik
    // Jangan sampai overlap dengan lirik berikutnya (dikurangi 0.05 detik untuk toleransi)
    endTime = Math.min(desiredEnd, next.startTime - 0.05)
  } else {
    endTime = lyric.startTime + 3.5   // lirik terakhir tampil 3.5 detik
  }
  return { ...lyric, endTime }
})
// ─────────────────────────────────────────────────────────────────────────────

// ─── Warna per section ────────────────────────────────────────────────────────
function getSectionColor(text) {
  if (!text) return { from: '#43D9AD', to: '#4D5BCE', glow: '#43D9AD' }
  if (
    text.includes('And on and on') ||
    text.includes('Through the wastelands') ||
    text.includes("'Til my shadow")
  ) return { from: '#43D9AD', to: '#4D5BCE', glow: '#43D9AD' }
  if (
    text.includes("And we'll grow") ||
    text.includes('Fueled by thunder') ||
    text.includes('Turn us to thousands')
  ) return { from: '#FEA55F', to: '#E99287', glow: '#FEA55F' }
  return { from: '#C5D3E0', to: '#43D9AD', glow: '#4D5BCE' }
}

// ─── Equalizer visual ─────────────────────────────────────────────────────────
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

// ─── Komponen utama (tidak ada perubahan lain, hanya data LYRICS di atas) ─────
export default function LyricsTicker({ isPlaying }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [currentText, setCurrentText] = useState(null)
  const [animPhase, setAnimPhase]     = useState('idle')
  const [animKey, setAnimKey]         = useState(0)
  const [mounted, setMounted]         = useState(false)

  const rafRef      = useRef(null)
  const prevTextRef = useRef(null)
  const playStartRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null

      if (prevTextRef.current) {
        setAnimPhase('out')
        const t = setTimeout(() => {
          setCurrentText(null)
          setAnimPhase('idle')
          prevTextRef.current = null
        }, 380)
        return () => clearTimeout(t)
      }
    } else {
      playStartRef.current = Date.now()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying || !mounted) return

    const initTimer = setTimeout(() => {
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
            const prev = prevTextRef.current
            prevTextRef.current = found

            if (found) {
              if (prev) {
                setAnimPhase('out')
                setTimeout(() => {
                  setCurrentText(found)
                  setAnimKey(k => k + 1)
                  setAnimPhase('in')
                  setTimeout(() => setAnimPhase('show'), 450)
                }, 300)
              } else {
                setCurrentText(found)
                setAnimKey(k => k + 1)
                setAnimPhase('in')
                setTimeout(() => setAnimPhase('show'), 450)
              }
            } else {
              setAnimPhase('out')
              setTimeout(() => {
                setCurrentText(null)
                setAnimPhase('idle')
              }, 350)
            }
          }
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }, 200)

    return () => {
      clearTimeout(initTimer)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isPlaying, mounted])

  if (!mounted) return null
  if (!isPlaying && !currentText && animPhase === 'idle') return null

  const colors  = getSectionColor(currentText)
  const showing = animPhase === 'in' || animPhase === 'show'

  return (
    <>
      <style>{`
        @keyframes ltIn {
          0%   { opacity: 0; transform: translateY(22px) scale(0.92); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   }
        }
        @keyframes ltOut {
          0%   { opacity: 1; transform: translateY(0)     scale(1);    filter: blur(0);   }
          100% { opacity: 0; transform: translateY(-18px) scale(0.95); filter: blur(5px); }
        }
        @keyframes ltShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes ltGlow {
          0%, 100% { opacity: 0.3; transform: scaleX(0.6); }
          50%       { opacity: 0.9; transform: scaleX(1.1); }
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
        }
        .lt-lyric-text.lt-in   { animation: ltIn      0.46s cubic-bezier(0.22,1,0.36,1) forwards,
                                             ltShimmer 3.5s linear infinite; }
        .lt-lyric-text.lt-out  { animation: ltOut     0.34s cubic-bezier(0.55,0,1,0.45) forwards; }
        .lt-lyric-text.lt-show { animation: ltShimmer 3.5s linear infinite; opacity: 1; }
        .lt-lyric-text.lt-idle { opacity: 0; }
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
              transition: 'color 0.5s, border-color 0.5s, background 0.5s',
            }}
          >
            ♪ On &amp; On — Cartoon, Jéja ft. Daniel Levi
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
              className={`lt-lyric-text lt-${animPhase}`}
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
            animation: showing ? 'ltGlow 2s ease-in-out infinite' : 'none',
            opacity: showing ? 1 : 0,
            transition: 'opacity 0.4s ease, background 0.5s ease',
          }}
        />
      </div>
    </>
  )
}
