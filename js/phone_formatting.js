function swipe (str, position) {
  const arr = str.split('')
  const a = arr[position]
  const b = arr[position - 1]
  // console.info('str: ' + str + ', a: ' + a + ', b: ' + b)
  arr[position] = b
  arr[position - 1] = a

  return arr.join('')
}

function solution (phone) {
  const digits = phone.match(/\d{1,3}/g).join('')
  const result = digits.match(/\d{1,3}/g).join('-')

  const tail = result.match(/-\d*$/)

  if (tail[0].length === 2) {
    // console.info(tail)
    // const lasDashIndex = result.lastIndexOf('-')
    return swipe(result, tail.index)
  }

  return result
}

console.info(solution('004-448-555-583-61'))//004-448-555-583-61
console.info(solution('0 - 22 1985--324'))//022-198-53-24
console.info(solution('004-448-555-583-61'))//555-372-654
console.info(solution('004-448-555-583-613-344'))//555-372-654
