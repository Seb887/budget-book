'use strict';

///////////////
// TEST AREA //
///////////////

// console.log('TEST: Hello World');

// const newDate = new Date(Date.UTC(2012, 11, 20, 3, 0, 0)).toLocaleDateString(
//   'de-DE',
//   {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   }
// );
// console.log(newDate);

// const modal = require('Modal');

// -----------------------------------------------------------

// --- VARIABLES ---

const list = document.querySelector('.list');

const inputDate = document.querySelector('#input-date');
const inputTitle = document.querySelector('#input-title');
const inputAmount = document.querySelector('#input-amount');
const inputTyp = document.querySelectorAll('#input-typ');
const submitBtn = document.querySelector('#submit-btn');
const timestamp = Date.now();

let entries = [];

// --- FUNCTIONS ---

// Create HTML for list element
const createNewListItem = (obj) => {
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
    'w-auto',
    'text-center',
    'border-r',
    'border-slate-700'
  );
  date.id = 'elementDate';
  date.textContent = obj.date;

  const title = document.createElement('span');
  title.classList.add(
    'elementTitle',
    'p-2',
    'w-7/12',
    'pl-2',
    'text-left',
    'font-bold'
  );
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
  amount.textContent = amount.textContent = `-${obj.amount} €`;

  // const removeElement = document.createElement('button');
  // removeElement.classList.add(
  // 'removeElement', 'p-2', 'text-center', 'text-gray-900';
  // );

  const removeIcon = document.createElement('i');
  removeIcon.classList.add(
    'fa-solid',
    'fa-trash',
    'removeElement',
    'flex',
    'items-center',
    'p-2',
    'text-center',
    'text-gray-900'
  );

  listItem.appendChild(date);
  listItem.appendChild(title);
  listItem.appendChild(amount);
  listItem.appendChild(removeIcon);
  list.appendChild(listItem);

  return listItem;
};

function addEntryToLocalStorage() {
  const entriesFromStorage = getEntriesFromLocalStorage();

  const newObj = {
    title: inputTitle.value,
    date: new Date(inputDate.value).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    amount: parseFloat(inputAmount.value).toFixed(2).replace(/\./, ','),
    timestamp: timestamp,
  };

  entriesFromStorage.push(newObj);
  localStorage.setItem('entries', JSON.stringify(entriesFromStorage));
  console.log(entriesFromStorage);

  refreshHTML();
}

function getEntriesFromLocalStorage() {
  let entriesFromStorage;

  if (localStorage.getItem('entries') === null) {
    entriesFromStorage = [];
  } else {
    entriesFromStorage = JSON.parse(localStorage.getItem('entries'));
  }

  return entriesFromStorage;
}

function removeFromStorage(e) {
  let entriesFromStorage = getEntriesFromLocalStorage();

  if (e.target.classList.contains('removeElement')) {
    let removeItemTitle = e.target.parentElement.children[1].textContent;
    // let removeItemTimestamp = e.target.parentElement.timestamp;

    entriesFromStorage = entriesFromStorage.filter(
      (item) => removeItemTitle != item.title
      // removeItemTimestamp != item.timestamp
    );

    localStorage.setItem('entries', JSON.stringify(entriesFromStorage));
  }

  refreshHTML();
}

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}
function clearInputs() {
  inputTitle.value = '';
  // inputDate.value = '';
  inputAmount.value = '';
}

// HTML aktualisieren
const refreshHTML = () => {
  clearList();
  clearInputs();

  // if (entries.length === 0) {
  //   monthList.style.display = 'none';
  // }

  const entriesFromStorage = getEntriesFromLocalStorage();

  entriesFromStorage.forEach((e) => createNewListItem(e));
};

// EVENTS
submitBtn.addEventListener('click', addEntryToLocalStorage);
list.addEventListener('click', removeFromStorage);

window.onload = refreshHTML();

/////////////////////////
// FÜR SPÄTER AUFHEBEN //
/////////////////////////

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
