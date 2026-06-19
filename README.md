# 🎧 OBI41 — Site DJ

Site vitrine + système de réservation pour **OBI41**, DJ montréalais.
HTML / CSS / JavaScript pur (aucun build), base de données **Supabase**, hébergement **GitHub Pages**.

---

## 📁 Structure

```
site obi41/
├── index.html              Page d'accueil (hero, services, contact)
├── 404.html                Page d'erreur
├── pages/
│   ├── booking.html        Calendrier public de réservation
│   └── admin.html          Espace privé du DJ (disponibilités)
├── assets/
│   ├── css/                Styles découpés par composant (+ style/booking/admin.css)
│   ├── js/                 Scripts découpés par composant
│   └── images/             Images + favicon
├── supabase-schema.sql     Schéma de base de données à exécuter dans Supabase
├── .nojekyll               Désactive Jekyll sur GitHub Pages
└── README.md
```

---

## 🚀 Mise en ligne (3 étapes)

### 1. Configurer Supabase (base de données gratuite)

1. Crée un compte sur [supabase.com](https://supabase.com) → **New project**.
2. Une fois le projet créé : **SQL Editor → New query**, colle tout le contenu de
   [`supabase-schema.sql`](supabase-schema.sql) puis clique **Run**.
3. Récupère tes clés dans **Project Settings → API** :
   - `Project URL`
   - `anon public` key
4. Ouvre [`assets/js/supabase-config.js`](assets/js/supabase-config.js) et remplace
   `SUPABASE_URL` et `SUPABASE_ANON_KEY` par tes valeurs.

> La clé `anon public` est faite pour être publique : la sécurité est assurée par les
> règles RLS du fichier SQL (lecture des dispos pour tous, modification réservée au DJ).

### 2. Créer le compte DJ (connexion à l'admin)

Dans Supabase : **Authentication → Users → Add user** → saisis le courriel et le mot
de passe du DJ. Ce sont ces identifiants qui ouvrent la page `pages/admin.html`.

### 3. Déployer sur GitHub Pages

1. Crée un dépôt GitHub et pousse tout le contenu de ce dossier.
2. Dépôt → **Settings → Pages** → *Branch* : `main`, *Folder* : `/ (root)` → **Save**.
3. Le site sera en ligne sous quelques minutes à l'adresse indiquée.

---

## 🛠️ Utilisation

| Page | Rôle |
|------|------|
| `index.html` | Vitrine + formulaire de contact rapide |
| `pages/booking.html` | Les visiteurs choisissent date + créneau et envoient une demande |
| `pages/admin.html` | Le DJ se connecte et ouvre/ferme ses créneaux par jour |

- Les **disponibilités** réglées par le DJ sont visibles instantanément par tous les visiteurs.
- Les **réservations** reçues apparaissent dans Supabase → **Table Editor → `bookings`**.

---

## 🎨 Personnalisation rapide

- **Couleurs** : variables `--accent` / `--accent2` en haut de `assets/css/base.css`.
- **Réseaux sociaux** : liens `href="#"` dans le footer de `index.html`.
- **Coordonnées** : courriel / téléphone dans `index.html`.
- **Créneaux horaires** : tableau `TIME_SLOTS` (mêmes valeurs dans les fichiers
  `booking-config.js` et `admin-config.js`).

---

## ⚠️ Notes

- Le lien « Retour à l'accueil » de `404.html` pointe vers `/`. Si tu déploies dans un
  sous-dossier (`username.github.io/mon-repo/`), remplace-le par `/mon-repo/`.
- Aucune dépendance à installer : le client Supabase est chargé via CDN.
