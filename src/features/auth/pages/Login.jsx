import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Divider, Link, Stack, InputAdornment, IconButton, Alert } from '@mui/material'
import { MenuBook, Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === form.email && u.password === form.password)

    if (!user) {
      setError('Correo o contraseña incorrectos')
      return
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    navigate('/')
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      <Box sx={{
        display: { xs: 'none', md: 'flex' }, flex: 1,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 6,
      }}>
        <MenuBook sx={{ fontSize: 80, color: '#e8b86d', mb: 3 }} />
        <Typography variant="h3" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
          Tu biblioteca<br /><span style={{ color: '#e8b86d' }}>en un clic</span>
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 300 }}>
          Accede a miles de títulos y gestiona tus pedidos con facilidad.
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <Container maxWidth="xs">
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <MenuBook sx={{ color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>LIBROS<span style={{ color: '#e8b86d' }}>MX</span></Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Bienvenido de vuelta</Typography>
            <Typography color="text.secondary">Ingresa a tu cuenta para continuar</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Stack spacing={2.5}>
            <TextField
              label="Correo electrónico" name="email" type="email"
              value={form.email} onChange={handleChange} fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><Email fontSize="small" /></InputAdornment> }}
            />
            <TextField
              label="Contraseña" name="password"
              type={showPass ? 'text' : 'password'}
              value={form.password} onChange={handleChange} fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock fontSize="small" /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(p => !p)} edge="end">
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ textAlign: 'right' }}>
              <Link variant="body2" sx={{ cursor: 'pointer' }}>Olvidaste tu contrasena?</Link>
            </Box>
            <Button variant="contained" color="primary" size="large" fullWidth onClick={handleSubmit}>
              Iniciar Sesion
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}><Typography variant="body2" color="text.secondary">o</Typography></Divider>

          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            No tienes cuenta?{' '}
            <Link sx={{ cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/register')}>
              Registrate gratis
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}