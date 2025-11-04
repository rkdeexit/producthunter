import { useState } from 'react';
import type { Product, AnalysisResult } from './types';
import { ProductForm } from './components/ProductForm';
import { AnalysisResults } from './components/AnalysisResults';
import { AgentAnalysis } from './components/AgentAnalysis';
import { analyzeProduct } from './utils/analyzer';
import './App.css';

type TabType = 'manual' | 'ai-agent';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('ai-agent');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleProductSubmit = (product: Product) => {
    const result = analyzeProduct(product);
    setCurrentProduct(product);
    setAnalysis(result);
  };

  const handleReset = () => {
    setCurrentProduct(null);
    setAnalysis(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🦄 Product Hunt Analyzer</h1>
          <p className="subtitle">Get actionable insights for your Product Hunt launch</p>
        </div>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'ai-agent' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai-agent')}
          >
            🤖 AI Agent Research
          </button>
          <button
            className={`tab ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => setActiveTab('manual')}
          >
            📝 Manual Analysis
          </button>
        </div>
      </div>

      <main className="app-main">
        {activeTab === 'ai-agent' ? (
          <AgentAnalysis />
        ) : (
          <>
            {!currentProduct || !analysis ? (
              <ProductForm onSubmit={handleProductSubmit} />
            ) : (
              <AnalysisResults
                product={currentProduct}
                analysis={analysis}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with React, TypeScript & Mastra.ai | Data-driven insights for Product Hunt success
        </p>
      </footer>
    </div>
  );
}

export default App;
