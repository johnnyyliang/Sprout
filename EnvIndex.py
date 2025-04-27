import requests
from bs4 import BeautifulSoup
import sys
import time
import json
import random

def get_esg_scores(ticker):
    url = f"https://finance.yahoo.com/quote/{ticker}/sustainability"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0"
    }
    
    try:
        # Add a random delay to avoid rate limiting
        time.sleep(random.uniform(1, 3))
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Save the HTML for debugging
        with open('debug.html', 'w', encoding='utf-8') as f:
            f.write(response.text)
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Initialize scores
        scores = {
            'overall': None,
            'environmental': None,
            'social': None,
            'governance': None
        }
        
        # Map of data-testid attributes to score keys
        score_mappings = {
            'ENVIRONMENTAL_SCORE': 'environmental',
            'SOCIAL_SCORE': 'social',
            'GOVERNANCE_SCORE': 'governance',
            'TOTAL_ESG_SCORE': 'overall'
        }
        
        # Extract scores using data-testid attributes
        for testid, score_key in score_mappings.items():
            section = soup.find('section', {'data-testid': testid})
            if section:
                score_elem = section.find('h4')
                if score_elem:
                    try:
                        score = float(score_elem.text.strip())
                        if 0 <= score <= 100:
                            scores[score_key] = score
                    except (ValueError, TypeError):
                        continue
        
        # If we have no scores at all, try the fallback methods
        if all(v is None for v in scores.values()):
            # Try finding any scoreRank elements
            score_ranks = soup.find_all('div', class_='scoreRank')
            for rank in score_ranks:
                h4 = rank.find('h4')
                if h4:
                    try:
                        score = float(h4.text.strip())
                        if 0 <= score <= 100:
                            scores['overall'] = score
                            break
                    except ValueError:
                        continue
        
        return scores
        
    except requests.exceptions.RequestException as e:
        print(f"Network error fetching data for {ticker}: {e}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"Error processing data for {ticker}: {e}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python EnvIndex.py <ticker>", file=sys.stderr)
        sys.exit(1)
    
    ticker = sys.argv[1]
    scores = get_esg_scores(ticker)
    
    if scores:
        print(json.dumps(scores))
    else:
        print(json.dumps({
            'overall': None,
            'environmental': None,
            'social': None,
            'governance': None
        }))
