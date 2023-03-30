'use strict';

const newEntrySection = document.querySelector('.newEntryModalSection');
const newEntryButton = document.querySelector('#newEntryButton');
const closeModalButton = document.querySelector('.closeModalButton');
const overlay = document.querySelector('.overlay');

console.log(newEntryButton);

newEntryButton.onclick = () => openModal();
closeModalButton.onclick = () => cancelInput();
overlay.onclick = () => cancelInput();

const openModal = () => {
  newEntrySection.classList.remove('hidden');
};
const closeModal = () => {
  newEntrySection.classList.add('hidden');
};

const clearInputs = () => {};

const cancelInput = () => {
  clearInputs();
  closeModal();
};
