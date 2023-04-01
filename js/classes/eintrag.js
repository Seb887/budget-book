'use strict';

class Eintrag {
  constructor(typ, date, title, amount) {
    this.typ = typ;
    this.date = date;
    this.title = title;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  createHTML() {}
}
