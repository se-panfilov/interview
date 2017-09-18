//1. recursive
function fact (n, result = []) {
  if (n <= 0) return result

  result.push(n)
  return fact(n - 1, result)
}

//2. simple
function fact2 (n) {
  const result = []

  for (let i = n; i > 0; i--) {
    result.push(i)
  }

  return result
}

let result
result = fact(5)
console.info(result)

// result = fact2(5)
// console.info(result)
