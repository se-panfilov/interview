function solution(str) {
  const list = str.split('')

  let start = 0
  const result = []

  let end = 1
  let current = 0
  let next = 1

  list.forEach(item => {
    const currentVal = list[current]
    const nextVal = list[next]
    const isSame = (currentVal === nextVal)

    if (isSame) {
      end = next
      current += 1
      next += 1
    } else {
      end = next
      const part = list.slice(start, end).join('')
      result.push(part)
      start = next
      end = next + 1
      current += 1
      next += 1
    }
  })

  return result;
}

describe('asd', () => {

  it('should split with single block', () => {
    const str = 'aaa'
    const expectedResult = ['aaa']

    expect(solution(str)).toEqual(expectedResult)
  });

  it('should split short string', () => {
    const str = 'aaabbc'
    const expectedResult = ['aaa', 'bb', 'c']

    expect(solution(str)).toEqual(expectedResult)
  });

  it('should split long string', () => {
    const str = 'aaabbbbbccdddddd'
    const expectedResult = ['aaa', 'bbbbb', 'cc', 'dddddd']

    expect(solution(str)).toEqual(expectedResult)
  });

  it('should do nothing when empty string', () => {
    const str = ''
    const expectedResult = []

    expect(solution(str)).toEqual(expectedResult)
  });

  it('should split different characters', () => {
    const str = 'aa111--****'
    const expectedResult = ['aa', '111', '--', '****']

    expect(solution(str)).toEqual(expectedResult)
  });

  it('should split 1-letter blocks', () => {
    const str = 'abcdef'
    const expectedResult = ['a', 'b', 'c', 'd', 'e', 'f']

    expect(solution(str)).toEqual(expectedResult)
  });


});
