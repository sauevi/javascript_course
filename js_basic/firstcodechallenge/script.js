/*
 * calculates the BMI
 */
const calculateBMI = (mass, height) => {
  return mass / (height * height);
};

/*
 * calculates who has a higher BMI
 */
const higherBMI = (jhonBMI, markBMI) => {
  return jhonBMI > markBMI ? 'jhon has higher BMI' : 'mark has higher BMI';
};

function main() {
  const jhonBMI = calculateBMI(60, 1.7);
  const markBMI = calculateBMI(80, 1.95);

  console.log(higherBMI(jhonBMI, markBMI));
}

main();
