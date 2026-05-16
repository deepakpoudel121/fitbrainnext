# FitBrain Deployment Guide

This guide covers how to deploy the FitBrain Next.js 16 application to various platforms.

## Quick Start

### 1. Extract the Project

```bash
# If using tar.gz
tar -xzf fitbrain-app.tar.gz
cd v0-project

# If using zip
unzip fitbrain-app.zip
cd v0-project
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
```

### 4. Build the Project

```bash
pnpm build
```

### 5. Start the Server

```bash
pnpm start
# or for development
pnpm dev
```

The application will be available at `http://localhost:3000`

---

## Deployment Platforms

### Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides the best experience for Next.js deployments.

#### Option 1: Using GitHub

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project" and select your GitHub repository
4. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Click "Deploy"

#### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

#### Option 3: Using Docker on Vercel

```bash
# Push to a git repository and connect to Vercel
# Vercel will auto-detect the Dockerfile if present
```

---

### Deploy to Netlify

1. Visit [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Add environment variables
7. Deploy

---

### Deploy to AWS

#### Using Amplify

1. Install AWS Amplify CLI: `npm install -g @aws-amplify/cli`
2. Initialize Amplify: `amplify init`
3. Deploy: `amplify publish`

#### Using EC2 + PM2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js and npm
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PM2
npm install -g pm2

# Clone your repository
git clone your-repo-url
cd fitbrain

# Install dependencies and build
pnpm install
pnpm build

# Start with PM2
pm2 start "npm start" --name "fitbrain"
pm2 save
pm2 startup

# Setup nginx as reverse proxy
sudo yum install -y nginx
# Configure /etc/nginx/nginx.conf to proxy to localhost:3000
sudo systemctl start nginx
```

---

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add buildpack for Node.js
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set NEXT_PUBLIC_API_URL=https://your-api.com

# Deploy
git push heroku main
```

---

### Deploy to Railway

1. Visit [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Railway auto-detects Next.js
5. Add environment variables in settings
6. Deploy

---

### Deploy to Docker

#### Create Dockerfile

A `Dockerfile` can be created as follows:

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm i -g pnpm
RUN pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
```

#### Build and Run

```bash
# Build image
docker build -t fitbrain:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-api.com \
  fitbrain:latest
```

#### Using Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://your-api.com
    restart: unless-stopped
```

```bash
docker-compose up -d
```

---

### Deploy to DigitalOcean App Platform

1. Visit [digitalocean.com](https://digitalocean.com)
2. Create a new App
3. Connect your GitHub repository
4. Configure build and run commands:
   - Build: `npm run build`
   - Run: `npm start`
5. Add environment variables
6. Deploy

---

### Deploy to Self-Hosted Server

#### Using PM2

```bash
# SSH into your server
ssh user@your-server

# Clone repository
git clone your-repo
cd fitbrain

# Install dependencies
pnpm install

# Build
pnpm build

# Create ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: "fitbrain",
    script: "./node_modules/.bin/next",
    args: "start",
    env: {
      NODE_ENV: "production",
      NEXT_PUBLIC_API_URL: "https://your-api.com"
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Using Systemd

Create `/etc/systemd/system/fitbrain.service`:

```ini
[Unit]
Description=FitBrain Next.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/user/fitbrain
Environment="NODE_ENV=production"
Environment="NEXT_PUBLIC_API_URL=https://your-api.com"
ExecStart=/usr/local/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable fitbrain
sudo systemctl start fitbrain
sudo systemctl status fitbrain
```

---

## Environment Variables

Required environment variables for deployment:

```bash
# API Configuration (required)
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com

# Optional: Next Auth
# NEXTAUTH_SECRET=your-secret-key
# NEXTAUTH_URL=https://your-domain.com
```

---

## Performance Optimization

### Build Optimization

- ✓ React Compiler enabled (optimizes re-renders)
- ✓ Turbopack bundler (faster builds)
- ✓ Image optimization enabled
- ✓ Code splitting per route
- ✓ CSS minification
- ✓ JavaScript compression

### Runtime Optimization

- ✓ Server-side rendering (SSR) for initial page load
- ✓ Static site generation (SSG) where applicable
- ✓ Incremental static regeneration (ISR)
- ✓ Client-side caching with React Query
- ✓ Optimized bundle size

### CDN Recommendations

For static assets and optimal performance:
- **Vercel Edge Network** (if using Vercel)
- **Cloudflare** (for any hosting platform)
- **AWS CloudFront** (if using AWS)

---

## Security Checklist

Before production deployment:

- [ ] Set `NEXT_PUBLIC_API_URL` to production backend
- [ ] Enable HTTPS (auto-configured on most platforms)
- [ ] Set secure cookies (HttpOnly, Secure flags)
- [ ] Enable CORS on backend API
- [ ] Configure rate limiting on API
- [ ] Set proper Content Security Policy headers
- [ ] Enable security headers (X-Frame-Options, X-Content-Type-Options)
- [ ] Regularly update dependencies: `pnpm update`
- [ ] Test authentication flow
- [ ] Verify environment variables are not exposed

---

## Monitoring & Logs

### On Vercel

- Monitor deployments in Vercel Dashboard
- View real-time logs
- Set up alerts for errors

### On Other Platforms

Recommended monitoring tools:
- **Sentry** - Error tracking
- **LogRocket** - Session replay & logs
- **Datadog** - Infrastructure monitoring
- **New Relic** - Performance monitoring

---

## Troubleshooting

### Build Fails

```bash
# Clear build cache
rm -rf .next
pnpm build
```

### 404 on Routes

Ensure all routes are properly configured in the App Router (`app/` directory).

### API Connection Issues

1. Verify `NEXT_PUBLIC_API_URL` matches your backend
2. Check backend CORS configuration
3. Verify API is running and accessible
4. Check authentication token validity

### Performance Issues

1. Enable Vercel Analytics
2. Check Core Web Vitals
3. Optimize images
4. Review bundle size: `pnpm add -D @next/bundle-analyzer`

### Memory Issues

If running on limited resources:
- Increase Node heap size: `NODE_OPTIONS=--max-old-space-size=2048`
- Upgrade hosting plan
- Optimize database queries (backend)

---

## Rollback Strategy

### On Vercel
- Deployments tab shows history
- Click "Rollback" on previous deployment

### On Other Platforms
- Keep previous version: `git checkout <previous-commit>`
- Rebuild and redeploy
- Use blue-green deployment strategy

---

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review application logs
3. Verify environment variables
4. Check API connectivity
5. Contact platform support

---

**Last Updated**: December 2024
**Next.js Version**: 16.2.6
**Node.js Requirement**: 18.0.0 or higher
