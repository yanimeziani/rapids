'use client';
import { Box, Container, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Stack } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';

const navItems = [
  { title: 'Getting Started', href: '/docs/getting-started' },
  { title: 'Migration Guide', href: '/docs/migration' },
  { title: 'AI Agents', href: '/docs/agents' },
  { title: 'MCP Servers', href: '/docs/mcp' },
  { title: 'Token Optimization', href: '/docs/token-optimization' },
  { title: 'Stack Templates', href: '/docs/stack-templates' },
  { title: 'Deployment', href: '/docs/deployment' },
  { title: 'Changelog', href: '/docs/changelog' },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, className: 'gradient-text' }}>
          Documentation
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 157, 0.1)',
                  color: '#FF6B9D',
                },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0A0A0F' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              textDecoration: 'none',
              color: 'inherit',
              className: 'gradient-text',
            }}
          >
            🌊 RAPIDS
          </Typography>
          <IconButton color="inherit" component={Link} href="/">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar - Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#0F0F14',
            border: 'none',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            mt: 8,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Sidebar - Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#0F0F14',
            border: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 280px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
}
