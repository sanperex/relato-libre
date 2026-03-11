import { useState, useMemo } from 'react'
import {
  Container, Box, Typography, Grid, Button,
  Chip, Stack, TextField, InputAdornment, Pagination,
} from '@mui/material'
import { Search, ArrowForward, GitHub } from '@mui/icons-material'
import { useSearchParams } from 'react-router-dom'
import BookCard from '../../articles/components/BookCard'
import { BOOKS, CATEGORIES } from '../../articles/components/Books'

const ITEMS_PER_PAGE = 6

export default function Home() {
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [page, setPage] = useState(1)

  const featured = BOOKS.filter(b => b.featured)

  const filtered = useMemo(() => {
    return BOOKS.filter(book => {
      const matchCat = category === 'Todos' || book.category === category
      const matchSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [category, search])

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
        py: { xs: 6, md: 10 }, px: 2, textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(232,184,109,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(232,184,109,0.1) 0%, transparent 40%)',
        }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip label="Mas de 10,000 titulos disponibles" sx={{ bgcolor: 'secondary.main', color: 'primary.main', fontWeight: 700, mb: 3 }} />
          <Typography variant="h2" sx={{ color: 'white', mb: 2, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            Tu proxima gran<br />
            <span style={{ color: '#e8b86d' }}>historia te espera</span>
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, maxWidth: 500, mx: 'auto', fontSize: '1.1rem' }}>
            Descubre libros que cambiaran tu perspectiva del mundo. Envio gratuito a todo Colombia.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" color="secondary" size="large" endIcon={<ArrowForward />}
              sx={{ color: 'primary.main', fontWeight: 700 }}>
              Explorar Catalogo
            </Button>
            <Button variant="outlined" size="large" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
              Ver Ofertas
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Featured banner */}
      <Box sx={{ bgcolor: 'secondary.main', py: 1.5, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '0.1em' }}>
          ENVIO GRATIS en pedidos mayores a $50.000 pesos COl | Entrega en 2-5 dias habiles
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>

        {/* Featured */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Destacados</Typography>
            <Button endIcon={<ArrowForward />} color="primary">Ver todos</Button>
          </Box>
          <Grid container spacing={3}>
            {featured.slice(0, 4).map(book => (
              <Grid item xs={6} sm={4} md={3} key={book.id}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* All books with filters */}
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>Catalogo Completo</Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Buscar libro o autor..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              size="small"
              sx={{ minWidth: 260 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
              }}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {CATEGORIES.map(cat => (
                <Chip
                  key={cat} label={cat}
                  onClick={() => { setCategory(cat); setPage(1) }}
                  color={category === cat ? 'primary' : 'default'}
                  variant={category === cat ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {filtered.length} libro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </Typography>

          <Grid container spacing={3}>
            {paginated.map(book => (
              <Grid item xs={6} sm={4} md={4} key={book.id}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>

          {filtered.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">No se encontraron libros con esos filtros</Typography>
            </Box>
          )}

          {filtered.length > ITEMS_PER_PAGE && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={(_, val) => setPage(val)}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Container>

      {/* GitHub Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #e8f0fe 0%, #dce8ff 100%)',
        py: 8, px: 2, textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <GitHub sx={{ fontSize: 48, color: '#1a1a2e', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Explora el codigo del proyecto
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
            Este proyecto fue desarrollado con <strong>React</strong> y <strong>Material UI</strong> como una
            tienda de libros moderna. Puedes revisar el codigo completo, aprender de su estructura o
            usarlo como base para tus propios proyectos.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<GitHub />}
            href="https://github.com/sanperex/relato-libre.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver repositorio en GitHub
          </Button>
        </Container>
      </Box>

    </Box>
  )
}