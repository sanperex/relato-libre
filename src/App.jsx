import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './shared/styles/theme'
import { CartProvider } from './features/articles/components/CartContext'
import Routes from './Routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Routes />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App