function repeat1 (str, n, count = 0) {
    if (!n) return ''
    if (count >= n - 1) return str
    count += 1
    str += repeat1(str, n, count)
    return str
}


function repeat2 (str, n, count = 0) {
    if (!n) return ''
    str += (count >= n - 1) ? '' : repeat2(str, n, count + 1)
    return str
}

const result1 = repeat1('a', 10)
console.info(`${result1}, length: ${result1.length}`)

const result2 = repeat2('a', 10)
console.info(`${result2}, length: ${result2.length}`)