'use client';
import { Box, Container, Typography, Stack, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FolderIcon from '@mui/icons-material/Folder';
import StorageIcon from '@mui/icons-material/Storage';
import GitHubIcon from '@mui/icons-material/GitHub';
import PublicIcon from '@mui/icons-material/Public';
import CloudIcon from '@mui/icons-material/Cloud';

const MotionCard = motion(Card);

const mcpServers = [
  {
    icon: MenuBookIcon,
    name: 'Context7',
    description: 'Up-to-date documentation (auto-activated)',
    color: '#FF6B9D',
  },
  {
    icon: FolderIcon,
    name: 'Filesystem',
    description: 'Local file access across all projects',
    color: '#C44569',
  },
  {
    icon: StorageIcon,
    name: 'PostgreSQL',
    description: 'Direct database querying',
    color: '#6B5B95',
  },
  {
    icon: GitHubIcon,
    name: 'GitHub',
    description: 'Repository management, issues, PRs',
    color: '#9B8BC0',
  },
  {
    icon: PublicIcon,
    name: 'Puppeteer',
    description: 'Web automation for market research',
    color: '#FF6B9D',
  },
  {
    icon: CloudIcon,
    name: 'Neon',
    description: 'Serverless PostgreSQL with instant branching',
    color: '#6B5B95',
  },
  {
    icon: CloudIcon,
    name: 'Dokploy',
    description: 'Deployment platform (56 tools)',
    color: '#C44569',
  },
];

export default function MCPSection() {
  return (
    <Box sx={{ py: 12, backgroundColor: '#0A0A0F' }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Section header */}
          <Box textAlign="center">
            <Typography
              variant="overline"
              sx={{
                color: '#6B5B95',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: 2,
              }}
            >
              MODEL CONTEXT PROTOCOL
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3.5rem' },
              }}
            >
              <span className="gradient-text">7 MCP Servers</span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              The "USB-C for AI" - Pre-configured servers for seamless integration
            </Typography>
          </Box>

          {/* MCP grid */}
          <Grid container spacing={3}>
            {mcpServers.map((server, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MotionCard
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  sx={{
                    height: '100%',
                    background: 'rgba(20, 20, 25, 0.4)',
                    border: `1px solid ${server.color}33`,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: server.color,
                      boxShadow: `0 8px 32px ${server.color}44`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${server.color}44 0%, ${server.color}22 100%)`,
                          border: `2px solid ${server.color}`,
                        }}
                      >
                        <server.icon sx={{ fontSize: 36, color: server.color }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {server.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        {server.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
