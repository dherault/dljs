const isNumeric = require('./isNumeric');

module.exports = function createRandomSquareMatrixData(n) {
  if (!isNumeric(n)) throw new Error('createRandomSquareMatrixData: given size is not a number');

  const data = [];
  const size = Math.round(Math.abs(n));

  for (let i = 0; i < size; i++) {
    data.push([]);
    for (let j = 0; j < size; j++) {
      data[i].push(Math.random());
    }
  }

  return data;
};
