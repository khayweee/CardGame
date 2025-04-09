# Stage 1: Build
FROM node:20-alpine AS builder

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
FROM nginx:1.25.2-alpine AS runner

# Copy the built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]