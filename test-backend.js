// Simple test script to verify backend is working
// Run with: node test-backend.js

const http = require('http');

const API_BASE = 'http://localhost:3001';

console.log('🧪 Testing Product Hunt Analyzer Backend');
console.log('==========================================\n');

// Test 1: Health Check
function testHealth() {
  return new Promise((resolve, reject) => {
    console.log('Test 1: Health Check');
    console.log('GET /api/health');

    http.get(`${API_BASE}/api/health`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.status === 'ok') {
            console.log('✅ Health check passed');
            console.log('   Response:', JSON.stringify(result, null, 2));
          } else {
            console.log('❌ Unexpected health check response');
          }
          resolve();
        } catch (e) {
          console.log('❌ Failed to parse response');
          reject(e);
        }
      });
    }).on('error', (err) => {
      console.log('❌ Health check failed');
      console.log('   Error:', err.message);
      console.log('\n⚠️  Make sure the backend is running:');
      console.log('   npm run dev:server\n');
      reject(err);
    });
  });
}

// Test 2: Product Details (requires Product Hunt API token)
function testProductDetails() {
  return new Promise((resolve) => {
    console.log('\nTest 2: Product Details');
    console.log('POST /api/product-details');

    const postData = JSON.stringify({ productUrl: 'notion' });

    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/product-details',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success) {
            console.log('✅ Product details fetched successfully');
            console.log('   Product:', result.product.name);
            console.log('   Upvotes:', result.product.votesCount);
          } else {
            console.log('⚠️  Product details fetch failed');
            console.log('   Error:', result.error);
            if (result.error.includes('token')) {
              console.log('   → Add PRODUCT_HUNT_API_TOKEN to .env file');
            }
          }
          resolve();
        } catch (e) {
          console.log('❌ Failed to parse response');
          resolve();
        }
      });
    });

    req.on('error', (err) => {
      console.log('❌ Request failed:', err.message);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

// Run tests
async function runTests() {
  try {
    await testHealth();
    await testProductDetails();

    console.log('\n==========================================');
    console.log('Testing complete!\n');
    console.log('If all tests passed, you can:');
    console.log('1. Open http://localhost:5173 in your browser');
    console.log('2. Try the Manual Analysis tab (works without API keys)');
    console.log('3. Try the AI Agent tab (requires API keys)');
    console.log('');
  } catch (err) {
    console.log('\n⚠️  Some tests failed. Check the errors above.');
    process.exit(1);
  }
}

runTests();
