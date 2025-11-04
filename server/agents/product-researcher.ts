import { Agent } from '@mastra/core';
import { createProductHuntTools } from '../tools/producthunt-tools';

export const createProductResearchAgent = (productHuntToken: string, model: any) => {
  const tools = createProductHuntTools(productHuntToken);

  const agent = new Agent({
    name: 'Product Hunt Researcher',
    instructions: `You are an expert Product Hunt analyst and researcher. Your role is to:

1. Deep research products on Product Hunt
2. Analyze product performance metrics
3. Understand user sentiment from comments and reviews
4. Identify trends and competitive positioning
5. Generate comprehensive, actionable reports

When analyzing a product:
- First, fetch the complete product details including metrics, comments, and reviews
- Analyze the comment sentiment to understand user feedback
- Compare metrics against Product Hunt benchmarks
- Identify strengths, weaknesses, and opportunities
- Provide specific, actionable recommendations

Your reports should be:
- Data-driven with specific metrics
- Insightful with pattern recognition
- Actionable with clear next steps
- Professional yet accessible

Always cite specific numbers and examples from the data.`,
    model,
    tools: {
      ...tools,
    },
  });

  return agent;
};

interface ProductReport {
  summary: string;
  metrics: {
    votesCount: number;
    commentsCount: number;
    engagementRate: number;
    performanceScore: number;
    featured: boolean;
  };
  sentiment: {
    overall: string;
    positiveCount: number;
    negativeCount: number;
    keyInsights: string[];
  };
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  recommendations: string[];
  competitivePosition: string;
}

export const generateProductReport = async (
  agent: Agent,
  productUrl: string
): Promise<ProductReport> => {
  const prompt = `Please conduct a comprehensive analysis of the Product Hunt product at: ${productUrl}

Your analysis should include:

1. **Product Overview**: Name, tagline, description, and key features
2. **Performance Metrics**: Votes, comments, engagement rate, and performance score
3. **Sentiment Analysis**: Overall sentiment from comments and reviews
4. **Strengths**: What the product does well
5. **Weaknesses**: Areas for improvement
6. **Opportunities**: Market gaps and growth potential
7. **Recommendations**: Specific, actionable next steps
8. **Competitive Position**: How it stands in its category

Use the available tools to:
- Get detailed product information
- Analyze comment sentiment
- Compare metrics against benchmarks

Please provide a structured, comprehensive report.`;

  try {
    const response = await agent.generate(prompt);

    // Parse the agent's response
    // Note: The actual parsing would depend on the response format
    // This is a simplified version

    return {
      summary: response.text || 'Analysis completed',
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
    };
  } catch (error: any) {
    throw new Error(`Failed to generate report: ${error.message}`);
  }
};
