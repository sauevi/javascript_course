import Recipe from './Recipe';

export default class RecepiBuilder {
  constructor() {}

  setRecepiId(id) {
    this.id = id;
    return this;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  setPublisher(publisher) {
    this.publisher = publisher;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setIngredients(ingredients) {
    this.ingredients = ingredients;
    return this;
  }

  setSource(source) {
    this.source = source;
    return this;
  }

  setSocialRank(socialRank) {
    this.socialRank = socialRank;
    return this;
  }

  setPublisherUrl(publisherUrl) {
    this.publisherUrl = publisherUrl;
    return this;
  }

  build() {
    if (!('id' in this)) {
      throw new Error('Recipe Id is missing');
    }

    if (!('imageUrl' in this)) {
      throw new Error('Image Url is missing');
    }

    if (!('publisher' in this)) {
      throw new Error('Publisher is missing');
    }

    if (!('title' in this)) {
      throw new Error('Title is missing');
    }

    return new Recipe(
      this.id,
      this.imageUrl,
      this.publisher,
      this.title,
      this.ingredients,
      this.source,
      this.socialRank,
      this.publisherUrl
    );
  }
}
