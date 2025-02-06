# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies for build
COPY package*.json ./
RUN npm ci

# Copy project files and env
COPY . .
COPY .env.production .env

# Set production mode and build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add build error logging
RUN npm run build || (cat /app/.next/error.log && exit 1)

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]