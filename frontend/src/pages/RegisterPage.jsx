import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import { PiLeafLight } from 'react-icons/pi'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faf8] via-white to-[#f0f7f0] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2d6a4f] rounded-full flex items-center justify-center">
              <PiLeafLight className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-[#1a1a1a]">
              My<span className="text-[#2d6a4f]">Store</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mt-6 mb-2">Create Account</h1>
          <p className="text-[#6b7280] text-sm">Join thousands of happy natural product lovers</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#e8f0e8] p-8 shadow-xl shadow-[#2d6a4f]/5">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                />
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={16} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                />
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={16} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                />
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#2d6a4f] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8f0e8] bg-[#f8faf8] text-sm focus:outline-none focus:border-[#52b788] focus:ring-2 focus:ring-[#95d5b2]/30 transition-all"
                />
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={16} />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2d6a4f] text-white py-3.5 rounded-xl font-semibold hover:bg-[#52b788] transition-all duration-300 shadow-lg shadow-[#2d6a4f]/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#6b7280]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2d6a4f] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#6b7280] mt-6">
          🌿 By creating an account you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default RegisterPage