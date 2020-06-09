import Recipe from './Recipe';
import Ingredient from '../../ingredient';

export default class RecepiBuilder {
  constructor(id, imageUrl, publisher, title) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.publisher = publisher;
    this.title = title;
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
    if ('ingredients' in this) {
      const unitsLong = [
        'tablespoons',
        'tablespoon',
        'ounces',
        'ounce',
        'teaspoons',
        'teaspoon',
        'cups',
        'pounds'
      ];
      const unitsShort = [
        'tbsp',
        'tbsp',
        'oz',
        'oz',
        'tsp',
        'tsp',
        'cup',
        'pound'
      ];
      const units = [...unitsShort, 'kg', 'g'];

      const newIngredients = this.ingredients.map(el => {
        // 1) Uniform units
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, i) => {
          ingredient = ingredient.replace(unit, unitsShort[i]);
        });

        // 2) Remove parentheses
        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

        // 3) Parse ingredients into count, unit and ingredient
        const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

        let objIng;
        if (unitIndex > -1) {
          // There is a unit
          // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
          // Ex. 4 cups, arrCount is [4]
          const arrCount = arrIng.slice(0, unitIndex);

          let count;
          if (arrCount.length === 1) {
            count = eval(arrIng[0].replace('-', '+'));
          } else {
            count = eval(arrIng.slice(0, unitIndex).join('+'));
          }

          objIng = new Ingredient(
            count,
            arrIng[unitIndex],
            arrIng.slice(unitIndex + 1).join(' ')
          );
        } else if (parseInt(arrIng[0], 10)) {
          // There is NO unit, but 1st element is number
          objIng = new Ingredient(
            parseInt(arrIng[0], 10),
            '',
            arrIng.slice(1).join(' ')
          );
        } else if (unitIndex === -1) {
          // There is NO unit and NO number in 1st position
          objIng = new Ingredient(1, '', ingredient);
        }

        return objIng;
      });
      this.ingredientsParsed = newIngredients;
    }

    return new Recipe(
      this.id,
      this.imageUrl,
      this.publisher,
      this.title,
      this.ingredients,
      this.source,
      this.socialRank,
      this.publisherUrl,
      this.ingredientsParsed
    );
  }
}
