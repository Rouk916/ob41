// Configuration, état et références DOM de la page réservation
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const TIME_SLOTS = ['17h00','18h00','19h00','20h00','21h00','22h00','23h00','00h00'];

let current = new Date();
let selectedDate = null;
let selectedSlot = null;
let availabilityCache = {}; // { "2026-6-14": { "17h00": true, ... }, ... }

const grid       = document.getElementById('calendar-grid');
const monthLabel = document.getElementById('month-label');
const slotsWrap  = document.getElementById('slots-wrap');
const slotsGrid  = document.getElementById('slots-grid');
const dateLabel  = document.getElementById('selected-date-label');
const summary    = document.getElementById('summary');
const submitBtn  = document.getElementById('submit-btn');
const hiddenDate = document.getElementById('hidden-date');
const hiddenSlot = document.getElementById('hidden-slot');
