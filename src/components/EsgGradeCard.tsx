interface EsgGradeCardProps {
  esgScore: number
  esgGrade: 'Green' | 'Yellow' | 'Red'
  carbonIntensity?: number
}

export default function EsgGradeCard({
  esgScore,
  esgGrade,
  carbonIntensity,
}: EsgGradeCardProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Green':
        return 'bg-green-100 text-green-800'
      case 'Yellow':
        return 'bg-yellow-100 text-yellow-800'
      case 'Red':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">ESG Analysis</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">ESG Score</p>
          <p className="text-2xl font-bold">{esgScore}/100</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Green Grade</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(
              esgGrade
            )}`}
          >
            {esgGrade}
          </span>
        </div>
        {carbonIntensity && (
          <div>
            <p className="text-sm text-gray-600">Carbon Intensity</p>
            <p className="text-lg font-medium">
              {carbonIntensity.toFixed(2)} tCO2e/$M
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 