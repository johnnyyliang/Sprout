import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Eco-Invest: Sustainable Investment Analysis
        </h1>
        <p className="text-xl mb-8">
          Search for companies to analyze their environmental impact and growth potential
        </p>
        <SearchBar />
      </div>
    </main>
  )
} 