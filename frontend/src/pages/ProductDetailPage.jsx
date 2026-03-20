import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FiShoppingCart, FiArrowLeft, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'
import { useCart } from '../context/CartContext'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#e8f0e8] border-t-[#2d6a4f] rounded-full animate-spin"></div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Product not found</h3>
        <Link to="/products" className="text-[#2d6a4f] text-sm mt-2 inline-block hover:underline">Back to products</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#2d6a4f] transition-colors mb-8">
          <FiArrowLeft size={16} /> Back to Products
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image */}
          <div className="bg-[#f8faf8] rounded-3xl overflow-hidden border border-[#e8f0e8] h-[500px] flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-9xl">🌿</div>
            )}
          </div>
          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <PiLeafLight className="text-[#2d6a4f]" />
              <span className="text-sm text-[#2d6a4f] font-medium">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} className="text-[#2d6a4f] fill-[#2d6a4f]" />
                ))}
              </div>
              <span className="text-sm text-[#6b7280]">({product.numReviews || 0} reviews)</span>
            </div>
            <p className="text-[#6b7280] leading-relaxed mb-8">{product.description}</p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-[#2d6a4f]">Rs. {product.price}</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-[#2d6a4f]' : 'bg-red-400'}`}></div>
              <span className="text-sm text-[#6b7280]">
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium text-[#1a1a1a]">Quantity:</span>
                <div className="flex items-center border border-[#e8f0e8] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#2d6a4f] transition-colors text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-[#1a1a1a]">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#2d6a4f] transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 mb-4 ${
                product.stock === 0
                  ? 'bg-[#f8faf8] text-[#6b7280] cursor-not-allowed border border-[#e8f0e8]'
                  : added
                  ? 'bg-[#52b788] text-white shadow-lg'
                  : 'bg-[#2d6a4f] text-white hover:bg-[#52b788] shadow-lg shadow-[#2d6a4f]/20 hover:-translate-y-0.5'
              }`}
            >
              <FiShoppingCart size={18} />
              {added ? 'Added to Cart! ✓' : 'Add to Cart'}
            </button>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#e8f0e8]">
              {[
                { icon: <FiTruck size={18} />, text: 'Free Delivery' },
                { icon: <FiShield size={18} />, text: '100% Authentic' },
                { icon: <FiRefreshCw size={18} />, text: 'Easy Returns' },
              ].map((badge) => (
                <div key={badge.text} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-[#f8faf8] border border-[#e8f0e8] rounded-xl flex items-center justify-center text-[#2d6a4f]">
                    {badge.icon}
                  </div>
                  <span className="text-xs text-[#6b7280] font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage