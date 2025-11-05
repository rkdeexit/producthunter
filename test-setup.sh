#!/bin/bash

echo "🧪 Product Hunt Analyzer - Setup Test"
echo "======================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "   Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and add your API keys"
    echo ""
else
    echo "✅ .env file exists"
fi

# Check if API keys are set
echo ""
echo "Checking environment variables..."
source .env 2>/dev/null

if [ -z "$PRODUCT_HUNT_API_TOKEN" ]; then
    echo "⚠️  PRODUCT_HUNT_API_TOKEN not set (AI Agent mode won't work)"
else
    echo "✅ PRODUCT_HUNT_API_TOKEN is set"
fi

if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  OPENAI_API_KEY not set (AI Agent mode won't work)"
else
    echo "✅ OPENAI_API_KEY is set"
fi

# Check if node_modules exists
echo ""
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found!"
    echo "   Run: npm install"
else
    echo "✅ Dependencies installed"
fi

# Test if ports are available
echo ""
echo "Checking ports..."

if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 5173 is already in use (frontend may conflict)"
else
    echo "✅ Port 5173 is available (frontend)"
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 3001 is already in use (backend may conflict)"
else
    echo "✅ Port 3001 is available (backend)"
fi

echo ""
echo "======================================"
echo "Next Steps:"
echo ""
echo "1. If API keys not set, edit .env file:"
echo "   nano .env"
echo ""
echo "2. Start frontend (Terminal 1):"
echo "   npm run dev"
echo ""
echo "3. Start backend (Terminal 2):"
echo "   npm run dev:server"
echo ""
echo "4. Open browser:"
echo "   http://localhost:5173"
echo ""
echo "5. Test manual mode first (no API keys needed)"
echo "   Then test AI Agent mode (requires API keys)"
echo ""
