const express = require('express')
const app = express()
const sendSMS = require('./lib/Twilio.js')
require('dotenv').config()

app.post('/messages', (req, res) => {
  sendSMS(req.body)
  res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port' + process.env.PORT)
})