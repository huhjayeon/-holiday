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

function renderCalendar(year, month, holidays) {
    const calendarContainer = document.getElementById("calendarContainer");
    calendarContainer.innerHTML = "";

    const daysInMonth = new Date(year, month === "all" ? 12 : month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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

async function populateFilters() {
    const countrySelect = document.getElementById("countrySelect");
    const yearSelect = document.getElementById("yearSelect");

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

    // Default selection
    countrySelect.value = countries[0];
    yearSelect.value = currentYear;
}

document.addEventListener("DOMContentLoaded", populateFilters);

document.getElementById("searchButton").addEventListener("click", () => {
    // 검색 결과 표시 후 스크롤을 검색 필터 아래로 조정
    const holidayList = document.getElementById("holidayList");
    holidayList.scrollIntoView({ behavior: "smooth" });
});

