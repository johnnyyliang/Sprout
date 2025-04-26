import { NextResponse } from 'next/server'
import { CompanyData } from '@/lib/types'

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const ticker = params.ticker.toUpperCase()
    
    // TODO: Replace with actual API calls
    // This is mock data for now
    const mockData: CompanyData = {
      ticker,
      name: 'Example Company',
      esgScore: 75,
      esgGrade: 'Green',
      carbonIntensity: 2.5,
      revenueGrowth1Y: 15.5,
      revenueGrowth3Y: 25.8,
      forwardEpsGrowth: 12.3,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch company data' },
      { status: 500 }
    )
  }
} 