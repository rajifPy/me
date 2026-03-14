// src/components/ui/VisitorCounter.jsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Users, TrendingUp } from 'lucide-react'

// ─── Count-up animation hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const startValRef = useRef(0)

  useEffect(() => {
    if (target === 0) return

    const startVal = startValRef.current
    const diff = target - startVal
    if (diff <= 0) { setCount(target); return }

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(startVal + diff * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
        startValRef.current = target
        startRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return count
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function VisitorCounter() {
  const { theme } = useTheme()
  const [stats, setStats] = useState({ total: 0, topSection: null })
  const [loaded, setLoaded] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const animatedTotal = useCountUp(stats.total)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => {
        setStats(data)
        setLoaded(true)
      })
      .catch(() => setLoaded(true)) // fail silently
  }, [])

  const isDark = theme === 'dark'
  const muted  = isDark ? 'text-[#607B96]' : 'text-gray-400'
  const bold   = isDark ? 'text-white'      : 'text-gray-700'
  const bg     = isDark ? 'bg-[#011221] border-[#1E2D3D]' : 'bg-gray-50 border-gray-200'

  if (!loaded) return null

  return (
    <div className="flex items-center gap-3">
      {/* Total visitors */}
      <button
        onClick={() => setExpanded(v => !v)}
        title="Portfolio visitor stats"
        className={`flex items-center gap-1.5 transition-colors group ${muted} hover:text-accent-teal`}
      >
        <Users size={13} className="flex-shrink-0" />
        <span className="text-xs tabular-nums">
          {animatedTotal.toLocaleString()}
          <span className="ml-1 hidden sm:inline">visitors</span>
        </span>
      </button>

      {/* Most visited section — shown when expanded */}
      {expanded && stats.topSection && (
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs
          transition-all animate-fade-in-scale ${bg}`}>
          <TrendingUp size={11} className="text-accent-teal flex-shrink-0" />
          <span className={`${muted}`}>top:</span>
          <span className={`${bold} font-medium`}>{stats.topSection.label}</span>
          <button
            onClick={() => setExpanded(false)}
            className={`ml-1 ${muted} hover:text-accent-teal`}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
