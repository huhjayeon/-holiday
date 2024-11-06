// 'Search' 버튼 클릭 시 공휴일 데이터를 로드
document.getElementById("searchButton").addEventListener("click", loadHolidays);

// 공휴일 데이터를 JSON 파일에서 가져와 필터에 맞게 렌더링
async function loadHolidays() {
    const country = document.getElementById("countrySelect").value;
    const year = document.getElementById("yearSelect").value;
    const month = document.getElementById("monthSelect").value;
    const response = await fetch("holidays.json");
    const data = await response.json();

    const holidays = data[country].filter(holiday => {
        const date = new Date(holiday.date.iso);
        return date.getFullYear() === parseInt(year) && (month === "all" || date.getMonth() + 1 === parseInt(month));
    });

    renderCalendar(year, month, holidays);
}

// 달력을 렌더링하고 공휴일을 날짜별로 표시
function renderCalendar(year, month, holidays) {
    const calendarContainer = document.getElementById("calendarContainer");
    calendarContainer.innerHTML = "";

    const daysInMonth = new Date(year, month === "all" ? 12 : month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const holiday = holidays.find(h => h.date.iso.startsWith(date));

        const dayDiv = document.createElement("div");
        dayDiv.className = "calendar-day";
        dayDiv.innerText = day;

        if (holiday) {
            const nameDiv = document.createElement("div");
            nameDiv.className = "holiday-name";
            nameDiv.innerText = holiday.name;

            const tooltipDiv = document.createElement("div");
            tooltipDiv.className = "holiday-tooltip";
            tooltipDiv.innerText = holiday.description;

            dayDiv.appendChild(nameDiv);
            dayDiv.appendChild(tooltipDiv);
        }

        calendarContainer.appendChild(dayDiv);
    }
}

// 필터 옵션을 동적으로 추가
async function populateFilters() {
    const countrySelect = document.getElementById("countrySelect");
    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");

    // 국가 목록 추가
    const countries = ["US", "AE", "SA", "QA", "OM", "CA", "AU", "FR", "GB", "DE", "KW"];
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.text = country;
        countrySelect.appendChild(option);
    });

    // 연도 옵션 추가
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    }

    // 월 옵션 추가
    const months = ["All Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index === 0 ? "all" : index;
        option.text = month;
        monthSelect.appendChild(option);
    });

    // 기본 선택값 설정
    countrySelect.value = countries[0];
    yearSelect.value = currentYear;
    monthSelect.value = "all";
}

// 페이지 로드 시 필터 초기화
document.addEventListener("DOMContentLoaded", populateFilters);

// 검색 결과 표시 후 스크롤 조정
document.getElementById("searchButton").addEventListener("click", () => {
    const calendarContainer = document.getElementById("calendarContainer");
    calendarContainer.scrollIntoView({ behavior: "smooth" });
});
