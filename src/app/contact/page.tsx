export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Book a Discovery Call
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            20-minute conversation to understand your goals and see if we're a good fit.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 border border-slate-200">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Investment Goal</label>
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Select your primary goal</option>
                <option>Income generation</option>
                <option>Capital appreciation</option>
                <option>Portfolio diversification</option>
                <option>UAE residency</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range (Optional)</label>
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Prefer not to say</option>
                <option>Under AED 1M</option>
                <option>AED 1-3M</option>
                <option>AED 3-5M</option>
                <option>AED 5M+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message (Optional)</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any specific questions or requirements?"
              />
            </div>

            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-lg font-semibold text-lg transition-all hover-lift">
              Book Discovery Call
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
