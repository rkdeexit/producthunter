import { useState } from 'react';
import type { Product, AnalysisResult } from './types';
import { ProductForm } from './components/ProductForm';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeProduct } from './utils/analyzer';
import './App.css';

function App() {
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

      <main className="app-main">
        {!currentProduct || !analysis ? (
          <ProductForm onSubmit={handleProductSubmit} />
        ) : (
          <AnalysisResults
            product={currentProduct}
            analysis={analysis}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with React & TypeScript | Data-driven insights for Product Hunt success
        </p>
      </footer>
    </div>
  );
}

export default App;
