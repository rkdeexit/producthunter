# 🚀 Deployment Checklist

Use this checklist to ensure smooth deployment.

## ✅ Pre-Deployment

- [ ] **API Keys Ready**
  - [ ] Product Hunt API Token obtained
  - [ ] OpenAI API Key obtained
  - [ ] Keys are kept secure (not in code)

- [ ] **Code is Ready**
  - [ ] All changes committed to git
  - [ ] All tests pass locally
  - [ ] Build works locally (`npm run build`)
  - [ ] Backend builds (`npm run build:server`)

- [ ] **Environment Setup**
  - [ ] `.env.example` is up to date
  - [ ] All required env variables documented

## 🎯 Choose Deployment Strategy

Pick ONE option:

### Option A: Vercel + Railway (Recommended)
- [ ] Railway account created
- [ ] Vercel account created
- [ ] GitHub repo connected to both

### Option B: All-in-One (Railway/Render)
- [ ] Platform account created
- [ ] GitHub repo connected

### Option C: Docker
- [ ] Dockerfile tested locally
- [ ] Platform supports Docker

## 📦 Backend Deployment

- [ ] **Platform Setup**
  - [ ] Backend service created
  - [ ] GitHub repo connected
  - [ ] Build command set: `npm install && npm run build:server`
  - [ ] Start command set: `npm run start:server`

- [ ] **Environment Variables Set**
  - [ ] `PRODUCT_HUNT_API_TOKEN` added
  - [ ] `OPENAI_API_KEY` added
  - [ ] `PORT` set (if needed)
  - [ ] `NODE_ENV=production` set

- [ ] **Deployment**
  - [ ] First deployment successful
  - [ ] Backend URL obtained (e.g., `https://api.example.com`)
  - [ ] Health check works: `curl https://api.example.com/api/health`

## 🎨 Frontend Deployment

- [ ] **Platform Setup**
  - [ ] Frontend service created
  - [ ] Build command set: `npm run build`
  - [ ] Output directory set: `dist`

- [ ] **Environment Variables**
  - [ ] `VITE_API_URL` set to backend URL
  - [ ] Format: `https://your-backend.com` (no trailing slash)

- [ ] **Deployment**
  - [ ] First deployment successful
  - [ ] Frontend URL obtained
  - [ ] Site loads in browser

## 🧪 Post-Deployment Testing

- [ ] **Basic Tests**
  - [ ] Frontend loads without errors
  - [ ] Manual Analysis tab works
  - [ ] Can navigate between tabs

- [ ] **Backend Tests**
  - [ ] Health endpoint responds: `/api/health`
  - [ ] No CORS errors in browser console
  - [ ] API calls reach backend

- [ ] **AI Agent Tests**
  - [ ] Can submit Product Hunt URL
  - [ ] Loading state appears
  - [ ] Report generates successfully
  - [ ] All report sections display

- [ ] **Error Handling**
  - [ ] Invalid URL shows error message
  - [ ] API errors display properly
  - [ ] Network failures handled gracefully

## 🔒 Security Check

- [ ] **Secrets Management**
  - [ ] No API keys in code
  - [ ] No API keys in git history
  - [ ] Environment variables set securely

- [ ] **CORS Configuration**
  - [ ] Frontend domain allowed in backend
  - [ ] Only necessary origins allowed

## 📊 Monitoring Setup

- [ ] **Error Tracking**
  - [ ] Backend logs accessible
  - [ ] Frontend errors visible in platform
  - [ ] Set up alerts (optional)

- [ ] **Cost Monitoring**
  - [ ] OpenAI usage dashboard checked
  - [ ] Platform billing reviewed
  - [ ] Usage limits understood

## 🎉 Launch

- [ ] **Final Checks**
  - [ ] All features working
  - [ ] Performance acceptable
  - [ ] Mobile responsive
  - [ ] Browser tested (Chrome, Firefox, Safari)

- [ ] **Documentation**
  - [ ] README updated with live URLs
  - [ ] Deployment notes added
  - [ ] Known issues documented

- [ ] **Share**
  - [ ] Share with team/users
  - [ ] Monitor initial usage
  - [ ] Collect feedback

## 🆘 Rollback Plan

If something goes wrong:

- [ ] Previous working version identified
- [ ] Know how to redeploy previous version
- [ ] Database backup (if applicable)
- [ ] Communication plan ready

## 📈 Post-Launch

- [ ] Monitor for first 24 hours
- [ ] Check error rates
- [ ] Review API costs
- [ ] Gather user feedback
- [ ] Plan improvements

---

## Common Issues & Solutions

### Frontend can't reach backend
- Check `VITE_API_URL` is set correctly
- Verify CORS settings
- Check backend is running

### AI Agent fails
- Verify OpenAI API key
- Check OpenAI account has credits
- Review backend logs

### Build fails
- Check Node.js version
- Verify all dependencies installed
- Review build logs

---

## Platform-Specific Notes

### Railway
- Auto-deploys on git push
- Provides $5/month free credit
- Easy rollback via dashboard

### Vercel
- Auto-deploys on git push
- Preview deployments for PRs
- Edge network for speed

### Render
- Manual or auto-deploy
- Free tier spins down when idle
- Database support available

---

**Ready to deploy? Start with the Pre-Deployment section and work your way down!**
