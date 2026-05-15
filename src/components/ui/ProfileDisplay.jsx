'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ── Floating particle data ─────────────────────────────────────────────────
const PARTICLES = [
  { x: 10, y: 15, size: 3, delay: 0,    dur: 4.2, label: 'Python'  },
  { x: 85, y: 20, size: 2, delay: 0.8,  dur: 3.8, label: 'SQL'     },
  { x: 15, y: 75, size: 2, delay: 1.5,  dur: 5.1, label: 'Pandas'  },
  { x: 80, y: 70, size: 3, delay: 0.3,  dur: 4.5, label: 'ML'      },
  { x: 50, y:  5, size: 2, delay: 2.0,  dur: 3.6, label: 'Data'    },
  { x: 92, y: 45, size: 2, delay: 1.2,  dur: 4.8, label: 'R'       },
  { x:  5, y: 45, size: 3, delay: 0.6,  dur: 4.1, label: 'Tableau' },
  { x: 45, y: 95, size: 2, delay: 1.8,  dur: 3.9, label: 'NLP'     },
]

// ── Icon images dari public/images/icon/ ──────────────────────────────────
const ORBIT_ICONS = [
  { src: '/images/icon/clown.png',      label: 'Clown',      emoji: '🤡' },
  { src: '/images/icon/eye-glasses.png',label: 'Cool',       emoji: '😎' },
  { src: '/images/icon/love.png',       label: 'Love',       emoji: '😍' },
  { src: '/images/icon/sad-face.png',   label: 'Sad',        emoji: '😢' },
]

// Posisi horizontal masing-masing icon (dalam %)
const ICON_POSITIONS = [12, 37, 63, 88]

// ── Floating reaction particle yang melayang ke atas ──────────────────────
function FloatingReaction({ emoji, x, y, id, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 1000)
    return () => clearTimeout(t)
  }, [id, onDone])

  return (
    <span
      style={{
        position: 'fixed',
        left: x,
        top: y,
        fontSize: 32,
        pointerEvents: 'none',
        zIndex: 99999,
        userSelect: 'none',
        animation: 'reactionFly 1s cubic-bezier(0.2, 0, 0.3, 1) forwards',
      }}
    >
      {emoji}
    </span>
  )
}

export default function ProfileDisplay() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [loaded, setLoaded]         = useState(false)
  const [hovered, setHovered]       = useState(false)
  const [glitching, setGlitching]   = useState(false)
  const [scanLine, setScanLine]     = useState(0)
  const [typedCode, setTypedCode]   = useState('')
  const [cursorOn, setCursorOn]     = useState(true)
  const glitchTimer                 = useRef(null)

  // ── Reaction state ────────────────────────────────────────────────────
  // counts: { 0: 3, 1: 7, ... } per icon index
  const [reactionCounts, setReactionCounts] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 })
  // which icon user clicked (index or null)
  const [userReaction, setUserReaction]     = useState(null)
  // actively "bursting" icon index
  const [burstIdx, setBurstIdx]             = useState(null)
  // floating emoji particles
  const [particles, setParticles]           = useState([])
  const particleIdRef = useRef(0)

  const CODE_SNIPPET = `def analyze(data):
  clean = data.dropna()
  return clean.describe()`

  // ── Mount animation ───────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  // ── Load saved reactions from localStorage ────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem('profile_reactions')
      if (saved) setReactionCounts(JSON.parse(saved))
      const myR = localStorage.getItem('profile_my_reaction')
      if (myR !== null) setUserReaction(parseInt(myR, 10))
    } catch {}
  }, [])

  // ── Cursor blink ──────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // ── Typewriter for code snippet ───────────────────────────────────────
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i <= CODE_SNIPPET.length) {
        setTypedCode(CODE_SNIPPET.slice(0, i))
        i++
      } else {
        clearInterval(id)
      }
    }, 55)
    return () => clearInterval(id)
  }, [])

  // ── Scanline animation ────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setScanLine(v => (v + 1.5) % 100)
    }, 30)
    return () => clearInterval(id)
  }, [])

  // ── Periodic glitch ───────────────────────────────────────────────────
  useEffect(() => {
    const scheduleGlitch = () => {
      glitchTimer.current = setTimeout(() => {
        setGlitching(true)
        setTimeout(() => {
          setGlitching(false)
          scheduleGlitch()
        }, 180)
      }, 3500 + Math.random() * 2500)
    }
    scheduleGlitch()
    return () => clearTimeout(glitchTimer.current)
  }, [])

  // ── Handle icon click (reaction) ──────────────────────────────────────
  const handleIconClick = (e, idx) => {
    e.stopPropagation()

    // Determine new counts
    let newCounts = { ...reactionCounts }
    let newUserReaction = userReaction

    if (userReaction === idx) {
      // Un-react
      newCounts[idx] = Math.max(0, newCounts[idx] - 1)
      newUserReaction = null
    } else {
      // Remove old reaction
      if (userReaction !== null) {
        newCounts[userReaction] = Math.max(0, newCounts[userReaction] - 1)
      }
      // Add new reaction
      newCounts[idx] = (newCounts[idx] || 0) + 1
      newUserReaction = idx
    }

    setReactionCounts(newCounts)
    setUserReaction(newUserReaction)

    // Persist
    try {
      localStorage.setItem('profile_reactions', JSON.stringify(newCounts))
      if (newUserReaction !== null) {
        localStorage.setItem('profile_my_reaction', String(newUserReaction))
      } else {
        localStorage.removeItem('profile_my_reaction')
      }
    } catch {}

    // Burst animation
    if (newUserReaction === idx) {
      setBurstIdx(idx)
      setTimeout(() => setBurstIdx(null), 600)

      // Spawn floating particle
      const rect = e.currentTarget.getBoundingClientRect()
      const pid = ++particleIdRef.current
      setParticles(prev => [
        ...prev,
        {
          id: pid,
          emoji: ORBIT_ICONS[idx].emoji,
          x: rect.left + rect.width / 2 - 16,
          y: rect.top - 8,
        },
      ])
    }
  }

  const removeParticle = (id) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }

  const accent     = isDark ? '#43D9AD' : '#0D9488'
  const accentBlue = isDark ? '#4D5BCE' : '#3B4BCA'
  const borderClr  = isDark ? '#1E2D3D' : '#E0E0E0'
  const bgCard     = isDark ? '#011221' : '#F5F5F5'

  return (
    <>
      <style>{`
        @keyframes pb-float {
          0%,100% { transform: translateY(0px);   }
          50%      { transform: translateY(-8px);  }
        }
        @keyframes pb-particle-float {
          0%,100% { transform: translateY(0px) rotate(0deg); opacity:0.7; }
          33%     { transform: translateY(-12px) rotate(5deg); opacity:1; }
          66%     { transform: translateY(-5px) rotate(-3deg); opacity:0.8; }
        }
        @keyframes pb-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.12); opacity: 0; }
          100% { transform: scale(1.12); opacity: 0; }
        }
        @keyframes pb-glow-pulse {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 0.7; }
        }
        @keyframes pb-appear {
          from { opacity:0; transform: scale(0.9) translateY(10px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes pb-tag-in {
          from { opacity:0; transform: translateX(-8px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes pb-glitch {
          0%   { transform: translate(0);   }
          20%  { transform: translate(-3px, 1px); }
          40%  { transform: translate(2px, -2px); }
          60%  { transform: translate(-1px, 2px); }
          80%  { transform: translate(3px, -1px); }
          100% { transform: translate(0); }
        }
        @keyframes pb-data-stream {
          from { opacity:0; transform: translateY(-100%); }
          to   { opacity:0.15; transform: translateY(100%); }
        }

        /* ── Icon pop up from bottom ── */
        @keyframes pb-icon-float {
          0%,100% { transform: translateX(-50%) translateY(0px);  }
          50%      { transform: translateX(-50%) translateY(-7px); }
        }

        /* ── REACTION: burst scale + fly up ── */
        @keyframes iconBurst {
          0%   { transform: translateX(-50%) scale(1); }
          30%  { transform: translateX(-50%) scale(1.8) translateY(-6px); }
          60%  { transform: translateX(-50%) scale(1.4) translateY(-3px); }
          100% { transform: translateX(-50%) scale(1) translateY(0px); }
        }

        @keyframes reactionFly {
          0%   { transform: translateY(0)  scale(1);   opacity: 1; }
          50%  { transform: translateY(-60px) scale(1.5); opacity: 1; }
          100% { transform: translateY(-110px) scale(0.7); opacity: 0; }
        }

        @keyframes countPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.6); }
          100% { transform: scale(1); }
        }

        @keyframes rippleOut {
          0%   { transform: translateX(-50%) scale(0.8); opacity: 0.8; }
          100% { transform: translateX(-50%) scale(2.4); opacity: 0; }
        }

        .pb-photo-wrap {
          animation: pb-appear 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards,
                     pb-float 5s ease-in-out 1s infinite;
        }
        .pb-photo-wrap.glitching {
          animation: pb-appear 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards,
                     pb-glitch 0.18s steps(1) forwards;
        }
        .pb-particle {
          animation: pb-particle-float var(--dur) ease-in-out var(--delay) infinite;
        }
        .pb-pulse-ring {
          animation: pb-pulse-ring 2.5s ease-out infinite;
        }
        .pb-glow {
          animation: pb-glow-pulse 3s ease-in-out infinite;
        }
        .pb-data-col {
          animation: pb-data-stream 1.8s linear infinite;
        }

        /* Icon wrapper */
        .pb-icon-wrap {
          position: absolute;
          transform: translateX(-50%);
          transition:
            bottom   0.5s cubic-bezier(0.34,1.56,0.64,1),
            opacity  0.4s ease;
          cursor: pointer;
        }
        .pb-icon-wrap.is-visible {
          animation: pb-icon-float 2.8s ease-in-out infinite;
        }
        .pb-icon-wrap.is-bursting {
          animation: iconBurst 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards !important;
        }

        .pb-icon-img {
          display: block;
          object-fit: contain;
          border-radius: 50%;
          padding: 4px;
          box-shadow:
            0 0 10px rgba(67,217,173,0.45),
            0 4px 14px rgba(0,0,0,0.55);
          transition: box-shadow 0.3s ease, transform 0.2s ease, filter 0.2s ease;
          user-select: none;
          -webkit-user-drag: none;
        }
        .pb-icon-img:hover {
          box-shadow:
            0 0 20px rgba(67,217,173,0.8),
            0 6px 20px rgba(0,0,0,0.6);
          transform: scale(1.15);
        }
        .pb-icon-wrap.is-reacted .pb-icon-img {
          box-shadow:
            0 0 24px rgba(67,217,173,1),
            0 0 40px rgba(67,217,173,0.5),
            0 6px 20px rgba(0,0,0,0.6);
          filter: brightness(1.2) saturate(1.3);
        }

        /* Reaction count badge */
        .pb-reaction-count {
          position: absolute;
          top: -8px;
          right: -8px;
          min-width: 18px;
          height: 18px;
          background: #43D9AD;
          color: #011627;
          font-size: 10px;
          font-weight: 700;
          font-family: 'Fira Code', monospace;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          border: 2px solid #011221;
          box-shadow: 0 2px 8px rgba(67,217,173,0.5);
          pointer-events: none;
          z-index: 10;
        }
        .pb-reaction-count.popping {
          animation: countPop 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* Ripple ring on click */
        .pb-ripple {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(67,217,173,0.7);
          top: 50%;
          left: 50%;
          margin-top: -24px;
          margin-left: -24px;
          pointer-events: none;
          animation: rippleOut 0.6s ease-out forwards;
        }

        /* Tooltip on hover */
        .pb-icon-tooltip {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(1,18,39,0.9);
          color: #43D9AD;
          font-size: 10px;
          font-family: 'Fira Code', monospace;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease;
          border: 1px solid rgba(67,217,173,0.3);
          backdrop-filter: blur(4px);
          z-index: 20;
        }
        .pb-icon-wrap:hover .pb-icon-tooltip {
          opacity: 1;
        }
      `}</style>

      {/* Floating emoji particles (global fixed) */}
      {particles.map(p => (
        <FloatingReaction key={p.id} {...p} onDone={removeParticle} />
      ))}

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 420,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ── Ambient glow behind card ─────────────────────────────── */}
        <div className="pb-glow" style={{
          position: 'absolute',
          inset: -20,
          borderRadius: 32,
          background: isDark
            ? 'radial-gradient(ellipse at 50% 50%, rgba(67,217,173,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 50%, rgba(13,148,136,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* ── Floating skill particles ─────────────────────────────── */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="pb-particle"
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              zIndex: 2,
              pointerEvents: 'none',
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
            }}
          >
            <div style={{
              background: i % 2 === 0 ? `${accent}20` : `${accentBlue}20`,
              border: `1px solid ${i % 2 === 0 ? accent : accentBlue}50`,
              color: i % 2 === 0 ? accent : accentBlue,
              fontSize: 10,
              fontFamily: "'Fira Code', monospace",
              padding: '2px 6px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              backdropFilter: 'blur(4px)',
            }}>
              {p.label}
            </div>
          </div>
        ))}

        {/* ── Main card ────────────────────────────────────────────── */}
        <div
          className={`pb-photo-wrap ${glitching ? 'glitching' : ''}`}
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: 20,
            padding: 3,
            background: isDark
              ? `linear-gradient(135deg, ${accent}60, ${accentBlue}60, ${accent}20, ${accentBlue}40)`
              : `linear-gradient(135deg, ${accent}80, ${accentBlue}60)`,
            boxShadow: hovered
              ? `0 0 40px ${accent}30, 0 20px 60px rgba(0,0,0,0.3)`
              : `0 0 20px ${accent}15, 0 8px 30px rgba(0,0,0,0.2)`,
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* ── Inner content ────────────────────────────────────────── */}
          <div style={{
            borderRadius: 18,
            overflow: 'hidden',
            background: bgCard,
            position: 'relative',
          }}>

            {/* Scanline effect */}
            <div style={{
              position: 'absolute',
              left: 0, right: 0,
              top: `${scanLine}%`,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${accent}20, transparent)`,
              zIndex: 5,
              pointerEvents: 'none',
            }} />

            {/* Data stream columns background */}
            {[10, 25, 40, 55, 70, 85].map((x, i) => (
              <div key={i} className="pb-data-col" style={{
                position: 'absolute',
                left: `${x}%`,
                top: 0, bottom: 0,
                width: 1,
                background: `linear-gradient(to bottom, transparent, ${accent}30, transparent)`,
                animationDelay: `${i * 0.3}s`,
                pointerEvents: 'none',
                zIndex: 1,
              }} />
            ))}

            {/* ── Header bar ───────────────────────────────────────── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 14px',
              background: isDark ? '#0C1F35' : '#E8F4F1',
              borderBottom: `1px solid ${borderClr}`,
              position: 'relative',
              zIndex: 3,
            }}>
              {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                <span key={c} style={{
                  width: 10, height: 10,
                  borderRadius: '50%',
                  background: c,
                  display: 'inline-block',
                }} />
              ))}
              <span style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                color: isDark ? '#607B96' : '#9CA3AF',
                marginLeft: 6,
                letterSpacing: '0.04em',
              }}>
                profile.py
              </span>
              <span style={{
                marginLeft: 'auto',
                width: 6, height: 6,
                borderRadius: '50%',
                background: accent,
                boxShadow: `0 0 6px ${accent}`,
                animation: 'pb-glow-pulse 2s ease-in-out infinite',
              }} />
            </div>

            {/* ── Photo area ───────────────────────────────────────── */}
            <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>

              {/* Pulse rings behind photo */}
              {[1, 0.8, 0.6].map((scale, i) => (
                <div key={i} className="pb-pulse-ring" style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 0,
                  border: `1px solid ${accent}${Math.round((1 - i * 0.25) * 40).toString(16).padStart(2,'0')}`,
                  animationDelay: `${i * 0.8}s`,
                  pointerEvents: 'none',
                  zIndex: 2,
                }} />
              ))}

              {/* Profile image */}
              <img
                src="/images/profile.png"
                alt="Muhammad Rajif Al Farikhi"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  position: 'relative',
                  zIndex: 1,
                  filter: glitching
                    ? 'hue-rotate(30deg) saturate(1.5)'
                    : hovered
                      ? 'brightness(1.05) saturate(1.1)'
                      : 'brightness(1)',
                  transition: 'filter 0.3s ease',
                  transform: glitching ? 'scaleX(1.01)' : 'scaleX(1)',
                }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.querySelector('.pb-fallback').style.display = 'flex'
                }}
              />

              {/* Fallback avatar */}
              <div className="pb-fallback" style={{
                display: 'none',
                position: 'absolute', inset: 0,
                alignItems: 'center',
                justifyContent: 'center',
                background: isDark ? '#011221' : '#E8F4F1',
                zIndex: 1,
              }}>
                <div style={{
                  width: 100, height: 100,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${accent}30, ${accentBlue}30)`,
                  border: `2px solid ${accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 32,
                  color: accent,
                  fontWeight: 500,
                }}>MR</div>
              </div>

              {/* Glitch color shift overlay */}
              {glitching && (
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 4,
                  background: `${accent}08`,
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                }} />
              )}

              {/* Bottom gradient overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '45%',
                background: `linear-gradient(to top, ${bgCard} 0%, transparent 100%)`,
                zIndex: 3,
                pointerEvents: 'none',
              }} />

              {/* ── Clickable Reaction Icons ──────────────────────────── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 6,
              }}>
                {/* Hint text — shown when visible but not yet clicked */}
                {hovered && userReaction === null && (
                  <div style={{
                    position: 'absolute',
                    bottom: '28%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(0,0,0,0.4)',
                    padding: '3px 10px',
                    borderRadius: 20,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    animation: 'pb-appear 0.4s ease forwards',
                    zIndex: 10,
                  }}>
                    click to react
                  </div>
                )}

                {ORBIT_ICONS.map((icon, i) => {
                  const left = ICON_POSITIONS[i]
                  const delay = i * 90
                  const isReacted = userReaction === i
                  const isBursting = burstIdx === i
                  const count = reactionCounts[i] || 0

                  return (
                    <div
                      key={i}
                      className={[
                        'pb-icon-wrap',
                        hovered ? 'is-visible' : '',
                        isBursting ? 'is-bursting' : '',
                        isReacted ? 'is-reacted' : '',
                      ].join(' ')}
                      style={{
                        left: `${left}%`,
                        bottom: hovered ? '10%' : '-25%',
                        opacity: hovered ? 1 : 0,
                        transition: isBursting ? 'none' : `
                          bottom  0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms,
                          opacity 0.4s  ease                            ${delay}ms
                        `,
                        animationDelay: (hovered && !isBursting) ? `${i * 0.35}s` : '0s',
                      }}
                      onClick={(e) => handleIconClick(e, i)}
                    >
                      {/* Tooltip */}
                      <div className="pb-icon-tooltip">
                        {isReacted ? `unreact ${icon.label}` : `react: ${icon.label}`}
                      </div>

                      {/* Ripple effect when bursting */}
                      {isBursting && <div className="pb-ripple" />}

                      {/* The icon image */}
                      <img
                        src={icon.src}
                        alt={icon.label}
                        width={40}
                        height={40}
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                        className="pb-icon-img"
                        style={{
                          background: isDark
                            ? 'rgba(1,18,39,0.80)'
                            : 'rgba(245,245,245,0.90)',
                          outline: isReacted
                            ? `2px solid ${accent}`
                            : '2px solid transparent',
                          outlineOffset: 2,
                          transition: 'outline-color 0.2s ease, filter 0.2s ease, box-shadow 0.3s ease',
                        }}
                      />

                      {/* Reaction count badge */}
                      {count > 0 && (
                        <div
                          className={`pb-reaction-count ${isBursting ? 'popping' : ''}`}
                          style={{
                            background: isReacted ? accent : 'rgba(67,217,173,0.7)',
                          }}
                        >
                          {count}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

            </div>

            {/* ── Info panel ───────────────────────────────────────── */}
            <div style={{
              padding: '14px 16px',
              position: 'relative',
              zIndex: 3,
            }}>

              {/* Name + status */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 13,
                    color: accent,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}>
                    murfhi
                  </div>
                  <div style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 10,
                    color: isDark ? '#607B96' : '#9CA3AF',
                    marginTop: 1,
                  }}>
                    // Data Enthusiast
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: `${accent}15`,
                  border: `1px solid ${accent}40`,
                  padding: '3px 8px',
                  borderRadius: 20,
                }}>
                  <span style={{
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: accent,
                    boxShadow: `0 0 5px ${accent}`,
                    animation: 'pb-glow-pulse 1.5s ease-in-out infinite',
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 9,
                    color: accent,
                    letterSpacing: '0.06em',
                  }}>
                    OPEN TO WORK
                  </span>
                </div>
              </div>

              {/* Code snippet terminal */}
              <div style={{
                background: isDark ? '#010E1A' : '#1E2D3D',
                borderRadius: 8,
                padding: '10px 12px',
                border: `1px solid ${isDark ? '#1E2D3D' : '#2A3F55'}`,
                marginBottom: 10,
                minHeight: 70,
              }}>
                <div style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 10.5,
                  color: '#607B96',
                  lineHeight: 1.7,
                  whiteSpace: 'pre',
                  letterSpacing: '0.02em',
                }}>
                  {typedCode.split('\n').map((line, i) => {
                    const isKeyword = line.trim().startsWith('def ') || line.trim().startsWith('return')
                    const hasComment = line.trim().startsWith('#')
                    return (
                      <div key={i}>
                        {hasComment
                          ? <span style={{ color: '#3D5A73' }}>{line}</span>
                          : isKeyword
                            ? line.split(/\b(def|return|dropna|describe)\b/).map((seg, j) =>
                                /^(def|return|dropna|describe)$/.test(seg)
                                  ? <span key={j} style={{ color: accent }}>{seg}</span>
                                  : <span key={j} style={{ color: '#C5D3E0' }}>{seg}</span>
                              )
                            : <span style={{ color: '#C5D3E0' }}>{line}</span>
                        }
                      </div>
                    )
                  })}
                  {typedCode.length < CODE_SNIPPET.length && (
                    <span style={{
                      display: 'inline-block',
                      width: 7, height: 13,
                      background: accent,
                      opacity: cursorOn ? 1 : 0,
                      verticalAlign: 'text-bottom',
                      marginLeft: 1,
                    }} />
                  )}
                </div>
              </div>

              {/* Tech tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 5,
              }}>
                {['Python', 'SQL', 'ML', 'Pandas', 'Tableau'].map((tag, i) => (
                  <span key={tag} style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 9,
                    padding: '3px 7px',
                    borderRadius: 4,
                    border: `1px solid ${i % 2 === 0 ? accent : accentBlue}50`,
                    color: i % 2 === 0 ? accent : accentBlue,
                    background: i % 2 === 0 ? `${accent}10` : `${accentBlue}10`,
                    letterSpacing: '0.04em',
                    animation: `pb-tag-in 0.4s ease ${0.5 + i * 0.1}s both`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* ── Total reactions summary ───────────────────────────── */}
              {Object.values(reactionCounts).some(c => c > 0) && (
                <div style={{
                  marginTop: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 10px',
                  borderRadius: 20,
                  background: isDark ? 'rgba(67,217,173,0.06)' : 'rgba(13,148,136,0.06)',
                  border: `1px solid ${accent}25`,
                }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {ORBIT_ICONS.map((icon, i) =>
                      reactionCounts[i] > 0 ? (
                        <span key={i} title={`${reactionCounts[i]} ${icon.label}`} style={{ fontSize: 14 }}>
                          {icon.emoji}
                        </span>
                      ) : null
                    )}
                  </div>
                  <span style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 10,
                    color: isDark ? '#607B96' : '#9CA3AF',
                  }}>
                    {Object.values(reactionCounts).reduce((a, b) => a + b, 0)} reaction
                    {Object.values(reactionCounts).reduce((a, b) => a + b, 0) !== 1 ? 's' : ''}
                  </span>
                  {userReaction !== null && (
                    <span style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: 9,
                      color: accent,
                      marginLeft: 'auto',
                    }}>
                      ✓ you reacted
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ── Bottom bar ───────────────────────────────────────── */}
            <div style={{
              borderTop: `1px solid ${borderClr}`,
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: isDark ? '#0C1F35' : '#E8F4F1',
              position: 'relative',
              zIndex: 3,
            }}>
              <span style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 9,
                color: isDark ? '#607B96' : '#9CA3AF',
                letterSpacing: '0.06em',
              }}>
                Surabaya | Jepara, ID
              </span>
              <span style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 9,
                color: isDark ? '#607B96' : '#9CA3AF',
                letterSpacing: '0.06em',
              }}>
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
