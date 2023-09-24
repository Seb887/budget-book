'use strict';

const newEntrySection = document.querySelector('.newEntryModalSection');

const newEntryButton = document.querySelector('#newEntryButton');
const closeModalButton = document.querySelector('.closeModalButton');
const overlay = document.querySelector('.overlay');
const saveButton = document.querySelector('#saveButton');

// --- EVENTS ---
newEntryButton.onclick = () => openModal();
closeModalButton.onclick = () => cancelInput();
overlay.onclick = () => cancelInput();
saveButton.onclick = () => eintragHinzufuegen();

// --- FUNCTIONS ---

// Eingabemodal öffnen
const openModal = () => {
  newEntrySection.classList.remove('hidden');
};

// Eingabemodal schließen
const closeModal = () => {
  newEntrySection.classList.add('hidden');
};

// Input des Eingabemodals leeren
const clearInputs = () => {
  inputDatum.value = '';
  inputTitel.value = '';
  inputBetrag.value = '';
};

// Input des Eingabemodals leeren und abbrechen
const cancelInput = () => {
  clearInputs();
  closeModal();
};
