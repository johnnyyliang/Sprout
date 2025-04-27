import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  const ticker = params.ticker;

  try {
    const pythonProcess = spawn('python3', [
      path.join(process.cwd(), 'EnvIndex.py'),
      ticker
    ]);

    return new Promise((resolve) => {
      let data = '';
      let error = '';

      pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
      });

      pythonProcess.stderr.on('data', (chunk) => {
        error += chunk.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          resolve(NextResponse.json(
            { error: 'Failed to fetch ESG data', details: error },
            { status: 500 }
          ));
          return;
        }

        const overallScore = parseFloat(data.trim());
        if (isNaN(overallScore)) {
          resolve(NextResponse.json(
            { error: 'No ESG data available' },
            { status: 404 }
          ));
          return;
        }

        // Mock breakdown and history for now
        const breakdown = {
          environmental: Math.round(overallScore * 0.33),
          social: Math.round(overallScore * 0.33),
          governance: Math.round(overallScore * 0.34),
        };
        const history = [
          { month: 'Jan', score: Math.max(0, overallScore - 20) },
          { month: 'Feb', score: Math.max(0, overallScore - 15) },
          { month: 'Mar', score: Math.max(0, overallScore - 10) },
          { month: 'Apr', score: Math.max(0, overallScore - 5) },
          { month: 'May', score: Math.max(0, overallScore - 2) },
          { month: 'Jun', score: overallScore },
        ];

        resolve(NextResponse.json({
          ticker,
          overallScore,
          breakdown,
          history
        }));
      });
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 