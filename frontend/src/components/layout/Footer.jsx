import { Link } from 'react-router-dom'
import { PiLeafLight } from 'react-icons/pi'
import { FiInstagram, FiTwitter, FiFacebook, FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-[#f8faf8] border-t border-[#e8f0e8] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2d6a4f] rounded-full flex items-center justify-center">
                <PiLeafLight className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-[#1a1a1a]">
                My<span className="text-[#2d6a4f]">Store</span>
              </span>
            </Link>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-sm">
              Premium natural & herbal products sourced directly from nature. 
              Pure, authentic, and trusted by thousands of customers.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#e8f0e8] flex items-center justify-center text-[#6b7280] hover:text-[#2d6a4f] hover:border-[#2d6a4f] transition-all duration-200">
                <FiInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#e8f0e8] flex items-center justify-center text-[#6b7280] hover:text-[#2d6a4f] hover:border-[#2d6a4f] transition-all duration-200">
                <FiTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#e8f0e8] flex items-center justify-center text-[#6b7280] hover:text-[#2d6a4f] hover:border-[#2d6a4f] transition-all duration-200">
                <FiFacebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#e8f0e8] flex items-center justify-center text-[#6b7280] hover:text-[#2d6a4f] hover:border-[#2d6a4f] transition-all duration-200">
                <FiMail size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              {['All Products', 'Dry Fruits', 'Honey', 'Shilajit', 'Herbal Teas', 'Fresh Fruits'].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-sm text-[#6b7280] hover:text-[#2d6a4f] transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'FAQs', 'Shipping Policy', 'Returns', 'Track Order'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#6b7280] hover:text-[#2d6a4f] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#e8f0e8] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280]">
            © 2026 MyStore. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <PiLeafLight className="text-[#2d6a4f]" />
            <p className="text-sm text-[#6b7280]">100% Natural & Authentic Products</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer