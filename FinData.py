import yfinance as yf
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

def analyze_stock(ticker):
    # 1. Get 1 year historical data
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)
    
    stock = yf.download(ticker, start=start_date, end=end_date)
    
    if stock.empty:
        print(f"No data found for {ticker}")
        return
    
    # 2. Plot historical close prices
    plt.figure(figsize=(10,5))
    plt.plot(stock.index, stock['Close'], label='Close Price')
    plt.title(f'{ticker} Closing Price Over Last Year')
    plt.xlabel('Date')
    plt.ylabel('Price ($)')
    plt.legend()
    plt.grid(True)
    
    plt.show(block=False)
    plt.pause(3)
    plt.close()
    
    # 3. Predict future growth using Linear Regression
    stock = stock.reset_index()
    stock['Days'] = (stock['Date'] - stock['Date'].min()).dt.days
    X = stock[['Days']]
    y = stock['Close']
    
    model = LinearRegression()
    model.fit(X, y)
    
    # Predict price 365 days into the future
    future_day = np.array([[stock['Days'].max() + 365]])
    predicted_price = model.predict(future_day)[0].item()  # ensure float
    current_price = float(stock['Close'].iloc[-1])          # ensure float
    
    # 4. Decide Invest or Not
    growth_percentage = float((predicted_price - current_price) / current_price * 100)
    decision = "INVEST ✅" if growth_percentage > 10 else "DON'T INVEST ❌"
    
    # 5. Output
    print(f"\n=== {ticker} Analysis ===")
    print(f"Current Price: ${current_price:.2f}")
    print(f"Projected Price in 1 Year: ${predicted_price:.2f}")
    print(f"Expected Growth: {growth_percentage:.2f}%")
    print(f"Decision: {decision}\n")

# Example usage
if __name__ == "__main__":
    analyze_stock('AAPL')
