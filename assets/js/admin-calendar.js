// Rendu du calendrier admin
const grid       = document.getElementById('calendar-grid');
const monthLabel = document.getElementById('month-label');

function dateKey(y, m, d) { return `${y}-${m+1}-${d}`; }

function dayStatus(key) {
  const slots = availability[key];
  if (!slots) return 'none';
  const vals = Object.values(slots);
  if (vals.every(v => v))  return 'available';
  if (vals.every(v => !v)) return 'unavailable';
  return 'partial';
}

function renderCalendar() {
  const year  = current.getFullYear();
  const month = current.getMonth();
  monthLabel.textContent = `${MONTHS_FR[month]} ${year}`;

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);

  grid.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const b = document.createElement('div');
    b.className = 'cal-day empty';
    grid.appendChild(b);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isPast = date < today;
    const key = dateKey(year, month, d);
    const status = dayStatus(key);

    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;

    if (isPast)   el.classList.add('past');
    if (date.getTime() === today.getTime()) el.classList.add('today');
    if (key === selectedDateKey) el.classList.add('selected');
    if (status === 'available')   el.classList.add('day-available');
    if (status === 'unavailable') el.classList.add('day-unavailable');
    if (status === 'partial')     el.classList.add('day-partial');

    if (!isPast) el.addEventListener('click', () => openDay(key, date));
    grid.appendChild(el);
  }
}

document.getElementById('prev-month').addEventListener('click', () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
});
document.getElementById('next-month').addEventListener('click', () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
});
