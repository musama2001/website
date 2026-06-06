'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_RESPONSE = "Hello! I am the Pivot & Pulse assistant (Mock Mode). How can I help you with web design or branding today?"
const API_BASE = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000' : 'http://localhost:4000'

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function PulseRings() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="absolute inset-0 rounded-full border border-neonPurple/40" animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }} />
      ))}
    </>
  )
}

function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="flex justify-start">
      <div className="bubble-bot px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => <motion.span key={i} className="w-2 h-2 rounded-full bg-cyberBlue" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} />)}
        </div>
      </div>
    </motion.div>
  )
}

function ChatBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-neonPurple to-cyberBlue flex items-center justify-center text-[10px] font-bold text-black mr-2 mt-1 shadow-lg shadow-neonPurple/30">PP</div>
      )}
      <div className="max-w-[75%] flex flex-col gap-1">
        <div className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${isUser ? 'bg-gradient-to-r from-neonPurple to-cyberBlue text-black font-medium rounded-2xl rounded-br-sm shadow-lg shadow-neonPurple/20' : 'bubble-bot rounded-2xl rounded-bl-sm'}`}>{msg.text}</div>
        <span className={`text-[10px] text-gray-400 ${isUser ? 'text-right mr-1' : 'ml-1'}`}>{formatTime(msg.timestamp)}</span>
      </div>
    </motion.div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'bot', text: "Welcome to Pivot & Pulse! 👋\nI'm your AI assistant — ask me about our Web Design, Database Architecture, Logo Design, Animation, and Graphics services!", timestamp: new Date() }])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [])
  useEffect(() => { scrollToBottom() }, [messages, isLoading, scrollToBottom])
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 350) }, [isOpen])

  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text || isLoading) return
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text, timestamp: new Date() }])
    setInputValue(''); setIsLoading(true)
    try {
      const { data } = await axios.post(`${API_BASE}/api/openai/chat`, { message: text })
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: data.reply || MOCK_RESPONSE, timestamp: new Date() }])
    } catch {
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: MOCK_RESPONSE, timestamp: new Date() }])
    } finally { setIsLoading(false) }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }

  const windowVariants = {
    hidden: { opacity: 0, scale: 0.75, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
    exit: { opacity: 0, scale: 0.75, y: 30, transition: { duration: 0.2, ease: 'easeIn' } },
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div variants={windowVariants} initial="hidden" animate="visible" exit="exit" className="absolute bottom-20 right-0 w-[370px] h-[520px] rounded-2xl overflow-hidden flex flex-col glass-chat" id="chat-window">
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200 dark:border-cyberBlue/20 glass-chat-header">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neonPurple to-cyberBlue flex items-center justify-center text-xs font-extrabold text-black shadow-lg shadow-neonPurple/30">PP</div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white dark:border-[#0a0a12]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none">Pivot &amp; Pulse</h3>
                  <p className="text-[11px] text-cyberBlue/80 mt-0.5">AI Assistant • Online</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" aria-label="Close chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => <ChatBubble key={msg.id} msg={msg} />)}
              <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-cyberBlue/15 glass-chat-input">
              <div className="flex gap-2 items-center">
                <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about our services…" className="input-themed !py-2.5" id="chat-input" />
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} onClick={handleSend} disabled={isLoading || !inputValue.trim()} className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-neonPurple to-cyberBlue flex items-center justify-center text-black disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-lg shadow-neonPurple/25" aria-label="Send message" id="chat-send-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">Powered by Pivot &amp; Pulse AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={() => setIsOpen((v) => !v)} className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #b026ff, #8b1fd4)', boxShadow: '0 0 20px rgba(176,38,255,0.5), 0 0 60px rgba(176,38,255,0.2), 0 8px 24px rgba(0,0,0,0.4)' }} aria-label={isOpen ? 'Close chat' : 'Open chat'} id="chat-fab">
        {!isOpen && <PulseRings />}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }} className="relative z-10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }} className="relative z-10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
