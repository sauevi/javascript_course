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
    publisherUrl = ''
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.publisher = publisher;
    this.title = title;
    this.ingredients = ingredients;
    this.source = source;
    this.socialRank = socialRank;
    this.publisherUrl = publisherUrl;
  }

  /**
   * get all ingredients
   */
  getIngredients() {
    return [...this.ingredients];
  }

  /**
   * Add a new Ingredient
   * @param {String} ingredient new ingredient to be added
   */
  addNewIngredient(ingredient) {
    if (!isString(ingredient)) {
      throw new Error(`the ingredient ${ingredient} is not valid.`);
    }
    return [...this.ingredients, ingredient];
  }

  /**
   * Remove an ingredient by its index
   * @param {Number} index of the element to be removed from the list
   */
  removeIngredientByIndex(index) {
    return this.ingredients.filter((currentIngredient, indexCurrentElement) => {
      if (indexCurrentElement !== index) {
        return currentIngredient;
      }
    });
  }
}
