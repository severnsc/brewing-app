require('dotenv').config();

export const sendSMS = (message) => {
  
  const formData = new FormData()

  formData.append('body', encodeURIComponent(message))

  formData.append('to', encodeURIComponent(process.env.TO_PHONE))

  formData.append('from', encodeURIComponent(process.env.FROM_PHONE))

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + encodeURIComponent(process.env.SID + ':' + process.env.TOKEN)
    },
    body: formData
  }

  fetch(
    'https://api.twilio.com/2010-04-01/Accounts/' + process.env.SID + '/Messages.json',
    options
  ).then((response) => {
    //Parse JSON response
    console.log(response.json())
  })

}