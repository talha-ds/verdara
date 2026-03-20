import { Link } from 'react-router-dom'
import { FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart()

  const shipping = cartTotal > 3000 ? 0 : 200
  const total = cartTotal + shipping

  if (cartItems.length === 0) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Your cart is empty</h2>
        <p className="text-[#6b7280] mb-8">Add some natural goodness to your cart!</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#2d6a4f] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#52b788] transition-all duration-300"
        >
          <FiShoppingBag size={18} /> Start Shopping
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#2d6a4f] transition-colors mb-4">
            <FiArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Shopping Cart</h1>
          <p className="text-[#6b7280] mt-1">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-6 p-5 bg-[#f8faf8] rounded-2xl border border-[#e8f0e8] hover:border-[#52b788] transition-all duration-200">
                <div className="w-20 h-20 bg-white rounded-xl border border-[#e8f0e8] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <span className="text-3xl">🌿</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <PiLeafLight size={12} className="text-[#2d6a4f]" />
                    <span className="text-xs text-[#2d6a4f]">{item.category}</span>
                  </div>
                  <h3 className="font-semibold text-[#1a1a1a] truncate">{item.name}</h3>
                  <p className="text-[#2d6a4f] font-bold mt-1">Rs. {item.price}</p>
                </div>
                <div className="flex items-center border border-[#e8f0e8] bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="w-9 h-9 flex items-center justify-center text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#2d6a4f] transition-colors font-medium disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-[#1a1a1a]">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#6b7280] hover:bg-[#f8faf8] hover:text-[#2d6a4f] transition-colors font-medium"
                  >
                    +
                  </button>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[#1a1a1a]">Rs. {item.price * item.qty}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-2 text-[#6b7280] hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f8faf8] rounded-2xl border border-[#e8f0e8] p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Subtotal</span>
                  <span className="font-medium text-[#1a1a1a]">Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Shipping</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {shipping === 0 ? <span className="text-[#2d6a4f]">Free</span> : `Rs. ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#6b7280] bg-[#f0f7f0] p-3 rounded-xl border border-[#e8f0e8]">
                    🌿 Add Rs. {3000 - cartTotal} more for free shipping!
                  </p>
                )}
                <div className="border-t border-[#e8f0e8] pt-4 flex justify-between">
                  <span className="font-bold text-[#1a1a1a]">Total</span>
                  <span className="font-bold text-xl text-[#2d6a4f]">Rs. {total}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-[#2d6a4f] text-white text-center py-4 rounded-xl font-semibold hover:bg-[#52b788] transition-all duration-300 shadow-lg shadow-[#2d6a4f]/20 hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </Link>
              <div className="mt-4 flex items-center justify-center gap-2">
                <PiLeafLight className="text-[#2d6a4f]" size={14} />
                <p className="text-xs text-[#6b7280]">100% Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage