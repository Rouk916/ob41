// Affichage des créneaux disponibles et résumé de la sélection
function renderSlots(date) {
  const key = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const label = date.toLocaleDateString('fr-CA', { weekday:'long', day:'numeric', month:'long' });
  const daySlots = availabilityCache[key];
  const slotsMsg = document.getElementById('slots-msg');

  dateLabel.textContent = label;
  slotsGrid.innerHTML = '';

  // Combien de créneaux sont réellement ouverts ce jour-là ?
  const openCount = TIME_SLOTS.filter(s => !daySlots || daySlots[s] !== false).length;

  // Aucune plage disponible → message explicite, on masque la grille
  if (openCount === 0) {
    slotsGrid.hidden = true;
    slotsMsg.hidden = false;
    slotsWrap.classList.add('visible');
    return;
  }

  slotsGrid.hidden = false;
  slotsMsg.hidden = true;

  TIME_SLOTS.forEach(slot => {
    // Si le DJ n'a rien configuré, tout est ouvert par défaut
    const isOpen = !daySlots || daySlots[slot] !== false;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'slot-btn' + (!isOpen ? ' booked' : '');
    btn.textContent = slot;
    btn.disabled = !isOpen;
    if (!isOpen) btn.title = 'Non disponible';

    if (isOpen) {
      btn.addEventListener('click', () => selectSlot(slot, btn));
    }
    slotsGrid.appendChild(btn);
  });

  slotsWrap.classList.add('visible');
}

function selectSlot(slot, btn) {
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSlot = slot;
  updateSummary();
}

function updateSummary() {
  if (!selectedDate) return;

  const dateStr = selectedDate.toLocaleDateString('fr-CA', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const slotStr = selectedSlot ? ` — ${selectedSlot}` : '';

  summary.querySelector('p').textContent = dateStr + slotStr;
  summary.classList.toggle('active', !!selectedSlot);

  hiddenDate.value = dateStr;
  hiddenSlot.value = selectedSlot || '';

  const ready = !!selectedSlot;
  submitBtn.disabled = !ready;
  submitBtn.classList.toggle('ready', ready);
  submitBtn.querySelector('span').textContent = ready
    ? 'Confirmer la réservation'
    : 'Sélectionnez un créneau horaire';
}
