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
        # Get company info first
        company = yf.Ticker(ticker)
        company_name = company.info.get('longName', ticker)
        
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
            return {"error": f"No data found for {ticker}"}

        # Resample data to get monthly averages
        monthly_data = stock['Close'].resample('ME').mean()
        
        # Format the data for the frontend
        dates = [d.strftime('%b') for d in monthly_data.index]
        # Convert numpy values to Python native types
        prices = [round(float(np.asarray(p).item()), 2) for p in monthly_data.values]
        
        # Create the response data
        response_data = {
            "labels": dates,
            "prices": prices,
            "companyName": company_name
        }
        
        return response_data
        
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        sys.exit(1)
    
    ticker = sys.argv[1]
    result = get_stock_data(ticker)
    print(json.dumps(result))
