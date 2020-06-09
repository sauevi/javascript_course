import Shopping from './shopping';

let _shopping = null;

export default class ShoppingBuilder {
  constructor() {}

  setItem(items) {
    this.items = items;
    return this;
  }

  build() {
    if (!_shopping) {
      _shopping = new Shopping(this.items);
      return _shopping;
    } else {
      return _shopping;
    }
  }
}
