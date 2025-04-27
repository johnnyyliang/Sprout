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

        try {
          const scores = JSON.parse(data.trim());
          
          // Check if we have any valid scores
          if (!scores.overall && !scores.environmental && !scores.social && !scores.governance) {
            resolve(NextResponse.json(
              { error: 'No ESG data available' },
              { status: 404 }
            ));
            return;
          }

          // Generate history data based on the overall score
          const history = [
            { month: 'Jan', score: Math.max(0, (scores.overall || 0) - 20) },
            { month: 'Feb', score: Math.max(0, (scores.overall || 0) - 15) },
            { month: 'Mar', score: Math.max(0, (scores.overall || 0) - 10) },
            { month: 'Apr', score: Math.max(0, (scores.overall || 0) - 5) },
            { month: 'May', score: Math.max(0, (scores.overall || 0) - 2) },
            { month: 'Jun', score: scores.overall || 0 },
          ];

          resolve(NextResponse.json({
            ticker,
            overallScore: scores.overall || 0,
            breakdown: {
              environmental: scores.environmental || 0,
              social: scores.social || 0,
              governance: scores.governance || 0,
            },
            history
          }));
        } catch (e) {
          console.error('Failed to parse ESG data:', e);
          resolve(NextResponse.json(
            { error: 'Failed to parse ESG data' },
            { status: 500 }
          ));
        }
      });
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 