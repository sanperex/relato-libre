import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom'
import MainLayout from './features/layout/components/MainLayout'
import Home from './features/articles/pages/Home'
import BookDetail from './features/articles/pages/BookDetail'
import Cart from './features/articles/pages/Cart'
import Hooks from './features/articles/pages/Hooks'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import MyAccount from './features/auth/components/Myaccount'
import MyBuys from './features/auth/components/Mybuys'
import MyFavorites from './features/auth/components/Myfavorites'

function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/hooks" element={<Hooks />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-buys" element={<MyBuys />} />
          <Route path="/my-favorites" element={<MyFavorites />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default Routes