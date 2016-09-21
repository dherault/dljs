/* eslint-disable no-unused-vars */

// Time everything
const d = new Date();

const { Matrix, LabeledDataset, FeedforwardNetwork } = require('dljs');
const iris = require('../_data/iris');

const dataset = new LabeledDataset(iris, 'species', { scale: true });

const inputLayerDefinition = {
  sepalLength: true,  // Some params could be offered instead of true
  sepalWidth: true,   // Note to self: if no params in the future, use array of strings
  petalLength: true,
  petalWidth: true,
};

const outputLayerDefinition = {
  setosa: true,
  versicolor: true,
  virginica: true,
};

// Maybe the inputLayerDefinition and outputLayerDefinition could be obtained with a method like
// dataset.getExtremeLayersDefinition();

const nn = new FeedforwardNetwork({
  inputLayerDefinition,
  outputLayerDefinition,
  hiddenLayersDefinition: [4, 5, 6, 7, 8, 7, 6, 5, 4, 3],
  // Non-mandatory::
  regularizationCoef: 0,
  learningRate: 0.1,
  costFunction: () => Infinity, // :)
  regularizationFunction: () => 0, // :)
});

console.log(`Done. (${new Date() - d}ms)`);
