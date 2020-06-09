import { getRecipesByQuery, getRecipeById } from '../model/routes/recipeRoute';
import * as searchView from '../views/searchView';
import * as recipeView from '../views/recipeView';
import * as listView from '../views/listView';
import * as likesView from '../views/likeView';
import {
  elements,
  elementStrings,
  renderLoader,
  clearLoader
} from '../views/base';
import Context from '../model/factory/context';
import LikeBuilder from '../model/builders/list/likes/likeBuilder';
/**
 * Global state of the app
 * search object
 * current recipe obj
 * shopping list obj
 * liked recipes
 */
const state = {};

window.state = state;

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
  recipeView.renderRecipe(state.recipe, state.likeList?.validateLikedById(id));
};

const controlList = () => {
  state.shoppingListItems = new Context('shopping');

  const { recipe, shoppingListItems } = state;
  //add to shoppingList
  recipe.ingredients.forEach(item => {
    shoppingListItems.addNewItem(item);
    listView.renderItem(item);
  });
};

const controlLike = () => {
  state.likeList = new Context('like');

  const { id, imageUrl, publisher, title } = state.recipe;

  if (!state.likeList.validateLikedById(id)) {
    const newLike = new LikeBuilder(id, title, publisher, imageUrl)
      .setLiked(true)
      .build();

    state.likeList.addNewItem(newLike);
    likesView.renderLikes(newLike);
    likesView.toggleLikeBtn(true);
  } else {
    state.likeList.deleteItem(id);
    likesView.toggleLikeBtn(false);
    likesView.deleteLike(id);
  }

  likesView.toggleLikesMenu(state.likeList.getNumberOfLikes());
};

// events
const { searchForm, searchResPages, shoppingList } = elements;
const { btnPages } = elementStrings;

//handle delete and update list item events
shoppingList.addEventListener('click', event => {
  const { shoppingListItems } = state;
  const id = event.target.closest('.shopping__item').dataset.itemid;
  if (event.target.matches('.shopping__delete, .shopping__delete *')) {
    shoppingListItems.deleteItem(id);
    listView.deleteItem(id);
  } else if (event.target.matches('.shopping__count-value')) {
    const countValue = parseFloat(event.target.value, 10);
    shoppingListItems.updatedCountValue(id, countValue);
  }
});

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
  } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  } else if (event.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
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
