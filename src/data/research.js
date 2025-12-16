// src/data/research.js

export const researchPapers = [
  {
    id: 1,
    title: 'Machine Learning Approaches for Predictive Analytics in Healthcare',
    author: 'Muhammad Rajif Al Farikhi',
    year: 2024,
    category: 'Machine Learning',
    abstract: 'This research explores various machine learning algorithms and their applications in healthcare predictive analytics. The study focuses on improving patient outcome predictions through advanced data analysis techniques.',
    keywords: ['Machine Learning', 'Healthcare', 'Predictive Analytics', 'Data Science'],
    pdfUrl: '/research/ml-healthcare.pdf', // Path to PDF
    pages: 45,
    published: 'Universitas Airlangga',
    doi: '10.1234/example.2024.001'
  },
  {
    id: 2,
    title: 'Data Visualization Techniques for Business Intelligence',
    author: 'Muhammad Rajif Al Farikhi',
    year: 2023,
    category: 'Data Visualization',
    abstract: 'An in-depth analysis of modern data visualization techniques and their impact on business intelligence decision-making. This paper presents case studies from various industries.',
    keywords: ['Data Visualization', 'Business Intelligence', 'Tableau', 'Dashboard Design'],
    pdfUrl: '/research/data-viz-bi.pdf',
    pages: 38,
    published: 'Journal of Data Science',
    doi: '10.1234/example.2023.002'
  },
  {
    id: 3,
    title: 'Database Optimization Strategies for Large-Scale Systems',
    author: 'Muhammad Rajif Al Farikhi, Co-authors',
    year: 2024,
    category: 'Database',
    abstract: 'This paper discusses various database optimization strategies implemented in large-scale healthcare systems, including indexing, query optimization, and data normalization techniques.',
    keywords: ['Database', 'PostgreSQL', 'Optimization', 'Healthcare Systems'],
    pdfUrl: '/research/db-optimization.pdf',
    pages: 52,
    published: 'International Conference on Data Management',
    doi: '10.1234/example.2024.003'
  },
  {
    id: 4,
    title: 'Natural Language Processing for Fact-Checking Systems',
    author: 'Muhammad Rajif Al Farikhi',
    year: 2022,
    category: 'NLP',
    abstract: 'Development of an automated fact-checking system using NLP techniques. This research was conducted as part of the Bangkit Academy Machine Learning capstone project.',
    keywords: ['NLP', 'Machine Learning', 'Fact-Checking', 'Text Classification'],
    pdfUrl: '/research/nlp-factcheck.pdf',
    pages: 41,
    published: 'Bangkit Academy 2022',
    doi: '10.1234/example.2022.004'
  },
  {
    id: 5,
    title: 'Time Series Analysis for Business Forecasting',
    author: 'Muhammad Rajif Al Farikhi',
    year: 2023,
    category: 'Time Series',
    abstract: 'Comprehensive study on time series analysis methods including ARIMA, Prophet, and LSTM for business forecasting applications. Includes real-world case studies.',
    keywords: ['Time Series', 'Forecasting', 'ARIMA', 'Deep Learning'],
    pdfUrl: '/research/timeseries-forecast.pdf',
    pages: 47,
    published: 'Data Analytics Conference 2023',
    doi: '10.1234/example.2023.005'
  }
]

export const researchCategories = [
  'All',
  'Machine Learning',
  'Data Visualization',
  'Database',
  'NLP',
  'Time Series'
]

export const getResearchByCategory = (category) => {
  if (category === 'All') return researchPapers
  return researchPapers.filter(paper => paper.category === category)
}

export const getResearchStats = () => {
  return {
    totalPapers: researchPapers.length,
    totalPages: researchPapers.reduce((sum, paper) => sum + paper.pages, 0),
    categories: researchCategories.length - 1,
    latestYear: Math.max(...researchPapers.map(p => p.year))
  }
}
