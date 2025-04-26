import { NextResponse } from 'next/server'
import { CompanyData } from '@/lib/types'
import { execSync } from 'child_process'

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const ticker = params.ticker.toUpperCase()

    // Call the Python script to get the environmental score
    let esgScore: number | null = null
    try {
      const output = execSync(`python3 EnvIndex.py ${ticker}`).toString().trim()
      esgScore = isNaN(Number(output)) ? null : Number(output)
    } catch (e) {
      esgScore = null
    }

    // TODO: Replace the rest with real data as needed
    const data: CompanyData = {
      ticker,
      name: ticker, // Placeholder, ideally fetch real name
      esgScore: esgScore ?? 0,
      esgGrade: esgScore !== null ? (esgScore < 20 ? 'Green' : esgScore < 40 ? 'Yellow' : 'Red') : 'Red',
      carbonIntensity: null,
      revenueGrowth1Y: 0,
      revenueGrowth3Y: 0,
      forwardEpsGrowth: 0,
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch company data' },
      { status: 500 }
    )
  }
} 