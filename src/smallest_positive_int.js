const arr = [-1, 1, 3, 4, 5, 150]

function solution (arr) {
  const uniqArr = [...new Set(arr)]
  const positiveArr = uniqArr.filter(v => v > 0)
  if (positiveArr.length === 0 || positiveArr.length === 1) return 1

  const sortedArr = positiveArr.sort((a, b) => a - b)
  if (sortedArr[0] !== 1) return 1

  const result = sortedArr.find((v, i, a) => {
    const expectedNext = v + 1
    if (expectedNext !== a[i + 1]) return true
  })

  return result + 1
}


console.info(solution(arr))
