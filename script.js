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

    // 화면 맨 위로 스크롤 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 공휴일 정보를 텍스트 형식으로 화면에 표시
// 공휴일 정보를 텍스트 형식으로 화면에 표시
function displayHolidays(holidays) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // 이전 결과 초기화

    if (holidays.length === 0) {
        resultContainer.innerHTML = "<p>No holidays found for the selected criteria.</p>";
        return;
    }

    // 공휴일 이름과 날짜를 기준으로 중복 제거 및 타입 병합
    const mergedHolidays = holidays.reduce((acc, holiday) => {
        const key = `${holiday.name}-${holiday.date.iso}`;
        if (!acc[key]) {
            acc[key] = { ...holiday, type: [holiday.type] };
        } else {
            acc[key].type.push(holiday.type); // 기존 타입 배열에 추가
        }
        return acc;
    }, {});

    // 병합된 공휴일을 표시
    Object.values(mergedHolidays).forEach(holiday => {
        const holidayDiv = document.createElement("div");
        holidayDiv.className = "holiday-item";
        holidayDiv.innerHTML = `
            <h3>${holiday.name}</h3>
            <p><strong>Type:</strong> ${holiday.type.join(", ")}</p>
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

    // Month options
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

// 스크롤 이벤트: 일정 스크롤 이상 내려가면 버튼 표시
window.onscroll = function() {
    const topButton = document.getElementById("topButton");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

// 버튼 클릭 시 페이지 맨 위로 이동 (topbutton)
document.getElementById("topButton").onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};


