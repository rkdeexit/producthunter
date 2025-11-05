import { useState } from 'react';
import { config } from '../config';
import './AgentAnalysis.css';

interface AgentReport {
  productName?: string;
  tagline?: string;
  summary: string;
  metrics?: {
    votesCount: number;
    commentsCount: number;
    engagementRate: number;
    performanceScore: number;
    featured: boolean;
  };
  sentiment?: {
    overall: string;
    positiveCount: number;
    negativeCount: number;
    keyInsights: string[];
  };
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  recommendations?: string[];
  competitivePosition?: string;
  categoryTrends?: string[];
  rawAnalysis?: string;
}

export const AgentAnalysis = () => {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AgentReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<any[]>([]);

  const handleAnalyze = async () => {
    if (!productUrl.trim()) {
      setError('Please enter a Product Hunt URL');
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);
    setSteps([]);

    try {
      const response = await fetch(`${config.apiUrl}/api/analyze-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze product');
      }

      setReport(data.report);
      setSteps(data.steps || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the product');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProductUrl('');
    setReport(null);
    setError(null);
    setSteps([]);
  };

  return (
    <div className="agent-analysis">
      <div className="agent-header">
        <h2>🤖 AI Agent Deep Research</h2>
        <p>Powered by Mastra.ai - Get comprehensive, AI-driven product insights</p>
      </div>

      {!report ? (
        <div className="input-section">
          <div className="url-input-group">
            <input
              type="text"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="Enter Product Hunt URL (e.g., https://www.producthunt.com/posts/your-product)"
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !productUrl.trim()}
              className="analyze-button"
            >
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>AI Agent is researching the product...</p>
              <p className="loading-hint">This may take 30-60 seconds for a thorough analysis</p>
            </div>
          )}

          <div className="example-urls">
            <p className="example-title">Try these examples:</p>
            <button
              className="example-link"
              onClick={() => setProductUrl('https://www.producthunt.com/posts/notion')}
            >
              Notion
            </button>
            <button
              className="example-link"
              onClick={() => setProductUrl('https://www.producthunt.com/posts/chatgpt')}
            >
              ChatGPT
            </button>
          </div>
        </div>
      ) : (
        <div className="report-section">
          <div className="report-header">
            <div>
              {report.productName && <h3>{report.productName}</h3>}
              {report.tagline && <p className="report-tagline">{report.tagline}</p>}
            </div>
            <button onClick={handleReset} className="new-analysis-button">
              New Analysis
            </button>
          </div>

          {/* Executive Summary */}
          <div className="report-card">
            <h4>📋 Executive Summary</h4>
            <p className="summary-text">{report.summary}</p>
          </div>

          {/* Metrics */}
          {report.metrics && (
            <div className="report-card">
              <h4>📊 Performance Metrics</h4>
              <div className="metrics-grid">
                <div className="metric">
                  <span className="metric-label">Upvotes</span>
                  <span className="metric-value">{report.metrics.votesCount}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Comments</span>
                  <span className="metric-value">{report.metrics.commentsCount}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Engagement</span>
                  <span className="metric-value">{report.metrics.engagementRate}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Score</span>
                  <span className="metric-value">{report.metrics.performanceScore}</span>
                </div>
              </div>
              {report.metrics.featured && (
                <div className="featured-badge">⭐ Featured Product</div>
              )}
            </div>
          )}

          {/* Sentiment Analysis */}
          {report.sentiment && report.sentiment.keyInsights.length > 0 && (
            <div className="report-card">
              <h4>💭 Sentiment Analysis</h4>
              <div className="sentiment-overview">
                <span className="sentiment-label">Overall Sentiment:</span>
                <span className={`sentiment-badge ${report.sentiment.overall}`}>
                  {report.sentiment.overall}
                </span>
              </div>
              <ul className="insights-list">
                {report.sentiment.keyInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Strengths */}
          {report.strengths && report.strengths.length > 0 && (
            <div className="report-card strengths-card">
              <h4>💪 Strengths</h4>
              <ul>
                {report.strengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Weaknesses */}
          {report.weaknesses && report.weaknesses.length > 0 && (
            <div className="report-card weaknesses-card">
              <h4>⚠️ Weaknesses</h4>
              <ul>
                {report.weaknesses.map((weakness, idx) => (
                  <li key={idx}>{weakness}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Opportunities */}
          {report.opportunities && report.opportunities.length > 0 && (
            <div className="report-card opportunities-card">
              <h4>🎯 Opportunities</h4>
              <ul>
                {report.opportunities.map((opportunity, idx) => (
                  <li key={idx}>{opportunity}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {report.recommendations && report.recommendations.length > 0 && (
            <div className="report-card recommendations-card">
              <h4>🚀 Recommendations</h4>
              <ul>
                {report.recommendations.map((recommendation, idx) => (
                  <li key={idx}>{recommendation}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Competitive Position */}
          {report.competitivePosition && (
            <div className="report-card">
              <h4>🏆 Competitive Position</h4>
              <p>{report.competitivePosition}</p>
            </div>
          )}

          {/* Category Trends */}
          {report.categoryTrends && report.categoryTrends.length > 0 && (
            <div className="report-card">
              <h4>📈 Category Trends</h4>
              <div className="trends-list">
                {report.categoryTrends.map((trend, idx) => (
                  <span key={idx} className="trend-badge">{trend}</span>
                ))}
              </div>
            </div>
          )}

          {/* Raw Analysis (if structured data not available) */}
          {report.rawAnalysis && !report.metrics && (
            <div className="report-card">
              <h4>📝 Full Analysis</h4>
              <div className="raw-analysis">{report.rawAnalysis}</div>
            </div>
          )}

          {/* Agent Steps (for debugging) */}
          {steps.length > 0 && (
            <details className="steps-details">
              <summary>View Agent Steps ({steps.length})</summary>
              <div className="steps-list">
                {steps.map((step, idx) => (
                  <div key={idx} className="step-item">
                    <strong>Step {idx + 1}:</strong> {JSON.stringify(step, null, 2)}
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
};
