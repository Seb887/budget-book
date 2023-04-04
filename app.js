'use strict';

const newEntrySection = document.querySelector('.newEntryModalSection');
const newEntryButton = document.querySelector('#newEntryButton');
const closeModalButton = document.querySelector('.closeModalButton');
const overlay = document.querySelector('.overlay');
const saveButton = document.querySelector('#saveButton');

const ulElement = document.querySelector('.liste');

const inputTyp = document.querySelectorAll('.inputTyp');
const inputDatum = document.querySelector('#inputDatum');
const inputTitel = document.querySelector('#inputTitel');
const inputBetrag = document.querySelector('#inputBetrag');

// console.log(newEntryButton);

let einraege = [];

// Events
newEntryButton.onclick = () => openModal();
closeModalButton.onclick = () => cancelInput();
overlay.onclick = () => cancelInput();
saveButton.onclick = () => eintragHinzufuegen();

const openModal = () => {
  newEntrySection.classList.remove('hidden');
};
const closeModal = () => {
  newEntrySection.classList.add('hidden');
};

const clearInputs = () => {
  inputDatum.value = '';
  inputTitel.value = '';
  inputBetrag.value = '';
};

const cancelInput = () => {
  clearInputs();
  closeModal();
};

const createNewListItem = function (obj) {
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
  console.log(obj.datum);
  datum.textContent = obj.datum;

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
    betrag.textContent = `-${obj.betrag} €`;
  } else {
    betrag.classList.add('text-green-500');
    betrag.textContent = `${obj.betrag} €`;
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

const refreshHTML = function () {
  clearList();
  einraege.forEach((e) => createNewListItem(e));
};

const eintragHinzufuegen = function () {
  let typ;

  inputTyp.forEach((e) => {
    if (e.checked === true && e.id === 'ausgabe') {
      console.log(e.checked + e.id);
      typ = 'ausgabe';
    } else {
      typ = 'einnahme';
    }
  });

  const neuerEintrag = {
    typ: typ,
    datum: inputDatum.value,
    titel: inputTitel.value,
    betrag: inputBetrag.value,
  };

  einraege.push(neuerEintrag);

  cancelInput();
  refreshHTML();
};

const clearList = () => {
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
};
