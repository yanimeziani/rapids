'use client';
import { Box, Container, Typography, Stack, Link as MuiLink, IconButton } from '@mui/material';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: '#0A0A0F',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          {/* Brand */}
          <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, className: 'gradient-text' }}>
              🌊 RAPIDS
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '300px', textAlign: { xs: 'center', md: 'left' } }}>
              Portable Claude Code framework. Ship fast, make money.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://github.com/yanimeziani/rapids"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'text.secondary', '&:hover': { color: '#FF6B9D' } }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://x.com/yanimeziani"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'text.secondary', '&:hover': { color: '#FF6B9D' } }}
              >
                <XIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com/in/yanimeziani"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'text.secondary', '&:hover': { color: '#FF6B9D' } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FF6B9D' }}>
              Quick Links
            </Typography>
            <MuiLink href="/docs/getting-started" component={Link} sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              Getting Started
            </MuiLink>
            <MuiLink href="/docs/migration" component={Link} sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              Migration Guide
            </MuiLink>
            <MuiLink href="/docs/agents" component={Link} sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              AI Agents
            </MuiLink>
            <MuiLink href="/docs/mcp" component={Link} sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              MCP Servers
            </MuiLink>
          </Stack>

          {/* Resources */}
          <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FF6B9D' }}>
              Resources
            </Typography>
            <MuiLink href="https://github.com/yanimeziani/rapids" target="_blank" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              GitHub Repository
            </MuiLink>
            <MuiLink href="https://www.npmjs.com/package/rapids-ai" target="_blank" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              npm Package
            </MuiLink>
            <MuiLink href="https://github.com/yanimeziani/rapids/issues" target="_blank" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              Report Issues
            </MuiLink>
            <MuiLink href="/docs/changelog" component={Link} sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#FF6B9D' } }}>
              Changelog
            </MuiLink>
          </Stack>
        </Stack>

        {/* Copyright */}
        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © 2025 RAPIDS. Built by{' '}
            <MuiLink href="https://github.com/yanimeziani" target="_blank" sx={{ color: '#FF6B9D', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Yani Meziani
            </MuiLink>
            . MIT License.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
