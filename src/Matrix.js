const _ = process.env.NODE_ENV !== 'production';

class DimensionError extends Error {
  constructor(methodName, a, b) {
    super(`${methodName}:\nfirst arg is ${a.printDim()}\nsecond arg is ${b.printDim()}`);
  }
}

/*
  Matrix
*/

class Matrix {
  constructor(R, C, array, noParse = false) {
    const dim = R * C;

    if (_) {
      if (!(typeof R === 'number' && typeof C === 'number')) throw new Error(`Matrix.constructor: expected first and second args to be integers, got ${typeof R} and ${typeof C} instead`);
      if (!(array && array.length)) throw new Error(`Matrix.constructor: expected third arg to be an iterable or array-like, got ${typeof array} instead`);
      if (array.length !== dim) throw new Error(`Matrix.constructor: array.length (${array && array.length}) does not match given dimensions (${R} x ${C}: ${dim})`);
    }

    this.dim = dim;
    this.R = R;
    this.C = C;
    this.isSquare = R === C;
    this.isVector = R === 1 || C === 1;

    // We store the elements in this.data, in row-major order
    this.data = noParse ? array : new Float32Array(array);
  }

  get(i, j) {
    return this.data[i * this.C + j];
  }

  getRow(i) {
    // Use slice
    const { R, C, data } = this;

    if (_ && i < 0 || i >= R || Math.floor(i) !== i) throw new Error(`Matrix.getRow: arg must be an integer between 0 and ${R - 1}`);

    const iC = i * C;
    const newData = new Float32Array(C);

    for (let j = 0; j < C; j++) {
      newData[j] = data[iC + j];
    }

    return new Matrix(1, C, newData, true);
  }

  getColumn(j) {
    const { R, C, data } = this;

    if (_ && j < 0 || j >= C || Math.floor(j) !== j) throw new Error(`Matrix.getColumn: arg must be an integer between 0 and ${C - 1}`);

    const newData = new Float32Array(R);

    for (let i = 0; i < R; i++) {
      newData[i] = data[i * C + j];
    }

    return new Matrix(R, 1, newData, true);
  }

  transpose() {
    const { R, C } = this;

    if (this.isVector) return new Matrix(C, R, this.data);

    const k = R * C - 1;

    // Not "in-place"
    return new Matrix(C, R, this.data.map((x, i, a) => a[C * i - k * Math.floor(i / R)]), true);
  }

  add(x) {
    if (typeof x === 'number') return this.addScalar(x);
    if (x instanceof Matrix) return this.addMatrix(x);

    throw new Error(`Matrix.add: expected a number or a Matrix, got ${typeof x} instead.`);
  }

  addScalar(s) {
    return new Matrix(this.R, this.C, this.data.map(x => x + s), true);
  }

  addMatrix(m) {
    const { R, C } = this;

    if (_ && !(m && R === m.R && C === m.C)) throw new DimensionError('Matrix.addMatrix', this, m);

    const vData = m.data;

    return new Matrix(R, C, this.data.map((x, i) => vData[i] + x), true);
  }

  multiply(x) {
    if (typeof x === 'number') return this.multiplyScalar(x);
    if (x instanceof Matrix) return this.multiplyMatrix(x);

    throw new Error(`Matrix.multiply: expected a number or a Matrix, got ${typeof x} instead.`);
  }

  multiplyScalar(s) {
    return new Matrix(this.R, this.C, this.data.map(x => x * s), true);
  }

  // TODO: optimize this s***
  multiplyMatrix(m) {
    const { R, C, data } = this;

    if (_) {
      if (!(m instanceof Matrix)) throw new Error(`Matrix.multiplyMatrix: expected a Matrix, got a ${typeof x} instead.`);
      if (C !== m.R) throw new DimensionError('Matrix.multiplyMatrix', this, m);
    }

    const { C: mC, data: mData } = m;
    const newData = new Float32Array(R * mC);

    let sum, iC, imC;

    for (let i = 0; i < R; i++) {
      iC = i * C;
      imC = i * mC;
      for (let j = 0; j < mC; j++) {
        sum = 0;
        for (let k = C - 1; k >= 0; k--) {
          sum += data[iC + k] * mData[k * mC + j];
        }
        newData[imC + j] = sum;
      }
    }

    return new Matrix(R, mC, newData, true);
  }

  map(fn) {
    return new Matrix(this.R, this.C, this.data.map(fn), true);
  }

  mapElements(fn) {
    const { R, C, dim, data } = this;
    const newData = new Float32Array(dim);

    let iC;

    for (let i = 0; i < R; i++) {
      iC = i * C;
      for (let j = 0; j < C; j++) {
        newData[iC + j] = fn(data[iC + j], i, j, data);
      }
    }

    return new Matrix(R, C, newData, true);
  }

  mapRow(i, fn) {
    const newData = this.data.slice();
    const { R, C, data } = this;
    const iC = i * C;

    let k;

    for (let j = 0; j < C; j++) {
      k = iC + j;
      newData[k] = fn(newData[k], j, data);
    }

    return new Matrix(R, C, newData, true);
  }

  mapColumn(j, fn) {
    const newData = this.data.slice();
    const { R, C, data } = this;

    let k;

    for (let i = 0; i < R; i++) {
      k = i * C + j;
      newData[k] = fn(newData[k], i, data);
    }

    return new Matrix(R, C, newData, true);
  }

  clone() {
    return new Matrix(this.R, this.C, this.data);
  }

  forEach(fn) {
    this.data.forEach(fn);
  }

  forEachElement(fn) {
    const { R, C, data } = this;

    let iC;

    for (let i = 0; i < R; i++) {
      iC = i * C;
      for (let j = 0; j < C; j++) {
        fn(data[iC + j], i, j, data);
      }
    }
  }

  augment(direction, scalar) {
    const { R, C, data } = this;

    let newR = R;
    let newC = C;
    let conditionFn;

    switch (direction) {
      case 'top':
        newR = R + 1;
        conditionFn = (k, R, C) => k < C;
        break;

      case 'bottom':
        newR = R + 1;
        conditionFn = (k, R, C) => k >= C * (R - 1);
        break;

      case 'left':
        newC = C + 1;
        conditionFn = (k, R, C) => !(k % C);
        break;

      case 'right':
        newC = C + 1;
        conditionFn = (k, R, C) => !((k + 1) % C);
        break;

      default:
        throw new Error(`Matrix.augment: Expected first arg to be one of ['top', 'bottom', 'left', 'right'], got ${direction} instead`);
    }

    const newDim = newC * newR;
    const newData = new Float32Array(newDim);

    let c = 0;
    for (let k = 0; k < newDim; k++) newData[k] = conditionFn(k, newR, newC) ? scalar : data[c++];

    return new Matrix(newR, newC, newData, true);
  }

  dotProduct(m) {
    if (_) {
      if (!(m instanceof Matrix)) throw new Error(`Matrix.dotProduct: Expected arg to be a Matrix, got ${typeof v} instead`);
      if (!(this.dim === m.dim && this.R === 1 && m.C === 1 && this.C === m.R)) throw new DimensionError('Matrix.dotProduct', this, m);
    }

    const mData = m.data;

    return this.data.map((x, i) => x * mData[i]).reduce((a, b) => a + b, 0);
  }

  printDim() {
    return `[${this.R} x ${this.C}]`;
  }

  toString() {
    const { R, C, data } = this;

    let iC, line;
    let lines = '';

    for (let i = 0; i < R; i++) {
      iC = i * C;
      line = '|\t';

      for (let j = 0; j < C; j++) line += `${data[iC + j]},\t`;

      lines += `\n${line}|`;
    }

    return `Matrix ${this.printDim()}${lines}`;
  }

}

Matrix.fill = (R, C, x) => {
  const data = new Float32Array(R * C);

  if (typeof x === 'number') return new Matrix(R, C, data.fill(x), true);
  if (typeof x === 'function') return new Matrix(R, C, data.map(x), true);
};

Matrix.zeroes = (R, C) => Matrix.fill(R, C, 0);

Matrix.ones = (R, C) => Matrix.fill(R, C, 1);

Matrix.identity = (n) => Matrix.fill(n, n, (x, k) => k % (n + 1) ? 0 : 1);

Matrix.random = (R, C, min = 0, max = 1) => Matrix.fill(R, C, () => Math.random() * (max - min) + min);

module.exports = Matrix;
