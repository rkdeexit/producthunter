import { Mastra } from '@mastra/core';
import { createProductResearchAgent } from './agents/product-researcher';
import dotenv from 'dotenv';

dotenv.config();

// Configure the LLM model
const getModel = () => {
  // Using OpenAI by default
  if (process.env.OPENAI_API_KEY) {
    return {
      provider: 'OPEN_AI',
      name: 'gpt-4o-mini',
      toolChoice: 'auto',
    };
  }

  throw new Error('No API key configured. Please set OPENAI_API_KEY in .env file');
};

export const mastra = new Mastra({
  agents: {},
});

// Create and register the product research agent
export const getProductResearchAgent = () => {
  const productHuntToken = process.env.PRODUCT_HUNT_API_TOKEN;

  if (!productHuntToken) {
    throw new Error('PRODUCT_HUNT_API_TOKEN not configured in .env file');
  }

  const model = getModel();
  return createProductResearchAgent(productHuntToken, model);
};
