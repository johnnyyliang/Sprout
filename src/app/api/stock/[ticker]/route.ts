import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  const ticker = params.ticker;

  try {
    console.log(`Fetching stock data for ${ticker}`);
    const pythonProcess = spawn('/usr/bin/python3', [
      path.join(process.cwd(), 'FinData.py'),
      ticker
    ]);

    return new Promise((resolve) => {
      let data = '';
      let error = '';

      pythonProcess.stdout.on('data', (chunk) => {
        const chunkStr = chunk.toString();
        console.log('Python stdout:', chunkStr);
        data += chunkStr;
      });

      pythonProcess.stderr.on('data', (chunk) => {
        const chunkStr = chunk.toString();
        try {
          // Try to parse as JSON for debug messages
          const debugInfo = JSON.parse(chunkStr);
          if (debugInfo.debug) {
            console.log('Debug:', debugInfo.debug);
            return;
          }
        } catch (e) {
          // Not JSON, treat as regular error
          console.error('Python stderr:', chunkStr);
        }
        error += chunkStr;
      });

      pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        
        if (code !== 0) {
          console.error('Process error:', error);
          resolve(NextResponse.json(
            { error: 'Failed to fetch stock data', details: error },
            { status: 500 }
          ));
          return;
        }

        try {
          const trimmedData = data.trim();
          console.log('Trying to parse:', trimmedData);
          const stockData = JSON.parse(trimmedData);
          
          if (stockData.error) {
            console.error('Stock data error:', stockData.error);
            resolve(NextResponse.json(
              { error: stockData.error },
              { status: 400 }
            ));
            return;
          }
          
          resolve(NextResponse.json(stockData));
        } catch (e) {
          console.error('Failed to parse stock data:', e);
          console.error('Raw data:', data);
          resolve(NextResponse.json(
            { error: 'Failed to parse stock data', details: e instanceof Error ? e.message : String(e) },
            { status: 500 }
          ));
        }
      });
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 