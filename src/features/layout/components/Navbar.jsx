import { useState } from 'react'
import {
  AppBar, Toolbar, Typography, IconButton, Badge,
  Box, Button, Drawer, List, ListItem, ListItemText,
  InputBase, Avatar, Menu, MenuItem, Divider,
} from '@mui/material'
import {
  ShoppingCart, FavoriteBorder, Search, MenuBook,
  Menu as MenuIcon, Close, AccountCircle,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../articles/components/useCart'

export default function Navbar() {
  const navigate = useNavigate()
  const { cartCount, favorites } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [search, setSearch] = useState('')

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/' },
    { label: 'Novedades', path: '/' },
    { label: 'Ofertas', path: '/' },
    { label: 'Hooks', path: '/hooks' },
  ]

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/?search=${search}`)
      setSearch('')
    }
  }

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
        <Toolbar sx={{ gap: 2, px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <MenuBook sx={{ color: 'secondary.main', fontSize: 32 }} />
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, letterSpacing: '0.05em', display: { xs: 'none', sm: 'block' } }}>
              LIBROS<span style={{ color: '#e8b86d' }}>MX</span>
            </Typography>
          </Box>

          {/* Nav links desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 2 }}>
            {navLinks.map(link => (
              <Button key={link.label} onClick={() => navigate(link.path)}
                sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: 'secondary.main' }, fontSize: '0.85rem' }}>
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Search */}
          <Box sx={{
            flex: 1, mx: 2, display: 'flex', alignItems: 'center',
            bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 1, px: 2, py: 0.5,
            '&:focus-within': { bgcolor: 'rgba(255,255,255,0.2)' },
          }}>
            <Search sx={{ color: 'rgba(255,255,255,0.6)', mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Buscar libros, autores..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              sx={{ color: 'white', flex: 1, fontSize: '0.9rem', '& input::placeholder': { color: 'rgba(255,255,255,0.5)' } }}
            />
          </Box>

          {/* Icons */}
          <IconButton onClick={() => navigate('/my-favorites')} sx={{ color: 'white' }}>
            <Badge badgeContent={favorites.length} color="secondary">
              <FavoriteBorder />
            </Badge>
          </IconButton>

          <IconButton onClick={() => navigate('/cart')} sx={{ color: 'white' }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: 'white' }}>
            <AccountCircle />
          </IconButton>

          {/* Mobile menu */}
          <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, color: 'white' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Account menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { navigate('/my-account'); setAnchorEl(null) }}>Mi Cuenta</MenuItem>
        <MenuItem onClick={() => { navigate('/my-buys'); setAnchorEl(null) }}>Mis Compras</MenuItem>
        <MenuItem onClick={() => { navigate('/my-favorites'); setAnchorEl(null) }}>Mis Favoritos</MenuItem>
        <Divider />
        <MenuItem onClick={() => { navigate('/login'); setAnchorEl(null) }}>Cerrar Sesión</MenuItem>
      </Menu>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
            <IconButton onClick={() => setMobileOpen(false)}><Close /></IconButton>
          </Box>
          <List>
            {navLinks.map(link => (
              <ListItem button key={link.label} onClick={() => { navigate(link.path); setMobileOpen(false) }}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}