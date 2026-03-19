// src/data/translations.js

export const translations = {
  en: {
    // Navigation
    nav: {
      hello: '_hello',
      about: '_about-me',
      projects: '_projects',
      research: '_research',
      contact: '_contact-me',
    },

    // Hello Section
    hello: {
      greeting: 'Hi all, I am',
      role: 'Data Enthusiast',
      instruction1: '// complete the game to continue',
      instruction2: '// you can also see it on my Github page',
      githubConst: 'const',
      githubVar: 'githubLink',
    },

    // About Section
    about: {
      title: 'About Me',
      bioConst: 'const',
      bioVar: 'bio',
      name: 'Muhammad Rajif Al Farikhi',
      role: 'Data Enthusiast',
      location: 'Surabaya, Indonesia',
      interestsLabel: 'interests',
      interests: ['Data Analysis', 'Machine Learning', 'Data Visualization'],
      experience: 'Experience',
      skills: 'Skills & Technologies',
      skillsSubtitle: 'Technical expertise based on',
      skillsSubtitleSuffix: '+ projects',
      education: 'Education',
      contacts: 'contacts',
      email: 'email',
      phone: 'phone',
      personalInfo: 'personal-info',
      bio: 'bio',
      skillsNav: 'skills',
      codeSamples: 'code-samples',
      certifications: 'certifications',
      blog: 'blog',
      photos: 'photos',
      university: 'university',
      highSchool: 'high-school',
      // Skills Matrix
      category: 'Category:',
      sortBy: 'By Level',
      byLevel: 'By Level',
      byYears: 'By Experience',
      byProjects: 'By Projects',
      expert: 'Expert',
      advanced: 'Advanced',
      intermediate: 'Intermediate',
      beginner: 'Beginner',
      totalSkills: 'Skills',
      expertSkills: 'Expert',
      totalProjects: 'Projects',
      avgExp: 'Avg Exp',
      // Education
      uniName: 'Universitas Airlangga',
      uniDegree: 'Undergradute Data Science Tech',
      uniPeriod: '2021 - present',
      uniLocation: 'Surabaya, Indonesia',
      uniGpa: 'GPA: -',
      uniFocus: 'Focus: Data Sciens & Business',
      uniActive: 'Active in academic competitions',
      hsName: "MAS Hasyim Asy'ari",
      hsDegree: 'Science Major',
      hsPeriod: '2017 - 2020',
      hsLocation: 'Jepara, Indonesia',
      hsFocus: 'Mathematics & Science focus',
      hsActive: 'Active in extracurricular activities',
    },

    // Experience
    experience: {
      title: 'Experience',
      analyst: {
        title: 'Data Analyst',
        company: 'Information Systems & Digitalization, UNAIR',
        period: 'Jan 2025 - Feb 2025',
        location: 'Surabaya',
        description: "Performing data repairs in the database system of Airlangga University's health service unit.",
        achievements: [
          'Cleaned and normalized large-scale health service database',
          'Eliminated data duplication in system records',
          'Improved database structure and integrity',
        ],
      },
      ml: {
        title: 'Machine Learning Student',
        company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
        period: 'Feb 2021 - Dec 2022',
        location: 'Remote',
        description: 'Completed intensive Machine Learning path covering foundational concepts to advanced AI techniques.',
        achievements: [
          'Mastered ML fundamentals and advanced techniques',
          'Built end-to-end ML projects',
          'Earned Data Science Fundamentals certification',
        ],
      },
      media: {
        title: 'Head Division - Media and Information',
        company: 'Social Service Dept, UKMKI Universitas Airlangga',
        period: 'Feb 2022 - Dec 2022',
        location: 'Surabaya',
        description: 'Led social media strategy and team coordination for organizational growth.',
        achievements: [
          'Increased social media followers by 50%',
          'Managed design and content strategy',
          'Coordinated team of staff members',
          'Awarded Best Staff in division',
        ],
      },
    },

    // Projects
    projects: {
      title: 'projects',
      filterBy: '// filter by:',
      clearAll: 'clear all',
      filtersSelected: 'filters selected',
      filterSelected: 'filter selected',
      noProjects: 'No projects found',
      noProjectsHint: 'Try selecting different filters',
      viewProject: 'view-project',
      repoProject: 'repo-project',
      filterTips: '// filter tips:',
      filterHint: 'Select multiple filters to see projects that use any of the selected technologies',
    },

    // Research
    research: {
      title: 'Research Papers',
      subtitle: 'Published research and academic work in data science and machine learning',
      papers: 'Papers',
      totalPages: 'Total Pages',
      categories: 'Categories',
      latest: 'Latest',
      filterBy: '// filter by category',
      showing: '// showing ',
      paper: 'paper',
      papers2: 'papers',
      readPaper: 'Read Paper',
      noFound: 'No papers found',
      noFoundHint: 'Try selecting a different category',
      published: 'Published:',
      doi: 'DOI:',
      keywords: 'Keywords:',
      page: 'Page',
      of: 'of',
      protected: '⚠️ This document is protected. Downloading is not permitted.',
    },

    // Contact
    contact: {
      title: 'Get In Touch',
      const: 'const',
      contactInfo: 'contactInfo',
      console: 'console',
      letsWork: "Let's work together on data projects!",
      available: '// Available for Data Analyst roles',
      open: '// Open to collaborations & opportunities',
    },

    // Footer
    footer: {
      findMe: 'find me in:',
      visitors: 'visitors',
      top: 'top:',
    },

    // Chatbot
    chatbot: {
      askAI: 'Ask AI',
      rajifAI: "Rajif's AI",
      typing: 'typing...',
      askAnything: 'Ask me anything',
      freshStart: 'Fresh start! 🔄\n\nWhat would you like to know about Rajif?',
      placeholder: 'Type your question here...',
      enterSend: 'Enter to send · Shift+Enter for new line',
      quickQuestions: 'Quick questions:',
      suggestions: [
        { label: '🛠 Skills', prompt: 'What are his strongest skills?' },
        { label: '🚀 Projects', prompt: 'Tell me about his projects' },
        { label: '💼 Experience', prompt: "What's his work experience?" },
        { label: '📬 Contact', prompt: 'How can I reach Rajif?' },
        { label: '🎓 Education', prompt: "What's his educational background?" },
        { label: '📜 Certs', prompt: 'What certifications does he have?' },
      ],
    },

    // Game
    game: {
      startGame: 'start-game',
      restart: 'restart',
      gameOver: 'GAME OVER',
      score: 'Score:',
      useArrows: '// use keyboard arrows or buttons below',
      wasdKeys: '// WASD keys also work',
      foodEaten: '// food eaten',
      skip: 'skip',
      audioPlaying: 'Audio Playing...',
      audioWait: 'Please wait until audio finishes',
      complete: '% complete',
      cannotSkip: '⚠️ You cannot skip until audio finishes playing',
    },

    // Visitor Counter
    visitor: {
      visitors: 'visitors',
      top: 'top:',
    },

    // Blog
    blog: {
      title: 'Thoughts & Insights',
      subtitle: 'Personal blog about data science, tech, and career learnings',
      posts: 'Posts',
      totalWords: 'Total Words',
      categories: 'Categories',
      latest: 'Latest',
      filterBy: '// filter by category',
      recent: 'Recent',
      readMore: 'Read more',
      noFound: 'No posts found',
      noFoundHint: 'Try selecting a different category',
      words: 'words',
    },

    // Certifications
    certs: {
      title: 'Certifications',
      filterBy: '// filter by category',
      showing: '// showing ',
      certification: 'certification',
      certifications: 'certifications',
      noFound: 'No certifications found',
      noFoundHint: 'Try selecting a different category',
      description: 'Description',
      issueDate: 'Issue Date',
      validity: 'Validity',
      category: 'Category',
      credentialId: 'Credential ID',
      skillsCovered: 'Skills Covered',
      verifyCredential: 'Verify Credential',
      viewDetails: 'View Details',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // INDONESIAN
  // ─────────────────────────────────────────────────────────────────────────────
  id: {
    // Navigation
    nav: {
      hello: '_beranda',
      about: '_tentang-saya',
      projects: '_proyek',
      research: '_penelitian',
      contact: '_hubungi-saya',
    },

    // Hello Section
    hello: {
      greeting: 'Halo semua, saya',
      role: 'Penggemar Data',
      instruction1: '// selesaikan game untuk melanjutkan',
      instruction2: '// kamu juga bisa lihat di halaman Github saya',
      githubConst: 'const',
      githubVar: 'tautanGithub',
    },

    // About Section
    about: {
      title: 'Tentang Saya',
      bioConst: 'const',
      bioVar: 'profil',
      name: 'Muhammad Rajif Al Farikhi',
      role: 'Penggemar Data',
      location: 'Surabaya, Indonesia',
      interestsLabel: 'minat',
      interests: ['Analisis Data', 'Machine Learning', 'Visualisasi Data'],
      experience: 'Pengalaman',
      skills: 'Keahlian & Teknologi',
      skillsSubtitle: 'Keahlian teknis berdasarkan',
      skillsSubtitleSuffix: '+ proyek',
      education: 'Pendidikan',
      contacts: 'kontak',
      email: 'email',
      phone: 'telepon',
      personalInfo: 'info-pribadi',
      bio: 'profil',
      skillsNav: 'keahlian',
      codeSamples: 'contoh-kode',
      certifications: 'sertifikasi',
      blog: 'blog',
      photos: 'foto',
      university: 'universitas',
      highSchool: 'sma',
      // Skills Matrix
      category: 'Kategori:',
      sortBy: 'Berdasarkan Level',
      byLevel: 'Berdasarkan Level',
      byYears: 'Berdasarkan Pengalaman',
      byProjects: 'Berdasarkan Proyek',
      expert: 'Ahli',
      advanced: 'Mahir',
      intermediate: 'Menengah',
      beginner: 'Pemula',
      totalSkills: 'Keahlian',
      expertSkills: 'Ahli',
      totalProjects: 'Proyek',
      avgExp: 'Rata-rata',
      // Education
      uniName: 'Universitas Airlangga',
      uniDegree: 'Mahasiswa Teknologi Sains Data',
      uniPeriod: '2020 - 2024',
      uniLocation: 'Surabaya, Indonesia',
      uniGpa: 'IPK: 3.3/4.0',
      uniFocus: 'Fokus: Analitik Data & Sistem Informasi',
      uniActive: 'Aktif dalam kompetisi akademik',
      hsName: "MAS Hasyim Asy'ari",
      hsDegree: 'Jurusan IPA',
      hsPeriod: '2017 - 2020',
      hsLocation: 'Jepara, Indonesia',
      hsFocus: 'Fokus Matematika & Sains',
      hsActive: 'Aktif dalam kegiatan ekstrakurikuler',
    },

    // Experience
    experience: {
      title: 'Pengalaman',
      analyst: {
        title: 'Analis Data',
        company: 'Sistem Informasi & Digitalisasi, UNAIR',
        period: 'Jan 2025 - Feb 2025',
        location: 'Surabaya',
        description: 'Melakukan perbaikan data pada sistem database unit layanan kesehatan Universitas Airlangga.',
        achievements: [
          'Membersihkan dan menormalisasi database layanan kesehatan skala besar',
          'Menghilangkan duplikasi data dalam catatan sistem',
          'Meningkatkan struktur dan integritas database',
        ],
      },
      ml: {
        title: 'Siswa Machine Learning',
        company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
        period: 'Feb 2021 - Des 2022',
        location: 'Daring',
        description: 'Menyelesaikan jalur Machine Learning intensif dari konsep dasar hingga teknik AI lanjutan.',
        achievements: [
          'Menguasai fundamental ML dan teknik lanjutan',
          'Membangun proyek ML end-to-end',
          'Mendapatkan sertifikasi Dasar-dasar Ilmu Data',
        ],
      },
      media: {
        title: 'Kepala Divisi Media dan Informasi',
        company: 'Dept. Layanan Sosial, UKMKI Universitas Airlangga',
        period: 'Feb 2022 - Des 2022',
        location: 'Surabaya',
        description: 'Memimpin strategi media sosial dan koordinasi tim untuk pertumbuhan organisasi.',
        achievements: [
          'Meningkatkan pengikut media sosial sebesar 50%',
          'Mengelola strategi desain dan konten',
          'Mengoordinasikan tim anggota staf',
          'Mendapat penghargaan Staf Terbaik di divisi',
        ],
      },
    },

    // Projects
    projects: {
      title: 'proyek',
      filterBy: '// filter berdasarkan:',
      clearAll: 'hapus semua',
      filtersSelected: 'filter dipilih',
      filterSelected: 'filter dipilih',
      noProjects: 'Tidak ada proyek ditemukan',
      noProjectsHint: 'Coba pilih filter yang berbeda',
      viewProject: 'lihat-proyek',
      repoProject: 'repo-proyek',
      filterTips: '// tips filter:',
      filterHint: 'Pilih beberapa filter untuk melihat proyek yang menggunakan teknologi yang dipilih',
    },

    // Research
    research: {
      title: 'Makalah Penelitian',
      subtitle: 'Penelitian dan karya akademik dalam ilmu data dan machine learning',
      papers: 'Makalah',
      totalPages: 'Total Halaman',
      categories: 'Kategori',
      latest: 'Terbaru',
      filterBy: '// filter berdasarkan kategori',
      showing: '// menampilkan ',
      paper: 'makalah',
      papers2: 'makalah',
      readPaper: 'Baca Makalah',
      noFound: 'Tidak ada makalah ditemukan',
      noFoundHint: 'Coba pilih kategori yang berbeda',
      published: 'Diterbitkan:',
      doi: 'DOI:',
      keywords: 'Kata Kunci:',
      page: 'Halaman',
      of: 'dari',
      protected: '⚠️ Dokumen ini dilindungi. Pengunduhan tidak diizinkan.',
    },

    // Contact
    contact: {
      title: 'Hubungi Saya',
      const: 'const',
      contactInfo: 'infoKontak',
      console: 'konsol',
      letsWork: 'Mari bekerja sama dalam proyek data!',
      available: '// Tersedia untuk posisi Analis Data',
      open: '// Terbuka untuk kolaborasi & peluang',
    },

    // Footer
    footer: {
      findMe: 'temukan saya di:',
      visitors: 'pengunjung',
      top: 'teratas:',
    },

    // Chatbot
    chatbot: {
      askAI: 'Tanya AI',
      rajifAI: 'AI Rajif',
      typing: 'mengetik...',
      askAnything: 'Tanya apa saja',
      freshStart: 'Mulai baru! 🔄\n\nApa yang ingin kamu ketahui tentang Rajif?',
      placeholder: 'Ketik pertanyaanmu di sini...',
      enterSend: 'Enter untuk kirim · Shift+Enter untuk baris baru',
      quickQuestions: 'Pertanyaan cepat:',
      suggestions: [
        { label: '🛠 Keahlian', prompt: 'Apa keahlian terkuatnya?' },
        { label: '🚀 Proyek', prompt: 'Ceritakan tentang proyeknya' },
        { label: '💼 Pengalaman', prompt: 'Apa pengalaman kerjanya?' },
        { label: '📬 Kontak', prompt: 'Bagaimana cara menghubungi Rajif?' },
        { label: '🎓 Pendidikan', prompt: 'Apa latar belakang pendidikannya?' },
        { label: '📜 Sertifikat', prompt: 'Apa sertifikasi yang dimilikinya?' },
      ],
    },

    // Game
    game: {
      startGame: 'mulai-game',
      restart: 'mulai-lagi',
      gameOver: 'GAME OVER',
      score: 'Skor:',
      useArrows: '// gunakan tombol arah atau tombol di bawah',
      wasdKeys: '// tombol WASD juga bisa digunakan',
      foodEaten: '// makanan dimakan',
      skip: 'lewati',
      audioPlaying: 'Audio Diputar...',
      audioWait: 'Harap tunggu hingga audio selesai',
      complete: '% selesai',
      cannotSkip: '⚠️ Kamu tidak bisa melewati sampai audio selesai diputar',
    },

    // Visitor Counter
    visitor: {
      visitors: 'pengunjung',
      top: 'teratas:',
    },

    // Blog
    blog: {
      title: 'Pemikiran & Wawasan',
      subtitle: 'Blog pribadi tentang ilmu data, teknologi, dan pembelajaran karir',
      posts: 'Artikel',
      totalWords: 'Total Kata',
      categories: 'Kategori',
      latest: 'Terbaru',
      filterBy: '// filter berdasarkan kategori',
      recent: 'Terbaru',
      readMore: 'Baca selengkapnya',
      noFound: 'Tidak ada artikel ditemukan',
      noFoundHint: 'Coba pilih kategori yang berbeda',
      words: 'kata',
    },

    // Certifications
    certs: {
      title: 'Sertifikasi',
      filterBy: '// filter berdasarkan kategori',
      showing: '// menampilkan ',
      certification: 'sertifikasi',
      certifications: 'sertifikasi',
      noFound: 'Tidak ada sertifikasi ditemukan',
      noFoundHint: 'Coba pilih kategori yang berbeda',
      description: 'Deskripsi',
      issueDate: 'Tanggal Terbit',
      validity: 'Masa Berlaku',
      category: 'Kategori',
      credentialId: 'ID Kredensial',
      skillsCovered: 'Keahlian yang Dicakup',
      verifyCredential: 'Verifikasi Kredensial',
      viewDetails: 'Lihat Detail',
    },
  },
}

export const useTranslation = (language) => {
  return translations[language] || translations.en
}
