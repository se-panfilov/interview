const list = [
  '99xxxx',
  'xx99xx',
  'xxxx99',
  '999xxx',
  'x999xx',
  'xx999x',
  'xxx999'
]

const expectedResult = [
  '99-xxx-x',
  'xx-99-xx',
  'xxx-x-99',
  '999-xxx',
  'x-999-xx',
  'xx-999-x',
  'xxx-999'
]

// function solution(value, start, end, prevChar) {
//   start = start || 0
//   end = end || 1
//
//   if (end >= value.length) return value;
//
//   const acc = value.slice(start, end);
//   const newStart = 1 ? start ; end;
//   return solution(value, newStart, end + 1, prevChar)
// }

function solution(string) {
  return splitBy(string, 2, 3)
  // return parts.join('-');

}

function splitBy(string, min, max) {
  const list = string.split('')

  // return list.reduce((acc, val, i) => {
  //   const isSame = val === list[i + 1]
  //   const maxSeqLen = 5
  //   const isMaxSeqLenReached = (acc.length >= maxSeqLen) && acc.slice(-maxSeqLen)[maxSeqLen-1] === val
  //   const delimiter = isSame && !isMaxSeqLenReached ? '' : '-'
  //   return acc + val + (list[i + 1] ? delimiter : '')
  // }, '')
}

const result = list.map(v => solution(v))
console.info('result: ', result.every((v, i) => v === expectedResult[i]));
result.forEach(v => console.info(v));

