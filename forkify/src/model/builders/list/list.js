export default class List {
  constructor(items = []) {
    this.items = items;
  }

  addNewItem(item) {
    this.items.push(item);
  }

  deleteItem(id) {
    const indexElementToDelete = this.items.findIndex(item => item.id === id);
    this.items.splice(indexElementToDelete, 1);
  }
}
