import requests
import json

# API 설정
API_KEY = "K9Q4h6VOX0IvCFcutwNBcoNQSlOb3uM3"
BASE_URL = "https://calendarific.com/api/v2"

def fetch_available_countries():
    """API에서 제공하는 국가 목록을 가져옵니다."""
    response = requests.get(f"{BASE_URL}/countries?api_key={API_KEY}")
    if response.status_code == 200:
        countries_data = response.json()['response']['countries']
        return [country['iso-3166'] for country in countries_data]
    else:
        print("Failed to fetch country data")
        return []

def fetch_available_years():
    """가능한 연도의 범위를 설정합니다."""
    current_year = 2024  # 원하는 기본 연도 설정
    future_years = range(current_year, current_year + 2)  # 필요에 따라 연도 범위 조정
    return future_years

def fetch_holidays():
    """API에서 모든 국가와 연도의 공휴일 데이터를 가져옵니다."""
    countries = fetch_available_countries()
    years = fetch_available_years()
    holidays_data = {}

    for country in countries:
        for year in years:
            print(f"Fetching data for {country} in {year}")
            params = {
                "api_key": API_KEY,
                "country": country,
                "year": year
            }
            response = requests.get(f"{BASE_URL}/holidays", params=params)
            if response.status_code == 200:
                holidays_data[country] = holidays_data.get(country, []) + response.json()['response']['holidays']
            else:
                print(f"Failed to fetch data for {country} in {year}")

    # JSON 파일로 저장
    with open("holidays.json", "w") as f:
        json.dump(holidays_data, f, indent=2)

if __name__ == "__main__":
    fetch_holidays()
