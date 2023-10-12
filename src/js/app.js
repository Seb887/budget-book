'use strict';

// --- VARIABLES ---

const listsSection = document.querySelector('.lists-section');
const monthList = document.querySelector('.month-list');
const listContainer = document.querySelector('.list-container');
const noEntriesMessage = document.querySelector('#no-entries-message');

const inputDate = document.querySelector('#input-date');
const inputTitle = document.querySelector('#input-title');
const inputAmount = document.querySelector('#input-amount');
const inputTyp = document.querySelectorAll('#input-typ');
const submitBtn = document.querySelector('#submit-btn');

// --- CLASSES ---

class Eintrag {
  constructor(title, date, typ, amount, timestamp) {
    this._title = title;
    this._date = date;
    this._typ = typ;
    this._amount = amount;
    this._timestamp = Date.now();
  }

  title() {
    return this._title;
  }

  date() {
    return this._date;
  }

  typ() {
    return this._typ;
  }

  amount() {
    return this._amount;
  }

  timestamp() {
    return this._timestamp;
  }

  _createHTML() {
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
    listItem.id = this._timestamp;

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
      'w-8/12',
      'min-w-[250px]',
      'pl-2',
      'text-left',
      'font-bold'
    );
    title.textContent = obj.title;

    const amount = document.createElement('span');
    amount.classList.add(
      'elementAmount',
      'p-2',
      'w-5/12',
      'min-w-[120px]',
      'text-right',
      'text-red-500',
      'font-medium',
      'border-r',
      'border-slate-700'
    );
    amount.textContent = amount.textContent = `-${obj.amount} €`;

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
    monthList.appendChild(listItem);

    return listItem;
  }
}

// --- FUNCTIONS ---

// Create HTML for article (title, month list)
// function createNewArticle(month, year) {
//   const article = document.createElement('article');
//   article.classList.add(
//     'list-container',
//     'p-5',
//     'bg-slate-800',
//     'border',
//     'border-slate-500',
//     'rounded-xl',
//     'w-8/12',
//     'min-w-min',
//     'h-min'
//   );

//   const headerOne = document.createElement('h1');
//   headerOne.classList.add(
//     'list-title',
//     'pl-1',
//     'pb-5',
//     'text-gray-300',
//     'text-2xl',
//     'font-bold'
//   );
//   headerOne.textContent = 'Oktober 2023';

//   const ulElement = document.createElement('ul');
//   ulElement.classList.add('month-list', 'space-y-3');

//   article.appendChild(headerOne);
//   article.appendChild(ulElement);
//   listsSection.appendChild(article);

//   let entriesFromStorage = getEntriesFromLocalStorage();
//   entriesFromStorage.forEach((e) => createNewListItem(e));
// }

// Create HTML for list element
function createNewListItem(obj) {
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
  listItem.id = obj.timestamp;

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
    'w-8/12',
    'min-w-[250px]',
    'pl-2',
    'text-left',
    'font-bold'
  );
  title.textContent = obj.title;

  const amount = document.createElement('span');
  amount.classList.add(
    'elementAmount',
    'p-2',
    'w-5/12',
    'min-w-[120px]',
    'text-right',
    'text-red-500',
    'font-medium',
    'border-r',
    'border-slate-700'
  );
  amount.textContent = amount.textContent = `-${obj.amount} €`;

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
  monthList.appendChild(listItem);

  return listItem;
}

function addNewEntry() {
  // Check inputs for completion
  if (!(inputTitle.value && inputDate.value && inputAmount.value)) {
    alert('Please fill the form!');
    return;
  } else {
    addEntryToLocalStorage();
  }
}

function addEntryToLocalStorage() {
  const entriesFromStorage = getEntriesFromLocalStorage();
  const timestamp = Date.now();

  let newObj = {
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
    const listElement = e.target.parentElement;
    let removeItemId = listElement.id;

    entriesFromStorage = entriesFromStorage.filter(
      (item) => removeItemId != item.timestamp
    );

    localStorage.setItem('entries', JSON.stringify(entriesFromStorage));
  }

  refreshHTML();
}

function clearList() {
  while (monthList.firstChild) {
    monthList.removeChild(monthList.firstChild);
  }
}
function clearInputs() {
  inputTitle.value = '';
  // inputDate.value = '';
  inputAmount.value = '';
}

function sortByDate(arr) {
  arr.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    } else if (a.date < b.date) {
      return 1;
    } else {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else {
        return 1;
      }
    }
  });
}

// function sortByMonthYear(arr) {
//   let entriesFromStorage = getEntriesFromLocalStorage();
// }

// HTML aktualisieren

const refreshHTML = () => {
  clearList();
  clearInputs();

  // Get from local storage and create list HTML
  let entriesFromStorage = getEntriesFromLocalStorage();

  // Sort entries
  sortByDate(entriesFromStorage);

  entriesFromStorage.forEach((e) => createNewListItem(e));

  // Control list area
  if (entriesFromStorage.length === 0) {
    listContainer.style.display = 'none';
    noEntriesMessage.style.display = 'flex';
  } else {
    listContainer.style.display = 'block';
    noEntriesMessage.style.display = 'none';
  }
};

// EVENTS
submitBtn.addEventListener('click', addNewEntry);
listContainer.addEventListener('click', removeFromStorage);

window.onload = refreshHTML();

/////////////////////////
// FÜR SPÄTER AUFHEBEN //
/////////////////////////

// // Listenelemente sortieren
//
