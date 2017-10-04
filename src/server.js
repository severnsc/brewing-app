const express = require('express')
const app = express()
const sendSMS = require('./lib/Twilio.js')

app.post('/messages', (req, res) => {
  sendSMS(req.body)
  res.sendStatus(200)
})

app.listen(4000, () => {
  console.log('Example app listening on port 4000')
})