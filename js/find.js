function find (elem, arr, position = 0) {
  if (position >= arr.length) return -1
  if (elem === arr[position]) return position

  return find(elem, arr, position + 1)
}
