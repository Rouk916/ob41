// Rendu du calendrier public et sélection d'une date
function renderCalendar() {
  const year  = current.getFullYear();
  const month = current.getMonth();
  monthLabel.textContent = `${MONTHS_FR[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0,0,0,0);

  grid.innerHTML = '';

  // Cases vides avant le 1er
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.className = 'cal-day empty';
    grid.appendChild(blank);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isPast = date < today;
    const isToday = date.getTime() === today.getTime();
    const isSel = selectedDate &&
      selectedDate.getDate() === d &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;

    if (isPast)   el.classList.add('past');
    if (isToday)  el.classList.add('today');
    if (isSel)    el.classList.add('selected');
    if (!isPast)  el.classList.add('available');

    if (!isPast) {
      el.addEventListener('click', () => selectDate(new Date(year, month, d)));
    }

    grid.appendChild(el);
  }
}

function selectDate(date) {
  selectedDate = date;
  selectedSlot = null;
  renderCalendar();
  renderSlots(date);
  updateSummary();
}

document.getElementById('prev-month').addEventListener('click', () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
});
