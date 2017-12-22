const shortid = require('shortid')

const createAlert = (description, triggerTime, timerId) => {
  return {
    id: shortid.generate(),
    description,
    triggerTime,
    timerId,
    triggered: false
  }
}

const editAlert = (alert, newProps) => {
  const editedAlert = Object.assign({}, alert, newProps)
  return editedAlert
}

const triggerAlert = alert => {
  const triggeredAlert = Object.assign({}, alert, {
    triggered: true
  })
  return triggeredAlert
}

module.exports = {
  createAlert,
  editAlert,
  triggerAlert
}