(() => {
  function Question(question, possibleAnswer, correctAnswer) {
    this.question = question;
    this.possibleAnswer = possibleAnswer;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.printQuestions = function () {
    console.log(this.question);
    for (let i = 0; i < this.possibleAnswer.length; i++) {
      console.log(`${i}: ${this.possibleAnswer[i]}`);
    }
  };

  Question.prototype.validateAnswer = function (answer, callBack) {
    let score;
    if (answer === this.correctAnswer) {
      console.log('Winner');
      score = callBack(true);
    } else {
      console.log('Sorry, try again');
      score = callBack(false);
    }

    this.showScore(score);
  };

  Question.prototype.showScore = function (score) {
    console.log(`✨ Your score is ${score} ✨`);
  };

  const firstQuestion = new Question(
    'Is Js the best programming language ?',
    ['yes', 'no', 'what is JS ?'],
    0
  );
  const secondQuestion = new Question(
    'Is my name Saul?',
    ['no', 'yes', 'actually, is Jose'],
    1
  );
  const lastQuestion = new Question('How old I am?', ['18', '30', '27'], 2);

  const getRandomQuestion = (...allQuestions) => {
    return allQuestions[Math.floor(Math.random() * allQuestions.length)];
  };

  /*
   * update player score
   */

  function updatePlayerScore() {
    let score = 0;
    return function (isWinner) {
      if (isWinner) {
        score++;
      }
      return score;
    };
  }

  const playerScore = updatePlayerScore();

  /*
   * Run next question
   */
  function nextQuestion() {
    const randomQuestion = getRandomQuestion(
      firstQuestion,
      secondQuestion,
      lastQuestion
    );

    randomQuestion.printQuestions();
    const answer = prompt(
      `Please write the number of the correct answer, if you wants to end the game type 'exit'`
    );
    if (answer !== 'exit') {
      randomQuestion.validateAnswer(parseInt(answer), playerScore);
      nextQuestion();
    }
  }

  nextQuestion();
})();
