function reduceStr (str) {
  const newStr = str.replace('()', '').replace('{}', '').replace('[]', '')
  if (newStr !== str) return reduceStr(newStr)
  return newStr
}

function verifyNesting (str) {
  return reduceStr(str).length === 0
}

console.log(verifyNesting('[{{[(){}]}}[]{}{{(())}}]')); //correct
console.log(verifyNesting('[{{[(){}]}}[]{}{({())}}]')); //incorrect

