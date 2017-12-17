const chai = require('chai')
const should = chai.should()
const timers = require('../src/timers.js')
const createTimer = timers.createTimer
const startTimer = timers.startTimer

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
  it('should return clone of timer with running true', () => {
    const timer = createTimer(90)
    const newTimer = startTimer(timer)
    timer.should.equal(timer)
    newTimer.should.not.equal(timer)
    newTimer.should.have.property('running').equal(true)
    newTimer.should.have.property('id').equal(timer.id)
  })
})