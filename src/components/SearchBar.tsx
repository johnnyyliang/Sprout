'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [ticker, setTicker] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticker.trim()) {
      router.push(`/company/${ticker.trim().toUpperCase()}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter company ticker (e.g., AAPL)"
          className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/30 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white px-6 py-2 rounded-xl hover:from-[#388E3C] hover:to-[#1B5E20] transition-all duration-300"
        >
          Search
        </button>
      </div>
    </form>
  )
} 