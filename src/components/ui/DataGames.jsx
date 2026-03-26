'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { Trophy, Zap, BarChart3, Database, Search, Star, RefreshCw, ChevronRight, Lock, X } from 'lucide-react'

// ─── SQL QUIZ DATA ─────────────────────────────────────────────────────────────
const SQL_QUESTIONS = [
  {
    question: { en: 'Find all employees with salary > 5000', id: 'Temukan semua karyawan dengan gaji > 5000' },
    options: [
      'SELECT * FROM employees WHERE salary > 5000',
      'SELECT * FROM employees IF salary > 5000',
      'FETCH employees WHERE salary > 5000',
      'GET * FROM employees HAVING salary > 5000',
    ],
    correct: 0,
    explanation: { en: 'WHERE filters rows before grouping. IF is not valid SQL.', id: 'WHERE menyaring baris sebelum pengelompokan. IF bukan SQL yang valid.' },
  },
  {
    question: { en: 'Count distinct product categories', id: 'Hitung kategori produk yang unik' },
    options: [
      'SELECT COUNT(*) FROM products GROUP BY category',
      'SELECT COUNT(DISTINCT category) FROM products',
      'SELECT UNIQUE(category) FROM products',
      'SELECT TOTAL(category) FROM products',
    ],
    correct: 1,
    explanation: { en: 'COUNT(DISTINCT col) counts unique non-null values in a column.', id: 'COUNT(DISTINCT col) menghitung nilai unik non-null dalam kolom.' },
  },
  {
    question: { en: 'Get the 3rd highest salary', id: 'Dapatkan gaji tertinggi ke-3' },
    options: [
      'SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2',
      'SELECT TOP 3 salary FROM employees',
      'SELECT salary FROM employees WHERE rank = 3',
      'SELECT salary FROM employees ORDER BY salary LIMIT 3',
    ],
    correct: 0,
    explanation: { en: 'OFFSET 2 skips the first 2 rows, LIMIT 1 takes the next one — the 3rd highest.', id: 'OFFSET 2 melewati 2 baris pertama, LIMIT 1 mengambil baris berikutnya — tertinggi ke-3.' },
  },
  {
    question: { en: 'Join orders with customers, show only matched rows', id: 'Gabungkan orders dengan customers, tampilkan hanya baris yang cocok' },
    options: [
      'SELECT * FROM orders LEFT JOIN customers ON orders.cust_id = customers.id',
      'SELECT * FROM orders INNER JOIN customers ON orders.cust_id = customers.id',
      'SELECT * FROM orders FULL JOIN customers ON orders.cust_id = customers.id',
      'SELECT * FROM orders CROSS JOIN customers',
    ],
    correct: 1,
    explanation: { en: 'INNER JOIN returns only rows that have matching values in both tables.', id: 'INNER JOIN mengembalikan hanya baris yang memiliki nilai cocok di kedua tabel.' },
  },
  {
    question: { en: 'Calculate average sales per region', id: 'Hitung rata-rata penjualan per wilayah' },
    options: [
      'SELECT region, MEAN(sales) FROM orders',
      'SELECT region, AVG(sales) FROM orders GROUP BY region',
      'SELECT region, AVG(sales) FROM orders WHERE region',
      'SELECT region, AVERAGE(sales) FROM orders',
    ],
    correct: 1,
    explanation: { en: 'AVG() + GROUP BY computes per-group averages. MEAN() is not standard SQL.', id: 'AVG() + GROUP BY menghitung rata-rata per grup. MEAN() bukan SQL standar.' },
  },
  {
    question: { en: 'Find customers who never placed an order', id: 'Temukan pelanggan yang tidak pernah memesan' },
    options: [
      'SELECT * FROM customers c WHERE c.id NOT IN (SELECT cust_id FROM orders)',
      'SELECT * FROM customers c LEFT JOIN orders o ON c.id = o.cust_id WHERE o.id = NULL',
      'SELECT * FROM customers EXCEPT orders',
      'SELECT * FROM customers c WHERE c.id NOT IN (SELECT cust_id FROM orders WHERE cust_id IS NOT NULL)',
    ],
    correct: 3,
    explanation: { en: 'NOT IN with NULLs is tricky — adding IS NOT NULL prevents unexpected NULL matching behavior.', id: 'NOT IN dengan NULL itu rumit — menambahkan IS NOT NULL mencegah perilaku pencocokan NULL yang tidak terduga.' },
  },
]

// ─── CHART GUESSER DATA ────────────────────────────────────────────────────────
const CHART_SCENARIOS = [
  {
    title: { en: 'Monthly Revenue', id: 'Pendapatan Bulanan' },
    data: [120, 135, 128, 150, 142, 168, 175, 162, 180, 195, 188, 210],
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    question: { en: 'What is the overall trend?', id: 'Apa tren keseluruhan?' },
    options: {
      en: ['Upward trend', 'Downward trend', 'No trend', 'Seasonal cycle'],
      id: ['Tren naik', 'Tren turun', 'Tidak ada tren', 'Siklus musiman'],
    },
    correct: 0,
    insight: { en: 'Revenue grew ~75% over the year — a clear upward trend despite month-to-month dips.', id: 'Pendapatan tumbuh ~75% sepanjang tahun — tren naik yang jelas meski ada penurunan bulanan.' },
    type: 'line',
    color: '#43D9AD',
  },
  {
    title: { en: 'Product Category Sales', id: 'Penjualan Kategori Produk' },
    data: [45, 30, 15, 10],
    labels: ['Electronics','Clothing','Food','Other'],
    question: { en: 'Which category dominates?', id: 'Kategori mana yang mendominasi?' },
    options: {
      en: ['Clothing', 'Food', 'Electronics', 'Other'],
      id: ['Pakaian', 'Makanan', 'Elektronik', 'Lainnya'],
    },
    correct: 2,
    insight: { en: 'Electronics takes 45% of sales — nearly half the total revenue from one category.', id: 'Elektronik mengambil 45% penjualan — hampir setengah total pendapatan dari satu kategori.' },
    type: 'bar',
    color: '#4D5BCE',
  },
  {
    title: { en: 'Weekly Active Users', id: 'Pengguna Aktif Mingguan' },
    data: [850, 920, 890, 960, 1050, 1200, 1350, 1280, 1400, 1450, 1380, 1500],
    labels: ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'],
    question: { en: 'What happened around week 6-7?', id: 'Apa yang terjadi sekitar minggu 6-7?' },
    options: {
      en: ['User drop-off', 'Significant growth spike', 'Data error', 'Steady flat line'],
      id: ['Penurunan pengguna', 'Lonjakan pertumbuhan signifikan', 'Kesalahan data', 'Garis datar'],
    },
    correct: 1,
    insight: { en: 'WAU jumped ~25% from W5→W7, likely from a product launch or marketing campaign.', id: 'WAU melonjak ~25% dari W5→W7, kemungkinan karena peluncuran produk atau kampanye pemasaran.' },
    type: 'line',
    color: '#FEA55F',
  },
  {
    title: { en: 'Customer Age Distribution', id: 'Distribusi Usia Pelanggan' },
    data: [5, 18, 32, 28, 12, 5],
    labels: ['<18','18-24','25-34','35-44','45-54','55+'],
    question: { en: 'What is the primary target demographic?', id: 'Apa demografi target utama?' },
    options: {
      en: ['Under 18', 'Ages 18-24', 'Ages 25-34', 'Ages 35-44'],
      id: ['Di bawah 18', 'Usia 18-24', 'Usia 25-34', 'Usia 35-44'],
    },
    correct: 2,
    insight: { en: '25-34 is the largest segment at 32%, followed by 35-44 at 28% — both prime working-age groups.', id: '25-34 adalah segmen terbesar dengan 32%, diikuti 35-44 dengan 28% — keduanya kelompok usia kerja utama.' },
    type: 'bar',
    color: '#E99287',
  },
]

// ─── DATA DETECTIVE ────────────────────────────────────────────────────────────
const DETECTIVE_CASES = [
  {
    title: { en: 'The Missing Revenue', id: 'Pendapatan yang Hilang' },
    description: {
      en: 'Sales team reports 10,000 orders. Revenue is $485,000. Expected $500,000. Find the anomaly.',
      id: 'Tim penjualan melaporkan 10.000 pesanan. Pendapatan $485.000. Ekspektasi $500.000. Temukan anomalinya.',
    },
    clues: [
      { en: 'Average order value is $48.50', id: 'Rata-rata nilai pesanan adalah $48,50' },
      { en: '3% of orders have $0 revenue', id: '3% pesanan memiliki pendapatan $0' },
      { en: 'Top product SKU #4421 shows 500 units but $0 revenue', id: 'SKU produk teratas #4421 menunjukkan 500 unit tapi pendapatan $0' },
    ],
    options: {
      en: ['Discount abuse on SKU #4421', 'Data entry error in order count', 'Refunds not tracked separately', 'Currency conversion issue'],
      id: ['Penyalahgunaan diskon pada SKU #4421', 'Kesalahan entri data jumlah pesanan', 'Pengembalian tidak dilacak terpisah', 'Masalah konversi mata uang'],
    },
    correct: 0,
    solution: {
      en: 'SKU #4421 had a pricing bug — 500 orders went through with $0 price. $0 × 500 = $15K gap explains the $485K vs $500K discrepancy.',
      id: 'SKU #4421 memiliki bug harga — 500 pesanan masuk dengan harga $0. $0 × 500 = selisih $15K menjelaskan perbedaan $485K vs $500K.',
    },
  },
  {
    title: { en: 'The Spike Anomaly', id: 'Anomali Lonjakan' },
    description: {
      en: 'Database query time jumped from 200ms to 8 seconds last Tuesday. No code changes deployed.',
      id: 'Waktu kueri database melonjak dari 200ms ke 8 detik Selasa lalu. Tidak ada perubahan kode yang di-deploy.',
    },
    clues: [
      { en: 'New batch import of 2M rows ran Monday night', id: 'Impor batch baru 2 juta baris berjalan Senin malam' },
      { en: 'EXPLAIN ANALYZE shows sequential scan', id: 'EXPLAIN ANALYZE menunjukkan pemindaian sekuensial' },
      { en: 'Table size doubled from Monday to Tuesday', id: 'Ukuran tabel berlipat ganda dari Senin ke Selasa' },
    ],
    options: {
      en: ['Server hardware failure', 'Index became invalid after table growth', 'Network latency increase', 'Application memory leak'],
      id: ['Kegagalan hardware server', 'Indeks tidak valid setelah pertumbuhan tabel', 'Peningkatan latensi jaringan', 'Memory leak aplikasi'],
    },
    correct: 1,
    solution: {
      en: 'The index stats were stale. After 2M rows were inserted, PostgreSQL stopped using the index and did a full table scan. ANALYZE + REINDEX fixed it.',
      id: 'Statistik indeks sudah usang. Setelah 2 juta baris dimasukkan, PostgreSQL berhenti menggunakan indeks dan melakukan pemindaian penuh. ANALYZE + REINDEX memperbaikinya.',
    },
  },
  {
    title: { en: 'The Duplicate Users', id: 'Pengguna Duplikat' },
    description: {
      en: 'Marketing claims 50,000 users. Analytics shows 62,000. There is a 24% discrepancy.',
      id: 'Marketing mengklaim 50.000 pengguna. Analitik menunjukkan 62.000. Ada perbedaan 24%.',
    },
    clues: [
      { en: 'Users can sign up via email, Google, or Facebook', id: 'Pengguna bisa daftar via email, Google, atau Facebook' },
      { en: 'No email deduplication on signup', id: 'Tidak ada deduplikasi email saat daftar' },
      { en: '12,000 users have 2+ accounts', id: '12.000 pengguna memiliki 2+ akun' },
    ],
    options: {
      en: ['Bot traffic inflating counts', 'Multiple auth providers create duplicate user IDs', 'Marketing uses old data', 'Timezone mismatch in reporting'],
      id: ['Traffic bot menaikkan hitungan', 'Beberapa penyedia auth membuat ID pengguna duplikat', 'Marketing menggunakan data lama', 'Ketidaksesuaian zona waktu dalam pelaporan'],
    },
    correct: 1,
    solution: {
      en: 'Same person signs up with email, then later "Login with Google" creates a new account. 62K - 12K duplicates = ~50K real users. Fix: link accounts by verified email.',
      id: 'Orang yang sama daftar dengan email, lalu "Login dengan Google" membuat akun baru. 62K - 12K duplikat = ~50K pengguna nyata. Solusi: hubungkan akun berdasarkan email terverifikasi.',
    },
  },
]

// ─── MINI CHART ────────────────────────────────────────────────────────────────
function MiniChart({ data, labels, type, color, height = 120 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  if (type === 'line') {
    const w = 320, h = height
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * (w - 20) + 10
      const y = h - 16 - ((v - min) / range) * (h - 32)
      return `${x},${y}`
    })
    return (
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height }} preserveAspectRatio="none">
        <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * (w - 20) + 10
          const y = h - 16 - ((v - min) / range) * (h - 32)
          return <circle key={i} cx={x} cy={y} r="3" fill={color} />
        })}
        {labels.map((l, i) => {
          const x = (i / (data.length - 1)) * (w - 20) + 10
          if (i % Math.ceil(labels.length / 6) !== 0) return null
          return <text key={i} x={x} y={h - 2} textAnchor="middle" fontSize="10" fill="var(--color-text-secondary)">{l}</text>
        })}
      </svg>
    )
  }

  return (
    <svg viewBox={`0 ${-8} 320 ${height + 8}`} style={{ width: '100%', height }} preserveAspectRatio="none">
      {data.map((v, i) => {
        const bw = (320 - 16) / data.length
        const x = i * bw + 8
        const bh = ((v - min) / range) * (height - 32) + 8
        const y = height - 16 - bh
        return (
          <g key={i}>
            <rect x={x + 2} y={y} width={bw - 8} height={bh} rx="3" fill={color} opacity="0.85" />
            <text x={x + bw / 2} y={height - 2} textAnchor="middle" fontSize="10" fill="var(--color-text-secondary)">{labels[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── TIMER BAR ────────────────────────────────────────────────────────────────
function TimerBar({ seconds, total, color }) {
  const pct = (seconds / total) * 100
  return (
    <div style={{ height: 4, background: 'var(--color-border-tertiary)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: pct > 40 ? color : pct > 20 ? '#FEA55F' : '#E24B4A', transition: 'width 1s linear, background 0.3s', borderRadius: 2 }} />
    </div>
  )
}

// ─── SCORE BADGE ─────────────────────────────────────────────────────────────
function ScoreBadge({ score, total }) {
  const pct = total > 0 ? score / total : 0
  const color = pct >= 0.8 ? '#43D9AD' : pct >= 0.5 ? '#FEA55F' : '#E99287'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: `${color}20`, color, padding: '2px 10px', borderRadius: 20, fontSize: 13, fontWeight: 500 }}>
      <Star width={13} height={13} /> {score}/{total}
    </span>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME 1 — SQL QUIZ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SQLQuiz({ lang, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(20)
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)

  const q = SQL_QUESTIONS[idx]

  const advance = useCallback((wasCorrect) => {
    clearInterval(timerRef.current)
    const next = idx + 1
    const newScore = score + (wasCorrect ? 1 : 0)
    if (next >= SQL_QUESTIONS.length) { setDone(true); setScore(newScore); return }
    setTimeout(() => {
      setIdx(next); setSelected(null); setConfirmed(false); setTimer(20)
    }, 1400)
    setScore(newScore)
  }, [idx, score])

  useEffect(() => {
    if (confirmed || done) return
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); setConfirmed(true); advance(false); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [idx, confirmed, done, advance])

  const confirm = () => {
    if (selected === null || confirmed) return
    setConfirmed(true)
    clearInterval(timerRef.current)
    const correct = selected === q.correct
    setTimeout(() => advance(correct), 1400)
  }

  if (done) return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <Trophy style={{ margin: '0 auto 12px', color: '#FEA55F' }} size={40} />
      <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 8 }}>
        {lang === 'id' ? 'Kuis Selesai!' : 'Quiz Complete!'}
      </p>
      <ScoreBadge score={score} total={SQL_QUESTIONS.length} />
      <p style={{ marginTop: 12, fontSize: 14, color: 'var(--color-text-secondary)' }}>
        {score >= 5 ? (lang === 'id' ? 'Luar biasa! Kamu SQL expert!' : 'Excellent! You\'re an SQL expert!')
          : score >= 3 ? (lang === 'id' ? 'Bagus! Terus berlatih.' : 'Good job! Keep practicing.')
          : (lang === 'id' ? 'Terus belajar SQL!' : 'Keep learning SQL!')}
      </p>
      <button onClick={() => onFinish(score)} style={{ marginTop: 20, padding: '8px 24px', fontSize: 14, borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}>
        {lang === 'id' ? 'Kembali' : 'Back to games'}
      </button>
    </div>
  )

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {idx + 1} / {SQL_QUESTIONS.length}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Zap width={13} height={13} style={{ color: timer <= 8 ? '#E24B4A' : '#43D9AD' }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: timer <= 8 ? '#E24B4A' : 'var(--color-text-primary)' }}>{timer}s</span>
        </div>
      </div>
      <TimerBar seconds={timer} total={20} color="#43D9AD" />

      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 14, lineHeight: 1.5 }}>
        {q.question[lang]}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {q.options.map((opt, i) => {
          let bg = 'var(--color-background-secondary)'
          let border = 'var(--color-border-tertiary)'
          let color = 'var(--color-text-primary)'
          if (confirmed) {
            if (i === q.correct) { bg = 'rgba(67,217,173,0.15)'; border = '#43D9AD'; color = '#43D9AD' }
            else if (i === selected && selected !== q.correct) { bg = 'rgba(226,75,74,0.12)'; border = '#E24B4A'; color = '#E24B4A' }
          } else if (selected === i) {
            bg = 'rgba(77,91,206,0.12)'; border = '#4D5BCE'; color = 'var(--color-text-primary)'
          }
          return (
            <button key={i} onClick={() => { if (!confirmed) setSelected(i) }}
              style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 'var(--border-radius-md)', border: `1px solid ${border}`, background: bg, color, fontSize: 12, fontFamily: 'var(--font-mono)', cursor: confirmed ? 'default' : 'pointer', lineHeight: 1.5, transition: 'all 0.2s' }}>
              {opt}
            </button>
          )
        })}
      </div>

      {confirmed && (
        <div style={{ padding: '8px 12px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', marginBottom: 8 }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0 }}>
            {lang === 'id' ? 'Penjelasan: ' : 'Explanation: '}
            <span style={{ color: 'var(--color-text-primary)' }}>{q.explanation[lang]}</span>
          </p>
        </div>
      )}

      {!confirmed && (
        <button onClick={confirm} disabled={selected === null}
          style={{ width: '100%', padding: '9px', borderRadius: 'var(--border-radius-md)', fontSize: 13, cursor: selected === null ? 'not-allowed' : 'pointer', opacity: selected === null ? 0.4 : 1, fontWeight: 500, transition: 'opacity 0.2s' }}>
          {lang === 'id' ? 'Konfirmasi Jawaban' : 'Confirm Answer'} <ChevronRight width={14} height={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME 2 — CHART GUESSER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ChartGuesser({ lang, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const s = CHART_SCENARIOS[idx]

  const confirm = () => {
    if (selected === null || confirmed) return
    setConfirmed(true)
    const correct = selected === s.correct
    const ns = score + (correct ? 1 : 0)
    setTimeout(() => {
      if (idx + 1 >= CHART_SCENARIOS.length) { setDone(true); setScore(ns); return }
      setIdx(i => i + 1); setSelected(null); setConfirmed(false)
      setScore(ns)
    }, 1800)
    setScore(ns)
  }

  if (done) return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <BarChart3 style={{ margin: '0 auto 12px', color: '#4D5BCE' }} size={40} />
      <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 8 }}>
        {lang === 'id' ? 'Analisis Selesai!' : 'Analysis Complete!'}
      </p>
      <ScoreBadge score={score} total={CHART_SCENARIOS.length} />
      <p style={{ marginTop: 12, fontSize: 14, color: 'var(--color-text-secondary)' }}>
        {score >= 3 ? (lang === 'id' ? 'Mata tajam analis! 🔍' : 'Sharp analyst eyes! 🔍')
          : (lang === 'id' ? 'Terus latih kemampuan membaca grafik!' : 'Keep training your chart-reading skills!')}
      </p>
      <button onClick={() => onFinish(score)} style={{ marginTop: 20, padding: '8px 24px', fontSize: 14, borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}>
        {lang === 'id' ? 'Kembali' : 'Back to games'}
      </button>
    </div>
  )

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{idx + 1} / {CHART_SCENARIOS.length}</span>
        <ScoreBadge score={score} total={idx} />
      </div>

      <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '10px 12px', marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: '0 0 6px' }}>{s.title[lang]}</p>
        <MiniChart data={s.data} labels={s.labels} type={s.type} color={s.color} />
      </div>

      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 12 }}>
        {s.question[lang]}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {s.options[lang].map((opt, i) => {
          let bg = 'var(--color-background-secondary)'
          let border = '1px solid var(--color-border-tertiary)'
          let color = 'var(--color-text-primary)'
          if (confirmed) {
            if (i === s.correct) { bg = 'rgba(67,217,173,0.15)'; border = '1px solid #43D9AD'; color = '#43D9AD' }
            else if (i === selected) { bg = 'rgba(226,75,74,0.12)'; border = '1px solid #E24B4A'; color = '#E24B4A' }
          } else if (selected === i) {
            bg = 'rgba(77,91,206,0.12)'; border = '1px solid #4D5BCE'
          }
          return (
            <button key={i} onClick={() => { if (!confirmed) setSelected(i) }}
              style={{ padding: '9px 8px', borderRadius: 'var(--border-radius-md)', border, background: bg, color, fontSize: 12, cursor: confirmed ? 'default' : 'pointer', lineHeight: 1.4, transition: 'all 0.2s' }}>
              {opt}
            </button>
          )
        })}
      </div>

      {confirmed && (
        <div style={{ padding: '8px 12px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', marginBottom: 8, borderLeft: '3px solid #43D9AD' }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0 }}>
            {lang === 'id' ? 'Insight: ' : 'Insight: '}
            <span style={{ color: 'var(--color-text-primary)' }}>{s.insight[lang]}</span>
          </p>
        </div>
      )}

      {!confirmed && (
        <button onClick={confirm} disabled={selected === null}
          style={{ width: '100%', padding: '9px', borderRadius: 'var(--border-radius-md)', fontSize: 13, cursor: selected === null ? 'not-allowed' : 'pointer', opacity: selected === null ? 0.4 : 1, fontWeight: 500 }}>
          {lang === 'id' ? 'Analisis' : 'Analyze'} <ChevronRight width={14} height={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME 3 — DATA DETECTIVE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function DataDetective({ lang, onFinish }) {
  const [caseIdx, setCaseIdx] = useState(0)
  const [revealed, setRevealed] = useState([])
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)

  const c = DETECTIVE_CASES[caseIdx]
  const maxClues = c.clues.length

  const revealClue = () => {
    if (revealed.length < maxClues) setRevealed(prev => [...prev, prev.length])
  }

  const solve = () => {
    if (selected === null || solved) return
    const correct = selected === c.correct
    if (correct) {
      const points = Math.max(1, 3 - wrongAttempts - Math.floor(revealed.length / 2))
      setScore(s => s + points)
      setSolved(true)
    } else {
      setWrongAttempts(w => w + 1)
    }
  }

  const nextCase = () => {
    const next = caseIdx + 1
    if (next >= DETECTIVE_CASES.length) { setDone(true); return }
    setCaseIdx(next); setRevealed([]); setSelected(null); setSolved(false); setWrongAttempts(0)
  }

  const maxScore = DETECTIVE_CASES.length * 3

  if (done) return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <Search style={{ margin: '0 auto 12px', color: '#E99287' }} size={40} />
      <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 8 }}>
        {lang === 'id' ? 'Semua Kasus Terpecahkan!' : 'All Cases Solved!'}
      </p>
      <ScoreBadge score={score} total={maxScore} />
      <p style={{ marginTop: 12, fontSize: 14, color: 'var(--color-text-secondary)' }}>
        {score >= maxScore * 0.7 ? (lang === 'id' ? 'Detektif data kelas satu! 🕵️' : 'World-class data detective! 🕵️')
          : (lang === 'id' ? 'Terus asah intuisi datamu!' : 'Keep sharpening your data intuition!')}
      </p>
      <button onClick={() => onFinish(score)} style={{ marginTop: 20, padding: '8px 24px', fontSize: 14, borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}>
        {lang === 'id' ? 'Kembali' : 'Back to games'}
      </button>
    </div>
  )

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {lang === 'id' ? 'Kasus' : 'Case'} {caseIdx + 1}/{DETECTIVE_CASES.length}
        </span>
        <ScoreBadge score={score} total={maxScore} />
      </div>

      <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '10px 12px', marginBottom: 12, borderLeft: '3px solid #E99287' }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>{c.title[lang]}</p>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>{c.description[lang]}</p>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', margin: 0 }}>
            {lang === 'id' ? 'Petunjuk' : 'Clues'} ({revealed.length}/{maxClues})
          </p>
          {revealed.length < maxClues && !solved && (
            <button onClick={revealClue} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, cursor: 'pointer', color: '#E99287', border: '1px solid #E99287', background: 'transparent' }}>
              + {lang === 'id' ? 'Ungkap petunjuk' : 'Reveal clue'}
            </button>
          )}
        </div>
        {revealed.map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6, padding: '7px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <Search width={13} height={13} style={{ color: '#E99287', flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 12, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{c.clues[i][lang]}</span>
          </div>
        ))}
        {revealed.length === 0 && (
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', textAlign: 'center', padding: '12px', border: '1px dashed var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)' }}>
            {lang === 'id' ? 'Ungkap petunjuk untuk membantu investigasimu' : 'Reveal clues to help your investigation'}
          </p>
        )}
      </div>

      {wrongAttempts > 0 && !solved && (
        <p style={{ fontSize: 12, color: '#FEA55F', marginBottom: 8 }}>
          {wrongAttempts} {lang === 'id' ? 'percobaan salah. Poin berkurang.' : 'wrong attempt(s). Points reduced.'}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
        {c.options[lang].map((opt, i) => {
          let bg = 'var(--color-background-secondary)'
          let border = '1px solid var(--color-border-tertiary)'
          let color = 'var(--color-text-primary)'
          if (solved) {
            if (i === c.correct) { bg = 'rgba(67,217,173,0.15)'; border = '1px solid #43D9AD'; color = '#43D9AD' }
          } else if (selected === i) {
            bg = 'rgba(233,146,135,0.15)'; border = '1px solid #E99287'
          }
          return (
            <button key={i} onClick={() => { if (!solved) setSelected(i) }}
              style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 'var(--border-radius-md)', border, background: bg, color, fontSize: 12, cursor: solved ? 'default' : 'pointer', lineHeight: 1.5, transition: 'all 0.2s' }}>
              {opt}
            </button>
          )
        })}
      </div>

      {solved ? (
        <div>
          <div style={{ padding: '8px 12px', background: 'rgba(67,217,173,0.1)', borderRadius: 'var(--border-radius-md)', marginBottom: 10, borderLeft: '3px solid #43D9AD' }}>
            <p style={{ fontSize: 12, margin: 0, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
              {lang === 'id' ? 'Solusi: ' : 'Solution: '}
              {c.solution[lang]}
            </p>
          </div>
          <button onClick={nextCase} style={{ width: '100%', padding: '9px', borderRadius: 'var(--border-radius-md)', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            {caseIdx + 1 < DETECTIVE_CASES.length ? (lang === 'id' ? 'Kasus Berikutnya' : 'Next Case') : (lang === 'id' ? 'Selesai' : 'Finish')}
            <ChevronRight width={14} height={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </button>
        </div>
      ) : (
        <button onClick={solve} disabled={selected === null}
          style={{ width: '100%', padding: '9px', borderRadius: 'var(--border-radius-md)', fontSize: 13, cursor: selected === null ? 'not-allowed' : 'pointer', opacity: selected === null ? 0.4 : 1, fontWeight: 500 }}>
          {lang === 'id' ? 'Selesaikan Kasus' : 'Solve Case'} <ChevronRight width={14} height={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function DataGames() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const lang = language || 'en'

  const [activeGame, setActiveGame] = useState(null)
  const [scores, setScores] = useState({ sql: null, chart: null, detective: null })
  const [key, setKey] = useState(0)

  const isDark = theme === 'dark'

  const GAMES = [
    {
      id: 'sql',
      icon: <Database size={22} />,
      color: '#43D9AD',
      title: { en: 'SQL Quiz', id: 'Kuis SQL' },
      desc: { en: 'Write correct queries under time pressure', id: 'Tulis kueri yang benar dalam batas waktu' },
      tag: { en: '6 questions · 20s each', id: '6 pertanyaan · 20d masing-masing' },
      maxScore: SQL_QUESTIONS.length,
    },
    {
      id: 'chart',
      icon: <BarChart3 size={22} />,
      color: '#4D5BCE',
      title: { en: 'Chart Guesser', id: 'Tebak Grafik' },
      desc: { en: 'Read charts and identify key insights', id: 'Baca grafik dan identifikasi wawasan utama' },
      tag: { en: '4 charts · No timer', id: '4 grafik · Tanpa batas waktu' },
      maxScore: CHART_SCENARIOS.length,
    },
    {
      id: 'detective',
      icon: <Search size={22} />,
      color: '#E99287',
      title: { en: 'Data Detective', id: 'Detektif Data' },
      desc: { en: 'Solve real-world data anomaly cases', id: 'Pecahkan kasus anomali data dunia nyata' },
      tag: { en: '3 cases · Clue-based', id: '3 kasus · Berbasis petunjuk' },
      maxScore: DETECTIVE_CASES.length * 3,
    },
  ]

  const handleFinish = (gameId, score) => {
    setScores(s => ({ ...s, [gameId]: score }))
    setActiveGame(null)
  }

  const startGame = (id) => { setKey(k => k + 1); setActiveGame(id) }

  const borderClass = isDark ? '1px solid #1E2D3D' : '1px solid var(--color-border-tertiary)'

  return (
    <div style={{ maxWidth: 680, width: '100%' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Trophy size={22} style={{ color: '#FEA55F' }} />
          <h2 style={{ fontSize: 20, fontWeight: 500, color: 'var(--color-text-primary)', margin: 0 }}>
            <span style={{ color: '#4D5BCE' }}>//</span> {lang === 'id' ? 'Game Data' : 'Data Games'}
          </h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, paddingLeft: 32 }}>
          {lang === 'id' ? 'Uji kemampuan analitik & SQL-mu dengan game interaktif' : 'Test your analytical & SQL skills with interactive games'}
        </p>
      </div>

      {activeGame ? (
        <div style={{ background: isDark ? '#011221' : 'var(--color-background-primary)', border: borderClass, borderRadius: 'var(--border-radius-lg)', padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottom: borderClass }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
              {GAMES.find(g => g.id === activeGame)?.title[lang]}
            </span>
            <button onClick={() => setActiveGame(null)} style={{ padding: 4, borderRadius: 'var(--border-radius-md)', cursor: 'pointer', border: 'none', background: 'transparent', color: 'var(--color-text-secondary)' }}>
              <X size={16} />
            </button>
          </div>
          {activeGame === 'sql' && <SQLQuiz key={key} lang={lang} onFinish={(s) => handleFinish('sql', s)} />}
          {activeGame === 'chart' && <ChartGuesser key={key} lang={lang} onFinish={(s) => handleFinish('chart', s)} />}
          {activeGame === 'detective' && <DataDetective key={key} lang={lang} onFinish={(s) => handleFinish('detective', s)} />}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {GAMES.map(g => (
            <div key={g.id} style={{ background: isDark ? '#011221' : 'var(--color-background-primary)', border: borderClass, borderRadius: 'var(--border-radius-lg)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--border-radius-md)', background: `${g.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.color, flexShrink: 0 }}>
                {g.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>{g.title[lang]}</span>
                  {scores[g.id] !== null && (
                    <ScoreBadge score={scores[g.id]} total={g.maxScore} />
                  )}
                </div>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: '0 0 4px', lineHeight: 1.5 }}>{g.desc[lang]}</p>
                <span style={{ fontSize: 11, color: g.color, background: `${g.color}15`, padding: '2px 8px', borderRadius: 20 }}>{g.tag[lang]}</span>
              </div>
              <button onClick={() => startGame(g.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 'var(--border-radius-md)', fontSize: 13, cursor: 'pointer', color: g.color, border: `1px solid ${g.color}`, background: `${g.color}10`, fontWeight: 500, flexShrink: 0, whiteSpace: 'nowrap' }}>
                {scores[g.id] !== null ? <RefreshCw size={13} /> : <ChevronRight size={13} />}
                {scores[g.id] !== null ? (lang === 'id' ? 'Main Lagi' : 'Replay') : (lang === 'id' ? 'Mulai' : 'Play')}
              </button>
            </div>
          ))}

          {Object.values(scores).some(s => s !== null) && (
            <div style={{ padding: '10px 16px', background: isDark ? 'rgba(77,91,206,0.08)' : 'rgba(77,91,206,0.06)', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(77,91,206,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={14} style={{ color: '#FEA55F', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                {lang === 'id' ? 'Total skor: ' : 'Total score: '}
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                  {Object.values(scores).filter(s => s !== null).reduce((a, b) => a + b, 0)}{' '}
                  {lang === 'id' ? 'poin dari game yang sudah dimainkan' : 'points from played games'}
                </span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
