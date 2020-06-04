/*
 * Budget Controller
 */
const budgetController = (() => {
  /*
   * Transaction object to set up the commun data between Expenses and Incomes objects.
   */
  class Transaction {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }

    /**
     * create the formated value
     */
    createDisplayValue(number) {
      this.displayValue = formatNumber(number);
    }
  }

  /*
   * Expense object and it's functions.
   */
  class Expense extends Transaction {
    constructor(id, description, value) {
      super(id, description, value);
      this.percentage = -1;
    }

    /**
     * get the html component that should be placed
     */
    getHTML() {
      return `<div class="item clearfix" id="exp-${this.id}"><div class="item__description">${this.description}</div><div class="right clearfix"><div class="item__value">- ${this.displayValue}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
    }

    /**
     * get the element name where should be set the html
     */
    getHtmlElementName() {
      return '.expenses__list';
    }

    /**
     * calculate expenses percentage
     */
    calculatePercentage(totalIncome) {
      this.percentage =
        totalIncome > 0 ? Math.round((this.value / totalIncome) * 100) : -1;
    }

    /**
     * get expenses percentage
     */
    getPercentage() {
      return this.percentage;
    }
  }

  class Income extends Transaction {
    constructor(id, description, value) {
      super(id, description, value);
    }

    /**
     * get the html component that should be placed
     */
    getHTML() {
      return `<div class="item clearfix" id="inc-${this.id}"><div class="item__description">${this.description}</div><div class="right clearfix"><div class="item__value">+ ${this.displayValue}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
    }

    /**
     * get the element name where should be set the html
     */
    getHtmlElementName() {
      return '.income__list';
    }
  }

  /**
   *
   * @param number integer to format
   */
  function formatNumber(number) {
    number = Math.abs(number);
    number = number.toFixed(2);
    const numbSplit = number.split('.');
    let int = numbSplit[0];
    if (int.length > 3) {
      int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
    }
    return `${int}.${numbSplit[1]}`;
  }

  /**
   * Creates a new transaction that could be and Expenses or an Income
   * @param ID Int with the unique value for the transaction
   * @param type it could be exp or inc for the transaction's type
   * @param desc transaction's description
   * @param val transaction's value
   */
  function createTransaction(itemInput) {
    const { description, value, type } = itemInput;
    //create new ID
    let ID;
    if (data.allItems[type].length > 0) {
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }
    let newTransaction;
    switch (type) {
      case 'inc':
        newTransaction = new Income(ID, description, value);
        break;
      case 'exp':
        newTransaction = new Expense(ID, description, value);
        break;
    }
    newTransaction.createDisplayValue(value);
    return newTransaction;
  }

  /*
   * Data object with all the information
   */
  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budgetValue: 0,
    percentage: -1,
    calculateTotals: function (type) {
      const values = this.allItems[type].map(transaction => transaction.value);

      this.totals[type] =
        values && values.length
          ? values.reduce((accum, curVal) => accum + curVal)
          : 0;
    },
    calculateBudget: function () {
      this.budgetValue = this.totals.inc - this.totals.exp;
    },
    calculateIncomePercentage: function () {
      this.percentage =
        this.totals.inc > 0
          ? Math.round((this.totals.exp / this.totals.inc) * 100)
          : -1;
    },
    deleteItem: function (type, id) {
      const elementIndex = this.allItems[type]
        .map(transaction => transaction.id)
        .indexOf(id);
      if (elementIndex !== -1) {
        this.allItems[type].splice(elementIndex, 1);
      }
    }
  };

  return {
    addItemToBudget: itemInput => {
      const { type } = itemInput;
      const newItem = createTransaction(itemInput);
      data.allItems[type].push(newItem);
      return newItem;
    },
    calculateBudget: type => {
      data.calculateTotals(type);
      data.calculateBudget();
      data.calculateIncomePercentage();
    },
    calculateExpenPercentage: () => {
      data.allItems.exp.forEach(expen => {
        expen.calculatePercentage(data.totals.inc);
      });
    },
    getExpenPercentages: () => {
      return data.allItems.exp.map(expen => expen.getPercentage());
    },
    getDisplayBudgetData: () => {
      const formatBudgetValue = formatNumber(data.budgetValue);
      const formatTotalinc = formatNumber(data.totals.inc);
      const formatTotalExp = formatNumber(data.totals.exp);

      const displayBudgetValue =
        data.budgetValue <= 0
          ? `- ${formatBudgetValue}`
          : `+ ${formatBudgetValue}`;

      const displayTotalinc =
        data.totals.inc <= 0 ? `- ${formatTotalinc}` : `+ ${formatTotalinc}`;

      const displayTotalExp =
        data.totals.exp <= 0 ? `- ${formatTotalExp}` : `+ ${formatTotalExp}`;

      return {
        displayBudgetValue,
        displayTotalinc,
        displayTotalExp,
        percentage: data.percentage
      };
    },
    deleteBudgetItem: (type, id) => {
      data.deleteItem(type, id);
    }
  };
})();

/*
 * UI Controller
 */
const uiController = (() => {
  const domStringElements = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    budgetValue: '.budget__value',
    budgetincomeValue: '.budget__income--value',
    budgetExpensesValue: '.budget__expenses--value',
    budgetExpensesPercentage: '.budget__expenses--percentage',
    listContainer: '.container',
    expenseItemPercentage: '.item__percentage',
    budgetMonth: '.budget__title--month'
  };

  return {
    getInput: () => {
      const { inputType, inputDescription, inputValue } = domStringElements;

      return {
        type: document.querySelector(inputType).value, // will be either inc or exp
        description: document.querySelector(inputDescription).value,
        value: parseFloat(document.querySelector(inputValue).value)
      };
    },
    addListItem: transaction => {
      document
        .querySelector(transaction.getHtmlElementName())
        .insertAdjacentHTML('beforeend', transaction.getHTML());
    },
    deleteListItem: selectorId => {
      const elementToDelete = document.getElementById(selectorId);
      elementToDelete.parentNode.removeChild(elementToDelete);
    },
    clearFields: () => {
      const { inputDescription, inputValue } = domStringElements;

      const fields = document.querySelectorAll(
        `${inputDescription},
            ${inputValue}`
      );
      for (const field of fields) {
        field.value = '';
      }
      fields[0].focus();
    },
    displayBudget: budgetData => {
      const {
        displayBudgetValue,
        displayTotalinc,
        displayTotalExp,
        percentage
      } = budgetData;

      const {
        budgetValue,
        budgetincomeValue,
        budgetExpensesValue,
        budgetExpensesPercentage
      } = domStringElements;

      document.querySelector(budgetValue).textContent = displayBudgetValue;

      document.querySelector(budgetincomeValue).textContent = displayTotalinc;

      document.querySelector(budgetExpensesValue).textContent = displayTotalExp;

      document.querySelector(budgetExpensesPercentage).textContent =
        percentage > 0 ? `${percentage} %` : '---';
    },
    displayPercentages: listExpenPer => {
      const { expenseItemPercentage } = domStringElements;

      const percentageFiels = document.querySelectorAll(expenseItemPercentage);

      percentageFiels.forEach(
        (currField, index) =>
          (currField.textContent =
            listExpenPer[index] > 0 ? `${listExpenPer[index]} %` : '---')
      );
    },
    displayMonth: () => {
      const { budgetMonth } = domStringElements;
      const now = new Date();
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Agust',
        'September',
        'October',
        'November',
        'December'
      ];

      document.querySelector(budgetMonth).textContent = months[now.getMonth()];
    },
    changeType: () => {
      const {
        inputType,
        inputDescription,
        inputValue,
        inputButton
      } = domStringElements;

      const fields = document.querySelectorAll(
        `${inputType},${inputDescription},${inputValue}`
      );

      fields.forEach(field => field.classList.toggle('red-focus'));

      document.querySelector(inputButton).classList.toggle('red');
    },
    getDoomStrings: () => domStringElements
  };
})();

/*
 * Global app Controller
 */
const globalController = ((budgetCtrl, uiCtrl) => {
  /**
   * func to setup event listeners
   */
  function setupEventListeners() {
    const { inputButton, listContainer, inputType } = uiCtrl.getDoomStrings();

    document.querySelector(inputButton).addEventListener('click', crltAddItem);
    document.addEventListener('keypress', event => {
      if (event.keyCode === 13 || event.which === 13) {
        crltAddItem();
      }
    });

    document
      .querySelector(listContainer)
      .addEventListener('click', crlDeleteItem);

    document
      .querySelector(inputType)
      .addEventListener('change', uiCtrl.changeType);
  }

  /**
   * delete the elements
   * @param event
   */
  function crlDeleteItem(event) {
    const itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (!itemId) {
      return;
    }

    const splitItem = itemId.split('-');
    const splitItemType = splitItem[0];
    const splitItemId = parseInt(splitItem[1]);
    budgetCtrl.deleteBudgetItem(splitItemType, splitItemId);
    uiCtrl.deleteListItem(itemId);
    updateBudget(splitItemType);
    updatePercentages();
  }

  /**
   * func to upgrade budget
   * @param type the transaction's type, it could be inc or exp.
   */
  function updateBudget(type) {
    budgetCtrl.calculateBudget(type);
    const budgetData = budgetCtrl.getDisplayBudgetData();
    uiCtrl.displayBudget(budgetData);
  }

  function updatePercentages() {
    budgetCtrl.calculateExpenPercentage();
    uiCtrl.displayPercentages(budgetCtrl.getExpenPercentages());
  }

  /**
   * func to global add new items to inc and expenses
   */
  function crltAddItem() {
    const { description, value, type } = uiCtrl.getInput();

    if (description === '' || isNaN(value) || value <= 0) {
      return;
    }

    const budgetItem = budgetCtrl.addItemToBudget({ description, value, type });
    uiCtrl.addListItem(budgetItem);
    uiCtrl.clearFields();
    updateBudget(type);
    updatePercentages();
  }

  return {
    init: () => {
      setupEventListeners();

      uiCtrl.displayBudget({
        displayBudgetValue: '-0.00',
        displayTotalinc: '-0.00',
        displayTotalExp: '-0.00',
        percentage: -1
      });

      uiCtrl.displayMonth();
    }
  };
})(budgetController, uiController);

globalController.init();
