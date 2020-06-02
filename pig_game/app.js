/**
 * Create Player
 */
class Player {
  constructor(id, isPlaying) {
    this._id = id;
    this._roundScore = 0;
    this._globalScore = 0;
    this._isPlaying = isPlaying;
  }

  get id() {
    return this._id;
  }

  get roundScore() {
    return this._roundScore;
  }

  set roundScore(score) {
    this._roundScore += score;
  }

  get globalScore() {
    return this._globalScore;
  }

  set globalScore(value) {
    this._globalScore = value;
  }

  get isPlaying() {
    return this._isPlaying;
  }

  set isPlaying(changePlayer) {
    this._isPlaying = changePlayer;
    this._roundScore = 0;
  }
}

/**
 * initialize both players
 */
const playerOne = new Player(0, true);
const playerTwo = new Player(1, false);

/**
 * Create Dices
 */
class Dice {
  constructor() {
    this._value = 0;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  rollDice() {
    this._value = Math.floor(Math.random() * 6) + 1;
  }
}

/**
 * initialize both players
 */
const diceOne = new Dice();
const diceTwo = new Dice();

/**
 * Function to get the player that is playing at this moment
 */
function getCurrentPlayer() {
  if (playerOne._isPlaying) {
    return playerOne;
  } else {
    return playerTwo;
  }
}

/**
 *  Function to change player
 @params player that is playing at this moment
 */
function changePlayer(player) {
  diceOne.value = 0;
  diceTwo.value = 0;
  if (player.id === 0) {
    playerOne.isPlaying = false;
    playerTwo.isPlaying = true;
    document.getElementById(`current-score-0`).textContent = 0;
    document.getElementById(`player-1-panel`).classList.toggle('active');
    document.getElementById(`player-0-panel`).classList.remove('active');
  }

  if (player.id === 1) {
    playerOne.isPlaying = true;
    playerTwo.isPlaying = false;
    document.getElementById(`current-score-1`).textContent = 0;
    document.getElementById(`player-0-panel`).classList.toggle('active');
    document.getElementById(`player-1-panel`).classList.remove('active');
  }
}

/**
 *  Function to set the player that won the game
 @params player that is playing at this moment
 */
function winGame(currentPlayer) {
  document.getElementById(`name-${currentPlayer.id}`).textContent = 'WINNER';
  document.getElementById('dice-0-img').style.display = 'none';
  document.getElementById('dice-1-img').style.display = 'none';
  document
    .getElementById(`player-${currentPlayer.id}-panel`)
    .classList.add('winner');
  document
    .getElementById(`player-${currentPlayer.id}-panel`)
    .classList.remove('active');
  document.getElementById('bnt-roll-dice').style.display = 'none';
  document.getElementById('bnt-hold-game').style.display = 'none';
}

/*
 * Function for roll dice an set values for current score and dice image as well.
 */
function rollDice() {
  const currentPlayer = getCurrentPlayer();
  const lastValueDiceOne = diceOne.value;
  const lastValueDiceTwo = diceTwo.value;
  diceOne.rollDice();
  diceTwo.rollDice();
  const currentValueDiceOne = diceOne.value;
  const currentValueDiceTwo = diceTwo.value;

  const diceOneElement = document.getElementById('dice-0-img');
  diceOneElement.style.display = 'block';
  diceOneElement.src = `images/dice-${currentValueDiceOne}.png`;

  const diceTwoElement = document.getElementById('dice-1-img');
  diceTwoElement.style.display = 'block';
  diceTwoElement.src = `images/dice-${currentValueDiceTwo}.png`;

  currentPlayer.roundScore = currentValueDiceOne + currentValueDiceTwo;

  if (
    lastValueDiceOne === 6 &&
    currentValueDiceOne === 6 &&
    lastValueDiceTwo === 6 &&
    currentValueDiceTwo === 6
  ) {
    currentPlayer.globalScore = 0;
    currentPlayer.roundScore = 0;
    changePlayer(currentPlayer);
  }

  if (currentValueDiceOne === 1 || currentValueDiceTwo === 1) {
    changePlayer(currentPlayer);
  }

  document.getElementById(`current-score-${currentPlayer.id}`).textContent =
    currentPlayer.roundScore;
}

/*
 * Function for hold current value and change the player.
 */
function holdGame() {
  diceOne.value = 0;
  diceTwo.value = 0;
  const currentPlayer = getCurrentPlayer();
  currentPlayer.globalScore =
    currentPlayer.globalScore + currentPlayer.roundScore;
  document.getElementById(`global-score-${currentPlayer.id}`).textContent =
    currentPlayer.globalScore;
  const winninScore = document.getElementById('final-score').value
    ? document.getElementById('final-score').value
    : 100;
  if (currentPlayer.globalScore >= winninScore) {
    winGame(currentPlayer);
  } else {
    changePlayer(currentPlayer);
  }
}

/*
 * Function for hold current value and change the player.
 */
function startNewGame() {
  // initialize dice
  diceOne.value = 0;
  diceTwo.value = 0;
  // initialize player one
  playerOne.isPlaying = true;
  playerOne.roundScore = 0;
  playerOne.globalScore = 0;
  // initialize player two
  playerTwo.isPlaying = false;
  playerTwo.roundScore = 0;
  playerTwo.globalScore = 0;
  // initialize elements
  document.getElementById(`current-score-0`).textContent = 0;
  document.getElementById(`current-score-1`).textContent = 0;

  document.getElementById(`global-score-0`).textContent = 0;
  document.getElementById(`global-score-1`).textContent = 0;

  document.getElementById('dice-0-img').style.display = 'none';
  document.getElementById('dice-1-img').style.display = 'none';

  document.getElementById('bnt-roll-dice').style.display = 'block';
  document.getElementById('bnt-hold-game').style.display = 'block';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('player-0-panel').classList.remove('winner');
  document.getElementById('player-0-panel').classList.add('active');

  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById('player-1-panel').classList.remove('winner');
  document.getElementById('player-1-panel').classList.remove('active');

  document.getElementById('final-score').value = '';
}
