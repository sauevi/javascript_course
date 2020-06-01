const calculateTip = amount => {
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

function main() {
  const bills = [124, 48, 268];

  const tips = new Array();

  const totalToPay = bills.map(bill => {
    let tip = calculateTip(bill);
    tips.push(tip);
    return tip + bill;
  });

  console.log(`Tips: ${tips}`);
  console.log(`Total to pay: ${totalToPay}`);
}

main();
