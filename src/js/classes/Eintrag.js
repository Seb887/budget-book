export class Eintrag {
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

  // TODO:
  _removeEntry() {}

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
    date.textContent = this._date;

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
    title.textContent = this._title;

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

    return listItem;
  }
}
