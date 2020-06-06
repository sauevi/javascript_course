import axios from 'axios';
import RecepiBuilder from '../builder/recipeBuilder';

const createErrorResponse = errorResponse => {
  const message = errorResponse.data.error;
  if (errorResponse.status !== 400) {
    console.log(`💥 Error 💥`, errorResponse);
  }
  return {
    error: true,
    message
  };
};

export const getRecipesByQuery = async query => {
  try {
    const { data } = await axios(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );

    return data.recipes.map(recepi => {
      return new RecepiBuilder()
        .setRecepiId(recepi.recipe_id)
        .setImageUrl(recepi.image_url)
        .setPublisher(recepi.publisher)
        .setTitle(recepi.title)
        .build();
    });
  } catch (error) {
    return createErrorResponse(error.response);
  }
};

export const getRecipeById = async id => {
  try {
    const { data } = await axios(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    return new RecepiBuilder()
      .setRecepiId(data.recepi.recipe_id)
      .setImageUrl(data.recepi.image_url)
      .setPublisher(data.recepi.publisher)
      .setTitle(data.recepi.title)
      .setIngredients(data.recepi.ingredients)
      .setSource(data.recepi.source_url)
      .setSocialRank(data.recepi.social_rank)
      .setPublisherUrl(data.recepi.publisher_url)
      .build();
  } catch (error) {
    return createErrorResponse(error.response);
  }
};
