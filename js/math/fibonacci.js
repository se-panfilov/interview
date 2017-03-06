//Fib 5 = 0, 1, 1, 2, 3

function fibonacci (n, start = 0) {
  if (n < 2) return [start]
  if (n < 3) return [start, 1]

  const a = fibonacci(n - 1, start)
  a.push(a[n - 2] + a[n - 3])

  return a
}

let result = fibonacci(5, 0)
console.info(result)
