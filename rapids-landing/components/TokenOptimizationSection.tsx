'use client';
import { Box, Container, Typography, Stack, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const MotionBox = motion(Box);

export default function TokenOptimizationSection() {
  return (
    <Box sx={{ py: 12, backgroundColor: '#0F0F14', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,107,157,0.05) 0%, rgba(107,91,149,0.05) 100%)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={6} alignItems="center" textAlign="center">
          {/* Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #FF6B9D33 0%, #6B5B9533 100%)',
              border: '2px solid #FF6B9D',
            }}
          >
            <TrendingDownIcon sx={{ fontSize: 48, color: '#FF6B9D' }} />
          </Box>

          {/* Headline */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            <span className="gradient-text">60-80% Token Reduction</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              lineHeight: 1.8,
            }}
          >
            The <strong style={{ color: '#FF6B9D' }}>.agent/</strong> documentation system replaces full codebase reads with structured docs. Read only what you need, when you need it.
          </Typography>

          {/* Comparison */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ width: '100%', mt: 4 }}
          >
            {/* Before */}
            <Paper
              sx={{
                flex: 1,
                p: 4,
                background: 'rgba(196, 69, 105, 0.1)',
                border: '1px solid rgba(196, 69, 105, 0.3)',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: '#C44569',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                WITHOUT RAPIDS
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: '#C44569',
                  fontWeight: 800,
                  my: 2,
                }}
              >
                50-100K
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                tokens per feature
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', display: 'block', mt: 2 }}
              >
                Full codebase reads for every task
              </Typography>
            </Paper>

            {/* After */}
            <Paper
              sx={{
                flex: 1,
                p: 4,
                background: 'rgba(107, 91, 149, 0.1)',
                border: '1px solid rgba(107, 91, 149, 0.3)',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: '#6B5B95',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                WITH RAPIDS
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: '#6B5B95',
                  fontWeight: 800,
                  my: 2,
                }}
              >
                3-10K
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                tokens per feature
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', display: 'block', mt: 2 }}
              >
                Structured .agent/ docs only
              </Typography>
            </Paper>
          </Stack>

          {/* Benefit callout */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'rgba(255, 107, 157, 0.08)',
              border: '1px solid rgba(255, 107, 157, 0.2)',
              width: '100%',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#FF6B9D',
                mb: 1,
              }}
            >
              💰 Savings: 80-95%
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Faster responses, lower costs, better performance. Scale without context bloat.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
