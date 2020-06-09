import { elements } from './base';
import { limitRecipeTitle } from './searchView';

const { likesMenu, likesLies } = elements;
export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikesMenu = (numLikes = 0) => {
  likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikes = like => {
  const { id, title, author, imgUrl } = like;
  const markup = `
  <li>
    <a class="likes__link" href="#${id}">
    <figure class="likes__fig">
      <img src="${imgUrl}" alt="${title}">
    </figure>
    <div class="likes__data">
      <h4 class="likes__name">${limitRecipeTitle(title)}</h4>
      <p class="likes__author">${author}</p>
    </div>
    </a>
  </li>
  `;

  likesLies.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
  const element = document.querySelector(`.likes__link[href*="#${id}"]`)
    .parentElement;

  if (element) {
    element.parentElement.removeChild(element);
  }
};
