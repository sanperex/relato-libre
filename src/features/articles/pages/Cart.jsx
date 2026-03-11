import {
  Container, Typography, Box, Grid, Card, CardContent,
  IconButton, Button, Divider, Stack, TextField, Chip, Alert,
} from '@mui/material'
import { Add, Remove, Delete, ShoppingBag, ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../articles/components/useCart'

export default function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart()

  const shipping = cartTotal >= 300 ? 0 : 5
  const total = cartTotal + shipping

  if (cartItems.length === 0) return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
      <ShoppingBag sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>Tu carrito está vacío</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>Descubre libros increíbles en nuestro catálogo</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Explorar Catálogo
      </Button>
    </Container>
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Seguir Comprando
      </Button>
      <Typography variant="h4" sx={{ mb: 4 }}>Mi Carrito ({cartItems.length} artículo{cartItems.length > 1 ? 's' : ''})</Typography>

      {cartTotal < 300 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Agrega ${(300 - cartTotal).toFixed(2)} más para obtener <strong>envío gratis</strong>
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Items */}
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {cartItems.map(item => (
              <Card key={item.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.cover}
                      alt={item.title}
                      onError={(e) => { e.target.src = `https://via.placeholder.com/80x110/1a1a2e/e8b86d?text=📖` }}
                      sx={{ width: 80, height: 110, objectFit: 'cover', borderRadius: 1, cursor: 'pointer', flexShrink: 0 }}
                      onClick={() => navigate(`/book/${item.id}`)}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontSize: '1rem', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                        onClick={() => navigate(`/book/${item.id}`)}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">{item.author}</Typography>
                      <Chip label={item.category} size="small" variant="outlined" sx={{ mt: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                          <IconButton size="small" onClick={() => updateQty(item.id, item.qty - 1)}>
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography sx={{ px: 2 }}>{item.qty}</Typography>
                          <IconButton size="small" onClick={() => updateQty(item.id, item.qty + 1)}>
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                            ${(item.price * item.qty).toFixed(2)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">${item.price} c/u</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton color="error" onClick={() => removeFromCart(item.id)} sx={{ alignSelf: 'flex-start' }}>
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 80 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Resumen del Pedido</Typography>

              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>${cartTotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Envío</Typography>
                  <Typography color={shipping === 0 ? 'success.main' : 'inherit'}>
                    {shipping === 0 ? '¡Gratis!' : `$${shipping}`}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>${total.toFixed(2)}</Typography>
              </Box>

              <TextField label="Código de descuento" size="small" fullWidth sx={{ mb: 2 }} />

              <Button variant="contained" color="primary" size="large" fullWidth sx={{ mb: 2 }}>
                Proceder al Pago
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                🔒 Pago 100% seguro y cifrado
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}