import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Box, IconButton, Button, Chip, Rating, Tooltip,
} from '@mui/material'
import { FavoriteBorder, Favorite, ShoppingCart, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCart } from './useCart'

export default function BookCard({ book }) {
  const navigate = useNavigate()
  const { addToCart, toggleFavorite, isFavorite } = useCart()
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {discount > 0 && (
        <Chip label={`-${discount}%`} color="secondary" size="small"
          sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1, fontWeight: 700 }} />
      )}

      <IconButton
        onClick={() => toggleFavorite(book)}
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'white' } }}
      >
        {isFavorite(book.id)
          ? <Favorite sx={{ color: '#e53935', fontSize: 20 }} />
          : <FavoriteBorder sx={{ fontSize: 20 }} />}
      </IconButton>

      <CardMedia
        component="img"
        image={book.cover}
        alt={book.title}
        sx={{ height: 280, objectFit: 'contain', cursor: 'pointer', bgcolor: '#f5f0e8' }}
        onClick={() => navigate(`/book/${book.id}`)}
        onError={(e) => { e.target.src = `https://via.placeholder.com/200x280/1a1a2e/e8b86d?text=${encodeURIComponent(book.title)}` }}
      />

      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Chip label={book.category} size="small" variant="outlined" sx={{ mb: 1, fontSize: '0.7rem' }} />
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, mb: 0.5, lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{book.author}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={book.rating} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">({book.reviews})</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>${book.price}</Typography>
          {book.originalPrice > book.price && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
              ${book.originalPrice}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
        <Button
          variant="contained" color="primary" size="small" fullWidth
          startIcon={<ShoppingCart />}
          onClick={() => addToCart(book)}
          sx={{ fontSize: '0.75rem' }}
        >
          Agregar
        </Button>
        <Tooltip title="Ver detalle">
          <IconButton size="small" onClick={() => navigate(`/book/${book.id}`)} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}