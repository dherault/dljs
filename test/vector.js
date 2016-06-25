// /* global describe it */
// const expect = require('chai').expect;
// // const assert = require('chai').assert;
//
// const Vector = require('../src/Vector');
//
// /* Tests */
// describe('Vector', () => {
//
//   describe('constructor', () => {
//
//     it('should throw on incorrect constructor argument', () => {
//       let error1;
//
//       try {
//         new Vector(1, 2, 3);
//       } catch (err) {
//         console.log(err.message);
//         error1 = err;
//       }
//
//       expect(error1).to.be.a('error');
//     });
//   });
//
//   describe('properties', () => {
//
//     it('should have a Float32Array "data" property', () => {
//       const v = new Vector([1, 2, 3]);
//       const vv = new Vector(v.data);
//
//       expect(v.data).to.be.a('float32array');
//       expect(vv.data).to.be.a('float32array');
//     });
//
//     it('should have a integer "size" property', () => {
//       const v = new Vector([1, 2, 3]);
//       const vv = new Vector([1, 2, 3, 4]);
//
//       expect(v.size).to.equal(3);
//       expect(vv.size).to.equal(4);
//     });
//   });
//
//   describe('methods', () => {
//
//     describe('get', () => {
//
//       it('should retrieve data correctly', () => {
//         const v = new Vector([1, 2, 3]);
//
//         expect(v.get(0)).to.equal(1);
//         expect(v.get(1)).to.equal(2);
//         expect(v.get(2)).to.equal(3);
//         expect(v.get(3)).to.equal(undefined);
//         expect(v.get('yolo')).to.equal(undefined);
//       });
//     });
//
//     describe('set', () => {
//
//       it('should store data correctly', () => {
//         const v = new Vector([1, 2, 3]);
//
//         expect(v.set(0, 111).get(0)).to.equal(111);
//         expect(v.set(3, 111).get(3)).to.equal(undefined);
//       });
//     });
//
//     describe('map', () => {
//
//       it('should map a function correctly', () => {
//         const v = new Vector([1, 2, 3]);
//         const vv = new Vector([2, 5, 8]);
//
//         expect(v.map((x, i) => 2 * x + i).data).to.deep.equal(vv.data);
//       });
//     });
//
//     describe('add', () => {
//
//       it('should throw on incorrect argument', () => {
//         const v = new Vector([1, 2, 3]);
//         let error;
//
//         try {
//           v.add('yolo');
//         } catch (err) {
//           console.log(err.message);
//           error = err;
//         }
//
//         expect(error).to.be.an('error');
//       });
//
//       it('should throw on dimensions mismatch', () => {
//         const v = new Vector([1, 2, 3]);
//         const vv = new Vector([1, 2, 3, 4]);
//         let error;
//
//         try {
//           v.add(vv);
//         } catch (err) {
//           console.log(err.message);
//           error = err;
//         }
//
//         expect(error).to.be.an('error');
//       });
//
//       it('should add a scalar correctly', () => {
//         const v = new Vector([1, 2, 3]);
//         const vv = new Vector([2, 3, 4]);
//
//         expect(v.add(1).data).to.deep.equal(vv.data);
//         expect(v.addScalar(1).data).to.deep.equal(vv.data);
//       });
//
//       it('should add a Vector correctly', () => {
//         const v = new Vector([1, 2, 3]);
//         const vv = new Vector([2, 4, 6]);
//
//         expect(v.add(v).data).to.deep.equal(vv.data);
//         expect(v.addVector(v).data).to.deep.equal(vv.data);
//       });
//     });
//
//     describe('multiply', () => {
//
//       it('should throw on incorrect argument', () => {
//         const v = new Vector([1, 2, 3]);
//         let error;
//
//         try {
//           v.multiply('yolo');
//         } catch (err) {
//           console.log(err.message);
//           error = err;
//         }
//
//         expect(error).to.be.an('error');
//       });
//
//       it('should multiply a scalar correctly', () => {
//         const v = new Vector([1, 2, 3]);
//         const vv = new Vector([3, 6, 9]);
//
//         expect(v.multiply(3).data).to.deep.equal(vv.data);
//       });
//     });
//
//     describe('dotProduct', () => {
//
//       it('should throw on dimensions mismatch', () => {
//         const v = new Vector([1, 2, 3]);
//         const vv = new Vector([1, 2, 3, 4]);
//         let error;
//
//         try {
//           v.dotProduct(vv);
//         } catch (err) {
//           console.log(err.message);
//           error = err;
//         }
//
//         expect(error).to.be.an('error');
//       });
//
//       it('should dotProduct correctly', () => {
//         const v = new Vector([1, 2, 3]);
//         const vv = new Vector([10, 10, 10]);
//
//         expect(v.dotProduct(vv)).to.equal(60);
//       });
//     });
//
//     describe('printDim', () => {
//
//       it('should print the dimension correctly', () => {
//         const v = new Vector([1, 2, 3]);
//
//         expect(v.printDim()).to.equal('3');
//       });
//     });
//
//   });
//
//   describe('functions', () => {
//
//     describe('random', () => {
//
//       it('should generate a random Vector correctly', () => {
//         const vData = Vector.random(10).data;
//
//         vData.forEach((x, i) => expect(x).to.be.below(1) && expect(x).to.be.above(0) && expect(x).to.not.equal(x[i - 1] || 0));
//       });
//     });
//
//     describe('zeroes', () => {
//
//       it('should generate a zeroes Vector correctly', () => {
//         const vData = Vector.zeroes(10).data;
//
//         vData.forEach((x) => expect(x).to.equal(0));
//       });
//     });
//
//     describe('ones', () => {
//
//       it('should generate a ones Vector correctly', () => {
//         const vData = Vector.ones(10).data;
//
//         vData.forEach((x) => expect(x).to.equal(1));
//       });
//     });
//
//   });
//
// });
