import { getRecipesByQuery } from '../recipe/routes/recipeRoute';
import * as searchView from '../views/searchView';
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

  if (response.error) {
    searchView.clearInput();
    searchView.clearResults();
    alert(response.message);
    return;
  }

  state.recepies = response;

  searchView.clearInput();
  searchView.clearResults();
  renderLoader(elements.searchResult);
  clearLoader();
  searchView.renderResults(state.recepies);
};

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
