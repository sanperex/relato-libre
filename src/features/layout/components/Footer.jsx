import { Box, Container, Grid, Typography, Link, Divider, IconButton } from '@mui/material'
import { MenuBook, Facebook, Twitter, Instagram } from '@mui/icons-material'

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', mt: 8, pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <MenuBook sx={{ color: 'secondary.main', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Relato|Libre<span style={{ color: '#e8b86d' }}> CO</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Tu librería online de confianza. Más de 10,000 títulos disponibles con envío a todo Colombia.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <IconButton key={i} sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'secondary.main' } }}>
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: 'secondary.main', mb: 2, fontWeight: 700, letterSpacing: '0.1em' }}>
              TIENDA
            </Typography>
            {['Catálogo', 'Novedades', 'Bestsellers', 'Ofertas'].map(item => (
              <Typography key={item} variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1, cursor: 'pointer', '&:hover': { color: 'secondary.main' } }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: 'secondary.main', mb: 2, fontWeight: 700, letterSpacing: '0.1em' }}>
              MI CUENTA
            </Typography>
            {['Mi Perfil', 'Mis Pedidos', 'Mis Favoritos', 'Dirección'].map(item => (
              <Typography key={item} variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1, cursor: 'pointer', '&:hover': { color: 'secondary.main' } }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ color: 'secondary.main', mb: 2, fontWeight: 700, letterSpacing: '0.1em' }}>
              CONTACTO
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>📧 relatolibre@gmail.com</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>📞 55 1234 5678</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>🕐 Lun–Vie 9:00–18:00</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
          © {new Date().getFullYear()} Relato|Libre Co. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}