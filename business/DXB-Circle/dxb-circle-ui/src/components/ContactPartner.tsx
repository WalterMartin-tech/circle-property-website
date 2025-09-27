import { PhoneIcon, CalendarDaysIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function ContactPartner() {
  const partners = [
    {
      name: 'Victor Khalil',
      title: 'Senior Partner',
      specialization: 'HNWI Portfolio Strategy',
      experience: '12 years Dubai property',
      languages: ['English', 'Arabic', 'French'],
      whatsapp: '+971501234567',
      calendar: 'https://cal.com/victor-khalil'
    },
    {
      name: 'Sarah Al-Mansoori',
      title: 'Partner',
      specialization: 'Development & Leasing',
      experience: '8 years institutional real estate',
      languages: ['English', 'Arabic', 'Russian'],
      whatsapp: '+971501234568',
      calendar: 'https://cal.com/sarah-almansoori'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Speak to a Partner
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real expertise, not sales scripts. Our partners average 10+ years in Dubai property markets 
            and speak your language—literally and figuratively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all hover-lift"
            >
              {/* Partner Photo Placeholder */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {partner.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              {/* Partner Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{partner.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{partner.title}</p>
                <p className="text-slate-600 text-sm mb-3">{partner.specialization}</p>
                <p className="text-slate-500 text-xs">{partner.experience}</p>
              </div>

              {/* Languages */}
              <div className="flex justify-center space-x-2 mb-6">
                {partner.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-1 bg-white text-slate-600 text-xs rounded-full border border-slate-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${partner.whatsapp.replace(/[^0-9]/g, '')}`}
                  className="flex items-center justify-center space-x-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors group"
                >
                  <PhoneIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">WhatsApp</span>
                  <span className="text-green-100 text-sm">{partner.whatsapp}</span>
                </a>

                <a
                  href={partner.calendar}
                  className="flex items-center justify-center space-x-3 w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors group"
                >
                  <CalendarDaysIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Book 30-min consultation</span>
                </a>
              </div>

              {/* Consultation Details */}
              <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-2">What to expect:</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Market conditions & opportunity assessment</li>
                  <li>• Yield projections with risk analysis</li>
                  <li>• Regulatory & compliance overview</li>
                  <li>• Next steps & timeline discussion</li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Contact Options */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-slate-900 text-white p-8 rounded-xl max-w-3xl mx-auto">
            <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-gold-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Prefer a Different Approach?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-medium mb-2">Email Brief</div>
                <div className="text-slate-300">Send your requirements via partners@dxbcircle.com</div>
              </div>
              <div>
                <div className="font-medium mb-2">Telegram</div>
                <div className="text-slate-300">Voice notes welcome @DXBCirclePartners</div>
              </div>
              <div>
                <div className="font-medium mb-2">Office Visit</div>
                <div className="text-slate-300">DIFC office by appointment only</div>
              </div>
            </div>
            <div className="mt-6 text-xs text-slate-400">
              Response time: Within 4 hours during business days, 24 hours on weekends
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
