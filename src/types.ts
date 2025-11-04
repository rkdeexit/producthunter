export interface Product {
  name: string;
  tagline: string;
  description: string;
  category: string;
  upvotes: number;
  comments: number;
  launchDate: string;
  url?: string;
}

export interface AnalysisResult {
  score: number;
  insights: string[];
  recommendations: string[];
  categoryTrend: string;
  engagementRate: number;
  viralityScore: number;
}
