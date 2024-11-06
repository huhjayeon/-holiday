// JSON 파일 불러오기 및 초기화
async function loadHolidays() {
    try {
        const response = await fetch('holidays.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to load holidays:", error);
    }
}

// 국가, 연도, 월 초기화
async function initializeFilters() {
    const data = await loadHolidays();

    if (!data) return;

    const countries = Object.keys(data);
    const currentYear = new Date().getFullYear();
    
    // 국가 필터 채우기
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // 연도 필터 채우기 (현재 연도 기준으로 5년 전부터)
    const yearSelect = document.getElementById('year');
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// 공휴일 필터링
async function filterHolidays() {
    const data = await loadHolidays();
    if (!data) return;

    const country = document.getElementById('country').value;
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;

    const holidays = data[country] || [];
    const filteredHolidays = holidays.filter(holiday => {
        const holidayDate = new Date(holiday.date.iso);
        const holidayYear = holidayDate.getFullYear();
        const holidayMonth = holidayDate.getMonth() + 1; // 월은 0부터 시작하므로 +1

        return (
            holidayYear == year && 
            (month === "all" || holidayMonth == month)
        );
    });

    displayHolidays(filteredHolidays);
}

// 공휴일 결과 표시
function displayHolidays(holidays) {
    const resultsContainer = document.getElementById('holiday-results');
    resultsContainer.innerHTML = ""; // 초기화

    if (holidays.length === 0) {
        resultsContainer.textContent = "No holidays found.";
        return;
    }

    holidays.forEach(holiday => {
        const holidayDiv = document.createElement('div');
        holidayDiv.classList.add('holiday-item');
        
        holidayDiv.innerHTML = `
            <h3>${holiday.name}</h3>
            <p>${holiday.description}</p>
            <p><strong>Date:</strong> ${holiday.date.iso}</p>
            <p><strong>Type:</strong> ${holiday.type.join(', ')}</p>
        `;

        resultsContainer.appendChild(holidayDiv);
    });
}

// 초기화 실행
initializeFilters();
