'use client';
import { Box, Typography, Paper, Stack, Divider, Alert } from '@mui/material';
import Link from 'next/link';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

export default function CleanupPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Cleanup Guide
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Smart cleanup utility for migrated projects. Remove legacy files and maintain a clean RAPIDS-optimized structure.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Stack spacing={4}>
        {/* Overview */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📖 Overview
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            <code style={{ color: '#FF6B9D', fontWeight: 600 }}>rapids-clean</code> removes old project files
            and documentation after migrating to RAPIDS framework. It helps you maintain a clean, RAPIDS-optimized
            project structure.
          </Typography>
        </Box>

        {/* When to Use */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ⏰ When to Use
          </Typography>
          <Alert
            severity="info"
            icon={<InfoIcon />}
            sx={{
              backgroundColor: 'rgba(107, 91, 149, 0.1)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
              color: 'text.primary',
            }}
          >
            Run <code style={{ color: '#FF6B9D' }}>rapids-clean</code> <strong>after</strong> successfully
            running <code style={{ color: '#FF6B9D' }}>rapids-migrate</code> on an existing project.
          </Alert>
        </Box>

        {/* Usage */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🚀 Usage
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
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 1,
              }}
            >
              # After migrating your project
              <br />
              cd your-project/
              <br />
              rapids-migrate
              <br />
              <br />
              # Then clean up old files
              <br />
              rapids-clean
            </Typography>
          </Paper>
        </Box>

        {/* What Gets Cleaned */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🧹 What Gets Cleaned
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#FF6B9D' }}>
                Legacy Documentation
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • README.old.md
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • CONTRIBUTING.old.md
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • docs/old/**
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • docs/legacy/**
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#C44569' }}>
                Environment Files
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
                RAPIDS uses <code style={{ color: '#FF6B9D' }}>.env</code> only
              </Alert>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .env.local
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .env.production
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .env.development
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .env.example
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6B5B95' }}>
                Build Artifacts
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .next/ - Next.js build cache
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • dist/ - Build output (regenerated on build)
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • build/ - Build output
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • __pycache__/ - Python cache
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • *.pyc - Python bytecode
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .pytest_cache/ - Pytest cache
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#9B8BC0' }}>
                Replaced Helper Scripts
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • scripts/setup.sh
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • scripts/init.sh
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • scripts/bootstrap.sh
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • bin/setup
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • bin/init
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#FF6B9D' }}>
                Old CI/CD Configs
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .travis.yml
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .circleci/
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • azure-pipelines.yml
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#C44569' }}>
                Migration Artifacts
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • .claude.backup/ - Backup created during migration
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Box>

        {/* Safety Features */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🛡️ Safety Features
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Pre-Cleanup Verification
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Checks if RAPIDS has been initialized (.claude/ and CLAUDE.md exist)
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Will not run on non-RAPIDS projects
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Shows preview of items to be removed before cleaning
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Cleanup Log
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                All removed items are logged to <code style={{ color: '#FF6B9D' }}>.rapids-cleanup.log</code> with:
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Timestamp
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Item path
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Reason for removal
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Size freed
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Success/failure status
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: 'rgba(20, 20, 25, 0.6)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Size Reporting
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Shows total disk space that will be freed before cleanup
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Output Example */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📺 Output Example
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
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
{`⚡ RAPIDS Clean

Found 12 items to clean up:
  📄 .env.local - Use .env only (per CLAUDE.md) (1.2 KB)
  📄 .env.production - Use .env only (per CLAUDE.md) (980 B)
  📁 .next/ - Next.js build cache (45.3 MB)
  📁 __pycache__/ - Python cache (2.1 MB)
  📄 scripts/setup.sh - Replaced by RAPIDS migration (3.4 KB)
  📁 .claude.backup - Migration backup (15.2 KB)
  ... and 6 more items

Total space to free: 47.7 MB

⚡ Starting cleanup in 2 seconds...
 (Log will be saved to .rapids-cleanup.log)`}
            </Typography>
          </Paper>
        </Box>

        {/* Philosophy */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            💡 Philosophy
          </Typography>
          <Alert
            severity="info"
            sx={{
              backgroundColor: 'rgba(107, 91, 149, 0.1)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
              color: 'text.primary',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              One Source of Truth
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2">
                • <strong>Environment:</strong> .env only (no .env.local, .env.production, etc.)
              </Typography>
              <Typography variant="body2">
                • <strong>Documentation:</strong> CLAUDE.md and .agent/ system (no scattered READMEs)
              </Typography>
              <Typography variant="body2">
                • <strong>Setup:</strong> RAPIDS agents replace helper scripts
              </Typography>
              <Typography variant="body2">
                • <strong>CI/CD:</strong> GitHub Actions with RAPIDS workflow (old configs removed)
              </Typography>
            </Stack>
          </Alert>
        </Box>

        {/* Non-Destructive */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ✅ Non-Destructive
          </Typography>
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{
              backgroundColor: 'rgba(107, 91, 149, 0.1)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
              color: 'text.primary',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              rapids-clean NEVER removes:
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2">
                • Source code
              </Typography>
              <Typography variant="body2">
                • .claude/ configuration
              </Typography>
              <Typography variant="body2">
                • .agent/ documentation
              </Typography>
              <Typography variant="body2">
                • Active package manager files
              </Typography>
              <Typography variant="body2">
                • package.json or dependency configs
              </Typography>
              <Typography variant="body2">
                • Git repository (.git/)
              </Typography>
            </Stack>
          </Alert>
        </Box>

        {/* Workflow */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔄 Workflow
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              component="pre"
              sx={{
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontSize: '0.85rem',
                whiteSpace: 'pre',
              }}
            >
{`┌─────────────────┐
│ Existing Project│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ rapids-migrate  │ ← Sets up RAPIDS
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  rapids-clean   │ ← Removes old files
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Clean RAPIDS    │
│    Project      │
└─────────────────┘`}
            </Typography>
          </Paper>
        </Box>

        {/* FAQ */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ❓ FAQ
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Q: Can I run rapids-clean multiple times?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                A: Yes. It's idempotent - subsequent runs will find nothing to clean.
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Q: What if I need a file that was removed?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                A: Check .rapids-cleanup.log for the complete list. Most removed files are regenerated on build
                or replaced by RAPIDS patterns.
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Q: Does it remove node_modules/?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                A: No. Package dependencies are never removed. Use npm/yarn/pnpm prune for that.
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Q: What about my custom scripts?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                A: Only common setup/init scripts are removed. Custom build or utility scripts are preserved.
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
              → <Link href="/docs/migration" style={{ color: '#FF6B9D', textDecoration: 'none' }}>Read Migration Guide</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/token-optimization" style={{ color: '#C44569', textDecoration: 'none' }}>Learn Token Optimization with .agent/</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/agents" style={{ color: '#6B5B95', textDecoration: 'none' }}>Start Using AI Agents</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
