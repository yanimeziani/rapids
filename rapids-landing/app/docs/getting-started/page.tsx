'use client';
import { Box, Typography, Paper, Stack, Divider, Alert, Button } from '@mui/material';
import Link from 'next/link';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function GettingStartedPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Getting Started
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Install RAPIDS in seconds and start building with AI agents immediately.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      {/* Installation */}
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📦 Installation
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Install globally via npm:
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontWeight: 600,
                fontSize: '1.1rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
              }}
            >
              npm install -g rapids-ai
            </Typography>
          </Paper>
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{
              mt: 2,
              backgroundColor: 'rgba(107, 91, 149, 0.1)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
              color: 'text.primary',
            }}
          >
            That's it! RAPIDS will automatically install 11 AI agents, 6 MCP servers, and all configuration globally.
          </Alert>
        </Box>

        {/* Platform Support */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🖥️ Platform Support
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">
              <CheckCircleIcon sx={{ color: '#6B5B95', mr: 1, verticalAlign: 'middle' }} />
              <strong>macOS:</strong> Fully supported
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              <CodeIcon sx={{ color: 'text.secondary', mr: 1, verticalAlign: 'middle' }} />
              <strong>Linux & Windows:</strong> Coming soon
            </Typography>
          </Stack>
        </Box>

        {/* Quick Start */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🚀 Quick Start
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
            Option 1: Create New Project
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2,
              }}
            >
              rapids-init
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Interactive wizard to scaffold a new project with Flutter, Next.js 15, FastAPI, or any combination.
            </Typography>
          </Paper>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
            Option 2: Migrate Existing Project
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2,
              }}
            >
              cd your-project
              <br />
              rapids-migrate
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Zero-risk migration tool that adds RAPIDS without touching your code.
            </Typography>
          </Paper>
          <Button
            variant="outlined"
            href="/docs/migration"
            component={Link}
            sx={{
              mt: 2,
              borderColor: 'rgba(255, 107, 157, 0.5)',
              color: '#FF6B9D',
              '&:hover': {
                borderColor: '#FF6B9D',
                backgroundColor: 'rgba(255, 107, 157, 0.1)',
              },
            }}
          >
            Read Full Migration Guide →
          </Button>
        </Box>

        {/* Using AI Agents */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🤖 Using AI Agents
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            Open your project in Claude Code and start using agents immediately:
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography component="code" sx={{ color: '#FF6B9D', fontWeight: 600 }}>
                /feature "Add user authentication"
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Feature builder agent creates complete functionality
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography component="code" sx={{ color: '#C44569', fontWeight: 600 }}>
                /bug "Login redirect broken"
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Bug hunter finds and fixes issues
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography component="code" sx={{ color: '#6B5B95', fontWeight: 600 }}>
                /refactor "Extract auth logic"
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Refactor master improves code quality
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
              → <Link href="/docs/agents" style={{ color: '#FF6B9D', textDecoration: 'none' }}>Learn about all 11 AI agents</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/mcp" style={{ color: '#C44569', textDecoration: 'none' }}>Configure MCP servers</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/token-optimization" style={{ color: '#6B5B95', textDecoration: 'none' }}>Optimize token usage with .agent/</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/stack-templates" style={{ color: '#9B8BC0', textDecoration: 'none' }}>Use stack templates</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
