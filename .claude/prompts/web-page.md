# Web Page Template

Use this template when creating new web pages.

## Context
- Framework: Next.js 15 (App Router)
- Styling: CSS-in-JS inline styles
- Theme: Deep Blue (#2563EB), Orange (#F97316)
- Responsive: Mobile-first

## Structure
```
web/app/<route>/
├── page.tsx           # Server Component
├── layout.tsx         # Layout (if needed)
├── loading.tsx        # Loading state
├── error.tsx          # Error boundary
└── components/        # Page-specific components
```

## Page Template
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Flowz',
  description: 'Page description',
};

export default function Page() {
  return (
    <main style={{ padding: '2rem' }}>
      {/* Content */}
    </main>
  );
}
```

## Checklist
- [ ] Create page.tsx
- [ ] Add metadata
- [ ] Implement layout
- [ ] Add loading state
- [ ] Error boundary
- [ ] Responsive design
- [ ] API integration
- [ ] Client components (if needed)
- [ ] Update navigation
- [ ] Test on mobile

## Standards
- Server Components by default
- 'use client' only when needed
- Consistent spacing (theme)
- Accessible HTML
- SEO optimized
- Performance focused
