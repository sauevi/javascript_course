const calculateJhonTip = amount => {
  if (amount < 50) {
    return amount * 0.2;
  }

  if (amount >= 50 && amount <= 200) {
    return amount * 0.15;
  }

  if (amount > 200) {
    return amount * 0.1;
  }

  return 0;
};

jhonPayments = {
  bills: [124, 48, 268, 180],
  calculateTotalPay: function () {
    const tips = new Array();
    this.totalPay = this.bills.map(bill => {
      let tip = calculateJhonTip(bill);
      tips.push(tip);
      return tip + bill;
    });
    this.tips = tips;
  }
};

const calculateMarkTip = amount => {
  if (amount < 100) {
    return amount * 0.2;
  }

  if (amount >= 100 && amount <= 300) {
    return amount * 0.1;
  }

  if (amount > 300) {
    return amount * 0.25;
  }

  return 0;
};

makPayments = {
  bills: [77, 475, 110, 45],
  calculateTotalPay: function () {
    const tips = new Array();
    this.totalPay = this.bills.map(bill => {
      let tip = calculateMarkTip(bill);
      tips.push(tip);
      return tip + bill;
    });
    this.tips = tips;
  }
};

const calculateAverage = tips => {
  const total = tips.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  return total / tips.length;
};

function main() {
  jhonPayments.calculateTotalPay();
  makPayments.calculateTotalPay();

  console.log(
    `Jhon's familly tips: ${jhonPayments.tips} for a total of ${jhonPayments.totalPay}`
  );
  console.log(
    `Marks's familly tips: ${makPayments.tips} for a total of ${makPayments.totalPay}`
  );

  jhonPayments.average = calculateAverage(jhonPayments.tips);
  makPayments.average = calculateAverage(makPayments.tips);

  jhonPayments.average > makPayments.average
    ? console.log(
        `Jhon's familly pay more with an average of $${jhonPayments.average}`
      )
    : console.log(
        `Mark's familly pay more with an average of $${makPayments.average}`
      );
}

main();
