// const _ = process.env.NODE_ENV !== 'production';
const Matrix = require('./Matrix');
const NeuralNetwork = require('./NeuralNetwork');
const Perceptron = require('./Perceptron');
const LabeledDataset = require('./LabeledDataset');

// Training a neural network:
// - Randomly initialize weights
// - Implement forward propagation
// - Implement code to compute the cost function
// - Implement backward propagation
// - Use gradient checking to compare J gradient and Delta (disable gradient checking on production)
// - Use gradient descent (or watever) to try to minimize J, and get new thetas

module.exports = { Matrix, NeuralNetwork, Perceptron, LabeledDataset };
