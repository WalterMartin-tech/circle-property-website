import CaseStudyGrid from '@/components/CaseStudyGrid'
import CaseStudyDetail from '@/components/CaseStudyDetail'

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Case Studies
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real results from recent client engagements. Names anonymized, numbers verified. 
            Full economics with lessons learned.
          </p>
        </div>

        <CaseStudyGrid />
        <CaseStudyDetail />
      </div>
    </main>
  )
}
