// Authentification de l'espace DJ via Supabase Auth
const loginScreen = document.getElementById('login-screen');
const adminPanel  = document.getElementById('admin-panel');
const emailInput  = document.getElementById('email-input');
const pwdInput    = document.getElementById('pwd-input');
const loginError  = document.getElementById('login-error');

document.getElementById('toggle-pwd').addEventListener('click', () => {
  pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
});

document.getElementById('login-btn').addEventListener('click', tryLogin);
pwdInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

async function tryLogin() {
  loginError.textContent = '';
  const { error } = await sb.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: pwdInput.value
  });
  if (error) {
    console.error('Connexion :', error.message);
    if (/not confirmed/i.test(error.message)) {
      loginError.textContent = 'Compte non confirmé — confirme l\'utilisateur dans Supabase.';
    } else if (/invalid/i.test(error.message)) {
      loginError.textContent = 'Courriel ou mot de passe incorrect.';
    } else {
      loginError.textContent = error.message;
    }
    pwdInput.value = '';
    return;
  }
  showAdmin();
}

async function showAdmin() {
  loginScreen.classList.add('hidden');
  adminPanel.classList.remove('hidden');
  await loadAvailability();
}

document.getElementById('logout-btn').addEventListener('click', async () => {
  await sb.auth.signOut();
  location.reload();
});
