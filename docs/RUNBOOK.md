# Operations Runbook

This document provides operational procedures for deploying, monitoring, and maintaining the Next.js Starter Kit application.

## Table of Contents

- [Deployment Procedures](#deployment-procedures)
- [Monitoring and Alerts](#monitoring-and-alerts)
- [Common Issues and Fixes](#common-issues-and-fixes)
- [Rollback Procedures](#rollback-procedures)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)

## Deployment Procedures

### Pre-deployment Checklist

- [ ] All tests pass locally (`pnpm check`)
- [ ] Build completes successfully (`pnpm build`)
- [ ] Code reviewed and approved
- [ ] Translation catalogs compiled (`pnpm lingui:compile`)
- [ ] No security vulnerabilities in dependencies
- [ ] Environment variables configured (if any)
- [ ] Database migrations applied (if applicable)

### Production Build

1. **Clean previous builds**
   ```bash
   pnpm clean
   ```

2. **Install dependencies**
   ```bash
   pnpm install --frozen-lockfile
   ```

3. **Extract and compile translations**
   ```bash
   pnpm lingui:extract_and_compile
   ```

4. **Build application**
   ```bash
   pnpm build
   ```

5. **Verify build output**
   - Check `.next` directory is created
   - Verify static files in `.next/static`
   - Check service worker in `public/sw.js`

### Deployment Steps

#### Vercel (Recommended)

1. **Connect repository**
   - Link GitHub/GitLab repository to Vercel

2. **Configure build settings**
   ```
   Build Command: pnpm build
   Output Directory: .next
   Install Command: pnpm install --frozen-lockfile
   Development Command: pnpm dev
   Node Version: 24.11.0
   ```

3. **Deploy**
   ```bash
   # Via CLI
   vercel --prod

   # Via Git (automatic)
   git push origin main
   ```

#### Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:24.11.0-alpine AS base

   # Install pnpm
   RUN npm install -g pnpm

   # Install dependencies
   FROM base AS deps
   WORKDIR /app
   COPY package.json pnpm-lock.yaml ./
   RUN pnpm install --frozen-lockfile

   # Build application
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN pnpm build

   # Production image
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV=production

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static

   EXPOSE 3000
   ENV PORT=3000

   CMD ["node", "server.js"]
   ```

2. **Build Docker image**
   ```bash
   docker build -t nextjs-starter:latest .
   ```

3. **Run container**
   ```bash
   docker run -p 3000:3000 nextjs-starter:latest
   ```

#### Static Export (Optional)

For static hosting (Netlify, GitHub Pages):

1. **Configure `next.config.js`**
   ```javascript
   output: 'export',
   ```

2. **Build static export**
   ```bash
   pnpm build
   ```

3. **Deploy `out/` directory**

### Post-deployment Verification

- [ ] Homepage loads correctly
- [ ] All routes accessible
- [ ] Language switching works
- [ ] RTL layout functions (Arabic)
- [ ] Service worker registers
- [ ] CSS/JS assets load
- [ ] No console errors
- [ ] Performance metrics acceptable

## Monitoring and Alerts

### Key Metrics to Monitor

1. **Performance Metrics**
   - Time to First Byte (TTFB): < 600ms
   - First Contentful Paint (FCP): < 1.8s
   - Largest Contentful Paint (LCP): < 2.5s
   - Cumulative Layout Shift (CLS): < 0.1
   - First Input Delay (FID): < 100ms

2. **Application Metrics**
   - Response time: < 200ms (p95)
   - Error rate: < 1%
   - Uptime: > 99.9%
   - Build success rate: > 95%

3. **Resource Metrics**
   - CPU usage: < 80%
   - Memory usage: < 80%
   - Disk usage: < 80%

### Monitoring Setup

#### Vercel Analytics

Built-in monitoring for Vercel deployments:
- Real User Monitoring (RUM)
- Web Vitals tracking
- Error tracking
- Traffic analytics

#### Custom Monitoring

Add monitoring service integration:

1. **Sentry (Error Tracking)**
   ```bash
   pnpm add @sentry/nextjs
   ```

2. **Google Analytics (User Tracking)**
   ```bash
   pnpm add @next/third-parties
   ```

3. **LogRocket (Session Replay)**
   ```bash
   pnpm add logrocket
   ```

### Alert Configuration

Set up alerts for:
- Error rate > 5%
- Response time > 500ms (p95)
- Build failures
- Deployment failures
- SSL certificate expiration
- Domain expiration

## Common Issues and Fixes

### Build Issues

#### Issue: Lingui Compilation Fails

**Symptoms:**
```
Error: Cannot find module '@/locales/en/messages'
```

**Solution:**
```bash
# Clean and rebuild
pnpm clean
pnpm lingui:extract_and_compile
pnpm build
```

#### Issue: TypeScript Type Errors

**Symptoms:**
```
error TS2307: Cannot find module
```

**Solution:**
```bash
# Regenerate types
rm -rf .next
pnpm typecheck
pnpm build
```

#### Issue: Webpack Build Timeout

**Symptoms:**
```
Error: Build exceeded maximum duration
```

**Solution:**
1. Check for circular dependencies
2. Reduce bundle size
3. Enable incremental builds
4. Increase build timeout in deployment platform

### Runtime Issues

#### Issue: Service Worker Not Updating

**Symptoms:**
- Old content showing after deployment

**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check service worker registration in DevTools
4. Verify `sw.js` is being regenerated

**Prevention:**
```javascript
// next.config.js - Serwist configuration
disable: process.env.NODE_ENV === 'development',
```

#### Issue: RTL Layout Not Working

**Symptoms:**
- Arabic text not showing right-to-left

**Solution:**
1. Verify language selection
2. Check HTML `dir` attribute
3. Clear browser cache
4. Verify `getTextDirection()` function

**Debug:**
```bash
# Check if Arabic locale exists
ls locales/ar/

# Recompile translations
pnpm lingui:compile
```

#### Issue: 404 on Language Switch

**Symptoms:**
- Page not found after changing language

**Solution:**
1. Check middleware configuration
2. Verify locale cookie setting
3. Clear cookies and retry
4. Check route configuration

#### Issue: Hydration Mismatch

**Symptoms:**
```
Error: Text content does not match server-rendered HTML
```

**Solution:**
1. Check for client-only code in server components
2. Use `suppressHydrationWarning` appropriately
3. Ensure consistent data between server/client
4. Verify date/time rendering

**Prevention:**
```typescript
// Use client components for dynamic content
'use client'
```

### Performance Issues

#### Issue: Large Bundle Size

**Symptoms:**
- Slow initial load
- Bundle size warnings

**Solution:**
1. Analyze bundle
   ```bash
   pnpm analyze
   ```

2. Enable code splitting
3. Use dynamic imports
   ```typescript
   const Component = dynamic(() => import('./Component'))
   ```

4. Optimize images with Next.js Image component

#### Issue: Slow Server Response

**Symptoms:**
- TTFB > 600ms

**Solution:**
1. Enable ISR (Incremental Static Regeneration)
2. Add caching headers
3. Optimize database queries (if applicable)
4. Use CDN for static assets

**Configuration:**
```javascript
// app/page.tsx
export const revalidate = 3600 // Revalidate every hour
```

### Deployment Issues

#### Issue: Build Fails on CI/CD

**Symptoms:**
- Deployment fails during build

**Solution:**
1. Check Node version matches (24.11.0)
2. Verify pnpm lockfile is committed
3. Check for missing dependencies
4. Review build logs for specific errors

**Debug:**
```bash
# Local build test
NODE_ENV=production pnpm build
```

#### Issue: Environment Variables Not Set

**Symptoms:**
- Features dependent on env vars fail

**Solution:**
1. Verify variables in deployment platform
2. Check variable names (case-sensitive)
3. Ensure variables are exposed to client if needed (NEXT_PUBLIC_ prefix)
4. Restart deployment after variable changes

## Rollback Procedures

### Immediate Rollback

#### Vercel

1. **Via Dashboard**
   - Go to Deployments
   - Find last working deployment
   - Click "Promote to Production"

2. **Via CLI**
   ```bash
   vercel rollback [deployment-url]
   ```

#### Docker

1. **Revert to previous image**
   ```bash
   docker pull nextjs-starter:previous-tag
   docker stop nextjs-starter
   docker run -p 3000:3000 nextjs-starter:previous-tag
   ```

### Git Rollback

1. **Identify problematic commit**
   ```bash
   git log --oneline
   ```

2. **Revert commit**
   ```bash
   git revert [commit-hash]
   git push origin main
   ```

3. **Or reset to previous commit** (use with caution)
   ```bash
   git reset --hard [commit-hash]
   git push --force origin main
   ```

### Database Rollback (If Applicable)

1. **Identify migration to rollback**
2. **Run down migration**
3. **Redeploy application**
4. **Verify data integrity**

### Post-Rollback Checklist

- [ ] Application loads successfully
- [ ] Core features working
- [ ] No error spikes
- [ ] Monitor metrics for 30 minutes
- [ ] Document incident
- [ ] Plan fix for original issue

## Performance Optimization

### Image Optimization

Use Next.js Image component:
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // Above-the-fold images
/>
```

### Font Optimization

Use next/font:
```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

### Bundle Optimization

1. **Analyze bundle**
   ```bash
   pnpm analyze
   ```

2. **Use dynamic imports**
   ```typescript
   const Chart = dynamic(() => import('./Chart'), {
     loading: () => <p>Loading...</p>
   })
   ```

3. **Tree shaking**
   - Import only what you need
   - Avoid barrel exports for large libraries

### Caching Strategy

Configure in `next.config.js`:
```javascript
headers: async () => [
  {
    source: '/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, must-revalidate',
      },
    ],
  },
]
```

## Security Considerations

### Security Headers

Configured in `next.config.js`:
```javascript
headers: async () => [
  {
    source: '/:path*',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
    ],
  },
]
```

### Dependency Security

1. **Regular audits**
   ```bash
   pnpm audit
   ```

2. **Update dependencies**
   ```bash
   pnpm update
   ```

3. **Fix vulnerabilities**
   ```bash
   pnpm audit --fix
   ```

### Content Security Policy

Add CSP headers for enhanced security:
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
}
```

### HTTPS Only

- Always use HTTPS in production
- Enable HSTS header
- Redirect HTTP to HTTPS

## Maintenance Schedule

### Daily
- Monitor error rates
- Check performance metrics
- Review deployment logs

### Weekly
- Review security advisories
- Update dependencies (minor versions)
- Analyze bundle size trends

### Monthly
- Full security audit
- Performance optimization review
- Update major dependencies
- Review and update documentation

### Quarterly
- Disaster recovery test
- Rollback procedure test
- Monitoring configuration review
- Capacity planning review

## Contact and Escalation

### On-Call Rotation
- Primary: [Contact Info]
- Secondary: [Contact Info]
- Manager: [Contact Info]

### Escalation Path
1. Development Team
2. Tech Lead
3. Engineering Manager
4. VP Engineering

### External Contacts
- Vercel Support: support@vercel.com
- CDN Provider: [Contact Info]
- Security Team: [Contact Info]

## Disaster Recovery

### Backup Strategy
- Git repository (primary backup)
- Database backups (if applicable)
- Configuration backups
- Documentation backups

### Recovery Time Objective (RTO)
- Target: < 1 hour

### Recovery Point Objective (RPO)
- Target: < 15 minutes

### Recovery Steps
1. Assess impact
2. Notify stakeholders
3. Execute rollback
4. Verify restoration
5. Post-mortem analysis

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-28 | 1.0.0 | Initial runbook creation |

## Related Documents

- [Contributing Guide](./CONTRIB.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
