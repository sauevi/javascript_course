import Shopping from './shopping';

let _shopping = null;

export default class ShoppingBuilder {
  constructor() {}

  build() {
    if (!_shopping) {
      _shopping = new Shopping();
      return _shopping;
    } else {
      return _shopping;
    }
  }
}
