# ---- Build Stage ----
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # Copy package files
    COPY package.json package-lock.json* ./
    RUN npm install --legacy-peer-deps
    
    # Copy project
    COPY . .
    
    RUN rm -rf node_modules .next
    
    RUN npm install --legacy-peer-deps
    
    RUN npm run build
    
    # ---- Run Stage ----
    FROM node:20-alpine
    WORKDIR /app
    
    COPY --from=builder /app ./
    
    ENV NODE_ENV=production
    ENV PORT=3000
    EXPOSE 3000
    
    CMD ["npm", "start"]
    