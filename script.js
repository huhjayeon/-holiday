// 검색 버튼 클릭 시 공휴일 데이터 로드
document.getElementById("searchButton").addEventListener("click", loadHolidays);

// 공휴일 데이터를 불러와 필터를 적용하고 표시
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

    displayHolidays(holidays);
}

// 공휴일 정보를 텍스트 형식으로 화면에 표시
function displayHolidays(holidays) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // 이전 결과 초기화

    if (holidays.length === 0) {
        resultContainer.innerHTML = "<p>해당 조건의 공휴일이 없습니다.</p>";
        return;
    }

    holidays.forEach(holiday => {
        const holidayDiv = document.createElement("div");
        holidayDiv.className = "holiday-item";
        holidayDiv.innerHTML = `
            <h3>${holiday.name}</h3>
            <p><strong>Type:</strong> ${holiday.type}</p>
            <p><strong>Description:</strong> ${holiday.description || "No description available."}</p>
            <p><strong>Date:</strong> ${holiday.date.iso}</p>
        `;
        resultContainer.appendChild(holidayDiv);
    });
}

// 필터를 채우는 함수
async function populateFilters() {
    const countrySelect = document.getElementById("countrySelect");
    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");

    const countries = ["US", "AE", "SA", "QA", "OM", "CA", "AU", "FR", "GB", "DE", "KW"];
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.text = country;
        countrySelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    }

    const months = ["All Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index === 0 ? "all" : index;
        option.text = month;
        monthSelect.appendChild(option);
    });

    countrySelect.value = countries[0];
    yearSelect.value = currentYear;
    monthSelect.value = "all";
}

document.addEventListener("DOMContentLoaded", populateFilters);
