# ========================================
# Build stage
# ========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy root tsconfig for shared workspace extends
COPY tsconfig.json ./tsconfig.json

# Copy shared directory and build it
COPY shared/ ./shared/
RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install --frozen-lockfile && yarn build; fi

# Install backend dependencies
COPY services/backend/package.json ./services/backend/
COPY services/backend/yarn.lock* ./services/backend/
RUN cd ./services/backend && yarn install --frozen-lockfile

# Copy backend source code
COPY services/backend/ ./services/backend/

# Build backend
RUN cd ./services/backend && yarn build

# ========================================
# Production stage
# ========================================
FROM node:20-alpine AS production
WORKDIR /app

# Install runtime dependencies for bcrypt
RUN apk add --no-cache python3 make g++

# Copy root tsconfig for shared workspace extends
COPY tsconfig.json ./tsconfig.json

# Copy shared and build
COPY shared/ ./shared/
RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install --frozen-lockfile --production && yarn build; fi

# Copy package files
COPY services/backend/package.json ./
COPY services/backend/yarn.lock* ./
RUN yarn install --frozen-lockfile --production

# Rebuild bcrypt for target platform
RUN npm rebuild bcrypt --build-from-source

# Copy built files from builder
COPY --from=builder /app/services/backend/dist ./dist

EXPOSE 3001

# Production command
CMD ["node", "dist/main"]

# ========================================
# Development stage
# ========================================
FROM node:20-alpine AS development
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy root tsconfig for shared workspace extends
COPY tsconfig.json ./tsconfig.json

# Copy shared directory and build
COPY shared/ ./shared/
RUN if [ -f ./shared/package.json ]; then cd ./shared && yarn install --frozen-lockfile && yarn build; fi

# Copy package files
COPY services/backend/package.json ./
COPY services/backend/yarn.lock* ./
RUN yarn install --frozen-lockfile

# Rebuild bcrypt for target platform
RUN npm rebuild bcrypt --build-from-source

# Copy source code
COPY services/backend/ .

EXPOSE 3001

# Development command with hot-reload
CMD ["yarn", "dev"]
