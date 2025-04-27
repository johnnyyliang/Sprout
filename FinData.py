import yfinance as yf
import json
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import sys
import warnings
import urllib3
import os

# Suppress all warnings and redirect stderr
warnings.filterwarnings('ignore')
urllib3.disable_warnings()
os.environ['PYTHONWARNINGS'] = 'ignore'

def get_stock_data(ticker):
    try:
        # Get 6 months historical data
        end_date = datetime.now()
        start_date = end_date - timedelta(days=180)
        
        # Suppress all output during download
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        sys.stdout = open(os.devnull, 'w')
        sys.stderr = open(os.devnull, 'w')
        
        try:
            stock = yf.download(ticker, start=start_date, end=end_date, progress=False)
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr
        
        if stock.empty:
            print(json.dumps({"error": f"No data found for {ticker}"}))
            return

        # Resample data to get monthly averages
        monthly_data = stock['Close'].resample('ME').mean()
        
        # Format the data for the frontend
        dates = [d.strftime('%b') for d in monthly_data.index]
        # Convert numpy values to Python native types
        prices = [round(float(np.asarray(p).item()), 2) for p in monthly_data.values]
        
        # Create the response data
        response_data = {
            "labels": dates,
            "prices": prices
        }
        
        print(json.dumps(response_data))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        return

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python FinData.py <ticker>"}))
        sys.exit(1)
    
    ticker = sys.argv[1]
    get_stock_data(ticker)
