import { Container, Typography, Box, Grid, Button } from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../articles/components/useCart'
import BookCard from '../../articles/components/BookCard'

export default function Myfavorites() {
  const { favorites } = useCart()
  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Mis Favoritos</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {favorites.length} libro{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <FavoriteBorder sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>Aún no tienes favoritos</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Guarda los libros que más te gusten para encontrarlos fácilmente
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Explorar Catálogo
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(book => (
            <Grid item xs={6} sm={4} md={3} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}