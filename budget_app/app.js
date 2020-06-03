/*
 * Budget Controller
 */
const budgetController = (() => {
  /*
   * Transaction object to set up the commun data between Expenses and Incomes objects.
   */
  function Transaction(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  /**
   * function to extend a child from a parent object
   * @param Child object which will extend from parent.
   * @param Parent object which will be extended.
   */
  function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
  }

  /**
   * Creates a new transaction that could be and Expenses or an Income
   * @param ID Int with the unique value for the transaction
   * @param type it could be exp or inc for the transaction's type
   * @param desc transaction's description
   * @param val transaction's value
   */
  function createTransaction(ID, type, desc, val) {
    switch (type) {
      case 'inc':
        return new Income(ID, desc, val);
      case 'exp':
        return new Expense(ID, desc, val);
    }
  }

  /*
   * Expense object and it's functions.
   */
  function Expense(id, description, value) {
    Transaction.call(this, id, description, value);
  }

  extend(Expense, Transaction);

  /**
   * get the html component that should be placed
   */
  Expense.prototype.getHTML = function () {
    return `<div class="item clearfix" id="expense-${this.id}"><div class="item__description">${this.description}</div><div class="right clearfix"><div class="item__value">- ${this.value}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
  };

  /**
   * get the element name where should be set the html
   */
  Expense.prototype.getHtmlElementName = function () {
    return '.expenses__list';
  };

  function Income(id, description, value) {
    Transaction.call(this, id, description, value);
  }

  extend(Income, Transaction);

  /**
   * get the html component that should be placed
   */
  Income.prototype.getHTML = function () {
    return `<div class="item clearfix" id="income-${this.id}"><div class="item__description">${this.description}</div><div class="right clearfix"><div class="item__value">+ ${this.value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
  };

  /**
   * get the element name where should be set the html
   */
  Income.prototype.getHtmlElementName = function () {
    return '.income__list';
  };

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
    budget: 0,
    percentage: -1,
    calculateTotals: function (type) {
      this.totals[type] = this.allItems[type]
        .map(transaction => transaction.value)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    },
    calculateBudget: function () {
      this.budget = this.totals.inc - this.totals.exp;
    },
    calculateIncomePercentage: function () {
      if (this.totals.inc > 0) {
        this.percentage = Math.round((this.totals.exp / this.totals.inc) * 100);
      }
    }
  };

  return {
    addItemToBudget: (type, desc, val) => {
      //create new ID
      let ID;
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // create new item base on the type
      let newItem = createTransaction(ID, type, desc, val);
      // push it into our data structure
      data.allItems[type].push(newItem);
      return newItem;
    },
    calculateBudget: type => {
      // 1. calculate total income and expenses
      data.calculateTotals(type);
      // 2. calculate budget: income - expenses
      data.calculateBudget();
      // 3. calculate percentage of income that was spend
      data.calculateIncomePercentage();
    },
    getBudget: () => {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
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
    inputButton: '.add__btn'
  };

  return {
    getInput: () => {
      return {
        type: document.querySelector(domStringElements.inputType).value, // will be either inc or exp
        description: document.querySelector(domStringElements.inputDescription)
          .value,
        value: parseFloat(
          document.querySelector(domStringElements.inputValue).value
        )
      };
    },
    getAddListItem: transaction => {
      document
        .querySelector(transaction.getHtmlElementName())
        .insertAdjacentHTML('beforeend', transaction.getHTML());
    },
    clearFields: () => {
      const fields = document.querySelectorAll(
        `${domStringElements.inputDescription},
            ${domStringElements.inputValue}`
      );
      for (const field of fields) {
        field.value = '';
      }
      fields[0].focus();
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
    const { inputButton } = uiCtrl.getDoomStrings();
    document.querySelector(inputButton).addEventListener('click', crltAddItem);
    document.addEventListener('keypress', event => {
      if (event.keyCode === 13 || event.which === 13) {
        crltAddItem();
      }
    });
  }

  /**
   * func to upgrade budget
   * @param type the transaction's type, it could be inc or exp.
   */
  function updateBudget(type) {
    budgetCtrl.calculateBudget(type);
    const budget = budgetCtrl.getBudget();
    console.log(budget);
    // TODO continue this step
    // 3. Display the budget
  }

  /**
   * func to global add new items to inc and expenses
   */
  function crltAddItem() {
    const { type, description, value } = uiCtrl.getInput();

    if (description === '' || isNaN(value) || value <= 0) {
      return;
    }

    const budgetItem = budgetCtrl.addItemToBudget(type, description, value);
    uiCtrl.getAddListItem(budgetItem);
    uiCtrl.clearFields();
    updateBudget(type);
  }

  return {
    init: () => {
      console.log('App has started');
      setupEventListeners();
    }
  };
})(budgetController, uiController);

globalController.init();
