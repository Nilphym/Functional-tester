import { v4 as uuidv4 } from 'uuid';

export default class {
  constructor() {
    this.ids = new Set();
  }

  fetch() {
    let uuid = uuidv4().toUpperCase();
    while (this.ids.has(uuid)) {
      uuid = uuidv4();
    }

    this.ids.add(uuid);

    return uuid;
  }

  set(id) {
    if (this.ids.has(id)) {
      throw new Error(`ID ${id} has already been used.`);
    }

    this.ids.add(id);
  }

  reset() {
    this.ids.clear();
  }
}
