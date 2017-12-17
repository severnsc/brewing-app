const chai = require('chai')
const should = chai.should()
const createTimer = require('../src/timers.js')

it('should create a new timer and return it', () => {
  const newTimer = createTimer(90)
  newTimer.should.be.a('object')
  newTimer.should.have.property('initialMinutes').equal(90)
  newTimer.should.have.property('running').equal(false)
  newTimer.should.have.property('currentTime').equal('90:00')
})