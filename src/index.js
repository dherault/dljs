const _ = process.env.NODE_ENV !== 'production';

/*
  -----
  Utils
  -----
*/

class DimensionError extends Error {
  constructor(methodName, a, b) {
    super(`${methodName}:\nfirst arg is ${a.printDim()}\nsecond arg is ${b.printDim()}`);
  }
}

/*
  ------
  Matrix
  ------
*/

class Matrix {

  constructor(nRows, nCols, array) {
    // We store the elements in this.data, in row-major order
    if (_) {
      try {
        this.data = Float32Array.from(array);
      } catch (err) {
        throw new Error(`Matrix.constructor: expected an array-like or iterable object, got a ${typeof array} instead.`);
      }
      if (array.length !== nRows * nCols) {
        throw new Error(`Matrix.constructor: array.length (${this.dim}) does not match given dimensions (${nRows} x ${nCols} !== ${nRows * nCols})`);
      }
    } else {
      this.data = Float32Array.from(array);
    }

    this.dim = array.length;
    this.nRows = nRows;
    this.nCols = nCols;
    this.isSquare = nRows === nCols;

    this.multiplyVector = this.multiplyMatrix;
  }

  get(i, j) {
    return this.data[i * this.nRows + j];
  }

  set(i, j, value) {
    this.data[i * this.nRows + j] = value;

    return this;
  }

  map(fn) {
    return new Matrix(this.nRows, this.nCols, this.data.map(fn));
  }

  add(x) {
    if (typeof x === 'number') return this.addScalar(x);
    if (x instanceof Matrix) return this.addMatrix(x);

    throw new Error(`Matrix.add: expected a number or a Matrix, got a ${typeof x} instead.`);
  }

  addScalar(s) {
    return this.map(x => x + s);
  }

  addMatrix(m) {
    if (_ && this.nRows !== m.nRows || this.nCols !== m.nCols) throw new DimensionError('Matrix.addMatrix', this, m);

    const vData = m.data;

    return this.map((x, i) => x + vData[i]);
  }

  multiply(x) {
    if (typeof x === 'number') return this.multiplyScalar(x);
    if (x instanceof Matrix || x instanceof Vector) return this.multiplyMatrix(x);

    throw new Error(`Matrix.multiply: expected a number or a Matrix, got a ${typeof x} instead.`);
  }

  multiplyScalar(s) {
    return this.map(x => x * s);
  }

  // TODO: optimize this s***
  multiplyMatrix(m) {
    if (_) {
      if (!(m instanceof Matrix || m instanceof Vector)) throw new Error(`Matrix.multiplyMatrix: expected a Matrix, got a ${typeof x} instead.`);
      if (this.nCols !== m.nRows) throw new DimensionError('Matrix.multiplyMatrix', this, m);
    }

    const C = m.nCols;
    const R = this.nRows;
    const mData = m.data;
    const xData = this.data;
    const newData = [];

    let sum, iR;

    for (let i = 0; i < R; i++) {
      iR = i * R;
      for (let j = 0; j < C; j++) {
        sum = 0;
        for (let k = C - 1; k >= 0; k--) {
          sum += xData[iR + k] * mData[k * R + j];
        }
        newData.push(sum);
      }
    }

    return new Matrix(R, C, newData);
  }

  transpose() {
    const R = this.nRows;
    const C = this.nCols;

    // Not really "in-place", but will do for now
    return new Matrix(C, R, this.data.map((x, i, a) => a[C * i - (C * R - 1) * Math.floor(i / R)]));
  }

  getRow(i) {
    const R = this.nRows;

    if (_ && i < 0 || i >= R || Math.floor(i) !== i) throw new Error(`Matrix.getRow: arg must be an integer between 0 and ${R - 1} (this.nRows - 1)`);

    const C = this.nCols;
    const mData = this.data;
    const vData = new Float32Array;

    for (let j = 0; j < C; j++) {
      vData[j] = mData[i * R + j];
    }

    return new Vector(vData, false);
  }

  getCol(j) {
    const C = this.nCols;

    if (_ && j < 0 || j >= C || Math.floor(j) !== j) throw new Error(`Matrix.getCol: arg must be an integer between 0 and ${C - 1} (this.nCols - 1)`);

    const R = this.nRows;
    const mData = this.data;
    const vData = new Float32Array;

    for (let i = 0; i < R; i++) {
      vData[j] = mData[i * R + j];
    }

    return new Vector(vData);
  }

  printDim() {
    return `${this.nRows} x ${this.nCols}`;
  }

  toString() {
    return `Matrix ${this.data}`;
  }
}

/*
  ------
  Vector
  ------
*/

class Vector {
  constructor(array, isCol = true) {
    // Vectors are basically column matrices
    if (_) {
      try {
        this.data = Float32Array.from(array);
      } catch (err) {
        throw new Error(`Vector.constructor: expected an array-like or iterable object, got a ${typeof array} instead.`);
      }
    } else {
      this.data = Float32Array.from(array);
    }

    const l = array.length;
    this.isCol = isCol;
    this.isRow = !isCol;
    this.dim = l;
    this.nCols = isCol ? 1 : l;
    this.nRows = isCol ? l : 1;

    this.multiplyVector = this.multiplyMatrix;
  }

  transpose() {
    return new Vector(this.data, !this.isCol);
  }

  dotProduct(v) {
    if (_) {
      if (!(v instanceof Vector)) throw new Error(`Vector.dotProduct: Expected arg to be a Vector, got ${typeof v} instead`);
      if (this.dim !== v.dim) throw new DimensionError('Vector.dotProduct', this, v);
    }

    const vData = v.data;

    return this.data.map((x, i) => x * vData[i]).reduce((a, b) => a + b, 0);
  }

  // TODO: optimize this s***
  // TODO: inherit or compose, dry
  multiplyMatrix(m) {
    if (_) {
      if (!(m instanceof Matrix || m instanceof Vector)) throw new Error(`Vector.multiplyMatrix: expected a Matrix or a Vector, got a ${typeof x} instead.`);
      if (this.nCols !== m.nRows) throw new DimensionError('Vector.multiplyMatrix', this, m);
    }

    const C = m.nCols;
    const R = this.nRows;
    const mData = m.data;
    const xData = this.data;
    const newData = [];

    let sum, iR;

    for (let i = 0; i < R; i++) {
      iR = i * R;
      for (let j = 0; j < C; j++) {
        sum = 0;
        for (let k = C - 1; k >= 0; k--) {
          sum += xData[iR + k] * mData[k * R + j];
        }
        newData.push(sum);
      }
    }

    return new Matrix(R, C, newData);
  }

  printDim() {
    return `${this.nRows} x ${this.nCols}`;
  }

  toString() {
    return `Matrix ${this.data}`;
  }
}

/*
  --
  DL
  --
*/

class NeuralNetwork {
  constructor() {
    this.hyperParametersStorage = new HyperParametersMemoryStorage();

    // Availlable events
    this.events = [
      'onBeforeTrain', 'onAfterTrain',
      'onBeforeRun', 'onAfterRun',
      // more to come
    ];

    this.registerEvents();
  }

  registerEvents() {
    this.events.forEach(e => {
      const listenersKey = `${e}Listeners`;

      // Listeners for a given event are stored in a hash
      const listenersHash = this[listenersKey] = this[listenersKey] || {};

      // An event triggers every listener in its listeners hash
      this[e] = (...args) => {
        for (const key in listenersHash) {
          const listener = listenersHash[key];

          // A listener can be null if unsubscribed
          if (typeof listener === 'function') listener(...args);
        }
      };
    });
  }

  addEventListener(event, listener) {
    if (!this.events.includes(event)) throw new Error('Expected event to be one of ${this.events}, got ${event} instead');
    if (typeof listener !== 'function') throw new Error(`Expected listener to be a function, got ${typeof listener} instead`);

    const listenersKey = `${event}Listeners`;
    const listenerKey = Math.random().toString();

    this[listenersKey][listenerKey] = listener;

    // We return the unsubscribe function
    return () => this[listenersKey][listenerKey] = null;
  }
}

class MultilayerPerceptron extends NeuralNetwork {
  constructor(hiddenLayersDefinition) {
    super();

    if (_ && !Array.isArray(hiddenLayersDefinition)) throw new Error('!');  // tbc...


    this.hiddenLayers = hiddenLayersDefinition.slice();
    this.plug = () => null;
    this.setHyperParametersStorage = () => null;
    this.run = () => null;
    this.train = () => null;
  }

}

class HyperParametersMemoryStorage {
  constructor() {
    this.weights = [];
    this.learningRate = 0.3;
    this.regularizationCoef = 0;
  }
}

let pluginName, singleExample, trainingSetOrSingleExample;

const nn = new MultilayerPerceptron([4, 4, 4]); // Hidden layers

nn.plug(pluginName);

nn.setHyperParametersStorage(/* new MongoDbHpStorage(args) */);

nn.run(singleExample);

nn.train(trainingSetOrSingleExample);

module.exports = { Matrix, Vector, todo: true };
