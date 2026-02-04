# ========================================
# Development stage
# ========================================
FROM node:20-alpine AS development
WORKDIR /app

# Copy monorepo package files for workspace resolution
COPY package.json ./
COPY yarn.lock ./
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

# Install all dependencies (monorepo aware)
RUN yarn install --frozen-lockfile

# Copy frontend source
COPY frontend/ ./frontend/

WORKDIR /app/frontend

EXPOSE 3000

# Development command with hot-reload
CMD ["yarn", "dev"]

# ========================================
# Build stage (for production)
# ========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copy monorepo package files
COPY package.json ./
COPY yarn.lock ./
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy shared and frontend source
COPY shared/ ./shared/
COPY frontend/ ./frontend/

# Build the application
WORKDIR /app/frontend
RUN yarn build

# ========================================
# Production stage
# ========================================
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy monorepo package files
COPY package.json ./
COPY yarn.lock ./
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

# Install production dependencies only
RUN yarn install --frozen-lockfile --production

# Copy built application from builder
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public

WORKDIR /app/frontend

EXPOSE 3000

# Production command
CMD ["yarn", "start"]
