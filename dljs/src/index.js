// const _ = process.env.NODE_ENV !== 'production';
const Matrix = require('./Matrix');
const Plugin = require('./Plugin');
const LabeledDataset = require('./LabeledDataset');
const FeedforwardNetwork = require('./FeedforwardNetwork');

// Training a neural network:
// - Randomly initialize weights
// - Implement forward propagation
// - Implement code to compute the cost function
// - Implement backward propagation
// - Use gradient checking to compare J gradient and Delta (disable gradient checking on production)
// - Use gradient descent (or watever) to try to minimize J, and get new thetas

module.exports = { Matrix, FeedforwardNetwork, LabeledDataset, Plugin };
