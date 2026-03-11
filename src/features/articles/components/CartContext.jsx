import { useState } from 'react'
import { CartContext } from './useCart'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])

  const addToCart = (book) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === book.id)
      if (exists) {
        return prev.map(item => item.id === book.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...book, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
  }

  const toggleFavorite = (book) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === book.id)
      if (exists) return prev.filter(f => f.id !== book.id)
      return [...prev, book]
    })
  }

  const isFavorite = (id) => favorites.some(f => f.id === id)

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, favorites, toggleFavorite, isFavorite, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}