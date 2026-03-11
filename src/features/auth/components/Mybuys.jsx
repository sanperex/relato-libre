import {
  Container, Typography, Box, Card, CardContent,
  Chip, Stack, Divider, Button, Avatar,
} from '@mui/material'
import { ShoppingBag, LocalShipping, CheckCircle, Schedule } from '@mui/icons-material'

const MOCK_ORDERS = [
  {
    id: '#ORD-2024-001',
    date: '15 Nov 2024',
    status: 'entregado',
    total: 54.97,
    items: [
      { title: 'Cien Años de Soledad', author: 'García Márquez', price: 18.99, qty: 1 },
      { title: 'Dune', author: 'Frank Herbert', price: 22.0, qty: 1 },
    ],
  },
  {
    id: '#ORD-2024-002',
    date: '2 Dic 2024',
    status: 'en camino',
    total: 29.49,
    items: [
      { title: '1984', author: 'George Orwell', price: 12.99, qty: 1 },
      { title: 'El Principito', author: 'Saint-Exupéry', price: 9.99, qty: 1 },
    ],
  },
  {
    id: '#ORD-2024-003',
    date: '28 Nov 2024',
    status: 'procesando',
    total: 19.99,
    items: [
      { title: 'Sapiens', author: 'Yuval Harari', price: 19.99, qty: 1 },
    ],
  },
]

const STATUS_CONFIG = {
  entregado: { color: 'success', icon: <CheckCircle fontSize="small" />, label: 'Entregado' },
  'en camino': { color: 'info', icon: <LocalShipping fontSize="small" />, label: 'En Camino' },
  procesando: { color: 'warning', icon: <Schedule fontSize="small" />, label: 'Procesando' },
}

export default function Mybuys() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Mis Compras</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>{MOCK_ORDERS.length} pedidos realizados</Typography>

      <Stack spacing={3}>
        {MOCK_ORDERS.map(order => {
          const { color, icon, label } = STATUS_CONFIG[order.status]
          return (
            <Card key={order.id}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{order.id}</Typography>
                    <Typography variant="body2" color="text.secondary">{order.date}</Typography>
                  </Box>
                  <Chip icon={icon} label={label} color={color} variant="outlined" />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  {order.items.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '1rem' }}>📖</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{item.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.author}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" fontWeight={600}>${item.price} × {item.qty}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight={700}>Total: ${order.total.toFixed(2)}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined">Ver Detalle</Button>
                    {order.status === 'entregado' && (
                      <Button size="small" variant="contained" color="primary">Reseñar</Button>
                    )}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          )
        })}
      </Stack>
    </Container>
  )
}