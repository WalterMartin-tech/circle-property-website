import { ArrowRightIcon, ChartBarIcon, BuildingOfficeIcon, CogIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface ThreeDoorArchitectureProps {
  setActiveSection: (section: 'home' | 'invest' | 'own' | 'develop') => void
}

export default function ThreeDoorArchitecture({ setActiveSection }: ThreeDoorArchitectureProps) {
  const doors = [
    {
      key: 'invest' as const,
      title: 'INVEST',
      subtitle: 'HNWI / Family Offices',
      description: 'Private market allocation with institutional rigor',
      features: [
        'Quarterly Dubai Yield Map',
        'Curated off-market opportunities',
        'Risk-adjusted portfolio modeling',
        'Discrete transaction support'
      ],
      icon: ChartBarIcon,
      color: 'primary',
      gradient: 'from-primary-500 to-primary-700'
    },
    {
      key: 'own' as const,
      title: 'OWN',
      subtitle: 'Property Owners',
      description: 'Net yield optimization, not gross revenue theater',
      features: [
        'Two-tap yield estimator',
        'Portfolio cockpit (net focus)',
        'Switch cost calculator',
        'Compliance & escrow clarity'
      ],
      icon: BuildingOfficeIcon,
      color: 'gold',
      gradient: 'from-gold-500 to-gold-700'
    },
    {
      key: 'develop' as const,
      title: 'DEVELOP',
      subtitle: 'Developers',
      description: 'Lease-up acceleration and post-handover QA',
      features: [
        'Absorption dashboards',
        'Pricing optimization models',
        'AI-powered snagging reports',
        'Handover process audits'
      ],
      icon: CogIcon,
      color: 'green',
      gradient: 'from-green-500 to-green-700'
    }
  ]

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Choose Your <span className="gradient-text">Entry Point</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Three specialized pathways, each designed for different objectives and risk profiles. 
            Institutional frameworks with boutique execution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doors.map((door, index) => (
            <motion.div
              key={door.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setActiveSection(door.key)}
            >
              <div className="relative bg-slate-800 rounded-2xl p-8 hover:bg-slate-750 transition-all hover-lift h-full border border-slate-700 hover:border-slate-600">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${door.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <door.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{door.title}</h3>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
                    {door.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {door.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {door.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 bg-${door.color}-400 rounded-full mt-2 flex-shrink-0`} />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Explore pathway</span>
                  <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${door.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800 rounded-xl p-8 max-w-4xl mx-auto border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Cross-Platform Intelligence</h3>
            <p className="text-slate-300 leading-relaxed">
              All pathways share our institutional-grade market intelligence, compliance framework, 
              and AI-powered analytics. Choose your entry point, but benefit from our complete ecosystem.
            </p>
            <div className="mt-6 flex justify-center space-x-6 text-sm text-slate-400">
              <span>• Real-time market data</span>
              <span>• Regulatory compliance</span>
              <span>• AI decision support</span>
              <span>• 24/7 partner access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
