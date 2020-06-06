import { elements, elementStrings } from './base';
const { searchInput, searchResultList, searchResPages } = elements;
const { btnPages } = elementStrings;

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      let words = acc + cur.length;
      if (words <= limit) {
        newTitle.push(cur);
      }
      return words;
    }, 0);

    return `${newTitle.join(' ')} ...`;
  }

  return title;
};

const renderRecepi = recepie => {
  const { id, imageUrl, publisher, title } = recepie;
  const markup = `
    <li>
        <a class="results__link" href="#${id}">
            <figure class="results__fig">
                <img src="${imageUrl}" alt="${title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(title)}</h4>
                <p class="results__author">${publisher}</p>
            </div>
        </a>
    </li>
    `;
  searchResultList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="${btnPages} results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type == 'prev' ? 'left' : 'right'
            }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numbOfResults, resultsPerPage) => {
  const pages = Math.ceil(numbOfResults / resultsPerPage);
  let navigationBnt;
  if (page === 1 && pages > 1) {
    navigationBnt = createButton(page, 'next');
  } else if (page < pages) {
    navigationBnt = `
    ${createButton(page, 'prev')}
    ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    navigationBnt = createButton(page, 'prev');
  }

  searchResPages.insertAdjacentHTML('afterbegin', navigationBnt);
};

export const renderResults = (recepies, page = 1, resultPerPage = 10) => {
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage;
  recepies.slice(start, end).forEach(renderRecepi);
  renderButtons(page, recepies.length, resultPerPage);
};
export const clearPagesBtn = () => (searchResPagesBtns.innerHTML = '');
export const getInput = () => searchInput.value;
export const clearInput = () => (searchInput.value = '');
export const clearResults = () => {
  searchResultList.innerHTML = '';
  searchResPages.innerHTML = '';
};
