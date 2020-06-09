import Ingredient from './ingredient';
import uniqid from 'uniqid';

export default class IngredientBuilder {
  constructor() {}

  setCount(count) {
    this.count = count;
    return this;
  }

  setUnit(unit) {
    this.unit = unit;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  build() {
    return new Ingredient(uniqid(), this.count, this.unit, this.description);
  }
}
