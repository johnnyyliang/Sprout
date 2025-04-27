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
        data: [65, 70, 75, 80, 85, 85],
        borderColor: '#34D399', // soft mint green line
        backgroundColor: '#34D399', // matching color
        pointBackgroundColor: '#34D399', // dots same color
        pointBorderColor: '#ffffff', // white circle border around dots
        tension: 0.4, // curve the line a little
        fill: false, // no fill under line
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
      },
    ],
  };

  const donutChartOptions = {
    responsive: true,
    cutout: '40%', 
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false, // Hide x axis
        grid: {
          display: false,
        },
      },
      y: {
        display: false, // Hide y axis
        grid: {
          display: false,
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const, // Put legend at top
        align: 'start' as const, // Push it to the right
        labels: {
          color: '#ffffff', // make legend text white
          boxWidth: 20,
          boxHeight: 20,
          usePointStyle: true, // use a circle instead of a box for the legend icon
          pointStyle: 'circle', // make it a nice clean dot
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // x-axis labels white
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff', // y-axis labels white
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(255,255,255,0.2)'
        },
      },
    },
  };

  return (
    <div className="bg-[#1b462e] rounded-3xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">{companyName}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Score */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 flex flex-col justify-center items-center h-64">
          <h3 className="text-xl font-semibold text-white text-center mb-4">Overall ESG Score</h3>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-6xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {overallScore}
            </div>
          <div className="text-white/80 mt-2">out of 100</div>
          </div>
        </div>

        {/* ESG Breakdown */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 flex flex-col justify-center items-center h-64">
          <h3 className="text-xl font-semibold text-white text-center mb-4">ESG Breakdown</h3>
          <div className="flex items-center justify-center gap-8">
            {/* Legend */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#4ECDC4] rounded-full"></div>
                <span className="text-white">Environmental</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#FF6B6B] rounded-full"></div>
                <span className="text-white">Social</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#1E88E5] rounded-full"></div>
                <span className="text-white">Governance</span>
              </div>
            </div>

            {/* Doughnut Chart */}
            <div className="h-48 w-48">
              <Doughnut data={doughnutChartData} options={donutChartOptions} />
            </div>
          </div>
        </div>


        {/* Historical Performance */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
         <h3 className="text-xl font-semibold mb-4 text-white text-center">Historical Performance</h3>
         <div className="flex justify-center">
           <div className="h-64 w-full max-w-xl">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
         </div>
        </div>
       </div>
    </div>
  );
} 