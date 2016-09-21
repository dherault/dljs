const { LabeledDataset, FeedforwardNetwork } = require('dljs');
const Dashboard = require('dljs-dashboard');
const iris = require('../_data/iris');

/* Data */
const dataset = new LabeledDataset(iris, 'species', { scale: true });

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

/* FeedforwardNetwork */
const nn = new FeedforwardNetwork(inputsDefinition, [4, 5, 6, 7, 8, 7, 6, 5, 4, 3], outputsDefinition);

/* Params */
nn.regularizationCoef = 0;

/* Plugins */
nn.plug(new Dashboard());

/* Logic */
nn.dashboard.serve().then(() => {

  nn.dashboard.log('Hello from example file!');

  console.log('Serve ok, awaiting input...');

  nn.dashboard.awaitInput().then(() => {

    const result3 = nn.costFunction(dataset);

    nn.dashboard.log('cost:', result3);
  });
});

process.on('unhandledRejection', reason => console.log(reason));
