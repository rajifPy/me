// src/data/certifications.js

export const certifications = [
  {
    id: 1,
    name: 'Data Science Fundamentals',
    issuer: 'Bangkit Academy',
    date: 'December 2022',
    validity: 'Lifetime',
    category: 'Data Science',
    credentialId: 'BGK-DS-2022-001',
    skills: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis'],
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/Q6WY44W7MPGJ',
    description: 'Comprehensive data science program covering ML fundamentals, data analysis, and model deployment. Includes hands-on projects with real-world datasets.',
    logo: '📊'
  },
  {
    id: 2,
    name: 'Machine Learning Path',
    issuer: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
    date: 'December 2022',
    validity: 'Lifetime',
    category: 'Machine Learning',
    credentialId: 'BGK-ML-2022-002',
    skills: ['TensorFlow', 'Neural Networks', 'Deep Learning', 'Model Deployment'],
    verificationUrl: 'https://www.coursera.org/account/accomplishments/specialization/HUCZB75Q9P24',
    description: 'Intensive ML training program including supervised/unsupervised learning and deep learning. Completed capstone project on fact-checking system using NLP.',
    logo: '🤖'
  },
  {
    id: 3,
    name: 'SQL for Data Analysis',
    issuer: 'DataCamp',
    date: 'June 2023',
    validity: 'Lifetime',
    category: 'Database',
    credentialId: 'DC-SQL-2023-003',
    skills: ['SQL', 'PostgreSQL', 'Query Optimization', 'Database Design'],
    verificationUrl: 'https://www.datacamp.com/certificates/XXXXX',
    description: 'Advanced SQL course covering complex queries, window functions, CTEs, and performance optimization techniques for large-scale databases.',
    logo: '💾'
  },
  {
    id: 4,
    name: 'Data Visualization with Tableau',
    issuer: 'Tableau',
    date: 'August 2023',
    validity: 'Lifetime',
    category: 'Visualization',
    credentialId: 'TBL-VIZ-2023-004',
    skills: ['Tableau', 'Data Visualization', 'Dashboard Design', 'Storytelling'],
    verificationUrl: 'https://www.tableau.com/learn/certification',
    description: 'Professional certification in creating interactive dashboards and storytelling with data. Mastered advanced calculations, LOD expressions, and dashboard best practices.',
    logo: '📈'
  },
  {
    id: 5,
    name: 'Python for Data Science',
    issuer: 'IBM',
    date: 'March 2023',
    validity: 'Lifetime',
    category: 'Programming',
    credentialId: 'IBM-PY-2023-005',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Jupyter'],
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/XXXXX',
    description: 'Comprehensive Python course for data analysis and scientific computing. Covered data manipulation, exploratory analysis, and visualization libraries.',
    logo: '🐍'
  },
  {
    id: 6,
    name: 'Google Analytics Certification',
    issuer: 'Google',
    date: 'January 2023',
    validity: '2 Years',
    category: 'Analytics',
    credentialId: 'GAIQ-2023-006',
    skills: ['Google Analytics', 'Web Analytics', 'Data Analysis', 'Reporting'],
    verificationUrl: 'https://skillshop.exceedlms.com/student/award/XXXXX',
    description: 'Official Google certification in digital analytics and reporting. Proficient in tracking, analyzing, and optimizing website performance metrics.',
    logo: '📊'
  }
];

export const certificationCategories = [
  'All',
  'Data Science',
  'Machine Learning',
  'Database',
  'Visualization',
  'Programming',
  'Analytics'
];
