import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiMapPin, FiPhone, FiUser, FiChevronRight } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'
import { useCart } from '../context/CartContext'

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery',
  })

  const shipping = cartTotal > 3000 ? 0 : 200
  const total = cartTotal + shipping

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userInfo) return navigate('/login')
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.image || '',
            price: item.price,
            product: item._id,
          })),
          shippingAddress: {
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: 'Pakistan',
          },
          paymentMethod: form.paymentMethod,
          itemsPrice: cartTotal,
          shippingPrice: shipping,
          totalPrice: total,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      )
      clearCart()
      navigate(`/order/${data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Checkout</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-[#6b7280]">
            <span>Cart</span>
            <FiChevronRight size={14} />
            <span className="text-[#2d6a4f] font-medium">Checkout</span>
            <FiChevronRight size={14} />
            <span>Confirmation</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Shipping Info */}
              <div className="bg-white rounded-2xl border border-[#e8f0e8] p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                  <FiMapPin className="text-[#2d6a4f]" /> Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                      />
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="03xx-xxxxxxx"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                      />
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={16} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House #, Street, Area"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Islamabad"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      placeholder="44000"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-[#e8f0e8] p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {['Cash on Delivery', 'JazzCash', 'Easypaisa'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        form.paymentMethod === method
                          ? 'border-[#2d6a4f] bg-[#f0f7f0]'
                          : 'border-[#e8f0e8] hover:border-[#52b788]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={form.paymentMethod === method}
                        onChange={handleChange}
                        className="accent-[#2d6a4f]"
                      />
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a]">{method}</p>
                        {method === 'Cash on Delivery' && (
                          <p className="text-xs text-[#6b7280]">Pay when your order arrives</p>
                        )}
                        {method === 'JazzCash' && (
                          <p className="text-xs text-[#6b7280]">Pay via JazzCash mobile account</p>
                        )}
                        {method === 'Easypaisa' && (
                          <p className="text-xs text-[#6b7280]">Pay via Easypaisa mobile account</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2d6a4f] text-white py-4 rounded-xl font-semibold hover:bg-[#52b788] transition-all duration-300 shadow-lg shadow-[#2d6a4f]/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Placing Order...
                  </span>
                ) : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#e8f0e8] p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f8faf8] rounded-xl border border-[#e8f0e8] flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <span className="text-xl">🌿</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a1a1a] truncate">{item.name}</p>
                      <p className="text-xs text-[#6b7280]">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-bold text-[#2d6a4f]">Rs. {item.price * item.qty}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e8f0e8] pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Subtotal</span>
                  <span className="font-medium">Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-[#2d6a4f]">Free</span> : `Rs. ${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-[#e8f0e8]">
                  <span>Total</span>
                  <span className="text-[#2d6a4f] text-lg">Rs. {total}</span>
                </div>
              </div>
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

export default CheckoutPage