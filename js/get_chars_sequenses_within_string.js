const str = 'aaabbbbbccdddddd'
const expectedResult = ['aaa', 'bbbbb', 'cc', 'dddddd']


const str2 = 'aaabbc'

function solution(str) {
  const list = str.split('')

  let start = 0
  const result = []

  let end = 1
  let current = 0
  let next = 1

  list.forEach(item => {
    const currentVal = list[current]
    const nextVal = list[next]
    const isSame = (currentVal === nextVal)

    if (isSame) {
      end = next
      current += 1
      next += 1
    } else {
      end = next
      const part = list.slice(start, end).join('')
      result.push(part)
      start = next
      end = next + 1
      current += 1
      next += 1
    }
  })

  return result;
}

// do
const result = solution(str);

//Check
console.log(result)
expectedResult.forEach((v, i) => console.log(v, v === result[i]))
