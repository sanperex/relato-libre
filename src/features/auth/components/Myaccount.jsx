import { useState } from 'react'
import {
  Container, Box, Typography, Grid, Card, CardContent,
  Avatar, TextField, Button, Divider, Stack, Chip, Alert,
} from '@mui/material'
import { Edit, Save, Person, Email, Phone, Home } from '@mui/icons-material'

export default function Myaccount() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const [editing, setEditing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
  })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = () => {
    const updatedUser = { ...currentUser, ...form }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u)
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    setEditing(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Mi Cuenta</Typography>

      {success && <Alert severity="success" sx={{ mb: 3 }}>Datos actualizados correctamente</Alert>}

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 3 }}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2.5rem' }}>
              {form.name?.charAt(0) || '?'}
            </Avatar>
            <Typography variant="h6">{form.name || 'Sin nombre'}</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>{form.email || 'Sin correo'}</Typography>
            <Chip label="Cliente activo" color="success" size="small" />
            <Divider sx={{ my: 3 }} />
            <Stack spacing={1}>
              {[
                { label: 'Pedidos', value: '12' },
                { label: 'Favoritos', value: '8' },
                { label: 'Reseñas', value: '5' },
              ].map(({ label, value }) => (
                <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">{label}</Typography>
                  <Typography fontWeight={700}>{value}</Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Informacion Personal</Typography>
                <Button
                  startIcon={editing ? <Save /> : <Edit />}
                  variant={editing ? 'contained' : 'outlined'}
                  onClick={editing ? handleSave : () => setEditing(true)}
                  color="primary"
                >
                  {editing ? 'Guardar' : 'Editar'}
                </Button>
              </Box>
              <Stack spacing={2.5}>
                {[
                  { icon: <Person />, label: 'Nombre completo', name: 'name' },
                  { icon: <Email />, label: 'Correo electronico', name: 'email', type: 'email' },
                  { icon: <Phone />, label: 'Telefono', name: 'phone' },
                  { icon: <Home />, label: 'Direccion', name: 'address' },
                ].map(({ icon, label, name, type }) => (
                  <TextField
                    key={name} label={label} name={name} type={type || 'text'}
                    value={form[name]} onChange={handleChange}
                    disabled={!editing} fullWidth
                    InputProps={{ startAdornment: <Box sx={{ mr: 1, color: 'text.secondary', display: 'flex' }}>{icon}</Box> }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}