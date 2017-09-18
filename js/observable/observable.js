/**
 *  observer = {
     next: Fn,
     complete: Fn
 }
 */

// export const Observable  = {
//     value: null,
//     of (a) {

//     }
// }

// STREAM === Observable

export function Observable (producer) {
  this.producer = producer
  //producer()
}

Observable.of = function (...rest) {

  const producer = function (observerObj) {
    rest.forEach(v => observerObj.next(v))
    observerObj.complete()
  }

  return new Observable(producer);
}

/**
 * @return void
 */
Observable.prototype.subscribe = function (observerObj) {
  // if (obj.next) {
  //     function  ()
  //      obj.next(Observable.value)// think here
  //     }
  // }
  const producer = this.producer;

  producer(observerObj);
}

Observable.fromPromise = function (promise) {


  const producer = function (observerObj) {
    promise.then(v => {
      observerObj.next(v)
      observerObj.complete()

    })
    // setTimeout(() => console.log('1'), 4);
    // console.log('2');
    // 2
    // 1
  }

  return new Observable(producer);
  //const producer = function (observerObj) {
//        rest.forEach(v => observerObj.next(v))
  //      observerObj.complete()
  //}

  //return new Observable(producer);
}
// import { assert, expect } from "chai";
//import { Observable } from "rxjs";
import {Observable} from "./implementation";


// Alt + T
// yarn test:es6

// 1-2-3
// const stream$ = Observable.of(1, 2, 3);
// stream$.subscribe({
//     next: v => console.log(v),
//     complete: () => console.log('complete'),
// });


