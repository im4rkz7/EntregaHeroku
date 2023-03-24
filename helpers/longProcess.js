process.on("message", (cant) => {
  let arrayNumbers = [];

  for (let i = 0; i < cant; i++) {
    const numberAdd = Math.round(Math.random() * 1000);

    const indexNumber = arrayNumbers.findIndex(
      (numberArray) => numberArray.number === numberAdd
    );

    if (indexNumber !== -1) {
      arrayNumbers[indexNumber].quantity++;
    } else {
      const numberObj = {
        number: numberAdd,
        quantity: 1,
      };

      arrayNumbers.push(numberObj);
    }
  }

  process.send({ arrayNumbers });
});
