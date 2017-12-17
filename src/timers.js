const shortid = require('shortid')

const createTimer = initialMinutes => ({
  id: shortid.generate(),
  initialMinutes,
  currentTime: `${initialMinutes}:00`,
  running: false
})

const startTimer = timer => {
  const startedTimer = Object.assign({}, timer, {running: true})
  return startedTimer
}

module.exports = {
  createTimer: createTimer,
  startTimer: startTimer
}