'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#FF6B9D',
          light: '#FFB6D6',
          dark: '#C44569',
        },
        secondary: {
          main: '#6B5B95',
          light: '#9B8BC0',
          dark: '#4A3F6B',
        },
        background: {
          default: '#0A0A0F',
          paper: '#141419',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B4B4B8',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 32px',
          borderRadius: '12px',
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(255, 107, 157, 0.39)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(255, 107, 157, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});
