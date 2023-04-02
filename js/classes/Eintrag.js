'use strict';

class Eintrag {
  constructor(typ, datum, titel, betrag) {
    this.typ = typ;
    this.datum = datum;
    this.titel = titel;
    this.betrag = betrag;
    this.timestamp = Date.now();
  }

  createHTML() {
    let ulElement = document.querySelector('.liste');

    let listenelement = document.createElement('li');
    this.type === 'einnahme'
      ? listenelement.classList('einnahme')
      : listenelement.classList('ausgabe');
    listenelement.classList(
      'grid',
      'grid-cols-12',
      'bg-slate-600',
      'text-gray-300',
      'rounded-lg'
    );
    listenelement.setAttribute('data-timestamp', this.timestamp);

    let datum = document.createElement('span');
    datum.classList(
      'eingabeDatum',
      'p-2',
      'col-span-2',
      'text-center',
      'border-r',
      'border-slate-700'
    );
    datum.textContent = this.datum.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    let titel = document.createElement('span');
    titel.classList(
      'eingabeTitel',
      'p-2',
      'pl-5',
      'col-start-3',
      'col-span-7',
      'text-left'
    );
    titel.textContent = this.titel;

    let betrag = document.createElement('span');
    betrag.classList(
      'eingabeBetrag',
      'p-2',
      'pr-5',
      'col-start-10',
      'col-span-2',
      'text-right',
      'text-red-500',
      'font-medium',
      'border-r',
      'border-slate-700'
    );
    betrag.textContent = `${this.betrag.toFixed(2).replace(/\./, ',')} €`;

    let eintragLöschen = document.createElement('button');
    eintragLöschen.classList(
      'eintragLöschen',
      'p-2',
      'col-start-12',
      'col-span-1',
      'text-center',
      'text-gray-900'
    );

    let eintragLöschenIcon = document.createElement('i');
    eintragLöschenIcon.classList('fa-solid', 'fa-trash');

    eintragLöschen.appendChild(eintragLöschenIcon);
    listenelement.appendChild(datum);
    listenelement.appendChild(titel);
    listenelement.appendChild(betrag);
    listenelement.appendChild(eintragLöschen);
    ulElement.appendChild(listenelement);
  }
}
