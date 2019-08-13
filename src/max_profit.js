
function max_profit (arr) {
  var min = Math.min.apply(Math, arr)
  var minIndex = arr.indexOf(min)
  var restArr = arr.slice(minIndex)
  var max = Math.max.apply(Math, restArr)
  if (max < min) return 0
  return max - min
}

console.log(max_profit([10, 7, 5, 8, 11, 9]));  //should be 6
