import scholarly
import pandas as pd
import time
from datetime import datetime

def fetch_author_publications(author_name):
    """
    Fetch publications for a given author from Google Scholar
    """
    try:
        # Search for the author
        search_query = scholarly.search_author(author_name)
        author = next(search_query)
        
        # Fill in all available author data
        author = scholarly.fill(author)
        
        # Create a list to store publication data
        publications = []
        
        # Iterate through publications
        for pub in author.publications:
            # Fill in publication details
            pub_filled = scholarly.fill(pub)
            
            # Extract relevant information
            pub_data = {
                'title': pub_filled.bib.get('title', ''),
                'author': pub_filled.bib.get('author', ''),
                'year': pub_filled.bib.get('year', ''),
                'venue': pub_filled.bib.get('journal', pub_filled.bib.get('conference', '')),
                'citations': pub_filled.citedby,
                'url': pub_filled.bib.get('url', ''),
                'abstract': pub_filled.bib.get('abstract', '')
            }
            
            publications.append(pub_data)
            
            # Add delay to avoid hitting rate limits
            time.sleep(2)
        
        # Create DataFrame
        df = pd.DataFrame(publications)
        
        # Save to TSV
        filename = f"publications_{datetime.now().strftime('%Y%m%d')}.tsv"
        df.to_csv(filename, sep='\t', index=False)
        print(f"Publications saved to {filename}")
        
        return df
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def main():
    # Replace with your name as it appears on Google Scholar
    author_name = "Your Name"
    publications = fetch_author_publications(author_name)
    
if __name__ == "__main__":
    main()