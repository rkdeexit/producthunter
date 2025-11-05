# Multi-stage build for Product Hunt Analyzer

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY src ./src
COPY index.html ./
COPY public ./public

# Build frontend
RUN npm run build

# Stage 2: Build backend
FROM node:18-alpine AS backend-build
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY server ./server

# Build backend
RUN npm run build:server

# Stage 3: Production
FROM node:18-alpine
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production --onnxruntime-node-install-cuda=skip

# Copy built frontend from stage 1
COPY --from=frontend-build /app/dist ./dist/frontend

# Copy built backend from stage 2
COPY --from=backend-build /app/dist/server ./dist/server

# Copy server source (needed for runtime)
COPY server ./server

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start the backend server
CMD ["node", "dist/server/index.js"]
