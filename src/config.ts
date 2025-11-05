// API Configuration
// In production, this will use the VITE_API_URL environment variable
// In development, it defaults to localhost:3001

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
};
