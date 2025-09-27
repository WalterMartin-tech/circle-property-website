import { ShieldCheckIcon, DocumentTextIcon, BanknotesIcon } from '@heroicons/react/24/outline'

export default function ComplianceBar() {
  const complianceItems = [
    {
      icon: ShieldCheckIcon,
      label: 'RERA Licensed',
      detail: 'RERA/DLD/1578/2023',
      description: 'Dubai real estate regulatory authority'
    },
    {
      icon: DocumentTextIcon,
      label: 'DET Compliant',
      detail: 'DET/STL/2023/089',
      description: 'Dubai economy & tourism registered'
    },
    {
      icon: BanknotesIcon,
      label: 'Escrow Protected',
      detail: 'ADCB Trust Account',
      description: 'Client funds held separately'
    }
  ]

  const processSteps = [
    'Inquiry',
    'NDA',
    'Due Diligence',
    'Offer',
    'Legal Review',
    'Escrow',
    'Registration',
    'Handover',
    'Management',
    'Reporting'
  ]

  return (
    <footer className="bg-slate-900 text-white py-8 border-t border-slate-800">
      <div className="container mx-auto px-6">
        {/* Compliance Credentials */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {complianceItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-gold-400 text-xs font-mono">{item.detail}</div>
                <div className="text-slate-400 text-xs mt-1">{item.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="border-t border-slate-800 pt-6">
          <h3 className="text-sm font-medium text-slate-300 mb-4 text-center">
            10-Step Transaction Process
          </h3>
          <div className="flex flex-wrap justify-center items-center space-x-2 text-xs">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-slate-800 text-slate-300 px-2 py-1 rounded">
                  {step}
                </div>
                {index < processSteps.length - 1 && (
                  <div className="text-slate-600 mx-1">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t border-slate-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <div className="mb-4 md:mb-0">
              <p>© 2025 DXB Circle Property Management LLC. All rights reserved.</p>
              <p className="mt-1">
                Office 1205, Level 12, Al Sila Tower, ADGM Square, Al Maryah Island, Abu Dhabi
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/disclosures" className="hover:text-white transition-colors">Risk Disclosures</a>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="border-t border-slate-800 pt-4 mt-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Important:</strong> Property investments carry risk. Yields are projections based on current market conditions and are not guaranteed. 
            Past performance does not predict future results. All financial projections include assumptions that may not materialize. 
            Regulatory requirements and market conditions may change. Consult independent financial and legal advisors before investing.
          </p>
        </div>
      </div>
    </footer>
  )
}
