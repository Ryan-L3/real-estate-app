# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Add build arguments
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_API_KEY
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_FRONTEND_API
ARG CLERK_SECRET_KEY
ARG NEXT_PUBLIC_GOOGLE_PLACE_API_KEY

# Set environment variables from build args
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_API_KEY=${NEXT_PUBLIC_SUPABASE_API_KEY}
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_CLERK_FRONTEND_API=${NEXT_PUBLIC_CLERK_FRONTEND_API}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ENV NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=${NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}

# Install dependencies for build
COPY package*.json ./
RUN npm ci

# Copy project files and env
COPY . .
COPY .env.production .env

# Set production mode and build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add build error logging and debug output
RUN echo "Build environment check:" && \
    echo "NEXT_PUBLIC_SUPABASE_URL is set: ${NEXT_PUBLIC_SUPABASE_URL:+yes}" && \
    npm run build || (cat /app/.next/error.log && exit 1)

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Set runtime environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Pass build args to runtime
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_API_KEY
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_FRONTEND_API
ARG CLERK_SECRET_KEY
ARG NEXT_PUBLIC_GOOGLE_PLACE_API_KEY

# Set runtime environment variables
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_API_KEY=${NEXT_PUBLIC_SUPABASE_API_KEY}
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_CLERK_FRONTEND_API=${NEXT_PUBLIC_CLERK_FRONTEND_API}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ENV NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=${NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}

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