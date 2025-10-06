'use client';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AgentsSection from '@/components/AgentsSection';
import MCPSection from '@/components/MCPSection';
import TokenOptimizationSection from '@/components/TokenOptimizationSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AgentsSection />
      <MCPSection />
      <TokenOptimizationSection />
      <CTASection />
      <Footer />
    </>
  );
}
