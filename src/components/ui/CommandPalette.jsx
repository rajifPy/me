'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'

// ─── Keyboard shortcut display helper ─────────────────────────────────────────
function KbdBadge({ keys, isDark }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
      {keys.map((k, i) => (
        <kbd
          key={i}
          style={{
            fontSize: 10,
            padding: '1px 5px',
            background: isDark ? '#0C1F35' : '#F0F0F0',
            border: `1px solid ${isDark ? '#2A3F55' : '#D0D0D0'}`,
            borderBottomWidth: 2,
            borderRadius: 4,
            color: isDark ? '#8BA3BC' : '#666',
            fontFamily: "'Fira Code', monospace",
            lineHeight: '18px',
            userSelect: 'none',
          }}
        >
          {k}
        </kbd>
      ))}
    </span>
  )
}

// ─── Command definitions ────────────────────────────────────────────────────────
const buildCommands = (setActiveSection, setActiveTab) => [
  // ── Navigate ──────────────────────────────────────────────────────────────
  {
    group: 'Navigate',
    groupIcon: '🧭',
    icon: '🏠',
    name: '_hello',
    desc: 'Go to Hello / Home page',
    shortcut: ['G', 'H'],
    chord: 'GH',
    action: () => setActiveSection('hello'),
  },
  {
    group: 'Navigate',
    groupIcon: '🧭',
    icon: '👤',
    name: '_about-me',
    desc: 'Go to About Me section',
    shortcut: ['G', 'A'],
    chord: 'GA',
    action: () => setActiveSection('about-me'),
  },
  {
    group: 'Navigate',
    groupIcon: '🧭',
    icon: '🚀',
    name: '_projects',
    desc: 'Go to Projects section',
    shortcut: ['G', 'P'],
    chord: 'GP',
    action: () => setActiveSection('projects'),
  },
  {
    group: 'Navigate',
    groupIcon: '🧭',
    icon: '📄',
    name: '_research',
    desc: 'Go to Research section',
    shortcut: ['G', 'R'],
    chord: 'GR',
    action: () => setActiveSection('research'),
  },
  {
    group: 'Navigate',
    groupIcon: '🧭',
    icon: '📬',
    name: '_contact-me',
    desc: 'Go to Contact section',
    shortcut: ['G', 'C'],
    chord: 'GC',
    action: () => setActiveSection('contact-me'),
  },

  // ── Actions ───────────────────────────────────────────────────────────────
  {
    group: 'Actions',
    groupIcon: '⚡',
    icon: '📥',
    name: 'Download CV',
    desc: 'Muhammad_Rajif_Al_Farikhi_CV.pdf',
    shortcut: ['Ctrl', 'D'],
    chord: null,
    action: () => {
      const a = document.createElement('a')
      a.href = '/cv/rajif-cv.pdf'
      a.download = 'Muhammad_Rajif_Al_Farikhi_CV.pdf'
      a.click()
    },
  },
  {
    group: 'Actions',
    groupIcon: '⚡',
    icon: '📋',
    name: 'Copy email',
    desc: 'mrajifalfarikhi@gmail.com',
    shortcut: ['Ctrl', 'E'],
    chord: null,
    action: () => navigator.clipboard.writeText('mrajifalfarikhi@gmail.com'),
  },
  {
    group: 'Actions',
    groupIcon: '⚡',
    icon: '💻',
    name: 'Open GitHub',
    desc: 'github.com/rajfiPy',
    shortcut: null,
    chord: null,
    action: () => window.open('https://github.com/rajfiPy', '_blank'),
  },
  {
    group: 'Actions',
    groupIcon: '⚡',
    icon: '💼',
    name: 'Open LinkedIn',
    desc: 'linkedin.com/in/muhammadrajifalfarikhi',
    shortcut: null,
    chord: null,
    action: () =>
      window.open('https://linkedin.com/in/muhammadrajifalfarikhi', '_blank'),
  },

  // ── About Tabs ────────────────────────────────────────────────────────────
  {
    group: 'About',
    groupIcon: '👤',
    icon: '📝',
    name: 'View bio',
    desc: 'Open bio tab in About',
    shortcut: null,
    chord: null,
    action: () => {
      setActiveSection('about-me')
      setActiveTab('bio')
    },
  },
  {
    group: 'About',
    groupIcon: '👤',
    icon: '⚡',
    name: 'View skills',
    desc: 'Open skills tab in About',
    shortcut: null,
    chord: null,
    action: () => {
      setActiveSection('about-me')
      setActiveTab('skills')
    },
  },
  {
    group: 'About',
    groupIcon: '👤',
    icon: '🏆',
    name: 'View certifications',
    desc: 'Open certifications tab in About',
    shortcut: null,
    chord: null,
    action: () => {
      setActiveSection('about-me')
      setActiveTab('certifications')
    },
  },
  {
    group: 'About',
    groupIcon: '👤',
    icon: '💾',
    name: 'View code samples',
    desc: 'Open code samples tab in About',
    shortcut: null,
    chord: null,
    action: () => {
      setActiveSection('about-me')
      setActiveTab('code-samples')
    },
  },
  {
    group: 'About',
    groupIcon: '👤',
    icon: '✍️',
    name: 'Read blog',
    desc: 'Open blog tab in About',
    shortcut: null,
    chord: null,
    action: () => {
      setActiveSection('about-me')
      setActiveTab('blog')
    },
  },
  {
    group: 'About',
    groupIcon: '👤',
    icon: '📸',
    name: 'View photos',
    desc: 'Open photo album in About',
    shortcut: null,
    chord: null,
    action: () => {
      setActiveSection('about-me')
      setActiveTab('photos')
    },
  },
  {
    group: 'About',
    groupIcon: '👤',
    icon: '🎮',
    name: 'Play data games',
    desc: 'Open data games in About',
    shortcut: null,
    chord: null,
    action: () => {
      setActiveSection('about-me')
      setActiveTab('data-games')
    },
  },
]

// ─── Highlight matching text ───────────────────────────────────────────────────
function Highlight({ text, query }) {
  if (!query) return <span>{text}</span>
  const lower = text.toLowerCase()
  const lowerQ = query.toLowerCase()
  const idx = lower.indexOf(lowerQ)
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <mark
        style={{
          background: 'rgba(67,217,173,0.25)',
          color: '#43D9AD',
          borderRadius: 2,
          padding: '0 1px',
        }}
      >
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  )
}

// ─── Toast notification ────────────────────────────────────────────────────────
function Toast({ message, visible, isDark }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? 0 : 12}px)`,
        opacity: visible ? 1 : 0,
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 99999,
        pointerEvents: 'none',
        background: isDark ? '#011221' : '#1A202C',
        color: isDark ? '#43D9AD' : '#43D9AD',
        border: '1px solid rgba(67,217,173,0.3)',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: 13,
        fontFamily: "'Fira Code', monospace",
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {message}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function CommandPalette({ setActiveSection, setActiveTab }) {
  const { theme } = useTheme()
  const { language } = useLanguage()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const [chordPending, setChordPending] = useState('') // e.g. 'G' waiting for second key
  const [chordHint, setChordHint] = useState('')       // display hint like "G pressed…"
  const [toast, setToast] = useState({ visible: false, message: '' })

  const inputRef  = useRef(null)
  const listRef   = useRef(null)
  const chordTimer = useRef(null)
  const isDark    = theme === 'dark'

  const commands = buildCommands(setActiveSection, setActiveTab)

  // ── Filter commands by query ─────────────────────────────────────────────
  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.desc.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  // ── Show toast helper ────────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToast({ visible: true, message: msg })
    setTimeout(() => setToast({ visible: false, message: '' }), 1800)
  }, [])

  // ── Close palette ────────────────────────────────────────────────────────
  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIdx(0)
  }, [])

  // ── Run a command ────────────────────────────────────────────────────────
  const run = useCallback(
    (cmd) => {
      close()
      cmd.action()
      showToast(`✓ ${cmd.name}`)
    },
    [close, showToast]
  )

  // ── Chord system (G+H, G+A, …) ──────────────────────────────────────────
  const triggerChord = useCallback(
    (chord) => {
      const cmd = commands.find((c) => c.chord === chord)
      if (cmd) {
        cmd.action()
        showToast(`✓ ${cmd.name}`)
      }
      setChordPending('')
      setChordHint('')
      clearTimeout(chordTimer.current)
    },
    [commands, showToast]
  )

  // ── Global keydown handler ───────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName
      const isEditable =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        document.activeElement?.isContentEditable

      // ── ⌘K / Ctrl+K → toggle palette ──────────────────────────────────
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }

      // ── Ctrl+D → download CV (global, palette closed) ─────────────────
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && !open) {
        e.preventDefault()
        const cmd = commands.find((c) => c.name === 'Download CV')
        if (cmd) { cmd.action(); showToast('✓ Download CV') }
        return
      }

      // ── Ctrl+E → copy email (global) ───────────────────────────────────
      if ((e.metaKey || e.ctrlKey) && e.key === 'e' && !open) {
        e.preventDefault()
        const cmd = commands.find((c) => c.name === 'Copy email')
        if (cmd) { cmd.action(); showToast('✓ Email copied!') }
        return
      }

      // ── Palette-open navigation ────────────────────────────────────────
      if (open) {
        if (e.key === 'Escape') { close(); return }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
          return
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setActiveIdx((i) => Math.max(i - 1, 0))
          return
        }
        if (e.key === 'Enter' && filtered[activeIdx]) {
          e.preventDefault()
          run(filtered[activeIdx])
          return
        }
        // Tab cycles through results
        if (e.key === 'Tab') {
          e.preventDefault()
          if (e.shiftKey) {
            setActiveIdx((i) => Math.max(i - 1, 0))
          } else {
            setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
          }
          return
        }
        return
      }

      // ── Chord shortcuts (only when palette closed, not in editable) ────
      if (isEditable) return

      const upper = e.key.toUpperCase()

      if (chordPending === 'G') {
        // Second key of a G-chord
        clearTimeout(chordTimer.current)
        const chord = 'G' + upper
        triggerChord(chord)
        return
      }

      // First key 'G' starts a chord
      if (upper === 'G' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setChordPending('G')
        setChordHint('G pressed — H/A/P/R/C')
        clearTimeout(chordTimer.current)
        chordTimer.current = setTimeout(() => {
          setChordPending('')
          setChordHint('')
        }, 1500)
        return
      }

      // '?' → open palette as shortcut hint
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setOpen(true)
        return
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      clearTimeout(chordTimer.current)
    }
  }, [open, filtered, activeIdx, close, run, chordPending, triggerChord, commands, showToast])

  // ── Focus input when opened ──────────────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  // ── Reset active index when query changes ────────────────────────────────
  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  // ── Scroll active item into view ─────────────────────────────────────────
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-active="true"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  // ─── Group results ────────────────────────────────────────────────────────
  const groups = {}
  filtered.forEach((cmd) => {
    if (!groups[cmd.group]) groups[cmd.group] = []
    groups[cmd.group].push(cmd)
  })

  // ─── Theme tokens ─────────────────────────────────────────────────────────
  const border = isDark ? '#1E2D3D' : '#E0E0E0'
  const bg     = isDark ? '#011627' : '#FFFFFF'
  const bgSub  = isDark ? '#011221' : '#F8F8F8'
  const bgHov  = isDark ? '#0C1F35' : '#F0F7FF'
  const text   = isDark ? '#E5E9F0' : '#1A202C'
  const muted  = isDark ? '#607B96' : '#6B7280'
  const accent = '#43D9AD'

  return (
    <>
      {/* ── Chord hint overlay ─────────────────────────────────────────── */}
      {chordHint && (
        <div
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 99998,
            background: isDark ? '#011221' : '#1A202C',
            color: accent,
            border: `1px solid ${accent}40`,
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: 13,
            fontFamily: "'Fira Code', monospace",
            pointerEvents: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            animation: 'cp-fade-in 0.15s ease',
          }}
        >
          <span style={{ opacity: 0.6 }}>chord → </span>
          <span>{chordHint}</span>
        </div>
      )}

      {/* ── Toast ─────────────────────────────────────────────────────── */}
      <Toast message={toast.message} visible={toast.visible} isDark={isDark} />

      {/* ── Trigger button (shown in Header) ──────────────────────────── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          title="Open command palette (⌘K or Ctrl+K)"
          aria-label="Open command palette"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 10px',
            borderRadius: 8,
            border: `1px solid ${border}`,
            background: bgSub,
            color: muted,
            fontFamily: "'Fira Code', monospace",
            fontSize: 12,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent
            e.currentTarget.style.color = accent
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = border
            e.currentTarget.style.color = muted
          }}
        >
          {/* Search icon */}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M11 11l3 3" />
          </svg>
          <span>Search...</span>
          <span
            style={{
              fontSize: 10,
              padding: '1px 5px',
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 4,
              letterSpacing: '0.02em',
            }}
          >
            ⌘K
          </span>
        </button>
      )}

      {/* ── Palette overlay ───────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onClick={(e) => e.target === e.currentTarget && close()}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 80,
            zIndex: 9999,
            animation: 'cp-backdrop 0.15s ease',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 580,
              margin: '0 16px',
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: isDark
                ? '0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(67,217,173,0.08)'
                : '0 24px 64px rgba(0,0,0,0.2)',
              animation: 'cp-slide-in 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* ── Search input row ─────────────────────────────────── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderBottom: `1px solid ${border}`,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke={muted}
                strokeWidth="1.5"
                style={{ flexShrink: 0 }}
              >
                <circle cx="6.5" cy="6.5" r="4.5" />
                <path d="M11 11l3 3" />
              </svg>

              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands…"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 14,
                  color: text,
                  caretColor: accent,
                }}
              />

              {/* Result count */}
              {query && (
                <span
                  style={{
                    fontSize: 11,
                    color: muted,
                    fontFamily: "'Fira Code', monospace",
                    flexShrink: 0,
                  }}
                >
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </span>
              )}

              <button
                onClick={close}
                style={{
                  fontSize: 11,
                  padding: '2px 7px',
                  background: bgSub,
                  border: `1px solid ${border}`,
                  borderRadius: 5,
                  color: muted,
                  cursor: 'pointer',
                  fontFamily: "'Fira Code', monospace",
                  flexShrink: 0,
                  lineHeight: '18px',
                }}
              >
                ESC
              </button>
            </div>

            {/* ── Results list ─────────────────────────────────────── */}
            <div
              ref={listRef}
              style={{ overflowY: 'auto', maxHeight: 400 }}
              role="listbox"
            >
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                    color: muted,
                    fontSize: 13,
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
                  No results for{' '}
                  <span style={{ color: accent }}>"{query}"</span>
                </div>
              ) : (
                Object.entries(groups).map(([grpName, items]) => (
                  <div key={grpName}>
                    {/* Group header */}
                    <div
                      style={{
                        padding: '10px 16px 4px',
                        fontSize: 10,
                        color: muted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontFamily: "'Fira Code', monospace",
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        borderTop: `1px solid ${border}`,
                        marginTop: 4,
                      }}
                    >
                      <span>{items[0].groupIcon}</span>
                      <span>{grpName}</span>
                    </div>

                    {/* Group items */}
                    {items.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd)
                      const isActive  = globalIdx === activeIdx

                      return (
                        <div
                          key={cmd.name}
                          data-active={isActive}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => run(cmd)}
                          onMouseEnter={() => setActiveIdx(globalIdx)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '9px 16px',
                            cursor: 'pointer',
                            background: isActive
                              ? isDark
                                ? 'linear-gradient(90deg, rgba(67,217,173,0.08) 0%, rgba(67,217,173,0.02) 100%)'
                                : bgHov
                              : 'transparent',
                            borderLeft: `3px solid ${isActive ? accent : 'transparent'}`,
                            transition: 'background 0.1s ease',
                          }}
                        >
                          {/* Icon */}
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              border: `1px solid ${isActive ? accent + '40' : border}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 15,
                              background: isActive
                                ? isDark ? 'rgba(67,217,173,0.08)' : 'rgba(77,91,206,0.08)'
                                : bgSub,
                              flexShrink: 0,
                              transition: 'all 0.1s ease',
                            }}
                          >
                            {cmd.icon}
                          </div>

                          {/* Text */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 13,
                                color: isActive ? (isDark ? '#fff' : '#111') : text,
                                fontFamily: "'Fira Code', monospace",
                                fontWeight: isActive ? 500 : 400,
                              }}
                            >
                              <Highlight text={cmd.name} query={query} />
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: muted,
                                marginTop: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <Highlight text={cmd.desc} query={query} />
                            </div>
                          </div>

                          {/* Shortcut badge */}
                          {cmd.shortcut && (
                            <KbdBadge keys={cmd.shortcut} isDark={isDark} />
                          )}
                          {cmd.chord && !cmd.shortcut && (
                            <KbdBadge keys={cmd.chord.split('')} isDark={isDark} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* ── Footer ──────────────────────────────────────────── */}
            <div
              style={{
                borderTop: `1px solid ${border}`,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {/* Key hints */}
              <div style={{ display: 'flex', gap: 14 }}>
                {[
                  { keys: ['↑', '↓'], label: 'navigate' },
                  { keys: ['↵'], label: 'select' },
                  { keys: ['Tab'], label: 'cycle' },
                  { keys: ['ESC'], label: 'close' },
                ].map(({ keys, label }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      color: muted,
                    }}
                  >
                    <KbdBadge keys={keys} isDark={isDark} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Chord hint */}
              <div style={{ fontSize: 10, color: muted, fontFamily: "'Fira Code', monospace" }}>
                <span style={{ color: accent }}>G</span> + H/A/P/R/C = navigate
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CSS animations ──────────────────────────────────────────── */}
      <style>{`
        @keyframes cp-backdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cp-slide-in {
          from { opacity: 0; transform: scale(0.97) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cp-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
