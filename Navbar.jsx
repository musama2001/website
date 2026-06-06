'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

/* ── Sun icon ── */
function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

/* ── Moon icon ── */
function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

/* ── Hamburger / X icon ── */
function MenuIcon({ isOpen }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.g key="x" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </motion.g>
        ) : (
          <motion.g key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}

/* ── Theme Toggle Button ── */
function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9" /> /* placeholder to prevent layout shift */
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-300 hover:border-neonPurple/50 hover:text-neonPurple transition-colors duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <MoonIcon />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SunIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ══════════════════════════════════════
   Main Navbar Component
   ══════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* close mobile menu on link click */
  const handleLinkClick = () => setMobileOpen(false)

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-sm dark:shadow-none' : 'bg-transparent'
      }`}
      id="navbar"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-2.5 group" id="nav-logo">
          <div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-neonPurple to-cyberBlue flex items-center justify-center text-[10px] font-extrabold text-black shadow-lg shadow-neonPurple/20 group-hover:shadow-neonPurple/40 transition-shadow"
          >
            PP
          </div>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            Pivot{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-cyberBlue">
              &amp;
            </span>{' '}
            Pulse
          </span>
        </a>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neonPurple to-cyberBlue group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right section ── */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            <MenuIcon isOpen={mobileOpen} />
          </motion.button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass-nav"
          >
            <ul className="px-6 py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-2.5 px-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-neonPurple hover:bg-neonPurple/[0.06] transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
