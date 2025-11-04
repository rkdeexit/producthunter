import { useState } from 'react';
import type { Product } from '../types';
import './ProductForm.css';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

export const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    tagline: '',
    description: '',
    category: 'AI',
    upvotes: 0,
    comments: 0,
    launchDate: new Date().toISOString().split('T')[0],
    url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'upvotes' || name === 'comments' ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-header">
        <h2>Enter Product Details</h2>
        <p>Analyze your Product Hunt launch performance</p>
      </div>

      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Claude Code"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tagline">Tagline *</label>
        <input
          type="text"
          id="tagline"
          name="tagline"
          value={formData.tagline}
          onChange={handleChange}
          placeholder="e.g., AI-powered coding assistant"
          maxLength={100}
          required
        />
        <span className="char-count">{formData.tagline.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your product in detail..."
          rows={4}
          required
        />
        <span className="char-count">{formData.description.length} characters</span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="AI">AI</option>
            <option value="Productivity">Productivity</option>
            <option value="Developer Tools">Developer Tools</option>
            <option value="Design Tools">Design Tools</option>
            <option value="Marketing">Marketing</option>
            <option value="Analytics">Analytics</option>
            <option value="SaaS">SaaS</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="launchDate">Launch Date *</label>
          <input
            type="date"
            id="launchDate"
            name="launchDate"
            value={formData.launchDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="upvotes">Upvotes *</label>
          <input
            type="number"
            id="upvotes"
            name="upvotes"
            value={formData.upvotes}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">Comments *</label>
          <input
            type="number"
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="url">Product Hunt URL (Optional)</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://www.producthunt.com/posts/..."
        />
      </div>

      <button type="submit" className="submit-button">
        Analyze Product
      </button>
    </form>
  );
};
