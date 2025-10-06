'use client';
import { Box, Typography, Paper, Stack, Divider, Alert } from '@mui/material';
import Link from 'next/link';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WebIcon from '@mui/icons-material/Web';
import CloudIcon from '@mui/icons-material/Cloud';
import PaletteIcon from '@mui/icons-material/Palette';

export default function StackTemplatesPage() {
  const templates = [
    {
      icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: '#FF6B9D' }} />,
      name: 'Mobile Feature Template',
      description: 'Flutter + Riverpod patterns for cross-platform mobile apps.',
      color: '#FF6B9D',
      tech: 'Flutter, Riverpod, Go Router, Hive, Dio',
      usage: '/feature "Build mobile profile screen"',
      includes: [
        'Riverpod state management',
        'Go Router navigation',
        'Material Design 3 widgets',
        'Hive local storage',
        'Dio HTTP client',
        'Error handling patterns',
      ],
    },
    {
      icon: <WebIcon sx={{ fontSize: 40, color: '#C44569' }} />,
      name: 'Web Page Template',
      description: 'Next.js 15 App Router patterns for modern web applications.',
      color: '#C44569',
      tech: 'Next.js 15, React 18, App Router, Server Components',
      usage: '/feature "Build web dashboard page"',
      includes: [
        'App Router file structure',
        'Server Components by default',
        'Client Components when needed',
        'NextAuth.js authentication',
        'API route patterns',
        'Metadata and SEO',
      ],
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40, color: '#6B5B95' }} />,
      name: 'Backend API Template',
      description: 'FastAPI + SQLAlchemy + Pydantic patterns for Python backends.',
      color: '#6B5B95',
      tech: 'FastAPI, SQLAlchemy 2.0, Pydantic v2, Alembic',
      usage: '/feature "Build user API endpoints"',
      includes: [
        'FastAPI route structure',
        'SQLAlchemy 2.0 async models',
        'Pydantic v2 validation',
        'Alembic migrations',
        'JWT authentication',
        'Error handling middleware',
      ],
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 40, color: '#9B8BC0' }} />,
      name: 'Design System Template',
      description: 'Material Design 3 components, color schemes, and accessibility guidelines.',
      color: '#9B8BC0',
      tech: 'Material Design 3, WCAG, Custom Themes',
      usage: '/design "Create unique color scheme for app"',
      includes: [
        'Custom Material Design 3 themes',
        'UNIQUE color palettes (not generic)',
        'Dynamic color systems',
        'WCAG accessibility compliance',
        'Responsive layouts',
        'Signature interactions',
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Stack Templates
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Pre-configured templates for Flutter, Next.js 15, FastAPI, and Material Design 3. Generate production-ready code instantly.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Stack spacing={4}>
        {/* Overview */}
        <Alert
          severity="info"
          sx={{
            backgroundColor: 'rgba(107, 91, 149, 0.1)',
            border: '1px solid rgba(107, 91, 149, 0.3)',
            color: 'text.primary',
          }}
        >
          <Typography variant="body1">
            Stack templates provide best-practice patterns for common development scenarios. They are automatically
            used by agents when building features.
          </Typography>
        </Alert>

        {/* Template List */}
        {templates.map((template, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box>{template.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: template.color, mb: 1 }}>
                  {template.name}
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  {template.description}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  Technology Stack:
                </Typography>
                <Typography
                  sx={{
                    color: template.color,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    mb: 2,
                  }}
                >
                  {template.tech}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  Example Usage:
                </Typography>
                <Typography
                  component="code"
                  sx={{
                    display: 'block',
                    fontFamily: 'monospace',
                    color: template.color,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    p: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  {template.usage}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  Template Includes:
                </Typography>
                <Stack spacing={0.5}>
                  {template.includes.map((item, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ))}

        {/* Code Examples */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📝 Code Examples
          </Typography>

          <Stack spacing={3}>
            {/* Flutter Example */}
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 25, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#FF6B9D' }}>
                Flutter Mobile Feature
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#FF6B9D',
                  fontSize: '0.85rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`// Riverpod state provider
final userProvider = StateNotifierProvider<UserNotifier, User>((ref) {
  return UserNotifier();
});

// Screen with Go Router
class ProfileScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);

    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: // Material Design 3 UI
    );
  }
}`}
              </Typography>
            </Paper>

            {/* Next.js Example */}
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 25, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#C44569' }}>
                Next.js 15 App Router Page
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontSize: '0.85rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`// app/dashboard/page.tsx
export const metadata = {
  title: 'Dashboard',
  description: 'User dashboard',
};

export default async function DashboardPage() {
  // Server Component by default
  const data = await fetchData();

  return (
    <div>
      <h1>Dashboard</h1>
      <ClientComponent data={data} />
    </div>
  );
}`}
              </Typography>
            </Paper>

            {/* FastAPI Example */}
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 25, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6B5B95' }}>
                FastAPI Backend Endpoint
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontSize: '0.85rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`# Pydantic schema
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# FastAPI endpoint
@router.post("/users", response_model=User)
async def create_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    # SQLAlchemy 2.0 async
    new_user = User(**user.dict())
    db.add(new_user)
    await db.commit()
    return new_user`}
              </Typography>
            </Paper>

            {/* Design Example */}
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 25, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#9B8BC0' }}>
                Material Design 3 Custom Theme
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#9B8BC0',
                  fontSize: '0.85rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`// UNIQUE color scheme (not generic)
final customColorScheme = ColorScheme.fromSeed(
  seedColor: Color(0xFFFF6B9D), // Brand primary
  brightness: Brightness.dark,
);

// Material Design 3 theme with custom personality
final theme = ThemeData(
  colorScheme: customColorScheme,
  useMaterial3: true,
  // Custom typography, shapes, elevations
);`}
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Full Stack Integration */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔗 Full Stack Integration
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              Example: Building a complete user authentication feature
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontSize: '0.9rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
                whiteSpace: 'pre-wrap',
              }}
            >
{`/feature "Build user authentication with Google OAuth"

Agent will create:
1. Backend (FastAPI):
   - /api/v1/auth/google endpoint
   - User model with SQLAlchemy
   - JWT token generation
   - Pydantic schemas

2. Web (Next.js):
   - /app/auth/signin page
   - NextAuth.js Google provider
   - Session management
   - Protected routes

3. Mobile (Flutter):
   - Google Sign-In UI
   - Token storage with Hive
   - Auth state with Riverpod
   - Protected screens`}
            </Typography>
          </Paper>
        </Box>

        {/* Docker Templates */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🐳 Docker Templates
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            RAPIDS enforces Docker-first architecture for all deployments:
          </Typography>

          <Stack spacing={2}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 25, 0.6)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Next.js Dockerfile
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontSize: '0.75rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`}
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 25, 0.6)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                FastAPI Dockerfile
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontSize: '0.75rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
HEALTHCHECK CMD curl --fail http://localhost:8000/health
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`}
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Template Locations */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📂 Template Locations
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Templates are stored globally and loaded automatically by agents:
            </Typography>
            <Typography
              component="pre"
              sx={{
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontSize: '0.9rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
{`~/.claude/prompts/
├── mobile-feature.md      # Flutter patterns
├── web-page.md            # Next.js patterns
├── backend-api.md         # FastAPI patterns
└── design-system.md       # Material Design 3`}
            </Typography>
          </Paper>
        </Box>

        {/* Next Steps */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📚 Next Steps
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">
              → <Link href="/docs/agents" style={{ color: '#FF6B9D', textDecoration: 'none' }}>Learn about AI Agents</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/deployment" style={{ color: '#C44569', textDecoration: 'none' }}>Set Up Deployment</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/token-optimization" style={{ color: '#6B5B95', textDecoration: 'none' }}>Optimize Token Usage</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
