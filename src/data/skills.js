// src/data/skills.js

export const skillsData = {
  'Programming Languages': [
    { 
      name: 'Python', 
      level: 75, 
      years: 3, 
      projects: 15, 
      icon: '🐍',
      description: 'Primary language for data analysis, ML, and automation'
    },
    { 
      name: 'SQL', 
      level: 75, 
      years: 3, 
      projects: 12, 
      icon: '💾',
      description: 'Advanced queries, optimization, and database design'
    },
    { 
      name: 'R', 
      level: 70, 
      years: 2, 
      projects: 8, 
      icon: '📊',
      description: 'Statistical analysis and data visualization'
    },
    { 
      name: 'JavaScript', 
      level: 50, 
      years: 2, 
      projects: 6, 
      icon: '⚡',
      description: 'Web development and data visualization'
    }
  ],
  'Data Science & ML': [
    { 
      name: 'Machine Learning', 
      level: 60, 
      years: 2, 
      projects: 10, 
      icon: '🤖',
      description: 'Supervised & unsupervised learning, model optimization'
    },
    { 
      name: 'Data Analysis', 
      level: 80, 
      years: 3, 
      projects: 20, 
      icon: '📈',
      description: 'EDA, statistical analysis, and insights generation'
    },
    { 
      name: 'Deep Learning', 
      level: 40, 
      years: 1.5, 
      projects: 5, 
      icon: '🧠',
      description: 'Neural networks, CNN, RNN using TensorFlow & PyTorch'
    },
    { 
      name: 'NLP', 
      level: 50, 
      years: 1, 
      projects: 4, 
      icon: '🗣️',
      description: 'Text processing, sentiment analysis, and classification'
    },
    { 
      name: 'Time Series', 
      level: 75, 
      years: 1.5, 
      projects: 6, 
      icon: '📉',
      description: 'Forecasting, ARIMA, and seasonal analysis'
    }
  ],
  'Tools & Frameworks': [
    { 
      name: 'Pandas', 
      level: 90, 
      years: 3, 
      projects: 18, 
      icon: '🐼',
      description: 'Data manipulation and analysis'
    },
    { 
      name: 'NumPy', 
      level: 60, 
      years: 3, 
      projects: 15, 
      icon: '🔢',
      description: 'Numerical computing and arrays'
    },
    { 
      name: 'Scikit-learn', 
      level: 75, 
      years: 2, 
      projects: 12, 
      icon: '🔬',
      description: 'ML algorithms and model evaluation'
    },
    { 
      name: 'TensorFlow', 
      level: 60, 
      years: 1.5, 
      projects: 6, 
      icon: '🔷',
      description: 'Deep learning and neural networks'
    },
    { 
      name: 'PyTorch', 
      level: 50, 
      years: 1, 
      projects: 4, 
      icon: '🔥',
      description: 'Deep learning research and development'
    },
    { 
      name: 'Jupyter', 
      level: 75, 
      years: 3, 
      projects: 20, 
      icon: '📓',
      description: 'Interactive development and documentation'
    }
  ],
  'Visualization': [
    { 
      name: 'Tableau', 
      level: 50, 
      years: 2, 
      projects: 10, 
      icon: '📊',
      description: 'Interactive dashboards and business intelligence'
    },
    { 
      name: 'Matplotlib', 
      level: 75, 
      years: 2, 
      projects: 15, 
      icon: '📈',
      description: 'Static, animated, and interactive visualizations'
    },
    { 
      name: 'Seaborn', 
      level: 75, 
      years: 2, 
      projects: 7, 
      icon: '🌊',
      description: 'Statistical data visualization'
    },
    { 
      name: 'Plotly', 
      level: 75, 
      years: 1.5, 
      projects: 8, 
      icon: '📉',
      description: 'Interactive web-based visualizations'
    },
    { 
      name: 'Power BI', 
      level: 50, 
      years: 1, 
      projects: 2, 
      icon: '📊',
      description: 'Business analytics and reporting'
    }
  ],
  'Database & Big Data': [
    { 
      name: 'PostgreSQL', 
      level: 75, 
      years: 2, 
      projects: 5, 
      icon: '🐘',
      description: 'Advanced SQL, query optimization, and database design'
    },
    { 
      name: 'MySQL', 
      level: 75, 
      years: 2, 
      projects: 8, 
      icon: '💾',
      description: 'Relational database management'
    },
    { 
      name: 'MongoDB', 
      level: 50, 
      years: 1, 
      projects: 4, 
      icon: '🍃',
      description: 'NoSQL database for unstructured data'
    },
    { 
      name: 'Apache Spark', 
      level: 45, 
      years: 0.5, 
      projects: 2, 
      icon: '⚡',
      description: 'Big data processing and analytics'
    }
  ],
  'Other Skills': [
    { 
      name: 'Git & GitHub', 
      level: 75, 
      years: 3, 
      projects: 50, 
      icon: '🔧',
      description: 'Version control and collaboration'
    },
    { 
      name: 'Docker', 
      level: 45, 
      years: 1, 
      projects: 4, 
      icon: '🐳',
      description: 'Containerization and deployment'
    },
    { 
      name: 'Excel', 
      level: 75, 
      years: 4, 
      projects: 25, 
      icon: '📑',
      description: 'Advanced formulas, pivot tables, and VBA'
    },
    { 
      name: 'Statistics', 
      level: 75, 
      years: 3, 
      projects: 15, 
      icon: '📊',
      description: 'Hypothesis testing, regression, and probability'
    }
  ]
};

export const skillCategories = Object.keys(skillsData);

// Helper function to get all skills
export const getAllSkills = () => {
  return Object.values(skillsData).flat();
};

// Helper function to get skills by proficiency
export const getSkillsByLevel = (minLevel) => {
  return getAllSkills().filter(skill => skill.level >= minLevel);
};

// Helper function to calculate average stats
export const getSkillStats = () => {
  const allSkills = getAllSkills();
  return {
    totalSkills: allSkills.length,
    totalProjects: allSkills.reduce((sum, skill) => sum + skill.projects, 0),
    avgLevel: (allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length).toFixed(1),
    avgYears: (allSkills.reduce((sum, skill) => sum + skill.years, 0) / allSkills.length).toFixed(1),
    expertSkills: allSkills.filter(s => s.level >= 85).length,
    advancedSkills: allSkills.filter(s => s.level >= 70 && s.level < 85).length,
    intermediateSkills: allSkills.filter(s => s.level >= 50 && s.level < 70).length
  };
};
