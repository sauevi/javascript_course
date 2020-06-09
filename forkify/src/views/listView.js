import { elements } from './base';
const { shoppingList } = elements;

export const renderItem = ingredient => {
  const { id, count, unit, description } = ingredient;
  const markup = `
    <li class="shopping__item" data-itemid=${id}>
        <div class="shopping__count">
            <input type="number" value="${count}" step="${count}" class="shopping__count-value">
            <p>${unit}</p>
        </div>
        <p class="shopping__description">${description}</p>
        <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
        </button>
    </li>
    `;

  shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
  const itemToDelete = document.querySelector(`[data-itemid="${id}"]`);
  if (itemToDelete) {
    itemToDelete.parentElement.removeChild(itemToDelete);
  }
};
