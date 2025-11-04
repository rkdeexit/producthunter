import type { Product, AnalysisResult } from '../types';
import './AnalysisResults.css';

interface AnalysisResultsProps {
  product: Product;
  analysis: AnalysisResult;
  onReset: () => void;
}

export const AnalysisResults = ({ product, analysis, onReset }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="analysis-results">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <button onClick={onReset} className="reset-button">
          Analyze Another Product
        </button>
      </div>

      <div className="product-summary">
        <h3>{product.name}</h3>
        <p className="tagline">{product.tagline}</p>
        <div className="product-stats">
          <div className="stat">
            <span className="stat-value">{product.upvotes}</span>
            <span className="stat-label">Upvotes</span>
          </div>
          <div className="stat">
            <span className="stat-value">{product.comments}</span>
            <span className="stat-label">Comments</span>
          </div>
          <div className="stat">
            <span className="stat-value">{product.category}</span>
            <span className="stat-label">Category</span>
          </div>
        </div>
      </div>

      <div className="score-section">
        <div className="score-circle" style={{ borderColor: getScoreColor(analysis.score) }}>
          <div className="score-value" style={{ color: getScoreColor(analysis.score) }}>
            {analysis.score}
          </div>
          <div className="score-label">{getScoreLabel(analysis.score)}</div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💬</div>
          <div className="metric-value">{analysis.engagementRate}%</div>
          <div className="metric-label">Engagement Rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🚀</div>
          <div className="metric-value">{analysis.viralityScore}</div>
          <div className="metric-label">Virality Score</div>
        </div>
      </div>

      <div className="section">
        <h4>📊 Category Trend</h4>
        <div className="trend-badge">{analysis.categoryTrend}</div>
      </div>

      {analysis.insights.length > 0 && (
        <div className="section">
          <h4>💡 Key Insights</h4>
          <ul className="insights-list">
            {analysis.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      {analysis.recommendations.length > 0 && (
        <div className="section">
          <h4>🎯 Recommendations</h4>
          <ul className="recommendations-list">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      {product.url && (
        <div className="section">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="product-link"
          >
            View on Product Hunt →
          </a>
        </div>
      )}
    </div>
  );
};
