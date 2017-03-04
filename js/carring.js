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

sum(2)(5)(10)

