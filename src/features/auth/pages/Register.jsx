import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Link, Stack, InputAdornment, IconButton, Alert } from '@mui/material'
import { MenuBook, Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Por favor completa todos los campos')
      return
    }
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.email === form.email)
    if (exists) {
      setError('Ya existe una cuenta con ese correo')
      return
    }

    const newUser = { name: form.name, email: form.email, password: form.password, phone: '', address: '' }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
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
          Unete a<br /><span style={{ color: '#e8b86d' }}>la comunidad</span>
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 300 }}>
          Crea tu cuenta y empieza a explorar miles de libros increibles.
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <Container maxWidth="xs">
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <MenuBook sx={{ color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>LIBROS<span style={{ color: '#e8b86d' }}>MX</span></Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Crea tu cuenta</Typography>
            <Typography color="text.secondary">Es gratis y solo toma un minuto</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Stack spacing={2.5}>
            <TextField label="Nombre completo" name="name" value={form.name} onChange={handleChange} fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><Person fontSize="small" /></InputAdornment> }} />
            <TextField label="Correo electronico" name="email" type="email" value={form.email} onChange={handleChange} fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><Email fontSize="small" /></InputAdornment> }} />
            <TextField
              label="Contrasena" name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} fullWidth
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
            <TextField label="Confirmar contrasena" name="confirm" type="password" value={form.confirm} onChange={handleChange} fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><Lock fontSize="small" /></InputAdornment> }} />
            <Button variant="contained" color="primary" size="large" fullWidth onClick={handleSubmit}>
              Crear Cuenta
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
            Ya tienes cuenta?{' '}
            <Link sx={{ cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/login')}>
              Inicia sesion
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}