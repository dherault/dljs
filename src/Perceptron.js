const Matrix = require('./Matrix');
const NeuralNetwork = require('./NeuralNetwork');

/*
  Perceptron
*/

class Perceptron extends NeuralNetwork {
  constructor(inputDefinition, hiddenLayersDefinition, outputDefinition) {
    super();

    // if (_) {
    //   if (!Array.isArray(inputsDefinition)) throw new Error('!');  // tbc...
    //   if (!Array.isArray(hiddenLayersDefinition)) throw new Error('!');
    //   if (!Array.isArray(outputsDefinition)) throw new Error('!');
    // }

    // TODO: input and output as plain integers
    // TODO: put many things in storage
    this.inputKeys = Object.keys(inputDefinition);
    this.outputKeys = Object.keys(outputDefinition);

    // TODO: rename topology
    const topology = hiddenLayersDefinition.slice();
    topology.unshift(this.inputKeys.length);
    topology.push(this.outputKeys.length);
    this.topology = topology;

    this.weightsMatrices = [];

    topology.forEach((fanOut, i) => {
      if (!i) return;

      const fanIn = topology[i - 1] + 1; // Added intercept

      // TODO: frame the randomness with formulas for each activation fn
      // http://www.jmlr.org/proceedings/papers/v9/glorot10a/glorot10a.pdf?hc_location=ufi
      const r = Math.sqrt(6 / (fanIn + fanOut)); // For sigmoid

      this.weightsMatrices.push(Matrix.random(fanOut, fanIn, -r, r));
    });

    this.hiddenLayers = hiddenLayersDefinition.slice();

    this.registerEvents();

    this.plug = () => null;
    this.setHyperParametersStorage = () => null;
  }

  convertExampleToInputs(example) {
    const data = new Float32Array(this.inputKeys.length);

    this.inputKeys.forEach((key, i) => data[i] = example[key]);

    // return new Vector(data, true, true);
  }

  // Horrible naming conventions
  convertOutputsToExample(outputs) {
    const example = {};
    const oData = outputs.data;

    this.outputKeys.forEach((key, i) => example[key] = oData[i]);

    return example;
  }

  forward(dataset) {
    // console.log(dataset.designMatrix.printDim());

    const { topology, weightsMatrices } = this;
    const activationFn = x => 1 / (1 + Math.exp(-x));

    let outputs = dataset.designMatrix;

    for (let i = 0, l = topology.length - 1; i < l; i++) {
      // console.log('\n___i___', i);
      // console.log(`\n${i}:`, outputs.printDim(), outputs.get(outputs.R - 1, outputs.C - 1));
      // console.log(`${i} - start:`, outputs.printDim());
      // outputs = outputs.augment('left', 1);
      // console.log(`${i} - augmented:`, outputs.printDim());
      // console.log(`${i} - weightsMatrix:`, weightsMatrices[i].printDim());
      // outputs = outputs.multiplyMatrix(weightsMatrices[i].transpose());
      // console.log(`${i} - multiplied:`, outputs.printDim());
      // outputs = outputs.map(activationFn);
      // console.log(`${i} - mapped:`, outputs.printDim());
      // console.log('\nend:', outputs.toString());
      // console.log('Weights:', weightsMatrices[i].printDim());
      // break;

      outputs = outputs.augment('left', 1).multiplyMatrix(weightsMatrices[i].transpose()).map(activationFn);
    }

    // console.log(outputs.toString())

    return outputs;
  }

  predict(example) {
    this.events.onBeforeRun(example);

    // Maybe some validation
    const { topology, weightsMatrices } = this;
    const intercept = 1;
    console.log('Dataset:', example);

    let outputs = this.convertExampleToInputs(example);

    console.log('Inputs:', example.printDim());
    // const activationFn = x => Math.max(x, 0); // ReLU
    // const activationFn = x => x / ( 1 + Math.abs(x)); // Softsign
    const activationFn = x => 1 / (1 + Math.exp(-x)); // Sigmoid

    // Forward propagation 🌠
    for (let i = 0, l = topology.length - 1; i < l; i++) {
      // console.log('\n___i___', i);
      // console.log('\nbegin:', outputs.toString());
      // outputs = outputs.augmentBeginning(intercept);
      // console.log('\naugmented:', outputs.toString());
      // console.log('\nweightsMatrix:', weightsMatrices[i].toString());
      // outputs = weightsMatrices[i].multiplyMatrix(outputs);
      // console.log('\nmultiplied:', outputs.toString());
      // outputs = outputs.map(activationFn);
      // console.log('\nend:', outputs.toString());
      // console.log('Weights:', weightsMatrices[i].printDim());
      // continue;

      outputs = weightsMatrices[i].multiplyMatrix(outputs.augmentBeginning(intercept)).map(activationFn);
    }

    // ...
    this.events.onAfterRun();

    return this.convertOutputsToExample(outputs);
  }

  train() {
    this.events.onBeforeTrain();
    // ...
    this.events.onAfterTrain();
  }
}

module.exports = Perceptron;
