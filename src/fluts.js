const stdin = process.openStdin()
let content = ''

stdin.addListener('data', d => {
  content += d.toString().trim()
})

stdin.addListener('end', () => { //required ctrl-D or cmd-D to end input
  proceed(content)
})

// 1
// 6 12 3 10 7 16 5
// 2
// 5 7 3 11 9 10
// 9 1 2 3 4 10 16 10 4 16
// 0

function proceed (content) {
  const arr = content.split('\n').map(v => v.split(' '))
  const result = []

  arr.forEach((v, i) => {
    if (v.length === 1 && +v[0] !== 0) { //means it's Z
      result.push(arr.slice(i + 1, ((i + 1) + (+v[0]))))
    }
  })

  const newResult = result.map(v => {
    if (Array.isArray(v)) return v.toString()
  })
  const superNewResult = newResult.filter(v => v.length > 0)
  // const profit = getProfit(10, superNewResult)
  superNewResult.forEach(v => getProfit(v)) //I've fucked loose Z and have no time to fix it
}

// proceed('1\n6 12 3 10 7 16 5\n2\n5 7 3 11 9 10\n9 1 2 3 4 10 16 10 4 16\n0')

// function getProfit (z, str) {
function getProfit (str) {
  const sellPricePerOne = 10
  // if (+z === 0) {
  //   console.log('Z shall not be 0')
  //   return
  // }

  const arr = str.split(',').slice(1).map(Number)

  // console.info(arr)
  const profits = []
  let accumulatedVal = 0
  let maxProfit = 0

  arr.forEach((v, i) => {
    const sellPrice = sellPricePerOne * (i + 1)
    accumulatedVal += v
    const stepProfit = sellPrice - accumulatedVal
    maxProfit = (stepProfit >= maxProfit) ? stepProfit : maxProfit
    profits.push(stepProfit)
    console.info(`${i + 1}: buyPrice: ${v}, sellPrice: ${sellPrice}, stepProfit: ${stepProfit}`)
  })

  // console.info(profits)
  const maxProfitIndexes = profits.map((v, i) => v === maxProfit ? i : '').filter(String).map(v => v + 1)

  // console.info(`schuurs: ${Z}`) // I've lost Z
  console.info(`Maximum profit is: ${maxProfit}`)
  console.info(`Number of fluts to buy: ${maxProfitIndexes}`)

  // return maxProfitIndexes
}

// const result = getProfit(z, str)
// const result = getProfit(1, '6 12 3 10 7 16 5')
// console.info(result)
