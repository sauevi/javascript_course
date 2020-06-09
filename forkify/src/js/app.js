import { getRecipesByQuery, getRecipeById } from '../recipe/routes/recipeRoute';
import * as searchView from '../views/searchView';
import * as recipeView from '../views/recipeView';
import {
  elements,
  elementStrings,
  renderLoader,
  clearLoader
} from '../views/base';
/**
 * Global state of the app
 * search object
 * current recipe obj
 * shopping list obj
 * liked recipes
 */
const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();
  if (!query) {
    return;
  }
  const response = await getRecipesByQuery(query);

  if (errorResponse(response)) {
    return;
  }

  state.recepies = response;
  searchView.clearInput();
  searchView.clearResults();
  renderLoader(elements.searchResult);
  clearLoader();
  searchView.renderResults(state.recepies);
};

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');

  if (!id) {
    return;
  }

  const response = await getRecipeById(id);

  if (errorResponse(response)) {
    return;
  }
  //prepare UI
  recipeView.clearRecepi();
  renderLoader(elements.recepi);
  if (state.recepies) {
    searchView.highlightSelector(id);
  }
  // prepare elements
  state.recipe = response;
  state.recipe.calculateTime();
  state.recipe.calculateServings();
  // render
  clearLoader();
  recipeView.renderRecipe(state.recipe);
};

// events
const { searchForm, searchResPages } = elements;
const { btnPages } = elementStrings;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

searchResPages.addEventListener('click', event => {
  const button = event.target.closest(`.${btnPages}`);
  if (button) {
    const { recepies } = state;
    const goToPage = parseInt(button.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(recepies, goToPage);
  }
});

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// btn-increase, btn-decrease
elements.recepi.addEventListener('click', event => {
  const { recipe } = state;
  if (event.target.matches('.btn-decrese, .btn-decrease *')) {
    if (recipe.servings > 1) {
      recipe.updateServings('dec');
      recipeView.updateServingsIngredients(recipe);
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    recipe.updateServings('inc');
    recipeView.updateServingsIngredients(recipe);
  }
});

function errorResponse(response) {
  if (response.error) {
    searchView.clearInput();
    searchView.clearResults();
    alert(response.message);
    return true;
  }

  return false;
}
