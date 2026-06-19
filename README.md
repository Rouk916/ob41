<h1 align="center">🎧 OB41</h1>

<p align="center"><strong>DJ Montréalais</strong> — Hip-Hop · Afrobeat · R&B · Electronic</p>

<p align="center">
  <a href="https://rouk916.github.io/ob41/"><strong>🌐 Visiter le site →</strong></a>
</p>

---

## À propos

Site officiel du DJ montréalais **OB41**. Les clients y découvrent son univers et
**réservent une date en quelques clics**, pendant que le DJ gère ses disponibilités
en temps réel depuis un espace privé.

## ✨ Fonctionnalités

**Pour les visiteurs**
- 🎵 Présentation du DJ, de ses styles et de ses prestations (clubs, mariages, événements corporatifs, fêtes privées)
- 📅 Calendrier de réservation en ligne — choix de la date et du créneau disponible
- ✉️ Demande envoyée en un clic, réponse sous 24 h

**Pour le DJ**
- 🔐 Espace privé sécurisé pour ouvrir/fermer ses créneaux, jour par jour
- ⚡ Disponibilités mises à jour **en temps réel** pour tous les visiteurs
- 📥 Réception centralisée des demandes de réservation

## 🎨 Identité

- Design sombre & doré, ambiance premium
- Hero animé avec logo, diaporama photo (effet Ken Burns + reflet de lumière)
- Entièrement responsive — mobile & ordinateur

## 🛠️ Construit avec

`HTML` · `CSS` · `JavaScript` (sans framework) · `Supabase` (base de données + authentification) · `GitHub Pages`

---

<details>
<summary><strong>⚙️ Installation & déploiement (développeurs)</strong></summary>

<br>

### 1. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → colle le contenu de [`supabase-schema.sql`](supabase-schema.sql) → **Run**.
3. **Project Settings → API** → copie l'`URL` du projet et la clé `anon` / `publishable`.
4. Reporte ces deux valeurs dans [`assets/js/supabase-config.js`](assets/js/supabase-config.js).

> La clé publishable est conçue pour être publique — la sécurité repose sur les règles RLS du schéma.

### 2. Créer le compte du DJ

**Authentication → Users → Add user** (coche *Auto Confirm User*). Ces identifiants ouvrent `pages/admin.html`.

### 3. Déployer

Pousse le dépôt sur GitHub, puis **Settings → Pages → Branch : `main` / `(root)`**.

### Structure

```
index.html              Accueil (hero, services, contact)
404.html                Page d'erreur
pages/booking.html      Calendrier public de réservation
pages/admin.html        Espace privé du DJ
assets/css · js · images
supabase-schema.sql     Schéma de base de données
```

</details>

<p align="center"><sub>© 2026 OB41 — Tous droits réservés.</sub></p>
