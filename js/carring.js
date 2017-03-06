//1. My
function sum (a) {
  const wrap = function (b) {
    const c = a + b
    return sum(c)
  }

  wrap.valueOf = function () {
    console.info(a)
  }

  return wrap
}

let result

result = sum(2)(5)(10)
console.info(result)

//2. My, reduce // TODO (S.Panfilov)
function sum2(cur, arr) {
  arr = arr || []
  arr.push (cur)

  let result = arr.reduce((v,p) => v+p)

  function wrap (val) {
    return sum(val, arr)
  }

  wrap.valueOf = function () {
    console.info(result)
  }

  return wrap
}

result = sum2(2)(5)(10)
console.info(result)

//3. Original
function sum3 (a) {
  let currentSum = a

  function wrap (b) {
    currentSum += b
    return wrap
  }

  wrap.toString = function () {
    return currentSum
  }

  return wrap
}

// result = sum3(2)(5)(10)
// console.info(result)
