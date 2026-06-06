'use client'

import { useState, useRef } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service…' },
  { value: 'web-design', label: 'Web Design & Development' },
  { value: 'db-architecture', label: 'Database Architecture' },
  { value: 'logo-design', label: 'Logo Design & Branding' },
  { value: 'animation', label: '2D / 3D Animation' },
  { value: 'graphics', label: 'Graphics & Visual Design' },
]

const API_BASE =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
    : 'http://localhost:4000'

const INITIAL_FORM = { name: '', email: '', service: '', message: '' }

function FormField({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  )
}

function SuccessOverlay({ onReset }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl glass-overlay">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-neonPurple to-cyberBlue flex items-center justify-center mb-6 shadow-neon-purple">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </motion.div>
      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</motion.h3>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-xs mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</motion.p>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onReset} className="px-6 py-2.5 rounded-lg border border-cyberBlue/40 text-cyberBlue text-sm font-semibold hover:bg-cyberBlue/10 transition-colors">Send Another Message</motion.button>
    </motion.div>
  )
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setError('Please fill in all required fields.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return }
    setIsSubmitting(true); setError('')
    try {
      await axios.post(`${API_BASE}/api/contact`, { name: form.name.trim(), email: form.email.trim(), service: form.service || 'General Inquiry', message: form.message.trim() })
      setShowSuccess(true)
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong. Please try again later.')
    } finally { setIsSubmitting(false) }
  }

  const handleReset = () => { setForm(INITIAL_FORM); setShowSuccess(false) }

  const labelCls = "block text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-2"

  return (
    <section id="contact" className="relative py-28 overflow-hidden section-gradient">
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-neonPurple/[0.04] dark:bg-neonPurple/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-cyberBlue/[0.03] dark:bg-cyberBlue/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="inline-block px-4 py-1.5 rounded-full border border-cyberBlue/30 text-cyberBlue text-xs font-semibold tracking-widest uppercase mb-6">Get In Touch</motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-5 text-transparent bg-clip-text bg-gradient-to-r from-neonPurple via-gray-900 dark:via-white to-cyberBlue">Let&apos;s Build Something Amazing</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Ready to elevate your brand? Drop us a message and our team will craft the perfect digital solution for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-6 justify-center">
            {[
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.87.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.94.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: 'Call Us', value: '+1 (773) 885-9788', href: 'tel:+17738859788', highlight: true },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label: 'Email', value: 'hello@pivotpulse.com', href: 'mailto:hello@pivotpulse.com' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Location', value: 'Chicago, IL — USA' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                <div className={`group relative rounded-xl p-5 border transition-all duration-300 glass-info ${item.highlight ? 'border-neonPurple/40 hover:border-neonPurple/70' : 'border-gray-200 dark:border-white/[0.06] hover:border-cyberBlue/30'}`}>
                  <div className="relative flex items-center gap-4">
                    <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${item.highlight ? 'bg-neonPurple/15 text-neonPurple' : 'bg-cyberBlue/10 text-cyberBlue'}`}>{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-0.5">{item.label}</p>
                      {item.href ? <a href={item.href} className={`text-sm font-semibold transition-colors ${item.highlight ? 'text-neonPurple hover:text-neonPurple/80' : 'text-gray-700 dark:text-gray-200 hover:text-cyberBlue'}`}>{item.value}</a> : <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{item.value}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-3 relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neonPurple/30 via-cyberBlue/20 to-neonPurple/30 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-700 pointer-events-none" />
            <div className="relative rounded-2xl p-8 md:p-10 overflow-hidden glass-card">
              <AnimatePresence>{showSuccess && <SuccessOverlay onReset={handleReset} />}</AnimatePresence>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField delay={0}><label htmlFor="contact-name" className={labelCls}>Name <span className="text-neonPurple">*</span></label><input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Doe" className="input-themed" required /></FormField>
                  <FormField delay={0.08}><label htmlFor="contact-email" className={labelCls}>Email <span className="text-neonPurple">*</span></label><input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="input-themed" required /></FormField>
                </div>
                <FormField delay={0.16}>
                  <label htmlFor="contact-service" className={labelCls}>Service Interest</label>
                  <div className="relative">
                    <select id="contact-service" name="service" value={form.service} onChange={handleChange} className="input-themed appearance-none cursor-pointer">
                      {SERVICE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#0b0b15]">{opt.label}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg></div>
                  </div>
                </FormField>
                <FormField delay={0.24}><label htmlFor="contact-message" className={labelCls}>Message <span className="text-neonPurple">*</span></label><textarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project…" rows={5} className="input-themed resize-none" required /></FormField>
                <AnimatePresence>{error && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium">{error}</motion.p>}</AnimatePresence>
                <FormField delay={0.32}>
                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.97 }} className="relative w-full py-3.5 rounded-xl font-semibold text-black overflow-hidden group/btn disabled:cursor-not-allowed">
                    <div className="absolute inset-0 bg-gradient-to-r from-neonPurple to-cyberBlue" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                      {isSubmitting ? <><span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />Sending...</> : <>Send Message<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg></>}
                    </span>
                  </motion.button>
                </FormField>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
