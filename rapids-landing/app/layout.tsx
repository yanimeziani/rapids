import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'RAPIDS - Ship Fast, Make Money',
  description: 'Portable Claude Code framework with 11 AI agents, 6 MCPs, and revenue-first workflows. Token-optimized development for solo builders.',
  keywords: ['rapids', 'claude code', 'ai agents', 'mcp', 'nextjs', 'fastapi', 'flutter'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
