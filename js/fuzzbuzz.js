//1
function fussBuzz1 (arr) {
  for (let i = 0; i < arr.length; i++) {
    let str = ''
    const isFuzz = (arr[i] % 3) === 0
    const isBuzz = (arr[i] % 5) === 0
    if (isFuzz) str += 'Fuzz'
    if (isBuzz) str += 'Buzz'
    console.log(str)
  }
}

// fussBuzz1([1, 3, 5, 4, 4, 7, 9, 15, 25, 30])

//2 functional style
function fussBuzz2 (arr, position = 0) {
  if (position >= arr.length) return

  let str = ''
  const isFuzz = (arr[position] % 3) === 0
  const isBuzz = (arr[position] % 5) === 0
  if (isFuzz) str += 'Fuzz'
  if (isBuzz) str += 'Buzz'
  console.log(str)

  return fussBuzz2(arr, position + 1)

}

// fussBuzz1([1, 3, 5, 4, 4, 7, 9, 15, 25, 30])
// fussBuzz2([1, 3, 5, 4, 4, 7, 9, 15, 25, 30])

//3 via .map
const arr = [1, 3, 5, 4, 4, 7, 9, 15, 25, 30]
arr.map(v => {
  let str = ''
  const isFuzz = (v % 3) === 0
  const isBuzz = (v % 5) === 0
  if (isFuzz) str += 'Fuzz'
  if (isBuzz) str += 'Buzz'
  console.log(str)

  return str
})
