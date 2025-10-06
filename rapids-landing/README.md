# 🌊 RAPIDS Landing Page & Docs

Stylish Next.js 15 + Material UI 3 landing page and documentation site for the RAPIDS framework.

## 🎨 Features

- **Next.js 15** with App Router and Turbopack
- **Material UI 3** (v6) with custom RAPIDS theme
- **Framer Motion** for smooth animations
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Stunning dark theme with gradient accents
- **TypeScript** - Fully typed components

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3002](http://localhost:3002) (or the port shown in terminal)

## 📁 Project Structure

```
rapids-landing/
├── app/
│   ├── layout.tsx              # Root layout with MUI theme
│   ├── page.tsx                # Landing page
│   ├── theme.ts                # MUI theme configuration
│   ├── globals.css             # Global styles and animations
│   └── docs/                   # Documentation pages
│       ├── layout.tsx          # Docs layout with sidebar
│       ├── getting-started/
│       ├── migration/
│       ├── agents/
│       ├── mcp/
│       ├── token-optimization/
│       ├── stack-templates/
│       ├── deployment/
│       └── changelog/
├── components/
│   ├── HeroSection.tsx         # Hero with animated gradients
│   ├── FeaturesSection.tsx     # Feature cards grid
│   ├── AgentsSection.tsx       # 11 AI agents showcase
│   ├── MCPSection.tsx          # MCP servers grid
│   ├── TokenOptimizationSection.tsx
│   ├── CTASection.tsx          # Call-to-action
│   └── Footer.tsx              # Footer with links
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🎨 Theme Customization

The RAPIDS theme uses a custom color palette defined in `app/theme.ts`:

- **Primary**: `#FF6B9D` (Pink)
- **Secondary**: `#6B5B95` (Purple)
- **Background**: `#0A0A0F` (Dark)
- **Accent**: Gradient combinations

## 📦 Components

### Landing Page Sections

1. **HeroSection** - Animated hero with CTAs
2. **FeaturesSection** - 6 feature cards with hover effects
3. **AgentsSection** - List of 11 AI agents
4. **MCPSection** - 6 MCP servers grid
5. **TokenOptimizationSection** - Savings showcase
6. **CTASection** - Final call-to-action
7. **Footer** - Links and social

### Documentation

- Sidebar navigation (responsive)
- Full documentation structure
- Code examples with syntax highlighting
- Step-by-step guides

## 🎭 Animations

- **Framer Motion** for smooth transitions
- **Gradient backgrounds** with infinite animations
- **Hover effects** on cards and buttons
- **Scroll-based animations** for sections

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build
npm run build

# Create Dockerfile (example):
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

```bash
# Add to next.config.ts:
output: 'export'

# Build
npm run build
```

## 🎨 Design System

### Colors

```css
--primary: #FF6B9D
--secondary: #6B5B95
--background: #0A0A0F
--surface: #141419
```

### Typography

- **Font**: Inter (from Google Fonts)
- **Headings**: 700-900 weight
- **Body**: 400-600 weight

### Components

- **Buttons**: Rounded corners, gradient backgrounds, glow effects
- **Cards**: Glass morphism with blur and borders
- **Spacing**: Consistent 8px grid

## 📝 Adding New Doc Pages

1. Create folder in `app/docs/[page-name]/`
2. Add `page.tsx` file
3. Add route to sidebar in `app/docs/layout.tsx`

Example:

```tsx
// app/docs/new-page/page.tsx
export default function NewPage() {
  return (
    <Box>
      <Typography variant="h3">New Page</Typography>
      {/* Content */}
    </Box>
  );
}
```

## 🔧 Configuration

### Next.js Config

- Turbopack enabled for faster dev builds
- React strict mode enabled
- TypeScript strict mode

### TypeScript

- Strict mode enabled
- Path aliases: `@/*` points to root

## 📱 Responsive Breakpoints

- **xs**: 0px
- **sm**: 600px
- **md**: 900px
- **lg**: 1200px
- **xl**: 1536px

## 🎯 Performance

- Server-side rendering with App Router
- Automatic code splitting
- Image optimization (Next.js built-in)
- Font optimization (Google Fonts)

## 🛠️ Development

### Hot Reload

Changes to any file trigger automatic hot reload.

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## 📚 Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Material UI Docs](https://mui.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [RAPIDS GitHub](https://github.com/yanimeziani/rapids)

## 📄 License

MIT License - Same as RAPIDS framework

## 👤 Author

Built by [Yani Meziani](https://github.com/yanimeziani) for the RAPIDS framework.
