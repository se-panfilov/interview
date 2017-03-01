const arr = ['j', 'e', 'x', 'i', 'a', 'd', 'e', 'v', 'x', 'x']

function getFreq (arr) {
  const counts = {}
  let biggest = {name: null, val: 0}

  arr.forEach(v => {
    counts[v] = (counts[v] || 0) + 1
    if (counts[v] > biggest.val) {
      biggest.val = counts[v]
      biggest.name = v
    }
  })

  return `${biggest.name} used ${biggest.val} times`
}

let result = getFreq(arr)
console.info(result)
