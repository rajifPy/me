// src/hooks/useVisitTracker.js
'use client'

import { useEffect, useRef } from 'react'

export function useVisitTracker(activeSection) {
  const hasTrackedVisit = useRef(false)
  const lastSection = useRef(null)

  // Track initial page visit — fires once per page load
  useEffect(() => {
    if (hasTrackedVisit.current) return
    hasTrackedVisit.current = true

    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'hello' }),
    }).catch(() => {}) // fail silently
  }, [])

  // Track section changes
  useEffect(() => {
    if (!activeSection) return
    if (activeSection === lastSection.current) return
    lastSection.current = activeSection

    // Skip hello — already tracked on initial visit above
    if (activeSection === 'hello') return

    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: activeSection }),
    }).catch(() => {}) // fail silently
  }, [activeSection])
}