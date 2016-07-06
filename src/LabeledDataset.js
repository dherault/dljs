const Matrix = require('./Matrix');

// todo: https://en.wikipedia.org/wiki/Normalization_(statistics)
function scaleData(dataset, options) {
  const params = {};

  let keys;
  if (Array.isArray(options)) keys = options;
  else if (typeof options === 'object') keys = Object.keys(options);
  else keys = Object.keys(dataset[0]);
  // console.log('scaleData', keys);

  keys.forEach(key => {
    let max;
    let min = max = dataset[0][key];

    dataset.forEach(example => {
      const val = example[key];
      min = Math.min(min, val);
      max = Math.max(max, val);
    });

    params[key] = { min, max };
  });

  return dataset.map(example => {
    const scaledExample = {};

    keys.forEach(key => {
      const { min, max } = params[key];

      scaledExample[key] = (example[key] - min) / (max - min);
    });

    return Object.assign({}, example, scaledExample);
  });
}

class LabeledDataset {
  constructor(data, labelKey, { scale, validation }) {
    const rawInputs = [];
    const labels = [];
    const keys = Object.keys(data[0]);
    const li = keys.indexOf(labelKey);
    const inputsKeys = keys.slice(0, li).concat(keys.slice(li + 1));

    this.keys = keys;
    this.originalData = data;

    // Data validation

    if (validation) {
      if (!labelKey) throw new Error('Da fuck');

      data.forEach((example, i) => {
        if (Object.keys(example).some(key => !keys.includes(key))) throw new Error(`Example ${i} pb\n${example}`);
        // other validation
      });
    }

    // Inputs and labels extraction

    data.forEach(example => {
      const e = Object.assign({}, example);

      labels.push({ [labelKey]: e[labelKey] });

      delete e[labelKey];

      rawInputs.push(e);
    });

    this.rawInputs = rawInputs;
    this.labels = labels;

    // Scaling

    const workingInputs = scale ? scaleData(rawInputs, scale) : rawInputs;

    this.workingInputs = workingInputs;

    // Design matrix

    function flattenInputs(inputs, keys) {
      return inputs.map(example => {
        const a = [];
        keys.forEach(key => a.push(example[key]));

        return a;
      }).reduce((a, b) => a.concat(b), []);
    }

    this.designMatrix = new Matrix(workingInputs.length, inputsKeys.length, flattenInputs(workingInputs, inputsKeys));
  }

  get(i) {
    const { keys } = this;
    const o = {};

    this.designMatrix.getRow(i).forEach((x, i) => o[keys[i]] = x);

    return o;
  }

}

module.exports = LabeledDataset;
