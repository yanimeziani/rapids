'use client';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const MotionBox = motion(Box);

export default function CTASection() {
  return (
    <Box sx={{ py: 16, backgroundColor: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      {/* Animated gradient background */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '4rem' },
              maxWidth: '700px',
            }}
          >
            Ready to <span className="gradient-text">Ship Fast</span>?
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}
          >
            Install RAPIDS in seconds. Start building with AI agents immediately.
          </Typography>

          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'rgba(20, 20, 25, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mb: 2, fontWeight: 600 }}
            >
              Install globally:
            </Typography>
            <Typography
              variant="h6"
              component="code"
              sx={{
                fontFamily: 'monospace',
                color: '#FF6B9D',
                fontWeight: 600,
              }}
            >
              npm install -g rapids-ai
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunchIcon />}
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
              Get Started Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<MenuBookIcon />}
              href="/docs"
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
              Read Docs
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mt: 4 }}
          >
            Free and open source • MIT License • Built for solo developers
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
