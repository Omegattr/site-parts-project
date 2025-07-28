const monthEl = document.getElementById("month");
const dayNameEl = document.getElementById("day");
const dayNumEl = document.getElementById("day-number");
const yearEl = document.getElementById("year");
const todayLabel = document.getElementById("today-label");

const prevBtn = document.getElementById("prev-day");
const nextBtn = document.getElementById("next-day");

let date = new Date();

function isToday(dateObj) {
  const now = new Date();
  return (
    dateObj.getFullYear() === now.getFullYear() &&
    dateObj.getMonth() === now.getMonth() &&
    dateObj.getDate() === now.getDate()
  );
}

function updateCalendar() {
  monthEl.innerHTML = date.toLocaleDateString("ja", {
    month: "long",
  });
  dayNameEl.innerHTML = date.toLocaleDateString("ja", {
    weekday: "long",
  });
  dayNumEl.innerHTML = date.getDate() + '日';
  yearEl.innerHTML = date.getFullYear() + '年';

  // 曜日ごとに色を変える
  const weekColors = {
    "日曜日": "#e57373",   // 赤
    "月曜日": "#64b5f6",   // 青
    "火曜日": "#81c784",   // 緑
    "水曜日": "#ffd54f",   // 黄
    "木曜日": "#ba68c8",   // 紫
    "金曜日": "#ffb74d",   // オレンジ
    "土曜日": "#4fc3f7"    // 水色
  };
  const dayName = date.toLocaleDateString("ja", { weekday: "long" });
  dayNameEl.style.color = weekColors[dayName] || "#333";

  // 本日なら「today」ラベルを表示
  if (isToday(date)) {
    todayLabel.style.display = "inline-block";
  } else {
    todayLabel.style.display = "none";
  }
}

function animateDayNumber(direction) {
  dayNumEl.classList.remove('slide-in-right', 'slide-in-left');
  void dayNumEl.offsetWidth;
  if (direction === 'right') {
    dayNumEl.classList.add('slide-in-right');
  } else if (direction === 'left') {
    dayNumEl.classList.add('slide-in-left');
  }
}

prevBtn.addEventListener("click", () => {
  date.setDate(date.getDate() - 1);
  updateCalendar();
  animateDayNumber('right');
});
nextBtn.addEventListener("click", () => {
  date.setDate(date.getDate() + 1);
  updateCalendar();
  animateDayNumber('left');
});

updateCalendar();
