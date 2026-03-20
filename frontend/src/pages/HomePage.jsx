import { Link } from 'react-router-dom'
import { PiLeafLight, PiPlantLight, PiDropLight } from 'react-icons/pi'
import { FiArrowRight, FiStar } from 'react-icons/fi'

const categories = [
  { name: 'Dry Fruits', emoji: '🥜', desc: 'Premium quality nuts & dried fruits' },
  { name: 'Raw Honey', emoji: '🍯', desc: 'Pure unprocessed natural honey' },
  { name: 'Shilajit', emoji: '🪨', desc: 'Authentic himalayan shilajit resin' },
  { name: 'Herbal Teas', emoji: '🌿', desc: 'Hand picked medicinal herbs' },
  { name: 'Fresh Fruits', emoji: '🍎', desc: 'Farm fresh seasonal fruits' },
  { name: 'Natural Oils', emoji: '🫙', desc: 'Cold pressed essential oils' },
]

const features = [
  { icon: <PiLeafLight size={24} />, title: '100% Natural', desc: 'No additives, preservatives or artificial ingredients' },
  { icon: <PiPlantLight size={24} />, title: 'Sustainably Sourced', desc: 'Ethically harvested from trusted farms' },
  { icon: <PiDropLight size={24} />, title: 'Pure & Authentic', desc: 'Lab tested for quality and purity' },
]

const testimonials = [
  { name: 'Ahmed K.', rating: 5, text: 'The shilajit quality is absolutely incredible. I can feel the difference!' },
  { name: 'Fatima S.', rating: 5, text: 'Best dry fruits I have ever tasted. Will definitely order again.' },
  { name: 'Usman R.', rating: 5, text: 'Pure honey, no sugar added. My whole family loves it.' },
]

const HomePage = () => {
  return (
    <div className="overflow-hidden">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#f8faf8] via-white to-[#f0f7f0]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#95d5b2]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#52b788]/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#f0f7f0] border border-[#e8f0e8] rounded-full px-4 py-2 mb-8">
            <PiLeafLight className="text-[#2d6a4f]" />
            <span className="text-sm text-[#2d6a4f] font-medium">100% Natural & Organic Products</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#1a1a1a] leading-tight mb-6">
            Nature's Finest
            <span className="block text-[#2d6a4f]">At Your Door</span>
          </h1>
          <p className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover premium herbal products, dry fruits, pure honey, and authentic natural remedies sourced directly from nature.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="flex items-center gap-2 bg-[#2d6a4f] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#52b788] transition-all duration-300 shadow-lg shadow-[#2d6a4f]/20 hover:shadow-[#52b788]/30 hover:-translate-y-0.5"
            >
              Shop Now <FiArrowRight size={18} />
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 bg-white text-[#2d6a4f] px-8 py-4 rounded-full font-semibold border border-[#e8f0e8] hover:border-[#52b788] transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Products
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-16">
            {['500+ Products', '10k+ Customers', '100% Pure'].map((stat) => (
              <div key={stat} className="text-center">
                <p className="text-sm font-semibold text-[#2d6a4f]">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-6 rounded-2xl bg-[#f8faf8] border border-[#e8f0e8] hover:border-[#52b788] transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#2d6a4f] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">{f.title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Shop By Category</h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">Explore our wide range of natural and herbal products carefully selected for your wellbeing</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="group p-6 bg-white rounded-2xl border border-[#e8f0e8] hover:border-[#52b788] hover:shadow-lg hover:shadow-[#2d6a4f]/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{cat.emoji}</div>
                <h3 className="font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#2d6a4f] transition-colors">{cat.name}</h3>
                <p className="text-xs text-[#6b7280]">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">What Our Customers Say</h2>
            <p className="text-[#6b7280]">Trusted by thousands of happy customers across Pakistan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 bg-[#f8faf8] rounded-2xl border border-[#e8f0e8]">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} size={14} className="text-[#2d6a4f] fill-[#2d6a4f]" />
                  ))}
                </div>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-sm font-semibold text-[#1a1a1a]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2d6a4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Go Natural?</h2>
          <p className="text-[#95d5b2] mb-8 max-w-xl mx-auto">Join thousands of customers who have made the switch to natural, pure, and authentic products.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-[#2d6a4f] px-8 py-4 rounded-full font-semibold hover:bg-[#f8faf8] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            Start Shopping <FiArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default HomePage