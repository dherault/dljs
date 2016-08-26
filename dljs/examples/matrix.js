/* eslint-disable no-unused-vars */
const { Matrix } = require('../src');

const d3 = [
  1, 2, 3,
  4, 5, 6,
  7, 8, 9,
];

const d23 = [
  1, 2, 3,
  4, 5, 6,
];

const m23 = new Matrix(2, 3, d23);
const m3 = new Matrix(3, 3, d3);
const mr45 = Matrix.zeroes(5, 4);
// const mr45 = Matrix.random(5, 4);

// console.log(m23.augment('left', 1).toString());
// console.log();
// console.log(m3.augment('left', 1).toString());
console.log(mr45.augment('left', 1).toString(), '\n');
console.log(mr45.augment('right', 1).toString(), '\n');
console.log(mr45.augment('top', 1).toString(), '\n');
console.log(mr45.augment('bottom', 1).toString(), '\n');
