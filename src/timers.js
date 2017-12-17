const shortid = require('shortid')

const createTimer = initialMinutes => ({
  id: shortid.generate(),
  initialMinutes,
  currentTime: `${initialMinutes}:00`,
  running: false
})

module.exports = createTimer