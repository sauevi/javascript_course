export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResultList: document.querySelector('.results__list'),
  searchResult: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages'),
  recepi: document.querySelector('.recipe')
};

export const elementStrings = {
  loader: 'loader',
  btnPages: 'btn-inline'
};

export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
