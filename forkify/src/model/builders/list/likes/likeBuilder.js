import Like from './like';

export default class LikeBuilder {
  constructor(id, title, author, imgUrl) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.imgUrl = imgUrl;
  }

  setLiked(liked) {
    this.liked = liked;
    return this;
  }

  build() {
    return new Like(this.id, this.title, this.author, this.imgUrl, this.liked);
  }
}
