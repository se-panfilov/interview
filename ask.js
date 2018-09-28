// Common questionsQuestions
// 1. About your self
// 2. Do you have any open sourcing projects?
// 3. How about unit tests?
// 4. Functional style, immutability, immutable js?
// 5. Experience with frameworks? Rxjs?
// 6. typescript?
// 7. IDE
// 8. Agile, Srum?
// 9. OS? Windows/Linux
// 10. Yur last project and team

// ---------------------------------------------------------------------
// Code questions

// 1. What will be the output?
// function foo () {
//   a = 10
//   var a
//   console.log(a) // what will be the output?
// }

// 2. What is the difference (typescript)
// function isString(value: any): value is string {
//   return typeof value === 'string';
// }

// function isString(value: any): boolean {
//   return typeof value === 'string';
// }

//3.What is the difference in "getName1()" and "getName2()" methods? What pros and cons?
// class Animal {
//   constructor() {
//     this.name = 'Sharik';
//   }
//
//   getName1() {
//     return this.name;
//   }
//
//   getName2(name) {
//     return name;
//   }
// };
//
// const animal = new Animal();
// console.log(
//   animal.getName1(),
//   animal.getName2(animal.name)
// )

// What can you say about "hasOwnProperty"?

// ---------------------------------------------------------------------

// 1. FuzzBuzz

//  function should be called like fussBuzz([1, 3, 5, 4, 4, 7, 9, 15, 25, 30])
// if number can be divided by 3 - return 'Fuzz'
// if number can be divided by 5 - return 'Buz'
// if both - 'FuzzBuzz'

// Bonus - can you get rid of "for" loop

// 2. Phone formatting
// console.info(solution('004-448-555-583-61')) //004-448-555-583-61
// console.info(solution('0 - 22 1985--324')) //022-198-532-4
// console.info(solution('004-448-555-583-61')) //004-448-555-583-61
// console.info(solution('004-448-555-583-613-344')) //004-448-555-583-613-344

// Example: ('0 - 22 1985--324').match(/\d/g).join('').match(/\d{1,3}/g).join('-')
