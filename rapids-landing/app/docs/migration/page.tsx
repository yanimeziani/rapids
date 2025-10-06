'use client';
import { Box, Typography, Paper, Stack, Divider, Alert, Button } from '@mui/material';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

export default function MigrationPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Migration Guide
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Add RAPIDS framework to existing projects without breaking your code. 100% non-destructive migration.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Stack spacing={4}>
        {/* Quick Migration */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🚀 Quick Migration
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
                fontSize: '1.1rem',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
              }}
            >
              cd your-existing-project
              <br />
              rapids-migrate
              <br />
              rapids-clean
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
            Zero-risk migration. Your code is never modified. Only RAPIDS configuration files are added.
          </Alert>
        </Box>

        {/* What It Does */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔍 What Migration Does
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#FF6B9D' }}>
                1. Analyzes Your Project
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • Detects tech stack (Next.js, FastAPI, Flutter)
                <br />
                • Identifies project structure (monorepo, multi-folder, single)
                <br />
                • Finds package manager (npm, yarn, pnpm)
                <br />
                • Locates existing folders (web, backend, mobile)
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#C44569' }}>
                2. Creates Configuration
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • Adds <code style={{ color: '#FF6B9D' }}>.claude/</code> configuration folder
                <br />
                • Creates <code style={{ color: '#FF6B9D' }}>CLAUDE.md</code> with project-specific instructions
                <br />
                • Sets up <code style={{ color: '#FF6B9D' }}>.claudeignore</code> if missing
                <br />
                • Generates <code style={{ color: '#FF6B9D' }}>settings.local.json</code> with detected structure
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#6B5B95' }}>
                3. Initializes Documentation System
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • Creates <code style={{ color: '#FF6B9D' }}>.agent/</code> folder structure (task, system, sop)
                <br />
                • Copies templates from global installation
                <br />
                • Generates initial architecture overview
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#9B8BC0' }}>
                4. Preserves Your Code
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • No files moved
                <br />
                • No code modified
                <br />
                • Existing structure untouched
                <br />
                • Backup created if <code style={{ color: '#FF6B9D' }}>.claude/</code> exists
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Supported Structures */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📁 Supported Project Structures
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Monorepo
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#FF6B9D',
                  fontSize: '0.9rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`your-project/
├── web/           # Next.js app
├── backend/       # FastAPI
├── mobile/        # Flutter
└── package.json   # Workspaces`}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Multi-folder
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontSize: '0.9rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`your-project/
├── frontend/      # or client/
├── server/        # or api/
└── ...`}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Single Stack
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontSize: '0.9rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
{`your-project/
├── app/           # Next.js or React
├── pages/
├── components/
└── package.json`}
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Post-Migration Steps */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ✅ Post-Migration Steps
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                1. Document Your Architecture
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#FF6B9D',
                  fontWeight: 600,
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                /update-doc system
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Creates architecture-overview.md, database-schema.md, api-endpoints.md, critical-paths.md
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                2. Create Feature Plans
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#C44569',
                  fontWeight: 600,
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                /update-doc plan user-authentication
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Generates structured plan in .agent/task/
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                3. Start Using Agents
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                /feature "Add user profile page"
                <br />
                /bug "Fix login redirect issue"
                <br />
                /refactor "Extract auth logic to hooks"
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Token Savings */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            💰 Token Optimization Benefits
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#FF6B9D' }}>
              Before RAPIDS
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: 'text.secondary',
                fontSize: '0.9rem',
                mb: 3,
              }}
            >
              You: "Add user authentication"
              <br />
              Claude: *reads entire codebase* (50K tokens)
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6B5B95' }}>
              After RAPIDS
            </Typography>
            <Typography
              component="code"
              sx={{
                display: 'block',
                fontFamily: 'monospace',
                color: 'text.secondary',
                fontSize: '0.9rem',
              }}
            >
              You: "Add user authentication"
              <br />
              Claude: *reads .agent/system/architecture-overview.md* (2K tokens)
              <br />
              Claude: *reads .agent/system/database-schema.md* (1K tokens)
            </Typography>

            <Alert
              severity="success"
              icon={<CheckCircleIcon />}
              sx={{
                mt: 3,
                backgroundColor: 'rgba(107, 91, 149, 0.1)',
                border: '1px solid rgba(107, 91, 149, 0.3)',
                color: 'text.primary',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Savings: 94%
              </Typography>
            </Alert>
          </Paper>
        </Box>

        {/* Rollback */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔄 Rollback (If Needed)
          </Typography>
          <Alert
            severity="info"
            icon={<InfoIcon />}
            sx={{
              mb: 2,
              backgroundColor: 'rgba(196, 69, 105, 0.1)',
              border: '1px solid rgba(196, 69, 105, 0.3)',
              color: 'text.primary',
            }}
          >
            If you want to undo migration and restore your original setup:
          </Alert>
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
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
              }}
            >
              # Remove RAPIDS configuration
              <br />
              rm -rf .claude/ .agent/ CLAUDE.md .claudeignore
              <br />
              <br />
              # Restore backup if needed
              <br />
              mv .claude.backup .claude
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
              → <Link href="/docs/token-optimization" style={{ color: '#FF6B9D', textDecoration: 'none' }}>Read Token Optimization Guide</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/agents" style={{ color: '#C44569', textDecoration: 'none' }}>Explore AI Agent Capabilities</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/cleanup" style={{ color: '#6B5B95', textDecoration: 'none' }}>Use rapids-clean to Remove Legacy Files</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/deployment" style={{ color: '#9B8BC0', textDecoration: 'none' }}>Set Up Deployment</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
