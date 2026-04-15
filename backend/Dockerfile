# Stage 1: Build
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy dependency files
COPY package.json bun.lock tsconfig.json ./
# Prisma schema is needed for prisma generate
COPY prisma ./prisma

# Install ALL dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Generate Prisma Client
RUN bun run db:generate

# Build the project (tsc && tsc-alias)
RUN bun run build

# Stage 2: Runtime
FROM oven/bun:1-slim

WORKDIR /app

# Copy package files for production install
COPY package.json bun.lock ./
# Copy prisma directory BEFORE install to satisfy postinstall script
COPY prisma ./prisma

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
# Copy node_modules from builder might be better if we have native deps, 
# but bun install --production is cleaner.
# Actually, we need the prisma client generated in stage 1 or regenerate it here.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Set environment variables
ENV NODE_ENV=production

# Expose the API port
EXPOSE 6789

# Start the application
CMD ["bun", "run", "start"]
