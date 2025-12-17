// src/data/blogThoughts.js

export const blogThoughts = [
  {
    id: 1,
    date: '2024-12-15',
    title: 'Why Data Cleaning is 80% of the Job',
    content: `People often think data science is all about fancy algorithms and AI models. But the reality? I spend most of my time cleaning messy data. 

Duplicate records, missing values, inconsistent formats - these are the real challenges. A perfect model trained on dirty data is useless. 

My advice: Master pandas, learn SQL deeply, and develop a systematic approach to data quality. That's where the magic really happens.`,
    tags: ['Data Science', 'Best Practices', 'Career'],
    category: 'Insights',
    likes: 42,
    comments: 8,
    readTime: '2 min'
  },
  {
    id: 2,
    date: '2024-12-10',
    title: 'The PostgreSQL Query That Saved Me Hours',
    content: `Discovered window functions in PostgreSQL today and I'm amazed. I was writing complex subqueries to calculate running totals and rankings.

Then I learned about OVER(), PARTITION BY, and ROW_NUMBER(). What took me 50 lines of code now takes 5.

Example that blew my mind:
SELECT 
  customer_id,
  order_date,
  SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) as running_total
FROM orders;

Sometimes the solution isn't more complex code - it's knowing your tools better.`,
    tags: ['SQL', 'PostgreSQL', 'Tips'],
    category: 'Technical',
    likes: 67,
    comments: 15,
    readTime: '3 min'
  },
  {
    id: 3,
    date: '2024-12-05',
    title: 'Lessons from Bangkit Academy',
    content: `Just completed my Machine Learning certification from Bangkit Academy. Here's what I learned beyond the technical skills:

1. Collaboration beats solo work - our capstone project taught me this
2. Documentation is not optional - future you will thank present you
3. Deploy early, deploy often - a working prototype beats a perfect plan
4. Ask questions, even "dumb" ones - they're usually not as dumb as you think

The tech industry rewards those who ship. Start building, start sharing, start learning in public.`,
    tags: ['Learning', 'Career', 'Machine Learning'],
    category: 'Personal',
    likes: 89,
    comments: 23,
    readTime: '4 min'
  },
  {
    id: 4,
    date: '2024-11-28',
    title: 'Tableau vs Python: When to Use Which?',
    content: `Hot take: You don't need Python for everything.

Tableau is amazing for:
- Quick exploratory analysis
- Interactive dashboards for stakeholders
- When your audience isn't technical

Python excels at:
- Reproducible analysis
- Custom calculations
- Integration with ML pipelines
- Version control

I use both. Tableau for communication, Python for computation. Know your tools, use the right one for the job.`,
    tags: ['Tableau', 'Python', 'Tools'],
    category: 'Insights',
    likes: 54,
    comments: 12,
    readTime: '2 min'
  },
  {
    id: 5,
    date: '2024-11-20',
    title: 'My Data Analysis Workflow',
    content: `After dozens of projects, here's my battle-tested workflow:

1. Understand the problem (not the data, the PROBLEM)
2. Get the data, explore it raw
3. Clean systematically (document what you remove and why)
4. EDA with visualizations
5. Statistical testing before jumping to conclusions
6. Build models if needed (often not needed!)
7. Communicate insights in plain language

Step 1 and 7 are where most beginners struggle. Technical skills are important, but understanding the business context and communicating effectively separate good analysts from great ones.`,
    tags: ['Workflow', 'Best Practices', 'Career'],
    category: 'Insights',
    likes: 103,
    comments: 28,
    readTime: '3 min'
  },
  {
    id: 6,
    date: '2024-11-15',
    title: 'Why I Love (and Hate) Jupyter Notebooks',
    content: `Jupyter notebooks are incredible for exploration and documentation. But they're terrible for production code.

Love:
- Interactive development
- Inline visualizations
- Mix code with markdown
- Easy sharing

Hate:
- Hidden state issues
- Hard to version control
- Not great for collaboration
- Temptation to write spaghetti code

My solution: Use notebooks for exploration, refactor to .py files for production. Best of both worlds.`,
    tags: ['Tools', 'Jupyter', 'Python'],
    category: 'Technical',
    likes: 76,
    comments: 19,
    readTime: '2 min'
  },
  {
    id: 7,
    date: '2024-11-08',
    title: 'Building My First ML Model: Mistakes I Made',
    content: `My first ML project was a disaster. Here's what I learned:

❌ Started with the model before understanding the data
❌ Used accuracy as the only metric (terrible idea for imbalanced data)
❌ Didn't split train/test properly
❌ Overfitted like crazy
❌ Ignored business constraints

✅ Now I do:
- Thorough EDA first
- Choose metrics that match business goals
- Proper validation strategy
- Start simple, add complexity only if needed
- Talk to stakeholders early and often

The model is the easy part. Everything around it is what matters.`,
    tags: ['Machine Learning', 'Mistakes', 'Learning'],
    category: 'Personal',
    likes: 124,
    comments: 34,
    readTime: '4 min'
  },
  {
    id: 8,
    date: '2024-11-01',
    title: 'The Power of Good Documentation',
    content: `I reopened a project from 6 months ago. Took me 5 minutes to understand because I documented everything.

Documentation isn't just comments in code. It's:
- README with setup instructions
- Jupyter notebooks explaining the analysis
- Decision logs (why you chose X over Y)
- Data dictionary
- Known issues and limitations

Future you is a different person. Write for them. They'll thank you.`,
    tags: ['Documentation', 'Best Practices', 'Career'],
    category: 'Insights',
    likes: 91,
    comments: 16,
    readTime: '2 min'
  },
  {
    id: 9,
    date: '2024-10-25',
    title: 'Side Projects That Actually Helped My Career',
    content: `Not all side projects are created equal. Here's what worked for me:

🚀 Healthcare database optimization
- Learned PostgreSQL deeply
- Got my first contract job from this

🚀 Social media analytics dashboard
- Learned Tableau
- Built portfolio piece that impressed interviewers

🚀 ML fact-checking system
- Completed Bangkit Academy
- Learned to ship ML products

Build things that:
1. Solve real problems
2. Use tools you want to learn
3. You can show to others

Your portfolio is your resume in tech.`,
    tags: ['Career', 'Projects', 'Learning'],
    category: 'Personal',
    likes: 156,
    comments: 42,
    readTime: '3 min'
  },
  {
    id: 10,
    date: '2024-10-18',
    title: 'Stop Chasing Perfect, Start Shipping',
    content: `I spent 3 months "perfecting" my first project. Never shipped it. Too scared it wasn't good enough.

Then I built something in 2 weeks and shared it. Got feedback. Improved it. Actually helped someone.

Lesson: Done is better than perfect. Ship it, learn from feedback, iterate.

Your first version will be bad. That's okay. Version 2 will be better. Version 10 will be great.

Just start.`,
    tags: ['Mindset', 'Career', 'Motivation'],
    category: 'Personal',
    likes: 198,
    comments: 51,
    readTime: '2 min'
  }
];

export const blogCategories = ['All', 'Insights', 'Technical', 'Personal'];

export const getBlogByCategory = (category) => {
  if (category === 'All') return blogThoughts;
  return blogThoughts.filter(post => post.category === category);
};

export const getBlogStats = () => {
  return {
    totalPosts: blogThoughts.length,
    totalLikes: blogThoughts.reduce((sum, post) => sum + post.likes, 0),
    totalComments: blogThoughts.reduce((sum, post) => sum + post.comments, 0),
    avgReadTime: (blogThoughts.reduce((sum, post) => 
      sum + parseInt(post.readTime), 0) / blogThoughts.length).toFixed(1)
  };
};

export const getPopularPosts = (limit = 5) => {
  return [...blogThoughts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
};

export const getRecentPosts = (limit = 5) => {
  return [...blogThoughts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};
