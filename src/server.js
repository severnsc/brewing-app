const express = require('express')
const app = express()
const sendSMS = require('./lib/Twilio.js')
require('dotenv').config()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const timers = require('./timers.js')
const createTimer = timers.createTimer
const startTimer = timers.startTimer

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(methodOverride());

let timersArray = []

const decrementTimer = timerID => {
  const timer = timersArray.filter(t => t.id === timerID)[0]
  const splitTimer = timer.currentTime.split(":")
  const timerMinutes = parseInt(splitTimer[0], 10)
  const timerSeconds = parseInt(splitTimer[1], 10)
  let updatedTimer
  if(timerSeconds === 0){
     updatedTimer = Object.assign({}, timer, {
      currentTime: `${timerMinutes - 1}:59`
    })
  }else{
    let newSeconds = timerSeconds - 1
    if(newSeconds < 10){
      newSeconds = "0" + newSeconds
    }
    updatedTimer =  Object.assign({}, timer, {
      currentTime: `${timerMinutes}:${newSeconds}`
    })
  }
  timersArray = timersArray.map(t => {
    return (t.id === updatedTimer.id)
    ? updatedTimer
    : timer
  })
  console.log(updatedTimer)
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

app.post('/timers/new', (req, res) => {
  const timer = createTimer(req.body.initialMinutes)
  timersArray.push(timer)
  res.send(timer)
})

app.post('/timers/start', (req, res) => {
  const timer = timersArray.filter(timer => timer.id === req.body.id)[0]
  const startedTimer = startTimer(timer)
  timersArray = timersArray.map(t => {
    return (t.id === req.body.id)
    ? startedTimer
    : t
  })
  const interval = setInterval(decrementTimer, 1000, startedTimer.id)
  //send back the interval somehow, for now sending 200
  res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT)
})