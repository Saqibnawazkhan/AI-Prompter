import { DataFormData } from '@/types';

export function generateDataPrompt(data: DataFormData): string {
  const sections: string[] = [];

  // Header
  sections.push(`# Data Analysis Request\n`);
  sections.push('---\n\n');

  // Analysis Overview
  sections.push('## 📊 Analysis Overview\n\n');
  sections.push(`| Attribute | Details |\n`);
  sections.push(`|-----------|----------|\n`);
  sections.push(`| **Analysis Type** | ${data.analysisType} |\n`);
  if (data.timeframe) {
    sections.push(`| **Timeframe** | ${data.timeframe} |\n`);
  }
  if (data.tools) {
    sections.push(`| **Preferred Tools** | ${data.tools} |\n`);
  }
  if (data.format) {
    sections.push(`| **Output Format** | ${data.format} |\n`);
  }
  if (data.audience) {
    sections.push(`| **Target Audience** | ${data.audience} |\n`);
  }
  sections.push('\n');

  // Data Description
  sections.push('## 💾 Data Description\n\n');
  if (data.dataDescription) {
    sections.push(`${data.dataDescription}\n\n`);
  }
  if (data.dataSource) {
    sections.push(`**Data Source:** ${data.dataSource}\n\n`);
  }

  // Analysis Objectives
  sections.push('## 🎯 Analysis Objectives\n\n');
  if (data.objectives) {
    const objectives = data.objectives.split('\n').filter(o => o.trim());
    if (objectives.length > 1) {
      objectives.forEach((obj, index) => {
        const cleanObj = obj.trim().replace(/^[-•*\d.]\s*/, '');
        if (cleanObj) {
          sections.push(`${index + 1}. ${cleanObj}\n`);
        }
      });
    } else {
      sections.push(`${data.objectives}\n`);
    }
    sections.push('\n');
  }

  // Key Metrics
  if (data.metrics) {
    sections.push('## 📈 Key Metrics to Analyze\n\n');
    const metrics = data.metrics.split(',').map(m => m.trim()).filter(m => m);
    if (metrics.length > 0) {
      metrics.forEach(metric => {
        sections.push(`- ${metric}\n`);
      });
      sections.push('\n');
    }
  }

  // Visualization Requirements
  if (data.visualization) {
    sections.push('## 📉 Visualization Requirements\n\n');
    sections.push(`**Preferred Visualization:** ${data.visualization}\n\n`);
    sections.push('Include appropriate visualizations that:\n');
    sections.push('- Clearly communicate key findings\n');
    sections.push('- Are accessible to the target audience\n');
    sections.push('- Support the analysis objectives\n');
    sections.push('- Use consistent styling and labeling\n\n');
  }

  // Expected Deliverables
  if (data.deliverables) {
    sections.push('## 📦 Expected Deliverables\n\n');
    const deliverables = data.deliverables.split('\n').filter(d => d.trim());
    if (deliverables.length > 1) {
      deliverables.forEach(del => {
        const cleanDel = del.trim().replace(/^[-•*]\s*/, '');
        if (cleanDel) {
          sections.push(`- [ ] ${cleanDel}\n`);
        }
      });
    } else {
      sections.push(`${data.deliverables}\n`);
    }
    sections.push('\n');
  }

  // Constraints
  if (data.constraints) {
    sections.push('## ⚠️ Constraints & Considerations\n\n');
    sections.push(`${data.constraints}\n\n`);
  }

  // Analysis Framework based on type
  sections.push('## 🔬 Recommended Analysis Approach\n\n');

  switch (data.analysisType) {
    case 'Exploratory Analysis':
      sections.push('### Exploratory Data Analysis (EDA) Framework\n\n');
      sections.push('1. **Data Overview**\n');
      sections.push('   - Dataset dimensions and structure\n');
      sections.push('   - Data types and missing values\n');
      sections.push('   - Basic statistics (mean, median, mode, std)\n\n');
      sections.push('2. **Univariate Analysis**\n');
      sections.push('   - Distribution of each variable\n');
      sections.push('   - Outlier detection\n');
      sections.push('   - Frequency distributions\n\n');
      sections.push('3. **Bivariate/Multivariate Analysis**\n');
      sections.push('   - Correlations between variables\n');
      sections.push('   - Cross-tabulations\n');
      sections.push('   - Pattern identification\n\n');
      break;

    case 'Statistical Analysis':
      sections.push('### Statistical Analysis Framework\n\n');
      sections.push('1. **Descriptive Statistics**\n');
      sections.push('   - Central tendency measures\n');
      sections.push('   - Dispersion measures\n');
      sections.push('   - Distribution characteristics\n\n');
      sections.push('2. **Inferential Statistics**\n');
      sections.push('   - Hypothesis testing\n');
      sections.push('   - Confidence intervals\n');
      sections.push('   - Statistical significance tests\n\n');
      sections.push('3. **Advanced Analysis**\n');
      sections.push('   - Regression analysis (if applicable)\n');
      sections.push('   - ANOVA (if comparing groups)\n');
      sections.push('   - Effect size calculations\n\n');
      break;

    case 'Predictive Modeling':
      sections.push('### Predictive Modeling Framework\n\n');
      sections.push('1. **Data Preparation**\n');
      sections.push('   - Feature engineering\n');
      sections.push('   - Train/test split\n');
      sections.push('   - Data normalization/standardization\n\n');
      sections.push('2. **Model Selection**\n');
      sections.push('   - Algorithm comparison\n');
      sections.push('   - Hyperparameter tuning\n');
      sections.push('   - Cross-validation\n\n');
      sections.push('3. **Model Evaluation**\n');
      sections.push('   - Performance metrics (accuracy, precision, recall, F1)\n');
      sections.push('   - ROC/AUC analysis\n');
      sections.push('   - Feature importance\n\n');
      break;

    case 'Time Series Analysis':
      sections.push('### Time Series Analysis Framework\n\n');
      sections.push('1. **Data Exploration**\n');
      sections.push('   - Time series decomposition\n');
      sections.push('   - Trend identification\n');
      sections.push('   - Seasonality patterns\n\n');
      sections.push('2. **Stationarity Testing**\n');
      sections.push('   - ADF test\n');
      sections.push('   - KPSS test\n');
      sections.push('   - Differencing if needed\n\n');
      sections.push('3. **Forecasting**\n');
      sections.push('   - Model selection (ARIMA, Prophet, etc.)\n');
      sections.push('   - Forecast generation\n');
      sections.push('   - Confidence intervals\n\n');
      break;

    case 'A/B Test Analysis':
      sections.push('### A/B Test Analysis Framework\n\n');
      sections.push('1. **Test Setup Validation**\n');
      sections.push('   - Sample size adequacy\n');
      sections.push('   - Randomization check\n');
      sections.push('   - Metric definitions\n\n');
      sections.push('2. **Statistical Analysis**\n');
      sections.push('   - Conversion rate comparison\n');
      sections.push('   - Statistical significance testing\n');
      sections.push('   - Confidence intervals\n\n');
      sections.push('3. **Results Interpretation**\n');
      sections.push('   - Effect size calculation\n');
      sections.push('   - Practical significance\n');
      sections.push('   - Recommendations\n\n');
      break;

    case 'Cohort Analysis':
      sections.push('### Cohort Analysis Framework\n\n');
      sections.push('1. **Cohort Definition**\n');
      sections.push('   - Define cohort criteria\n');
      sections.push('   - Time period segmentation\n');
      sections.push('   - User grouping logic\n\n');
      sections.push('2. **Retention Analysis**\n');
      sections.push('   - Period-over-period retention\n');
      sections.push('   - Cohort retention curves\n');
      sections.push('   - Churn analysis\n\n');
      sections.push('3. **Behavioral Insights**\n');
      sections.push('   - Cohort comparison\n');
      sections.push('   - Lifecycle patterns\n');
      sections.push('   - Value analysis by cohort\n\n');
      break;

    default:
      sections.push('### General Analysis Steps\n\n');
      sections.push('1. **Data Understanding**\n');
      sections.push('   - Review data structure and quality\n');
      sections.push('   - Identify key variables\n');
      sections.push('   - Document assumptions\n\n');
      sections.push('2. **Analysis Execution**\n');
      sections.push('   - Apply appropriate analytical methods\n');
      sections.push('   - Generate insights\n');
      sections.push('   - Create visualizations\n\n');
      sections.push('3. **Results Communication**\n');
      sections.push('   - Summarize findings\n');
      sections.push('   - Provide actionable recommendations\n');
      sections.push('   - Document methodology\n\n');
  }

  // Output Requirements
  sections.push('## 📋 Output Requirements\n\n');
  sections.push(`**Format:** ${data.format || 'Report with Insights'}\n\n`);

  if (data.format === 'Executive Summary') {
    sections.push('Structure the output as:\n');
    sections.push('- Key findings (3-5 bullet points)\n');
    sections.push('- Critical metrics summary\n');
    sections.push('- Recommended actions\n');
    sections.push('- High-level visualization\n\n');
  } else if (data.format === 'Technical Analysis') {
    sections.push('Structure the output as:\n');
    sections.push('- Detailed methodology\n');
    sections.push('- Complete statistical analysis\n');
    sections.push('- Code snippets (if applicable)\n');
    sections.push('- Technical appendix\n\n');
  } else if (data.format === 'Interactive Notebook') {
    sections.push('Structure the output as:\n');
    sections.push('- Jupyter/Colab notebook format\n');
    sections.push('- Executable code cells\n');
    sections.push('- Inline visualizations\n');
    sections.push('- Markdown documentation\n\n');
  } else if (data.format === 'Dashboard') {
    sections.push('Structure the output as:\n');
    sections.push('- KPI summary cards\n');
    sections.push('- Interactive charts\n');
    sections.push('- Filter capabilities\n');
    sections.push('- Drill-down features\n\n');
  } else {
    sections.push('Structure the output as:\n');
    sections.push('- Executive summary\n');
    sections.push('- Detailed findings with visualizations\n');
    sections.push('- Methodology explanation\n');
    sections.push('- Conclusions and recommendations\n\n');
  }

  // Footer
  sections.push('---\n');
  sections.push('*Generated by AI Prompter - Data Analysis Module*\n');

  return sections.join('');
}
