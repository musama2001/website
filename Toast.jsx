import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ show, message, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed right-6 top-6 z-[60]"
        >
          <div className="bg-white dark:bg-[#111217] border border-neonPurple text-neonPurple px-4 py-3 rounded-lg shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="font-semibold text-sm">{message}</div>
              <button onClick={onClose} className="ml-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Close</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
