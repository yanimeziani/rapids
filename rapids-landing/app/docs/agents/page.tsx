'use client';
import { Box, Typography, Paper, Stack, Divider, Alert, Chip } from '@mui/material';
import Link from 'next/link';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BugReportIcon from '@mui/icons-material/BugReport';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Science';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaletteIcon from '@mui/icons-material/Palette';

export default function AgentsPage() {
  const agents = [
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 40, color: '#FF6B9D' }} />,
      name: 'Feature Builder',
      description: 'Builds complete features across mobile, web, and backend.',
      usage: '/feature "Add user authentication"',
      color: '#FF6B9D',
      useCases: [
        'Complete multi-layer features',
        'Complex integrations',
        'New full modules',
      ],
    },
    {
      icon: <BugReportIcon sx={{ fontSize: 40, color: '#C44569' }} />,
      name: 'Bug Hunter',
      description: 'Finds and fixes bugs throughout the codebase.',
      usage: '/bug "Login redirect broken"',
      color: '#C44569',
      useCases: [
        'Complex multi-file bugs',
        'Intermittent errors',
        'Performance issues',
      ],
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: '#6B5B95' }} />,
      name: 'Code Searcher',
      description: 'Searches and analyzes code patterns (auto-activates).',
      usage: 'Find all places where we handle user authentication',
      color: '#6B5B95',
      useCases: [
        'Exploring unfamiliar code',
        'Tracing implementations',
        'Understanding architecture',
      ],
      autoActivate: true,
    },
    {
      icon: <ScienceIcon sx={{ fontSize: 40, color: '#9B8BC0' }} />,
      name: 'Test Generator',
      description: 'Generates comprehensive tests for your code.',
      usage: '/test "Create tests for user authentication"',
      color: '#9B8BC0',
      useCases: [
        'New features without tests',
        'Improving coverage',
        'Regression tests',
      ],
    },
    {
      icon: <AutoFixHighIcon sx={{ fontSize: 40, color: '#FF6B9D' }} />,
      name: 'Refactor Master',
      description: 'Intelligent and safe refactoring while maintaining functionality.',
      usage: '/refactor "Extract auth logic to hooks"',
      color: '#FF6B9D',
      useCases: [
        'Significant code smells',
        'Excessive duplication',
        'High complexity',
      ],
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#C44569' }} />,
      name: 'Performance Analyzer',
      description: 'Analyzes and optimizes performance across the stack.',
      usage: '/performance "Optimize flows screen loading"',
      color: '#C44569',
      useCases: [
        'Noticeable slowness',
        'Memory spikes',
        'Slow database queries',
      ],
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40, color: '#6B5B95' }} />,
      name: 'DB Architect',
      description: 'Manages database schema and migrations.',
      usage: '/db "Add user_preferences table"',
      color: '#6B5B95',
      useCases: [
        'Schema changes',
        'New tables',
        'Complex modifications',
      ],
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#9B8BC0' }} />,
      name: 'Security Scanner',
      description: 'Scans for security vulnerabilities and provides fixes.',
      usage: '/security "Audit authentication flow"',
      color: '#9B8BC0',
      useCases: [
        'Before production release',
        'After auth refactoring',
        'Periodic audits',
      ],
    },
    {
      icon: <CloudUploadIcon sx={{ fontSize: 40, color: '#FF6B9D' }} />,
      name: 'Deployment Manager',
      description: 'Manages deployments to staging and production.',
      usage: '/deploy "Push to staging"',
      color: '#FF6B9D',
      useCases: [
        'Staging/prod deployments',
        'Important releases',
        'Rollback needed',
      ],
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
      name: 'Marketing Strategist',
      description: 'THE MOST CRITICAL: Revenue generation, user acquisition, GTM strategy.',
      usage: '/market "Create launch campaign for feature X"',
      color: '#FFD700',
      useCases: [
        'Validate revenue potential',
        'User acquisition strategy',
        'Product launch campaigns',
        'Conversion optimization',
      ],
      critical: true,
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 40, color: '#C44569' }} />,
      name: 'Design Master',
      description: 'Material Design 3 expert for UNIQUE, CUSTOM designs that stand out.',
      usage: '/design "Create unique color scheme for feature X"',
      color: '#C44569',
      useCases: [
        'Distinctive brand identity',
        'Custom Material Design 3 themes',
        'Accessibility audits',
        'Responsive design',
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        AI Agents Guide
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        RAPIDS includes 11 autonomous AI agents that execute complex tasks in parallel. Use them to 10x your productivity.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Stack spacing={4}>
        {/* Critical Agent Notice */}
        <Alert
          severity="warning"
          sx={{
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            color: 'text.primary',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            💰 Marketing Strategist is THE MOST CRITICAL Agent
          </Typography>
          <Typography variant="body2">
            Code without users is worthless. Features without revenue validation waste time.
            Always validate market demand before building.
          </Typography>
        </Alert>

        {/* Agent List */}
        {agents.map((agent, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              backgroundColor: agent.critical
                ? 'rgba(255, 215, 0, 0.05)'
                : 'rgba(20, 20, 25, 0.6)',
              border: agent.critical
                ? '2px solid rgba(255, 215, 0, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box>{agent.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: agent.color }}>
                    {agent.name}
                  </Typography>
                  {agent.autoActivate && (
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
                  {agent.critical && (
                    <Chip
                      label="CRITICAL"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        color: '#FFD700',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Stack>

                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  {agent.description}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  Usage:
                </Typography>
                <Typography
                  component="code"
                  sx={{
                    display: 'block',
                    fontFamily: 'monospace',
                    color: agent.color,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    p: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  {agent.usage}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  When to use:
                </Typography>
                <Stack spacing={0.5}>
                  {agent.useCases.map((useCase, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {useCase}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ))}

        {/* Parallel Execution */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔥 Parallel Execution
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            Run multiple agents simultaneously for maximum efficiency:
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Example: Complete Feature in Parallel
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
{`Launch 3 agents in parallel to create workout timer:

Agent 1 (backend): Create API endpoints for timer
Agent 2 (mobile): Create Flutter timer UI
Agent 3 (web): Create Next.js timer page

Run simultaneously and report when all done.`}
            </Typography>
          </Paper>
        </Box>

        {/* Best Practices */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            💡 Best Practices
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#FF6B9D' }}>
                1. Be Precise
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ❌ "Fix the bug"
                <br />
                ✅ "Launch bug-hunter agent to fix: Database connection timeout in backend/app/main.py line 15"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#C44569' }}>
                2. Provide Context
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ✅ "Launch feature-builder with context: Similar to existing flows feature, uses same DB structure, follow PRD section 2.3"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#6B5B95' }}>
                3. Use Parallelism
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ✅ "Launch 3 agents in parallel: Agent 1 builds backend API, Agent 2 builds mobile UI, Agent 3 designs landing page"
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#9B8BC0' }}>
                4. Validate Before Building
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Always run marketing-strategist FIRST to validate revenue potential before implementing features.
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
              → <Link href="/docs/token-optimization" style={{ color: '#FF6B9D', textDecoration: 'none' }}>Learn Token Optimization with .agent/</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/stack-templates" style={{ color: '#C44569', textDecoration: 'none' }}>Use Stack Templates</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/mcp" style={{ color: '#6B5B95', textDecoration: 'none' }}>Configure MCP Servers</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
