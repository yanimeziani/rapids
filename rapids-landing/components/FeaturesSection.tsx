'use client';
import { Box, Container, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const MotionCard = motion(Card);

const features = [
  {
    icon: FlashOnIcon,
    title: 'One-Command Install',
    description: 'Install globally in seconds. Works across all your projects instantly.',
    color: '#FF6B9D',
  },
  {
    icon: AutoFixHighIcon,
    title: '11 Autonomous Agents',
    description: 'Feature builder, bug hunter, refactor master, security scanner, and more.',
    color: '#C44569',
  },
  {
    icon: CloudIcon,
    title: '7 MCP Servers',
    description: 'Context7, Filesystem, PostgreSQL, GitHub, Puppeteer, Neon, Dokploy.',
    color: '#6B5B95',
  },
  {
    icon: SpeedIcon,
    title: '60-80% Token Savings',
    description: '.agent/ documentation system replaces full codebase reads.',
    color: '#9B8BC0',
  },
  {
    icon: SecurityIcon,
    title: 'Zero-Risk Migration',
    description: 'rapids-migrate + rapids-clean for instant RAPIDS setup in existing projects.',
    color: '#FF6B9D',
  },
  {
    icon: TrendingUpIcon,
    title: 'Revenue-First',
    description: 'Marketing strategist agent for GTM, pricing, and user acquisition.',
    color: '#C44569',
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 12, backgroundColor: '#0A0A0F' }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Section header */}
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3.5rem' },
              }}
            >
              Why <span className="gradient-text">RAPIDS</span>?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              Everything you need to build, ship, and monetize products at lightning speed
            </Typography>
          </Box>

          {/* Features grid */}
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="glass"
                  sx={{
                    height: '100%',
                    background: 'rgba(20, 20, 25, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: feature.color,
                      boxShadow: `0 8px 32px rgba(${feature.color === '#FF6B9D' ? '255, 107, 157' : feature.color === '#C44569' ? '196, 69, 105' : feature.color === '#6B5B95' ? '107, 91, 149' : '155, 139, 192'}, 0.3)`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${feature.color}33 0%, ${feature.color}11 100%)`,
                          border: `1px solid ${feature.color}44`,
                        }}
                      >
                        <feature.icon sx={{ fontSize: 32, color: feature.color }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                        }}
                      >
                        {feature.description}
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
