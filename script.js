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

function populateFilters() {
    const countries = ["US", "AE", "SA", "QA", "OM", "CA", "AU", "FR", "GB", "DE", "KW"];
    const countrySelect = document.getElementById("countrySelect");
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.text = country;
        countrySelect.add(option);
    });

    const yearSelect = document.getElementById("yearSelect");
    for (let year = 2020; year <= 2030; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelect.add(option);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateFilters();
});
