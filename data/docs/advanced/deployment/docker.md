# Docker Deployment

Learn how to deploy the application using Docker containers.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for multi-container setup)
- Basic understanding of containerization

## Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# Use the official Node.js runtime as base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
```

## Building the Image

Build your Docker image:

```bash
docker build -t my-app:latest .
```

## Running the Container

Run your application in a container:

```bash
docker run -d \
  --name my-app-container \
  -p 3000:3000 \
  -e NODE_ENV=production \
  my-app:latest
```

## Docker Compose Setup

For a complete setup with database and other services, create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@postgres:5432/myapp
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## Running with Docker Compose

Start all services:

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Production Considerations

### Multi-stage Build

Optimize your Docker image with multi-stage builds:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

### Health Checks

Add health checks to your Dockerfile:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

### Security Best Practices

- Use non-root user
- Scan images for vulnerabilities
- Use specific image tags, not `latest`
- Minimize image layers
- Use `.dockerignore` file 