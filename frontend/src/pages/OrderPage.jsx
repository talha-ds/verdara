import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FiCheckCircle, FiPackage, FiMapPin, FiCreditCard } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'

const OrderPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/${id}`,
          { headers: { Authorization: `Bearer ${userInfo?.token}` } }
        )
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#e8f0e8] border-t-[#2d6a4f] rounded-full animate-spin"></div>
    </div>
  )

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Order not found</h3>
        <Link to="/" className="text-[#2d6a4f] text-sm mt-2 inline-block hover:underline">Go Home</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#f0f7f0] rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle size={40} className="text-[#2d6a4f]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Order Placed!</h1>
          <p className="text-[#6b7280]">Thank you for your order. We'll process it shortly.</p>
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8f0e8] rounded-full px-4 py-2 mt-4">
            <PiLeafLight className="text-[#2d6a4f]" />
            <span className="text-sm text-[#6b7280]">Order ID: <span className="font-medium text-[#1a1a1a]">#{order._id.slice(-8).toUpperCase()}</span></span>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl border border-[#e8f0e8] p-6 mb-6">
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Order Status</h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#e8f0e8]"></div>
            {[
              { label: 'Order Placed', icon: <FiCheckCircle size={20} />, done: true },
              { label: 'Processing', icon: <FiPackage size={20} />, done: false },
              { label: 'Shipped', icon: <FiPackage size={20} />, done: false },
              { label: 'Delivered', icon: <FiCheckCircle size={20} />, done: order.isDelivered },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center gap-2 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.done ? 'bg-[#2d6a4f] text-white' : 'bg-white border-2 border-[#e8f0e8] text-[#6b7280]'
                }`}>
                  {step.icon}
                </div>
                <span className="text-xs text-[#6b7280] font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl border border-[#e8f0e8] p-6 mb-6">
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
            <FiPackage className="text-[#2d6a4f]" /> Order Items
          </h2>
          <div className="space-y-4">
            {order.orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-[#e8f0e8] last:border-0">
                <div className="w-14 h-14 bg-[#f8faf8] rounded-xl border border-[#e8f0e8] flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <span className="text-2xl">🌿</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1a1a1a]">{item.name}</p>
                  <p className="text-sm text-[#6b7280]">Qty: {item.qty}</p>
                </div>
                <p className="font-bold text-[#2d6a4f]">Rs. {item.price * item.qty}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#e8f0e8] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#6b7280]">Subtotal</span>
              <span>Rs. {order.itemsPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6b7280]">Shipping</span>
              <span>{order.shippingPrice === 0 ? <span className="text-[#2d6a4f]">Free</span> : `Rs. ${order.shippingPrice}`}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-[#e8f0e8]">
              <span>Total</span>
              <span className="text-[#2d6a4f] text-lg">Rs. {order.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-[#e8f0e8] p-6">
            <h2 className="text-sm font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
              <FiMapPin className="text-[#2d6a4f]" /> Shipping Address
            </h2>
            <p className="text-sm text-[#6b7280]">{order.shippingAddress.address}</p>
            <p className="text-sm text-[#6b7280]">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p className="text-sm text-[#6b7280]">{order.shippingAddress.country}</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#e8f0e8] p-6">
            <h2 className="text-sm font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
              <FiCreditCard className="text-[#2d6a4f]" /> Payment Method
            </h2>
            <p className="text-sm text-[#6b7280]">{order.paymentMethod}</p>
            <div className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              order.isPaid ? 'bg-[#f0f7f0] text-[#2d6a4f]' : 'bg-orange-50 text-orange-600'
            }`}>
              {order.isPaid ? '✓ Paid' : '⏳ Payment Pending'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="flex-1 bg-[#2d6a4f] text-white text-center py-4 rounded-xl font-semibold hover:bg-[#52b788] transition-all duration-300 shadow-lg shadow-[#2d6a4f]/20"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="flex-1 bg-white text-[#2d6a4f] text-center py-4 rounded-xl font-semibold border border-[#e8f0e8] hover:border-[#52b788] transition-all duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderPage