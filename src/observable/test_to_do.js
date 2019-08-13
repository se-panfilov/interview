// describe("ES6 interview test", () => {
//   it("Should be able to subscribe to an observable, and get the values", () => {
//     expect.assertions(1);
//     const result = [];
//
//     const expectedVal = [1, 2, 3];
//
//     /**
//      * {
//              complete: () => void
//             }
//      */
//     const obj = {
//       next: v => result.push(v),
//       complete: () => {
//         // expect(result).to.be.eq(expectedVal)
//         expect(result).toEqual(expectedVal);
//       }
//     }
//
//     const stream$ = Observable.of(1, 2, 3);
//     stream$.subscribe(obj);
//   });
//
//   it("Should do the same with promise", () => {
//     //expect.assertions(1);
//
//     const promise = new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(4)
//       }, 5)
//     })
//
//     let result = 0;
//
//     const expectedVal = 5;
//
//     const streamOfPromise$ = Observable.fromPromise(promise);
//
//     streamOfPromise$.subscribe({
//       next: v => result = v,
//       complete: () => {
//         expect(result).toEqual(expectedVal);
//       }
//     });
//   });
//
// });
