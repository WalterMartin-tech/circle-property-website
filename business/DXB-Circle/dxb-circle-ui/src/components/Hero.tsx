import { ChevronRightIcon, ChatBubbleLeftRightIcon, EyeIcon, CalculatorIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function Hero() {
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
          {/* Headline - The 7-Second Hook */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Private-market property.</span>
            <span className="block gradient-text">Boutique access. Institutional discipline.</span>
          </h1>

          {/* Subline - Value Proposition */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            We optimise <em className="text-gold-400 font-semibold">net</em> yield, not clicks. 
            Dubai, end-to-end, discreet.
          </p>

          {/* Three Strategic CTAs */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group"
            >
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white p-6 rounded-xl transition-all hover-lift group">
                <CalculatorIcon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Get Realistic Yield</h3>
                <p className="text-sm text-primary-100 mb-3">Two-tap calculator with confidence bands</p>
                <div className="flex items-center justify-center text-sm">
                  <span>Start now</span>
                  <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="group"
            >
              <button className="w-full bg-gold-600 hover:bg-gold-700 text-white p-6 rounded-xl transition-all hover-lift group">
                <EyeIcon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Quiet Listings</h3>
                <p className="text-sm text-gold-100 mb-3">Invite-only opportunities, NDA first</p>
                <div className="flex items-center justify-center text-sm">
                  <span>Request access</span>
                  <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="group"
            >
              <button className="w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition-all hover-lift group">
                <ChatBubbleLeftRightIcon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Speak to a Partner</h3>
                <p className="text-sm text-green-100 mb-3">WhatsApp + 30-min consultation</p>
                <div className="flex items-center justify-center text-sm">
                  <span>Book now</span>
                  <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Trust Signals - Micro Copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 text-slate-400 text-sm"
          >
            <p>Yields are ranges, not orders. We show both sides.</p>
            <p className="mt-1">DET-licensed, RERA-compliant processes.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
