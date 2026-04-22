'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'

// ─── Reaction config ────────────────────────────────────────────────────────
const REACTIONS = [
  { id: 'like',      emoji: '👍', label: 'Like',      labelID: 'Suka'        },
  { id: 'fire',      emoji: '🔥', label: 'Fire',      labelID: 'Keren'       },
  { id: 'celebrate', emoji: '🎉', label: 'Celebrate', labelID: 'Keren Banget'},
  { id: 'mind_blow', emoji: '🤯', label: 'Mind Blown',labelID: 'Gila'        },
  { id: 'star',      emoji: '⭐', label: 'Impressive', labelID: 'Keren'      },
]

// ─── Seed history (shown before user adds any) ─────────────────────────────
const SEED_HISTORY = [
  { emoji: '🔥', label: 'recruiter_anon', time: '2m ago' },
  { emoji: '👍', label: 'hr_talent',      time: '5m ago' },
  { emoji: '🎉', label: 'dev_visitor',    time: '8m ago' },
  { emoji: '⭐', label: 'design_scout',   time: '12m ago'},
  { emoji: '🤯', label: 'data_lead',      time: '20m ago'},
  { emoji: '🔥', label: 'ml_engineer',   time: '28m ago'},
  { emoji: '👍', label: 'cto_visit',      time: '34m ago'},
  { emoji: '🎉', label: 'pm_anon',        time: '41m ago'},
]

// ─── Floating particle on click ────────────────────────────────────────────
function Particle({ emoji, x, y, id, onDone }) {
  const ref = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 900)
    return () => clearTimeout(t)
  }, [id, onDone])
  return (
    <span
      ref={ref}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        fontSize: 28,
        pointerEvents: 'none',
        zIndex: 9999,
        userSelect: 'none',
        animation: 'particle-fly 0.9s cubic-bezier(0.2,0,0.4,1) forwards',
      }}
    >
      {emoji}
    </span>
  )
}

// ─── Scrolling ticker item ─────────────────────────────────────────────────
function TickerItem({ item, isDark }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 12px',
        marginRight: 16,
        borderRadius: 20,
        background: isDark ? 'rgba(30,45,61,0.85)' : 'rgba(0,0,0,0.06)',
        border: isDark ? '1px solid rgba(67,217,173,0.15)' : '1px solid rgba(0,0,0,0.1)',
        fontSize: 12,
        whiteSpace: 'nowrap',
        fontFamily: "'Fira Code', monospace",
        backdropFilter: 'blur(4px)',
      }}
    >
      <span style={{ fontSize: 16 }}>{item.emoji}</span>
      <span style={{ color: isDark ? '#43D9AD' : '#0D9488', fontWeight: 500 }}>
        {item.label}
      </span>
      <span style={{ color: isDark ? '#607B96' : '#9CA3AF', fontSize: 10 }}>
        {item.time}
      </span>
    </span>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function ProjectReactions({ language = 'en' }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [counts, setCounts] = useState({ like: 0, fire: 0, celebrate: 0, mind_blow: 0, star: 0 })
  const [myReaction, setMyReaction] = useState(null) // id or null
  const [hoveredBtn, setHoveredBtn] = useState(null)
  const [particles, setParticles] = useState([])
  const [history, setHistory] = useState(SEED_HISTORY)
  const [showBar, setShowBar] = useState(false)
  const particleId = useRef(0)
  const tickerRef = useRef(null)
  const innerRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)

  // ── Load persisted counts from storage ──────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem('portfolio_reactions')
      if (raw) setCounts(JSON.parse(raw))
      const myR = localStorage.getItem('portfolio_my_reaction')
      if (myR) setMyReaction(myR)
    } catch {}
    setTimeout(() => setShowBar(true), 600)
  }, [])

  // ── Persist counts ────────────────────────────────────────────────────────
  useEffect(() => {
    try { localStorage.setItem('portfolio_reactions', JSON.stringify(counts)) } catch {}
  }, [counts])

  // ── Ticker scroll animation ───────────────────────────────────────────────
  useEffect(() => {
    if (!innerRef.current) return
    const speed = 0.6 // px per frame
    let running = true

    const tick = () => {
      if (!running || !innerRef.current) return
      posRef.current -= speed
      const totalW = innerRef.current.scrollWidth / 2
      if (Math.abs(posRef.current) >= totalW) posRef.current = 0
      innerRef.current.style.transform = `translateX(${posRef.current}px)`
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => { running = false; cancelAnimationFrame(animRef.current) }
  }, [history])

  // ── Handle reaction click ─────────────────────────────────────────────────
  const handleReact = useCallback((reactionId, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    if (myReaction === reactionId) {
      // un-react
      setCounts(prev => ({ ...prev, [reactionId]: Math.max(0, prev[reactionId] - 1) }))
      setMyReaction(null)
      localStorage.removeItem('portfolio_my_reaction')
      return
    }

    // Remove old reaction
    if (myReaction) {
      setCounts(prev => ({ ...prev, [myReaction]: Math.max(0, prev[myReaction] - 1) }))
    }

    // Add new reaction
    setCounts(prev => ({ ...prev, [reactionId]: prev[reactionId] + 1 }))
    setMyReaction(reactionId)
    localStorage.setItem('portfolio_my_reaction', reactionId)

    // Spawn particle
    const reaction = REACTIONS.find(r => r.id === reactionId)
    const pid = ++particleId.current
    setParticles(prev => [...prev, { id: pid, emoji: reaction.emoji, x: cx - 14, y: cy - 32 }])

    // Add to ticker history
    const now = new Date()
    const timeLabel = language === 'id' ? 'baru saja' : 'just now'
    setHistory(prev => [
      { emoji: reaction.emoji, label: 'you', time: timeLabel },
      ...prev,
    ].slice(0, 20))
  }, [myReaction, language])

  const removeParticle = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }, [])

  const totalReactions = Object.values(counts).reduce((a, b) => a + b, 0)

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const bg         = isDark ? '#011221' : '#FFFFFF'
  const border     = isDark ? '#1E2D3D' : '#E0E0E0'
  const textMuted  = isDark ? '#607B96' : '#9CA3AF'
  const accent     = isDark ? '#43D9AD' : '#0D9488'
  const mono       = "'Fira Code', monospace"

  return (
    <>
      {/* ── Global animation styles ── */}
      <style>{`
        @keyframes particle-fly {
          0%   { transform: translateY(0) scale(1);   opacity: 1; }
          60%  { transform: translateY(-70px) scale(1.4); opacity: 1; }
          100% { transform: translateY(-100px) scale(0.8); opacity: 0; }
        }
        @keyframes bar-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes count-pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        .reaction-btn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 8px 10px;
          border-radius: 12px;
          border: 2px solid transparent;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          font-family: ${mono};
        }
        .reaction-btn:hover {
          transform: translateY(-8px) scale(1.18);
        }
        .reaction-btn.active {
          border-color: ${accent};
          background: ${isDark ? 'rgba(67,217,173,0.08)' : 'rgba(13,148,136,0.08)'};
        }
        .reaction-btn .emoji {
          font-size: 24px;
          line-height: 1;
          filter: grayscale(0);
          transition: filter 0.2s, transform 0.2s;
        }
        .reaction-btn.inactive .emoji {
          filter: grayscale(0.3);
          opacity: 0.7;
        }
        .reaction-btn:hover .emoji {
          transform: scale(1.2);
        }
        .reaction-btn .count {
          font-size: 10px;
          min-width: 14px;
          text-align: center;
          font-weight: 600;
          transition: all 0.2s;
        }
        .reaction-btn .tooltip {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: ${isDark ? '#0C1F35' : '#1A202C'};
          color: white;
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s;
          font-family: ${mono};
          letter-spacing: 0.04em;
        }
        .reaction-btn:hover .tooltip {
          opacity: 1;
        }
        .count-pop { animation: count-pop 0.3s ease; }

        /* Ticker */
        .ticker-track {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .ticker-inner {
          display: inline-flex;
          align-items: center;
          will-change: transform;
        }
      `}</style>

      {/* ── Floating particles ── */}
      {particles.map(p => (
        <Particle key={p.id} {...p} onDone={removeParticle} />
      ))}

      {/* ── Main card ── */}
      <div
        style={{
          opacity: showBar ? 1 : 0,
          animation: showBar ? 'bar-slide-in 0.5s ease forwards' : 'none',
          marginTop: 28,
          borderRadius: 16,
          border: `1px solid ${border}`,
          background: bg,
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(67,217,173,0.04)'
            : '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: '10px 16px',
            borderBottom: `1px solid ${border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDark ? 'rgba(1,18,39,0.6)' : 'rgba(248,248,248,0.8)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: accent, fontFamily: mono, fontSize: 11, letterSpacing: '.08em' }}>
              // project_reactions
            </span>
          </div>
          <span style={{ fontFamily: mono, fontSize: 11, color: textMuted }}>
            {totalReactions > 0
              ? `${totalReactions} ${language === 'id' ? 'reaksi' : 'reaction'}${totalReactions !== 1 ? 's' : ''}`
              : language === 'id' ? 'jadilah yang pertama!' : 'be the first!'}
          </span>
        </div>

        {/* ── Reaction buttons ── */}
        <div
          style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: isDark
              ? 'linear-gradient(180deg, rgba(1,22,39,0.4) 0%, rgba(1,18,39,0.2) 100%)'
              : 'transparent',
          }}
        >
          {REACTIONS.map(r => {
            const isActive = myReaction === r.id
            const isInactive = myReaction !== null && !isActive
            return (
              <button
                key={r.id}
                onClick={e => handleReact(r.id, e)}
                onMouseEnter={() => setHoveredBtn(r.id)}
                onMouseLeave={() => setHoveredBtn(null)}
                className={`reaction-btn ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                aria-label={r.label}
              >
                <div className="tooltip">
                  {language === 'id' ? r.labelID : r.label}
                  {isActive ? (language === 'id' ? ' (aktif)' : ' (active)') : ''}
                </div>
                <span className="emoji">{r.emoji}</span>
                <span
                  className={`count ${counts[r.id] > 0 ? '' : ''}`}
                  style={{
                    color: isActive ? accent : textMuted,
                    opacity: counts[r.id] === 0 ? 0.4 : 1,
                  }}
                >
                  {counts[r.id] > 0 ? counts[r.id] : '·'}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Active reaction summary ── */}
        {myReaction && (
          <div
            style={{
              padding: '6px 20px',
              borderTop: `1px solid ${border}`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: isDark ? 'rgba(67,217,173,0.04)' : 'rgba(13,148,136,0.03)',
            }}
          >
            <span style={{ fontSize: 14 }}>
              {REACTIONS.find(r => r.id === myReaction)?.emoji}
            </span>
            <span style={{ fontFamily: mono, fontSize: 11, color: accent }}>
              {language === 'id' ? 'Kamu bereaksi' : 'You reacted'} ·{' '}
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer', opacity: 0.7 }}
                onClick={() => {
                  setCounts(prev => ({ ...prev, [myReaction]: Math.max(0, prev[myReaction] - 1) }))
                  setMyReaction(null)
                  localStorage.removeItem('portfolio_my_reaction')
                }}
              >
                {language === 'id' ? 'batalkan' : 'undo'}
              </span>
            </span>
          </div>
        )}

        {/* ── Scrolling history ticker ── */}
        <div
          style={{
            borderTop: `1px solid ${border}`,
            padding: '8px 0',
            background: isDark ? 'rgba(1,12,27,0.6)' : 'rgba(248,248,248,0.6)',
          }}
        >
          {/* Label */}
          <div style={{ padding: '0 16px 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: accent,
                boxShadow: `0 0 6px ${accent}`,
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span style={{ fontFamily: mono, fontSize: 10, color: textMuted, letterSpacing: '.06em' }}>
              {language === 'id' ? 'aktivitas terbaru' : 'recent activity'}
            </span>
          </div>

          {/* Ticker */}
          <div className="ticker-track" ref={tickerRef}>
            <div className="ticker-inner" ref={innerRef}>
              {/* Duplicate for seamless loop */}
              {[...history, ...history].map((item, i) => (
                <TickerItem key={i} item={item} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </>
  )
}
