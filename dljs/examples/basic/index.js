// Time everything
const d = new Date();

/* eslint-disable no-unused-vars */
const { Matrix, LabeledDataset, FeedforwardNetwork } = require('dljs');
const Dashboard = require('dljs-dashboard');
const iris = require('../data/iris');

const dataset = new LabeledDataset(iris, 'species', { scale: true });

// console.log(dataset.designMatrix.printDim());
// console.log(dataset.designMatrix.toString());

// console.log('Original:', iris[0]);
// console.log('Scaled:', dataset.get(0));

const inputsDefinition = {
  sepalLength: true, // Some params could be offered instead of true
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
const nn = new FeedforwardNetwork(inputsDefinition, [4, 5, 6, 7, 8, 7, 6, 5, 4, 3], outputsDefinition);
// process.exit();

/* Params */
nn.regularizationCoef = 0;

/* Plugins */
nn.plug(new Dashboard()); // TODO: accept arrays of plugins

nn.dashboard.serve(err => {
  if (err) return console.error(err);

  nn.dashboard.log('Hello from server!');

  console.log('Serve ok, awaiting input...');

  nn.dashboard.awaitInput('Click to start', () => {

    // const result1 = nn.predict(example);
    // const result2 = nn.forward(dataset);
    const result3 = nn.costFunction(dataset);

    nn.dashboard.log('cost:', result3);
    // console.log(dataset.labelsMatrix);
    // console.log(result2.toString());
    // console.log(result3);

    console.log(`Done. (${new Date() - d}ms)`);
  });


});
