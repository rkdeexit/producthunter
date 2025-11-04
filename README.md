# 🦄 Product Hunt Analyzer

A powerful web application built with React and TypeScript that helps you analyze Product Hunt launches and get actionable insights for better performance.

## Features

- **Product Analysis**: Enter your product details and get comprehensive analysis
- **Engagement Metrics**: Calculate engagement rate and virality score
- **Smart Insights**: Get AI-powered insights about your launch performance
- **Recommendations**: Receive actionable recommendations to improve your product
- **Category Trends**: Understand how your category is performing on Product Hunt
- **Launch Timing Analysis**: Get feedback on optimal launch timing
- **Beautiful UI**: Modern, responsive design with smooth animations

## Tech Stack

- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Enter Product Details**: Fill in your product name, tagline, description, and metrics
2. **Select Category**: Choose the most relevant category for your product
3. **Add Metrics**: Input your upvotes and comments count
4. **Analyze**: Click "Analyze Product" to get insights
5. **Review Results**: See your score, insights, and recommendations

## Analysis Metrics

The analyzer evaluates your product based on:

- **Upvote Count**: Overall community interest
- **Comment Engagement**: Quality of discussions
- **Engagement Rate**: Comments-to-upvotes ratio
- **Virality Score**: Potential for viral growth
- **Launch Timing**: Day of week optimization
- **Content Quality**: Description and tagline effectiveness
- **Category Performance**: Trends in your product category

## Score Breakdown

- **80-100**: Excellent - Outstanding performance
- **60-79**: Good - Strong launch with room for improvement
- **40-59**: Average - Needs optimization
- **0-39**: Needs Improvement - Significant changes recommended

## Project Structure

```
src/
├── components/
│   ├── ProductForm.tsx         # Input form for product details
│   ├── ProductForm.css         # Form styling
│   ├── AnalysisResults.tsx     # Results display component
│   └── AnalysisResults.css     # Results styling
├── utils/
│   └── analyzer.ts             # Analysis algorithm
├── types.ts                    # TypeScript interfaces
├── App.tsx                     # Main app component
├── App.css                     # App layout styles
└── index.css                   # Global styles
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
