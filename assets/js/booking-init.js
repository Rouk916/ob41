// Chargement des disponibilités depuis Supabase + envoi de la réservation

async function loadAvailability() {
  const { data, error } = await sb.from('availability').select('date, slots');
  availabilityCache = {};
  if (error) console.error('Chargement disponibilités :', error.message);
  if (data) data.forEach(row => { availabilityCache[row.date] = row.slots; });
  renderCalendar();
}

document.getElementById('booking-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = submitBtn;
  const span = btn.querySelector('span');
  span.textContent = 'Envoi en cours...';
  btn.disabled = true;

  const fd = new FormData(e.target);
  const { error } = await sb.from('bookings').insert({
    nom: fd.get('nom'),
    email: fd.get('email'),
    telephone: fd.get('telephone'),
    type: fd.get('type'),
    duree: fd.get('duree'),
    lieu: fd.get('lieu'),
    message: fd.get('message'),
    date_reservee: fd.get('date_reservee'),
    heure_reservee: fd.get('heure_reservee')
  });

  if (error) {
    span.textContent = 'Erreur — réessayer';
    btn.disabled = false;
    console.error('Envoi réservation :', error.message);
    return;
  }

  e.target.reset();
  btn.classList.remove('ready');
  span.textContent = 'Demande envoyée ✓';
});

loadAvailability();
