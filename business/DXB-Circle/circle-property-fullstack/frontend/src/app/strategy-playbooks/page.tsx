import StrategyOverview from '@/components/StrategyOverview'
import StrategyDetails from '@/components/StrategyDetails'
import InvestmentMemos from '@/components/InvestmentMemos'
import QuietListingsVault from '@/components/QuietListingsVault'
import RiskFramework from '@/components/RiskFramework'

export default function StrategyPlaybooksPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Investment Strategy Playbooks
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Six proven strategies mapped to your objectives, risk tolerance, and timeline. 
            Each playbook includes rules, exit criteria, and realistic expectations.
          </p>
        </div>

        {/* Strategy Overview */}
        <StrategyOverview />

        {/* Detailed Strategy Cards */}
        <StrategyDetails />

        {/* Sample Investment Memos */}
        <InvestmentMemos />

        {/* Quiet Listings Vault */}
        <QuietListingsVault />

        {/* Risk Management Framework */}
        <div className="mt-20">
          <RiskFramework />
        </div>
      </div>
    </main>
  )
}
