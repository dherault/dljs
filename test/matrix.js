/* global describe it */
const expect = require('chai').expect;
const Matrix = require('../src/Matrix');
const log = false ? console.log : () => null;

const d13 = [1, 2, 3];

const d2i = [
  1, 0,
  0, 1,
];

const d23 = [
  1, 2, 3,
  4, 5, 6,
];

const d23t = [
  1, 4,
  2, 5,
  3, 6,
];

const d3i = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
];

const d3 = [
  1, 2, 3,
  4, 5, 6,
  7, 8, 9,
];

const d3t = [
  1, 4, 7,
  2, 5, 8,
  3, 6, 9,
];

const d4i = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
];

describe('Matrix', () => {

  describe('constructor', () => {

    it('should throw on incorrect constructor argument', () => {
      let error1, error2, error3, error4;

      try {
        new Matrix();
      } catch (err) {
        error1 = err;
        log(err.message);
      }

      try {
        new Matrix(1, 3);
      } catch (err) {
        error2 = err;
        log(err.message);
      }

      try {
        new Matrix(d3);
      } catch (err) {
        error3 = err;
        log(err.message);
      }

      try {
        new Matrix(1, 3, d3);
      } catch (err) {
        error4 = err;
        log(err.message);
      }

      expect(error1).to.be.a('error');
      expect(error2).to.be.a('error');
      expect(error3).to.be.a('error');
      expect(error4).to.be.a('error');
    });
  });

  describe('Properties', () => {

    it('has a Float32Array "data" property', () => {
      const m = new Matrix(3, 3, d3);

      expect(m.data).to.be.a('float32array');
    });

    it('has a integer "dim" property', () => {
      const m = new Matrix(3, 3, d3);
      const mm = new Matrix(2, 3, d23);
      const mmm = new Matrix(2, 2, [1, 2, 3, 4]);

      expect(m.dim).to.equal(9);
      expect(mm.dim).to.equal(6);
      expect(mmm.dim).to.equal(4);
    });

    it('has two integer "R" and "C" property', () => {
      const m = new Matrix(3, 3, d3);
      const mm = new Matrix(2, 3, d23);
      const mmm = new Matrix(2, 2, [1, 2, 3, 4]);

      expect(m.R).to.equal(3);
      expect(mm.R).to.equal(2);
      expect(mmm.R).to.equal(2);
      expect(m.C).to.equal(3);
      expect(mm.C).to.equal(3);
      expect(mmm.C).to.equal(2);
    });

    it('has a boolean "isSquare" property', () => {
      const m = new Matrix(3, 3, d3);
      const mm = new Matrix(2, 3, d23);
      const mmm = new Matrix(2, 2, d2i);

      expect(m.isSquare).to.equal(true);
      expect(mm.isSquare).to.equal(false);
      expect(mmm.isSquare).to.equal(true);
    });

    it('has a boolean "isVector" property', () => {
      const m = new Matrix(3, 3, d3);
      const mm = new Matrix(1, 3, d13);
      const mmm = new Matrix(3, 1, d13);

      expect(m.isVector).to.equal(false);
      expect(mm.isVector).to.equal(true);
      expect(mmm.isVector).to.equal(true);
    });
  });

  describe('Methods', () => {

    describe('get', () => {

      it('retrieves data correctly', () => {
        const m = new Matrix(2, 3, d23);

        expect(m.get(0, 0)).to.equal(1);
        expect(m.get(1, 0)).to.equal(4);
        expect(m.get(1, 1)).to.equal(5);
        expect(m.get(1, 2)).to.equal(6);
        expect(m.get('yolo', 'yodo')).to.equal(undefined);
      });
    });

    describe('getRow', () => {

      it('throws on incorrect argument', () => {
        const m = new Matrix(2, 3, d23);
        let error1, error2, error3;

        try {
          m.getRow();
        } catch (err) {
          error1 = err;
          log(err.message);
        }

        try {
          m.getRow(1.5);
        } catch (err) {
          error2 = err;
          log(err.message);
        }

        try {
          m.getRow(111);
        } catch (err) {
          error3 = err;
          log(err.message);
        }

        expect(error1).to.be.a('error');
        expect(error2).to.be.a('error');
        expect(error3).to.be.a('error');
      });

      it('retrieves a row correctly', () => {
        const m = new Matrix(2, 3, d23);
        const m0 = new Matrix(1, 3, [1, 2, 3]);
        const m1 = new Matrix(1, 3, [4, 5, 6]);

        expect(m.getRow(0).data).to.deep.equal(m0.data);
        expect(m.getRow(1).data).to.deep.equal(m1.data);
        expect(m.getRow(0).R).to.deep.equal(m0.R);
        expect(m.getRow(1).R).to.deep.equal(m1.R);
        expect(m.getRow(0).C).to.deep.equal(m0.C);
        expect(m.getRow(1).C).to.deep.equal(m1.C);
      });
    });

    describe('getColum', () => {

      it('throws on incorrect argument', () => {
        const m = new Matrix(2, 3, d23);
        let error1, error2, error3;

        try {
          m.getColumn();
        } catch (err) {
          error1 = err;
          log(err.message);
        }

        try {
          m.getColumn(1.5);
        } catch (err) {
          error2 = err;
          log(err.message);
        }

        try {
          m.getColumn(111);
        } catch (err) {
          error3 = err;
          log(err.message);
        }

        expect(error1).to.be.a('error');
        expect(error2).to.be.a('error');
        expect(error3).to.be.a('error');
      });

      it('retrieves a column correctly', () => {
        const m = new Matrix(2, 3, d23);
        const m0 = new Matrix(2, 1, [1, 4]);
        const m1 = new Matrix(2, 1, [2, 5]);
        const m2 = new Matrix(2, 1, [3, 6]);

        expect(m.getColumn(0).data).to.deep.equal(m0.data);
        expect(m.getColumn(1).data).to.deep.equal(m1.data);
        expect(m.getColumn(2).data).to.deep.equal(m2.data);
        expect(m.getColumn(0).R).to.deep.equal(m0.R);
        expect(m.getColumn(1).R).to.deep.equal(m1.R);
        expect(m.getColumn(2).R).to.deep.equal(m2.R);
        expect(m.getColumn(0).C).to.deep.equal(m0.C);
        expect(m.getColumn(1).C).to.deep.equal(m1.C);
        expect(m.getColumn(2).C).to.deep.equal(m2.C);
      });
    });

    describe('add', () => {

      it('throws on incorrect argument', () => {
        const m = new Matrix(2, 3, d23);
        const mm = new Matrix(3, 3, d3);
        let error1, error2, error3;

        try {
          m.add();
        } catch (err) {
          error1 = err;
          log(err.message);
        }

        try {
          m.add('yolo');
        } catch (err) {
          error2 = err;
          log(err.message);
        }

        try {
          m.add(mm);
        } catch (err) {
          error3 = err;
          log(err.message);
        }

        expect(error1).to.be.a('error');
        expect(error2).to.be.a('error');
        expect(error3).to.be.a('error');
      });

      it('adds a scalar correctly', () => {
        const m = new Matrix(2, 3, d23);
        const mm = new Matrix(2, 3, d23);
        const m10 = new Matrix(2, 3, [11, 12, 13, 14, 15, 16]);

        expect(m.add(10).data).to.deep.equal(m10.data);
        expect(mm.addScalar(10).data).to.deep.equal(m10.data);
      });

      it('adds a Matrix correctly', () => {
        const m = new Matrix(2, 3, d23);
        const mm = new Matrix(2, 3, d23);
        const mmm = new Matrix(2, 3, [2, 4, 6, 8, 10, 12]);

        expect(m.add(m).data).to.deep.equal(mmm.data);
        expect(mm.addMatrix(mm).data).to.deep.equal(mmm.data);
      });
    });

    describe('multiply', () => {

      it('throws on incorrect argument', () => {
        const m = new Matrix(2, 3, d23);
        const mm = new Matrix(3, 3, d3);
        let error1, error2, error3, error4, error5;

        try {
          m.multiply();
        } catch (err) {
          error1 = err;
          log(err.message);
        }

        try {
          m.multiply('yolo');
        } catch (err) {
          error2 = err;
          log(err.message);
        }

        try {
          m.multiply(m);
        } catch (err) {
          error3 = err;
          log(err.message);
        }

        try {
          m.multiplyMatrix(3);
        } catch (err) {
          error4 = err;
          log(err.message);
        }

        try {
          m.multiply(mm);
        } catch (err) {
          error5 = err;
          log(err.message);
        }

        expect(error1).to.be.a('error');
        expect(error2).to.be.a('error');
        expect(error3).to.be.a('error');
        expect(error4).to.be.a('error');
        expect(error5).to.be.a('undefined');
      });

      it('multiplies a scalar correctly', () => {
        const m = new Matrix(2, 3, d23);
        const m3 = new Matrix(2, 3, [3, 6, 9, 12, 15, 18]);

        expect(m.multiply(3).data).to.deep.equal(m3.data);
        expect(m.multiplyScalar(3).data).to.deep.equal(m3.data);
      });

      it('multiplies a Matrix correctly', () => {
        const m23 = new Matrix(2, 3, d23);
        const m32 = new Matrix(3, 2, d23t);
        const m22 = new Matrix(2, 2, [14, 32, 32, 77]);
        const m = new Matrix(3, 3, d3);
        const mm = new Matrix(3, 3, [30, 36, 42, 66, 81, 96, 102, 126, 150]);

        expect(m.multiply(m).data).to.deep.equal(mm.data);
        expect(m23.multiply(m32).data).to.deep.equal(m22.data);
        expect(m23.multiplyMatrix(m32).data).to.deep.equal(m22.data);
      });
    });

    describe('transpose', () => {

      it('transposes correctly', () => {
        const m13 = new Matrix(1, 3, d13);
        const m23 = new Matrix(2, 3, d23);
        const m23t = new Matrix(3, 2, d23t);
        const m3 = new Matrix(3, 3, d3);
        const m3t = new Matrix(3, 3, d3t);

        expect(m13.transpose().data).to.deep.equal(m13.data);
        expect(m23.transpose().data).to.deep.equal(m23t.data);
        expect(m23t.transpose().data).to.deep.equal(m23.data);
        expect(m3.transpose().data).to.deep.equal(m3t.data);
        expect(m3t.transpose().data).to.deep.equal(m3.data);
      });
    });

    describe('map', () => {

      it('maps a function correctly', () => {
        const m = new Matrix(2, 3, d23);
        const mm = new Matrix(2, 3, [3, 6, 9, 12, 15, 111]);

        expect(m.map((x, i, a) => x + i + (a[i + 1] || 100)).data).to.deep.equal(mm.data);
      });
    });

    describe('mapElements', () => {

      it('maps a function elements-wise correctly', () => {
        const m = new Matrix(2, 3, d23);
        const mm = new Matrix(2, 3, [3, 7, 11, 10, 14, 111]);

        expect(m.mapElements((x, i, j, a) => x + i + 2 * j + (a[i * m.C + j + 1] || 100)).data).to.deep.equal(mm.data);
      });
    });

    describe('mapRow', () => {

      it('maps a function on a row correctly', () => {
        const m = new Matrix(2, 3, d23);
        const mm = new Matrix(2, 3, [1, 2, 3, 105, 108, 111]);

        expect(m.mapRow(1, (x, j, a) => x + j + a[j] + 100).data).to.deep.equal(mm.data);
      });
    });

    describe('mapColumn', () => {

      it('maps a function on a colum correctly', () => {
        const m = new Matrix(3, 2, d23t);
        const mm = new Matrix(2, 3, [1, 105, 2, 108, 3, 111]);

        expect(m.mapColumn(1, (x, i, a) => x + i + a[2 * i] + 100).data).to.deep.equal(mm.data);
      });
    });

    describe('dotProduct', () => {

      it('throws on incorrect argument', () => {
        const m = new Matrix(1, 3, d13);
        const mm = new Matrix(3, 1, d13);
        let error1, error2, error3, error4;

        try {
          m.dotProduct();
        } catch (err) {
          error1 = err;
          log(err.message);
        }

        try {
          m.dotProduct(111);
        } catch (err) {
          error2 = err;
          log(err.message);
        }

        try {
          m.dotProduct(m);
        } catch (err) {
          error3 = err;
          log(err.message);
        }

        try {
          mm.dotProduct(m);
        } catch (err) {
          error4 = err;
          log(err.message);
        }

        expect(error1).to.be.a('error');
        expect(error2).to.be.a('error');
        expect(error3).to.be.a('error');
        expect(error4).to.be.a('error');
      });

      it('computes the dotProduct correctly', () => {
        const m = new Matrix(1, 3, d13);
        const mm = new Matrix(3, 1, d13);

        expect(m.dotProduct(mm)).to.be.equal(14);
      });
    });

    describe('clone', () => {

      it('clones itself correctly', () => {
        const m23 = new Matrix(2, 3, d23);
        const clone = m23.clone();

        expect(clone instanceof Matrix).to.equal(true);
        expect(clone.data).to.deep.equal(m23.data);
        expect(clone.R).to.deep.equal(m23.R);
        expect(clone.C).to.deep.equal(m23.C);
      });
    });

    describe('forEach', () => {

      it('iterates over the data correctly', () => {
        const d = [1, 4, 7, 10, 13, 16];

        new Matrix(2, 3, d23).forEach((x, i, a) => {
          expect(x + i + (a[i - 1] || 0)).to.equal(d[i]);
        });
      });
    });

    describe('forEachElement', () => {

      it('iterates over the elements correctly', () => {
        const d = [2, 4, 6, 7, 9, 11];

        new Matrix(2, 3, d23).forEachElement((x, i, j, a) => {
          expect(x + i + j + a[i]).to.equal(d[i * 3 + j]);
        });
      });
    });

    describe('augment', () => {

      it('augments the matrix with a scalar', () => {
        // const m23 = new Matrix(2, 3, d23);


      });
    });

    describe('printDim', () => {

      it('prints its dimensions correctly', () => {
        const m3 = new Matrix(3, 3, d3);
        const m23 = new Matrix(2, 3, d23);

        expect(m3.printDim()).to.equal('[3 x 3]');
        expect(m23.printDim()).to.equal('[2 x 3]');
      });
    });

    describe('toString', () => {

      it('prints a string', () => {
        expect(new Matrix(3, 3, d3).toString()).to.be.a('string');
      });
    });
  });

  describe('Helpers', () => {

    describe('zeroes', () => {

      it('fills a Matrix with zeroes', () => {
        const m = Matrix.zeroes(2, 3);
        const mm = new Matrix(2, 3, [0, 0, 0, 0, 0, 0]);

        expect(m.R).to.equal(2);
        expect(m.C).to.equal(3);
        expect(m.data).to.deep.equal(mm.data);
      });
    });

    describe('ones', () => {

      it('fills a Matrix with ones', () => {
        const m = Matrix.ones(2, 3);
        const mm = new Matrix(2, 3, [1, 1, 1, 1, 1, 1]);

        expect(m.R).to.equal(2);
        expect(m.C).to.equal(3);
        expect(m.data).to.deep.equal(mm.data);
      });
    });

    describe('random', () => {

      it('fills a Matrix with random numbers', () => {
        const m = Matrix.random(2, 3, -10, 5);

        m.data.forEach((x, i) => expect(x).to.be.below(5) && expect(x).to.be.above(-10) && expect(x).to.not.equal(x[i - 1] || 0));
      });
    });

    describe('identity', () => {

      it('creates an identity Matrix', () => {
        const n = 100;
        const m2 = Matrix.identity(2);
        const m3 = Matrix.identity(3);
        const m4 = Matrix.identity(4);
        const mn = Matrix.identity(n);
        const m2i = new Matrix(2, 2, d2i);
        const m3i = new Matrix(3, 3, d3i);
        const m4i = new Matrix(4, 4, d4i);

        expect(m2.data).to.deep.equal(m2i.data);
        expect(m3.data).to.deep.equal(m3i.data);
        expect(m4.data).to.deep.equal(m4i.data);

        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            expect(mn.get(i, j)).to.equal(i === j ? 1 : 0);
          }
        }
      });
    });
  });
});
