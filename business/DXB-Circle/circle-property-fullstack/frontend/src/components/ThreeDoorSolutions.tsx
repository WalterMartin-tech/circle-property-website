'use client'

import { ArrowRightIcon, ChartBarIcon, BuildingOfficeIcon, CogIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ThreeDoorSolutions() {
  const doors = [
    {
      key: 'invest',
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
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      link: '/strategy-playbooks#invest'
    },
    {
      key: 'own',
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
      color: 'green',
      gradient: 'from-green-500 to-green-700',
      link: '/tools#portfolio'
    },
    {
      key: 'develop',
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
      color: 'purple',
      gradient: 'from-purple-500 to-purple-700',
      link: '/tools#developer'
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
              className="group"
            >
              <Link href={door.link}>
                <div className="relative bg-slate-800 rounded-2xl p-8 hover:bg-slate-750 transition-all hover-lift h-full border border-slate-700 hover:border-slate-600 cursor-pointer">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${door.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <door.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{door.title}</h3>
                    <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">
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
                    <span className="text-sm text-slate-600">Explore pathway</span>
                    <ArrowRightIcon className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-2 transition-all" />
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${door.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                </div>
              </Link>
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
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
              <span>• Real-time market data</span>
              <span>• Regulatory compliance</span>
              <span>• AI decision support</span>
              <span>• 24/7 partner access</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift whitespace-nowrap">
              Book Discovery Call
            </Link>
            <Link href="/tools" className="border-2 border-slate-400 hover:border-slate-200 text-slate-200 hover:text-white bg-slate-800/30 hover:bg-slate-700/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift whitespace-nowrap">
              Try Our Tools
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
