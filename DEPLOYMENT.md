# 🚀 Deployment Guide

This guide covers deploying the Product Hunt Analyzer app to production. Since this is a full-stack application, you need to deploy both the frontend and backend.

## 📋 Deployment Options

### Option 1: Recommended - Separate Deployments
- **Frontend**: Vercel or Netlify (Free tier available)
- **Backend**: Railway, Render, or Fly.io (Free/cheap tiers available)

### Option 2: All-in-One
- **Docker**: Deploy to Railway, Render, Fly.io, or AWS/GCP/Azure

---

## 🎯 Option 1: Vercel (Frontend) + Railway (Backend)

This is the **easiest and recommended** approach with generous free tiers.

### Step 1: Deploy Backend to Railway

1. **Sign up at [Railway](https://railway.app)**

2. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select this repository

3. **Configure the service**
   - Railway will auto-detect Node.js
   - Set the start command: `npm run start:server`
   - Set the build command: `npm install && npm run build:server`

4. **Add environment variables**
   ```
   PRODUCT_HUNT_API_TOKEN=your_token_here
   OPENAI_API_KEY=your_key_here
   PORT=3001
   ```

5. **Deploy**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL for the next step

### Step 2: Deploy Frontend to Vercel

1. **Sign up at [Vercel](https://vercel.com)**

2. **Import your repository**
   - Click "Add New Project"
   - Import from GitHub
   - Select this repository

3. **Configure build settings**
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add environment variable**
   ```
   VITE_API_URL=https://your-app.railway.app
   ```
   (Replace with your Railway backend URL)

5. **Update API calls in frontend**
   - We need to use the environment variable for API URL

6. **Deploy**
   - Vercel will provide a URL like: `https://your-app.vercel.app`

### Step 3: Update Frontend to Use Backend URL

After deployment, you'll need to update the API calls to use the production backend URL instead of localhost.

---

## 🐳 Option 2: Docker Deployment

Deploy everything as a Docker container to any platform.

### Platforms that support Docker:
- **Railway** (Easiest)
- **Render**
- **Fly.io**
- **AWS ECS**
- **Google Cloud Run**
- **DigitalOcean App Platform**

### Deploy to Railway with Docker:

1. Push your code with the Dockerfile
2. Railway will auto-detect Docker
3. Add environment variables
4. Deploy automatically

---

## 🔧 Option 3: Render (All-in-One)

Render can host both frontend and backend in one place.

### Backend Service

1. **Create a new Web Service**
   - Connect GitHub repo
   - Select branch
   - Environment: Node
   - Build Command: `npm install && npm run build:server`
   - Start Command: `npm run start:server`

2. **Add environment variables**
   ```
   PRODUCT_HUNT_API_TOKEN=your_token
   OPENAI_API_KEY=your_key
   PORT=3001
   ```

### Frontend Service

1. **Create a new Static Site**
   - Connect same GitHub repo
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Add environment variable: `VITE_API_URL=<backend-url>`

---

## 🌐 Option 4: Netlify (Frontend) + Render (Backend)

Similar to Vercel + Railway option.

### Backend on Render
Follow "Option 3: Backend Service" steps above

### Frontend on Netlify

1. **Sign up at [Netlify](https://netlify.com)**
2. **Add new site from Git**
3. **Configure**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL=<backend-url>`
4. **Deploy**

---

## 📝 Environment Variables Summary

### Backend Needs:
```env
PRODUCT_HUNT_API_TOKEN=your_token_here
OPENAI_API_KEY=your_openai_key_here
PORT=3001 (or platform default)
```

### Frontend Needs:
```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🔒 Important Security Notes

1. **Never commit `.env` to git** (already in .gitignore)
2. **Set environment variables in platform settings**, not in code
3. **Regenerate API keys** if accidentally exposed
4. **Use CORS properly** in production (already configured)

---

## 💰 Cost Estimates

### Free Tier Options:
- **Vercel**: Unlimited frontend deployments (free)
- **Netlify**: 100GB bandwidth/month (free)
- **Railway**: $5 free credit/month (~500 hours)
- **Render**: Free tier available (spins down after inactivity)
- **Fly.io**: Free tier available

### Expected Costs with Traffic:
- **Low traffic** (< 1000 requests/day): Free on all platforms
- **Medium traffic**: $5-15/month
- **High traffic**: $20-50/month

### API Costs (OpenAI):
- GPT-4o-mini: ~$0.01-0.05 per analysis
- Expect $1-10/month depending on usage

---

## 🚀 Quick Start: Fastest Deployment

**Use Railway for both frontend and backend:**

1. Go to [Railway](https://railway.app)
2. Click "Deploy from GitHub"
3. Select your repo
4. Add environment variables
5. Done! Railway handles everything

Railway will:
- Detect Node.js
- Install dependencies
- Build frontend and backend
- Provide URLs for both

---

## ✅ Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is deployed and accessible
- [ ] Environment variables are set correctly
- [ ] API calls from frontend reach backend
- [ ] CORS is configured properly
- [ ] Test manual analysis mode
- [ ] Test AI agent mode with real Product Hunt URLs
- [ ] Check error logs if something fails
- [ ] Monitor API costs (OpenAI dashboard)

---

## 🐛 Troubleshooting

### "API is not responding"
- Check backend logs in your platform
- Verify backend URL in frontend env variable
- Test backend directly: `curl https://your-backend.com/api/health`

### "CORS errors"
- Ensure backend CORS is configured for your frontend domain
- Check if both services are using HTTPS

### "Environment variables not working"
- Verify they're set in platform settings
- Redeploy after adding variables
- Check variable names match exactly

### "Build fails"
- Check build logs
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

---

## 📚 Platform-Specific Guides

Need detailed steps for a specific platform? Check:
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Fly.io Docs](https://fly.io/docs/)

---

## 🎉 You're Ready!

Choose your preferred platform and follow the steps above. For most users, **Vercel (frontend) + Railway (backend)** offers the best balance of ease and features.

Questions? Check the troubleshooting section or create an issue on GitHub.
