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

// ── Orbit icon rings ──────────────────────────────────────────────────────
const ORBIT_ICONS = ['🐍', '💾', '🤖', '📊', '🐼', '📈']

export default function ProfileDisplay() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [loaded, setLoaded]         = useState(false)
  const [hovered, setHovered]       = useState(false)
  const [glitching, setGlitching]   = useState(false)
  const [scanLine, setScanLine]     = useState(0)
  const [typedCode, setTypedCode]   = useState('')
  const [cursorOn, setCursorOn]     = useState(true)
  const [orbAngle, setOrbAngle]     = useState(0)
  const rafRef                      = useRef(null)
  const glitchTimer                 = useRef(null)

  const CODE_SNIPPET = `def analyze(data):
  clean = data.dropna()
  return clean.describe()`

  // ── Mount animation ───────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
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

  // ── Orbit animation ───────────────────────────────────────────────────
  useEffect(() => {
    let angle = 0
    const tick = () => {
      angle += 0.4
      setOrbAngle(angle)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const accent     = isDark ? '#43D9AD' : '#0D9488'
  const accentBlue = isDark ? '#4D5BCE' : '#3B4BCA'
  const borderClr  = isDark ? '#1E2D3D' : '#E0E0E0'
  const bgCard     = isDark ? '#011221' : '#F5F5F5'
  const bgOuter    = isDark ? 'rgba(1,22,39,0.9)' : 'rgba(245,245,245,0.9)'

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
        @keyframes pb-scanline {
          from { top: -2px; }
          to   { top: 100%; }
        }
        @keyframes pb-border-spin {
          from { background-position: 0% 50%; }
          to   { background-position: 200% 50%; }
        }
        @keyframes pb-appear {
          from { opacity:0; transform: scale(0.9) translateY(10px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes pb-tag-in {
          from { opacity:0; transform: translateX(-8px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes pb-corner-flash {
          0%,100% { opacity:1; }
          50%     { opacity:0.2; }
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
        .pb-corner {
          animation: pb-corner-flash 2s ease-in-out infinite;
        }
        .pb-data-col {
          animation: pb-data-stream 1.8s linear infinite;
        }
      `}</style>

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
          {/* ── Corner decorations ──────────────────────────────── */}
          {[
            { top: 8, left: 8, rot: 0 },
            { top: 8, right: 8, rot: 90 },
            { bottom: 8, left: 8, rot: 270 },
            { bottom: 8, right: 8, rot: 180 },
          ].map((pos, i) => (
            <div key={i} className="pb-corner" style={{
              position: 'absolute', ...pos, zIndex: 10,
              width: 12, height: 12,
              transform: `rotate(${pos.rot}deg)`,
              borderTop: `2px solid ${accent}`,
              borderLeft: `2px solid ${accent}`,
              borderRadius: '2px 0 0 0',
              pointerEvents: 'none',
            }} />
          ))}

          {/* ── Inner content ────────────────────────────────────── */}
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

            {/* ── Header bar ───────────────────────────────────── */}
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

            {/* ── Photo area ───────────────────────────────────── */}
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
                  // Fallback: show initials avatar
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

              {/* Orbit ring — visible only on hover */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 4,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }}>
                {ORBIT_ICONS.map((icon, i) => {
                  const angle = ((orbAngle + i * 60) * Math.PI) / 180
                  const rx = 46, ry = 44
                  const cx = 50, cy = 50
                  const px = cx + rx * Math.cos(angle)
                  const py = cy + ry * Math.sin(angle)
                  return (
                    <div key={i} style={{
                      position: 'absolute',
                      left: `${px}%`,
                      top: `${py}%`,
                      transform: 'translate(-50%, -50%)',
                      fontSize: 16,
                      filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.4))',
                    }}>
                      {icon}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Info panel ───────────────────────────────────── */}
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
                    Rajif
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
            </div>

            {/* ── Bottom bar ───────────────────────────────────── */}
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
                Surabaya, ID
              </span>
              <span style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 9,
                color: isDark ? '#607B96' : '#9CA3AF',
                letterSpacing: '0.06em',
              }}>
                UNAIR &nbsp;·&nbsp; Bangkit &apos;22
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
