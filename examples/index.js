/* eslint-disable no-unused-vars */
const { Matrix, LabeledDataset, Perceptron } = require('../src');

const iris = require('../data/iris');
const dataset = new LabeledDataset(iris, 'species', { scale: true });

// console.log(dataset.designMatrix.printDim());
// console.log(dataset.designMatrix.toString());

console.log('Original:', iris[0]);
console.log('Scaled:', dataset.get(0));

const inputsDefinition = {
  sepalLength: true,
  sepalWidth: true,
  petalLength: true,
  petalWidth: true,
};

const outputsDefinition = {
  setosa: true,
  versicolor: true,
  virginica: true,
};
// process.exit();
const nn = new Perceptron(inputsDefinition, [4, 5, 6, 7, 8, 7, 6, 5, 4, 3], outputsDefinition);

// const result1 = nn.predict(example);
const result2 = nn.forward(dataset);

console.log(result2.toString());
