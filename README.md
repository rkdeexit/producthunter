# 🦄 Product Hunt Analyzer

A powerful web application built with React, TypeScript, and Mastra.ai that helps you analyze Product Hunt launches and get actionable insights for better performance.

## ✨ Features

### 🤖 AI Agent Deep Research (Powered by Mastra.ai)
- **Automated Product Analysis**: Just paste a Product Hunt URL and let the AI agent do the research
- **Product Hunt API Integration**: Real-time data fetching from Product Hunt
- **Sentiment Analysis**: Understand user feedback from comments and reviews
- **Competitive Benchmarking**: Compare metrics against Product Hunt averages
- **Comprehensive Reports**: Get detailed insights on strengths, weaknesses, and opportunities
- **Actionable Recommendations**: Receive specific next steps to improve performance

### 📝 Manual Analysis Mode
- **Quick Analysis**: Enter product details manually for instant insights
- **Engagement Metrics**: Calculate engagement rate and virality score
- **Launch Timing Analysis**: Optimize your launch timing
- **Category Trends**: Understand category performance
- **Beautiful UI**: Modern, responsive design with smooth animations

## 🚀 Tech Stack

- **Frontend**: React 19 with TypeScript
- **AI Agent**: Mastra.ai with OpenAI GPT-4
- **API**: Product Hunt GraphQL API
- **Backend**: Express.js
- **Build Tool**: Vite
- **Styling**: CSS3 with modern gradients and animations

## 📦 Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- Product Hunt API Token ([Get it here](https://www.producthunt.com/v2/oauth/applications))
- OpenAI API Key ([Get it here](https://platform.openai.com/api-keys))

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd producthunter
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Product Hunt API
PRODUCT_HUNT_API_TOKEN=your_product_hunt_api_token_here

# OpenAI API (for Mastra agent)
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Start the development servers**

For both frontend and backend:
```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend API
npm run dev:server
```

Or run both together (on Unix-based systems):
```bash
npm run dev:all
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📖 Usage

### AI Agent Mode (Recommended)

1. Click on the "🤖 AI Agent Research" tab
2. Paste a Product Hunt URL (e.g., `https://www.producthunt.com/posts/notion`)
3. Click "Analyze with AI"
4. Wait 30-60 seconds while the agent:
   - Fetches product data from Product Hunt API
   - Analyzes comments and sentiment
   - Compares metrics against benchmarks
   - Generates a comprehensive report
5. Review the detailed analysis with insights and recommendations

### Manual Analysis Mode

1. Click on the "📝 Manual Analysis" tab
2. Fill in product details:
   - Product name, tagline, and description
   - Category and launch date
   - Upvotes and comments count
3. Click "Analyze Product"
4. View instant insights based on the metrics

## 🛠️ API Endpoints

### GET `/api/health`
Health check endpoint

### POST `/api/analyze-product`
Analyzes a Product Hunt product using the AI agent

**Request Body:**
```json
{
  "productUrl": "https://www.producthunt.com/posts/product-name"
}
```

**Response:**
```json
{
  "success": true,
  "report": {
    "productName": "Product Name",
    "summary": "Executive summary...",
    "metrics": { ... },
    "sentiment": { ... },
    "strengths": [...],
    "weaknesses": [...],
    "recommendations": [...]
  }
}
```

### POST `/api/product-details`
Quickly fetch product details without AI analysis

**Request Body:**
```json
{
  "productUrl": "https://www.producthunt.com/posts/product-name"
}
```

## 🏗️ Project Structure

```
producthunter/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── ProductForm.tsx       # Manual input form
│   │   ├── ProductForm.css
│   │   ├── AnalysisResults.tsx   # Manual analysis results
│   │   ├── AnalysisResults.css
│   │   ├── AgentAnalysis.tsx     # AI agent interface
│   │   └── AgentAnalysis.css
│   ├── utils/
│   │   └── analyzer.ts           # Client-side analysis logic
│   ├── types.ts                  # TypeScript interfaces
│   ├── App.tsx                   # Main app component
│   ├── App.css
│   └── index.css
│
├── server/                       # Backend source code
│   ├── agents/
│   │   └── product-researcher.ts # Mastra AI agent
│   ├── tools/
│   │   └── producthunt-tools.ts  # Product Hunt API tools
│   ├── lib/
│   │   └── producthunt-api.ts    # Product Hunt API client
│   ├── mastra.ts                 # Mastra configuration
│   └── index.ts                  # Express server
│
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── package.json
├── tsconfig.json                 # Frontend TypeScript config
├── tsconfig.server.json          # Backend TypeScript config
└── vite.config.ts
```

## 🔧 Development

### Build Commands

```bash
# Development
npm run dev              # Start frontend dev server
npm run dev:server       # Start backend dev server
npm run dev:all          # Start both servers

# Production
npm run build            # Build frontend
npm run build:server     # Build backend
npm run preview          # Preview production build
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PRODUCT_HUNT_API_TOKEN` | Product Hunt API token | Yes (for AI agent) |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | Yes (for AI agent) |
| `PORT` | Backend server port (default: 3001) | No |

## 📊 Analysis Metrics

The analyzer evaluates products based on:

- **Upvote Count**: Overall community interest
- **Comment Engagement**: Quality and quantity of discussions
- **Engagement Rate**: Comments-to-upvotes ratio
- **Virality Score**: Potential for viral growth
- **Launch Timing**: Day of week optimization
- **Content Quality**: Description and tagline effectiveness
- **Category Performance**: Trends in product category
- **Sentiment Analysis**: User feedback from comments
- **Competitive Position**: Benchmarking against averages

## 🎯 Score Breakdown

- **80-100**: Excellent - Outstanding performance
- **60-79**: Good - Strong launch with room for improvement
- **40-59**: Average - Needs optimization
- **0-39**: Needs Improvement - Significant changes recommended

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT

## 🙏 Acknowledgments

- [Product Hunt API](https://api.producthunt.com/v2/docs) for providing access to product data
- [Mastra.ai](https://mastra.ai) for the AI agent framework
- [OpenAI](https://openai.com) for GPT-4 model
- React and TypeScript communities

## 🐛 Troubleshooting

### "Product Hunt API token not configured"
Make sure you've added `PRODUCT_HUNT_API_TOKEN` to your `.env` file.

### "Failed to download onnxruntime binaries"
Run the install command with the CUDA skip flag:
```bash
npm install --onnxruntime-node-install-cuda=skip
```

### Backend server not starting
1. Check if port 3001 is available
2. Verify all environment variables are set
3. Run `npm install` to ensure all dependencies are installed

## 📧 Support

For issues and questions, please open an issue on GitHub.
