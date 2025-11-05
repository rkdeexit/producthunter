# Testing Guide for Product Hunt Analyzer

## Prerequisites

Before testing, you need to obtain API keys:

### 1. Get Product Hunt API Token

**Option A: Use Product Hunt API (Requires Account)**
1. Go to https://www.producthunt.com/v2/oauth/applications
2. Sign in to Product Hunt
3. Create a new application
4. Get your API token

**Option B: Test Without Product Hunt API (Limited)**
- You can test the manual analysis mode without this token
- AI Agent mode requires the Product Hunt API token

### 2. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Create a new API key
4. Copy the key (you won't see it again!)

**Note:** OpenAI API usage costs money (though minimal for testing):
- GPT-4o-mini: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- A typical analysis costs $0.01-0.05

### 3. Configure Environment Variables

Open `.env` file and add your keys:

\`\`\`env
# Product Hunt API
PRODUCT_HUNT_API_TOKEN=your_actual_token_here

# OpenAI API
OPENAI_API_KEY=sk-your_actual_key_here
\`\`\`

## Running the Application

### Terminal 1: Start Frontend
\`\`\`bash
npm run dev
\`\`\`

This will start the frontend at: http://localhost:5173

### Terminal 2: Start Backend
\`\`\`bash
npm run dev:server
\`\`\`

This will start the API server at: http://localhost:3001

## Testing Scenarios

### Test 1: Manual Analysis Mode (No API Keys Required)

1. Open http://localhost:5173 in your browser
2. Click on "📝 Manual Analysis" tab
3. Fill in the form with test data:
   - Product Name: "TestApp"
   - Tagline: "A revolutionary new app for testing"
   - Description: "This is a test product with amazing features that will change the world"
   - Category: "AI"
   - Upvotes: 250
   - Comments: 45
   - Launch Date: Today's date
4. Click "Analyze Product"
5. ✅ You should see analysis results with score, insights, and recommendations

### Test 2: AI Agent Mode (Requires API Keys)

1. Make sure both API keys are set in `.env`
2. Open http://localhost:5173
3. Click on "🤖 AI Agent Research" tab
4. Enter a Product Hunt URL:
   - Example: `https://www.producthunt.com/posts/notion`
   - Or just the slug: `notion`
5. Click "Analyze with AI"
6. ✅ Wait 30-60 seconds for the AI agent to:
   - Fetch product data
   - Analyze comments
   - Generate comprehensive report

### Test 3: Backend API Directly

#### Test Health Endpoint
\`\`\`bash
curl http://localhost:3001/api/health
\`\`\`

Expected response:
\`\`\`json
{"status":"ok","message":"Product Hunt Analyzer API is running"}
\`\`\`

#### Test Product Details Endpoint
\`\`\`bash
curl -X POST http://localhost:3001/api/product-details \\
  -H "Content-Type: application/json" \\
  -d '{"productUrl": "notion"}'
\`\`\`

#### Test AI Analysis Endpoint
\`\`\`bash
curl -X POST http://localhost:3001/api/analyze-product \\
  -H "Content-Type: application/json" \\
  -d '{"productUrl": "notion"}'
\`\`\`

## Troubleshooting

### Error: "Product Hunt API token not configured"
- Check that `PRODUCT_HUNT_API_TOKEN` is set in `.env`
- Restart the backend server after adding the token

### Error: "No API key configured. Please set OPENAI_API_KEY"
- Check that `OPENAI_API_KEY` is set in `.env`
- Make sure the key starts with `sk-`
- Restart the backend server

### Error: "Failed to download onnxruntime binaries"
- This is from Mastra.ai installation
- Run: `npm install --onnxruntime-node-install-cuda=skip`

### Frontend not loading
- Check that port 5173 is available
- Run `npm run dev` and look for errors
- Check browser console for errors

### Backend not responding
- Check that port 3001 is available
- Look at the terminal running `npm run dev:server` for errors
- Verify `.env` file exists and has correct values

### CORS errors
- Make sure both frontend (5173) and backend (3001) are running
- Check browser console for specific CORS errors

## Quick Test Without API Keys

If you don't have API keys yet, you can still test:

1. Use only the "📝 Manual Analysis" tab
2. This mode works entirely in the browser
3. No backend or API keys needed
4. Great for testing the UI and basic analysis logic

## Expected Results

### Manual Analysis Should Show:
- Overall performance score (0-100)
- Engagement rate percentage
- Virality score
- Key insights based on metrics
- Recommendations for improvement
- Category trend information

### AI Agent Analysis Should Show:
- Executive summary
- Detailed performance metrics
- Sentiment analysis from comments
- Strengths and weaknesses
- Opportunities
- Actionable recommendations
- Competitive positioning
- Category trends

## Performance Notes

- Manual analysis: Instant
- AI agent analysis: 30-60 seconds (depends on OpenAI API speed)
- First load may be slower due to Mastra.ai initialization
