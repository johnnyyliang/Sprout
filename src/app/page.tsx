import SearchBar from '@/components/SearchBar'

const features = [
  {
    title: 'Environmental Impact',
    description: 'Analyze companies\' carbon footprint and sustainability initiatives with detailed metrics and insights.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Growth Potential',
    description: 'Evaluate long-term growth prospects in sustainable markets with comprehensive real-time analysis.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Investment Insights',
    description: 'Access comprehensive analysis of sustainable investment opportunities and key ESG metrics.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gradient-to-br from-[#0d2b1e] via-[#123d15] to-[#1b5e20] relative z-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-7xl font-bold text-center mb-8 text-white">
          Sprout
        </h1>
        <p className="text-xl text-center mb-12 text-white/90">
          Discover sustainable investment opportunities by analyzing companies' environmental impact and growth potential.
        </p>
        
        <div className="w-full max-w-2xl mx-auto mb-16">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-[#4CAF50]/20 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
