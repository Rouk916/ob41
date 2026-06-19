// Gestion des créneaux d'une journée
const slotsEmpty   = document.getElementById('slots-empty');
const slotsContent = document.getElementById('slots-content');
const slotsList    = document.getElementById('slots-list');
const dateLabel    = document.getElementById('slots-date-label');
const saveBtn      = document.getElementById('btn-save');

function openDay(key, date) {
  selectedDateKey = key;
  renderCalendar();

  const saved = availability[key] || {};
  tempSlots = {};
  TIME_SLOTS.forEach(s => { tempSlots[s] = saved[s] !== undefined ? saved[s] : true; });

  dateLabel.textContent = date.toLocaleDateString('fr-CA', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  renderSlots();
  slotsEmpty.classList.add('hidden');
  slotsContent.classList.remove('hidden');
  saveBtn.classList.remove('saved');
  saveBtn.innerHTML = '<i class="fas fa-check"></i> Sauvegarder';
}

function renderSlots() {
  slotsList.innerHTML = '';
  TIME_SLOTS.forEach(slot => {
    const isOpen = tempSlots[slot];
    const row = document.createElement('div');
    row.className = `slot-row ${isOpen ? 'open' : 'closed'}`;
    row.innerHTML = `
      <span class="slot-time">${slot}</span>
      <label class="slot-toggle">
        <input type="checkbox" ${isOpen ? 'checked' : ''} data-slot="${slot}" />
        <span class="toggle-track"></span>
        <span class="toggle-label">${isOpen ? 'Ouvert' : 'Fermé'}</span>
      </label>`;

    const cb = row.querySelector('input');
    cb.addEventListener('change', () => {
      tempSlots[slot] = cb.checked;
      row.className = `slot-row ${cb.checked ? 'open' : 'closed'}`;
      row.querySelector('.toggle-label').textContent = cb.checked ? 'Ouvert' : 'Fermé';
      saveBtn.classList.remove('saved');
      saveBtn.innerHTML = '<i class="fas fa-check"></i> Sauvegarder';
    });

    slotsList.appendChild(row);
  });
}

document.getElementById('btn-all-open').addEventListener('click', () => {
  TIME_SLOTS.forEach(s => { tempSlots[s] = true; });
  renderSlots();
});

document.getElementById('btn-all-close').addEventListener('click', () => {
  TIME_SLOTS.forEach(s => { tempSlots[s] = false; });
  renderSlots();
});

saveBtn.addEventListener('click', async () => {
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
  const { error } = await sb.from('availability').upsert({
    date: selectedDateKey,
    slots: tempSlots,
    updated_at: new Date().toISOString()
  });
  if (error) {
    saveBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erreur';
    console.error('Sauvegarde disponibilités :', error.message);
    return;
  }
  availability[selectedDateKey] = { ...tempSlots };
  renderCalendar();
  saveBtn.classList.add('saved');
  saveBtn.innerHTML = '<i class="fas fa-check-circle"></i> Sauvegardé !';
});
