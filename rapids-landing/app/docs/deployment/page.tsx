'use client';
import { Box, Typography, Paper, Stack, Divider, Alert, Chip } from '@mui/material';
import Link from 'next/link';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

export default function DeploymentPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Deployment Guide
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Deploy your RAPIDS projects to production with Docker and Dokploy. Fully automated with the deployment-manager agent.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Stack spacing={4}>
        {/* Docker-First Architecture */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🐳 Docker-First Architecture
          </Typography>
          <Alert
            severity="info"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(107, 91, 149, 0.1)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
              color: 'text.primary',
            }}
          >
            RAPIDS enforces Docker for all deployments to ensure consistency across environments.
          </Alert>

          <Stack spacing={2}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#FF6B9D' }}>
                Web (Next.js)
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Multi-stage build: deps → builder → runner
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Base image: <code style={{ color: '#FF6B9D' }}>node:20-alpine</code>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Build output: standalone mode
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • File: <code style={{ color: '#FF6B9D' }}>web/Dockerfile</code>
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#C44569' }}>
                Backend (FastAPI)
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Single-stage Python build
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Base image: <code style={{ color: '#C44569' }}>python:3.12-slim</code>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Health checks required
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • File: <code style={{ color: '#C44569' }}>backend/Dockerfile</code>
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6B5B95' }}>
                Mobile (Flutter)
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • No Docker required (native mobile apps)
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Build for iOS: Xcode + App Store Connect
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Build for Android: Gradle + Google Play Console
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Box>

        {/* Dokploy Integration */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🚀 Dokploy Integration
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            RAPIDS integrates with Dokploy for self-hosted Docker PaaS deployment:
          </Typography>

          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Setup Environment Variables
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Add to your <code style={{ color: '#FF6B9D' }}>.env</code> file:
            </Typography>
            <Typography
              component="pre"
              sx={{
                fontFamily: 'monospace',
                color: '#6B5B95',
                fontSize: '0.9rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
{`DOKPLOY_URL=https://your-dokploy-instance.com
DOKPLOY_API_KEY=your_api_key_here`}
            </Typography>
          </Paper>
        </Box>

        {/* Deployment Agent */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🤖 Using Deployment Manager Agent
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Deploy to Staging
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontWeight: 600,
                fontSize: '1rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
                mb: 2,
              }}
            >
              /deploy "Push to staging"
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontWeight: 600 }}>
              What it does:
            </Typography>
            <Stack spacing={0.5} sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                1. Runs pre-deployment checks
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                2. Builds Docker images
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                3. Tags versions
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                4. Deploys to Dokploy
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                5. Runs health checks
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                6. Sets up monitoring
              </Typography>
            </Stack>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Deploy to Production
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#C44569',
                fontWeight: 600,
                fontSize: '1rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
              }}
            >
              /deploy "Push to production with security scan"
            </Typography>
          </Paper>
        </Box>

        {/* Manual Deployment */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ⚙️ Manual Deployment
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            If you prefer manual deployment, follow these steps:
          </Typography>

          <Stack spacing={2}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                1. Build Docker Images
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
                }}
              >
{`# Build web (Next.js)
docker build -t myapp-web:latest ./web

# Build backend (FastAPI)
docker build -t myapp-backend:latest ./backend`}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                2. Push to Registry
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontSize: '0.9rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
{`# Tag images
docker tag myapp-web:latest registry.example.com/myapp-web:latest
docker tag myapp-backend:latest registry.example.com/myapp-backend:latest

# Push
docker push registry.example.com/myapp-web:latest
docker push registry.example.com/myapp-backend:latest`}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                3. Deploy to Dokploy
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Use Dokploy UI or CLI to deploy the images
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontSize: '0.9rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
{`# Or use deployment-manager agent
/deploy "Deploy myapp-web and myapp-backend to production"`}
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Environment Variables */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔐 Environment Variables
          </Typography>
          <Alert
            severity="warning"
            icon={<WarningIcon />}
            sx={{
              mb: 2,
              backgroundColor: 'rgba(196, 69, 105, 0.1)',
              border: '1px solid rgba(196, 69, 105, 0.3)',
              color: 'text.primary',
            }}
          >
            RAPIDS uses a single <code style={{ color: '#FF6B9D' }}>.env</code> file for all environments.
            No <code>.env.local</code>, <code>.env.production</code>, etc.
          </Alert>

          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Production Environment Variables
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
{`# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Authentication
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=https://yourapp.com

# Deployment
DOKPLOY_URL=https://dokploy.yourserver.com
DOKPLOY_API_KEY=your_api_key

# External Services
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx
NEON_API_KEY=neon_xxx`}
            </Typography>
          </Paper>
        </Box>

        {/* Health Checks */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ❤️ Health Checks
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Backend Health Check
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                FastAPI endpoint for health monitoring:
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontSize: '0.85rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
{`@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}`}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Docker Health Check
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Add to Dockerfile:
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontSize: '0.85rem',
                  p: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
{`HEALTHCHECK --interval=30s --timeout=10s --retries=3 \\
  CMD curl --fail http://localhost:8000/health || exit 1`}
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Deployment Workflow */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔄 Complete Deployment Workflow
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Chip
                  label="1"
                  sx={{
                    backgroundColor: 'rgba(255, 107, 157, 0.2)',
                    color: '#FF6B9D',
                    fontWeight: 600,
                    mr: 2,
                  }}
                />
                <Typography component="span" variant="body1">
                  Build feature with agents
                </Typography>
              </Box>
              <Box>
                <Chip
                  label="2"
                  sx={{
                    backgroundColor: 'rgba(196, 69, 105, 0.2)',
                    color: '#C44569',
                    fontWeight: 600,
                    mr: 2,
                  }}
                />
                <Typography component="span" variant="body1">
                  Run tests with test-generator agent
                </Typography>
              </Box>
              <Box>
                <Chip
                  label="3"
                  sx={{
                    backgroundColor: 'rgba(107, 91, 149, 0.2)',
                    color: '#6B5B95',
                    fontWeight: 600,
                    mr: 2,
                  }}
                />
                <Typography component="span" variant="body1">
                  Security scan with security-scanner agent
                </Typography>
              </Box>
              <Box>
                <Chip
                  label="4"
                  sx={{
                    backgroundColor: 'rgba(155, 139, 192, 0.2)',
                    color: '#9B8BC0',
                    fontWeight: 600,
                    mr: 2,
                  }}
                />
                <Typography component="span" variant="body1">
                  Deploy to staging with deployment-manager agent
                </Typography>
              </Box>
              <Box>
                <Chip
                  label="5"
                  sx={{
                    backgroundColor: 'rgba(255, 107, 157, 0.2)',
                    color: '#FF6B9D',
                    fontWeight: 600,
                    mr: 2,
                  }}
                />
                <Typography component="span" variant="body1">
                  Verify staging deployment
                </Typography>
              </Box>
              <Box>
                <Chip
                  label="6"
                  sx={{
                    backgroundColor: 'rgba(196, 69, 105, 0.2)',
                    color: '#C44569',
                    fontWeight: 600,
                    mr: 2,
                  }}
                />
                <Typography component="span" variant="body1">
                  Deploy to production
                </Typography>
              </Box>
              <Box>
                <Chip
                  label="7"
                  sx={{
                    backgroundColor: 'rgba(107, 91, 149, 0.2)',
                    color: '#6B5B95',
                    fontWeight: 600,
                    mr: 2,
                  }}
                />
                <Typography component="span" variant="body1">
                  Monitor and verify production
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* Next Steps */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📚 Next Steps
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">
              → <Link href="/docs/agents" style={{ color: '#FF6B9D', textDecoration: 'none' }}>Learn about Deployment Manager Agent</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/mcp" style={{ color: '#C44569', textDecoration: 'none' }}>Configure Dokploy MCP Server</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/stack-templates" style={{ color: '#6B5B95', textDecoration: 'none' }}>Review Docker Templates</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
