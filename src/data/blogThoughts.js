// src/data/blogThoughts.js

export const blogThoughts = [
  {
    id: 1,
    date: '2024-12-15',
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
    tags: ['Data Science', 'Best Practices', 'Career', 'Data Cleaning'],
    category: 'Insights'
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
    tags: ['Career', 'Personal', 'Learning', 'Advice'],
    category: 'Personal'
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

**3. Avoid SELECT \***
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
    tags: ['SQL', 'Performance', 'Database', 'Technical'],
    category: 'Technical'
  },
  {
    id: 4,
    date: '2024-09-25',
    title: 'From Village Roots to Agents of Change',
    content: `When people talk about villages, they often imagine simplicity, tradition, and distance from modern life. Yet behind the rice fields and quiet roads, there are young souls with dreams as vast as the sky.

## Breaking Old Boundaries
In many rural families, parents still say: "You don’t need to aim too high, just farm or raise livestock." While born from love, such words unintentionally limit their children’s horizons. Every child, whether from a city or a village, rich or poor, deserves the right to dream and to pursue education that can transform their future.

## The Gap Between City and Village
Urban youth are often exposed to new ideas, technology, and global figures. Meanwhile, many village youth remain unfamiliar with terms like Artificial Intelligence, Big Data, or names such as Elon Musk and Jeff Bezos. This gap is not just about geography—it is about access to knowledge.

## Embracing the Era of 4.0
We live in the age of Industry 4.0, where technology evolves rapidly. Village youth must not remain passive users of technology; they should become creators and innovators. The village is not a symbol of backwardness—it is fertile ground for hope and progress.

## Agents of Change
The call is clear: village youth must rise as agents of change. They are not destined to merely follow the times, but to shape them. With courage, education, and vision, they can bring light to their communities and contribute to the nation’s future.

🌱 **Message to rural youth: Dare to dream, dare to act. Your roots are not chains—they are the soil from which greatness grows.**`,
    tags: ['Motivation', 'Society', 'Youth', 'Change'],
    category: 'Insights'
  }
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
    totalWords: totalWords,
    totalCategories: blogCategories.length - 1,
    latestYear: Math.max(...blogThoughts.map(p => new Date(p.date).getFullYear()))
  }
}

export const getPopularPosts = (limit = 3) => {
  return blogThoughts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}
