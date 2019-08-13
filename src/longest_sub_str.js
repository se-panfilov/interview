function solution (str) {
  const subs = str.match(/[A-Z]+[A-z]*/g)
  if (!subs || subs.length === 0) return -1

  let longest = ''
  subs.forEach(v => {
    if (v.length > longest.length) longest = v
  })

  return longest.length
}

let result
result = solution('a0Ba SDdd213 3e 3444AddWdef')
console.info(result)
