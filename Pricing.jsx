import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import Toast from './Toast'

const PACKAGES = [
  {
    key: 'logo_special',
    title: 'Logo Special Package',
    price: 49,
    features: ['2 Concepts', '2 Revisions', 'Free Icon'],
  },
  {
    key: 'logo_premium',
    title: 'Logo Premium Package',
    price: 149,
    features: ['4 Concepts', 'Unlimited Revisions', 'Stationery'],
  },
  {
    key: 'ultimate',
    title: 'Ultimate Package',
    price: 349,
    features: ['8-10 Concepts', 'Merchandise Design', '5-sec Logo Animation'],
  },
]

function PricingCard({ pkg, index, onBuyClick, loadingKey }) {
  const isLoading = loadingKey === pkg.key

  return (
    <motion.div
      key={pkg.key}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group h-full"
    >
      {/* Glow effect background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neonPurple via-cyberBlue to-neonPurple rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></div>

      {/* Card body */}
      <div className="relative bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-gray-700 group-hover:border-neonPurple rounded-2xl p-8 transition-all duration-300 h-full flex flex-col shadow-lg shadow-gray-200/50 dark:shadow-none">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pkg.title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-cyberBlue">
              ${pkg.price}
            </span>
            <span className="text-gray-400 dark:text-gray-400 text-sm">/one-time</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-neonPurple/0 via-neonPurple/30 to-neonPurple/0 mb-6"></div>

        {/* Features */}
        <ul className="space-y-3 mb-auto">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neonPurple to-cyberBlue"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <motion.button
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          onClick={() => onBuyClick(pkg)}
          disabled={isLoading}
          className="mt-8 relative w-full py-3 px-6 rounded-lg font-semibold text-black overflow-hidden group/btn disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {/* Button gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neonPurple to-cyberBlue group-hover/btn:via-neonPurple transition-all duration-300"></div>
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin"></span>
                Processing...
              </>
            ) : (
              <>
                Buy Now
                <span className="text-lg">→</span>
              </>
            )}
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const [loadingKey, setLoadingKey] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' })

  const handleBuyClick = async (pkg) => {
    try {
      setLoadingKey(pkg.key)
      console.log(`Initiating checkout for: ${pkg.title} ($${pkg.price})`)

      // Get the API base URL from environment or default to localhost
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
      
      // Make POST request to backend Stripe route
      const response = await axios.post(`${apiBase}/api/stripe/create-session`, {
        key: pkg.key,
        amount: pkg.price * 100, // Convert to cents
        name: pkg.title,
      })

      const { url } = response.data
      if (!url) {
        throw new Error('No checkout URL returned from server')
      }

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error?.response?.data || error.message)
      setToast({
        show: true,
        message: error?.response?.data?.error || 'Checkout failed. Please try again.',
        type: 'error',
      })
      setLoadingKey(null)
    }
  }

  return (
    <section id="packages" className="py-24 section-gradient-alt relative overflow-hidden">
      {/* Background accent elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonPurple/[0.06] dark:bg-neonPurple/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyberBlue/[0.05] dark:bg-cyberBlue/10 rounded-full filter blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neonPurple via-gray-900 dark:via-white to-cyberBlue">
            Pricing Packages
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock your brand&apos;s potential with our elite logo design packages, tailored for every vision.
          </p>
        </motion.div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {PACKAGES.map((pkg, idx) => (
            <PricingCard
              key={pkg.key}
              pkg={pkg}
              index={idx}
              onBuyClick={handleBuyClick}
              loadingKey={loadingKey}
            />
          ))}
        </div>

        {/* CTA below packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">Need a custom package?</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg border-2 border-neonPurple text-neonPurple font-semibold hover:bg-neonPurple/10 transition-all duration-300"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>

      {/* Toast notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  )
}
