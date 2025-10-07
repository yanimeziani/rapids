'use client';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0A0F 0%, #1A0E2E 100%)',
      }}
    >
      {/* Animated background gradient orbs */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,157,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <MotionBox
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,91,149,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip
              icon={<RocketLaunchIcon />}
              label="RAPIDS v4.0.0-beta.1 - Complete TypeScript Rewrite"
              sx={{
                backgroundColor: 'rgba(255, 107, 157, 0.15)',
                border: '1px solid rgba(255, 107, 157, 0.3)',
                color: '#FF6B9D',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '8px 16px',
                height: 'auto',
                '& .MuiChip-icon': { color: '#FF6B9D' },
              }}
            />
          </MotionBox>

          {/* Main headline */}
          <MotionTypography
            variant="h1"
            className="gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{
              fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5.5rem' },
              fontWeight: 900,
              maxWidth: '900px',
            }}
          >
            Ship Fast,
            <br />
            Make Money 🌊
          </MotionTypography>

          {/* Subheadline */}
          <MotionTypography
            variant="h5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              lineHeight: 1.6,
            }}
          >
            Portable Claude Code framework with <strong style={{ color: '#FF6B9D' }}>11 AI agents</strong>, <strong style={{ color: '#FF6B9D' }}>7 MCPs</strong>, and revenue-first workflows.
            <strong>Minimalist. Polyvalent. Efficient.</strong>
          </MotionTypography>

          {/* Stats */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              sx={{
                justifyContent: 'center',
                '& > div': {
                  textAlign: 'center',
                },
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ color: '#FF6B9D', fontWeight: 800 }}>
                  60-80%
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Token Reduction
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ color: '#FF6B9D', fontWeight: 800 }}>
                  11
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  AI Agents
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ color: '#FF6B9D', fontWeight: 800 }}>
                  7
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  MCP Servers
                </Typography>
              </Box>
            </Stack>
          </MotionBox>

          {/* CTA Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<CodeIcon />}
                href="/docs/getting-started"
                component={Link}
                className="glow"
                sx={{
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)',
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 4,
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<MoveToInboxIcon />}
                href="/docs/migration"
                component={Link}
                sx={{
                  borderColor: 'rgba(255, 107, 157, 0.5)',
                  color: '#FF6B9D',
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 4,
                  '&:hover': {
                    borderColor: '#FF6B9D',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                  },
                }}
              >
                Migrate Existing Project
              </Button>
            </Stack>
          </MotionBox>

          {/* Installation command */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              maxWidth: '600px',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}
            >
              Install globally in seconds:
            </Typography>
            <Typography
              variant="body1"
              component="code"
              sx={{
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              npm install -g rapids-ai@beta
            </Typography>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
