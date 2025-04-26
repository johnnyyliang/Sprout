import requests
from bs4 import BeautifulSoup

def get_environmental_score(ticker):
    url = f"https://finance.yahoo.com/quote/{ticker}/sustainability"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    try:
        # Find all divs with class 'scoreRank'
        score_ranks = soup.find_all('div', {'class': 'scoreRank yf-y3c2sq'})
        
        if len(score_ranks) >= 1:
            # Environmental Risk Score is usually the first one
            env_score = score_ranks[0].find('h4').text
            return float(env_score)
        else:
            return None
    except Exception as e:
        print(f"Error fetching Environmental Risk Score for {ticker}: {e}")
        return None

# Example usage:
tickers = ['AAPL', 'MSFT', 'TSLA', 'GOOGL']

for ticker in tickers:
    score = get_environmental_score(ticker)
    print(f"{ticker} Environmental Risk Score: {score}")
