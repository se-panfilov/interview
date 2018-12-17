//1. recursive
function fact(n, result = []) {
  if (n <= 0) return result

  result.push(n)
  return fact(n - 1, result)
}

console.info(fact(5))

//2. simple
function fact2(n) {
  const result = []

  for (let i = n; i > 0; i--) {
    result.push(i)
  }

  return result
}

console.info(fact2(5))

// result = fact2(5)
// console.info(result)

//2. simple & functional
function fact3(n) {
  return new Array(n).fill(undefined).map((v, i) => n - i, n)
}

console.info(fact3(5))
