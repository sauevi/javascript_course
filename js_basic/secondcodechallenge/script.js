/*
 * calculate the average
 */
const calculateAverage = teamScore => {
  return (
    (teamScore.fistScore + teamScore.secondScore + teamScore.lastScore) / 3
  );
};

/*
 * decide who has the higher average
 */
const isWinner = (jhonAverage, mikeAverage, marryAverage) => {
  if (jhonAverage === mikeAverage && jhonAverage === marryAverage) {
    return 'is a draw';
  }

  let winner = '';
  if (jhonAverage > mikeAverage && jhonAverage > marryAverage) {
    winner = `jhon is the winner with an average of ${jhonAverage}.`;
  } else if (mikeAverage > jhonAverage && mikeAverage > marryAverage) {
    winner = `mike is the winner with an average of ${mikeAverage}.`;
  } else if (marryAverage > jhonAverage && marryAverage > mikeAverage) {
    winner = `Marry is the winner with an average of ${marryAverage}.`;
  } else {
    winner = 'There is a draw.';
  }

  return winner;
};

/*
 * Create team scores
 */
const createTeamScores = (fistScore, secondScore, lastScore) => {
  return {
    fistScore,
    secondScore,
    lastScore
  };
};

function main() {
  const jhonScores = createTeamScores(89, 120, 103);
  const mikeScores = createTeamScores(116, 94, 123);
  const marryScores = createTeamScores(97, 134, 105);

  const jhonAverage = calculateAverage(jhonScores);
  const mikeAverage = calculateAverage(mikeScores);
  const marryAverage = calculateAverage(marryScores);

  console.log(isWinner(jhonAverage, mikeAverage, marryAverage));
}

main();
