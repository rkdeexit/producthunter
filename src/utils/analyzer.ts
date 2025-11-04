import type { Product, AnalysisResult } from '../types';

export const analyzeProduct = (product: Product): AnalysisResult => {
  const insights: string[] = [];
  const recommendations: string[] = [];

  // Calculate engagement rate
  const engagementRate = product.upvotes > 0
    ? (product.comments / product.upvotes) * 100
    : 0;

  // Calculate virality score (simplified algorithm)
  const viralityScore = Math.min(
    (product.upvotes * 0.7 + product.comments * 0.3) / 10,
    100
  );

  // Analyze upvotes
  if (product.upvotes > 500) {
    insights.push('🔥 High engagement! This product resonated well with the community.');
  } else if (product.upvotes > 200) {
    insights.push('👍 Good traction! Solid community interest.');
  } else if (product.upvotes > 50) {
    insights.push('📈 Moderate engagement. There\'s room for growth.');
  } else {
    insights.push('🌱 Early stage engagement. Consider improving visibility.');
    recommendations.push('Engage more with commenters and share on social media');
  }

  // Analyze comment ratio
  if (engagementRate > 30) {
    insights.push('💬 Excellent discussion rate! Users are highly engaged.');
  } else if (engagementRate > 15) {
    insights.push('💬 Good discussion happening around this product.');
  } else if (engagementRate < 5 && product.upvotes > 50) {
    insights.push('💭 Low comment rate. Consider encouraging more discussion.');
    recommendations.push('Ask questions in your description to spark conversations');
  }

  // Analyze launch timing
  const launchDate = new Date(product.launchDate);
  const dayOfWeek = launchDate.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    insights.push('📅 Weekend launch detected. Weekday launches typically perform better.');
    recommendations.push('Consider launching on Tuesday-Thursday for maximum visibility');
  } else if (dayOfWeek >= 2 && dayOfWeek <= 4) {
    insights.push('📅 Great timing! Mid-week launches tend to perform best.');
  }

  // Category trends
  const categoryTrends: Record<string, string> = {
    'AI': 'Trending - AI products are highly popular on Product Hunt',
    'Productivity': 'Evergreen - Always in demand',
    'Developer Tools': 'Growing - Strong developer community',
    'Design Tools': 'Stable - Consistent interest',
    'Marketing': 'Competitive - Many products in this space',
    'Analytics': 'Growing - Data-driven decisions are trending',
    'SaaS': 'Evergreen - Core category with consistent demand',
  };

  const categoryTrend = categoryTrends[product.category] || 'Niche - Unique category positioning';

  // Description quality analysis
  if (product.description.length < 100) {
    recommendations.push('Expand your product description to at least 100 characters for better clarity');
  }

  if (product.tagline.length > 60) {
    recommendations.push('Consider shortening your tagline to under 60 characters for better impact');
  }

  // Calculate overall score
  const scoreFactors = [
    Math.min((product.upvotes / 1000) * 40, 40), // Max 40 points
    Math.min((product.comments / 100) * 20, 20), // Max 20 points
    Math.min(viralityScore * 0.2, 20), // Max 20 points
    product.description.length > 100 ? 10 : 5,
    product.tagline.length <= 60 ? 10 : 5,
  ];

  const score = Math.round(scoreFactors.reduce((a, b) => a + b, 0));

  return {
    score,
    insights,
    recommendations,
    categoryTrend,
    engagementRate: Math.round(engagementRate * 10) / 10,
    viralityScore: Math.round(viralityScore * 10) / 10,
  };
};
