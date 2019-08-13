var SEPARATOR = '/'

function isAbsolutePath (str) {
  if (str.length === 0) return false
  return str.indexOf('/') === 0
}

function split (str) {
  var result = str.split(SEPARATOR)
  // if (result[0].length === 0) result[0] = '/'
  return result
}

function removeExtraUps (str) {
  var regex = new RegExp(/[A-z]*\/..\//g)
  var result = str.replace(regex, '')
  if (result !== str) return removeExtraUps(result)
  return result
}

function cd (current, change) {
  if (isAbsolutePath(change)) return removeExtraUps(change)

  var currentArr = split(current)
  var changeArr = split(removeExtraUps(change))

  var result = currentArr.concat(changeArr)
  // console.info(result)
  return removeExtraUps((result.join(SEPARATOR)))
}

console.log(cd('/some/test/folder', 'subfolder')) // '/some/test/folder/subfolder'
console.log(cd('/some/test/folder', '/subfolder')) // '/subfolder'
console.log(cd('/some/test/folder', '../subfolder')) // '/some/test/subfolder'
console.log(cd('/some/test/folder', '/folder/subfolder/../subfolder')) // '/folder/subfolder'
console.log(cd('/we/can/go', 'back/back/../../and/../forth')) // '/we/can/go/forth'
