const jhon = {
  fullName: 'Jhon',
  mass: 90,
  height: 1.97,
  calculateBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
  }
};

const mark = {
  fullName: 'Mark',
  mass: 60,
  height: 1.7,
  calculateBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
  }
};

function main() {
  jhon.calculateBMI();
  mark.calculateBMI();

  const winner = jhon.bmi > mark.bmi ? jhon : mark;

  console.log(`The winner is ${winner.fullName} with a BMI of ${winner.bmi}`);
}

main();
