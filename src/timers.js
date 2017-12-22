const shortid = require('shortid')

const createTimer = initialMinutes => ({
  id: shortid.generate(),
  initialMinutes,
  currentTime: `${initialMinutes}:00`,
  running: false
})

const startTimer = timer => {
  const startedTimer = Object.assign({}, timer, {
    running: true,
    startTime: Date.now()
  })
  return startedTimer
}

const decrementTimer = timer => {
  const elapsedMs = Date.now() - timer.startTime
  const initialMs = timer.initialMinutes * 60000
  const newMs = initialMs - elapsedMs
  const timerMinutes = Math.floor(newMs / 60000)
  let timerSeconds = (newMs / 1000) % 60
  if (timerSeconds < 10) timerSeconds = "0" + timerSeconds
  const decrementedTimer =  Object.assign({}, timer, {
    currentTime: `${timerMinutes}:${timerSeconds}`
  })
  return decrementedTimer
}

module.exports = {
  createTimer,
  startTimer,
  decrementTimer
}