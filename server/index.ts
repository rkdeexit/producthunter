import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getProductResearchAgent } from './mastra';
import { ProductHuntAPI } from './lib/producthunt-api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Product Hunt Analyzer API is running' });
});

// Analyze product endpoint
app.post('/api/analyze-product', async (req, res) => {
  try {
    const { productUrl } = req.body;

    if (!productUrl) {
      return res.status(400).json({
        success: false,
        error: 'Product URL is required',
      });
    }

    // Get the agent
    const agent = getProductResearchAgent();

    // Generate analysis using the agent
    const prompt = `Please conduct a comprehensive analysis of the Product Hunt product at: ${productUrl}

Perform the following steps:

1. Use the get-product-details tool to fetch complete product information
2. Use the analyze-comments tool to understand user sentiment from the comments
3. Use the compare-metrics tool to benchmark the product's performance

Then provide a detailed report in the following JSON format:
{
  "productName": "...",
  "tagline": "...",
  "summary": "A 2-3 sentence executive summary",
  "metrics": {
    "votesCount": number,
    "commentsCount": number,
    "engagementRate": number,
    "performanceScore": number,
    "featured": boolean
  },
  "sentiment": {
    "overall": "positive/neutral/negative",
    "positiveCount": number,
    "negativeCount": number,
    "keyInsights": ["insight 1", "insight 2", ...]
  },
  "strengths": ["strength 1", "strength 2", ...],
  "weaknesses": ["weakness 1", "weakness 2", ...],
  "opportunities": ["opportunity 1", "opportunity 2", ...],
  "recommendations": ["recommendation 1", "recommendation 2", ...],
  "competitivePosition": "A brief assessment of market position",
  "categoryTrends": ["trend 1", "trend 2", ...]
}

Be specific and data-driven in your analysis.`;

    const response = await agent.generate(prompt, {
      maxSteps: 10,
    });

    // Try to parse JSON from the response
    let report;
    try {
      // Look for JSON in the response
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        report = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON found, create a structured response from the text
        report = {
          productName: 'Product Analysis',
          summary: response.text,
          rawAnalysis: response.text,
          metrics: {
            votesCount: 0,
            commentsCount: 0,
            engagementRate: 0,
            performanceScore: 0,
            featured: false,
          },
          sentiment: {
            overall: 'neutral',
            positiveCount: 0,
            negativeCount: 0,
            keyInsights: [],
          },
          strengths: [],
          weaknesses: [],
          opportunities: [],
          recommendations: [],
          competitivePosition: '',
          categoryTrends: [],
        };
      }
    } catch (parseError) {
      report = {
        productName: 'Product Analysis',
        summary: response.text,
        rawAnalysis: response.text,
      };
    }

    res.json({
      success: true,
      report,
      steps: response.steps || [],
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze product',
    });
  }
});

// Quick fetch product details (without agent analysis)
app.post('/api/product-details', async (req, res) => {
  try {
    const { productUrl } = req.body;

    if (!productUrl) {
      return res.status(400).json({
        success: false,
        error: 'Product URL is required',
      });
    }

    const productHuntToken = process.env.PRODUCT_HUNT_API_TOKEN;
    if (!productHuntToken) {
      return res.status(500).json({
        success: false,
        error: 'Product Hunt API token not configured',
      });
    }

    const phApi = new ProductHuntAPI(productHuntToken);

    // Extract slug from URL
    let slug = productUrl;
    if (productUrl.includes('producthunt.com')) {
      const extractedSlug = phApi.extractSlugFromUrl(productUrl);
      if (!extractedSlug) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Product Hunt URL format',
        });
      }
      slug = extractedSlug;
    }

    const product = await phApi.getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      product: {
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        votesCount: product.votesCount,
        commentsCount: product.commentsCount,
        url: product.url,
        website: product.website,
        featured: product.featured,
        createdAt: product.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Product fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch product details',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - POST /api/analyze-product`);
  console.log(`   - POST /api/product-details`);
});
