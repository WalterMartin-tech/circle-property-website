'use client'

import { motion } from 'framer-motion'

export default function SLACommitments() {
  const commitments = [
    { metric: 'Response Time', essential: '24 hours', plus: '4 hours', privateOffice: '1 hour' },
    { metric: 'Viewing Coordination', essential: '72 hours', plus: '48 hours', privateOffice: '24 hours' },
    { metric: 'Offer Pack Delivery', essential: '48 hours', plus: '24 hours', privateOffice: '12 hours' },
    { metric: 'Due Diligence Report', essential: '7 days', plus: '5 days', privateOffice: '3 days' },
    { metric: 'Project Updates', essential: 'Weekly', plus: 'Bi-weekly', privateOffice: 'Daily' }
  ]

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Level Agreements</h2>
        <p className="text-slate-600">Guaranteed response times and delivery commitments</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Service Metric</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">Essential</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">Plus</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">Private Office</th>
              </tr>
            </thead>
            <tbody>
              {commitments.map((commitment, index) => (
                <tr key={commitment.metric} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-6 py-4 font-medium text-slate-900">{commitment.metric}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{commitment.essential}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{commitment.plus}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{commitment.privateOffice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  )
}
