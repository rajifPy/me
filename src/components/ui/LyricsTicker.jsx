'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── TIMESTAMP LIRIK (dalam detik) ───────────────────────────────────────────
const RAW_LYRICS = [
  { startTime: 8.0,   text: "Sambutlah matahari yang terbit di ufuk" },
  { startTime: 15.0,  text: "Timur membelah gelap hangat merambat" },
  { startTime: 19.0,  text: "Membangunkan lelap" },
  { startTime: 24.0,  text: "Sampaikan salam kami kepada bulan dan bintang" },
  { startTime: 33.0,  text: "Oh tenang saja generasi baru telah tiba" },
  { startTime: 49.0,  text: "Malam yang memuatkan harus diakhiri" },
  { startTime: 56.0,  text: "Gelapnya membungkam suara" },
  { startTime: 104.0, text: "Jiwa baru yang putih serupa" },
  { startTime: 110.0, text: "Lilil bakarlah kedua sisinya" },
  { startTime: 131.0, text: "Beni-beni bertumbuh di sela puring harapan" },
  { startTime: 141.0, text: "Mencari jalannya" },
  { startTime: 145.0, text: "Orang-orang muda berkobar menjelma cahaya" },
  { startTime: 151.0, text: "Lajunya tak terbendung jadi bersiaplah" },
  { startTime: 158.0, text: "Maka rayakanlah" },
  { startTime: 201.0, text: "Tuuh genderangnya, tiup terompetnya" },
  { startTime: 209.0, text: "Nyalakan api di dadanya" },
  { startTime: 214.0, text: "Sambutlah matahari yang terbit di ufuk" },
  { startTime: 220.0, text: "Timur membelah gelap hangat merambat" },
  { startTime: 224.0, text: "Membangunkan lelap" },
  { startTime: 231.0, text: "Sampaikan salam kami kepada bulan dan bintang" },
  { startTime: 239.0, text: "Oh tenang saja generasi baru telah tiba" },
  { startTime: 323.0, text: "Mungkin kita sampai, mungkin saja tidak" },
  { startTime: 329.0, text: "Tugas kita hanyalah berjalan" },
  { startTime: 339.0, text: "Sambutlah matahari yang terbit di ufuk" },
  { startTime: 343.0, text: "Timur membelah gelap hangat merambat" },
  { startTime: 348.0, text: "Membangunkan lelap" },
  { startTime: 353.0, text: "Sampaikan salam kami kepada bulan dan bintang" },
  { startTime: 400.0, text: "Generasi baru telah tiba" },
  { startTime: 404.0, text: "Sambutlah matahari yang terbit di ufuk" },
  { startTime: 411.0, text: "Timur membelah gelap hangat merambat" },
  { startTime: 416.0, text: "Membangunkan lelap" },
  { startTime: 421.0, text: "Sampaikan salam kami kepada bulan dan bintang" },
  { startTime: 429.0, text: "Oh tenang saja generasi baru telah tiba" },
]

// Durasi maksimum satu baris tampil. Lagu ini punya banyak bagian instrumental
// (mis. 56s → 104s), jadi tanpa batas ini satu baris akan nempel puluhan detik.
const MAX_LINE_DURATION = 8

// ─── endTime = startTime lirik berikutnya, tapi dibatasi MAX_LINE_DURATION ───
const LYRICS = RAW_LYRICS.map((lyric, idx) => {
  const next = RAW_LYRICS[idx + 1]
  const naturalEnd = next ? next.startTime : lyric.startTime + 3.5
  const endTime = Math.min(naturalEnd, lyric.startTime + MAX_LINE_DURATION)
  return { ...lyric, endTime }
})

// ─── Warna per bagian lagu (tema matahari terbit) ────────────────────────────
function getSectionColor(text) {
  if (!text) return { from: '#FFB35C', to: '#FF6B6B', glow: '#FFB35C' }
  const t = text.toLowerCase()

  // Reff utama: fajar — emas ke koral
  if (
    t.includes('sambutlah') ||
    t.includes('timur membelah') ||
    t.includes('membangunkan lelap') ||
    t.includes('sampaikan salam') ||
    t.includes('generasi baru')
  ) return { from: '#FFB35C', to: '#FF6B6B', glow: '#FFB35C' }

  // Klimaks: api & genderang — merah ke oranye
  if (
    t.includes('genderang') ||
    t.includes('nyalakan api') ||
    t.includes('berkobar') ||
    t.includes('maka rayakanlah') ||
    t.includes('bakarlah')
  ) return { from: '#FF5E5B', to: '#FFD166', glow: '#FF5E5B' }

  // Bagian tenang/reflektif — teal ke ungu senja
  if (
    t.includes('mungkin kita') ||
    t.includes('tugas kita') ||
    t.includes('malam') ||
    t.includes('gelapnya')
  ) return { from: '#7FDBCA', to: '#7B6CF6', glow: '#7B6CF6' }

  return { from: '#F6E7CB', to: '#FFB35C', glow: '#FF8A5B' }
}

function Equalizer({ color, reverse }) {
  const heights = [8, 13, 6, 11, 5]
  const delays  = [0, 0.1, 0.2, 0.05, 0.15]
  const bars    = reverse ? [...heights].reverse() : heights
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 14, transform: reverse ? 'scaleX(-1)' : 'none' }}>
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
  const [currentText, setCurrentText] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef(null)
  const prevTextRef = useRef(null)
  const playStartRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

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
          setAnimKey(k => k + 1) // memicu ulang animasi
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
            ♪ Sambutlah — The Jeblogs
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
