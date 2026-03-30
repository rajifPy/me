'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'

export default function DownloadCVButton({ className = '', size = 'md' }) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const [checked, setChecked] = useState(false)
  const [done, setDone] = useState(false)

  const isDark = theme === 'dark'

  // Size variants
  const sizes = {
    sm: {
      width: '110px',
      circleSize: '28px',
      fontSize: '11px',
      padding: '3px',
      iconSize: '16px',
      squareSize: '9px',
    },
    md: {
      width: '140px',
      circleSize: '36px',
      fontSize: '13px',
      padding: '4px',
      iconSize: '20px',
      squareSize: '12px',
    },
    lg: {
      width: '160px',
      circleSize: '43px',
      fontSize: '14px',
      padding: '5px',
      iconSize: '24px',
      squareSize: '14px',
    },
  }

  const s = sizes[size] || sizes.md
  const checkedWidth = size === 'sm' ? '40px' : size === 'md' ? '48px' : '57px'

  const handleClick = () => {
    if (checked || done) return

    setChecked(true)

    setTimeout(() => {
      const link = document.createElement('a')
      link.href = '/cv/rajif-cv.pdf'
      link.download = 'Muhammad_Rajif_Al_Farikhi_CV.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 3500)

    setTimeout(() => {
      setDone(true)
      setTimeout(() => {
        setChecked(false)
        setDone(false)
      }, 1800)
    }, 4200)
  }

  const label = {
    download: language === 'id' ? 'Unduh CV' : 'Download',
    open: language === 'id' ? 'Terbuka!' : 'Open!',
  }

  const accentColor = isDark ? '#43D9AD' : '#0D9488'
  const accentDark  = isDark ? '#2aab84' : '#0f7a6e'
  const bgColor     = isDark ? '#011627' : '#FFFFFF'

  return (
    <>
      <style>{`
        .cv-btn-${size} {
          background-color: transparent;
          border: 2px solid ${accentColor};
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: ${s.width};
          cursor: pointer;
          transition: all 0.4s ease;
          padding: ${s.padding};
          position: relative;
          user-select: none;
          flex-shrink: 0;
        }

        .cv-btn-${size}::before {
          content: "";
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          background-color: ${accentColor};
          width: 8px; height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-${size} .cv-title-${size} {
          font-size: ${s.fontSize};
          font-family: 'Fira Code', monospace;
          color: ${accentColor};
          transition: all 0.4s ease;
          position: absolute;
          right: 10px;
          bottom: 50%;
          transform: translateY(50%);
          text-align: center;
          white-space: nowrap;
        }

        .cv-btn-${size} .cv-title-open-${size} {
          font-size: ${s.fontSize};
          font-family: 'Fira Code', monospace;
          color: ${bgColor};
          transition: all 0.4s ease;
          position: absolute;
          right: 10px;
          bottom: 50%;
          transform: translateY(50%);
          text-align: center;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-${size} .cv-circle-${size} {
          height: ${s.circleSize};
          width: ${s.circleSize};
          min-width: ${s.circleSize};
          border-radius: 50%;
          background-color: ${accentColor};
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 rgba(255,255,255,0.7);
          overflow: hidden;
          flex-shrink: 0;
        }

        .cv-btn-${size} .cv-circle-${size} .cv-icon-${size} {
          color: ${bgColor};
          width: ${s.iconSize};
          height: ${s.iconSize};
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .cv-btn-${size} .cv-square-${size} {
          aspect-ratio: 1;
          width: ${s.squareSize};
          border-radius: 2px;
          background-color: ${bgColor};
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .cv-btn-${size} .cv-circle-${size}::before {
          content: "";
          position: absolute;
          left: 0; top: 0;
          background-color: ${accentDark};
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }

        /* ── Checked state ── */
        .cv-btn-${size}.is-checked {
          width: ${checkedWidth};
          animation: cv-installed-${size} 0.4s ease 3.5s forwards;
        }

        .cv-btn-${size}.is-checked::before {
          animation: cv-rotate-${size} 3s ease-in-out 0.4s forwards;
        }

        .cv-btn-${size}.is-checked .cv-circle-${size} {
          animation:
            cv-pulse-${size} 1s forwards,
            cv-circle-hide-${size} 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }

        .cv-btn-${size}.is-checked .cv-circle-${size}::before {
          animation: cv-fill-${size} 3s ease-in-out forwards;
        }

        .cv-btn-${size}.is-checked .cv-icon-${size} {
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-${size}.is-checked .cv-square-${size} {
          opacity: 1;
          visibility: visible;
        }

        .cv-btn-${size}.is-checked .cv-title-${size} {
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-${size}.is-checked .cv-title-open-${size} {
          animation: cv-show-open-${size} 0.4s ease 3.5s forwards;
        }

        @keyframes cv-pulse-${size} {
          0%   { scale: 0.95; box-shadow: 0 0 0 0 rgba(67,217,173,0.7); }
          70%  { scale: 1;    box-shadow: 0 0 0 10px rgba(67,217,173,0); }
          100% { scale: 0.95; box-shadow: 0 0 0 0 rgba(67,217,173,0); }
        }

        @keyframes cv-fill-${size} {
          from { height: 0; }
          to   { height: 100%; }
        }

        @keyframes cv-rotate-${size} {
          0%   { transform: rotate(-90deg) translate(22px) rotate(0); opacity:1; visibility:visible; }
          99%  { transform: rotate(270deg) translate(22px) rotate(270deg); opacity:1; visibility:visible; }
          100% { opacity:0; visibility:hidden; }
        }

        @keyframes cv-installed-${size} {
          100% {
            width: ${s.width};
            border-color: ${accentColor};
            background-color: ${accentColor};
          }
        }

        @keyframes cv-circle-hide-${size} {
          100% { opacity:0; visibility:hidden; }
        }

        @keyframes cv-show-open-${size} {
          100% { opacity:1; visibility:visible; right: 50%; transform: translate(50%, 50%); }
        }
      `}</style>

      <label
        className={`cv-btn-${size} ${checked ? 'is-checked' : ''} ${className}`}
        onClick={handleClick}
        style={{ pointerEvents: checked ? 'none' : 'auto' }}
      >
        <span className={`cv-circle-${size}`}>
          <svg
            className={`cv-icon-${size}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            />
          </svg>
          <div className={`cv-square-${size}`} />
        </span>

        <p className={`cv-title-${size}`}>{label.download}</p>
        <p className={`cv-title-open-${size}`}>{label.open}</p>
      </label>
    </>
  )
}
