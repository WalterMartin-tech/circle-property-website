import Hero from '@/components/Hero'
import LiveStats from '@/components/LiveStats'
import HowItWorks from '@/components/HowItWorks'
import StrategyTiles from '@/components/StrategyTiles'
import ProofModule from '@/components/ProofModule'
import ToolsTeaser from '@/components/ToolsTeaser'
import SocialProof from '@/components/SocialProof'
import ThreeDoorArchitecture from '@/components/ThreeDoorArchitecture'
import CredibilityStrip from '@/components/CredibilityStrip'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Live Market Data */}
      <LiveStats />
      
      {/* Credibility Strip - Trust Signals */}
      <CredibilityStrip />
      
      {/* How It Works - 3 Steps */}
      <HowItWorks />
      
      {/* Three Door Architecture - Main User Paths */}
      <ThreeDoorArchitecture />
      
      {/* Strategy Tiles - 5 Investment Strategies */}
      <StrategyTiles />
      
      {/* Proof Module - 2 Mini Case Studies */}
      <ProofModule />
      
      {/* Tools Teaser - Inline Calculators */}
      <ToolsTeaser />
      
      {/* Social Proof - Verifiable References */}
      <SocialProof />
    </main>
  )
}