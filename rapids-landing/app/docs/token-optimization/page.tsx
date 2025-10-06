'use client';
import { Box, Typography, Paper, Stack, Divider, Alert } from '@mui/material';
import Link from 'next/link';
import SpeedIcon from '@mui/icons-material/Speed';
import SaveIcon from '@mui/icons-material/Save';
import FolderIcon from '@mui/icons-material/Folder';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function TokenOptimizationPage() {
  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Token Optimization
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Save 60-80% on token usage with the .agent/ documentation system. Read concise docs instead of full source code.
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Stack spacing={4}>
        {/* Core Principles */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🎯 Core Principles
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#FF6B9D' }}>
                1. Lazy Loading
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Only read files when absolutely necessary
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#C44569' }}>
                2. Parallel Execution
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Run independent tasks concurrently
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#6B5B95' }}>
                3. Subagent Efficiency
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Use subagents for isolated, complex tasks
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#9B8BC0' }}>
                4. Smart Context
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Minimize context pollution with .agent/ docs
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* The .agent/ System */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📁 The .agent/ Documentation System
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              Structure your project knowledge for AI consumption:
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
{`.agent/
├── readme.md              # Documentation index (read this first!)
├── task/                  # Implementation plans & PRDs
│   ├── template-feature-plan.md
│   └── archive/          # Completed plans
├── system/               # Architecture documentation
│   ├── architecture-overview.md
│   ├── database-schema.md
│   ├── api-endpoints.md
│   ├── critical-paths.md
│   └── stack-decisions.md
└── sop/                  # Standard Operating Procedures
    └── template-sop.md`}
            </Typography>
          </Paper>
        </Box>

        {/* Workflow */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🔄 Optimization Workflow
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                1. Before Implementing
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
                /update-doc plan {'<feature-name>'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Create structured plan instead of reading entire codebase
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                2. During Implementation
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Read only relevant .agent/ docs (not entire codebase)
                <br />
                • .agent/system/architecture-overview.md
                <br />
                • .agent/system/database-schema.md
                <br />
                • .agent/system/api-endpoints.md
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                3. After Implementation
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
                /update-doc system
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Update docs if architecture changed
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                4. When Fixing Issues
              </Typography>
              <Typography
                component="code"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: '#6B5B95',
                  fontWeight: 600,
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                /update-doc sop {'<issue-description>'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Create Standard Operating Procedure for future reference
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                5. Context Switching
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Clear thread, rely on .agent/ docs for context (no need to re-read codebase)
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Token Savings Example */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            💰 Token Savings Example
          </Typography>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#FF6B9D' }}>
              Before RAPIDS (Traditional Approach)
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
              Claude: *reads entire codebase* (50,000 tokens)
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6B5B95' }}>
              After RAPIDS (Optimized Approach)
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
              Claude: *reads .agent/system/architecture-overview.md* (2,000 tokens)
              <br />
              Claude: *reads .agent/system/database-schema.md* (1,000 tokens)
              <br />
              Claude: *reads .agent/task/auth-plan.md* (500 tokens)
            </Typography>

            <Alert
              severity="success"
              icon={<TrendingDownIcon />}
              sx={{
                mt: 3,
                backgroundColor: 'rgba(107, 91, 149, 0.1)',
                border: '1px solid rgba(107, 91, 149, 0.3)',
                color: 'text.primary',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Token Savings: 93% (50K → 3.5K tokens)
              </Typography>
            </Alert>
          </Paper>
        </Box>

        {/* Commands */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🛠️ Available Commands
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography
                component="code"
                sx={{ color: '#FF6B9D', fontWeight: 600, fontSize: '0.95rem' }}
              >
                /update-doc initialize
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Set up .agent/ folder structure
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography
                component="code"
                sx={{ color: '#C44569', fontWeight: 600, fontSize: '0.95rem' }}
              >
                /update-doc plan {'<feature-name>'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Create feature implementation plan
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography
                component="code"
                sx={{ color: '#6B5B95', fontWeight: 600, fontSize: '0.95rem' }}
              >
                /update-doc system
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Update architecture, DB, API docs
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography
                component="code"
                sx={{ color: '#9B8BC0', fontWeight: 600, fontSize: '0.95rem' }}
              >
                /update-doc sop {'<description>'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Create Standard Operating Procedure
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography
                component="code"
                sx={{ color: '#FF6B9D', fontWeight: 600, fontSize: '0.95rem' }}
              >
                /update-doc index
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Refresh documentation index
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Typography
                component="code"
                sx={{ color: '#C44569', fontWeight: 600, fontSize: '0.95rem' }}
              >
                /update-doc archive {'<plan>'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Move completed plan to archive
              </Typography>
            </Paper>
          </Stack>
        </Box>

        {/* Key Benefits */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            ✨ Key Benefits
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <SaveIcon sx={{ fontSize: 40, color: '#FF6B9D' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    60-80% Token Savings
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Massive reduction vs full codebase reads
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <SpeedIcon sx={{ fontSize: 40, color: '#C44569' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Faster Context Loading
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Read only what's needed for the task
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <FolderIcon sx={{ fontSize: 40, color: '#6B5B95' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Scalable
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Grows with project without bloating context
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ p: 2, backgroundColor: 'rgba(20, 20, 25, 0.4)' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(155, 139, 192, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 24 }}>🤖</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Sub-Agent Isolation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Research tasks in separate threads, return summaries only
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Box>

        {/* Best Practices */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            🏆 Best Practices
          </Typography>
          <Alert
            severity="info"
            sx={{
              backgroundColor: 'rgba(107, 91, 149, 0.1)',
              border: '1px solid rgba(107, 91, 149, 0.3)',
              color: 'text.primary',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2">
                ✅ <strong>Always check .agent/readme.md first</strong> before reading any source files
              </Typography>
              <Typography variant="body2">
                ✅ <strong>Use sub-agents</strong> for token-heavy research (returns summaries only)
              </Typography>
              <Typography variant="body2">
                ✅ <strong>Read files only when</strong> .agent/ docs are missing specific details
              </Typography>
              <Typography variant="body2">
                ✅ <strong>Use Grep/Glob</strong> for searching instead of reading multiple files
              </Typography>
              <Typography variant="body2">
                ✅ <strong>After major changes</strong>, run /update-doc system to keep docs fresh
              </Typography>
              <Typography variant="body2">
                ✅ <strong>Clear conversation thread</strong> when switching features (rely on .agent/ docs)
              </Typography>
            </Stack>
          </Alert>
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
              → <Link href="/docs/stack-templates" style={{ color: '#C44569', textDecoration: 'none' }}>Use Stack Templates</Link>
            </Typography>
            <Typography variant="body1">
              → <Link href="/docs/migration" style={{ color: '#6B5B95', textDecoration: 'none' }}>Migrate Existing Project</Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
