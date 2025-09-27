'use client'

import { useState } from 'react'
import { ChevronRightIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import ConsultationModal from './ConsultationModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Updated Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Dubai Property Management</span>
            <span className="block gradient-text">
              <span className="md:hidden">One-Window Service</span>
              <span className="hidden md:inline">One-Window Service</span>
            </span>
          </h1>

          {/* Updated Value Proposition */}
          <p className="text-xl md:text-2xl text-slate-200 mb-4 leading-relaxed">
            Real data. Real deals. End-to-end delivery.
          </p>

          {/* Badge - Removed border and moved closer */}
          <div className="text-slate-300 text-sm mb-12">
            <span className="hidden md:inline">Private-office standard • Discreet, quiet execution</span>
            <span className="md:hidden">Private-office standard • Discreet & quiet</span>
          </div>

          {/* Primary and Secondary CTAs - From Website Brief */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            {/* Primary CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift group flex items-center whitespace-nowrap"
            >
              <span>Book a 20-min discovery call</span>
              <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => {
                // Simulate downloading a PDF
                const link = document.createElement('a')
                link.href = '#'
                link.download = 'dubai-yield-pack.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                alert('Thank you! The Dubai Yield Pack is being prepared for download.')
              }}
              className="border-2 border-slate-400 hover:border-slate-200 text-slate-200 hover:text-white bg-slate-800/30 hover:bg-slate-700/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift group flex items-center whitespace-nowrap"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span>Get the Dubai Yield Pack (free)</span>
            </motion.button>
          </div>

          {/* Trust Signals - Micro Copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 text-slate-600 text-sm"
          >
            <p>Yields are ranges, not orders. We show both sides.</p>
            <p className="mt-1">DET-licensed, RERA-compliant processes.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        consultationType="Strategy Consultation"
      />
    </section>
  )
}
