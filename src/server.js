const express = require('express')
const app = express()
const sendSMS = require('./lib/Twilio.js')
require('dotenv').config()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helmet = require('helmet')

const {
  createTimer,
  startTimer,
  stopTimer,
  resetTimer,
  decrementTimer
} = require('./timers.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(methodOverride());
app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  app.use("/", express.static(__dirname + '/client/build'));
  console.log(__dirname + '/client/build')
}

let timersArray = []
let alertsArray = []

const checkAlerts = (timerId, time) => {
  alertsArray = alertsArray.map(alert => {
    if(alert.timerId === timerId && !alert.activated && alert.activationTime === time){
      sendSMS(alert.description)
      return Object.assign({}, alert, {activated: true})
    }else{
      return alert
    }
  })
}

const updateTimer = timerId => {
  const timer = timersArray.filter(timer => timer.id === timerId)[0]
  let updatedTimer = decrementTimer(timer)
  checkAlerts(updatedTimer.id, updatedTimer.currentTime)
  if(updatedTimer.currentTime === "0:00"){
    clearInterval(updatedTimer)
    updatedTimer = stopTimer(updatedTimer)
    updatedTimer.interval = null
  }
  console.log(updatedTimer.currentTime)
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

if (process.env.NODE_ENV === 'dev') {
  app.use(allowCrossDomain);
}

app.get('/alert/:id', (req, res) => {
  const alert = alertsArray.filter(alert => alert.id === req.params.id)[0]
  res.send(alert)
})

app.post('/alert/:id/update', (req, res) => {
  if (req.params.id !== req.body.alert.id) sendStatus(500)
  const updatedAlert = req.body.alert
  alertsArray = alertsArray.map(a => {
    return (a.id === updatedAlert.id)
    ? updatedAlert
    : a
  })
  console.log(updatedAlert)
  res.send(updatedAlert)
})

app.delete('/alert/:id/delete', (req, res) => {
  const alertID = req.params.id
  alertsArray = alertsArray.filter(alert => alert.id !== alertID)
  res.sendStatus(200)
})

app.get('/alerts', (req, res) => {
  res.send(alertsArray)
})

app.post('/alerts/new', (req, res) => {
  const alert = req.body.alert
  alertsArray = [...alertsArray, alert]
  console.log(alert)
  res.send(alert)
})

app.get('/timer/:id', (req, res) => {
 const timer = timersArray.filter(timer => timer.id === req.params.id)[0] 
 res.send(timer)
})

app.post('/timer/:id/update', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.params.id)[0]
  const updatedTimer = req.body.timer
  if (timer.id !== updatedTimer.id) sendStatus(500)
  timersArray = timersArray.map(t => {
    return (t.id === updatedTimer.id)
    ? updatedTimer
    : t
  })
  console.log("Timer updated!", updatedTimer)
  res.send(updatedTimer)
})

app.post('/timer/:id/start', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.params.id)[0]
  const startedTimer = startTimer(timer)
  const interval = setInterval(updateTimer, 1000, startedTimer.id)
  startedTimer.interval = interval
  timersArray = timersArray.map(t => {
    return (t.id === startedTimer.id)
    ? startedTimer
    : t
  })
  console.log("Timer started. Current time is:", startedTimer.currentTime)
  res.send(Object.assign({}, startedTimer, {interval: null}))
})

app.post('/timer/:id/stop', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.params.id)[0]
  const stoppedTimer = stopTimer(timer)
  clearInterval(timer.interval)
  stoppedTimer.interval = null
  timersArray = timersArray.map(t => {
    return (t.id === stoppedTimer.id)
    ? stoppedTimer
    : t
  })
  console.log("Timer stopped. Current time is:", stoppedTimer.currentTime)
  res.send(stoppedTimer)
})

app.post('/timer/:id/reset', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.params.id)[0]
  const resetedTimer = resetTimer(timer)
  timersArray = timersArray.map(t => {
    return (t.id === resetedTimer.id)
    ? resetedTimer
    : t
  })
  res.send(Object.assign({}, resetedTimer, {interval: null}))
})

app.get('/timers', (req, res) => {
  res.send(timersArray)
})

app.post('/timers/new', (req, res) => {
  const timer = createTimer(req.body.initialMinutes)
  timersArray = [...timersArray, timer]
  res.send(timer)
})

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT + 'env:' + process.env.NODE_ENV)
})