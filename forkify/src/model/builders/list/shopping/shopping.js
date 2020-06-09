import List from '../list';

export default class Shopping extends List {
  constructor(items = []) {
    super(items);
  }

  updatedCountValue(id, newCount) {
    this.items.find(ingredient => ingredient.id === id)?.updateCount(newCount);
  }
}
