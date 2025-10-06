'use client';
import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import BuildIcon from '@mui/icons-material/Build';
import BugReportIcon from '@mui/icons-material/BugReport';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Science';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import ShieldIcon from '@mui/icons-material/Shield';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CampaignIcon from '@mui/icons-material/Campaign';
import PaletteIcon from '@mui/icons-material/Palette';

const MotionBox = motion(Box);

const agents = [
  { name: 'Feature Builder', icon: BuildIcon, color: '#FF6B9D', description: 'Complete features across mobile/web/backend' },
  { name: 'Bug Hunter', icon: BugReportIcon, color: '#C44569', description: 'Find and fix bugs autonomously' },
  { name: 'Code Searcher', icon: SearchIcon, color: '#6B5B95', description: 'Deep code analysis (auto-activated)' },
  { name: 'Test Generator', icon: ScienceIcon, color: '#9B8BC0', description: 'Comprehensive test generation' },
  { name: 'Refactor Master', icon: AutoFixHighIcon, color: '#FF6B9D', description: 'Intelligent refactoring' },
  { name: 'Performance Analyzer', icon: SpeedIcon, color: '#C44569', description: 'Full-stack optimization' },
  { name: 'DB Architect', icon: StorageIcon, color: '#6B5B95', description: 'Database schema management' },
  { name: 'Security Scanner', icon: ShieldIcon, color: '#9B8BC0', description: 'Security audits' },
  { name: 'Deployment Manager', icon: RocketLaunchIcon, color: '#FF6B9D', description: 'Automated deployments' },
  { name: 'Marketing Strategist', icon: CampaignIcon, color: '#C44569', description: 'Revenue, GTM, user acquisition' },
  { name: 'Design Master', icon: PaletteIcon, color: '#6B5B95', description: 'Material Design 3 expert' },
];

export default function AgentsSection() {
  return (
    <Box sx={{ py: 12, backgroundColor: '#0F0F14', position: 'relative', overflow: 'hidden' }}>
      {/* Background gradient */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,69,105,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={6}>
          {/* Section header */}
          <Box textAlign="center">
            <Chip
              label="THE POWER OF AI"
              sx={{
                mb: 2,
                backgroundColor: 'rgba(196, 69, 105, 0.15)',
                border: '1px solid rgba(196, 69, 105, 0.3)',
                color: '#C44569',
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3.5rem' },
              }}
            >
              <span className="gradient-text">11 Autonomous Agents</span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              AI agents that work in parallel (up to 3 simultaneously) to accelerate every aspect of development
            </Typography>
          </Box>

          {/* Agents grid */}
          <Stack spacing={2}>
            {agents.map((agent, index) => (
              <MotionBox
                key={agent.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: 'rgba(20, 20, 25, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: agent.color,
                    backgroundColor: `${agent.color}11`,
                    transform: 'translateX(8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${agent.color}33 0%, ${agent.color}11 100%)`,
                    border: `1px solid ${agent.color}44`,
                    flexShrink: 0,
                  }}
                >
                  <agent.icon sx={{ fontSize: 24, color: agent.color }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {agent.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {agent.description}
                  </Typography>
                </Box>
                {agent.name === 'Marketing Strategist' && (
                  <Chip
                    label="MOST CRITICAL"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 107, 157, 0.2)',
                      color: '#FF6B9D',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                    }}
                  />
                )}
              </MotionBox>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
