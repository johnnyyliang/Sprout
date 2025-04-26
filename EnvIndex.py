import requests
from bs4 import BeautifulSoup
import sys
import time

def get_environmental_score(ticker):
    url = f"https://finance.yahoo.com/quote/{ticker}/sustainability"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Raise an exception for bad status codes
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try different possible class names and structures
        score_ranks = soup.find_all('div', {'class': ['scoreRank', 'scoreRank yf-y3c2sq', 'score-rank']})
        
        if not score_ranks:
            # Try finding by data-test attribute
            score_ranks = soup.find_all('div', {'data-test': 'score-rank'})
        
        if not score_ranks:
            # Try finding by role attribute
            score_ranks = soup.find_all('div', {'role': 'presentation'})
        
        if len(score_ranks) >= 1:
            # Try different ways to find the score
            score_element = None
            for rank in score_ranks:
                # Try finding h4
                score_element = rank.find('h4')
                if score_element:
                    break
                # Try finding span
                score_element = rank.find('span')
                if score_element:
                    break
                # Try finding div with specific class
                score_element = rank.find('div', {'class': 'score'})
                if score_element:
                    break
            
            if score_element and score_element.text:
                try:
                    score = float(score_element.text.strip())
                    if 0 <= score <= 100:  # Validate score range
                        return score
                except ValueError:
                    pass
        
        print(f"Could not find valid ESG score for {ticker}")
        return None
        
    except requests.exceptions.RequestException as e:
        print(f"Network error fetching data for {ticker}: {e}")
        return None
    except Exception as e:
        print(f"Error processing data for {ticker}: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) > 1:
        ticker = sys.argv[1]
        # Add a small delay to avoid rate limiting
        time.sleep(1)
        score = get_environmental_score(ticker)
        if score is not None:
            print(score)
        else:
            print("NaN")
