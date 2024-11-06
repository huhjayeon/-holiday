import requests
import json
from datetime import datetime
import os

API_KEY = os.getenv("API_KEY")
countries = ["US", "AE", "SA", "QA", "OM", "CA", "AU", "FR", "GB", "DE", "KW"]
year = datetime.now().year
holidays_data = {}

for country in countries:
    url = f"https://calendarific.com/api/v2/holidays?&api_key={API_KEY}&country={country}&year={year}"
    response = requests.get(url)
    if response.status_code == 200:
        holidays_data[country] = response.json()['response']['holidays']
    else:
        print(f"Failed to fetch data for {country}. Status code: {response.status_code}")

with open('holidays.json', 'w') as f:
    json.dump(holidays_data, f, indent=2)
