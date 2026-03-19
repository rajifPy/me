// src/data/blogThoughts.js

export const blogThoughts = [
  {
    id: 1,
    date: '2024-12-15',

    // ── English ──────────────────────────────────────────────────────────────
    title: 'Why Data Cleaning is 80% of the Job',
    content: `People often think data science is all about fancy algorithms and AI models. The reality is quite different from what you see in job descriptions or bootcamp advertisements. I spend most of my time cleaning messy data, and I'm not alone in this experience.

## The Harsh Reality of Data Work

When I started my journey as a data enthusiast, I imagined myself building sophisticated neural networks and deploying cutting-edge machine learning models. The reality hit me hard during my first real project at UNAIR's health service unit. I spent three weeks just understanding the database structure, identifying inconsistencies, and cleaning duplicate records before I could even think about analysis.

## Common Data Quality Issues

Let me walk you through the typical problems I encounter:

**1. Duplicate Records**
In the healthcare database project, I discovered that some patient records were entered multiple times with slight variations in names, dates, or ID numbers. A single patient might have three different IDs in the system. This wasn't malicious – it was human error, system migrations, and lack of validation rules.

**2. Missing Values**
Not all missing values are created equal. Sometimes NULL means "not applicable," sometimes it means "we forgot to collect this," and sometimes it means "the system crashed during entry." Understanding the context of missing data is crucial before deciding how to handle it.

**3. Inconsistent Formats**
Dates entered as "12/01/2024," "01-12-2024," or "January 12, 2024." Phone numbers with or without country codes. Names in different cases. These inconsistencies might seem minor, but they can completely derail your analysis if not addressed.

**4. Data Type Mismatches**
Numbers stored as strings, dates stored as integers, boolean values stored as "Yes"/"No" strings – these issues are more common than you'd think and can cause subtle bugs in your analysis.

## My Systematic Approach

Over time, I've developed a systematic approach to data cleaning that I follow for every project:

**Step 1: Initial Exploration**
Before touching anything, I spend time understanding the data. What does each column represent? What are the expected value ranges? What business rules should apply? I document everything in a Jupyter notebook.

**Step 2: Define Data Quality Rules**
Based on business requirements and domain knowledge, I establish clear rules: "Patient IDs should be 8 digits," "Dates should be within the last 50 years," "Email addresses must contain @," etc.

**Step 3: Systematic Cleaning**
I tackle issues in order of impact: duplicates first (they can skew everything), then missing values, then format inconsistencies, and finally outliers. Each step is documented and reversible.

**Step 4: Validation**
After cleaning, I validate the results. Do the statistics make sense? Are there unexpected patterns? I often find new issues during validation that require going back to earlier steps.

## Tools and Techniques

My go-to tools for data cleaning:

**Pandas for Python**
The backbone of my data cleaning work. Functions like drop_duplicates(), fillna(), replace(), and apply() are indispensable. I've written custom cleaning functions that I reuse across projects.

**SQL for Database-Level Cleaning**
Sometimes it's more efficient to clean data at the database level, especially for large datasets. Window functions, CTEs, and proper JOIN operations can identify and fix issues before data even reaches your analysis environment.

**Regular Expressions**
For text cleaning and standardization, regex is invaluable. I use it for extracting patterns from messy text, validating formats, and standardizing entries.

## Real-World Impact

In the healthcare database project, proper data cleaning revealed that what appeared to be a 50% increase in patient visits was actually just duplicate records. Imagine if we had made decisions based on that uncleaned data – we might have hired unnecessary staff or invested in expansion that wasn't needed.

In another project analyzing social media growth, cleaning the data revealed that apparent engagement spikes were from bot accounts. Removing these fake engagements gave us a true picture of organic growth and helped focus our strategy effectively.

## Why Cleaning Matters More Than Algorithms

Here's a hard truth: a simple linear regression on clean data will outperform a complex neural network on dirty data. Every time.

The fanciest machine learning model is only as good as the data it's trained on. Garbage in, garbage out – this isn't just a saying, it's a fundamental truth of data science.

## My Advice for Aspiring Data Scientists

1. Master the Basics: Get really good at pandas, SQL, and data manipulation. This is where you'll spend most of your time.

2. Develop a Systematic Approach: Don't clean ad-hoc. Have a repeatable process that you can apply to any dataset.

3. Document Everything: Future you (or your teammates) will thank you. Document what you cleaned, why you cleaned it, and what assumptions you made.

4. Learn the Domain: Understanding the business context helps you make better decisions about how to handle edge cases in your data.

5. Validate, Validate, Validate: Never assume your cleaning worked perfectly. Always validate the results.

## The Underappreciated Skill

Data cleaning is often seen as unglamorous work – the necessary evil before you get to do "real" data science. But in my experience, it's where the real insights come from. Understanding your data at this granular level gives you intuition about patterns, relationships, and potential issues that you'd never discover by jumping straight to modeling.

The next time you see a job posting for a data scientist that emphasizes machine learning and AI, remember that the real job is probably 80% data cleaning. And that's not a bad thing – it's where the magic really happens.

Master the cleaning, and the modeling becomes much easier. Rush to the modeling, and you'll spend twice as long debugging issues that trace back to data quality problems.`,

    // ── Indonesian ────────────────────────────────────────────────────────────
    title_id: 'Mengapa Pembersihan Data adalah 80% dari Pekerjaan',
    content_id: `Orang sering berpikir ilmu data hanya tentang algoritma canggih dan model AI. Kenyataannya jauh berbeda dari yang terlihat di deskripsi pekerjaan atau iklan bootcamp. Saya menghabiskan sebagian besar waktu untuk membersihkan data yang berantakan, dan saya tidak sendirian dalam pengalaman ini.

## Realita Keras Dunia Data

Ketika saya memulai perjalanan sebagai penggemar data, saya membayangkan diri membangun jaringan saraf yang canggih dan menerapkan model machine learning mutakhir. Kenyataan menghantam keras saat proyek nyata pertama saya di unit layanan kesehatan UNAIR. Saya menghabiskan tiga minggu hanya untuk memahami struktur database, mengidentifikasi inkonsistensi, dan membersihkan catatan duplikat sebelum bisa mulai memikirkan analisis.

## Masalah Kualitas Data yang Umum

Mari saya jelaskan masalah-masalah yang biasa saya temui:

**1. Catatan Duplikat**
Dalam proyek database kesehatan, saya menemukan beberapa catatan pasien yang dimasukkan berkali-kali dengan variasi kecil pada nama, tanggal, atau nomor ID. Satu pasien bisa memiliki tiga ID berbeda di sistem. Ini bukan sabotase – melainkan kesalahan manusia, migrasi sistem, dan kurangnya aturan validasi.

**2. Nilai yang Hilang**
Tidak semua nilai yang hilang diciptakan sama. Terkadang NULL berarti "tidak berlaku," terkadang berarti "kami lupa mengumpulkan ini," dan terkadang berarti "sistem crash saat entri." Memahami konteks data yang hilang sangat penting sebelum memutuskan cara menanganinya.

**3. Format yang Tidak Konsisten**
Tanggal dimasukkan sebagai "12/01/2024," "01-12-2024," atau "12 Januari 2024." Nomor telepon dengan atau tanpa kode negara. Nama dalam huruf besar atau kecil yang berbeda. Inkonsistensi ini mungkin tampak kecil, tetapi bisa sepenuhnya merusak analisis jika tidak ditangani.

**4. Ketidakcocokan Tipe Data**
Angka disimpan sebagai string, tanggal disimpan sebagai integer, nilai boolean disimpan sebagai string "Ya"/"Tidak" – masalah ini lebih umum dari yang Anda kira dan dapat menyebabkan bug halus dalam analisis.

## Pendekatan Sistematis Saya

Seiring waktu, saya mengembangkan pendekatan sistematis untuk pembersihan data yang saya ikuti di setiap proyek:

**Langkah 1: Eksplorasi Awal**
Sebelum menyentuh apapun, saya meluangkan waktu untuk memahami data. Apa yang diwakili setiap kolom? Berapa rentang nilai yang diharapkan? Aturan bisnis apa yang harus diterapkan? Saya mendokumentasikan semuanya di Jupyter notebook.

**Langkah 2: Definisikan Aturan Kualitas Data**
Berdasarkan kebutuhan bisnis dan pengetahuan domain, saya menetapkan aturan yang jelas: "ID Pasien harus 8 digit," "Tanggal harus dalam 50 tahun terakhir," "Alamat email harus mengandung @," dll.

**Langkah 3: Pembersihan Sistematis**
Saya menangani masalah berdasarkan urutan dampak: duplikat terlebih dahulu (bisa mempengaruhi segalanya), lalu nilai yang hilang, lalu inkonsistensi format, dan terakhir outlier. Setiap langkah didokumentasikan dan dapat dibatalkan.

**Langkah 4: Validasi**
Setelah membersihkan, saya memvalidasi hasilnya. Apakah statistiknya masuk akal? Apakah ada pola yang tidak terduga? Saya sering menemukan masalah baru saat validasi yang mengharuskan kembali ke langkah sebelumnya.

## Alat dan Teknik

Alat andalan saya untuk pembersihan data:

**Pandas untuk Python**
Tulang punggung pekerjaan pembersihan data saya. Fungsi seperti drop_duplicates(), fillna(), replace(), dan apply() sangat diperlukan. Saya telah menulis fungsi pembersihan khusus yang saya gunakan kembali di berbagai proyek.

**SQL untuk Pembersihan Tingkat Database**
Terkadang lebih efisien membersihkan data di tingkat database, terutama untuk dataset besar. Window functions, CTE, dan operasi JOIN yang tepat dapat mengidentifikasi dan memperbaiki masalah sebelum data mencapai lingkungan analisis Anda.

**Regular Expressions**
Untuk pembersihan dan standarisasi teks, regex sangat berharga. Saya menggunakannya untuk mengekstrak pola dari teks yang berantakan, memvalidasi format, dan menstandarkan entri.

## Dampak Nyata

Dalam proyek database kesehatan, pembersihan data yang tepat mengungkapkan bahwa apa yang tampak sebagai peningkatan 50% kunjungan pasien sebenarnya hanyalah catatan duplikat. Bayangkan jika kami membuat keputusan berdasarkan data yang belum dibersihkan – kami mungkin telah merekrut staf yang tidak perlu atau berinvestasi dalam ekspansi yang tidak diperlukan.

Dalam proyek lain menganalisis pertumbuhan media sosial, pembersihan data mengungkapkan bahwa lonjakan keterlibatan yang tampak berasal dari akun bot. Menghapus keterlibatan palsu ini memberi kami gambaran nyata pertumbuhan organik dan membantu memfokuskan strategi kami secara efektif.

## Mengapa Pembersihan Lebih Penting dari Algoritma

Ini adalah kebenaran pahit: regresi linear sederhana pada data bersih akan mengungguli jaringan saraf yang kompleks pada data kotor. Setiap saat.

Model machine learning paling canggih hanya sebaik data yang digunakan untuk melatihnya. Sampah masuk, sampah keluar – ini bukan sekadar pepatah, ini adalah kebenaran fundamental ilmu data.

## Saran untuk Calon Data Scientist

1. Kuasai Dasar-dasar: Jadilah sangat mahir dalam pandas, SQL, dan manipulasi data. Di sinilah Anda akan menghabiskan sebagian besar waktu.

2. Kembangkan Pendekatan Sistematis: Jangan membersihkan secara ad-hoc. Miliki proses yang dapat diulang yang bisa diterapkan pada dataset apapun.

3. Dokumentasikan Segalanya: Kamu di masa depan (atau rekan timmu) akan berterima kasih. Dokumentasikan apa yang dibersihkan, mengapa dibersihkan, dan asumsi apa yang dibuat.

4. Pelajari Domainnya: Memahami konteks bisnis membantu membuat keputusan yang lebih baik tentang cara menangani kasus tepi dalam data Anda.

5. Validasi, Validasi, Validasi: Jangan pernah berasumsi pembersihan Anda berhasil sempurna. Selalu validasi hasilnya.

## Keahlian yang Kurang Dihargai

Pembersihan data sering dianggap sebagai pekerjaan yang tidak glamor – kejahatan yang diperlukan sebelum Anda bisa melakukan ilmu data "yang sesungguhnya." Tetapi berdasarkan pengalaman saya, di sinilah wawasan nyata berasal. Memahami data Anda pada tingkat yang sangat rinci memberi Anda intuisi tentang pola, hubungan, dan potensi masalah yang tidak akan pernah Anda temukan dengan langsung melompat ke pemodelan.

Lain kali Anda melihat lowongan kerja untuk data scientist yang menekankan machine learning dan AI, ingatlah bahwa pekerjaan nyatanya mungkin 80% pembersihan data. Dan itu bukan hal yang buruk – di situlah keajaiban sebenarnya terjadi.

Kuasai pembersihan, dan pemodelan menjadi jauh lebih mudah. Terburu-buru ke pemodelan, dan Anda akan menghabiskan dua kali lebih lama untuk men-debug masalah yang berasal dari masalah kualitas data.`,

    tags: ['Data Science', 'Best Practices', 'Career', 'Data Cleaning'],
    category: 'Insights',
  },

  {
    id: 2,
    date: '2024-11-20',

    title: 'My Journey from Student to Data Analyst',
    content: `Looking back at my journey from a university student to working as a Data Analyst, I realize how much I've learned not just about data, but about myself and the industry.

## Starting Point

I started my Information Systems degree at Universitas Airlangga in 2020, right when the pandemic hit. This challenging time actually became an opportunity – with everything online, I had more flexibility to explore different learning paths and online courses.

## The Bangkit Academy Experience

Joining Bangkit Academy in 2021 was a turning point. This intensive Machine Learning program, backed by Google, Tokopedia, Gojek, and Traveloka, exposed me to industry-standard practices and real-world applications of data science.

The program wasn't easy. We had to balance university coursework with the intensive Bangkit curriculum. But the hands-on projects and industry mentorship were invaluable. I learned that data science isn't just about knowing algorithms – it's about solving real business problems.

## First Real Project

My first major project was the healthcare database optimization at UNAIR. This wasn't glamorous machine learning – it was hardcore data cleaning and database normalization. But this project taught me more about data engineering than any course could.

I spent weeks understanding the database structure, identifying data quality issues, and implementing solutions. The impact was tangible – we improved query performance and data reliability for the entire health service unit.

## Key Lessons Learned

1. **Technical Skills Are Just the Foundation**: Knowing Python and SQL is important, but understanding the business context and communicating insights is equally crucial.

2. **Start Small, Think Big**: Don't wait for the perfect project. Start with small datasets, practice on Kaggle, contribute to open-source projects.

3. **Build in Public**: Share your learnings, create a portfolio, engage with the community. This visibility helped me land opportunities.

4. **Soft Skills Matter**: Collaboration, communication, and problem-solving abilities are as important as technical expertise.

5. **Never Stop Learning**: The field evolves rapidly. Continuous learning isn't optional – it's necessary.

## Current Focus

Now as I continue my journey, I'm focusing on deepening my expertise in specific areas: time series analysis, advanced SQL optimization, and production-grade ML systems.

## Advice for Aspiring Data Analysts

If you're just starting out:
- Build a strong foundation in statistics and programming
- Work on real projects, even if they're personal ones
- Document your learning journey
- Connect with the community
- Don't be afraid to start – imperfect action beats perfect inaction

The journey from student to professional isn't linear. There will be setbacks, rejections, and moments of doubt. But each experience, whether success or failure, teaches you something valuable.

Remember: everyone started somewhere. Your current skill level doesn't define your potential. Keep learning, keep building, and keep pushing forward.`,

    title_id: 'Perjalananku dari Mahasiswa ke Analis Data',
    content_id: `Melihat ke belakang perjalanan saya dari mahasiswa universitas hingga bekerja sebagai Analis Data, saya menyadari betapa banyak yang telah saya pelajari – bukan hanya tentang data, tetapi juga tentang diri sendiri dan industri ini.

## Titik Awal

Saya memulai gelar Sistem Informasi di Universitas Airlangga pada tahun 2020, tepat saat pandemi melanda. Masa yang menantang ini justru menjadi peluang – dengan segalanya serba daring, saya memiliki lebih banyak fleksibilitas untuk menjelajahi jalur belajar dan kursus online yang berbeda.

## Pengalaman Bangkit Academy

Bergabung dengan Bangkit Academy pada tahun 2021 adalah titik balik. Program Machine Learning intensif ini, yang didukung oleh Google, Tokopedia, Gojek, dan Traveloka, memperkenalkan saya pada praktik standar industri dan penerapan ilmu data di dunia nyata.

Program ini tidak mudah. Kami harus menyeimbangkan tugas kuliah dengan kurikulum Bangkit yang intensif. Namun proyek langsung dan mentoring dari industri sangat berharga. Saya belajar bahwa ilmu data bukan hanya tentang mengetahui algoritma – ini tentang memecahkan masalah bisnis nyata.

## Proyek Nyata Pertama

Proyek besar pertama saya adalah optimasi database kesehatan di UNAIR. Ini bukan machine learning yang glamor – melainkan pembersihan data dan normalisasi database yang serius. Tetapi proyek ini mengajarkan saya lebih banyak tentang rekayasa data daripada kursus manapun.

Saya menghabiskan berminggu-minggu memahami struktur database, mengidentifikasi masalah kualitas data, dan mengimplementasikan solusi. Dampaknya nyata – kami meningkatkan performa kueri dan keandalan data untuk seluruh unit layanan kesehatan.

## Pelajaran Kunci yang Dipetik

1. **Kemampuan Teknis Hanyalah Fondasi**: Mengetahui Python dan SQL itu penting, tetapi memahami konteks bisnis dan mengkomunikasikan wawasan sama pentingnya.

2. **Mulai Kecil, Berpikir Besar**: Jangan menunggu proyek yang sempurna. Mulailah dengan dataset kecil, berlatih di Kaggle, berkontribusi pada proyek open-source.

3. **Bangun di Depan Umum**: Bagikan pembelajaran Anda, buat portofolio, terlibat dengan komunitas. Visibilitas ini membantu saya mendapatkan peluang.

4. **Soft Skill Penting**: Kemampuan kolaborasi, komunikasi, dan pemecahan masalah sama pentingnya dengan keahlian teknis.

5. **Jangan Pernah Berhenti Belajar**: Bidang ini berkembang pesat. Pembelajaran berkelanjutan bukan pilihan – ini keharusan.

## Fokus Saat Ini

Sekarang saat saya melanjutkan perjalanan, saya fokus untuk memperdalam keahlian di area tertentu: analisis deret waktu, optimasi SQL lanjutan, dan sistem ML tingkat produksi.

## Saran untuk Calon Analis Data

Jika Anda baru memulai:
- Bangun fondasi yang kuat dalam statistik dan pemrograman
- Kerjakan proyek nyata, meskipun proyek pribadi
- Dokumentasikan perjalanan belajar Anda
- Terhubung dengan komunitas
- Jangan takut untuk memulai – tindakan tidak sempurna mengalahkan kelambanan yang sempurna

Perjalanan dari mahasiswa ke profesional tidak linear. Akan ada kemunduran, penolakan, dan momen keraguan. Tetapi setiap pengalaman, baik kesuksesan maupun kegagalan, mengajarkan sesuatu yang berharga.

Ingat: semua orang mulai dari suatu tempat. Tingkat keahlian Anda saat ini tidak menentukan potensi Anda. Terus belajar, terus membangun, dan terus melangkah maju.`,

    tags: ['Career', 'Personal', 'Learning', 'Advice'],
    category: 'Personal',
  },

  {
    id: 3,
    date: '2024-10-05',

    title: 'SQL Optimization Techniques I Wish I Knew Earlier',
    content: `After working with databases for three years, I've learned that writing SQL that works is easy. Writing SQL that works efficiently at scale is an art.

## The Performance Problem

When I first started with SQL, I focused on getting the right results. If a query took 30 seconds, I'd just wait. But in production systems with millions of rows, those 30 seconds become hours, and suddenly your reports aren't just slow – they're impossible.

## Critical Optimization Techniques

**1. Understand Your Execution Plans**
Before optimizing anything, understand how your database executes queries. Use EXPLAIN or EXPLAIN ANALYZE to see what's actually happening under the hood.

**2. Index Strategically**
Indexes are powerful but not magic. I learned to index:
- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
But avoid over-indexing – each index slows down write operations.

**3. Avoid SELECT ***
Only select the columns you need. This reduces data transfer and memory usage. In large tables, this single change can improve performance by 50% or more.

**4. Use Window Functions Instead of Subqueries**
Window functions like ROW_NUMBER(), RANK(), and LAG() are often more efficient than correlated subqueries and more readable too.

**5. Filter Early, Filter Often**
Push WHERE clauses as far down as possible in your query. The earlier you reduce the dataset, the less data the database needs to process.

**6. Batch Operations**
Instead of running thousands of individual INSERT or UPDATE statements, batch them. This reduces transaction overhead dramatically.

**7. Partition Large Tables**
For tables with millions of rows, partitioning by date or category can make queries orders of magnitude faster.

## Real-World Example

In the healthcare database project, I had a query that was taking 45 seconds. After optimization:
- Added appropriate indexes: 45s → 12s
- Rewrote subquery as window function: 12s → 4s
- Filtered earlier in the query: 4s → 0.8s

The final query was 56 times faster than the original!

## Common Mistakes to Avoid

1. **Using Functions on Indexed Columns**: WHERE YEAR(date_column) = 2024 prevents index usage
2. **Implicit Conversions**: Comparing string to number forces type conversion
3. **NOT IN with NULLs**: Can produce unexpected results
4. **Overusing DISTINCT**: Usually indicates a poorly written query
5. **Forgetting to ANALYZE**: Database statistics need to be updated regularly

## My SQL Optimization Checklist

Before calling a query "done," I now check:
- Is it using indexes efficiently?
- Can I reduce the number of rows earlier?
- Are there any subqueries that could be CTEs or JOINs?
- Is it readable and maintainable?
- Does it handle edge cases (NULLs, duplicates)?

## The Bottom Line

SQL optimization isn't about memorizing tricks – it's about understanding how databases work. Invest time in learning about indexes, execution plans, and query processing. This knowledge will serve you throughout your career.

Remember: premature optimization is the root of all evil, but knowing when and how to optimize is a critical skill. Start with correct queries, then make them fast when needed.`,

    title_id: 'Teknik Optimasi SQL yang Ingin Saya Ketahui Lebih Awal',
    content_id: `Setelah bekerja dengan database selama tiga tahun, saya belajar bahwa menulis SQL yang berfungsi itu mudah. Menulis SQL yang bekerja efisien dalam skala besar adalah sebuah seni.

## Masalah Performa

Ketika pertama kali belajar SQL, saya fokus mendapatkan hasil yang benar. Jika kueri membutuhkan 30 detik, saya hanya menunggu. Tetapi dalam sistem produksi dengan jutaan baris, 30 detik itu menjadi berjam-jam, dan tiba-tiba laporan Anda bukan hanya lambat – melainkan mustahil.

## Teknik Optimasi Penting

**1. Pahami Execution Plan Anda**
Sebelum mengoptimalkan apapun, pahami bagaimana database mengeksekusi kueri. Gunakan EXPLAIN atau EXPLAIN ANALYZE untuk melihat apa yang sebenarnya terjadi di balik layar.

**2. Buat Index Secara Strategis**
Index itu powerful tapi bukan sihir. Saya belajar untuk mengindeks:
- Kolom yang digunakan dalam klausa WHERE
- Kolom yang digunakan dalam kondisi JOIN
- Kolom yang digunakan dalam ORDER BY
Tetapi hindari over-indexing – setiap index memperlambat operasi tulis.

**3. Hindari SELECT ***
Hanya pilih kolom yang Anda butuhkan. Ini mengurangi transfer data dan penggunaan memori. Dalam tabel besar, perubahan tunggal ini bisa meningkatkan performa 50% atau lebih.

**4. Gunakan Window Functions daripada Subquery**
Window functions seperti ROW_NUMBER(), RANK(), dan LAG() seringkali lebih efisien daripada correlated subquery dan lebih mudah dibaca.

**5. Filter Lebih Awal, Filter Sering**
Dorong klausa WHERE sejauh mungkin ke bawah dalam kueri Anda. Semakin awal Anda mengurangi dataset, semakin sedikit data yang perlu diproses database.

**6. Operasi Batch**
Daripada menjalankan ribuan pernyataan INSERT atau UPDATE individual, kelompokkan mereka. Ini mengurangi overhead transaksi secara dramatis.

**7. Partisi Tabel Besar**
Untuk tabel dengan jutaan baris, partisi berdasarkan tanggal atau kategori dapat membuat kueri lebih cepat berkali-kali lipat.

## Contoh Nyata

Dalam proyek database kesehatan, saya memiliki kueri yang membutuhkan 45 detik. Setelah optimasi:
- Menambahkan index yang tepat: 45d → 12d
- Menulis ulang subquery sebagai window function: 12d → 4d
- Memfilter lebih awal dalam kueri: 4d → 0,8d

Kueri akhir 56 kali lebih cepat dari aslinya!

## Kesalahan Umum yang Harus Dihindari

1. **Menggunakan Fungsi pada Kolom yang Diindeks**: WHERE YEAR(date_column) = 2024 mencegah penggunaan index
2. **Konversi Implisit**: Membandingkan string dengan angka memaksa konversi tipe
3. **NOT IN dengan NULL**: Dapat menghasilkan hasil yang tidak terduga
4. **Overusing DISTINCT**: Biasanya menunjukkan kueri yang ditulis dengan buruk
5. **Lupa ANALYZE**: Statistik database perlu diperbarui secara berkala

## Checklist Optimasi SQL Saya

Sebelum menyebut kueri "selesai," saya sekarang memeriksa:
- Apakah sudah menggunakan index secara efisien?
- Bisakah saya mengurangi jumlah baris lebih awal?
- Apakah ada subquery yang bisa menjadi CTE atau JOIN?
- Apakah mudah dibaca dan dipelihara?
- Apakah menangani kasus tepi (NULL, duplikat)?

## Intinya

Optimasi SQL bukan tentang menghafal trik – ini tentang memahami cara kerja database. Investasikan waktu untuk mempelajari index, execution plan, dan pemrosesan kueri. Pengetahuan ini akan berguna sepanjang karir Anda.

Ingat: optimasi prematur adalah akar dari semua kejahatan, tetapi mengetahui kapan dan bagaimana mengoptimalkan adalah keterampilan penting. Mulailah dengan kueri yang benar, lalu buat cepat bila diperlukan.`,

    tags: ['SQL', 'Performance', 'Database', 'Technical'],
    category: 'Technical',
  },

  {
    id: 4,
    date: '2024-09-25',

    title: 'Boy From Village',
    content: `When people talk about villages, they often imagine simplicity, tradition, and distance from modern life. Yet behind the rice fields and quiet roads, there are young souls with dreams as vast as the sky.

## Between Stereotype and Reality

When we talk about villages, what comes to mind? Most people picture going home for the holidays, visiting elderly parents, or simply enjoying a simple atmosphere. Many also assume villages and their people are backward, old-fashioned, and far from modern currents. However, having been born and raised in a village, I know this view is not entirely true. Being labeled "old-fashioned" is painful. Nowadays many young people feel embarrassed to be called behind the times, although some choose not to care.

## Restrictive Old Culture

One factor that makes villages lag behind is the doctrine coming from parents. Many say, "There's no need to pursue too much education—we're just village kids; our duty is to farm and raise livestock." Although those words come from love, they limit children's dreams. Every child has the right to determine their future. It doesn't matter if you were born in a village or a city, poor or rich—everyone has the right to reach for the highest dreams. Parents should instill the spirit: "Aim for dreams as high as the sky, so that one day you can bring change for yourself, your family, and your village."

## The Gap Between Village and City

Compared with city kids, the differences are obvious. City youth are used to staying updated, are open-minded, and can filter information. Village youth often follow the thinking of those closest to them when they receive new information. When it comes to technology—Artificial Intelligence, the Internet of Things, Big Data—many village young people are still unfamiliar. Even big names like Elon Musk, Jeff Bezos, or Larry Page may sound unfamiliar. Yet we live in the 4.0 era, where technology advances rapidly and is dominated by developed countries.

## The 4.0 Era: Our Challenges and Opportunities

We must not merely be users or "slaves" of technology; we should also contribute to creating it. Village youth have the same opportunities to learn, innovate, and contribute. A village is not only a recipient of change but can also be the birthplace of change itself.

## Village Youth as Agents of Change

I do not mean to belittle village kids or compare them with city kids. On the contrary, I want to motivate village youth to bring positive change and keep up with the times. They shouldn't just be followers but true agents of change.

🌱 **Message to rural youth: Dare to dream, dare to act. Your roots are not chains—they are the soil from which greatness grows.**`,

    title_id: 'Anak Desa',
    content_id: `Ketika orang berbicara tentang desa, mereka sering membayangkan kesederhanaan, tradisi, dan jauh dari kehidupan modern. Namun di balik sawah dan jalan sunyi, ada jiwa-jiwa muda dengan mimpi seluas langit.

## Antara Stereotip dan Realita

Ketika kita berbicara tentang desa, apa yang terlintas di benak? Kebanyakan orang membayangkan pulang kampung saat liburan, mengunjungi orang tua yang sudah tua, atau sekadar menikmati suasana sederhana. Banyak juga yang beranggapan bahwa desa dan orang-orangnya itu terbelakang, kuno, dan jauh dari arus modern. Namun, sebagai orang yang lahir dan besar di desa, saya tahu pandangan ini tidak sepenuhnya benar. Dicap "ketinggalan zaman" itu menyakitkan. Zaman sekarang banyak anak muda yang malu disebut ketinggalan zaman, meski ada juga yang memilih tak peduli.

## Budaya Lama yang Membatasi

Salah satu faktor yang membuat desa tertinggal adalah doktrin yang datang dari orang tua. Banyak yang berkata, "Tidak perlu sekolah tinggi-tinggi, kita kan anak desa; tugas kita bertani dan beternak." Meski kata-kata itu keluar dari rasa cinta, namun membatasi mimpi anak. Setiap anak berhak menentukan masa depannya sendiri. Tidak peduli kamu lahir di desa atau kota, miskin atau kaya—semua berhak meraih mimpi setinggi-tingginya. Orang tua seharusnya menanamkan semangat: "Gantungkan cita-citamu setinggi langit, agar suatu hari kamu bisa membawa perubahan untuk dirimu, keluargamu, dan desamu."

## Kesenjangan antara Desa dan Kota

Dibandingkan dengan anak kota, perbedaannya terlihat jelas. Pemuda kota terbiasa update, berwawasan luas, dan bisa menyaring informasi. Pemuda desa sering mengikuti pemikiran orang-orang terdekat mereka saat menerima informasi baru. Soal teknologi—Kecerdasan Buatan, Internet of Things, Big Data—banyak pemuda desa yang masih asing. Bahkan nama besar seperti Elon Musk, Jeff Bezos, atau Larry Page mungkin terdengar asing. Padahal kita hidup di era 4.0, di mana teknologi berkembang pesat dan didominasi oleh negara-negara maju.

## Era 4.0: Tantangan dan Peluang Kita

Kita tidak boleh hanya menjadi pengguna atau "budak" teknologi; kita juga harus berkontribusi dalam menciptakannya. Pemuda desa memiliki kesempatan yang sama untuk belajar, berinovasi, dan berkontribusi. Sebuah desa bukan hanya penerima perubahan, tetapi juga bisa menjadi tempat lahirnya perubahan itu sendiri.

## Pemuda Desa sebagai Agen Perubahan

Saya tidak bermaksud meremehkan anak desa atau membandingkan mereka dengan anak kota. Sebaliknya, saya ingin memotivasi pemuda desa untuk membawa perubahan positif dan mengikuti perkembangan zaman. Mereka seharusnya bukan hanya pengikut, tetapi bagian dari agen perubahan .

🌱 **Pesan untuk pemuda desa: Beranilah bermimpi, beranilah bertindak. Akarmu bukan belenggu—melainkan tanah tempat kebesaran tumbuh.**`,

    tags: ['Motivation', 'Society', 'Youth', 'Change'],
    category: 'Insights',
  },
]

export const blogCategories = ['All', 'Insights', 'Technical', 'Personal']

export const getBlogByCategory = (category) => {
  if (category === 'All') return blogThoughts
  return blogThoughts.filter(post => post.category === category)
}

export const getBlogStats = () => {
  const totalWords = blogThoughts.reduce((sum, post) => {
    return sum + post.content.split(/\s+/).length
  }, 0)
  return {
    totalPosts: blogThoughts.length,
    totalWords,
    totalCategories: blogCategories.length - 1,
    latestYear: Math.max(...blogThoughts.map(p => new Date(p.date).getFullYear())),
  }
}

export const getPopularPosts = (limit = 3) => {
  return [...blogThoughts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}
