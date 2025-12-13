// src/data/codeSnippets.js

export const codeSnippets = [
  {
    id: 1,
    title: 'Data Cleaning Pipeline',
    language: 'python',
    category: 'Data Processing',
    description: 'Automated data cleaning and preprocessing pipeline',
    code: `import pandas as pd
import numpy as np

def clean_data(df):
    """
    Comprehensive data cleaning pipeline
    """
    # Remove duplicates
    df = df.drop_duplicates()
    
    # Handle missing values
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())
    
    # Remove outliers using IQR method
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        df = df[~((df[col] < (Q1 - 1.5 * IQR)) | 
                  (df[col] > (Q3 + 1.5 * IQR)))]
    
    return df

# Usage
df_clean = clean_data(df_raw)
print(f"Cleaned: {len(df_clean)} rows from {len(df_raw)}")`
  },
  {
    id: 2,
    title: 'SQL Query Optimization',
    language: 'sql',
    category: 'Database',
    description: 'Complex query for customer analytics',
    code: `-- Customer Segmentation Analysis
WITH customer_metrics AS (
    SELECT 
        customer_id,
        COUNT(DISTINCT order_id) as total_orders,
        SUM(order_value) as total_revenue,
        AVG(order_value) as avg_order_value,
        MAX(order_date) as last_order_date,
        MIN(order_date) as first_order_date
    FROM orders
    WHERE order_status = 'completed'
    GROUP BY customer_id
),
rfm_scores AS (
    SELECT 
        customer_id,
        NTILE(5) OVER (ORDER BY last_order_date DESC) as recency_score,
        NTILE(5) OVER (ORDER BY total_orders) as frequency_score,
        NTILE(5) OVER (ORDER BY total_revenue) as monetary_score
    FROM customer_metrics
)
SELECT 
    cm.*,
    rs.recency_score + rs.frequency_score + rs.monetary_score as rfm_total,
    CASE 
        WHEN rfm_total >= 12 THEN 'Champions'
        WHEN rfm_total >= 9 THEN 'Loyal'
        WHEN rfm_total >= 6 THEN 'Potential'
        ELSE 'At Risk'
    END as customer_segment
FROM customer_metrics cm
JOIN rfm_scores rs ON cm.customer_id = rs.customer_id
ORDER BY rfm_total DESC;`
  },
  {
    id: 3,
    title: 'ML Model Training',
    language: 'python',
    category: 'Machine Learning',
    description: 'Random Forest classifier with cross-validation',
    code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.metrics import classification_report
import joblib

# Define parameter grid
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, 30, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Initialize model
rf_model = RandomForestClassifier(random_state=42)

# Grid search with cross-validation
grid_search = GridSearchCV(
    rf_model, 
    param_grid, 
    cv=5, 
    scoring='f1_weighted',
    n_jobs=-1,
    verbose=1
)

# Train model
grid_search.fit(X_train, y_train)

# Best model
best_model = grid_search.best_estimator_
print(f"Best params: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.4f}")

# Evaluate on test set
y_pred = best_model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(best_model, 'rf_model.pkl')`
  },
  {
    id: 4,
    title: 'Data Visualization',
    language: 'python',
    category: 'Visualization',
    description: 'Interactive dashboard with Plotly',
    code: `import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Create subplots
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=(
        'Sales Trend', 
        'Category Distribution',
        'Top Products', 
        'Regional Performance'
    ),
    specs=[
        [{"type": "scatter"}, {"type": "pie"}],
        [{"type": "bar"}, {"type": "choropleth"}]
    ]
)

# Sales trend line chart
fig.add_trace(
    go.Scatter(
        x=df['date'], 
        y=df['sales'],
        mode='lines+markers',
        name='Sales',
        line=dict(color='#43D9AD', width=2)
    ),
    row=1, col=1
)

# Category pie chart
fig.add_trace(
    go.Pie(
        labels=df['category'].unique(),
        values=df.groupby('category')['sales'].sum(),
        marker=dict(colors=['#43D9AD', '#4D5BCE', '#FEA55F'])
    ),
    row=1, col=2
)

# Update layout
fig.update_layout(
    title_text="Sales Analytics Dashboard",
    showlegend=True,
    height=800,
    template='plotly_dark'
)

fig.show()`
  },
  {
    id: 5,
    title: 'API Data Extraction',
    language: 'python',
    category: 'Data Engineering',
    description: 'Automated API data fetching with error handling',
    code: `import requests
import pandas as pd
from datetime import datetime, timedelta
import time

class DataExtractor:
    def __init__(self, api_key, base_url):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        
    def fetch_data(self, endpoint, params=None, retry=3):
        """Fetch data with retry logic"""
        for attempt in range(retry):
            try:
                response = self.session.get(
                    f"{self.base_url}/{endpoint}",
                    params=params,
                    headers={'Authorization': f'Bearer {self.api_key}'},
                    timeout=30
                )
                response.raise_for_status()
                return response.json()
            except requests.exceptions.RequestException as e:
                if attempt == retry - 1:
                    raise
                time.sleep(2 ** attempt)  # Exponential backoff
                
    def extract_to_dataframe(self, endpoint, date_range=7):
        """Extract and convert to DataFrame"""
        all_data = []
        start_date = datetime.now() - timedelta(days=date_range)
        
        for day in range(date_range):
            current_date = start_date + timedelta(days=day)
            params = {'date': current_date.strftime('%Y-%m-%d')}
            
            data = self.fetch_data(endpoint, params)
            all_data.extend(data.get('results', []))
            
        return pd.DataFrame(all_data)

# Usage
extractor = DataExtractor(API_KEY, BASE_URL)
df = extractor.extract_to_dataframe('sales', date_range=30)`
  },
  {
    id: 6,
    title: 'Statistical Analysis',
    language: 'python',
    category: 'Statistics',
    description: 'Hypothesis testing and correlation analysis',
    code: `import scipy.stats as stats
import seaborn as sns
import matplotlib.pyplot as plt

def statistical_analysis(df, var1, var2):
    """
    Perform comprehensive statistical analysis
    """
    # Normality test
    _, p_norm_1 = stats.shapiro(df[var1])
    _, p_norm_2 = stats.shapiro(df[var2])
    
    print(f"Normality Test:")
    print(f"{var1}: {'Normal' if p_norm_1 > 0.05 else 'Not Normal'}")
    print(f"{var2}: {'Normal' if p_norm_2 > 0.05 else 'Not Normal'}")
    
    # Correlation analysis
    corr_pearson, p_pearson = stats.pearsonr(df[var1], df[var2])
    corr_spearman, p_spearman = stats.spearmanr(df[var1], df[var2])
    
    print(f"\\nCorrelation Analysis:")
    print(f"Pearson: {corr_pearson:.3f} (p={p_pearson:.4f})")
    print(f"Spearman: {corr_spearman:.3f} (p={p_spearman:.4f})")
    
    # Visualization
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    # Scatter plot
    axes[0].scatter(df[var1], df[var2], alpha=0.5)
    axes[0].set_xlabel(var1)
    axes[0].set_ylabel(var2)
    axes[0].set_title('Scatter Plot')
    
    # Regression plot
    sns.regplot(x=var1, y=var2, data=df, ax=axes[1])
    axes[1].set_title('Regression Plot')
    
    plt.tight_layout()
    plt.show()
    
    return {
        'pearson': corr_pearson,
        'spearman': corr_spearman,
        'p_value': p_pearson
    }`
  }
]

export const snippetCategories = [
  'All',
  'Data Processing',
  'Database',
  'Machine Learning',
  'Visualization',
  'Data Engineering',
  'Statistics'
]
