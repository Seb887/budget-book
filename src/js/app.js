'use strict';

// --- VARIABLES ---

const list = document.querySelector('.list');
const listContainer = document.querySelector('.list-container');
const noEntriesMessage = document.querySelector('#no-entries-message');

const inputDate = document.querySelector('#input-date');
const inputTitle = document.querySelector('#input-title');
const inputAmount = document.querySelector('#input-amount');
const inputTyp = document.querySelectorAll('#input-typ');
const submitBtn = document.querySelector('#submit-btn');

// --- FUNCTIONS ---

// Create HTML for list element
let createNewListItem = (obj) => {
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
    'w-4/12',
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
  list.appendChild(listItem);

  return listItem;
};

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
    // let removeItemTitle = e.target.parentElement.children[1].textContent;
    let removeItemId = e.target.parentElement.id;

    // console.log(removeItemTimestamp);

    entriesFromStorage = entriesFromStorage.filter(
      (item) => removeItemId != item.timestamp
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

function sortEntires(arr) {
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

// HTML aktualisieren
const refreshHTML = () => {
  clearList();
  clearInputs();

  // Get from local storage and create list HTML
  let entriesFromStorage = getEntriesFromLocalStorage();

  // Sort entries
  sortEntires(entriesFromStorage);

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
list.addEventListener('click', removeFromStorage);

window.onload = refreshHTML();

/////////////////////////
// FÜR SPÄTER AUFHEBEN //
/////////////////////////

// // Listenelemente sortieren
//
