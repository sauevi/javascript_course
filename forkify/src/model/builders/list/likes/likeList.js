import List from '../list';

export default class LikesList extends List {
  constructor(items = []) {
    super(items);
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
}
