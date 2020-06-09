function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

export default class Recipe {
  constructor(
    id,
    imageUrl,
    publisher,
    title,
    ingredients = [],
    source = '',
    socialRank = 0,
    publisherUrl = '',
    ingredientsParsed = []
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.publisher = publisher;
    this.title = title;
    this.ingredients = ingredients;
    this.source = source;
    this.socialRank = socialRank;
    this.publisherUrl = publisherUrl;
    this.ingredientsParsed = ingredientsParsed;
  }

  /**
   * calculate the time of cooking
   */
  calculateTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  /**
   * calculate the amoun of servings
   */
  calculateServings() {
    this.servings = 4;
  }

  /**
   *  function to update the servings for this recipe
   * @param {String} type it could be 'dec' to res, otherwise, will add one
   */
  updateServings(type) {
    // Servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // Ingredients
    this.ingredientsParsed.forEach(ing => {
      ing.count *= newServings / this.servings;
    });

    this.servings = newServings;
  }
}
