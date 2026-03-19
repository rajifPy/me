'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/data/translations'
import {
  X, Send, RefreshCw, Copy, Check,
  ChevronDown, Sparkles, Bot, User
} from 'lucide-react'

// ─── Knowledge Base ────────────────────────────────────────────────────────────
const KB = {
  name: 'Muhammad Rajif Al Farikhi',
  role: { en: 'Data Enthusiast & Analyst', id: 'Penggemar & Analis Data' },
  location: 'Surabaya, Indonesia',
  email: 'mrajifalfarikhi@gmail.com',
  phone: '+6281460326800',
  github: 'github.com/rajfiPy',
  linkedin: 'linkedin.com/in/muhammadrajifalfarikhi',
  education: [
    { school: 'Universitas Airlangga', degree: { en: 'Bachelor of Information Systems', id: 'Sarjana Sistem Informasi' }, period: '2020–2024', gpa: '3.3/4.0' },
    { school: "MAS Hasyim Asy'ari", degree: { en: 'Science Major', id: 'Jurusan IPA' }, period: '2017–2020' },
  ],
  experience: {
    en: [
      { title: 'Data Analyst', company: 'Information Systems & Digitalization, UNAIR', period: 'Jan–Feb 2025', highlight: 'Repaired and optimized healthcare database systems' },
      { title: 'Machine Learning Student', company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)', period: 'Feb 2021–Dec 2022', highlight: 'Built a capstone NLP fact-checking system' },
      { title: 'Head of Media & Information Division', company: 'UKMKI Universitas Airlangga', period: 'Feb–Dec 2022', highlight: 'Grew social media followers by 50%, won Best Staff award' },
    ],
    id: [
      { title: 'Analis Data', company: 'Sistem Informasi & Digitalisasi, UNAIR', period: 'Jan–Feb 2025', highlight: 'Memperbaiki dan mengoptimalkan sistem database layanan kesehatan' },
      { title: 'Siswa Machine Learning', company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)', period: 'Feb 2021–Des 2022', highlight: 'Membangun sistem fact-checking berbasis NLP sebagai capstone' },
      { title: 'Kepala Divisi Media & Informasi', company: 'UKMKI Universitas Airlangga', period: 'Feb–Des 2022', highlight: 'Menambah pengikut media sosial 50%, meraih penghargaan Staf Terbaik' },
    ],
  },
  skills: { top: ['Data Analysis (80%)', 'Pandas (90%)', 'Python (75%)', 'SQL (75%)', 'Time Series (75%)'], programming: ['Python', 'SQL', 'R', 'JavaScript'], ds: ['Data Analysis', 'Machine Learning', 'NLP', 'Deep Learning', 'Time Series'], tools: ['Pandas', 'Scikit-learn', 'TensorFlow', 'NumPy', 'Jupyter'], viz: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI'] },
  projects: {
    en: [
      { name: 'Web Kost Management', tech: 'React + PostgreSQL', desc: 'Property management system for boarding houses', link: 'kostmanagerv1.vercel.app' },
      { name: 'LoveRegex', tech: 'Flask + Python + NLP', desc: 'Interactive regex learning platform with real-time feedback', link: 'loveregex.vercel.app' },
      { name: 'ML Bangkit Capstone', tech: 'Python + NLP', desc: 'NLP-based fact-checking system' },
      { name: 'Healthcare Database', tech: 'SQL + PostgreSQL', desc: 'Database optimization for UNAIR health service' },
    ],
    id: [
      { name: 'Web Kost Management', tech: 'React + PostgreSQL', desc: 'Sistem manajemen properti untuk bisnis kos-kosan', link: 'kostmanagerv1.vercel.app' },
      { name: 'LoveRegex', tech: 'Flask + Python + NLP', desc: 'Platform belajar regex interaktif dengan umpan balik waktu nyata', link: 'loveregex.vercel.app' },
      { name: 'ML Bangkit Capstone', tech: 'Python + NLP', desc: 'Sistem pengecekan fakta berbasis NLP' },
      { name: 'Database Kesehatan', tech: 'SQL + PostgreSQL', desc: 'Optimasi database layanan kesehatan UNAIR' },
    ],
  },
  certs: {
    en: ['Data Science Fundamentals — Bangkit Academy (2022)', 'Machine Learning Path — Bangkit/Google (2022)', 'SQL for Data Analysis — DataCamp (2023)', 'Data Visualization with Tableau (2023)', 'Python for Data Science — IBM (2023)', 'Google Analytics — Google (2023)'],
    id: ['Dasar-dasar Ilmu Data — Bangkit Academy (2022)', 'Jalur Machine Learning — Bangkit/Google (2022)', 'SQL untuk Analisis Data — DataCamp (2023)', 'Visualisasi Data dengan Tableau (2023)', 'Python untuk Ilmu Data — IBM (2023)', 'Google Analytics — Google (2023)'],
  },
}

// ─── Response Generator (bilingual) ────────────────────────────────────────────
function getResponse(raw, lang = 'en') {
  const q = raw.toLowerCase().trim()
  const isID = lang === 'id'

  // helpers
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const exp  = KB.experience[lang]
  const proj = KB.projects[lang]
  const cert = KB.certs[lang]

  // ── Greetings ──────────────────────────────────────────────────────────────
  if (/^(hi|hello|hey|halo|hola|sup|yo|howdy|selamat\s*(pagi|siang|sore|malam)|assalamu|hai)/.test(q)) {
    return pick(isID ? [
      ['Halo! 👋', 'Saya di sini untuk menceritakan tentang Rajif — pekerjaannya, keahliannya, proyeknya, apa saja yang ingin kamu ketahui.', 'Mau tanya apa?'],
      ['Hai! 😊', 'Senang bisa ngobrol tentang Rajif.', 'Tanya saja tentang keahlian, pengalaman, proyek, atau cara menghubunginya!'],
      ['Halo! 👋', 'Saya tahu portofolio Rajif luar-dalam.', 'Silakan tanya apa saja — keahlian, proyek, pengalaman, semuanya bisa!'],
    ] : [
      ['Hey there! 👋', "I'm here to tell you all about Rajif — his work, skills, projects, whatever you're curious about.", 'What would you like to know?'],
      ['Hi! 😊', "Happy to chat about Rajif's background.", 'Ask me about his skills, experience, projects, or how to get in touch!'],
      ['Hello! 👋', "I know Rajif's portfolio inside out.", 'Feel free to ask me anything — skills, projects, experience, you name it.'],
    ])
  }

  // ── Who are you ────────────────────────────────────────────────────────────
  if (/who are you|what are you|introduce yourself|kamu siapa|kamu apa|perkenalkan diri/.test(q)) {
    return isID
      ? ['Saya asisten AI khusus yang dibuat untuk portofolio Rajif. 🤖', 'Saya tahu segalanya tentang dia — latar belakang, keahlian, proyek, dan pengalaman.', 'Mau tahu apa?']
      : ["I'm a custom AI assistant built into Rajif's portfolio. 🤖", 'I know everything about him — background, skills, projects, and experience.', 'What would you like to know?']
  }

  // ── Who is Rajif ───────────────────────────────────────────────────────────
  if (/who is rajif|about rajif|tell me about|siapa rajif|cerita tentang rajif|perkenalkan rajif/.test(q)) {
    return isID ? [
      `Rajif — ${KB.name} — adalah ${KB.role.id} yang berbasis di ${KB.location}. 📍`,
      'Ia lulus dari Universitas Airlangga dengan gelar Sistem Informasi, dengan fokus pada analitik data.',
      'Keunggulan terbesarnya adalah mengubah data yang berantakan menjadi wawasan yang jelas. Paling kuat di analisis data, SQL, dan Python.',
      'Oh ya, dia juga menyematkan game ular di halaman portofolionya, yang menunjukkan banyak hal tentang kepribadiannya. 🐍',
    ] : [
      `Rajif — ${KB.name} — is a ${KB.role.en} based in ${KB.location}. 📍`,
      'He graduated from Universitas Airlangga with a degree in Information Systems, focusing on data analytics.',
      'His strongest suit is turning messy data into clear insights. Best at data analysis, SQL, and Python.',
      'Oh, and he built a snake game into his portfolio landing page, which tells you something about him. 🐍',
    ]
  }

  // ── Skills ─────────────────────────────────────────────────────────────────
  if (/skill|tech|stack|know|good at|expert|proficien|language|tool|keahlian|teknologi|mahir|bisa|jago/.test(q)) {
    return isID ? [
      'Pertanyaan bagus! Toolkit Rajif cukup solid. 🛠️',
      `Bidang terkuat: **${KB.skills.top.join(', ')}**.`,
      `Bahasa pemrograman: ${KB.skills.programming.join(', ')}.`,
      `Sisi ilmu data: ${KB.skills.ds.join(', ')}.`,
      `Visualisasi: ${KB.skills.viz.join(', ')}.`,
      'Kalau harus pilih satu yang menonjol — Pandas di 90%. Dia hampir fasih menggunakannya. 🐼',
    ] : [
      "Great question! Rajif's toolkit is pretty solid. 🛠️",
      `His strongest areas: **${KB.skills.top.join(', ')}**.`,
      `Programming languages: ${KB.skills.programming.join(', ')}.`,
      `Data science side: ${KB.skills.ds.join(', ')}.`,
      `Visualization: ${KB.skills.viz.join(', ')}.`,
      "If I had to pick one standout — Pandas at 90% proficiency. He's basically fluent in it. 🐼",
    ]
  }

  // ── Python ─────────────────────────────────────────────────────────────────
  if (/\bpython\b/.test(q)) {
    return isID ? [
      'Python adalah senjata utama Rajif. 🐍',
      '3 tahun, 15+ proyek, profisiensi 75%.',
      'Stack andalan: Pandas untuk wrangling, Scikit-learn untuk ML, Matplotlib/Seaborn untuk visualisasi.',
      'Juga menggunakan Flask untuk backend (lihat LoveRegex) dan TensorFlow untuk deep learning.',
    ] : [
      "Python is Rajif's main weapon. 🐍",
      '3 years, 15+ projects, 75% proficiency.',
      'Go-to stack: Pandas for wrangling, Scikit-learn for ML, Matplotlib/Seaborn for visualization.',
      'Also done Flask for backend (check LoveRegex) and TensorFlow for deep learning.',
    ]
  }

  // ── SQL / Database ─────────────────────────────────────────────────────────
  if (/\bsql\b|database|postgres|mysql|query|basis data/.test(q)) {
    return isID ? [
      'SQL adalah salah satu keahlian inti Rajif — 75%, 3 tahun, 12+ proyek. 💾',
      'Bekerja dengan PostgreSQL dan MySQL — window functions, CTE, optimasi kueri.',
      'Terbaru: memperbaiki database kesehatan di UNAIR. Data produksi nyata.',
    ] : [
      "SQL is one of Rajif's core skills — 75%, 3 years, 12+ projects. 💾",
      'Works with PostgreSQL and MySQL — window functions, CTEs, query optimization.',
      'Most recent: repairing a healthcare database at UNAIR. Real production data.',
    ]
  }

  // ── Machine Learning / AI ──────────────────────────────────────────────────
  if (/machine.?learn|ml\b|deep.?learn|neural|tensorflow|sklearn|model|\bai\b|kecerdasan buatan|pembelajaran mesin/.test(q)) {
    return isID ? [
      'ML adalah sesuatu yang Rajif tekuni dengan serius — jalur ML Bangkit Academy penuh didukung Google. 🤖',
      'Profisiensi 60%, 10+ proyek ML mencakup supervised/unsupervised learning.',
      'Capstone Bangkit adalah sistem pengecekan fakta menggunakan klasifikasi teks NLP.',
      'Masih berkembang dalam deep learning (40%) — jujur soal ini, yang penting dalam dunia data.',
    ] : [
      "ML is something Rajif takes seriously — full Bangkit Academy ML path backed by Google. 🤖",
      'Proficiency at 60%, 10+ ML projects covering supervised/unsupervised learning.',
      "Bangkit capstone was a fact-checking system using NLP text classification.",
      "Still growing in deep learning (40%) — honest about it, which matters in data work.",
    ]
  }

  // ── Experience ─────────────────────────────────────────────────────────────
  if (/experience|work|job|career|employ|intern|professional|pengalaman|kerja|karir|magang/.test(q)) {
    return isID ? [
      'Rajif memiliki kombinasi pengalaman nyata dan pelatihan. Ringkasan cepat: 📋',
      `**${exp[0].title}** di ${exp[0].company} (${exp[0].period}) — ${exp[0].highlight}.`,
      `**${exp[1].title}** di ${exp[1].company} (${exp[1].period}) — ${exp[1].highlight}.`,
      `**${exp[2].title}** di ${exp[2].company} — ${exp[2].highlight}. 🏆`,
    ] : [
      "Rajif has a mix of real-world and training experience. Quick rundown: 📋",
      `**${exp[0].title}** at ${exp[0].company} (${exp[0].period}) — ${exp[0].highlight}.`,
      `**${exp[1].title}** at ${exp[1].company} (${exp[1].period}) — ${exp[1].highlight}.`,
      `**${exp[2].title}** at ${exp[2].company} — ${exp[2].highlight}. 🏆`,
    ]
  }

  // ── Education ──────────────────────────────────────────────────────────────
  if (/education|study|university|college|school|degree|gpa|academic|unair|pendidikan|kuliah|universitas|sekolah/.test(q)) {
    return isID ? [
      `Rajif belajar di **${KB.education[0].school}** — ${KB.education[0].degree.id}, lulus tahun 2024. 🎓`,
      `IPK: ${KB.education[0].gpa}. Fokus: Analitik Data & Sistem Informasi.`,
      'Juga menyelesaikan program ML Bangkit Academy — didukung Google, Tokopedia, Gojek, dan Traveloka.',
    ] : [
      `Rajif studied at **${KB.education[0].school}** — ${KB.education[0].degree.en}, graduating in 2024. 🎓`,
      `GPA: ${KB.education[0].gpa}. Focus: Data Analytics & Information Systems.`,
      "Also completed Bangkit Academy's ML program — backed by Google, Tokopedia, Gojek, and Traveloka.",
    ]
  }

  // ── Projects ───────────────────────────────────────────────────────────────
  if (/project|portfolio|build|create|develop|\bapp\b|web|proyek|portofolio|buat|aplikasi/.test(q)) {
    return isID ? [
      'Rajif memiliki beberapa proyek menarik. Sorotan: 🚀',
      `**${proj[0].name}** (${proj[0].tech}) — ${proj[0].desc}. Live di ${proj[0].link}.`,
      `**${proj[1].name}** (${proj[1].tech}) — ${proj[1].desc}. Live di ${proj[1].link}.`,
      `**${proj[2].name}** (${proj[2].tech}) — ${proj[2].desc}.`,
      'Proyek-proyeknya condong ke data dan ML, tapi proyek React menunjukkan dia bisa full-stack.',
    ] : [
      "Rajif has some interesting projects across the stack. Highlights: 🚀",
      `**${proj[0].name}** (${proj[0].tech}) — ${proj[0].desc}. Live at ${proj[0].link}.`,
      `**${proj[1].name}** (${proj[1].tech}) — ${proj[1].desc}. Live at ${proj[1].link}.`,
      `**${proj[2].name}** (${proj[2].tech}) — ${proj[2].desc}.`,
      "Projects lean toward data and ML, but the React project shows he can go full-stack.",
    ]
  }

  // ── Kost ──────────────────────────────────────────────────────────────────
  if (/kost|kostmanager|boarding|indekos/.test(q)) {
    return isID ? [
      'Web Kost Management adalah sistem manajemen properti untuk bisnis kos-kosan. 🏠',
      `Teknologi: ${proj[0].tech}.`,
      `Live di kostmanagerv1.vercel.app — layak dicek untuk melihat sisi full-stack-nya.`,
    ] : [
      'Web Kost Management is a property management system for boarding house businesses. 🏠',
      `Stack: ${proj[0].tech}.`,
      'Live at kostmanagerv1.vercel.app — worth checking out to see his full-stack side.',
    ]
  }

  // ── LoveRegex ─────────────────────────────────────────────────────────────
  if (/regex|loveregex/.test(q)) {
    return isID ? [
      'LoveRegex adalah salah satu proyeknya yang paling kreatif — platform belajar regex interaktif. 💡',
      `Dibangun dengan ${proj[1].tech}, memberikan umpan balik waktu nyata saat kamu berlatih regular expression.`,
      'Live di loveregex.vercel.app. Mengejutkan, cukup menyenangkan digunakan.',
    ] : [
      "LoveRegex is one of his more creative projects — interactive regex learning platform. 💡",
      `Built with ${proj[1].tech}, gives real-time feedback as you practice regular expressions.`,
      'Live at loveregex.vercel.app. Surprisingly fun to use.',
    ]
  }

  // ── Certifications ─────────────────────────────────────────────────────────
  if (/cert|credential|badge|course|sertifikat|sertifikasi/.test(q)) {
    return isID ? [
      'Rajif telah mengumpulkan sertifikasi yang solid: 📜',
      ...cert.map(c => `✓ ${c}`),
      'Yang dari Bangkit sangat menonjol — program yang sangat kompetitif.',
    ] : [
      "Rajif has stacked up some solid certifications: 📜",
      ...cert.map(c => `✓ ${c}`),
      'The Bangkit ones are particularly notable — very competitive program.',
    ]
  }

  // ── Contact ────────────────────────────────────────────────────────────────
  if (/contact|reach|email|phone|connect|hire|work with|get in touch|linkedin|github|kontak|hubungi|rekrut/.test(q)) {
    return isID ? [
      'Berikut cara menghubungi Rajif: 📬',
      `📧 Email: ${KB.email}`,
      `📱 Telepon: ${KB.phone}`,
      `💼 LinkedIn: ${KB.linkedin}`,
      `💻 GitHub: ${KB.github}`,
      'Terbuka untuk posisi analis data dan kolaborasi. Terbaik melalui email atau LinkedIn!',
    ] : [
      "Here's how to reach Rajif: 📬",
      `📧 Email: ${KB.email}`,
      `📱 Phone: ${KB.phone}`,
      `💼 LinkedIn: ${KB.linkedin}`,
      `💻 GitHub: ${KB.github}`,
      'Open to data analyst roles and collaborations. Best via email or LinkedIn!',
    ]
  }

  // ── Hire / Available ───────────────────────────────────────────────────────
  if (/hire|available|open to|opportunit|\bjob\b|position|role|recruit|freelanc|lowongan|tersedia|rekrut/.test(q)) {
    return isID ? [
      'Rajif terbuka untuk posisi analis data dan kolaborasi. 🙌',
      'Latar belakang terkuat di analisis data, SQL, dan Python.',
      `Cara terbaik menghubungi: ${KB.email} atau LinkedIn di ${KB.linkedin}.`,
    ] : [
      "Rajif is open to data analyst roles and collaborations. 🙌",
      'Background strongest in data analysis, SQL, and Python.',
      `Best way to reach out: ${KB.email} or LinkedIn at ${KB.linkedin}.`,
    ]
  }

  // ── Fun fact ───────────────────────────────────────────────────────────────
  if (/fun fact|interesting|personality|hobbies|fakta menarik|kepribadian|hobi|unik/.test(q)) {
    return isID ? [
      'Beberapa hal yang membuat Rajif menonjol: 🌟',
      '• Percaya pembersihan data adalah 80% pekerjaan',
      '• Menyematkan game ular di halaman portofolionya',
      '• Berasal dari desa — bersemangat memberdayakan pemuda pedesaan',
      '• Blogger aktif menulis tentang data, karir, dan kehidupan',
    ] : [
      "A few things that make Rajif stand out: 🌟",
      '• Believes data cleaning is literally 80% of the job',
      '• Built a snake game into his portfolio landing page',
      "• Originally from a village — passionate about rural youth empowerment",
      '• Active blogger writing about data, career, and life',
    ]
  }

  // ── Snake game ─────────────────────────────────────────────────────────────
  if (/snake|game|ular/.test(q)) {
    return isID ? [
      'Ha, ya — Rajif menyematkan game ular yang bisa dimainkan penuh di halaman portofolionya. 🐍',
      'Kamu harus memainkannya (atau melompatinya) untuk membuka sisa portofolio.',
      'Cara yang menyenangkan untuk menunjukkan kepribadian sekaligus flex halus bahwa dia bisa bikin game interaktif.',
    ] : [
      "Ha, yeah — Rajif embedded a fully playable snake game in his portfolio's landing page. 🐍",
      'You have to play through it (or skip it) to unlock the rest of the portfolio.',
      'Fun way to show personality and a subtle flex that he can build interactive games.',
    ]
  }

  // ── Blog ──────────────────────────────────────────────────────────────────
  if (/blog|write|writing|article|post|thought|tulisan|artikel/.test(q)) {
    return isID ? [
      'Rajif menulis tentang beberapa topik: 📝',
      '• Praktik terbaik pembersihan data (80% pekerjaan, dia bersikeras)',
      '• Perjalanan karir dari mahasiswa ke analis',
      '• Teknik optimasi SQL',
      '• Pemberdayaan pemuda pedesaan dan akses teknologi',
    ] : [
      "Rajif writes on a few topics: 📝",
      '• Data cleaning best practices (80% of the job, he insists)',
      '• Career journey from student to analyst',
      '• SQL optimization techniques',
      '• Rural youth empowerment and tech access',
    ]
  }

  // ── Strength / Weakness ────────────────────────────────────────────────────
  if (/strength|weakness|improve|grow|learning|kekuatan|kelemahan|berkembang|belajar/.test(q)) {
    return isID ? [
      'Kekuatan jelas Rajif: analisis data, SQL, Pandas, Python — semua profisiensi 75%+. 💪',
      'Masih berkembang: deep learning (40%) dan Docker/MLOps (45%). Dia terbuka tentang kekurangannya.',
      'Tidak berpura-pura tahu hal-hal yang belum dikuasai — itu penting dalam dunia data.',
    ] : [
      "Rajif's clear strengths: data analysis, SQL, Pandas, Python — all 75%+ proficiency. 💪",
      "Still growing: deep learning (40%) and Docker/MLOps (45%). He's open about gaps.",
      "Not pretending to know things he doesn't — that matters in data work.",
    ]
  }

  // ── Visualization ──────────────────────────────────────────────────────────
  if (/tableau|visuali|dashboard|chart|plot|graph|matplotlib|seaborn|plotly|grafik|diagram/.test(q)) {
    return isID ? [
      'Visualisasi adalah bagian solid dari keahlian Rajif. 📊',
      'Matplotlib & Seaborn untuk grafik Python, Plotly untuk dashboard interaktif, Tableau untuk BI.',
      'Membangun dashboard analitik sosial yang melacak metrik pertumbuhan 50% — ada di proyeknya.',
    ] : [
      "Visualization is a solid part of Rajif's skillset. 📊",
      'Matplotlib & Seaborn for Python charts, Plotly for interactive dashboards, Tableau for BI.',
      'Built a social analytics dashboard tracking 50% growth metrics — in his projects.',
    ]
  }

  // ── Thanks ─────────────────────────────────────────────────────────────────
  if (/thank|thanks|thx|\bty\b|cheers|appreciate|makasih|terima kasih/.test(q)) {
    return pick(isID ? [
      ['Sama-sama! 😊', 'Silakan tanya apa saja lagi tentang Rajif.'],
      ['Tentu saja! 👋', 'Beritahu saya jika ada hal lain yang ingin diketahui.'],
      ['Dengan senang hati! 🙌', 'Ada yang bisa saya bantu lagi?'],
    ] : [
      ['Happy to help! 😊', 'Feel free to ask anything else about Rajif.'],
      ['Anytime! 👋', "Let me know if there's anything else you'd like to know."],
      ['Of course! 🙌', 'Is there anything else I can help with?'],
    ])
  }

  // ── Short replies ──────────────────────────────────────────────────────────
  if (/^(yes|no|ok|okay|sure|yep|nope|alright|cool|nice|great|wow|awesome|iya|oke|siap|boleh|bagus|asyik)[\s!.]*$/.test(q)) {
    return isID
      ? ['Oke! 😄', 'Ada hal lain yang ingin ditanyakan tentang Rajif?']
      : ["Got it! 😄", "Anything else you'd like to know about Rajif?"]
  }

  // ── Fallback ───────────────────────────────────────────────────────────────
  return pick(isID ? [
    ['Hmm, kurang yakin dengan itu! 🤔', 'Saya paling bisa menjawab pertanyaan tentang keahlian, pengalaman, proyek, atau kontak Rajif.', 'Bisa diulangi, atau coba salah satu topik cepat di bawah?'],
    ['Pertanyaan itu sedikit di luar basis pengetahuan saya. 😅', 'Coba tanya tentang keahlian, proyek, pengalaman kerja, atau pendidikannya!'],
    ['Kurang yakin dengan yang dimaksud. 🙏', 'Paling bisa menjawab seperti: *Apa keahliannya?* atau *Ceritakan proyeknya.*'],
  ] : [
    ["Hmm, I'm not sure I caught that! 🤔", "I'm best at questions about Rajif's skills, experience, projects, or contact info.", "Could you rephrase, or try one of the quick topics below?"],
    ["That one's a bit outside my knowledge base. 😅", 'Try asking about his skills, projects, work experience, or education!'],
    ["Not quite sure what you're asking. 🙏", 'Best at questions like: *What are his skills?* or *Tell me about his projects.*'],
  ])
}

// ─── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter() {
  const [isTyping, setIsTyping] = useState(false)
  const timersRef = useRef([])
  const clearAll = useCallback(() => { timersRef.current.forEach(clearTimeout); timersRef.current = [] }, [])
  const type = useCallback((chunks, onProgress, onDone) => {
    clearAll(); setIsTyping(true)
    let chunkIdx = 0, charIdx = 0, currentText = ''
    const tick = () => {
      const chunk = chunks[chunkIdx]
      if (!chunk) { setIsTyping(false); onDone?.(); return }
      if (charIdx < chunk.length) {
        currentText += chunk[charIdx]; charIdx++
        onProgress(chunkIdx, currentText, false)
        const ch = chunk[charIdx - 1]
        const delay = /[.!?]/.test(ch) ? 55 : ch === ',' ? 35 : ch === ' ' ? 10 : 16
        timersRef.current.push(setTimeout(tick, delay))
      } else {
        onProgress(chunkIdx, currentText, true)
        chunkIdx++; charIdx = 0; currentText = ''
        if (chunkIdx < chunks.length) { timersRef.current.push(setTimeout(tick, 260)) }
        else { setIsTyping(false); onDone?.() }
      }
    }
    timersRef.current.push(setTimeout(tick, 100))
  }, [clearAll])
  const stop = useCallback(() => { clearAll(); setIsTyping(false) }, [clearAll])
  useEffect(() => () => clearAll(), [clearAll])
  return { type, stop, isTyping }
}

// ─── Render markdown-ish ───────────────────────────────────────────────────────
function MsgContent({ text }) {
  if (!text) return null
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {text.split('\n').map((line, i) => {
        if (!line) return <div key={i} className="h-1" />
        if (/^\*\*(.+)\*\*$/.test(line.trim())) return <p key={i} className="font-semibold text-accent-teal mt-1.5 first:mt-0">{line.replace(/\*\*/g, '')}</p>
        const html = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        if (/^[•✓✗*-]/.test(line.trim())) return <p key={i} className="pl-3 border-l-2 border-accent-teal/30" dangerouslySetInnerHTML={{ __html: html }} />
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AIChatbot({ activeSection }) {
  const { theme }    = useTheme()
  const { language } = useLanguage()
  const t            = useTranslation(language)
  const ui           = t.chatbot

  const [isOpen,       setIsOpen]       = useState(false)
  const [isMinimized,  setIsMinimized]  = useState(false)
  const [input,        setInput]        = useState('')
  const [copied,       setCopied]       = useState(null)
  const [messages,     setMessages]     = useState(null) // init lazily after mount

  const { type, stop, isTyping } = useTypewriter()
  const messagesEndRef  = useRef(null)
  const inputRef        = useRef(null)
  const queueRef        = useRef([])
  const processingRef   = useRef(false)
  const prevLangRef     = useRef(language)

  // ── Init messages once on mount ────────────────────────────────────────────
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      displayed: [language === 'id'
        ? 'Halo! 👋\n\nSaya asisten AI Rajif.\n\nTanya apa saja — atau pilih topik di bawah!'
        : "Hey! 👋\n\nI'm Rajif's AI assistant.\n\nAsk me anything — or pick a topic below!"],
      done: true,
      timestamp: new Date(),
    }])
    prevLangRef.current = language
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Reset conversation when language switches ──────────────────────────────
  useEffect(() => {
    if (prevLangRef.current === language) return
    prevLangRef.current = language
    stop()
    queueRef.current = []
    processingRef.current = false
    setInput('')
    setMessages([{
      role: 'assistant',
      displayed: [language === 'id'
        ? 'Bahasa diganti ke Indonesia! 🇮🇩\n\nSekarang saya bisa menjawab dalam Bahasa Indonesia.\n\nTanya apa saja tentang Rajif!'
        : 'Language switched to English! 🇬🇧\n\nI\'ll now respond in English.\n\nAsk me anything about Rajif!'],
      done: true,
      timestamp: new Date(),
    }])
  }, [language, stop])

  const processQueue = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return
    processingRef.current = true
    const { chunks, msgIdx } = queueRef.current[0]
    type(chunks,
      (chunkIdx, text) => {
        setMessages(list => {
          if (!list?.[msgIdx]) return list
          const copy = [...list]; const disp = [...copy[msgIdx].displayed]
          disp[chunkIdx] = text; copy[msgIdx] = { ...copy[msgIdx], displayed: disp }
          return copy
        })
      },
      () => {
        setMessages(list => {
          if (!list?.[msgIdx]) return list
          const copy = [...list]; copy[msgIdx] = { ...copy[msgIdx], done: true }; return copy
        })
        queueRef.current.shift(); processingRef.current = false; processQueue()
      }
    )
  }, [type])

  useEffect(() => {
    if (isOpen && !isMinimized) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen, isMinimized])

  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => inputRef.current?.focus(), 150)
  }, [isOpen, isMinimized])

  useEffect(() => () => { stop(); queueRef.current = []; processingRef.current = false }, [stop])

  if (activeSection !== 'hello') return null
  if (!messages) return null

  const sendMessage = (text) => {
    const userText = (text || input).trim(); if (!userText) return; setInput('')
    const chunks = getResponse(userText, language)
    setMessages(prev => {
      const botMsg = { role: 'assistant', displayed: Array(chunks.length).fill(''), done: false, timestamp: new Date() }
      const next = [...prev, { role: 'user', displayed: [userText], done: true, timestamp: new Date() }, botMsg]
      const msgIdx = next.length - 1
      queueRef.current.push({ chunks, msgIdx })
      setTimeout(() => processQueue(), 0)
      return next
    })
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  const reset = () => {
    stop(); queueRef.current = []; processingRef.current = false; setInput('')
    setMessages([{ role: 'assistant', displayed: [ui.freshStart], done: true, timestamp: new Date() }])
  }

  const copyMsg = (text, i) => { navigator.clipboard.writeText(text); setCopied(i); setTimeout(() => setCopied(null), 2000) }
  const getFullText = (msg) => msg.displayed.filter(Boolean).join('\n\n')

  const isDark = theme === 'dark'
  const bg     = isDark ? 'bg-[#011627]'     : 'bg-white'
  const bgSub  = isDark ? 'bg-[#011221]'     : 'bg-gray-50'
  const border = isDark ? 'border-[#1E2D3D]' : 'border-gray-200'
  const muted  = isDark ? 'text-[#607B96]'   : 'text-gray-400'
  const bold   = isDark ? 'text-white'        : 'text-gray-900'

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-accent-teal text-[#011627]' : 'bg-accent-blue text-white'}`}
          aria-label={ui.askAI}>
          <Sparkles size={18} />
          <span className="text-sm font-semibold">{ui.askAI}</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-40 flex flex-col rounded-2xl shadow-2xl border transition-all duration-200 ${bg} ${border} ${isMinimized ? 'h-14 w-72' : 'w-[22rem] h-[580px]'}`}
          style={{ maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 48px)' }}>

          {/* Header */}
          <div className={`flex items-center gap-3 px-4 py-3 border-b rounded-t-2xl flex-shrink-0 ${bgSub} ${border}`}>
            <div className="relative flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-accent-teal/20' : 'bg-accent-blue/10'}`}>
                <Bot size={16} className={isDark ? 'text-accent-teal' : 'text-accent-blue'} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2" style={{ borderColor: isDark ? '#011221' : '#f9fafb' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${bold}`}>{ui.rajifAI}</p>
              {!isMinimized && (
                <p className={`text-xs truncate ${muted}`}>
                  {isTyping ? (
                    <span className="flex items-center gap-1">
                      <span className="inline-flex gap-0.5">
                        {[0,1,2].map(i => <span key={i} className="w-1 h-1 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: `${i*150}ms` }} />)}
                      </span>
                      {ui.typing}
                    </span>
                  ) : ui.askAnything}
                </p>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <button onClick={reset} title="Reset" className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#1E2D3D]' : 'hover:bg-gray-100'}`}><RefreshCw size={13} className={muted} /></button>
              <button onClick={() => setIsMinimized(v => !v)} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#1E2D3D]' : 'hover:bg-gray-100'}`}><ChevronDown size={13} className={`${muted} transition-transform ${isMinimized ? 'rotate-180' : ''}`} /></button>
              <button onClick={() => { setIsOpen(false); setIsMinimized(false) }} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#1E2D3D]' : 'hover:bg-gray-100'}`}><X size={13} className={muted} /></button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 min-h-0">
                {messages.map((msg, i) => {
                  const text   = getFullText(msg)
                  const isUser = msg.role === 'user'
                  const showCursor = !isUser && i === messages.length - 1 && !msg.done
                  return (
                    <div key={i} className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${isUser ? isDark ? 'bg-accent-blue/30' : 'bg-accent-blue/10' : isDark ? 'bg-accent-teal/20' : 'bg-accent-teal/10'}`}>
                        {isUser ? <User size={12} className="text-accent-blue" /> : <Bot size={12} className="text-accent-teal" />}
                      </div>
                      <div className="group relative max-w-[80%]">
                        <div className={`px-3 py-2.5 rounded-2xl ${isUser ? 'bg-accent-blue text-white rounded-tr-sm' : isDark ? `${bgSub} ${bold} rounded-tl-sm border ${border}` : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                          {isUser
                            ? <p className="text-sm leading-relaxed">{text}</p>
                            : <div><MsgContent text={text} />{showCursor && <span className="inline-block w-0.5 h-3.5 bg-accent-teal ml-0.5 align-middle animate-pulse" />}</div>}
                        </div>
                        <div className={`flex items-center gap-1 mt-1 px-0.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-[10px] ${muted}`}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {!isUser && msg.done && text && (
                            <button onClick={() => copyMsg(text, i)} className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded ${muted}`}>
                              {copied === i ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion chips — dari translations */}
              <div className={`px-4 pt-2 pb-1 border-t ${border} flex-shrink-0`}>
                <p className={`text-[10px] mb-1.5 ${muted}`}>{ui.quickQuestions}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ui.suggestions.map(s => (
                    <button key={s.label} onClick={() => sendMessage(s.prompt)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all active:scale-95 ${isDark ? `border-[#1E2D3D] ${muted} hover:border-accent-teal hover:text-accent-teal` : `border-gray-200 text-gray-400 hover:border-accent-blue hover:text-accent-blue`}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-4 pb-4 pt-2 flex-shrink-0">
                <div className={`flex gap-2 items-end rounded-xl border px-3 py-2 transition-colors ${isDark ? `${bgSub} border-[#1E2D3D] focus-within:border-accent-teal` : 'bg-gray-50 border-gray-200 focus-within:border-accent-blue'}`}>
                  <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                    placeholder={ui.placeholder} rows={1} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
                    className={`flex-1 bg-transparent text-sm resize-none outline-none max-h-20 min-h-[20px] leading-5 ${isDark ? 'text-white placeholder:text-[#607B96]' : 'text-gray-900 placeholder:text-gray-400'}`} />
                  <button onClick={() => sendMessage()} disabled={!input.trim()}
                    className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${!input.trim() ? 'opacity-25 cursor-not-allowed' : isDark ? 'bg-accent-teal text-[#011627] hover:bg-accent-teal/80 active:scale-95' : 'bg-accent-blue text-white hover:bg-accent-blue/80 active:scale-95'}`}>
                    <Send size={15} />
                  </button>
                </div>
                <p className={`text-[10px] mt-1.5 text-center ${muted}`}>{ui.enterSend}</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
