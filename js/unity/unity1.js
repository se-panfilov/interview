/*
* Our application servers receive approximately 20 000
* http requests  per second. Response timeout is 19000ms.
* Implement a statistics collector that calculates the
* median and average request response times for a 7 day
* dataset.
*
* Assigment:
* 1. Implement StatsCollector
* 2. Write tests (below StatsCollector)
*/

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const REQUESTS_PER_SECOND = 20000

'use strict'

class StatsCollector {
  constructor () {
    this.data = []
    this.sum = 0
    this.ave = 0
  }

  pushValue (responseTimeMs) {
    if (!Number.isFinite(responseTimeMs)) throw new Error('Incorrect responseTimeMs value')
    if (responseTimeMs < 0) throw new Error('Negative responseTimeMs not allowed')

    this.data.push(responseTimeMs)
    this.sum += responseTimeMs
    this.ave = this.sum / this.data.length
  }

  getDatasetStartIndex (days, dataLength = 0) {
    if (!Number.isFinite(days)) throw new Error('Incorrect days value')
    if (!Number.isFinite(dataLength)) throw new Error('Incorrect dataLength value')
    if (days < 0) throw new Error('Negative days not allowed')
    if (dataLength < 0) throw new Error('Negative dataLength not allowed')

    const range = REQUESTS_PER_SECOND * (DAY * days)
    return (dataLength > range) ? dataLength - range : 0
  }

  getDataset (days = 7) {
    if (!Number.isFinite(days)) throw new Error('Incorrect days value')
    if (days < 0) throw new Error('Negative days not allowed')

    // 20 000 requests per second
    // means (20 000 * 60sec * 60mins * 24hours) 1 728 000 000 per day (12 096 000 000 at week)
    const start = this.getDatasetStartIndex(days, this.data.length)
    return this.data.slice(start, this.data.length)
  }

  getMedian (days = 7) {
    if (!Number.isFinite(days)) throw new Error('Incorrect days value')
    if (days < 0) throw new Error('Negative days not allowed')

    const dataset = this.getDataset(days)
    const sortedArr = dataset.sort((a, b) => a - b)
    const isEven = sortedArr.length % 2 === 0
    const middle = Math.floor(sortedArr.length / 2)
    return isEven ? ((sortedArr[middle] + sortedArr[middle - 1]) / 2) : sortedArr[middle]
  }

  getAverage (days = 7) {
    if (!Number.isFinite(days)) throw new Error('Incorrect days value')
    if (days < 0) throw new Error('Negative days not allowed')

    const start = this.getDatasetStartIndex(days)
    if (start === 0) return this.ave

    const dataset = this.getDataset(days)
    return dataset.reduce((c, v) => c + v) / dataset.length
  }

}

// TODO (S.Panfilov)
const mocha = require('mocha')
// const sinon = require('sinon')
const expect = require('chai').expect
//

// Configure Mocha, telling both it and chai to use BDD-style tests.
// mocha.setup("bdd")
// chai.should()

// describe('StatsCollector', () => {
//   it('it should have tests', () => {
//     true.should.equal(true)
//   })
// })

// Tests

describe('StatsCollector.', () => {

  describe('constructor.', () => {

    it('should create proper object', () => {
      const statsCollector = new StatsCollector()

      expect(statsCollector.data).to.be.deep.equal([])
      expect(statsCollector.ave).to.be.equal(0)
      expect(statsCollector.sum).to.be.equal(0)
    })

  })

  describe('getAverage.', () => {

    it('should return 0 on empty data', () => {
      const statsCollector = new StatsCollector()

      const result = statsCollector.getAverage()

      expect(result).to.be.equal(0)
    })

    it('should return average on single value', () => {
      const val = 123
      const statsCollector = new StatsCollector()
      statsCollector.pushValue(val)

      const result = statsCollector.getAverage()

      expect(result).to.be.equal(val)
    })

    it('should return average on multiple values', () => {
      const values = [10, 20, 30]
      const statsCollector = new StatsCollector()
      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      const result = statsCollector.getAverage()
      const expectedVal = values.reduce((c, v) => c + v) / values.length

      expect(result).to.be.equal(expectedVal)
    })

    it('should return cached value when dataset is equal to whole data', () => {
      const values = [10, 20, 30]
      const statsCollector = new StatsCollector()
      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      const result = statsCollector.getAverage()
      const expectedVal = values.reduce((c, v) => c + v) / values.length

      expect(statsCollector.ave).to.be.equal(result)
      expect(result).to.be.equal(expectedVal)
    })

    it('should return calculated value when dataset is not equal to data', () => {
      const values = [10, 20, 30]
      const statsCollector = new StatsCollector()
      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      // dirty hack for mocking, cause don't want to add sinon here
      statsCollector.getDatasetStartIndex = function () {
        return 1
      }

      const result = statsCollector.getAverage()
      const wholeDataAve = values.reduce((c, v) => c + v) / values.length
      const datasetAve = (values[1] + values[2]) / 2

      expect(statsCollector.ave).to.be.equal(wholeDataAve)
      expect(statsCollector.ave).to.be.not.equal(datasetAve)
      expect(result).to.be.equal(datasetAve)
    })

    it('should throw an error on wrong days argument', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Incorrect days value'

      expect(() => statsCollector.getAverage('')).to.throw(expectedResult)
      expect(() => statsCollector.getAverage('3')).to.throw(expectedResult)
      expect(() => statsCollector.getAverage('seven')).to.throw(expectedResult)
      expect(() => statsCollector.getAverage(null)).to.throw(expectedResult)
      expect(() => statsCollector.getAverage({})).to.throw(expectedResult)
      expect(() => statsCollector.getAverage([])).to.throw(expectedResult)
      expect(() => statsCollector.getAverage(Infinity)).to.throw(expectedResult)
    })

    it('should throw an error when days is negative', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Negative days not allowed'

      expect(() => statsCollector.getAverage(-1)).to.throw(expectedResult)
      expect(() => statsCollector.getAverage(-10)).to.throw(expectedResult)
    })

  })

  describe('getMedian.', () => {

    it('should calculate the median request time with 1 request', () => {
      const val = 10
      const statsCollector = new StatsCollector()
      statsCollector.pushValue(val)

      const result = statsCollector.getMedian()

      expect(result).to.be.equal(val)
    })

    it('should return median in case of even length', () => {
      const values = [10, 20]

      const statsCollector = new StatsCollector()
      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])

      expect(values.length % 2).to.be.eq(0)

      const result = statsCollector.getMedian()
      const expectedResult = (values[0] + values[1]) / values.length

      expect(result).to.be.equal(expectedResult)
    })

    it('should return median in case of odd length', () => {
      const values = [10, 60, 30, 40, 50, 20, 70]
      const statsCollector = new StatsCollector()
      values.forEach(v => statsCollector.pushValue(v))
      expect(values.length % 2).to.be.eq(1)

      const result = statsCollector.getMedian()
      const sortedVals = values.sort((a, b) => a - b)
      const expectedVal = sortedVals[Math.floor(sortedVals.length / 2)]

      expect(result).to.be.eq(expectedVal)
    })

    it('should throw an error on wrong days argument', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Incorrect days value'

      expect(() => statsCollector.getMedian('')).to.throw(expectedResult)
      expect(() => statsCollector.getMedian('3')).to.throw(expectedResult)
      expect(() => statsCollector.getMedian('seven')).to.throw(expectedResult)
      expect(() => statsCollector.getMedian(null)).to.throw(expectedResult)
      expect(() => statsCollector.getMedian({})).to.throw(expectedResult)
      expect(() => statsCollector.getMedian([])).to.throw(expectedResult)
      expect(() => statsCollector.getMedian(Infinity)).to.throw(expectedResult)
    })

    it('should throw an error when days is negative', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Negative days not allowed'

      expect(() => statsCollector.getMedian(-1)).to.throw(expectedResult)
      expect(() => statsCollector.getMedian(-10)).to.throw(expectedResult)
    })

  })

  describe('getDataset.', () => {

    it('should return proper slice of data', () => {
      const values = [1, 2, 3]
      const statsCollector = new StatsCollector()

      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      statsCollector.getDatasetStartIndex = () => 0
      expect(statsCollector.getDataset(0)).to.be.deep.equal(values)

      statsCollector.getDatasetStartIndex = () => 1
      expect(statsCollector.getDataset(1)).to.be.deep.equal(values.slice(1, values.length))

      statsCollector.getDatasetStartIndex = () => 2
      expect(statsCollector.getDataset(1)).to.be.deep.equal(values.slice(2, values.length))
    })

    it('should throw an error on wrong days argument', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Incorrect days value'

      expect(() => statsCollector.getDataset('')).to.throw(expectedResult)
      expect(() => statsCollector.getDataset('3')).to.throw(expectedResult)
      expect(() => statsCollector.getDataset('seven')).to.throw(expectedResult)
      expect(() => statsCollector.getDataset(null)).to.throw(expectedResult)
      expect(() => statsCollector.getDataset({})).to.throw(expectedResult)
      expect(() => statsCollector.getDataset([])).to.throw(expectedResult)
      expect(() => statsCollector.getDataset(Infinity)).to.throw(expectedResult)
    })

    it('should throw an error when days is negative', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Negative days not allowed'

      expect(() => statsCollector.getDataset(-1)).to.throw(expectedResult)
      expect(() => statsCollector.getDataset(-10)).to.throw(expectedResult)
    })

  })

  describe('getDatasetStartIndex.', () => {

    it('should return 0 if data length shorter then range', () => {
      const values = [1, 2, 3]
      const statsCollector = new StatsCollector()
      const days = 1

      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      const expectedResult = statsCollector.getDatasetStartIndex(days, statsCollector.length)

      expect(expectedResult).to.be.equal(0)
    })

    it('should return slice start if data length greater then range', () => {
      const values = [1, 2, 3]
      const statsCollector = new StatsCollector()
      const days = 1
      const expectedRange = REQUESTS_PER_SECOND * (DAY * days) // a bit hacky

      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      const constMockedArrLength = expectedRange + 1

      const expectedResult = statsCollector.getDatasetStartIndex(days, constMockedArrLength)

      expect(expectedResult).to.be.equal(constMockedArrLength - expectedRange)
    })

    it('should throw an error on wrong days argument', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Incorrect days value'

      expect(() => statsCollector.getDatasetStartIndex('', 1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex('3', 1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex('seven', 1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(null, 1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex({}, 1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex([], 1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(Infinity, 1)).to.throw(expectedResult)
    })

    it('should throw an error on wrong dataLength argument', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Incorrect dataLength value'

      expect(() => statsCollector.getDatasetStartIndex(1, '')).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(1, '1')).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(1, 'seven')).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(1, null)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(1, {})).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(1, [])).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(1, Infinity)).to.throw(expectedResult)
    })

    it('should throw an error when days is negative', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Negative days not allowed'

      expect(() => statsCollector.getDatasetStartIndex(-1, 1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(-10, 1)).to.throw(expectedResult)
    })


    it('should throw an error when dataLength is negative', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Negative dataLength not allowed'

      expect(() => statsCollector.getDatasetStartIndex(1, -1)).to.throw(expectedResult)
      expect(() => statsCollector.getDatasetStartIndex(10, -10)).to.throw(expectedResult)
    })

  })

  describe('pushValue.', () => {

    it('should add value to data', () => {
      const statsCollector = new StatsCollector()
      const values = [1, 2, 10]

      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      expect(statsCollector.data).to.deep.equal(values)
    })

    it('should update static fields on add', () => {
      const statsCollector = new StatsCollector()
      const values = [1, 2, 10]

      statsCollector.pushValue(values[0])
      statsCollector.pushValue(values[1])
      statsCollector.pushValue(values[2])

      const expectedAve = values.reduce((c, v) => c + v) / values.length
      const expectedSum = values.reduce((c, v) => c + v)

      expect(statsCollector.ave).to.deep.equal(expectedAve)
      expect(statsCollector.sum).to.deep.equal(expectedSum)
    })

    it('should throw an error when value has incorrect type', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Incorrect responseTimeMs value'

      expect(() => statsCollector.pushValue('')).to.throw(expectedResult)
      expect(() => statsCollector.pushValue(null)).to.throw(expectedResult)
      expect(() => statsCollector.pushValue({})).to.throw(expectedResult)
      expect(() => statsCollector.pushValue([])).to.throw(expectedResult)
      expect(() => statsCollector.pushValue('10')).to.throw(expectedResult)
      expect(() => statsCollector.pushValue(undefined)).to.throw(expectedResult)
    })

    it('should throw an error when responseTimeMs is negative', () => {
      const statsCollector = new StatsCollector()

      const expectedResult = 'Negative responseTimeMs not allowed'

      expect(() => statsCollector.pushValue(-1)).to.throw(expectedResult)
      expect(() => statsCollector.pushValue(-10)).to.throw(expectedResult)
    })


  })

})

// TODO (S.Panfilov)
// Run all our test suites.  Only necessary in the browser.
// mocha.run()
