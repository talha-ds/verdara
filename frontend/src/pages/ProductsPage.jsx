import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FiSearch, FiFilter, FiShoppingCart, FiStar } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'

const categories = ['All', 'Dry Fruits', 'Raw Honey', 'Shilajit', 'Herbal Teas', 'Fresh Fruits', 'Natural Oils']

const ProductCard = ({ product }) => (
  <Link to={`/product/${product._id}`} className="group bg-white rounded-2xl border border-[#e8f0e8] overflow-hidden hover:border-[#52b788] hover:shadow-xl hover:shadow-[#2d6a4f]/5 transition-all duration-300 hover:-translate-y-1">
    <div className="relative overflow-hidden bg-[#f8faf8] h-56">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-6xl">🌿</div>
      )}
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
          <span className="text-sm font-semibold text-[#6b7280]">Out of Stock</span>
        </div>
      )}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="w-9 h-9 bg-[#2d6a4f] rounded-full flex items-center justify-center text-white hover:bg-[#52b788] transition-colors shadow-lg">
          <FiShoppingCart size={15} />
        </button>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-1 mb-2">
        <PiLeafLight size={12} className="text-[#2d6a4f]" />
        <span className="text-xs text-[#2d6a4f] font-medium">{product.category}</span>
      </div>
      <h3 className="font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#2d6a4f] transition-colors line-clamp-1">{product.name}</h3>
      <p className="text-xs text-[#6b7280] mb-3 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-[#2d6a4f]">Rs. {product.price}</span>
        <div className="flex items-center gap-1">
          <FiStar size={12} className="text-[#2d6a4f] fill-[#2d6a4f]" />
          <span className="text-xs text-[#6b7280]">{product.rating || '5.0'}</span>
        </div>
      </div>
    </div>
  </Link>
)

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    const category = params.get('category')
    if (search) setSearchQuery(search)
    if (category) setSelectedCategory(category)
  }, [location.search])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('http://localhost:5000/api/products')
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filtered = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-[#f8faf8] border-b border-[#e8f0e8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">All Products</h1>
          <p className="text-[#6b7280]">Discover our full range of natural & herbal products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={16} />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm text-[#6b7280] focus:outline-none focus:border-[#52b788] transition-all"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/20'
                  : 'bg-[#f8faf8] text-[#6b7280] border border-[#e8f0e8] hover:border-[#52b788] hover:text-[#2d6a4f]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#f8faf8] rounded-2xl h-72 animate-pulse border border-[#e8f0e8]"></div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">No products found</h3>
            <p className="text-[#6b7280]">Try a different search or category</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#6b7280] mb-6">{filtered.length} products found</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductsPage