import List from '../list';
import Like from './like';

export default class LikesList extends List {
  constructor(items = []) {
    super(items);
  }

  addNewItem(item) {
    this.items.push(item);
    this.persistData();
  }

  deleteItem(id) {
    const indexElementToDelete = this.items.findIndex(item => item.id === id);
    this.items.splice(indexElementToDelete, 1);
    this.persistData();
  }

  validateLikedById(id) {
    const likedElement = this.items.filter(
      like => like.id === id && like.isLiked()
    );

    return Array.isArray(likedElement) && likedElement.length;
  }

  getNumberOfLikes() {
    return this.items.filter(like => like.isLiked()).length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.items));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if (storage) {
      this.items = storage.map(like => Object.assign(new Like(), like));
    }
  }
}
