import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function CredibilityStrip() {
  const caseStudies = [
    {
      project: 'Burj Vista Tower',
      metric: '+18% net yield',
      timeframe: '9 months',
      change: 'OTA mix optimization + strategic refurbs',
      image: '/api/placeholder/400/300'
    },
    {
      project: 'Marina Gate',
      metric: '23% vacancy reduction',
      timeframe: '6 months',
      change: 'Pricing algorithm + tenant screening',
      image: '/api/placeholder/400/300'
    },
    {
      project: 'DIFC Gateway',
      metric: 'AED 2.1M additional NOI',
      timeframe: '12 months',
      change: 'Hybrid model implementation',
      image: '/api/placeholder/400/300'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Real Results, Named Projects
          </h2>
          <p className="text-lg text-slate-600">
            Case studies with actual metrics and transparent methodologies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.project}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover-lift overflow-hidden border border-slate-200"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-400 opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium opacity-90">{study.project}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {study.metric}
                  </div>
                  <div className="text-sm text-slate-500">
                    in {study.timeframe}
                  </div>
                </div>

                <p className="text-slate-700 mb-6">
                  <span className="font-medium">What changed:</span> {study.change}
                </p>

                <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform">
                  <span>View full case study</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">AED 127M+</div>
              <div className="text-sm text-slate-600">Assets under management</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">340+</div>
              <div className="text-sm text-slate-600">Properties optimized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">94%</div>
              <div className="text-sm text-slate-600">Client retention rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">4.8/5</div>
              <div className="text-sm text-slate-600">Average satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
