# RAPIDS Landing Page - Deployment Guide

## 🚀 Quick Deploy to Vercel

1. **Install Vercel CLI** (if not already):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd rapids-landing
   vercel
   ```

3. **Follow prompts**:
   - Link to Vercel project (or create new)
   - Confirm settings
   - Deploy!

4. **Production deploy**:
   ```bash
   vercel --prod
   ```

## 🌐 Custom Domain

In Vercel dashboard:
1. Go to project settings
2. Click "Domains"
3. Add `rapids.dev` or `rapids.ai` (or whatever domain)
4. Follow DNS configuration instructions

## 🔧 Environment Variables

No environment variables needed for the landing page currently.

If adding later (e.g., analytics):

```bash
# In Vercel dashboard or via CLI:
vercel env add NEXT_PUBLIC_ANALYTICS_ID
```

## 🐳 Docker Deployment

### Build Docker image:

```bash
# Create Dockerfile (already included in instructions)
docker build -t rapids-landing .
```

### Run container:

```bash
docker run -p 3000:3000 rapids-landing
```

### Deploy to cloud:

```bash
# Example: Push to Docker Hub
docker tag rapids-landing username/rapids-landing
docker push username/rapids-landing

# Deploy to your cloud provider
```

## 📊 Performance Monitoring

### Vercel Analytics

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

1. Get GA4 tracking ID
2. Add to environment variables
3. Add script to layout

## 🔒 Security

- HTTPS enabled by default on Vercel
- No sensitive data in client code
- CSP headers recommended for production

## 🎯 SEO

Already optimized:
- ✅ Meta tags in layout
- ✅ Semantic HTML
- ✅ Fast loading (Turbopack)
- ✅ Responsive design
- ✅ Accessible components

Add later:
- Sitemap (`/sitemap.xml`)
- Robots.txt
- OpenGraph images
- Twitter cards

## 📈 Next Steps After Deployment

1. **Add sitemap**:
   ```tsx
   // app/sitemap.ts
   export default function sitemap() {
     return [
       { url: 'https://rapids.dev' },
       { url: 'https://rapids.dev/docs/getting-started' },
       // ... more URLs
     ];
   }
   ```

2. **Add robots.txt**:
   ```tsx
   // app/robots.ts
   export default function robots() {
     return {
       rules: { userAgent: '*', allow: '/' },
       sitemap: 'https://rapids.dev/sitemap.xml',
     };
   }
   ```

3. **Monitor performance**:
   - Vercel Analytics
   - Lighthouse scores
   - Core Web Vitals

4. **Set up CI/CD**:
   - Auto-deploy on git push
   - Preview deployments for PRs
   - Production deploy on main branch

## 🌟 Production Checklist

- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics integrated
- [ ] SEO meta tags verified
- [ ] Social share images added
- [ ] Performance optimized (Lighthouse 90+)
- [ ] Mobile responsive tested
- [ ] All links working
- [ ] Documentation complete
- [ ] Error pages styled (404, 500)

## 📝 Updating Content

### Update landing page:
- Edit components in `components/`
- Modify sections in `app/page.tsx`

### Update documentation:
- Add/edit files in `app/docs/`
- Update sidebar in `app/docs/layout.tsx`

### Deploy updates:
```bash
git add .
git commit -m "Update content"
git push origin main
# Vercel auto-deploys on push
```

## 🆘 Troubleshooting

### Build fails:
- Check TypeScript errors: `npx tsc --noEmit`
- Verify all dependencies installed
- Clear `.next` folder and rebuild

### Styles not loading:
- Check MUI theme provider is in layout
- Verify Emotion cache configured
- Clear browser cache

### Images not showing:
- Use Next.js `Image` component
- Ensure images are in `public/` folder
- Configure domains in `next.config.ts` if external

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Next.js App Router](https://nextjs.org/docs/app)
