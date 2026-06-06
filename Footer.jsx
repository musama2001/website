'use client'

import { motion } from 'framer-motion'

const QUICK_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  'Web Design & Development',
  'Database Architecture',
  'Logo Design & Branding',
  '2D / 3D Animation',
  'Graphics & Visual Design',
]

const SOCIAL_LINKS = [
  { label: 'Twitter / X', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Instagram', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label: 'LinkedIn', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Behance', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg> },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="relative overflow-hidden footer-gradient">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neonPurple/40 to-transparent" />

      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Branding */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neonPurple to-cyberBlue flex items-center justify-center text-sm font-extrabold text-black shadow-neon-purple">PP</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-none">Pivot <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-cyberBlue">&amp;</span> Pulse</h3>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 tracking-widest uppercase">Software House</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">Empowering businesses with cutting-edge web solutions, stunning branding, and next-gen digital experiences.</p>

            <a href="tel:+17738859788" className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-neonPurple/30 hover:border-neonPurple/60 transition-all duration-300 phone-card" id="footer-phone">
              <div className="w-8 h-8 rounded-lg bg-neonPurple/20 flex items-center justify-center text-neonPurple group-hover:bg-neonPurple/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.87.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.94.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <span className="text-sm font-bold text-neonPurple group-hover:text-neonPurple/80 dark:group-hover:text-white transition-colors" style={{ textShadow: '0 0 14px rgba(176,38,255,0.6)' }}>+1 (773) 885-9788</span>
            </a>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}><a href={link.href} className="group flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-cyberBlue transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-cyberBlue group-hover:shadow-[0_0_8px_rgba(0,240,255,0.5)] transition-all duration-300" />{link.label}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">Our Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((svc) => (
                <li key={svc}><span className="group flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-cyberBlue transition-colors duration-300 cursor-default"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-neonPurple group-hover:shadow-[0_0_8px_rgba(176,38,255,0.5)] transition-all duration-300" />{svc}</span></li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Socials */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <motion.a key={social.label} href={social.href} aria-label={social.label} whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }} className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-cyberBlue hover:border-cyberBlue/40 hover:bg-cyberBlue/[0.06] transition-all duration-300 group">
                  <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] transition-all duration-300">{social.icon}</span>
                </motion.a>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Newsletter</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="your@email.com" className="input-themed !py-2 !text-xs" id="footer-newsletter-input" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg bg-gradient-to-r from-neonPurple to-cyberBlue text-black text-xs font-bold hover:shadow-neon-purple transition-shadow flex-shrink-0" id="footer-newsletter-btn">Join</motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center md:text-left">© {currentYear} Pivot &amp; Pulse. Empowering Businesses with Digital Innovation.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-400 dark:text-gray-600 hover:text-cyberBlue transition-colors duration-300">{item}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-neonPurple/[0.03] dark:bg-neonPurple/[0.04] rounded-full blur-[100px] pointer-events-none" />
    </footer>
  )
}
