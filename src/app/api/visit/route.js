// src/app/api/visit/route.js
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export async function POST(request) {
  try {
    const redis = Redis.fromEnv()
    const body = await request.json()
    const { section } = body

    // Get today's date key e.g. "visitors:2025-03-14"
    const today = new Date().toISOString().split('T')[0]
    const todayKey = `visitors:${today}`

    // Run all increments in parallel
    await Promise.all([
      // Total all-time visitors
      redis.incr('visitors:total'),
      // Today's visitors (expires in 48h as safety buffer)
      redis.incr(todayKey),
      redis.expire(todayKey, 172800),
      // Section tracking (if provided)
      section ? redis.incr(`section:${section}`) : Promise.resolve(),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    // Fail silently — never break the portfolio for a counter
    console.error('Visit tracking error:', err)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
