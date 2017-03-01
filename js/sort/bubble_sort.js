//1
function bubble (arr, position = 0) {
    if (position >= arr.length) return arr

    let isSorted = false
    if (arr[position] > arr[position + 1]) {
        const a = arr[position]
        const b = arr[position + 1]
        arr[position] = b
        arr[position + 1] = a
        isSorted = true
    }

    position = (isSorted) ? 0 : position + 1
    return bubble(arr, position)
}

let result = bubble([4, 7, 5, 6, 3, 2, 1, 8, 9])
// let result = bubble([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
console.info(result)


//2

// Bubble sort is a simple sorting algorithm that works by repeatedly
// stepping through the list to be sorted, comparing each pair of adjacent
// items and swapping them if they are in the wrong order. Implement the algorithm.
const input = [1, 3, 4, 6, 8, 4, 2, 1, 5, 1]
const sorted = bubbleSort(input)
// for(let i=0; i < sorted.length; i++) {
//   console.log(sorted[i])
// }

function swipe (arr, position) {
    const a = arr[position]
    const b = arr[position + 1]
    arr[position] = b
    arr[position + 1] = a
    return arr
}

function sort (arr) {
    let isSwiped = false
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            arr = swipe(arr, i)
            isSwiped = true
        }
    }

    arr = (isSwiped === true) ? sort(arr) : arr
    return arr
}

function bubbleSort (arr) {
    sort(arr)

    return arr
}

console.info(sorted)

