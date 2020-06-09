export default class Ingredient {
  constructor(id, count = 1, unit = '', description = '') {
    this.id = id;
    this.count = count;
    this.unit = unit;
    this.description = description;
  }

  updateCount(newCount) {
    this.count = newCount;
  }
}
