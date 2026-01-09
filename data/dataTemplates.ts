import { DataFormData } from '@/types';

export interface DataTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  data: Partial<DataFormData>;
}

export const dataTemplates: DataTemplate[] = [
  {
    id: 'sales-analysis',
    name: 'Sales Analysis',
    description: 'Revenue and sales performance analysis',
    preview: '💰',
    data: {
      analysisType: 'Trend Analysis',
      dataDescription: 'Sales data with revenue, units, products, and regions',
      objectives: 'Identify sales trends, top performers, and growth opportunities',
      metrics: 'Revenue, Units Sold, Conversion Rate, Average Order Value',
      visualization: 'Interactive Dashboard',
      tools: 'Python (Pandas, NumPy)',
      format: 'Executive Summary',
    },
  },
  {
    id: 'customer-segmentation',
    name: 'Customer Segmentation',
    description: 'Segment customers by behavior',
    preview: '👥',
    data: {
      analysisType: 'Segmentation',
      dataDescription: 'Customer data with demographics, purchase history, and behavior',
      objectives: 'Identify customer segments for targeted marketing',
      metrics: 'Customer Lifetime Value, Recency, Frequency, Monetary',
      visualization: 'Charts & Graphs',
      tools: 'Python (Pandas, NumPy)',
      format: 'Report with Insights',
    },
  },
  {
    id: 'ab-test',
    name: 'A/B Test Analysis',
    description: 'Analyze experiment results',
    preview: '🧪',
    data: {
      analysisType: 'A/B Test Analysis',
      dataDescription: 'Experiment data with control and treatment groups',
      objectives: 'Determine statistical significance and winner',
      metrics: 'Conversion Rate, Sample Size, P-value, Confidence Interval',
      visualization: 'Bar/Column Charts',
      tools: 'Python (Pandas, NumPy)',
      format: 'Technical Analysis',
    },
  },
  {
    id: 'churn-prediction',
    name: 'Churn Prediction',
    description: 'Predict customer churn risk',
    preview: '📉',
    data: {
      analysisType: 'Predictive Modeling',
      dataDescription: 'Customer data with engagement metrics and churn labels',
      objectives: 'Build model to predict churn risk and identify key factors',
      metrics: 'Churn Rate, Precision, Recall, F1 Score, AUC',
      visualization: 'Charts & Graphs',
      tools: 'Python (Pandas, NumPy)',
      format: 'Technical Analysis',
    },
  },
  {
    id: 'time-series-forecast',
    name: 'Time Series Forecast',
    description: 'Predict future trends',
    preview: '📈',
    data: {
      analysisType: 'Time Series Analysis',
      dataDescription: 'Historical time-based data with timestamps',
      objectives: 'Generate forecasts and identify patterns',
      metrics: 'MAPE, RMSE, Trend, Seasonality',
      visualization: 'Time Series Charts',
      tools: 'Python (Pandas, NumPy)',
      format: 'Report with Insights',
    },
  },
  {
    id: 'marketing-attribution',
    name: 'Marketing Attribution',
    description: 'Analyze marketing channel impact',
    preview: '🎯',
    data: {
      analysisType: 'Correlation Analysis',
      dataDescription: 'Marketing spend and conversion data across channels',
      objectives: 'Understand channel contribution and optimize spend',
      metrics: 'ROI, CAC, Attribution Weight, Channel Efficiency',
      visualization: 'Funnel Charts',
      tools: 'SQL',
      format: 'Dashboard',
    },
  },
  {
    id: 'cohort-retention',
    name: 'Cohort Retention',
    description: 'Track user retention over time',
    preview: '🔄',
    data: {
      analysisType: 'Cohort Analysis',
      dataDescription: 'User activity data with signup dates',
      objectives: 'Analyze retention patterns by cohort',
      metrics: 'Retention Rate, Churn Rate, LTV by Cohort',
      visualization: 'Heatmaps',
      tools: 'SQL',
      format: 'Report with Insights',
    },
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Analyze customer feedback sentiment',
    preview: '💬',
    data: {
      analysisType: 'Sentiment Analysis',
      dataDescription: 'Customer reviews, feedback, or social media data',
      objectives: 'Understand customer sentiment and key themes',
      metrics: 'Sentiment Score, Topic Distribution, NPS',
      visualization: 'Charts & Graphs',
      tools: 'Python (Pandas, NumPy)',
      format: 'Report with Insights',
    },
  },
];
