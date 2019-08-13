function processData (arr) {

  return sort(arr)
}

function sort (arr) {
  for (let j = 1; j < arr.length; j++) {
    const key = arr[j]
    let i = j - 1

    while (i > 0 && arr[i] > key) {
      arr[i + 1] = arr[i]
      i = i - 1
    }

    arr[i + 1] = key
    console.info(arr)
  }


}

// 1 4 3 5 6 2
// 1 3 4 5 6 2
// 1 3 4 5 6 2
// 1 3 4 5 6 2
// 1 2 3 4 5 6

// function sort (arr, index = 0) {
//   const a = arr[index]
//   const b = arr[index + 1]
//   if (!b && b !== 0) return arr
//
//   let nextIndex = index + 1
//
//   if (a > b) {
//     arr[index + 1] = a
//     arr[index] = b
//     nextIndex = index - 1
//   }
//
//   console.log(arr.join(' '))
//   return sort(arr, nextIndex)
// }


processData([1, 4, 3, 5, 6, 2])
