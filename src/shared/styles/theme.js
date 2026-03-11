import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a1a2e',
      light: '#16213e',
      dark: '#0f0f1a',
    },
    secondary: {
      main: '#e8b86d',
      light: '#f0cc8f',
      dark: '#c9973a',
    },
    background: {
      default: '#faf8f3',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#5c5c7a',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    body1: { fontFamily: '"Lato", "Helvetica", sans-serif' },
    body2: { fontFamily: '"Lato", "Helvetica", sans-serif' },
    button: { fontFamily: '"Lato", "Helvetica", sans-serif', fontWeight: 700, letterSpacing: '0.08em' },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          padding: '10px 28px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 20px rgba(26,26,46,0.3)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"Lato", sans-serif', fontWeight: 700 },
      },
    },
  },
})