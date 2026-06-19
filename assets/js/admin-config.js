// Configuration et état partagé de l'espace admin
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const TIME_SLOTS = ['17h00','18h00','19h00','20h00','21h00','22h00','23h00','00h00'];

// availability: { "2026-6-14": { "18h00": true, "20h00": false, ... }, ... }
// true = ouvert, false = fermé — chargé depuis Supabase à la connexion
let availability = {};

let current = new Date();
let selectedDateKey = null;
let tempSlots = {};
