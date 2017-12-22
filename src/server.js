const express = require('express')
const app = express()
const sendSMS = require('./lib/Twilio.js')
require('dotenv').config()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const timers = require('./timers.js')
const createTimer = timers.createTimer
const startTimer = timers.startTimer
const resetTimer = timers.resetTimer
const decrementTimer = timers.decrementTimer

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(methodOverride());

let timersArray = []

const updateTimer = timerId => {
  const timer = timersArray.filter(timer => timer.id === timerId)[0]
  const updatedTimer = decrementTimer(timer)
  timersArray = timersArray.map(t => {
    return (t.id === updatedTimer.id)
    ? updatedTimer
    : t
  })
}

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.post('/messages', (req, res) => {
  sendSMS(req.body.message)
  res.sendStatus(200)
})

app.get('/timers', (req, res) => {
 const timer = timersArray.filter(timer => timer.id === req.query.id)[0] 
 res.send(timer)
})

app.post('/timers/new', (req, res) => {
  const timer = createTimer(req.body.initialMinutes)
  timersArray.push(timer)
  res.send(timer)
})

app.post('/timers/start', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.body.id)[0]
  const startedTimer = startTimer(timer)
  const interval = setInterval(updateTimer, 1000, startedTimer.id)
  startedTimer.interval = interval
  timersArray = timersArray.map(t => {
    return (t.id === startedTimer.id)
    ? startedTimer
    : t
  })
  res.sendStatus(200)
})

app.post('/timers/stop', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.body.id)[0]
  const stoppedTimer = stopTimer(timer)
  clearInterval(timer.interval)
  stoppedTimer.interval = null
  timersArray = timersArray.map(t => {
    return (t.id === stoppedTimer.id)
    ? stoppedTimer
    : t
  })
  res.sendStatus(200)
})

app.post('/timers/reset', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.body.id)[0]
  const resetedTimer = resetTimer(timer)
  timersArray = timersArray.map(t => {
    return (t.id === resetedTimer.id)
    ? resetedTimer
    : t
  })
  res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT)
})