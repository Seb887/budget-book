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

//      <!-- List of Entries -->
//       <div class="entriesContainer col-start-3 col-span-7 ml-10 mr-10">
//         <!-- List of Month -->
//         <div
//           class="monthContainer space-y-4 mt-10 p-5 bg-slate-800 border border-slate-500 rounded-xl"
//         >
//           <header class="monthHeader flex justify-between">
//             <h1 class="month font-extrabold text-xl text-slate-300">
//               März 2023
//             </h1>
//             <span class="text-right font-medium text-xl text-green-500"
//               >1781,55 €</span
//             >
//           </header>

//           <!-- Entry -->
//           <div
//             class="newEntryContainer grid grid-cols-12 bg-slate-600 text-gray-300 rounded-lg"
//           >
//             <div
//               class="inputDate p-2 col-span-2 text-center border-r border-slate-700"
//             >
//               07.03.2023
//             </div>
//             <div class="inputTitle p-2 pl-5 col-start-3 col-span-7 text-left">
//               Einkauf
//             </div>
//             <div
//               class="inputAmount p-2 pr-5 col-start-10 col-span-2 text-right text-red-500 font-medium border-r border-slate-700"
//             >
//               -143,44 €
//             </div>
//             <div
//               class="removeEntry p-2 col-start-12 col-span-1 text-center text-gray-900"
//             >
//               <i class="fa-solid fa-trash"></i>
//             </div>
//           </div>
//           <!-- Entry -->
//           <div
//             class="newEntryContainer grid grid-cols-12 bg-slate-600 text-gray-300 rounded-lg"
//           >
//             <div
//               class="inputDate p-2 col-span-2 text-center border-r border-slate-700"
//             >
//               15.03.2023
//             </div>
//             <div class="inputTitle p-2 pl-5 col-start-3 col-span-7 text-left">
//               Tanken
//             </div>
//             <div
//               class="inputAmount p-2 pr-5 col-start-10 col-span-2 text-right text-red-500 font-medium border-r border-slate-700"
//             >
//               -75,01 €
//             </div>
//             <div
//               class="removeEntry p-2 col-start-12 col-span-1 text-center text-gray-900"
//             >
//               <i class="fa-solid fa-trash"></i>
//             </div>
//           </div>
//           <!-- Entry -->
//           <div
//             class="newEntryContainer grid grid-cols-12 bg-slate-600 text-gray-300 rounded-lg"
//           >
//             <div
//               class="inputDate p-2 col-span-2 text-center border-r border-slate-700"
//             >
//               30.03.2023
//             </div>
//             <div class="inputTitle p-2 pl-5 col-start-3 col-span-7 text-left">
//               Gehalt
//             </div>
//             <div
//               class="inputAmount p-2 pr-5 col-start-10 col-span-2 text-right text-green-500 font-medium border-r border-slate-700"
//             >
//               2000 €
//             </div>
//             <div
//               class="removeEntry p-2 col-start-12 col-span-1 text-center text-gray-900"
//             >
//               <i class="fa-solid fa-trash"></i>
//             </div>
//           </div>
//         </div>
//       </div>
