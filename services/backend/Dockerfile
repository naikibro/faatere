# ========================================
# Build stage
# ========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy the shared directory
COPY shared/ ./shared/

# Install shared package dependencies first (if shared has package.json and dependencies)
RUN if [ -f ./shared/package.json ]; then cd ./shared && (yarn install || true) && (yarn build || true); fi

# Install backend dependencies
COPY services/backend/package.json ./
COPY services/backend/yarn.lock* ./
RUN yarn install

# Copy source code
COPY services/backend/ .

# Build backend
RUN yarn build

# ========================================
# Production stage
# ========================================
FROM node:20-alpine AS production
WORKDIR /app

# Install runtime dependencies for bcrypt
RUN apk add --no-cache python3 make g++

# Copy the shared directory
COPY shared/ ./shared/

# Install shared package dependencies first (if shared has package.json and dependencies)
RUN if [ -f ./shared/package.json ]; then cd ./shared && (yarn install || true) && (yarn build || true); fi

# Copy package files
COPY services/backend/package.json ./
COPY services/backend/yarn.lock* ./

# Install all dependencies (including dev dependencies) for development
RUN yarn install

# Rebuild bcrypt for target platform
RUN npm rebuild bcrypt --build-from-source

# Copy required files for migrations to run in .ts
COPY services/backend/tsconfig*.json ./
COPY services/backend/src ./src

# Copy shared from builder stage (where it was already copied)
COPY --from=builder /app/shared ./shared

# Copy dist from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3001

# Run either dev or production based on NODE_ENV
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then yarn dev; else yarn migration:run && yarn start:prod; fi"]

# ========================================
# Development stage
# ========================================
FROM node:20-alpine AS development
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy the shared directory
COPY shared/ ./shared/

# Install shared package dependencies first (if shared has package.json and dependencies)
RUN if [ -f ./shared/package.json ]; then cd ./shared && (yarn install || true) && (yarn build || true); fi

# Copy package files
COPY services/backend/package.json ./
COPY services/backend/yarn.lock* ./
RUN yarn install

# Rebuild bcrypt for target platform
RUN npm rebuild bcrypt --build-from-source

# Copy required files for migrations to run in .ts
COPY services/backend/tsconfig*.json ./
COPY services/backend/src ./src

# Copy shared from builder stage
COPY shared/ ./shared/

EXPOSE 3001

# Development command with hot-reload
CMD ["yarn", "dev"]
