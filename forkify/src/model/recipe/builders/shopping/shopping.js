export default class Shopping {
  constructor(items = []) {
    this.items = items;
  }

  addNewItem(item) {
    this.items.push(item);
  }

  deleteItem(id) {
    const indexElementToDelete = this.items.findIndex(
      ingredient => ingredient.id === id
    );
    this.items.splice(indexElementToDelete, 1);
  }

  updatedCountValue(id, newCount) {
    this.items.find(ingredient => ingredient.id === id)?.updateCount(newCount);
  }
}
