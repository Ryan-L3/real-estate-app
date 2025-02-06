# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
# Copy package files
COPY package*.json ./
RUN npm install
# Copy project files and env
COPY . .
COPY .env.production .env
# Set production mode and build
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm install --only=production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env ./.env

EXPOSE 3000

CMD ["npm", "start"]