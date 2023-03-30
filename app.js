'use strict';

const newEntrySection = document.querySelector('.newEntryModalSection');
const newEntryButton = document.querySelector('#newEntryButton');

console.log(newEntryButton);

newEntryButton.onclick = () => openModal();

const openModal = () => {
  newEntrySection.classList.remove('hidden');
};
const closeModal = () => {
  newEntrySection.classList.add('hidden');
};
