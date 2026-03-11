import { useParams, useNavigate } from 'react-router-dom'
import {
  Container, Box, Grid, Typography, Button, Chip,
  Rating, Divider, IconButton, Stack, Alert, Breadcrumbs, Link,
} from '@mui/material'
import {
  ShoppingCart, FavoriteBorder, Favorite, ArrowBack,
  LocalShipping, Verified, Star,
} from '@mui/icons-material'
import { BOOKS } from '../../articles/components/Books'
import { useCart } from '../../articles/components/useCart'
import BookCard from '../../articles/components/BookCard'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleFavorite, isFavorite } = useCart()

  const book = BOOKS.find(b => b.id === Number(id))
  const related = BOOKS.filter(b => b.category === book?.category && b.id !== book?.id).slice(0, 4)

  if (!book) return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h5">Libro no encontrado</Typography>
      <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Volver al inicio</Button>
    </Container>
  )

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Inicio</Link>
        <Link underline="hover" color="inherit" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          {book.category}
        </Link>
        <Typography color="text.primary">{book.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={5}>
        {/* Cover */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'relative' }}>
            {discount > 0 && (
              <Chip label={`-${discount}% DESCUENTO`} color="secondary"
                sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1, fontWeight: 700 }} />
            )}
            <Box
              component="img"
              src={book.cover}
              alt={book.title}
              onError={(e) => { e.target.src = `https://via.placeholder.com/400x560/1a1a2e/e8b86d?text=${encodeURIComponent(book.title)}` }}
              sx={{ width: '100%', maxHeight: 480, objectFit: 'contain', borderRadius: 2, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
            />
          </Box>
        </Grid>

        {/* Info */}
        <Grid item xs={12} md={8}>
          <Chip label={book.category} variant="outlined" size="small" sx={{ mb: 2 }} />
          <Typography variant="h3" sx={{ mb: 1 }}>{book.title}</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2, fontFamily: '"Lato", sans-serif' }}>
            por <strong>{book.author}</strong>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Rating value={book.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {book.rating} ({book.reviews.toLocaleString()} reseñas)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 3 }}>
            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
              ${book.price}
            </Typography>
            {book.originalPrice > book.price && (
              <Typography variant="h5" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                ${book.originalPrice}
              </Typography>
            )}
            {discount > 0 && (
              <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 700 }}>
                Ahorras ${(book.originalPrice - book.price).toFixed(2)}
              </Typography>
            )}
          </Box>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
            {book.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
            {book.tags.map(tag => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: 'primary.main', color: 'white' }} />
            ))}
          </Stack>

          <Alert severity={book.stock > 10 ? 'success' : book.stock > 0 ? 'warning' : 'error'}
            icon={<Verified />} sx={{ mb: 3 }}>
            {book.stock > 10 ? `En stock (${book.stock} disponibles)` :
              book.stock > 0 ? `¡Últimas ${book.stock} unidades!` : 'Sin stock'}
          </Alert>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <Button
              variant="contained" color="primary" size="large"
              startIcon={<ShoppingCart />} onClick={() => addToCart(book)}
              disabled={book.stock === 0} sx={{ flex: 1 }}
            >
              Agregar al Carrito
            </Button>
            <Button
              variant="outlined" size="large"
              startIcon={isFavorite(book.id) ? <Favorite sx={{ color: '#e53935' }} /> : <FavoriteBorder />}
              onClick={() => toggleFavorite(book)}
            >
              {isFavorite(book.id) ? 'En Favoritos' : 'Favoritos'}
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }} />
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <LocalShipping color="primary" fontSize="small" />
              <Typography variant="body2">Envío gratis en pedidos mayores a $300 MXN</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Verified color="success" fontSize="small" />
              <Typography variant="body2">Producto 100% original y garantizado</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* Related books */}
      {related.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>Libros Relacionados</Typography>
          <Grid container spacing={3}>
            {related.map(b => (
              <Grid item xs={6} sm={3} key={b.id}>
                <BookCard book={b} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  )
}