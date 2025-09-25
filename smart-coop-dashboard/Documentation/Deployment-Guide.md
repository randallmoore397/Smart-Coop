# Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the Smart Coop Dashboard to various hosting environments. The application is built with React and can be deployed to multiple platforms including cloud providers, traditional web servers, and containerized environments.

## Prerequisites

### System Requirements

#### Development Environment
- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher
- **Git**: Version control system
- **Modern Web Browser**: For testing

#### Production Environment
- **Web Server**: Apache, Nginx, or similar
- **SSL Certificate**: HTTPS support required
- **Domain Name**: Custom domain recommended
- **CDN**: Optional for static asset delivery

### Environment Variables

Create environment configuration files:

```bash
# .env.production
REACT_APP_API_BASE_URL=https://api.smartcoop.com/v1
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
REACT_APP_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## Build Process

### Local Build

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Tests**
   ```bash
   npm test -- --watchAll=false --coverage
   ```

3. **Create Production Build**
   ```bash
   npm run build
   ```

4. **Verify Build**
   ```bash
   # Test build locally
   npm install -g serve
   serve -s build -l 3000
   ```

### Build Artifacts

The build process generates:
- `build/index.html` - Main HTML file
- `build/static/js/` - JavaScript bundles
- `build/static/css/` - CSS bundles
- `build/static/media/` - Static assets
- `build/asset-manifest.json` - Asset mapping

## Deployment Options

### Option 1: Netlify (Recommended for Quick Deployment)

#### Setup Steps

1. **Connect Repository**
   ```bash
   # Push code to GitHub/GitLab
   git add .
   git commit -m "Production build"
   git push origin main
   ```

2. **Netlify Configuration**
   - Import project from Git repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variables

3. **Custom Domain** (Optional)
   - Go to Domain Management
   - Add custom domain
   - Configure DNS settings

4. **Deploy**
   - Netlify auto-deploys on git push
   - Monitor deployment status
   - Access live URL

#### Netlify Configuration File

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true
```

### Option 2: Vercel

#### Setup Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure Environment**
   ```bash
   vercel env add REACT_APP_API_BASE_URL
   vercel env add REACT_APP_ENVIRONMENT
   ```

4. **Custom Domain**
   ```bash
   vercel domains add yourdomain.com
   ```

#### Vercel Configuration

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Option 3: AWS S3 + CloudFront

#### Setup Steps

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://smart-coop-dashboard
   ```

2. **Configure Bucket for Static Website**
   ```bash
   aws s3 website s3://smart-coop-dashboard --index-document index.html --error-document index.html
   ```

3. **Upload Build Files**
   ```bash
   aws s3 sync build/ s3://smart-coop-dashboard --delete
   ```

4. **Create CloudFront Distribution**
   ```bash
   aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
   ```

5. **Configure SSL**
   - Request SSL certificate in AWS Certificate Manager
   - Associate certificate with CloudFront distribution

#### CloudFront Configuration

```json
// cloudfront-config.json
{
  "CallerReference": "smart-coop-dashboard",
  "Comment": "Smart Coop Dashboard Distribution",
  "DefaultCacheBehavior": {
    "TargetOriginId": "smart-coop-origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    }
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "smart-coop-origin",
        "DomainName": "smart-coop-dashboard.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "Enabled": true,
  "DefaultRootObject": "index.html"
}
```

### Option 4: Docker Container

#### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Docker Commands

```bash
# Build Docker image
docker build -t smart-coop-dashboard .

# Run container locally
docker run -p 8080:80 smart-coop-dashboard

# Push to registry
docker tag smart-coop-dashboard your-registry/smart-coop-dashboard
docker push your-registry/smart-coop-dashboard
```

### Option 5: Traditional Web Server

#### Apache Configuration

```apache
# .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Frame-Options DENY
  Header always set X-Content-Type-Options nosniff
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

#### Nginx Configuration

```nginx
# nginx.conf
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/smart-coop-dashboard;
    index index.html;

    # SSL configuration (uncomment when SSL is set up)
    # listen 443 ssl http2;
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # API proxy (if needed)
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Environment Configuration

### Environment Variables

#### Required Variables

```bash
# API Configuration
REACT_APP_API_BASE_URL=https://api.smartcoop.com/v1
REACT_APP_API_TIMEOUT=10000

# Application Configuration
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
REACT_APP_NAME=Smart Coop Dashboard

# Analytics & Monitoring
REACT_APP_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
REACT_APP_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
REACT_APP_HOTJAR_ID=your-hotjar-id

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_ERROR_REPORTING=true
REACT_APP_ENABLE_PWA=false
```

#### Environment-Specific Configurations

```javascript
// config/environments.js
const environments = {
  development: {
    apiBaseUrl: 'http://localhost:3001/api',
    environment: 'development',
    debug: true,
    analytics: false
  },
  staging: {
    apiBaseUrl: 'https://api-staging.smartcoop.com/api',
    environment: 'staging',
    debug: true,
    analytics: false
  },
  production: {
    apiBaseUrl: 'https://api.smartcoop.com/api',
    environment: 'production',
    debug: false,
    analytics: true
  }
};

export default environments;
```

## SSL/TLS Configuration

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com

# Automatic renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Custom SSL Certificate

```nginx
# nginx.conf (SSL section)
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
}
```

## Performance Optimization

### Build Optimization

```javascript
// config-overrides.js (for Create React App)
const { override, addBundleVisualizer } = require('customize-cra');

module.exports = override(
  addBundleVisualizer({}, true)
);
```

### CDN Configuration

```javascript
// CDN integration example
const CDN_URL = process.env.REACT_APP_CDN_URL || '';

export const getAssetUrl = (path) => {
  return CDN_URL ? `${CDN_URL}${path}` : path;
};

// Usage in components
import { getAssetUrl } from '../utils/assets';

const imageUrl = getAssetUrl('/images/logo.png');
```

### Service Worker (PWA)

```javascript
// public/sw.js
const CACHE_NAME = 'smart-coop-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

## Monitoring & Analytics

### Application Monitoring

#### Sentry Configuration

```javascript
// src/utils/sentry.js
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

export default Sentry;
```

#### Google Analytics

```javascript
// src/utils/analytics.js
export const initAnalytics = () => {
  if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID && window.gtag) {
    window.gtag('config', process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  }
};

export const trackEvent = (eventName, parameters = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};
```

### Performance Monitoring

#### Web Vitals

```javascript
// src/utils/performance.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};
```

## Backup & Recovery

### Data Backup Strategy

```bash
# Automated backup script
#!/bin/bash

# Database backup
mongodump --db smartcoop --out /backups/$(date +%Y%m%d_%H%M%S)

# File system backup
tar -czf /backups/files_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/smart-coop-dashboard

# Retention policy (keep last 30 days)
find /backups -name "*.tar.gz" -mtime +30 -delete
find /backups -name "*_dump" -mtime +30 -delete
```

### Disaster Recovery

1. **Regular Backups**: Daily automated backups
2. **Offsite Storage**: Cloud storage for backups
3. **Recovery Testing**: Monthly recovery drills
4. **Documentation**: Detailed recovery procedures

## Security Checklist

### Pre-Deployment Security

- [ ] Remove console.log statements
- [ ] Disable debug mode in production
- [ ] Validate all environment variables
- [ ] Test SSL/TLS configuration
- [ ] Verify security headers
- [ ] Check for vulnerable dependencies
- [ ] Implement rate limiting
- [ ] Set up monitoring and alerting

### Production Security

- [ ] Regular security updates
- [ ] SSL certificate renewal monitoring
- [ ] Access log monitoring
- [ ] Intrusion detection
- [ ] Regular security audits
- [ ] Backup encryption
- [ ] Secure credential management

## Troubleshooting

### Common Deployment Issues

#### Build Failures

**Issue**: Build fails with dependency errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Routing Issues

**Issue**: Client-side routing not working
**Solution**: Ensure server configuration handles SPA routing

#### SSL Issues

**Issue**: Mixed content warnings
**Solution**: Ensure all resources load over HTTPS

#### Performance Issues

**Issue**: Slow loading times
**Solutions**:
- Enable gzip compression
- Implement CDN
- Optimize bundle size
- Enable caching headers

### Monitoring Commands

```bash
# Check application status
curl -I https://yourdomain.com

# View logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Check disk usage
df -h

# Monitor processes
ps aux | grep node
ps aux | grep nginx
```

## Support & Maintenance

### Regular Maintenance Tasks

#### Daily
- Monitor application logs
- Check system resources
- Verify backup completion
- Review error reports

#### Weekly
- Update dependencies
- Review security alerts
- Check SSL certificate expiry
- Monitor performance metrics

#### Monthly
- Full system backup verification
- Security patch application
- Performance optimization review
- User feedback analysis

### Emergency Contacts

- **Technical Lead**: tech-lead@company.com
- **DevOps Team**: devops@company.com
- **Security Team**: security@company.com
- **Emergency Hotline**: 1-800-DEPLOY

---

**This deployment guide ensures reliable and secure deployment of the Smart Coop Dashboard across various hosting environments.**