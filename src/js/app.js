'use strict';

// console.log('HELLO WORLD');

// const modal = require('Modal');

// -----------------------------------------------------------

// VARIABLES

const monthList = document.querySelector('.monthList');

const inputDate = document.querySelector('#input-date');
const inputTitle = document.querySelector('#input-title');
const inputAmount = document.querySelector('#input-amount');
const inputTyp = document.querySelectorAll('#input-typ');
const submitBtn = document.querySelector('#submit-btn');

let entries = [];

// --- FUNCTIONS ---

// HTML für neuen Listeneintrag erstellen
const createNewListItem = (obj) => {
  const timestamp = Date.now();
  const listItem = document.createElement('li');
  // obj.typ === 'ausgabe'
  //   ? listItem.classList.add('ausgabe')
  //   : listItem.classList.add('einnahme');
  listItem.classList.add(
    'flex',
    'bg-slate-600',
    'text-gray-300',
    'border',
    'border-slate-900',
    'rounded-lg'
  );
  listItem.setAttribute('data-timestamp', timestamp);

  const date = document.createElement('span');
  date.classList.add(
    'p-2',
    'w-2/12',
    'text-center',
    'border-r',
    'border-slate-700'
  );
  date.id = 'elementDate';
  // date.textContent = obj.date.toLocaleDateString('de-DE', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  // });
  date.textContent = obj.date;

  const title = document.createElement('span');
  title.classList.add('elementTitle', 'p-2', 'w-7/12', 'pl-5', 'text-left');
  title.textContent = obj.title;

  const amount = document.createElement('span');
  amount.classList.add(
    'elementAmount',
    'p-2',
    'w-3/12',
    'text-right',
    'text-red-500',
    'font-medium',
    'border-r',
    'border-slate-700'
  );
  // if (obj.typ === 'ausgabe') {
  //   amount.classList.add('text-red-500');
  //   amount.textContent = `-${obj.amount.toFixed(2).replace(/\./, ',')} €`;
  // } else {
  //   amount.classList.add('text-green-500');
  //   amount.textContent = `${obj.amount.toFixed(2).replace(/\./, ',')} €`;
  // }
  amount.textContent = `-${obj.amount}`;

  const eintragLöschen = document.createElement('button');
  eintragLöschen.classList.add(
    'removeElement',
    'p-2',
    'text-center',
    'text-gray-900'
  );

  const eintragLöschenIcon = document.createElement('i');
  eintragLöschenIcon.classList.add('fa-solid', 'fa-trash');

  eintragLöschen.appendChild(eintragLöschenIcon);
  listItem.appendChild(date);
  listItem.appendChild(title);
  listItem.appendChild(amount);
  listItem.appendChild(eintragLöschen);
  monthList.appendChild(listItem);

  return listItem;
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

function addElement() {
  const newObj = {
    title: inputTitle.value,
    date: inputDate.value,
    amount: inputAmount.value,
    // typ: inputTyp.value,
  };
  entries.push(newObj);
  console.log(entries);

  refreshHTML();
}

function clearList() {
  monthList.innerHTML = '';
}

// HTML aktualisieren
const refreshHTML = () => {
  clearList();

  if (entries.length === 0) {
    monthList.style.display = 'none';
  }

  entries.forEach((e) => createNewListItem(e));
};

// EVENTS
submitBtn.addEventListener('click', addElement);

window.onload = refreshHTML();
