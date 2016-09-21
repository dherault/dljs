const { Matrix: DljsMatrix } = require('dljs');
const math = require('mathjs');

const mathjsMatrix = math.matrix;

console.log('Matrix benchmark');

const nRows = 300;
const nCols = 300;

console.log(`- Creating data (${nRows} x ${nCols})...`);

const dljsData = [];
const mathjsData = [];

let d, tmp, x;

for (let i = 0; i < nRows; i++) {
  tmp = [];

  for (let j = 0; j < nCols; j++) {
    x = Math.random();
    tmp.push(x);
    dljsData.push(x);
  }

  mathjsData.push(tmp.slice());
}


console.log('- creation:');

d = Date.now();

const a = new DljsMatrix(nRows, nCols, dljsData);

console.log('dljs:', Date.now() - d);

d = Date.now();

const b = mathjsMatrix(mathjsData);

console.log('mathjs:', Date.now() - d);

console.log('- multiplication:');

d = Date.now();

a.multiplyMatrix(a).multiplyMatrix(a).multiplyMatrix(a);

console.log('dljs:', Date.now() - d);

d = Date.now();

math.multiply(b, math.multiply(b, math.multiply(b, b)));

console.log('mathjs:', Date.now() - d);
