'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'

const COMMANDS = (t, setActiveSection, setActiveTab) => [
  // Navigate
  { group: 'Navigate', icon: '🏠', name: '_hello',      desc: t.nav.hello,      shortcut: ['G','H'], action: () => setActiveSection('hello') },
  { group: 'Navigate', icon: '👤', name: '_about-me',   desc: t.nav.about,      shortcut: ['G','A'], action: () => setActiveSection('about-me') },
  { group: 'Navigate', icon: '🚀', name: '_projects',   desc: t.nav.projects,   shortcut: ['G','P'], action: () => setActiveSection('projects') },
  { group: 'Navigate', icon: '📄', name: '_research',   desc: t.nav.research,   shortcut: ['G','R'], action: () => setActiveSection('research') },
  { group: 'Navigate', icon: '📬', name: '_contact-me', desc: t.nav.contact,    shortcut: ['G','C'], action: () => setActiveSection('contact-me') },
  // Actions
  { group: 'Actions', icon: '📥', name: 'Download CV',   desc: 'Muhammad_Rajif_Al_Farikhi_CV.pdf', shortcut: null,
    action: () => { const a = document.createElement('a'); a.href='/cv/rajif-cv.pdf'; a.download='Muhammad_Rajif_Al_Farikhi_CV.pdf'; a.click() }
  },
  { group: 'Actions', icon: '📋', name: 'Copy email',    desc: 'mrajifalfarikhi@gmail.com', shortcut: null,
    action: () => navigator.clipboard.writeText('mrajifalfarikhi@gmail.com')
  },
  { group: 'Actions', icon: '💻', name: 'Open GitHub',   desc: 'github.com/rajfiPy', shortcut: null,
    action: () => window.open('https://github.com/rajfiPy', '_blank')
  },
  { group: 'Actions', icon: '💼', name: 'Open LinkedIn', desc: 'linkedin.com/in/muhammadrajifalfarikhi', shortcut: null,
    action: () => window.open('https://linkedin.com/in/muhammadrajifalfarikhi', '_blank')
  },
  // About tabs
  { group: 'About', icon: '⚡', name: 'View skills',         desc: 'Open skills tab', shortcut: null, action: () => { setActiveSection('about-me'); setActiveTab('skills') } },
  { group: 'About', icon: '🏆', name: 'View certifications', desc: 'Open certs tab',  shortcut: null, action: () => { setActiveSection('about-me'); setActiveTab('certifications') } },
  { group: 'About', icon: '📝', name: 'Read blog',           desc: 'Open blog tab',   shortcut: null, action: () => { setActiveSection('about-me'); setActiveTab('blog') } },
  { group: 'About', icon: '🎮', name: 'Play data games',     desc: 'Open games tab',  shortcut: null, action: () => { setActiveSection('about-me'); setActiveTab('data-games') } },
]

function highlight(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: '#43D9AD' }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function CommandPalette({ setActiveSection, setActiveTab }) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const isDark = theme === 'dark'

  // Lazy — we pass dummy t if translations not available
  const t = { nav: { hello:'_hello', about:'_about-me', projects:'_projects', research:'_research', contact:'_contact-me' } }
  const allCmds = COMMANDS(t, setActiveSection, setActiveTab)

  const filtered = query.trim()
    ? allCmds.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.desc.toLowerCase().includes(query.toLowerCase()) ||
        c.group.toLowerCase().includes(query.toLowerCase())
      )
    : allCmds

  const close = useCallback(() => { setOpen(false); setQuery(''); setActiveIdx(0) }, [])
  const run = useCallback((cmd) => { close(); cmd.action() }, [close])

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(v => !v) }
      if (!open) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
      if (e.key === 'Enter' && filtered[activeIdx]) run(filtered[activeIdx])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, activeIdx, close, run])

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])
  useEffect(() => { setActiveIdx(0) }, [query])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  // Group commands
  const groups = {}
  filtered.forEach(cmd => {
    if (!groups[cmd.group]) groups[cmd.group] = []
    groups[cmd.group].push(cmd)
  })

  const border = isDark ? '#1E2D3D' : '#E0E0E0'
  const bg     = isDark ? '#011627' : '#FFFFFF'
  const bgSub  = isDark ? '#011221' : '#F5F5F5'
  const bgHov  = isDark ? '#0C1F35' : '#EEEEEE'
  const text   = isDark ? '#E5E9F0' : '#1A202C'
  const muted  = isDark ? '#607B96' : '#4A5568'

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      title="Open command palette (⌘K)"
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '5px 12px', borderRadius: 8,
        border: `0.5px solid ${border}`, background: bgSub,
        color: muted, fontFamily: "'Fira Code', monospace", fontSize: 12,
        cursor: 'pointer', whiteSpace: 'nowrap',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6.5" cy="6.5" r="4.5"/><path d="M11 11l3 3"/>
      </svg>
      Search...
      <span style={{ fontSize: 10, padding: '1px 5px', background: bg, border: `0.5px solid ${border}`, borderRadius: 4 }}>⌘K</span>
    </button>
  )

  return (
    <div
      onClick={e => e.target === e.currentTarget && close()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 80, zIndex: 9999,
      }}
    >
      <div style={{
        width: '100%', maxWidth: 560, background: bg,
        border: `0.5px solid ${border}`, borderRadius: 12,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        margin: '0 16px',
      }}>
        {/* Search input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: `0.5px solid ${border}` }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={muted} strokeWidth="1.5">
            <circle cx="6.5" cy="6.5" r="4.5"/><path d="M11 11l3 3"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: "'Fira Code', monospace", fontSize: 14, color: text,
              caretColor: '#43D9AD',
            }}
          />
          <span
            onClick={close}
            style={{
              fontSize: 11, padding: '2px 6px', background: bgSub,
              border: `0.5px solid ${border}`, borderRadius: 4, color: muted,
              cursor: 'pointer', fontFamily: "'Fira Code', monospace",
            }}
          >ESC</span>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ overflowY: 'auto', maxHeight: 360 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: muted, fontSize: 13 }}>
              No results for "{query}"
            </div>
          ) : Object.entries(groups).map(([grp, items]) => {
            let globalIdx = filtered.indexOf(items[0])
            return (
              <div key={grp}>
                <div style={{ padding: '8px 16px 4px', fontSize: 11, color: muted, textTransform: 'uppercase', letterSpacing: '.06em', fontFamily: "'Fira Code', monospace" }}>
                  {grp}
                </div>
                {items.map((cmd) => {
                  const idx = filtered.indexOf(cmd)
                  const isActive = idx === activeIdx
                  return (
                    <div
                      key={cmd.name}
                      data-idx={idx}
                      onClick={() => run(cmd)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '9px 16px', cursor: 'pointer',
                        background: isActive ? bgHov : 'transparent',
                      }}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, border: `0.5px solid ${border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, background: bgSub, flexShrink: 0,
                      }}>
                        {cmd.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: text, fontFamily: "'Fira Code', monospace" }}>
                          {highlight(cmd.name, query)}
                        </div>
                        <div style={{ fontSize: 11, color: muted, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {cmd.desc}
                        </div>
                      </div>
                      {cmd.shortcut && (
                        <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                          {cmd.shortcut.map(k => (
                            <span key={k} style={{ fontSize: 10, padding: '1px 5px', background: bgSub, border: `0.5px solid ${border}`, borderRadius: 3, color: muted, fontFamily: "'Fira Code', monospace" }}>{k}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{ borderTop: `0.5px solid ${border}`, padding: '8px 16px', display: 'flex', gap: 16 }}>
          {[['↑↓','navigate'],['↵','select'],['ESC','close']].map(([k,l]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: muted }}>
              <span style={{ padding: '1px 5px', background: bgSub, border: `0.5px solid ${border}`, borderRadius: 3, fontFamily: "'Fira Code', monospace", fontSize: 10 }}>{k}</span>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
