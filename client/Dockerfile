# --- STAGE 1: Build the Next.js App ---
# Use Node.js 18 Alpine image and name this stage "builder"
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only the package files first (for faster Docker caching)
COPY package*.json ./

# Install dependencies exactly as listed in package-lock.json
RUN npm install --frozen-lockfile

# Copy the rest of the app source code into the container
COPY . .

# Build the Next.js app (creates the .next directory)
RUN npm run build


# --- STAGE 2: Production Image (Final Container) ---
# Use a fresh Node.js 18 Alpine image for production
FROM node:18-alpine

# Set working directory again
WORKDIR /app

# Copy package.json from the builder stage to install only needed deps
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies (skip devDependencies)
RUN npm install --omit=dev

# Copy the built app files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose port 3000 to access the app
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
