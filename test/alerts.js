const chai = require('chai')
const should = chai.should()
const {
  createAlert,
  editAlert,
  triggerAlert
} = require('../src/alerts.js')

describe('createAlert', () => {
  it('should create a new alert and return it', () => {
    const newAlert = createAlert("description", "89:00", 1)
    newAlert.should.be.a('object')
    newAlert.should.have.property('id')
    newAlert.should.have.property('description').equal('description')
    newAlert.should.have.property('triggerTime').equal('89:00')
    newAlert.should.have.property('timerId').equal(1)
    newAlert.should.have.property('triggered').equal(false)
  })
})

describe('editAlert', () => {
  it('should return a copy of alert with edited props', () => {
    const alert = {
      id: 1,
      description: "description",
      triggerTime: "89:00",
      timerId: 1,
      triggered: false
    }
    const editedAlert = editAlert(alert, {
      description: "edited description"
    })
    alert.should.equal(alert)
    editedAlert.should.not.equal(alert)
    editedAlert.should.have.property('description').equal('edited description')
  })
})

describe('triggerAlert', () => {
  it('should return clone of alert w/ triggered = true', () => {
    const alert = {
      id: 1,
      description: "description",
      triggerTime: "89:00",
      timerId: 1,
      triggered: false
    }
    const triggeredAlert = triggerAlert(alert)
    alert.should.equal(alert)
    triggeredAlert.should.not.equal(alert)
    triggeredAlert.should.have.property('triggered').equal(true)
  })
})