'use strict';

// const modal = require('Modal');

// -----------------------------------------------------------

const ulElement = document.querySelector('.liste');

const inputTyp = document.querySelectorAll('.inputTyp');
const inputDatum = document.querySelector('#inputDatum');
const inputTitel = document.querySelector('#inputTitel');
const inputBetrag = document.querySelector('#inputBetrag');

// console.log(newEntryButton);

let eintraege = [];

// --- FUNCTIONS ---

// HTML für neuen Listeneintrag erstellen
const createNewListItem = (obj) => {
  const timestamp = Date.now();

  const listenelement = document.createElement('li');
  obj.typ === 'ausgabe'
    ? listenelement.classList.add('ausgabe')
    : listenelement.classList.add('einnahme');
  listenelement.classList.add(
    'grid',
    'grid-cols-12',
    'bg-slate-600',
    'text-gray-300',
    'rounded-lg'
  );
  listenelement.setAttribute('data-timestamp', timestamp);

  const datum = document.createElement('span');
  datum.classList.add(
    'eingabeDatum',
    'p-2',
    'col-span-2',
    'text-center',
    'border-r',
    'border-slate-700'
  );
  // console.log(typeof obj.datum);
  datum.textContent = obj.datum.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const titel = document.createElement('span');
  titel.classList.add(
    'eingabeTitel',
    'p-2',
    'pl-5',
    'col-start-3',
    'col-span-6',
    'text-left'
  );
  titel.textContent = obj.titel;

  const betrag = document.createElement('span');
  betrag.classList.add(
    'eingabeBetrag',
    'p-2',
    'pr-5',
    'col-start-9',
    'col-span-3',
    'text-right',
    // 'text-red-500',
    'font-medium',
    'border-r',
    'border-slate-700'
  );
  if (obj.typ === 'ausgabe') {
    betrag.classList.add('text-red-500');
    betrag.textContent = `-${obj.betrag.toFixed(2).replace(/\./, ',')} €`;
  } else {
    betrag.classList.add('text-green-500');
    betrag.textContent = `${obj.betrag.toFixed(2).replace(/\./, ',')} €`;
  }

  const eintragLöschen = document.createElement('button');
  eintragLöschen.classList.add(
    'eintragLöschen',
    'p-2',
    'col-start-12',
    'col-span-1',
    'text-center',
    'text-gray-900'
  );

  const eintragLöschenIcon = document.createElement('i');
  eintragLöschenIcon.classList.add('fa-solid', 'fa-trash');

  eintragLöschen.appendChild(eintragLöschenIcon);
  listenelement.appendChild(datum);
  listenelement.appendChild(titel);
  listenelement.appendChild(betrag);
  listenelement.appendChild(eintragLöschen);
  ulElement.appendChild(listenelement);

  return listenelement;
};

// // Listenelemente sortieren
// const eintraegeSort = () => {
//   eintraege.sort((a, b) => {
//     if (a.datum > b.datum) {
//       return -1;
//     } else if (a.datum < b.datum) {
//       return 1;
//     } else {
//       if (a.timestamp > b.timestamp) {
//         return -1;
//       } else {
//         return 1;
//       }
//     }
//   });
//   return eintraege;
// };

// HTML aktualisieren
const htmlAktualisieren = () => {
  clearList();
  eintraege.forEach((e) => createNewListItem(e));
};
