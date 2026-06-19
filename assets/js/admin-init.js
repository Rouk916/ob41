// Chargement des disponibilités + reconnexion automatique

async function loadAvailability() {
  const { data, error } = await sb.from('availability').select('date, slots');
  availability = {};
  if (error) console.error('Chargement disponibilités :', error.message);
  if (data) data.forEach(row => { availability[row.date] = row.slots; });
  renderCalendar();
}

// Si une session Supabase est déjà active, on ouvre directement le panneau
(async () => {
  const { data } = await sb.auth.getSession();
  if (data.session) showAdmin();
})();
