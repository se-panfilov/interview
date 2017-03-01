function main(n) {
  //const n = parseInt(readLine());
  const img = '#'

  for (let i=n; i >= 0; i--){
    const str = '_'.repeat(i) + img.repeat((n-i))
    if (str !== '______' ) console.log(str)
  }

}

main(1)
