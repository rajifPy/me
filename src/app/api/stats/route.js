// src/app/api/stats/route.js
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Revalidate every 60 seconds so stats feel live
export const revalidate = 60

// Section display names
const SECTION_LABELS = {
  hello:      '🏠 Hello',
  'about-me': '👤 About',
  projects:   '🚀 Projects',
  research:   '📄 Research',
  'contact-me': '📬 Contact',
}

export async function GET() {
  try {
    const redis = Redis.fromEnv()
    const today = new Date().toISOString().split('T')[0]

    // Fetch total visitors + all section counts in one round-trip
    const sectionKeys = Object.keys(SECTION_LABELS).map(s => `section:${s}`)
    const [total, todayCount, ...sectionCounts] = await Promise.all([
      redis.get('visitors:total'),
      redis.get(`visitors:${today}`),
      ...sectionKeys.map(k => redis.get(k)),
    ])

    // Build sections array sorted by count descending
    const sections = sectionKeys
      .map((key, i) => ({
        id: key.replace('section:', ''),
        label: SECTION_LABELS[key.replace('section:', '')] || key,
        count: Number(sectionCounts[i] || 0),
      }))
      .sort((a, b) => b.count - a.count)

    return NextResponse.json({
      total:   Number(total || 0),
      today:   Number(todayCount || 0),
      sections,
      // Top section is most visited
      topSection: sections[0] ?? null,
    })
  } catch (err) {
    console.error('Stats fetch error:', err)
    // Return zeros — never break the UI
    return NextResponse.json({
      total: 0,
      today: 0,
      sections: [],
      topSection: null,
    })
  }
}
