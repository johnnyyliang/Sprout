'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GradeCard from '@/components/GradeCard';

interface Breakdown {
  environmental: number;
  social: number;
  governance: number;
}

interface HistoryPoint {
  month: string;
  score: number;
}

interface CompanyData {
  ticker: string;
  overallScore: number;
  breakdown: Breakdown;
  history: HistoryPoint[];
}

export default function CompanyPage() {
  const params = useParams();
  const ticker = params.ticker as string;
  const [companyData, setCompanyData] = useState<{
    labels: string[];
    prices: number[];
    companyName: string;
    overallScore: number;
    breakdown: {
      environmental: number;
      social: number;
      governance: number;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        // Fetch ESG data
        const esgResponse = await fetch(`/api/esg/${ticker}`);
        if (!esgResponse.ok) {
          throw new Error('Failed to fetch ESG data');
        }
        const esgData = await esgResponse.json();

        // Fetch stock data to get company name
        const stockResponse = await fetch(`/api/stock/${ticker}`);
        if (!stockResponse.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const stockData = await stockResponse.json();

        // Combine the data
        setCompanyData({
          ...esgData,
          companyName: stockData.companyName || ticker,
          labels: stockData.labels || [],
          prices: stockData.prices || []
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [ticker]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center text-white text-2xl">Loading company data...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-2xl">{error}</div>
        ) : companyData ? (
          <>
            {/* Company Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {companyData.companyName || ticker}
              </h1>
            </div>

            {/* ESG Grade Card */}
            <div className="mb-12">
              <GradeCard
                companyName={companyData.companyName || ticker}
                ticker={ticker}
                overallScore={companyData.overallScore}
                environmentalScore={companyData.breakdown.environmental}
                socialScore={companyData.breakdown.social}
                governanceScore={companyData.breakdown.governance}
              />
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.05)'}}>
                <h3 className="text-xl font-semibold mb-2 text-white">Environmental Impact</h3>
                <p className="text-white/80">
                  Carbon footprint reduction initiatives and renewable energy usage.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.05)'}}>
                <h3 className="text-xl font-semibold mb-2 text-white">Social Responsibility</h3>
                <p className="text-white/80">
                  Employee welfare programs and community engagement efforts.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.05)'}}>
                <h3 className="text-xl font-semibold mb-2 text-white">Governance</h3>
                <p className="text-white/80">
                  Board diversity and corporate transparency measures.
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
} 