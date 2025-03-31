# Stage 1: Build
FROM node:18.20.8-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve
FROM node:18.20.8-alpine AS runner

# Set working directory
WORKDIR /app

# Install a lightweight HTTP server
RUN npm install -g serve

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./next

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "next", "-l", "3000"]
