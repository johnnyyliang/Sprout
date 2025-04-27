'use client';

import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface GradeCardProps {
  companyName: string;
  overallScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
}

export default function GradeCard({
  companyName,
  overallScore,
  environmentalScore,
  socialScore,
  governanceScore
}: GradeCardProps) {
  // Line chart data for historical performance
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'ESG Score Trend',
        data: [65, 70, 75, 80, 85, overallScore],
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Doughnut chart data for ESG breakdown
  const doughnutChartData = {
    labels: ['Environmental', 'Social', 'Governance'],
    datasets: [
      {
        data: [environmentalScore, socialScore, governanceScore],
        backgroundColor: [
          '#4ECDC4',
          '#FF6B6B',
          '#1E88E5',
        ],
        borderColor: '#FFD700',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#FFFFFF',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
    },
  };

  return (
    <div className="bg-[#1b462e] rounded-3xl p-8 border-4 border-[#292824] shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">{companyName}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Score */}
        <div className="bg-[#497f69] rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-white">Overall ESG Score</h3>
          <div className="text-5xl font-bold text-white">{overallScore}</div>
          <div className="text-white/80 mt-2">out of 100</div>
        </div>

        {/* ESG Breakdown */}
        <div className="bg-[#497f69] rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-white text-center">ESG Breakdown</h3>
          <div className="h-48">
            <Doughnut data={doughnutChartData} options={chartOptions} />
          </div>
        </div>

        {/* Historical Performance */}
        <div className="md:col-span-2 bg-[#497f69] rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-white text-center">Historical Performance</h3>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
} 