'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'

export default function DownloadCVButton({ className = '' }) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const [checked, setChecked] = useState(false)
  const [done, setDone] = useState(false)

  const isDark = theme === 'dark'

  const handleClick = () => {
    if (checked || done) return

    setChecked(true)

    // Trigger actual download at ~3.5s (when animation reaches "Open" state)
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = '/cv/rajif-cv.pdf'
      link.download = 'Muhammad_Rajif_Al_Farikhi_CV.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 3500)

    // Mark as done so button resets after ~4.5s
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
    open:     language === 'id' ? 'Terbuka!' : 'Open!',
  }

  return (
    <>
      <style>{`
        .cv-btn-label {
          background-color: transparent;
          border: 2px solid #43D9AD;
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 160px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 5px;
          position: relative;
          user-select: none;
        }

        .cv-btn-label::before {
          content: "";
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          background-color: #43D9AD;
          width: 8px; height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-label .cv-title {
          font-size: 14px;
          font-family: 'Fira Code', monospace;
          color: #43D9AD;
          transition: all 0.4s ease;
          position: absolute;
          right: 18px;
          bottom: 13px;
          text-align: center;
          white-space: nowrap;
        }

        .cv-btn-label .cv-title-open {
          font-size: 14px;
          font-family: 'Fira Code', monospace;
          color: #011627;
          transition: all 0.4s ease;
          position: absolute;
          right: 18px;
          bottom: 13px;
          text-align: center;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-label .cv-circle {
          height: 43px;
          width: 43px;
          border-radius: 50%;
          background-color: #43D9AD;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 rgba(255,255,255,0.7);
          overflow: hidden;
          flex-shrink: 0;
        }

        .cv-btn-label .cv-circle .cv-icon {
          color: #011627;
          width: 24px;
          height: 24px;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .cv-btn-label .cv-square {
          aspect-ratio: 1;
          width: 14px;
          border-radius: 2px;
          background-color: #011627;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .cv-btn-label .cv-circle::before {
          content: "";
          position: absolute;
          left: 0; top: 0;
          background-color: #2aab84;
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }

        /* ── Checked state ── */
        .cv-btn-label.is-checked {
          width: 57px;
          animation: cv-installed 0.4s ease 3.5s forwards;
        }

        .cv-btn-label.is-checked::before {
          animation: cv-rotate 3s ease-in-out 0.4s forwards;
        }

        .cv-btn-label.is-checked .cv-circle {
          animation:
            cv-pulse 1s forwards,
            cv-circle-hide 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }

        .cv-btn-label.is-checked .cv-circle::before {
          animation: cv-fill 3s ease-in-out forwards;
        }

        .cv-btn-label.is-checked .cv-icon {
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-label.is-checked .cv-square {
          opacity: 1;
          visibility: visible;
        }

        .cv-btn-label.is-checked .cv-title {
          opacity: 0;
          visibility: hidden;
        }

        .cv-btn-label.is-checked .cv-title-open {
          animation: cv-show-open 0.4s ease 3.5s forwards;
        }

        /* ── Keyframes ── */
        @keyframes cv-pulse {
          0%   { scale: 0.95; box-shadow: 0 0 0 0 rgba(67,217,173,0.7); }
          70%  { scale: 1;    box-shadow: 0 0 0 14px rgba(67,217,173,0); }
          100% { scale: 0.95; box-shadow: 0 0 0 0 rgba(67,217,173,0); }
        }

        @keyframes cv-fill {
          from { height: 0; }
          to   { height: 100%; }
        }

        @keyframes cv-rotate {
          0%   { transform: rotate(-90deg) translate(27px) rotate(0); opacity:1; visibility:visible; }
          99%  { transform: rotate(270deg) translate(27px) rotate(270deg); opacity:1; visibility:visible; }
          100% { opacity:0; visibility:hidden; }
        }

        @keyframes cv-installed {
          100% {
            width: 150px;
            border-color: #43D9AD;
            background-color: #43D9AD;
          }
        }

        @keyframes cv-circle-hide {
          100% { opacity:0; visibility:hidden; }
        }

        @keyframes cv-show-open {
          100% { opacity:1; visibility:visible; right: 50%; transform: translateX(50%); }
        }

        /* ── Light mode overrides ── */
        .cv-btn-label.light-mode {
          border-color: #0D9488;
        }
        .cv-btn-label.light-mode .cv-circle {
          background-color: #0D9488;
        }
        .cv-btn-label.light-mode .cv-circle::before {
          background-color: #0f7a6e;
        }
        .cv-btn-label.light-mode .cv-title {
          color: #0D9488;
        }
        @keyframes cv-installed-light {
          100% {
            width: 150px;
            border-color: #0D9488;
            background-color: #0D9488;
          }
        }
        .cv-btn-label.light-mode.is-checked {
          animation: cv-installed-light 0.4s ease 3.5s forwards;
        }
      `}</style>

      <label
        className={`cv-btn-label ${checked ? 'is-checked' : ''} ${!isDark ? 'light-mode' : ''} ${className}`}
        onClick={handleClick}
        style={{ pointerEvents: checked ? 'none' : 'auto' }}
      >
        <span className="cv-circle">
          {/* Arrow down icon */}
          <svg className="cv-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
          </svg>
          <div className="cv-square" />
        </span>

        <p className="cv-title">{label.download}</p>
        <p className="cv-title-open">{label.open}</p>
      </label>
    </>
  )
}
