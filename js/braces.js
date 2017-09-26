//balanced expressions check {[()]}

function reduceStr (str) {
  // console.info(str)
  const newStr = str.replace('()', '').replace('{}', '').replace('[]', '')
  if (newStr !== str) return reduceStr(newStr)
  return newStr
}


// // without recursion
// function reduceStr (str) {
//   // console.info(str)
//   do {
//     let newStr = str.replace('()', '').replace('{}', '').replace('[]', '')
//   }
//   while  (newStr !== str)
//
//   return newStr
// }


function verifyNesting (str) {
  return reduceStr(str).length === 0
}

console.log(verifyNesting('[{{[(){}]}}[]{}{{(())}}]')) //correct
console.log(verifyNesting('[{{[(){}]}}[]{}{({())}}]')) //incorrect
