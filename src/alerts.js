const shortid = require('shortid')

const createAlert = (description, activationTime, timerId) => {
  return {
    id: shortid.generate(),
    description,
    activationTime,
    timerId,
    activated: false
  }
}

const editAlert = (alert, newProps) => {
  const editedAlert = Object.assign({}, alert, newProps)
  return editedAlert
}

const activateAlert = alert => {
  const activatedAlert = Object.assign({}, alert, {
    activated: true
  })
  return activatedAlert
}

module.exports = {
  createAlert,
  editAlert,
  activateAlert
}