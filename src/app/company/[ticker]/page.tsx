'use client';

import { useParams } from 'next/navigation';
import GradeCard from '@/components/GradeCard';

// Mock data - in a real app, this would come from an API
const getCompanyData = (ticker: string) => {
  const mockData = {
    AAPL: {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      overallScore: 85,
      environmentalScore: 90,
      socialScore: 80,
      governanceScore: 85,
      description: 'Apple Inc. is a technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.',
      industry: 'Technology',
      marketCap: '2.8T',
      lastUpdated: '2024-03-15'
    },
    MSFT: {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      overallScore: 88,
      environmentalScore: 85,
      socialScore: 90,
      governanceScore: 89,
      description: 'Microsoft Corporation develops, licenses, and supports software products and services.',
      industry: 'Technology',
      marketCap: '3.1T',
      lastUpdated: '2024-03-15'
    },
    // Add more mock data as needed
  };

  return mockData[ticker as keyof typeof mockData] || {
    ticker,
    name: 'Company Not Found',
    overallScore: 0,
    environmentalScore: 0,
    socialScore: 0,
    governanceScore: 0,
    description: 'No data available for this company.',
    industry: 'Unknown',
    marketCap: 'N/A',
    lastUpdated: 'N/A'
  };
};

export default function CompanyPage() {
  const params = useParams();
  const ticker = params.ticker as string;
  const companyData = getCompanyData(ticker);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Company Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD700]">
            {companyData.name}
          </h1>
          <div className="text-xl text-white/80">
            {companyData.ticker} • {companyData.industry} • Market Cap: ${companyData.marketCap}
          </div>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            {companyData.description}
          </p>
        </div>

        {/* ESG Grade Card */}
        <div className="mb-12">
          <GradeCard
            companyName={companyData.name}
            overallScore={companyData.overallScore}
            environmentalScore={companyData.environmentalScore}
            socialScore={companyData.socialScore}
            governanceScore={companyData.governanceScore}
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#4ECDC4] rounded-2xl p-6 border-4 border-[#FFD700]">
            <h3 className="text-xl font-semibold mb-2 text-white">Environmental Impact</h3>
            <p className="text-white/80">
              Carbon footprint reduction initiatives and renewable energy usage.
            </p>
          </div>
          <div className="bg-[#4ECDC4] rounded-2xl p-6 border-4 border-[#FFD700]">
            <h3 className="text-xl font-semibold mb-2 text-white">Social Responsibility</h3>
            <p className="text-white/80">
              Employee welfare programs and community engagement efforts.
            </p>
          </div>
          <div className="bg-[#4ECDC4] rounded-2xl p-6 border-4 border-[#FFD700]">
            <h3 className="text-xl font-semibold mb-2 text-white">Governance</h3>
            <p className="text-white/80">
              Board diversity and corporate transparency measures.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-white/60">
          Last updated: {companyData.lastUpdated}
        </div>
      </div>
    </main>
  );
} 