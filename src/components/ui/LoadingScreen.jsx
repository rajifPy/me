'use client'

import { useState, useEffect, useRef } from 'react'

// Pixel art "PRESS START" text SVG paths (same style as the Button component)
const PixelText = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 5" fill="currentColor" style={{ width: 160, height: 30 }}>
    <g className="pixels" style={{ '--delay': 1 }}>
      <path d="M1 1H0V2H1V1Z" /><path d="M1 1H2V0H1V1Z" />
    </g>
    <g className="pixels" style={{ '--delay': 2 }}>
      <path d="M1 3V2H0V3H1Z" /><path d="M1 2H2V1H1V2Z" /><path d="M2 1H3V0H2V1Z" />
    </g>
    <g className="pixels" style={{ '--delay': 3 }}>
      <path d="M1 3H2V2H1V3Z" /><path d="M3 0V1H4V0H3Z" />
    </g>
    <g className="pixels" style={{ '--delay': 4 }}>
      <path d="M1 5V4H0V5H1Z" /><path d="M2 2V3H3V2H2Z" /><path d="M4 1H5V0H4V1Z" />
    </g>
    <g className="pixels" style={{ '--delay': 5 }}>
      <path d="M2 4H1V5H2V4Z" /><path d="M4 3V2H3V3H4Z" />
    </g>
    <g className="pixels" style={{ '--delay': 6 }}>
      <path d="M3 4H2V5H3V4Z" /><path d="M4 3H3V4H4V3Z" /><path d="M7 0H6V1H7V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 7 }}>
      <path d="M4 4H3V5H4V4Z" /><path d="M5 3H4V4H5V3Z" /><path d="M8 0H7V1H8V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 8 }}>
      <path d="M5 4H4V5H5V4Z" /><path d="M8 1H7V2H8V1Z" /><path d="M9 0H8V1H9V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 9 }}>
      <path d="M9 1H8V2H9V1Z" /><path d="M10 0H9V1H10V0Z" /><path d="M8 2H7V3H8V2Z" />
    </g>
    <g className="pixels" style={{ '--delay': 10 }}>
      <path d="M8 3H7V4H8V3Z" /><path d="M9 2H8V3H9V2Z" />
    </g>
    <g className="pixels" style={{ '--delay': 11 }}>
      <path d="M8 4H7V5H8V4Z" /><path d="M9 3H8V4H9V3Z" />
    </g>
    <g className="pixels" style={{ '--delay': 12 }}>
      <path d="M9 4H8V5H9V4Z" /><path d="M12 1H11V2H12V1Z" /><path d="M13 0H12V1H13V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 13 }}>
      <path d="M12 2H11V3H12V2Z" /><path d="M13 1H12V2H13V1Z" /><path d="M14 0H13V1H14V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 14 }}>
      <path d="M15 0H14V1H15V0Z" /><path d="M13 2H12V3H13V2Z" /><path d="M12 3H11V4H12V3Z" />
    </g>
    <g className="pixels" style={{ '--delay': 15 }}>
      <path d="M15 1H14V2H15V1Z" /><path d="M14 2H13V3H14V2Z" /><path d="M12 4H11V5H12V4Z" /><path d="M13 3H12V4H13V3Z" />
    </g>
    <g className="pixels" style={{ '--delay': 16 }}>
      <path d="M12 5H13V4H12V5Z" /><path d="M15 2H16V1H15V2Z" /><path d="M14 3H15V2H14V3Z" />
    </g>
    <g className="pixels" style={{ '--delay': 17 }}>
      <path d="M15 3H14V4H15V3Z" /><path d="M16 2H15V3H16V2Z" /><path d="M18 0H17V1H18V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 18 }}>
      <path d="M15 4H14V5H15V4Z" /><path d="M16 3H15V4H16V3Z" /><path d="M18 1H17V2H18V1Z" /><path d="M19 0H18V1H19V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 19 }}>
      <path d="M16 4H15V5H16V4Z" /><path d="M18 2H17V3H18V2Z" /><path d="M19 1H18V2H19V1Z" /><path d="M20 0H19V1H20V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 20 }}>
      <path d="M21 0H20V1H21V0Z" /><path d="M18 3H17V4H18V3Z" /><path d="M19 2H18V3H19V2Z" />
    </g>
    <g className="pixels" style={{ '--delay': 21 }}>
      <path d="M21 1H20V2H21V1Z" /><path d="M18 4H17V5H18V4Z" /><path d="M19 3H18V4H19V3Z" /><path d="M20 2H19V3H20V2Z" /><path d="M22 0H21V1H22V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 22 }}>
      <path d="M18 5H19V4H18V5Z" /><path d="M21 2H22V1H21V2Z" /><path d="M20 3H21V2H20V3Z" />
    </g>
    <g className="pixels" style={{ '--delay': 23 }}>
      <path d="M21 3H20V4H21V3Z" /><path d="M24 0H23V1H24V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 24 }}>
      <path d="M21 4H20V5H21V4Z" /><path d="M22 3H21V4H22V3Z" /><path d="M25 0H24V1H25V0Z" />
    </g>
    <g className="pixels" style={{ '--delay': 25 }}>
      <path d="M25 1H26V0H25V1Z" /><path d="M24 2H25V1H24V2Z" /><path d="M21 5H22V4H21V5Z" />
    </g>
    <g className="pixels" style={{ '--delay': 26 }}>
      <path d="M26 1H27V0H26V1Z" /><path d="M25 2H26V1H25V2Z" /><path d="M24 3H25V2H24V3Z" />
    </g>
    <g className="pixels" style={{ '--delay': 27 }}>
      <path d="M25 3H26V2H25V3Z" /><path d="M24 4H25V3H24V4Z" />
    </g>
    <g className="pixels" style={{ '--delay': 28 }}>
      <path d="M25 4H26V3H25V4Z" /><path d="M24 5H25V4H24V5Z" />
    </g>
    <g className="pixels" style={{ '--delay': 29 }}>
      <path d="M25 5H26V4H25V5Z" />
    </g>
  </svg>
)

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('boot') // boot | ready | exit
  const [bootLines, setBootLines] = useState([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const [clicked, setClicked] = useState(false)
  const intervalRef = useRef(null)

  const BOOT_SEQUENCE = [
    { text: '> initializing portfolio.exe', delay: 300 },
    { text: '> loading data modules...', delay: 700 },
    { text: '> mounting react components...', delay: 1100 },
    { text: '> connecting database layer...', delay: 1500 },
    { text: '> calibrating ML pipeline...', delay: 1900 },
    { text: '> all systems nominal', delay: 2400 },
    { text: '> welcome, user', delay: 2800 },
  ]

  // Boot sequence
  useEffect(() => {
    let timeouts = []
    BOOT_SEQUENCE.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setBootLines(prev => [...prev, text])
      }, delay)
      timeouts.push(t)
    })
    const readyT = setTimeout(() => setPhase('ready'), 3400)
    timeouts.push(readyT)
    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Cursor blink
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleClick = () => {
    if (phase !== 'ready' || clicked) return
    setClicked(true)
    setPhase('exit')
    setTimeout(() => onComplete?.(), 700)
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
        transition: phase === 'exit' ? 'opacity 0.6s ease, transform 0.6s ease' : 'none',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

        /* Scanlines overlay */
        .ls-scanlines::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.18) 2px,
            rgba(0,0,0,0.18) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* CRT vignette */
        .ls-scanlines::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Pixel text color animation — matches Button component */
        .pixels {
          animation: pixel-color 4s calc(var(--delay, 0) * 0.025s) infinite;
        }

        @keyframes pixel-color {
          3%  { color: #ffd1d1; }
          15% { color: #ff0000; }
          100%{ color: #ff0000; }
        }

        /* Boot lines appear */
        .boot-line {
          opacity: 0;
          transform: translateX(-6px);
          animation: line-in 0.3s ease forwards;
        }

        @keyframes line-in {
          to { opacity: 1; transform: translateX(0); }
        }

        /* Press start blink */
        @keyframes press-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .press-blink {
          animation: press-blink 1s step-end infinite;
        }

        /* Loading bar fill */
        @keyframes bar-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Pixel character walk */
        @keyframes walk-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-3px); }
        }

        /* Glitch on hover/ready */
        @keyframes glitch-1 {
          0%   { clip-path: inset(40% 0 61% 0); transform: translate(-4px,0); }
          20%  { clip-path: inset(92% 0 1% 0);  transform: translate(3px,0); }
          40%  { clip-path: inset(43% 0 1% 0);  transform: translate(0,0); }
          60%  { clip-path: inset(25% 0 58% 0); transform: translate(4px,0); }
          80%  { clip-path: inset(54% 0 7% 0);  transform: translate(-4px,0); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(0,0); }
        }

        @keyframes glitch-2 {
          0%   { clip-path: inset(24% 0 29% 0); transform: translate(4px,0); }
          25%  { clip-path: inset(14% 0 64% 0); transform: translate(-3px,0); }
          50%  { clip-path: inset(80% 0 5% 0);  transform: translate(0,0); }
          75%  { clip-path: inset(44% 0 12% 0); transform: translate(4px,0); }
          100% { clip-path: inset(18% 0 73% 0); transform: translate(-4px,0); }
        }

        .glitch-wrap { position: relative; }
        .glitch-wrap .glitch-a,
        .glitch-wrap .glitch-b {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          opacity: 0;
        }
        .ls-ready .glitch-wrap .glitch-a {
          opacity: 0.7;
          color: #43D9AD;
          animation: glitch-1 2.5s steps(1) infinite;
        }
        .ls-ready .glitch-wrap .glitch-b {
          opacity: 0.6;
          color: #4D5BCE;
          animation: glitch-2 3.1s steps(1) infinite;
        }

        /* Pixel art character animation */
        @keyframes px-walk {
          0%   { transform: scaleX(1)  translateY(0px); }
          25%  { transform: scaleX(1)  translateY(-2px); }
          50%  { transform: scaleX(-1) translateY(0px); }
          75%  { transform: scaleX(-1) translateY(-2px); }
          100% { transform: scaleX(1)  translateY(0px); }
        }
      `}</style>

      {/* Scanlines + vignette */}
      <div className="ls-scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Main content */}
      <div
        className={phase === 'ready' ? 'ls-ready' : ''}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 580,
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Top bar — version / name */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
          borderBottom: '1px solid #1E2D3D',
          paddingBottom: 12,
        }}>
          <span style={{ color: '#4D5BCE', fontSize: 11, letterSpacing: '0.12em' }}>PORTFOLIO_OS v1.0.0</span>
          <span style={{ color: '#607B96', fontSize: 11 }}>rajif@airlangga</span>
        </div>

        {/* Big pixel-art "PRESS START" text (same red glow as Button component) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 32,
          color: '#ff0000',
          filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 8px #ff0000)',
        }}>
          <PixelText />
        </div>

        {/* Boot lines */}
        <div style={{
          minHeight: 168,
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          {bootLines.map((line, i) => (
            <div
              key={i}
              className="boot-line"
              style={{
                color: i === bootLines.length - 1 && phase !== 'ready' ? '#43D9AD' : '#607B96',
                fontSize: 12,
                letterSpacing: '0.04em',
                transition: 'color 0.3s',
              }}
            >
              {line}
              {i === bootLines.length - 1 && phase !== 'ready' && (
                <span style={{ opacity: cursorVisible ? 1 : 0, marginLeft: 2 }}>█</span>
              )}
            </div>
          ))}
          {phase === 'boot' && bootLines.length === 0 && (
            <div style={{ color: '#43D9AD', fontSize: 12 }}>
              <span style={{ opacity: cursorVisible ? 1 : 0 }}>█</span>
            </div>
          )}
        </div>

        {/* Loading bar */}
        <div style={{
          width: '100%',
          height: 4,
          background: '#1E2D3D',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 28,
          position: 'relative',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4D5BCE, #43D9AD)',
            borderRadius: 2,
            width: phase === 'ready' || phase === 'exit' ? '100%' : '0%',
            animation: phase !== 'boot' || bootLines.length > 0
              ? `bar-fill ${3.1}s cubic-bezier(0.4,0,0.2,1) forwards`
              : 'none',
            transition: phase === 'exit' ? 'width 0.3s' : 'none',
          }} />
        </div>

        {/* Pixel art character (simple CSS pixel art) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 28,
          fontSize: 0,
          lineHeight: 0,
          animation: 'px-walk 1.2s steps(2) infinite',
          transformOrigin: 'center bottom',
        }}>
          {/* Pixel sprite — simplified inline version of the pixel-art character from Button.jsx */}
          <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
            {/* Sword (white) */}
            <path fill="white" d="M20 3H19V1H18V11H20V3Z" />
            {/* Body */}
            <path fill="#19C37D" d="M11 2H10V3H9V4H8V5H9H10H11H12H13H14H15H16V4H15V3H14V2H13H12H11Z" />
            <path fill="#F6CE80" d="M17 8V7H16V6H15V5H14H13H12H11H10H9V6H8V7H7V8V9H8V8H9V7H10V8H9V9H8V10V11H9H10V10H11H12V9H13V8H14V7H15V8H16V9V10V11H17V10V9V8Z" />
            <path fill="#FED5CD" d="M12 12H11V13V14H10H9V15H10H11H12H13H14H15V14H14H13V13V12V11H12V12Z" />
            <path fill="#19C37D" d="M10 15H9V16V17V18H10H11H13H14H15V17V16V15H14H13H12H11H10Z" />
            <path fill="#CF7F20" d="M8 21H7V22V23H8H9V22H10V21H9H8Z" />
            <path fill="#CF7F20" d="M17 21H16H15H14V22H15V23H16H17V22V21Z" />
            <path fill="#19C37D" d="M10 20V21H11H12H13H14V20H13H11H10Z" />
            <path fill="#19C37D" d="M8 19V20H9H10V19H9V18H10H11H13H14H15V19H14V20H15H16V19V18V17H15V16H9V17H8V18V19Z" />
            <path fill="#F6CE80" d="M13 27V25H11V27H13Z" />
            <path fill="#19C37D" d="M10 27V28H11H12H13H14V27H13H11H10Z" />
            <path fill="#CF7F20" d="M8 28H7V29V30H8H9V29H10V28H9H8Z" />
            <path fill="#CF7F20" d="M17 28H16H15H14V29H15V30H16H17V29V28Z" />
            <path fill="#FED5CD" d="M6 17H5V18H6V19H7V18V17H6Z" />
            <path fill="#FED5CD" d="M17 17V18V19H18V18H19V17H18H17Z" />
            <path fill="#313131" d="M10 28V29H9V30H7V31H10V30H11V29H13V30H14V31H17V30H15V29H14V28H10Z" />
          </svg>
        </div>

        {/* PRESS ANY KEY / status */}
        <div style={{
          textAlign: 'center',
          position: 'relative',
          height: 32,
        }}>
          {phase === 'ready' && (
            <div className="glitch-wrap press-blink" style={{ display: 'inline-block' }}>
              <span style={{
                color: '#43D9AD',
                fontSize: 13,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}>
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
          {phase === 'boot' && (
            <span style={{ color: '#1E2D3D', fontSize: 13 }}>loading...</span>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 28,
          paddingTop: 12,
          borderTop: '1px solid #1E2D3D',
        }}>
          <span style={{ color: '#1E2D3D', fontSize: 10, letterSpacing: '0.08em' }}>© 2024 RAJIF PORTFOLIO</span>
          <span style={{ color: '#1E2D3D', fontSize: 10, letterSpacing: '0.08em' }}>SURABAYA, ID</span>
        </div>
      </div>
    </div>
  )
}
