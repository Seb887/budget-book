'use strict';

// --- VARIABLES ---

// DOM variables
const sectionRight = document.querySelector('.section-right');
const monthList = document.querySelector('.month-list');
const listTitle = document.querySelector('.list-title');
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
const submitBtn = document.querySelector('#submit-btn');
const typeExpense = document.querySelector('#type-expense');
const typeIncome = document.querySelector('#type-income');

// Balance variables
const balanceContainer = document.querySelector('.balance-container');
const balanceExpense = document.querySelector('#balance-expense');
const balanceIncome = document.querySelector('#balance-income');
const balanceSummary = document.querySelector('#balance-summary');

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

// --- FUNCTIONS ---

// Create HTML for article (title, month list)
// function createNewArticleHTML(month, year) {
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
function createNewListItemHTML(obj) {
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
  date.textContent = new Date(obj.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

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
    'font-medium',
    'border-r',
    'border-slate-700'
  );

  if (obj.type === 'expense') {
    amount.classList.add('text-red-500');
    amount.textContent = `-${obj.amount} €`;
  } else if (obj.type === 'income') {
    amount.classList.add('text-green-500');
    amount.textContent = `+${obj.amount} €`;
  }

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

function createBalanceHTML() {
  const container = document.createElement('div');
  container.classList.add(
    'balance-container',
    'flex',
    'flex-col',
    'p-5',
    'pr-10',
    'min-w-min',
    'border',
    'border-r-0',
    'border-slate-500',
    'rounded-l-xl',
    'bg-slate-800',
    'text-gray-300'
  );

  const header = document.createElement('h1');
  header.classList.add('mb-3', 'text-2xl', 'font-bold');
  header.textContent = 'Balance';

  const innerContainer = document.createElement('div');
  innerContainer.classList.add(
    'balance-item-container',
    'flex',
    'flex-col',
    'gap-1'
  );

  const expenseContainer = document.createElement('div');
  expenseContainer.classList.add('flex', 'justify-between', 'ml-3');
  const expenseTitle = document.createElement('span');
  expenseTitle.textContent = 'Expense';
  const expenseNum = document.createElement('span');
  expenseNum.classList.add('text-red-500');
  expenseNum.id = 'balance-expense';
  expenseNum.textContent = '0';
  expenseContainer.appendChild(expenseTitle);
  expenseContainer.appendChild(expenseNum);

  const incomeContainer = document.createElement('div');
  incomeContainer.classList.add('flex', 'justify-between', 'ml-3');
  const incomeTitle = document.createElement('span');
  incomeTitle.textContent = 'Income';
  const incomeNum = document.createElement('span');
  incomeNum.classList.add('text-green-500');
  incomeNum.id = 'balance-income';
  incomeNum.textContent = '0';
  incomeContainer.appendChild(incomeTitle);
  incomeContainer.appendChild(incomeNum);

  const summaryContainer = document.createElement('div');
  summaryContainer.classList.add('flex', 'justify-between', 'ml-3');
  const summaryTitle = document.createElement('span');
  summaryTitle.textContent = 'Summary';
  summaryTitle.classList.add('font-semibold');
  const summaryNum = document.createElement('span');
  summaryNum.classList.add('font-semibold');
  summaryNum.id = 'balance-summary';
  summaryNum.textContent = '0';
  summaryContainer.appendChild(summaryTitle);
  summaryContainer.appendChild(summaryNum);

  const line = document.createElement('hr');
  line.classList.add('ml-3');

  container.appendChild(header);
  container.appendChild(innerContainer);
  innerContainer.appendChild(expenseContainer);
  innerContainer.appendChild(incomeContainer);
  innerContainer.appendChild(line);
  innerContainer.appendChild(summaryContainer);

  sectionRight.appendChild(container);

  // <div
  //         class="balance-container flex flex-col p-5 pr-10 min-w-min border border-r-0 border-slate-500 rounded-l-xl bg-slate-800 text-gray-300"
  // >
  //   <h1 class="mb-3 text-2xl font-bold">Balance</h1>
  //   <div class="balance-item-container flex flex-col gap-1">
  //     <div class="flex justify-between ml-3">
  //       <span>Expense</span>
  //       <span
  //         class="text-red-500"
  //         id="balance-expense"
  //         >5000 €</span
  //       >
  //     </div>

  //     <div class="flex justify-between ml-3">
  //       <span>Income</span>
  //       <span
  //         class="text-green-500"
  //         id="balance-income"
  //         >1200 €</span
  //       >
  //     </div>

  //     <hr class="ml-3" />
  //     <div class="flex justify-between ml-3">
  //       <span class="font-semibold">Summary</span>
  //       <span
  //         class="font-semibold"
  //         id="balance-summary"
  //         >-3800 €</span
  //       >
  //     </div>
  //   </div>
  // </div>
}

function addNewEntry() {
  // Check inputs for completion
  if (!(inputTitle.value && inputDate.value && inputAmount.value)) {
    alert('Please fill the form!');
    return;
  } else {
    createNewEntry();
    // defaultSettings();
  }
}

function createNewEntry() {
  let newObj = {
    // title: inputTitle.value,
    title: inputTitle.value,
    date: new Date(inputDate.value),
    type: getInputType(),
    amount: parseFloat(inputAmount.value).toFixed(2).replace(/\./, ','),
    timestamp: Date.now(),
  };

  addEntryToLocalStorage(newObj);
}

function getInputType() {
  if (typeExpense.checked) {
    return 'expense';
  } else if (typeIncome.checked) {
    return 'income';
  }
}

function updateBalanceBoard() {
  const entriesFromStorage = getEntriesFromLocalStorage();
  let expense = 0;
  let income = 0;
  let summary = 0;

  entriesFromStorage.forEach((item) => {
    if (item.type === 'expense') {
      expense += parseFloat(item.amount);
    } else if (item.type === 'income') {
      income += parseFloat(item.amount);
    }
  });

  summary = -expense + income;
  console.log('summary: ', summary);

  if (summary >= 0) {
    balanceSummary.classList.add('text-green-500');
  } else {
    balanceSummary.classList.add('text-red-500');
  }

  balanceExpense.textContent = `${expense} €`;
  balanceIncome.textContent = `${income} €`;
  balanceSummary.textContent = `${summary} €`;
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

  UIController();
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

function sortByMonthYear(arr) {
  // currentMonthName = monthsDropdown.value;
  // currentYear = parseFloat(yearsDropdown.value);

  // console.log('currentMonthName: ', currentMonthName);
  // console.log('currentYear: ', currentYear);

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

function defaultSettings() {
  // currentMonthName = monthsDropdown.value;
  // currentYear = parseFloat(yearsDropdown.value);

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
  clearInputs();

  // Get from local storage and create list HTML
  let entriesFromStorage = getEntriesFromLocalStorage();

  // Sort entries by date
  sortByDate(entriesFromStorage);
  sortByMonthYear(entriesFromStorage).forEach((e) => createNewListItemHTML(e));

  createBalanceHTML();
  // updateBalanceBoard();

  // Control list area
  // if (entriesFromStorage.length === 0) {
  //   listContainer.style.display = 'none';
  //   noEntriesMessage.style.display = 'flex';
  // } else {
  //   listContainer.style.display = 'block';
  //   noEntriesMessage.style.display = 'none';
  // }
};

// EVENTS
// window.addEventListener('load', defaultSettings);
defaultSettings();

// FIXME: submitBtn setzt Dropdown Menü Einstellung zurück -> sollte aktuelle Werte behalten
// FIXME: Verhalte submitBtn prüfen ob es window load durchführt
submitBtn.addEventListener('click', addNewEntry);
listContainer.addEventListener('click', removeFromStorage);
monthsDropdown.addEventListener('change', dropdownSettings);
yearsDropdown.addEventListener('change', dropdownSettings);

////////////////
// TEST AREA //
///////////////

// let now = new Date();
// let currentMonth = now.getMonth();
// let months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];
// let currentMonthName = months[currentMonth];
// let currentYear = now.getFullYear();

// console.log(now);
// console.log(currentMonth);
// console.log(currentMonthName);
// console.log(currentYear);

// console.log('TYPE: ', typeof new Date());

// const expense = document.querySelector('#expense');
// const income = document.querySelector('#income');
// const rebooking = document.querySelector('#rebooking');

// if (income.checked) {
//   console.log('checked');
// }
