import { createTool } from '@mastra/core';
import { z } from 'zod';
import { ProductHuntAPI } from '../lib/producthunt-api';

export const createProductHuntTools = (apiToken: string) => {
  const phApi = new ProductHuntAPI(apiToken);

  const getProductDetails = createTool({
    id: 'get-product-details',
    description: 'Fetches detailed information about a Product Hunt product using its URL or slug. Returns product details, metrics, comments, reviews, makers, and categories.',
    inputSchema: z.object({
      productUrl: z.string().describe('The Product Hunt URL or slug of the product'),
    }),
    execute: async ({ context }) => {
      try {
        const { productUrl } = context;

        // Extract slug from URL if needed
        let slug = productUrl;
        if (productUrl.includes('producthunt.com')) {
          const extractedSlug = phApi.extractSlugFromUrl(productUrl);
          if (!extractedSlug) {
            return {
              success: false,
              error: 'Invalid Product Hunt URL format',
            };
          }
          slug = extractedSlug;
        }

        const product = await phApi.getProductBySlug(slug);

        if (!product) {
          return {
            success: false,
            error: 'Product not found',
          };
        }

        // Extract topics/categories
        const topics = product.topics?.edges?.map((edge: any) => edge.node.name) || [];

        // Extract makers
        const makers = product.makers?.edges?.map((edge: any) => ({
          name: edge.node.name,
          username: edge.node.username,
          headline: edge.node.headline,
        })) || [];

        // Extract comments
        const comments = product.comments?.edges?.map((edge: any) => ({
          body: edge.node.body,
          author: edge.node.user.name,
          votesCount: edge.node.votesCount,
          createdAt: edge.node.createdAt,
        })) || [];

        // Extract reviews
        const reviews = product.reviews?.edges?.map((edge: any) => ({
          rating: edge.node.rating,
          body: edge.node.body,
          author: edge.node.user.name,
          createdAt: edge.node.createdAt,
        })) || [];

        return {
          success: true,
          data: {
            id: product.id,
            name: product.name,
            tagline: product.tagline,
            description: product.description,
            url: product.url,
            website: product.website,
            votesCount: product.votesCount,
            commentsCount: product.commentsCount,
            createdAt: product.createdAt,
            featured: product.featured,
            topics,
            makers,
            comments: comments.slice(0, 20), // Limit to top 20 comments
            reviews,
            thumbnail: product.thumbnail?.url,
          },
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message,
        };
      }
    },
  });

  const analyzeComments = createTool({
    id: 'analyze-comments',
    description: 'Analyzes the sentiment and key themes from product comments. Returns insights about user feedback, common questions, and sentiment analysis.',
    inputSchema: z.object({
      comments: z.array(z.object({
        body: z.string(),
        author: z.string(),
        votesCount: z.number(),
      })).describe('Array of comments to analyze'),
    }),
    execute: async ({ context }) => {
      const { comments } = context;

      if (!comments || comments.length === 0) {
        return {
          success: true,
          data: {
            totalComments: 0,
            sentiment: 'neutral',
            insights: ['No comments available for analysis'],
          },
        };
      }

      // Simple sentiment analysis based on keywords
      let positiveCount = 0;
      let negativeCount = 0;
      let questionCount = 0;
      const themes: { [key: string]: number } = {};

      const positiveWords = ['great', 'awesome', 'love', 'excellent', 'amazing', 'fantastic', 'useful', 'helpful', 'innovative'];
      const negativeWords = ['bad', 'poor', 'disappointing', 'issue', 'problem', 'confusing', 'difficult'];

      comments.forEach(comment => {
        const body = comment.body.toLowerCase();

        // Count sentiment
        positiveWords.forEach(word => {
          if (body.includes(word)) positiveCount++;
        });

        negativeWords.forEach(word => {
          if (body.includes(word)) negativeCount++;
        });

        // Count questions
        if (body.includes('?')) questionCount++;

        // Extract potential themes (simple keyword extraction)
        const words = body.split(/\s+/);
        words.forEach(word => {
          if (word.length > 5) {
            themes[word] = (themes[word] || 0) + 1;
          }
        });
      });

      // Determine overall sentiment
      let sentiment = 'neutral';
      if (positiveCount > negativeCount * 1.5) sentiment = 'positive';
      else if (negativeCount > positiveCount * 1.5) sentiment = 'negative';
      else if (positiveCount > negativeCount) sentiment = 'mostly positive';
      else if (negativeCount > positiveCount) sentiment = 'mostly negative';

      // Get top themes
      const topThemes = Object.entries(themes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word);

      const insights = [];
      insights.push(`Overall sentiment: ${sentiment}`);
      insights.push(`${questionCount} questions found in comments (${Math.round((questionCount / comments.length) * 100)}% of comments)`);

      if (topThemes.length > 0) {
        insights.push(`Common discussion topics: ${topThemes.join(', ')}`);
      }

      // Highlight most upvoted comments
      const topComments = [...comments]
        .sort((a, b) => b.votesCount - a.votesCount)
        .slice(0, 3);

      return {
        success: true,
        data: {
          totalComments: comments.length,
          sentiment,
          positiveCount,
          negativeCount,
          questionCount,
          topThemes,
          insights,
          topComments,
        },
      };
    },
  });

  const compareMetrics = createTool({
    id: 'compare-metrics',
    description: 'Compares product metrics against benchmarks and provides performance insights.',
    inputSchema: z.object({
      votesCount: z.number().describe('Number of upvotes'),
      commentsCount: z.number().describe('Number of comments'),
      featured: z.boolean().describe('Whether the product was featured'),
      topics: z.array(z.string()).describe('Product categories/topics'),
    }),
    execute: async ({ context }) => {
      const { votesCount, commentsCount, featured, topics } = context;

      const engagementRate = votesCount > 0 ? (commentsCount / votesCount) * 100 : 0;

      // Benchmark data (approximate Product Hunt averages)
      const benchmarks = {
        votes: {
          low: 50,
          average: 200,
          high: 500,
          excellent: 1000,
        },
        engagementRate: {
          low: 5,
          average: 15,
          high: 30,
        },
      };

      const insights = [];
      let performanceScore = 0;

      // Analyze votes
      if (votesCount >= benchmarks.votes.excellent) {
        insights.push('🔥 Exceptional performance! Top 5% of Product Hunt launches.');
        performanceScore += 40;
      } else if (votesCount >= benchmarks.votes.high) {
        insights.push('🚀 Excellent performance! Top 15% of launches.');
        performanceScore += 30;
      } else if (votesCount >= benchmarks.votes.average) {
        insights.push('👍 Above average performance.');
        performanceScore += 20;
      } else if (votesCount >= benchmarks.votes.low) {
        insights.push('📈 Moderate performance with room for growth.');
        performanceScore += 10;
      } else {
        insights.push('🌱 Early stage engagement.');
        performanceScore += 5;
      }

      // Analyze engagement rate
      if (engagementRate >= benchmarks.engagementRate.high) {
        insights.push('💬 Outstanding engagement rate! Users are highly interested and discussing actively.');
        performanceScore += 30;
      } else if (engagementRate >= benchmarks.engagementRate.average) {
        insights.push('💬 Good engagement rate.');
        performanceScore += 20;
      } else if (engagementRate >= benchmarks.engagementRate.low) {
        insights.push('💭 Moderate engagement rate.');
        performanceScore += 10;
      } else {
        insights.push('📊 Low engagement rate - consider encouraging more discussion.');
        performanceScore += 5;
      }

      // Featured status
      if (featured) {
        insights.push('⭐ Featured product! This significantly boosts visibility.');
        performanceScore += 30;
      }

      // Category insights
      const trendingCategories = ['AI', 'Developer Tools', 'Productivity', 'No-Code'];
      const isTrending = topics.some(topic =>
        trendingCategories.some(cat => topic.toLowerCase().includes(cat.toLowerCase()))
      );

      if (isTrending) {
        insights.push(`🎯 Product is in trending categories: ${topics.join(', ')}`);
      }

      return {
        success: true,
        data: {
          performanceScore: Math.min(performanceScore, 100),
          engagementRate: Math.round(engagementRate * 10) / 10,
          benchmarkComparison: {
            votes: votesCount >= benchmarks.votes.high ? 'above' : votesCount >= benchmarks.votes.average ? 'average' : 'below',
            engagement: engagementRate >= benchmarks.engagementRate.high ? 'above' : engagementRate >= benchmarks.engagementRate.average ? 'average' : 'below',
          },
          insights,
          isTrending,
          featured,
        },
      };
    },
  });

  return {
    getProductDetails,
    analyzeComments,
    compareMetrics,
  };
};
