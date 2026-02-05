# ===========================================
# Stage 1: Development (standalone, no workspaces)
# ===========================================
FROM node:20-alpine AS development

# Install dependencies for native packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies directly (not as workspace)
RUN yarn install

# Copy all source files
COPY . .

# Expose port for Docusaurus dev server
EXPOSE 3000

# Start development server with hot reload
CMD ["yarn", "start", "--host", "0.0.0.0"]

# ===========================================
# Stage 2: Build
# ===========================================
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies directly
RUN yarn install

# Copy all source files
COPY . .

# Build the static documentation site
RUN yarn build

# ===========================================
# Stage 3: Production (serve static files)
# ===========================================
FROM nginx:alpine AS production

# Copy built static files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
