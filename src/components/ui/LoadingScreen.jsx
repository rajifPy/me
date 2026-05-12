'use client'

import { useState, useEffect, useRef } from 'react'

// ── Pixel-art SVG paths for "PRESS START" (identical to Button by Cobp) ────────
const PixelTextSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 27 5"
    fill="currentColor"
    className="pixel-text-svg"
  >
    <g className="pixels" style={{ '--delay': 1 }}><path d="M1 1H0V2H1V1Z" /><path d="M1 1H2V0H1V1Z" /></g>
    <g className="pixels" style={{ '--delay': 2 }}><path d="M1 3V2H0V3H1Z" /><path d="M1 2H2V1H1V2Z" /><path d="M2 1H3V0H2V1Z" /></g>
    <g className="pixels" style={{ '--delay': 3 }}><path d="M1 3H2V2H1V3Z" /><path d="M3 0V1H4V0H3Z" /></g>
    <g className="pixels" style={{ '--delay': 4 }}><path d="M1 5V4H0V5H1Z" /><path d="M2 2V3H3V2H2Z" /><path d="M4 1H5V0H4V1Z" /></g>
    <g className="pixels" style={{ '--delay': 5 }}><path d="M2 4H1V5H2V4Z" /><path d="M4 3V2H3V3H4Z" /></g>
    <g className="pixels" style={{ '--delay': 6 }}><path d="M3 4H2V5H3V4Z" /><path d="M4 3H3V4H4V3Z" /><path d="M7 0H6V1H7V0Z" /></g>
    <g className="pixels" style={{ '--delay': 7 }}><path d="M4 4H3V5H4V4Z" /><path d="M5 3H4V4H5V3Z" /><path d="M8 0H7V1H8V0Z" /></g>
    <g className="pixels" style={{ '--delay': 8 }}><path d="M5 4H4V5H5V4Z" /><path d="M8 1H7V2H8V1Z" /><path d="M9 0H8V1H9V0Z" /></g>
    <g className="pixels" style={{ '--delay': 9 }}><path d="M9 1H8V2H9V1Z" /><path d="M10 0H9V1H10V0Z" /><path d="M8 2H7V3H8V2Z" /></g>
    <g className="pixels" style={{ '--delay': 10 }}><path d="M8 3H7V4H8V3Z" /><path d="M9 2H8V3H9V2Z" /></g>
    <g className="pixels" style={{ '--delay': 11 }}><path d="M8 4H7V5H8V4Z" /><path d="M9 3H8V4H9V3Z" /></g>
    <g className="pixels" style={{ '--delay': 12 }}><path d="M9 4H8V5H9V4Z" /><path d="M12 1H11V2H12V1Z" /><path d="M13 0H12V1H13V0Z" /></g>
    <g className="pixels" style={{ '--delay': 13 }}><path d="M12 2H11V3H12V2Z" /><path d="M13 1H12V2H13V1Z" /><path d="M14 0H13V1H14V0Z" /></g>
    <g className="pixels" style={{ '--delay': 14 }}><path d="M15 0H14V1H15V0Z" /><path d="M13 2H12V3H13V2Z" /><path d="M12 3H11V4H12V3Z" /></g>
    <g className="pixels" style={{ '--delay': 15 }}><path d="M15 1H14V2H15V1Z" /><path d="M14 2H13V3H14V2Z" /><path d="M12 4H11V5H12V4Z" /><path d="M13 3H12V4H13V3Z" /></g>
    <g className="pixels" style={{ '--delay': 16 }}><path d="M12 5H13V4H12V5Z" /><path d="M15 2H16V1H15V2Z" /><path d="M14 3H15V2H14V3Z" /></g>
    <g className="pixels" style={{ '--delay': 17 }}><path d="M15 3H14V4H15V3Z" /><path d="M16 2H15V3H16V2Z" /><path d="M18 0H17V1H18V0Z" /></g>
    <g className="pixels" style={{ '--delay': 18 }}><path d="M15 4H14V5H15V4Z" /><path d="M16 3H15V4H16V3Z" /><path d="M18 1H17V2H18V1Z" /><path d="M19 0H18V1H19V0Z" /></g>
    <g className="pixels" style={{ '--delay': 19 }}><path d="M16 4H15V5H16V4Z" /><path d="M18 2H17V3H18V2Z" /><path d="M19 1H18V2H19V1Z" /><path d="M20 0H19V1H20V0Z" /></g>
    <g className="pixels" style={{ '--delay': 20 }}><path d="M21 0H20V1H21V0Z" /><path d="M18 3H17V4H18V3Z" /><path d="M19 2H18V3H19V2Z" /></g>
    <g className="pixels" style={{ '--delay': 21 }}><path d="M21 1H20V2H21V1Z" /><path d="M18 4H17V5H18V4Z" /><path d="M19 3H18V4H19V3Z" /><path d="M20 2H19V3H20V2Z" /><path d="M22 0H21V1H22V0Z" /></g>
    <g className="pixels" style={{ '--delay': 22 }}><path d="M18 5H19V4H18V5Z" /><path d="M21 2H22V1H21V2Z" /><path d="M20 3H21V2H20V3Z" /></g>
    <g className="pixels" style={{ '--delay': 23 }}><path d="M21 3H20V4H21V3Z" /><path d="M24 0H23V1H24V0Z" /></g>
    <g className="pixels" style={{ '--delay': 24 }}><path d="M21 4H20V5H21V4Z" /><path d="M22 3H21V4H22V3Z" /><path d="M25 0H24V1H25V0Z" /></g>
    <g className="pixels" style={{ '--delay': 25 }}><path d="M25 1H26V0H25V1Z" /><path d="M24 2H25V1H24V2Z" /><path d="M21 5H22V4H21V5Z" /></g>
    <g className="pixels" style={{ '--delay': 26 }}><path d="M26 1H27V0H26V1Z" /><path d="M25 2H26V1H25V2Z" /><path d="M24 3H25V2H24V3Z" /></g>
    <g className="pixels" style={{ '--delay': 27 }}><path d="M25 3H26V2H25V3Z" /><path d="M24 4H25V3H24V4Z" /></g>
    <g className="pixels" style={{ '--delay': 28 }}><path d="M25 4H26V3H25V4Z" /><path d="M24 5H25V4H24V5Z" /></g>
    <g className="pixels" style={{ '--delay': 29 }}><path d="M25 5H26V4H25V5Z" /></g>
  </svg>
)

// ── The green pixel-art button (styled after the Cobp button shape) ────────────
const PixelButton = ({ pressed }) => (
  <svg
    fill="none"
    viewBox="0 0 38 20"
    xmlns="http://www.w3.org/2000/svg"
    className={`pixel-button-svg ${pressed ? 'pressed' : ''}`}
  >
    <g className="button-start" style={{ transform: pressed ? 'translateY(2px)' : 'none', transition: 'transform 0.1s ease' }}>
      <path fill="#2D2D2D" d="M9 1H10H11H12H13H14H15H16H17H18H19H20H21H22H23H24H25H26H27H28H29H30H31H32V2H33V3H34V4V5V6V7V8V9V10V11V12V13V14V15H35V14V13V12V11V10V9V8V7V6V5V4V3V2H34V1H33V0H32H31H30H29H28H27H26H25H24H23H22H21H20H19H18H17H16H15H14H13H12H11H10H9H8H7H6H5V1H4V2H3V3V4V5V6V7V8V9V10V11V12V13V14V15H4V14V13V12V11V10V9V8V7V6V5V4V3H5V2H6V1H7H8H9Z" />
      <path fill="#26B87C" d="M5 10V9H4V8V7V6V5V4V3H5V2H6V1H7H8H9H10H11H12H13H14H15H16H17H18H19H20H21H22H23H24H25H26H27H28H29H30H31H32V2H33V3H34V4V5V6V7V8V9H33V10H32H31H30H29H28H27H26H25H24H23H22H21H20H19H18H17H16H15H14H13H12H11H10H9H8H7H6H5Z" />
      <path fill="#26B87C" d="M5 10H4V11V12V13V14V15H5H6H7H8H9H10H11H12H13H14H15H16H17H18H19H20H21H22H23H24H25H26H27H28H29H30H31H32H33H34V14V13V12V11V10H33V11H32H31H30H29H28H27H26H25H24H23H22H21H20H19H18H17H16H15H14H13H12H11H10H9H8H7H6H5V10Z" />
      <path fill="#DDDDDD" d="M5 10V11H6H7H8H9H10H11H12H13H14H15H16H17H18H19H20H21H22H23H24H25H26H27H28H29H30H31H32H33V10H32H31H30H29H28H27H26H25H24H23H22H21H20H19H18H17H16H15H14H13H12H11H10H9H8H7H6H5Z" />
      <path fillOpacity="0.3" fill="black" d="M13 7H14L14 8H24L24 7H25V6H26L26 5H25L25 4H23V3H15L15 4H13V5H12V6H13V7Z" />
    </g>
    <g className="border-button-start">
      <path fill="#D7D7D7" d="M2 16V17H3V16H2Z" />
      <path fill="#D7D7D7" d="M35 16V17H36V16H35Z" />
      <path fill="#D7D7D7" d="M37 16V15H36V16H37Z" />
      <path fill="#2D2D2D" d="M3 6V5H1V6H3Z" />
      <path fill="#D7D7D7" d="M1 15V16H2V15H1Z" />
      <path fill="#2D2D2D" d="M3 19V18H2V17H1V16V15V6H0V18H1V19H2V20H36V19H37V18H38V6H37V15V16V17H36V18H35V19H3Z" />
      <path fill="#D7D7D7" d="M3 17V18H35V17H3Z" />
      <path fill="#2D2D2D" d="M37 6V5H35V6H37Z" />
      <path fill="#2D2D2D" d="M34 14H33V15H5V14H4V13H3V14V15H4V16H34V15H35V14V13H34V14Z" />
      <path fill="#888888" d="M37 6H35V13V14V15H34V16H4V15H3V14V13V6H1V15H2V16H3V17H35V16H36V15H37V6Z" />
      <path fill="#888888" d="M3 18V19H35V18H3Z" />
      <path fill="#888888" d="M1 17H2V16H1V17Z" />
      <path fill="#888888" d="M2 18H3V17H2V18Z" />
      <path fill="#888888" d="M36 18V17H35V18H36Z" />
      <path fill="#888888" d="M36 17H37V16H36V17Z" />
    </g>
  </svg>
)

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('ready')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [lightUp, setLightUp] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleClick = () => {
    if (phase !== 'ready' || clicked) return
    setClicked(true)
    setPressed(true)
    setLightUp(true)
    setTimeout(() => setPressed(false), 150)
    setTimeout(() => {
      setPhase('exit')
      setTimeout(() => onComplete?.(), 600)
    }, 300)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#011627',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Fira Code', 'Courier New', monospace",
        overflow: 'hidden',
        cursor: phase === 'ready' ? 'pointer' : 'default',
        transition: phase === 'exit' ? 'opacity 0.5s ease, transform 0.5s ease' : 'none',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

        /* ── Scanlines + vignette ─────────────────────────────── */
        .ls-scanlines::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
          z-index: 1;
        }
        .ls-scanlines::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── EXACT COBP ANIMATIONS ────────────────────────────── */
        .pixels {
          animation: text-color 4s calc(var(--delay) * 0.025s) infinite;
        }
        @keyframes text-color {
          3%  { color: #ffd1d1; }
          15% { color: #ff0000; }
          100%{ color: #ff0000; }
        }

        .pixel-text-wrapper {
          animation: opacity-text 2s infinite steps(1, end);
        }
        @keyframes opacity-text {
          50%, 100% { opacity: 0.12; filter: none; }
        }

        .pixel-text-svg {
          width: 192px;
          height: 36px;
          color: #ff0000;
          filter:
            drop-shadow(0 0 1px #fff)
            drop-shadow(0 0 2px #fff)
            drop-shadow(0 0 8px #ff0000)
            drop-shadow(0 0 18px #ff0000);
        }

        .pixel-button-svg {
          width: 228px;
          height: 120px;
          transition: transform 0.08s ease;
        }
        .pixel-button-svg.pressed .button-start {
          transform: translateY(3px);
        }

        .light-up-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          filter: blur(12px);
          transform: scale(1.4);
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .light-up-overlay span {
          display: flex;
          width: 100%;
          height: 100%;
          clip-path: polygon(
            0% 0%, 0% 100%,
            37% 100%, 45% 0, 55% 0,
            60% 60%, 40% 60%,
            37% 100%, 100% 100%, 100% 0%
          );
          background-color: rgba(38,184,124,0.3);
        }

        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-a, .glitch-b {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          opacity: 0;
        }
        .ls-ready .glitch-a {
          opacity: 0.7;
          color: #43D9AD;
          animation: glitch-1 2.5s steps(1) infinite;
        }
        .ls-ready .glitch-b {
          opacity: 0.55;
          color: #4D5BCE;
          animation: glitch-2 3.1s steps(1) infinite;
        }
        @keyframes glitch-1 {
          0%   { clip-path: inset(40% 0 61% 0); transform: translate(-4px,0); }
          20%  { clip-path: inset(92% 0  1% 0); transform: translate(3px,0); }
          40%  { clip-path: inset(43% 0  1% 0); transform: translate(0,0); }
          60%  { clip-path: inset(25% 0 58% 0); transform: translate(4px,0); }
          80%  { clip-path: inset(54% 0  7% 0); transform: translate(-4px,0); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(0,0); }
        }
        @keyframes glitch-2 {
          0%   { clip-path: inset(24% 0 29% 0); transform: translate(4px,0); }
          25%  { clip-path: inset(14% 0 64% 0); transform: translate(-3px,0); }
          50%  { clip-path: inset(80% 0  5% 0); transform: translate(0,0); }
          75%  { clip-path: inset(44% 0 12% 0); transform: translate(4px,0); }
          100% { clip-path: inset(18% 0 73% 0); transform: translate(-4px,0); }
        }

        .press-blink {
          animation: press-blink 1s step-end infinite;
        }
        @keyframes press-blink {
          0%, 49% { opacity: 1; }
          50%, 100%{ opacity: 0; }
        }
      `}</style>

      {/* Scanlines + vignette layer */}
      <div className="ls-scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Light-up overlay */}
      <div className="light-up-overlay" style={{ opacity: lightUp ? 1 : 0 }}>
        <span />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div
        className={phase === 'ready' ? 'ls-ready' : ''}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 560,
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Top bar */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          borderBottom: '1px solid #1E2D3D',
          paddingBottom: 10,
        }}>
          <span style={{ color: '#4D5BCE', fontSize: 11, letterSpacing: '0.12em' }}>PORTFOLIO_OS v1.0.0</span>
          <span style={{ color: '#607B96', fontSize: 11 }}>murfhi</span>
        </div>

        {/* ── Pixel-art "PRESS START" text — COBP STYLE ─────────── */}
        <div className="pixel-text-wrapper" style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <PixelTextSVG />
        </div>

        {/* ── Pixel button (the green Cobp-style button) ─────────── */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <PixelButton pressed={pressed} />
        </div>

        {/* ── Loading bar (optional, but kept for visual) ─────────── */}
        <div style={{
          width: '100%',
          height: 4,
          background: '#1E2D3D',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4D5BCE, #43D9AD)',
            borderRadius: 2,
            width: '100%',
          }} />
        </div>

        {/* ── PRESS ANY KEY / status ─────────────────────────────── */}
        <div style={{ textAlign: 'center', height: 28 }}>
          {phase === 'ready' && (
            <div className="glitch-wrap press-blink">
              <span style={{ color: '#43D9AD', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                — PRESS ANY KEY TO ENTER —
              </span>
              <span className="glitch-a" style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                — PRESS ANY KEY TO ENTER —
              </span>
              <span className="glitch-b" style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                — PRESS ANY KEY TO ENTER —
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 24,
          paddingTop: 10,
          borderTop: '1px solid #1E2D3D',
        }}>
          <span style={{ color: '#1E2D3D', fontSize: 10, letterSpacing: '0.08em' }}>© 2026 PORTFOLIO</span>
          <span style={{ color: '#1E2D3D', fontSize: 10, letterSpacing: '0.08em' }}>SURABAYA, ID</span>
        </div>
      </div>
    </div>
  )
}
