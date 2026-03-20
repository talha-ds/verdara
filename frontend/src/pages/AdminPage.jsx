import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiUsers, FiShoppingBag, FiX, FiCheck } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'

const emptyForm = {
  name: '', description: '', price: '', category: '', stock: '', image: ''
}

const categories = ['Dry Fruits', 'Raw Honey', 'Shilajit', 'Herbal Teas', 'Fresh Fruits', 'Natural Oils']

const AdminPage = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('products')
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  const headers = { Authorization: `Bearer ${userInfo?.token}` }

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [p, o, u] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/orders', { headers }),
        axios.get('http://localhost:5000/api/users', { headers }),
      ])
      setProducts(p.data)
      setOrders(o.data)
      setUsers(u.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const openAdd = () => {
    setEditProduct(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image || '',
    })
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editProduct) {
        await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, form, { headers })
      } else {
        await axios.post('http://localhost:5000/api/products', form, { headers })
      }
      setShowModal(false)
      fetchAll()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, { headers })
      fetchAll()
    } catch (err) {
      console.error(err)
    }
  }

  const markDelivered = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/deliver`, {}, { headers })
      fetchAll()
    } catch (err) {
      console.error(err)
    }
  }

  const stats = [
    { label: 'Total Products', value: products.length, icon: <FiPackage size={20} />, color: 'bg-[#f0f7f0]', text: 'text-[#2d6a4f]' },
    { label: 'Total Orders', value: orders.length, icon: <FiShoppingBag size={20} />, color: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Total Users', value: users.length, icon: <FiUsers size={20} />, color: 'bg-purple-50', text: 'text-purple-600' },
    { label: 'Revenue', value: `Rs. ${orders.reduce((a, o) => a + o.totalPrice, 0).toLocaleString()}`, icon: <PiLeafLight size={20} />, color: 'bg-orange-50', text: 'text-orange-600' },
  ]

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a1a]">Admin Dashboard</h1>
            <p className="text-[#6b7280] mt-1">Manage your store</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#e8f0e8] rounded-full px-4 py-2">
            <PiLeafLight className="text-[#2d6a4f]" />
            <span className="text-sm font-medium text-[#1a1a1a]">MyStore Admin</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-[#e8f0e8] p-5">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center ${stat.text} mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-[#1a1a1a]">{stat.value}</p>
              <p className="text-sm text-[#6b7280] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6">
          {['products', 'orders', 'users'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/20'
                  : 'bg-white text-[#6b7280] border border-[#e8f0e8] hover:border-[#52b788]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-[#e8f0e8] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#e8f0e8]">
              <h2 className="font-bold text-[#1a1a1a]">All Products ({products.length})</h2>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#52b788] transition-colors"
              >
                <FiPlus size={16} /> Add Product
              </button>
            </div>
            {loading ? (
              <div className="p-10 text-center text-[#6b7280]">Loading...</div>
            ) : products.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-5xl mb-3">🌿</div>
                <p className="text-[#6b7280]">No products yet. Add your first one!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f8faf8]">
                    <tr>
                      {['Product', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider px-6 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8f0e8]">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-[#f8faf8] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#f8faf8] rounded-xl border border-[#e8f0e8] flex items-center justify-center flex-shrink-0">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                              ) : (
                                <span>🌿</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-[#1a1a1a] text-sm">{product.name}</p>
                              <p className="text-xs text-[#6b7280] line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 bg-[#f0f7f0] text-[#2d6a4f] text-xs font-medium px-3 py-1 rounded-full">
                            <PiLeafLight size={10} /> {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-[#2d6a4f]">Rs. {product.price}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            product.stock > 0 ? 'bg-[#f0f7f0] text-[#2d6a4f]' : 'bg-red-50 text-red-600'
                          }`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEdit(product)}
                              className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                            >
                              <FiEdit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-[#e8f0e8] overflow-hidden">
            <div className="p-6 border-b border-[#e8f0e8]">
              <h2 className="font-bold text-[#1a1a1a]">All Orders ({orders.length})</h2>
            </div>
            {orders.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-5xl mb-3">📦</div>
                <p className="text-[#6b7280]">No orders yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f8faf8]">
                    <tr>
                      {['Order ID', 'Customer', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider px-6 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8f0e8]">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-[#f8faf8] transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-[#1a1a1a]">#{order._id.slice(-8).toUpperCase()}</td>
                        <td className="px-6 py-4 text-sm text-[#6b7280]">{order.user?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-[#2d6a4f]">Rs. {order.totalPrice}</td>
                        <td className="px-6 py-4 text-sm text-[#6b7280]">{order.paymentMethod}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            order.isDelivered ? 'bg-[#f0f7f0] text-[#2d6a4f]' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {order.isDelivered ? '✓ Delivered' : '⏳ Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {!order.isDelivered && (
                            <button
                              onClick={() => markDelivered(order._id)}
                              className="flex items-center gap-1 bg-[#f0f7f0] text-[#2d6a4f] text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#2d6a4f] hover:text-white transition-colors"
                            >
                              <FiCheck size={12} /> Mark Delivered
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-[#e8f0e8] overflow-hidden">
            <div className="p-6 border-b border-[#e8f0e8]">
              <h2 className="font-bold text-[#1a1a1a]">All Users ({users.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8faf8]">
                  <tr>
                    {['Name', 'Email', 'Role', 'Joined'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider px-6 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8f0e8]">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-[#f8faf8] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#1a1a1a]">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-[#6b7280]">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          user.isAdmin ? 'bg-purple-50 text-purple-600' : 'bg-[#f8faf8] text-[#6b7280]'
                        }`}>
                          {user.isAdmin ? '👑 Admin' : 'Customer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6b7280]">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl border border-[#e8f0e8] w-full max-w-lg p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1a1a1a]">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 bg-[#f8faf8] rounded-lg flex items-center justify-center text-[#6b7280] hover:text-[#1a1a1a] transition-colors">
                <FiX size={16} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Premium Kashmiri Almonds"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your product..."
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="1200"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="50"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] transition-all"
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Image URL (optional)</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] transition-all"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#e8f0e8] text-[#6b7280] font-medium hover:border-[#52b788] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#2d6a4f] text-white font-medium hover:bg-[#52b788] transition-all disabled:opacity-70"
                >
                  {saving ? 'Saving...' : editProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage