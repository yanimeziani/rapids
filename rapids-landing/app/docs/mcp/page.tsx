'use client';
import { Box, Typography, Paper, Stack, Divider, Alert, Chip } from '@mui/material';
import Link from 'next/link';
import CloudIcon from '@mui/icons-material/Cloud';
import FolderIcon from '@mui/icons-material/Folder';
import StorageIcon from '@mui/icons-material/Storage';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';

export default function McpPage() {
  const mcpServers = [
    {
      icon: <CloudIcon sx={{ fontSize: 40, color: '#FF6B9D' }} />,
      name: 'Context7',
      description: 'Up-to-date documentation and code examples for any library/framework.',
      color: '#FF6B9D',
      autoActivate: true,
      setup: 'No setup required - works out of the box',
      useCases: [
        'Get latest API documentation for Flutter, Next.js, FastAPI',
        'Version-specific code examples',
        'Prevent hallucinated APIs',
        'Stay current with framework updates',
      ],
    },
    {
      icon: <FolderIcon sx={{ fontSize: 40, color: '#C44569' }} />,
      name: 'Filesystem',
      description: 'Local file system access for reading, searching, and manipulating files.',
      color: '#C44569',
      autoActivate: false,
      setup: 'Configured for /Volumes/Seagate by default',
      useCases: [
        'Read files across all projects',
        'Search for patterns in multiple repositories',
        'Analyze project structure',
        'Batch file operations',
      ],
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40, color: '#6B5B95' }} />,
      name: 'PostgreSQL',
      description: 'Direct PostgreSQL database querying and schema inspection.',
      color: '#6B5B95',
      autoActivate: false,
      setup: 'Configure connection string: postgresql://localhost:5433',
      useCases: [
        'Query database directly',
        'Inspect schema and relationships',
        'Debug data issues',
        'Generate migration scripts',
      ],
    },
    {
      icon: <GitHubIcon sx={{ fontSize: 40, color: '#9B8BC0' }} />,
      name: 'GitHub',
      description: 'GitHub repository management, issues, PRs, and code search.',
      color: '#9B8BC0',
      autoActivate: false,
      setup: 'Set GITHUB_PERSONAL_ACCESS_TOKEN in environment',
      useCases: [
        'Create issues and PRs',
        'Search across repositories',
        'Manage project boards',
        'Code review automation',
      ],
    },
    {
      icon: <WebIcon sx={{ fontSize: 40, color: '#FF6B9D' }} />,
      name: 'Puppeteer',
      description: 'Web automation and scraping for market research.',
      color: '#FF6B9D',
      autoActivate: false,
      setup: 'No setup required - works out of the box',
      useCases: [
        'Competitive analysis (scrape competitor sites)',
        'Market research (trends, pricing)',
        'Screenshot competitor UIs',
        'Test web deployments',
      ],
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 40, color: '#C44569' }} />,
      name: 'Dokploy',
      description: 'Deployment platform integration for managing applications and services.',
      color: '#C44569',
      autoActivate: false,
      setup: 'Set DOKPLOY_URL and DOKPLOY_API_KEY in environment',
      useCases: [
        'Deploy applications to Dokploy',
        'Manage Docker containers and services',
        'Monitor deployment status',
        'Configure environment variables',
        'Manage databases and domains',
      ],
    },
    {
      icon: <BoltIcon sx={{ fontSize: 40, color: '#6B5B95' }} />,
      name: 'Neon',
      description: 'Neon serverless PostgreSQL database management and operations.',
      color: '#6B5B95',
      autoActivate: false,
      setup: 'Set NEON_API_KEY in environment',
      useCases: [
        'Create and manage Neon databases',
        'Query serverless PostgreSQL instances',
        'Branch databases for development',
        'Monitor database performance',
        'Manage connection strings and credentials',
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        MCP Servers
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        RAPIDS includes 7 pre-configured MCP (Model Context Protocol) servers for extended AI capabilities.
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
            MCP servers extend Claude Code with specialized capabilities. They are automatically installed globally
            and available to all projects.
          </Typography>
        </Alert>

        {/* MCP Server List */}
        {mcpServers.map((server, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box>{server.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: server.color }}>
                    {server.name}
                  </Typography>
                  {server.autoActivate && (
                    <Chip
                      label="Auto-Activate"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(107, 91, 149, 0.2)',
                        color: '#6B5B95',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Stack>

                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  {server.description}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  Setup:
                </Typography>
                <Typography
                  component="code"
                  sx={{
                    display: 'block',
                    fontFamily: 'monospace',
                    color: server.color,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    p: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  {server.setup}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  Use Cases:
                </Typography>
                <Stack spacing={0.5}>
                  {server.useCases.map((useCase, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {useCase}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ))}

        {/* Configuration */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔧 Configuration
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Global Configuration
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              MCP servers are configured in:
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontWeight: 600,
                fontSize: '0.9rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
                mb: 3,
              }}
            >
              ~/.claude/mcp-config.json
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Project-Specific Overrides
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Create project-specific MCP configuration:
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#C44569',
                fontWeight: 600,
                fontSize: '0.9rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
              }}
            >
              .claude/mcp-config.local.json
            </Typography>
          </Paper>
        </Box>

        {/* Environment Variables */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔑 Environment Variables
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Some MCP servers require authentication. Add these to your <code style={{ color: '#FF6B9D' }}>.env</code> file:
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
{`# GitHub MCP
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token

# Dokploy MCP
DOKPLOY_URL=https://your-dokploy-instance.com
DOKPLOY_API_KEY=your_dokploy_key

# Neon MCP
NEON_API_KEY=your_neon_key`}
            </Typography>
          </Paper>
        </Box>

        {/* Usage Examples */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            💡 Usage Examples
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#FF6B9D' }}>
                Context7 (Auto)
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#FF6B9D',
                  fontSize: '0.85rem',
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
                "Show me latest Next.js 15 App Router patterns"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#C44569' }}>
                Filesystem
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontSize: '0.85rem',
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
                "Search all projects for authentication patterns"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#6B5B95' }}>
                PostgreSQL
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontSize: '0.85rem',
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
                "Query users table and show schema"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#9B8BC0' }}>
                GitHub
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#9B8BC0',
                  fontSize: '0.85rem',
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
                "Create issue: Bug in authentication flow"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#FF6B9D' }}>
                Puppeteer (Market Research)
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#FF6B9D',
                  fontSize: '0.85rem',
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
                "Screenshot competitor pricing pages"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#C44569' }}>
                Dokploy
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontSize: '0.85rem',
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                }}
              >
                "Deploy web app to production"
              </Typography>
            </Paper>
          </Stack>
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
