import LikeList from '../builders/list/likes/likeList';
import Shopping from '../builders/list/shopping/shopping';

let _shoppingList = null;
let _likeList = null;

export default class Context {
  constructor(type) {
    switch (type) {
      case 'shopping':
        if (!_shoppingList) {
          _shoppingList = new Shopping();
          return _shoppingList;
        } else {
          return _shoppingList;
        }
      case 'like':
        if (!_likeList) {
          _likeList = new LikeList();
          return _likeList;
        } else {
          return _likeList;
        }
      default:
        new Error(`value of: ${type} is invalid`);
    }
  }
}
