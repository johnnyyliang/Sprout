interface GrowthMetricsCardProps {
  revenueGrowth1Y: number
  revenueGrowth3Y: number
  forwardEpsGrowth?: number
}

export default function GrowthMetricsCard({
  revenueGrowth1Y,
  revenueGrowth3Y,
  forwardEpsGrowth,
}: GrowthMetricsCardProps) {
  const formatGrowth = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Growth Analysis</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">1-Year Revenue Growth</p>
          <p className="text-2xl font-bold">{formatGrowth(revenueGrowth1Y)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">3-Year Revenue Growth</p>
          <p className="text-2xl font-bold">{formatGrowth(revenueGrowth3Y)}</p>
        </div>
        {forwardEpsGrowth !== undefined && (
          <div>
            <p className="text-sm text-gray-600">Forward EPS Growth</p>
            <p className="text-2xl font-bold">
              {formatGrowth(forwardEpsGrowth)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 