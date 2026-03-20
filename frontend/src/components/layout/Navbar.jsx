import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount } = useCart()

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8f0e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#2d6a4f] rounded-full flex items-center justify-center group-hover:bg-[#52b788] transition-colors duration-300">
              <PiLeafLight className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-[#1a1a1a] tracking-tight">
              My<span className="text-[#2d6a4f]">Store</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search natural products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-full border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all duration-200"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2d6a4f] hover:text-[#52b788] transition-colors">
                <FiSearch size={16} />
              </button>
            </div>
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] transition-colors duration-200">
              Shop
            </Link>
            {userInfo ? (
              <div className="relative group">
                <button className="text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] transition-colors duration-200 flex items-center gap-1">
                  <FiUser size={16} /> {userInfo.name.split(' ')[0]}
                </button>
                <div className="absolute right-0 top-8 w-44 bg-white border border-[#e8f0e8] rounded-2xl shadow-xl shadow-[#2d6a4f]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  <Link to="/profile" className="block px-4 py-3 text-sm text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#2d6a4f] transition-colors">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-3 text-sm text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#2d6a4f] transition-colors">My Orders</Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin" className="block px-4 py-3 text-sm text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#2d6a4f] transition-colors">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-[#e8f0e8]">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] transition-colors duration-200 flex items-center gap-1">
                <FiUser size={16} /> Account
              </Link>
            )}
            <Link to="/cart" className="relative flex items-center gap-1 bg-[#2d6a4f] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#52b788] transition-colors duration-200">
              <FiShoppingCart size={16} />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#95d5b2] text-[#1a1a1a] text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#2d6a4f] hover:text-[#52b788] transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#e8f0e8] px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-full border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2d6a4f]">
                <FiSearch size={16} />
              </button>
            </div>
          </form>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] py-2">Shop</Link>
          {userInfo ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] py-2">My Profile</Link>
              <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] py-2">My Orders</Link>
              {userInfo.isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] py-2">Admin Dashboard</Link>
              )}
              <button onClick={handleLogout} className="block text-sm font-medium text-red-500 py-2">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] py-2">Account</Link>
          )}
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-[#6b7280] hover:text-[#2d6a4f] py-2">Cart {cartCount > 0 && `(${cartCount})`}</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar