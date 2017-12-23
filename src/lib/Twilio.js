require('dotenv').config()
const twilio = require('twilio')
const client = new twilio(process.env.SID, process.env.TOKEN)

const sendSMS = message => {
  
  client.api.messages.create({
    body: message,
    to: process.env.TO_PHONE,
    from: process.env.FROM_PHONE
  })
  .then(mes => console.log(mes.sid))
  .catch(err => console.log(err))

}

module.exports = sendSMS