'use client';
import { Box, Typography, Paper, Stack, Divider, Chip } from '@mui/material';
import Link from 'next/link';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';

export default function ChangelogPage() {
  const versions = [
    {
      version: 'v4.0.0-beta.1',
      date: '2025-10-06',
      title: 'Complete TypeScript Rewrite',
      features: [
        'Complete TypeScript rewrite with src/ architecture',
        'rapids config - Interactive configuration editor',
        'rapids agent <name> - Direct agent invocation',
        'rapids template <type> <name> - Code generation from templates',
        'rapids doctor - Fully functional health checker',
        'Modular design: cli/, core/, types/, utils/',
        'Dual build system (legacy + modern)',
        'Comprehensive type definitions',
        'Singleton pattern for config management',
      ],
      docs: [
        'Revolutionary README.md with ASCII art branding',
        'Open source ready: MIT License, CONTRIBUTING.md',
        'Updated all documentation for v4.0.0',
        'Complete API documentation',
      ],
      config: [
        'Package.json updated to 4.0.0-beta.1',
        'New bin entries: rapids, rapids-doctor',
        'Enhanced build system with esbuild',
        'TypeScript strict mode enabled',
      ],
      breaking: [
        'Requires Node 20+',
        'New command structure (rapids <command> instead of rapids-<command>)',
        'Configuration reorganization',
      ],
    },
    {
      version: 'v3.9.3',
      date: '2025-10-06',
      title: 'Rapids Clean Feature',
      features: [
        'rapids-clean command - Smart cleanup utility for migrated projects',
        'Removes legacy environment files (.env.local, .env.production, etc.)',
        'Cleans build artifacts and cache directories',
        'Removes deprecated helper scripts',
        'Deletes old CI/CD configs',
        'Pre-cleanup verification and size reporting',
        'Full cleanup log to .rapids-cleanup.log',
      ],
      docs: [
        'Added docs/CLEAN.md - Complete guide for rapids-clean utility',
        'Updated all documentation to reference rapids-clean workflow',
        'Added cleanup step in migration workflows',
      ],
      config: [
        'Package.json now includes rapids-clean bin entry',
        'Build process updated to compile clean.tsx',
      ],
    },
    {
      version: 'v3.9.2',
      date: '2025-10-06',
      title: 'Build Fixes',
      bugFixes: [
        'Fixed CLI build process parse errors',
        'Improved ESM compatibility in build output',
        'Updated esbuild configuration for proper bundling',
      ],
      infrastructure: [
        'Fixed npm cache path in GitHub Actions workflow',
        'Added package-lock.json for CI/CD stability',
        'Improved build reliability',
      ],
    },
    {
      version: 'v3.9.1',
      date: '2025-10-06',
      title: 'Migration Improvements',
      features: [
        'rapids-migrate command - Non-destructive project migration',
        'Auto-detects project stack (Next.js, FastAPI, Flutter)',
        'Identifies project structure (monorepo, multi-folder, single)',
        'Creates .claude/ configuration without touching code',
        'Initializes .agent/ documentation system',
        'Backs up existing .claude/ if present',
        '100% safe - no code modifications',
      ],
      docs: [
        'Added docs/MIGRATION.md - Complete migration guide',
        'Updated documentation to include migration workflows',
        'Added migration examples and troubleshooting',
      ],
      updates: [
        'Updated MCP count from 5 to 7 (added Neon and Dokploy)',
        'Updated agent count to 11 (includes design-master)',
        'Package.json now includes rapids-migrate bin entry',
      ],
    },
    {
      version: 'v3.5.0',
      date: '2025-10-04',
      title: 'Token-Optimized Beast Mode',
      features: [
        'Token Optimization (40-60% Savings)',
        'Subagent isolation with separate context windows',
        'Parallel execution - Run 3 agents concurrently',
        'Auto-compact triggers at 150K tokens',
        'Smart file reading with offset, limit, head_limit',
        'Output Styles: RAPIDS Speed Mode & Ship Mode',
        'CI/CD Automation with GitHub Actions templates',
      ],
      docs: [
        'Quick Start Guide (docs/QUICK_START.md)',
        'Optimization Guide (docs/RAPIDS_OPTIMIZATION_GUIDE.md)',
      ],
      config: [
        'Enhanced hooks in config.json',
        'Token optimization settings',
        'compactOnThreshold: 150000',
      ],
      performance: [
        'Full-stack feature: 80-120K → 35-50K tokens (~60% savings)',
        'Bug fix + test: 25-40K → 10-18K tokens (~55% savings)',
        'Marketing campaign: 30-50K → 15-25K tokens (~45% savings)',
      ],
    },
    {
      version: 'v3.0.0',
      date: '2025-10-04',
      title: 'Initial npm Package',
      features: [
        'Initial release as npm package',
        '10 AI agents (feature-builder, bug-hunter, etc.)',
        '5 MCP servers (Context7, Filesystem, PostgreSQL, GitHub, Puppeteer)',
        'Beautiful Ink TUI installation',
        'Global installation support',
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Changelog
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Version history and updates for RAPIDS. See what's new in each release.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Stack spacing={4}>
        {versions.map((v, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              backgroundColor: index === 0 ? 'rgba(255, 107, 157, 0.05)' : 'rgba(20, 20, 25, 0.6)',
              border: index === 0 ? '2px solid rgba(255, 107, 157, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Chip
                label={v.version}
                sx={{
                  backgroundColor: index === 0 ? 'rgba(255, 107, 157, 0.2)' : 'rgba(107, 91, 149, 0.2)',
                  color: index === 0 ? '#FF6B9D' : '#6B5B95',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {v.date}
              </Typography>
              {index === 0 && (
                <Chip
                  label="LATEST"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 107, 157, 0.2)',
                    color: '#FF6B9D',
                    fontWeight: 600,
                  }}
                />
              )}
            </Stack>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#FF6B9D' }}>
              {v.title}
            </Typography>

            {v.features && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <NewReleasesIcon sx={{ color: '#FF6B9D', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    New Features
                  </Typography>
                </Stack>
                <Stack spacing={0.5} sx={{ pl: 3 }}>
                  {v.features.map((feature, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {feature}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            {v.bugFixes && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <BugReportIcon sx={{ color: '#C44569', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Bug Fixes
                  </Typography>
                </Stack>
                <Stack spacing={0.5} sx={{ pl: 3 }}>
                  {v.bugFixes.map((fix, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {fix}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            {v.docs && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <DescriptionIcon sx={{ color: '#6B5B95', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Documentation
                  </Typography>
                </Stack>
                <Stack spacing={0.5} sx={{ pl: 3 }}>
                  {v.docs.map((doc, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {doc}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            {v.config && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <BuildIcon sx={{ color: '#9B8BC0', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Configuration
                  </Typography>
                </Stack>
                <Stack spacing={0.5} sx={{ pl: 3 }}>
                  {v.config.map((cfg, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {cfg}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            {v.infrastructure && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <BuildIcon sx={{ color: '#9B8BC0', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Infrastructure
                  </Typography>
                </Stack>
                <Stack spacing={0.5} sx={{ pl: 3 }}>
                  {v.infrastructure.map((infra, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {infra}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            {v.breaking && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <BugReportIcon sx={{ color: '#FF6B9D', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Breaking Changes
                  </Typography>
                </Stack>
                <Stack spacing={0.5} sx={{ pl: 3 }}>
                  {v.breaking.map((breaking, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {breaking}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            {v.updates && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <BuildIcon sx={{ color: '#9B8BC0', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Updates
                  </Typography>
                </Stack>
                <Stack spacing={0.5} sx={{ pl: 3 }}>
                  {v.updates.map((update, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                      • {update}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            {v.performance && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Performance Improvements
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: 'rgba(107, 91, 149, 0.1)',
                    border: '1px solid rgba(107, 91, 149, 0.3)',
                  }}
                >
                  <Stack spacing={0.5}>
                    {v.performance.map((perf, i) => (
                      <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>
                        • {perf}
                      </Typography>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            )}
          </Paper>
        ))}

        {/* Philosophy */}
        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(107, 91, 149, 0.1)',
            border: '1px solid rgba(107, 91, 149, 0.3)',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#6B5B95' }}>
            💡 RAPIDS Philosophy
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            "The only metric that matters is revenue. Ship fast, optimize tokens, make money."
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            Every update focuses on velocity, token efficiency, and revenue generation.
          </Typography>
        </Paper>

        {/* Installation */}
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
              Get the latest version:
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
              }}
            >
              npm install -g rapids-ai
            </Typography>
          </Paper>
        </Box>

        {/* Links */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔗 Links
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">
              → <Link href="https://github.com/yamz-ai/rapids" target="_blank" style={{ color: '#FF6B9D', textDecoration: 'none' }}>GitHub Repository</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="https://www.npmjs.com/package/rapids-ai" target="_blank" style={{ color: '#C44569', textDecoration: 'none' }}>npm Package</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="https://github.com/yamz-ai/rapids/issues" target="_blank" style={{ color: '#6B5B95', textDecoration: 'none' }}>Report Issues</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
