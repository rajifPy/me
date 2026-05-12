'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── TIMESTAMP LIRIK (dalam detik) ───────────────────────────────────────────
// startTime = kapan lirik muncul
// endTime   = dihitung otomatis dari startTime berikutnya (atau +3s untuk terakhir)
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
  // Verse 2 — mulai 1:23 = 83s
  { startTime: 83.0,  text: "Finding life along the way" },
  { startTime: 87.0,  text: "Melodies we haven't played" },
  { startTime: 89.0,  text: "No, I don't want no rest" },
  { startTime: 94.0,  text: "Echoin' around these walls" },
  { startTime: 97.0,  text: "Fighting to create a song" },
  { startTime: 100.0, text: "I don't wanna miss a beat" },
  // Chorus 2 — 1:44 = 104s
  { startTime: 104.0, text: "And on and on we'll go" },
  { startTime: 110.0, text: "Through the wastelands, through the highways" },
  { startTime: 111.0, text: "'Til my shadow turns to sunrays" },
  { startTime: 114.0, text: "And on and on we'll go" },
  { startTime: 121.0, text: "Through the wastelands, through the highways" },
  { startTime: 122.0, text: "And on and on we'll go" },
  // Bridge — 2:28 = 148s
  { startTime: 148.0, text: "And we'll grow in number" },
  { startTime: 152.0, text: "Fueled by thunder, see the horizon" },
  { startTime: 156.0, text: "Turn us to thousands" },
  { startTime: 159.0, text: "And we'll grow in number" },
  { startTime: 163.0, text: "Fueled by thunder, see the horizon" },
  { startTime: 167.0, text: "Turn us to thousands" },
  // Chorus penutup — 2:53 = 173s
  { startTime: 173.0, text: "And on and on we'll go" },
  { startTime: 176.0, text: "Through the wastelands, through the highways" },
  { startTime: 177.0, text: "'Til my shadow turns to sunrays" },
  { startTime: 180.0, text: "And on and on we'll go" },
  { startTime: 187.0, text: "Through the wastelands, through the highways" },
  { startTime: 188.0, text: "And on and on we'll go" },
]

// Hitung endTime otomatis
const LYRICS = RAW_LYRICS.map((lyric, idx) => {
  const next = RAW_LYRICS[idx + 1]
  // Kasih sedikit overlap supaya transisi smooth (hilang 0.3s sebelum next muncul)
  const endTime = next ? next.startTime - 0.1 : lyric.startTime + 3.5
  return { ...lyric, endTime }
})

// ─── WARNA GRADIEN per section ────────────────────────────────────────────────
function getSectionColor(text) {
  const chorus = ['And on and on', "Through the wastelands", "'Til my shadow"]
  const bridge = ["And we'll grow", 'Fueled by thunder', 'Turn us to thousands']
  if (chorus.some(c => text.includes(c.replace("'", '\u2019')) || text.includes(c)))
    return { from: '#43D9AD', to: '#4D5BCE', glow: '#43D9AD' }
  if (bridge.some(b => text.includes(b)))
    return { from: '#FEA55F', to: '#E99287', glow: '#FEA55F' }
  return { from: '#E5E9F0', to: '#43D9AD', glow: '#4D5BCE' }
}

export default function LyricsTicker({ isPlaying }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [lyricState, setLyricState] = useState(null)
  // lyricState: { text, key, phase } — phase: 'in' | 'show' | 'out'

  const audioRef      = useRef(null)
  const rafRef        = useRef(null)
  const lastLyricRef  = useRef(null)
  const phaseTimerRef = useRef(null)

  // Cari elemen <audio> dari MusicToggle
  useEffect(() => {
    const find = () => {
      for (const el of document.querySelectorAll('audio')) {
        if (el.src?.includes('/audio/on_on.mp3')) {
          audioRef.current = el
          return true
        }
      }
      return false
    }
    if (!find()) {
      const id = setInterval(() => { if (find()) clearInterval(id) }, 400)
      return () => clearInterval(id)
    }
  }, [])

  // Clear lyric saat musik berhenti
  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(phaseTimerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setLyricState(prev => prev ? { ...prev, phase: 'out' } : null)
      lastLyricRef.current = null
      const t = setTimeout(() => setLyricState(null), 500)
      return () => clearTimeout(t)
    }
  }, [isPlaying])

  // Loop RAF sinkronisasi lirik
  useEffect(() => {
    if (!isPlaying) return

    const tick = () => {
      const audio = audioRef.current
      if (!audio || audio.paused) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const ct = audio.currentTime
      let found = null
      for (const lyric of LYRICS) {
        if (ct >= lyric.startTime && ct < lyric.endTime) {
          found = lyric
          break
        }
      }

      const foundText = found?.text ?? null

      if (foundText !== lastLyricRef.current) {
        lastLyricRef.current = foundText
        clearTimeout(phaseTimerRef.current)

        if (foundText) {
          // Fase: out (prev) → in (next)
          setLyricState(prev => {
            if (prev?.text) {
              // Animasikan keluar dulu lalu masuk
              return { text: prev.text, key: prev.key, phase: 'out', next: foundText }
            }
            return { text: foundText, key: foundText + ct, phase: 'in' }
          })
        } else {
          // Tidak ada lirik → animasikan keluar
          setLyricState(prev => prev ? { ...prev, phase: 'out' } : null)
          phaseTimerRef.current = setTimeout(() => setLyricState(null), 450)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying])

  // Transisi out → in (setelah animasi keluar selesai, tampilkan lirik berikutnya)
  useEffect(() => {
    if (lyricState?.phase === 'out' && lyricState?.next) {
      const t = setTimeout(() => {
        setLyricState({ text: lyricState.next, key: lyricState.next, phase: 'in' })
      }, 350)
      return () => clearTimeout(t)
    }
    // Setelah fase 'in', masuk ke fase 'show'
    if (lyricState?.phase === 'in') {
      const t = setTimeout(() => {
        setLyricState(prev => prev ? { ...prev, phase: 'show' } : null)
      }, 500)
      return () => clearTimeout(t)
    }
  }, [lyricState?.phase, lyricState?.next])

  if (!lyricState && !isPlaying) return null

  const colors = lyricState ? getSectionColor(lyricState.text) : { from: '#43D9AD', to: '#4D5BCE', glow: '#43D9AD' }
  const phase  = lyricState?.phase ?? 'out'
  const text   = lyricState?.text ?? ''

  return (
    <>
      <style>{`
        @keyframes lyricsSlideUp {
          0%   { opacity: 0; transform: translateY(22px) scale(0.92); filter: blur(8px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes lyricsSlideDown {
          0%   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          100% { opacity: 0; transform: translateY(-18px) scale(0.94); filter: blur(6px); }
        }
        @keyframes lyricsShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes lyricsGlow {
          0%, 100% { opacity: 0.4; transform: scaleX(0.7); }
          50%       { opacity: 0.9; transform: scaleX(1); }
        }
        @keyframes noteFloat {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.8); }
          30%  { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--nx), var(--ny)) scale(0.4) rotate(var(--nr)); }
        }
        @keyframes barBounce {
          0%, 100% { transform: scaleY(0.3); }
          50%       { transform: scaleY(1); }
        }

        .lyrics-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          pointer-events: none;
          user-select: none;
          width: 100%;
          max-width: 560px;
          margin-top: 16px;
        }

        .lyrics-text-el {
          font-family: 'Fira Code', monospace;
          font-weight: 700;
          font-size: clamp(1.05rem, 4.5vw, 1.7rem);
          letter-spacing: 0.01em;
          line-height: 1.3;
          text-align: center;
          white-space: pre-wrap;
          word-break: break-word;
          background: linear-gradient(
            120deg,
            var(--lyric-from) 0%,
            var(--lyric-to) 40%,
            var(--lyric-from) 60%,
            var(--lyric-to) 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: lyricsShimmer 4s linear infinite;
          padding: 0 8px;
        }

        .lyrics-in  { animation: lyricsSlideUp   0.48s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .lyrics-out { animation: lyricsSlideDown  0.38s cubic-bezier(0.55, 0, 1, 0.45) forwards; }
        .lyrics-show { opacity: 1; transform: translateY(0) scale(1); }

        .lyrics-glow-bar {
          width: 80px;
          height: 2px;
          border-radius: 99px;
          animation: lyricsGlow 2.2s ease-in-out infinite;
        }

        .lyrics-eq {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 14px;
        }
        .lyrics-eq span {
          width: 3px;
          border-radius: 2px;
          transform-origin: bottom;
        }
        .lyrics-eq span:nth-child(1) { animation: barBounce 0.6s ease-in-out 0.00s infinite; height: 10px; }
        .lyrics-eq span:nth-child(2) { animation: barBounce 0.6s ease-in-out 0.10s infinite; height: 14px; }
        .lyrics-eq span:nth-child(3) { animation: barBounce 0.6s ease-in-out 0.20s infinite; height: 8px; }
        .lyrics-eq span:nth-child(4) { animation: barBounce 0.6s ease-in-out 0.05s infinite; height: 12px; }
        .lyrics-eq span:nth-child(5) { animation: barBounce 0.6s ease-in-out 0.15s infinite; height: 6px; }

        .note-particle {
          position: absolute;
          font-size: 13px;
          animation: noteFloat 1.8s ease-out forwards;
          pointer-events: none;
        }
      `}</style>

      <div className="lyrics-wrap">
        {/* Equalizer bars kiri + kanan */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: isPlaying ? 1 : 0, transition: 'opacity 0.4s' }}>
          <div className="lyrics-eq">
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ background: colors.from, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>

          {/* Song info pill */}
          <div style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 10,
            color: isDark ? 'rgba(67,217,173,0.5)' : 'rgba(13,148,136,0.6)',
            letterSpacing: '0.1em',
            padding: '2px 10px',
            borderRadius: 99,
            border: `1px solid ${colors.glow}30`,
            background: isDark ? `${colors.glow}08` : `${colors.glow}10`,
            whiteSpace: 'nowrap',
          }}>
            ♪ On &amp; On — Cartoon
          </div>

          <div className="lyrics-eq" style={{ transform: 'scaleX(-1)' }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ background: colors.to, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
        </div>

        {/* Lyric text */}
        <div style={{ position: 'relative', minHeight: '2.4em', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {text ? (
            <p
              key={lyricState?.key}
              className={`lyrics-text-el ${phase === 'in' ? 'lyrics-in' : phase === 'out' ? 'lyrics-out' : 'lyrics-show'}`}
              style={{
                '--lyric-from': colors.from,
                '--lyric-to':   colors.to,
              }}
            >
              {text}
            </p>
          ) : null}
        </div>

        {/* Glow bar bawah lirik */}
        {(phase === 'in' || phase === 'show') && text && (
          <div
            className="lyrics-glow-bar"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
              boxShadow: `0 0 12px ${colors.glow}80`,
            }}
          />
        )}
      </div>
    </>
  )
}
