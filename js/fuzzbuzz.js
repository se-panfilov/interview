//1
function fuzzbuzz (arr) {
  for (let i = 0; i < arr.length; i++) {
    let str = ''
    const isFuzz = (arr[i] % 3) === 0
    const isBuzz = (arr[i] % 5) === 0
    if (isFuzz) str += 'Fuzz'
    if (isBuzz) str += 'Buzz'
    console.log(str)
  }
}

//fuzzbuzz([1, 3, 5, 4, 4, 7, 9, 15, 25, 30])

//2
function fussBuzz (arr, position = 0) {
  if (position>=arr.length) return

  let str = ''
  const isFuzz = (arr[position] % 3) === 0
  const isBuzz = (arr[position] % 5) === 0
  if (isFuzz) str += 'Fuzz'
  if (isBuzz) str += 'Buzz'
  console.log(str)

  return fussBuzz(arr, position + 1)

}

fussBuzz([1, 3, 5, 4, 4, 7, 9, 15, 25, 30])
