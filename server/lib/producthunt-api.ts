import axios from 'axios';

const PRODUCT_HUNT_API_URL = 'https://api.producthunt.com/v2/api/graphql';

interface ProductHuntClient {
  token: string;
}

export class ProductHuntAPI {
  private token: string;
  private client;

  constructor(token: string) {
    this.token = token;
    this.client = axios.create({
      baseURL: PRODUCT_HUNT_API_URL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async searchProducts(query: string, limit: number = 10) {
    const graphqlQuery = `
      query SearchPosts($query: String!, $limit: Int!) {
        posts(first: $limit, order: VOTES, postedAfter: "2024-01-01") {
          edges {
            node {
              id
              name
              tagline
              description
              url
              votesCount
              commentsCount
              createdAt
              featured
              website
              topics {
                edges {
                  node {
                    name
                  }
                }
              }
              thumbnail {
                url
              }
              makers {
                edges {
                  node {
                    name
                    username
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.client.post('', {
        query: graphqlQuery,
        variables: { query, limit },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Product Hunt API error: ${error.message}`);
    }
  }

  async getProductBySlug(slug: string) {
    const graphqlQuery = `
      query GetPost($slug: String!) {
        post(slug: $slug) {
          id
          name
          tagline
          description
          url
          votesCount
          commentsCount
          createdAt
          featured
          website
          topics {
            edges {
              node {
                name
              }
            }
          }
          thumbnail {
            url
          }
          makers {
            edges {
              node {
                name
                username
                headline
                profileImage
              }
            }
          }
          comments(first: 50) {
            edges {
              node {
                body
                createdAt
                votesCount
                user {
                  name
                  username
                }
              }
            }
          }
          reviews(first: 20) {
            edges {
              node {
                rating
                body
                createdAt
                user {
                  name
                  username
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.client.post('', {
        query: graphqlQuery,
        variables: { slug },
      });

      return response.data.data.post;
    } catch (error: any) {
      throw new Error(`Product Hunt API error: ${error.message}`);
    }
  }

  async getTodaysPosts(limit: number = 20) {
    const graphqlQuery = `
      query GetTodaysPosts($limit: Int!) {
        posts(first: $limit, order: VOTES) {
          edges {
            node {
              id
              name
              tagline
              description
              url
              votesCount
              commentsCount
              createdAt
              featured
              topics {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.client.post('', {
        query: graphqlQuery,
        variables: { limit },
      });

      return response.data.data.posts;
    } catch (error: any) {
      throw new Error(`Product Hunt API error: ${error.message}`);
    }
  }

  extractSlugFromUrl(url: string): string | null {
    // Extract slug from Product Hunt URL
    // Example: https://www.producthunt.com/posts/product-name -> product-name
    const match = url.match(/producthunt\.com\/posts\/([^\/\?]+)/);
    return match ? match[1] : null;
  }
}
