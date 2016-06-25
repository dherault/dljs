/* global describe it */
const expect = require('chai').expect;
// const assert = require('chai').assert;
const Matrix = require('../src').Matrix;

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

/* Tests */
describe('Matrix', () => {

  describe('constructor', () => {

    // it('should throw on incorrect constructor argument', () => {
    //   let error1;
    //
    //   try {
    //     new Vector(1, 2, 3);
    //   } catch (err) {
    //     console.log(err.message);
    //     error1 = err;
    //   }
    //
    //   expect(error1).to.be.a('error');
    // });
  });

  describe('properties', () => {

    it('should have a Float32Array "data" property', () => {
      const m = new Matrix(3, 3, d3);

      expect(m.data).to.be.a('float32array');
    });

    it('should have a integer "dim" property', () => {
      const m = new Matrix(3, 3, d3);
      const mm = new Matrix(2, 2, [1, 2, 3, 4]);

      expect(m.dim).to.equal(9);
      expect(mm.dim).to.equal(4);
    });
  });

  describe('methods', () => {

    describe('get', () => {

      it('should retrieve data correctly', () => {
        const m = new Matrix(3, 3, d3);

        expect(m.get(0, 0)).to.equal(1);
        expect(m.get(1, 0)).to.equal(4);
        expect(m.get(1, 1)).to.equal(5);
        expect(m.get(2, 2)).to.equal(9);
        expect(m.get('yolo', 'yodo')).to.equal(undefined);
      });
    });

    // describe('set', () => {
    //
    //   it('should store data correctly', () => {
    //     const v = new Vector([1, 2, 3]);
    //
    //     expect(v.set(0, 111).get(0)).to.equal(111);
    //     expect(v.set(3, 111).get(3)).to.equal(undefined);
    //   });
    // });

    // describe('map', () => {
    //
    //   it('should map a function correctly', () => {
    //     const v = new Vector([1, 2, 3]);
    //     const vv = new Vector([2, 5, 8]);
    //
    //     expect(v.map((x, i) => 2 * x + i).data).to.deep.equal(vv.data);
    //   });
    // });

    describe('multiply', () => {

      it('should multiply a scalar correctly', () => {
        const m = new Matrix(3, 1, [1, 2, 3]);
        const mm = new Matrix(3, 1, [3, 6, 9]);

        expect(m.multiply(3).data).to.deep.equal(mm.data);
      });

      it('should multiply a matrix correctly', () => {
        const m = new Matrix(3, 3, d3);
        const mm = new Matrix(3, 3, [30, 36, 42, 66, 81, 96, 102, 126, 150]);

        expect(m.multiply(m).data).to.deep.equal(mm.data);
      });
    });

    describe('transpose', () => {

      it('should be todo: find the correct term', () => {
        const m3 = new Matrix(3, 3, d3);

        expect(m3.transpose().transpose().data).to.deep.equal(m3.data);
      });

      it('should transpose correctly', () => {
        const m3 = new Matrix(3, 3, d3);
        const m23 = new Matrix(2, 3, d23);
        const m3t = new Matrix(3, 3, d3t);
        const m23t = new Matrix(3, 2, d23t);

        expect(m3.transpose().data).to.deep.equal(m3t.data);
        expect(m23.transpose().data).to.deep.equal(m23t.data);
        expect(m23t.transpose().data).to.deep.equal(m23.data);
      });
    });

    describe('printDim', () => {

      it('should print the dimension correctly', () => {
        const m = new Matrix(3, 3, d3);

        expect(m.printDim()).to.equal('3 x 3');
      });
    });

  });
});
