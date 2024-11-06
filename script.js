document.addEventListener('DOMContentLoaded', () => {
    fetch('holidays.json')
        .then(response => response.json())
        .then(data => {
            // 공휴일 데이터를 로드하고 필터를 설정
            // 국가, 연도, 월별 필터링을 추가
        });
});
