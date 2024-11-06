import requests
import json
from datetime import datetime

API_KEY = "K9Q4h6VOX0IvCFcutwNBcoNQSlOb3uM3"
countries = ["US", "CA", "AU", "AE", "SA", "QA", "OM", "KW", "FR", "GB", "DE", "ES", "KR", "JP", "CN", "RU"]
year = datetime.now().year
holidays_data = {}

for country in countries:
    url = f"https://calendarific.com/api/v2/holidays?&api_key={API_KEY}&country={country}&year={year}"
    response = requests.get(url)
    if response.status_code == 200:
        print(f"Successfully fetched data for {country}")
        holidays_data[country] = response.json()['response']['holidays']
    else:
        print(f"Failed to fetch data for {country}. Status code: {response.status_code}")

# JSON 파일에 저장
with open('holidays.json', 'w') as f:
    json.dump(holidays_data, f, indent=2)
    print("Data written to holidays.json")
