const chai = require('chai')
const should = chai.should()
const {
  createTimer,
  startTimer,
  stopTimer,
  resetTimer,
  decrementTimer
} = require('../src/timers.js')

describe('createTimer', () => {
  it('should create a new timer and return it', () => {
    const newTimer = createTimer(90)
    newTimer.should.be.a('object')
    newTimer.should.have.property('initialMinutes').equal(90)
    newTimer.should.have.property('running').equal(false)
    newTimer.should.have.property('currentTime').equal('90:00')
  })
})

describe('startTimer', () => {
  it('should return clone of timer with start props set', () => {
    const timer = createTimer(90)
    const startedTimer = startTimer(timer)
    timer.should.equal(timer)
    startedTimer.should.not.equal(timer)
    startedTimer.should.have.property('running').equal(true)
    startedTimer.should.have.property('id').equal(timer.id)
    startedTimer.should.have.property('startTime')
  })
})

describe('stopTimer', () => {
  it('should return clone of timer with stop props set', () => {
    const timer = createTimer(90)
    timer.running = true
    timer.startTime = Date.now()
    const stoppedTimer = stopTimer(timer)
    timer.should.equal(timer)
    stoppedTimer.should.not.equal(timer)
    stoppedTimer.should.have.property('running').equal(false)
    stoppedTimer.should.have.property('id').equal(timer.id)
    stoppedTimer.should.have.property('startTime').equal(null)
  })
})

describe('resetTimer', () => {
  it('should return clone of timer set to original time', () => {
    const timer = createTimer(90)
    timer.currentTime = '89:52'
    const resetedTimer = resetTimer(timer)
    timer.should.equal(timer)
    resetedTimer.should.not.equal(timer)
    resetedTimer.should.have.property('currentTime').equal('90:00')
  })
})

describe('decrementTimer', () => {
  it('should return a clone of timer with time decremented', (done) => {
    const timer = createTimer(90)
    timer.running = true
    timer.startTime = Date.now()
    const decrementedTimer = decrementTimer(timer)
    done()
    timer.should.equal(timer)
    decrementedTimer.should.not.equal(timer)
    decrementedTimer.should.have.property('currentTime').not.equal('90:00')
  })
})