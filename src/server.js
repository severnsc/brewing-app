const express = require('express')
const app = express()
const sendSMS = require('./lib/Twilio.js')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/messages', (req, res) => {
  sendSMS(req.body.message)
  res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT)
})