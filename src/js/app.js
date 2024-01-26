'use strict';

// --- VARIABLES ---

const test = 0;

// DOM variables
const sectionRight = document.querySelector('.section-right');
const monthList = document.querySelector('.month-list');
const listContainer = document.querySelector('.list-container');
const noEntriesMessage = document.querySelector('#no-entries-message');
const monthsDropdown = document.querySelector('#months-dropdown');
const yearsDropdown = document.querySelector('#years-dropdown');
const month = document.querySelectorAll('.month');
const year = document.querySelectorAll('.year');

// Input variables
const inputDate = document.querySelector('#input-date');
const inputTitle = document.querySelector('#input-title');
const inputAmount = document.querySelector('#input-amount');
const inputTyp = document.querySelectorAll('#input-typ');
const typeExpense = document.querySelector('#type-expense');
const typeIncome = document.querySelector('#type-income');
const submitBtn = document.querySelector('#submit-btn');
let editModeIsOn = false;
let editObj;

// Balance variables
const balance = document.querySelector('#balance');

// Time variables
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let dateNow = new Date();
let currentMonthName = months[dateNow.getMonth()];
let currentYear = dateNow.getFullYear();
let currentInputDate = dateNow;

// --- FUNCTIONS ---

// Create HTML for list element
function createNewListItemHTML(obj) {
  const listItem = document.createElement('li');
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
  date.textContent = new Date(obj.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const title = document.createElement('span');
  title.classList.add(
    'p-2',
    'w-8/12',
    'min-w-[250px]',
    'pl-2',
    'text-left',
    'font-bold'
  );
  title.id = 'elementTitle';
  title.textContent = obj.title;

  const amount = document.createElement('span');
  amount.classList.add(
    'p-2',
    'w-5/12',
    'min-w-[120px]',
    'max-w-[120px]',
    'text-right',
    'font-medium',
    'border-slate-700'
  );
  amount.id = 'elementAmount';

  if (obj.type === 'expense') {
    amount.classList.add('text-red-500');
    amount.textContent = `-${(obj.amount / 100)
      .toFixed(2)
      .replace('.', ',')} €`;
  } else if (obj.type === 'income') {
    amount.classList.add('text-green-500');
    amount.textContent = `+${(obj.amount / 100)
      .toFixed(2)
      .replace('.', ',')} €`;
  }

  const editIcon = document.createElement('i');
  editIcon.classList.add(
    'fa-solid',
    'fa-pen-to-square',
    'editElement',
    'flex',
    'items-center',
    'p-2',
    'text-center',
    'text-gray-300'
  );

  const removeIcon = document.createElement('i');
  removeIcon.classList.add(
    'fa-solid',
    'fa-trash',
    'removeElement',
    'flex',
    'items-center',
    'p-2',
    'text-center',
    'text-gray-300'
  );

  const actions = document.createElement('div');
  actions.classList.add(
    'actions',
    'flex',
    'items-center',
    'text-center',
    'text-gray-900'
    // 'border'
  );

  actions.appendChild(editIcon);
  actions.appendChild(removeIcon);

  listItem.appendChild(date);
  listItem.appendChild(title);
  listItem.appendChild(actions);
  listItem.appendChild(amount);
  monthList.appendChild(listItem);

  return listItem;
}

function createNewEntry() {
  let newObj = {
    title: inputTitle.value,
    date: new Date(inputDate.value),
    type: getInputType(),
    amount: parseFloat(inputAmount.value) * 100,
    timestamp: Date.now(),
  };

  currentInputDate = new Date(inputDate.value);

  addEntryToLocalStorage(newObj);
}

function getInputType() {
  if (typeExpense.checked) {
    return 'expense';
  } else if (typeIncome.checked) {
    return 'income';
  }
}

function addNewEntry() {
  // Check inputs for completion
  if (!(inputTitle.value && inputDate.value && inputAmount.value)) {
    alert('Please fill the form!');
    return;
  } else {
    createNewEntry();
    inputDate.valueAsDate = currentInputDate;
  }

  clearInputs();
}

function createMonthBalance() {
  const entriesFromStorage = getEntriesFromLocalStorage();
  const filteredEntries = sortByMonthYear(entriesFromStorage);

  let expense = 0;
  let income = 0;
  let summary = 0;

  filteredEntries.forEach((item) => {
    if (item.type === 'expense') {
      expense += item.amount / 100;
    } else if (item.type === 'income') {
      income += item.amount / 100;
    }
  });

  summary = -expense + income;

  if (summary >= 0) {
    balance.classList.add('text-green-500');
    balance.classList.remove('text-red-500');
    balance.textContent = `+${summary.toFixed(2).replace('.', ',')} €`;
  } else {
    balance.classList.add('text-red-500');
    balance.classList.remove('text-green-500');
    balance.textContent = `${summary.toFixed(2).replace('.', ',')} €`;
  }
}

function addEntryToLocalStorage(obj) {
  const entriesFromStorage = getEntriesFromLocalStorage();

  entriesFromStorage.push(obj);
  localStorage.setItem('entries', JSON.stringify(entriesFromStorage));
  console.log(entriesFromStorage);

  UIController();
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

function submitBtnHandler() {
  if (editModeIsOn) {
    saveEditedItem();
  } else {
    addNewEntry();
  }
}

function saveEditedItem() {
  let entriesFromStorage = getEntriesFromLocalStorage();

  entriesFromStorage = entriesFromStorage.filter(
    (item) => editObj.timestamp != item.timestamp
  );

  editObj.title = inputTitle.value;
  editObj.date = inputDate.value;
  editObj.amount = inputAmount.value;

  entriesFromStorage.push(editObj);

  localStorage.setItem('entries', JSON.stringify(entriesFromStorage));

  editModeIsOn = false;
}

function itemActionHandler(e) {
  let entriesFromStorage = getEntriesFromLocalStorage();

  // Edit item
  if (e.target.classList.contains('editElement')) {
    const listElement = e.target.parentElement.parentElement;
    let editItemId = listElement.id;

    editModeIsOn = true;

    for (const obj of entriesFromStorage) {
      if (editItemId == obj.timestamp) {
        // const itemIndex = entriesFromStorage.indexOf(obj);
        console.log('CLICK EDIT', 'timestamp: ', obj.timestamp);

        editObj = obj;

        inputTitle.value = obj.title;
        inputDate.valueAsDate = new Date(obj.date);
        inputAmount.value = (obj.amount / 100).toFixed(2).replace('.', ',');
      }
    }
  }

  // Remove item
  if (e.target.classList.contains('removeElement')) {
    const listElement = e.target.parentElement.parentElement;
    let removeItemId = listElement.id;

    console.log('CLICK REMOVE');

    entriesFromStorage = entriesFromStorage.filter(
      (item) => removeItemId != item.timestamp
    );

    localStorage.setItem('entries', JSON.stringify(entriesFromStorage));
  }

  UIController();
}

function clearList() {
  while (monthList.firstChild) {
    monthList.removeChild(monthList.firstChild);
  }
}
function clearInputs() {
  inputTitle.value = '';
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
    // if (a.timestamp > b.timestamp) {
    //   return -1;
    // } else {
    //   return 1;
    // }
  });
}

function sortByMonthYear(arr) {
  function callbackFunction(item) {
    let itemDate = new Date(item.date);
    let dateMonth = months[itemDate.getMonth()];
    let dateYear = itemDate.getFullYear();

    if (currentMonthName === 'All months' && dateYear === currentYear) {
      return item;
    } else if (dateMonth === currentMonthName && dateYear === currentYear) {
      return item;
    }
  }

  let filteredEntriesFromStorage = arr.filter((item) => callbackFunction(item));

  if (filteredEntriesFromStorage.length === 0) {
    noEntriesMessage.style.display = 'flex';
  } else {
    noEntriesMessage.style.display = 'none';
  }

  return filteredEntriesFromStorage;
}

function start() {
  inputDate.valueAsDate = currentInputDate;

  month.forEach((element) => {
    if (element.getAttribute('selected')) {
      element.removeAttribute('selected');
    }

    if (element.value === currentMonthName) {
      element.setAttribute('selected', 'selected');
    }
  });

  year.forEach((element) => {
    if (element.getAttribute('selected')) {
      element.removeAttribute('selected');
    }

    if (element.value === currentYear.toString()) {
      element.setAttribute('selected', 'selected');
    }
  });

  UIController();
  clearInputs();
}

function dropdownSettings() {
  currentMonthName = monthsDropdown.value;
  currentYear = parseFloat(yearsDropdown.value);

  console.log('dropdownSettings: ', currentMonthName);
  console.log('dropdownSettings: ', currentYear);

  month.forEach((element) => {
    if (element.getAttribute('selected')) {
      element.removeAttribute('selected');
      console.log('month: ', element);
    }

    if (element.value === currentMonthName) {
      element.setAttribute('selected', 'selected');
    }
  });

  year.forEach((element) => {
    if (element.getAttribute('selected')) {
      element.removeAttribute('selected');
      console.log('year: ', element);
    }

    if (element.value === currentYear.toString()) {
      element.setAttribute('selected', 'selected');
    }
  });

  UIController();
}

// HTML aktualisieren
const UIController = () => {
  clearList();

  // Get from local storage and create list HTML
  let entriesFromStorage = getEntriesFromLocalStorage();

  // Sort entries by date
  sortByDate(entriesFromStorage);
  sortByMonthYear(entriesFromStorage).forEach((e) => createNewListItemHTML(e));
  createMonthBalance();
};

// --- EVENTS ---
window.addEventListener('load', start);

submitBtn.addEventListener('click', submitBtnHandler);
listContainer.addEventListener('click', itemActionHandler);
monthsDropdown.addEventListener('change', dropdownSettings);
yearsDropdown.addEventListener('change', dropdownSettings);

////////////////
// TEST AREA //
///////////////
