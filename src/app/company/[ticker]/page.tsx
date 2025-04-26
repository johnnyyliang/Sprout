import { CompanyData } from '@/lib/types'
import EsgGradeCard from '@/components/EsgGradeCard'
import GrowthMetricsCard from '@/components/GrowthMetricsCard'

async function getCompanyData(ticker: string): Promise<CompanyData> {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/company/${ticker}`);
  if (!res.ok) {
    throw new Error('Failed to fetch company data')
  }
  return res.json()
}

export default async function CompanyPage({
  params,
}: {
  params: { ticker: string }
}) {
  const companyData = await getCompanyData(params.ticker)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {companyData.name} ({companyData.ticker})
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <EsgGradeCard
            esgScore={companyData.esgScore}
            esgGrade={companyData.esgGrade}
            carbonIntensity={companyData.carbonIntensity}
          />
          <GrowthMetricsCard
            revenueGrowth1Y={companyData.revenueGrowth1Y}
            revenueGrowth3Y={companyData.revenueGrowth3Y}
            forwardEpsGrowth={companyData.forwardEpsGrowth}
          />
        </div>
      </div>
    </main>
  )
} 