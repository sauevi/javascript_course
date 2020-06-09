import axios from 'axios';
import RecepiBuilder from '../builders/recipe/recipeBuilder';

const createErrorResponse = errorResponse => {
  const { response } = errorResponse;
  const responseError = { error: true, message: '' };

  responseError.message = !response
    ? 'Opps...somthing went wrong'
    : response.data.error;

  return responseError;
};

export const getRecipesByQuery = async query => {
  try {
    const { data } = await axios(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );

    return data.recipes.map(recepi => {
      const { recipe_id, image_url, publisher, title } = recepi;
      return new RecepiBuilder(recipe_id, image_url, publisher, title).build();
    });
  } catch (error) {
    return createErrorResponse(error);
  }
};

export const getRecipeById = async id => {
  try {
    const { data } = await axios(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    const {
      recipe_id,
      image_url,
      publisher,
      title,
      ingredients,
      source_url,
      social_rank,
      publisher_url
    } = data.recipe;

    return new RecepiBuilder(recipe_id, image_url, publisher, title)
      .setIngredients(ingredients)
      .setSource(source_url)
      .setSocialRank(social_rank)
      .setPublisherUrl(publisher_url)
      .build();
  } catch (error) {
    return createErrorResponse(error);
  }
};
