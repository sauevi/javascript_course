export default class Like {
  constructor(id, title, author, imgUrl, liked = false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.imgUrl = imgUrl;
    this.liked = liked;
  }

  isLiked() {
    return this.liked;
  }
}
