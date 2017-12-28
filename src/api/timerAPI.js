export const stopRemoteTimer = remoteTimer => {
  return fetch(`http://localhost:3001/timer/${remoteTimer.id}/stop`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  .then(
    res => res.json(),
    err => console.log("An error occured.", err)
  )
}

export const updateRemoteTimer = (remoteTimer, timerToSend) => {
  return fetch(`http://localhost:3001/timer/${remoteTimer.id}/update`, {
    body: JSON.stringify({timer: timerToSend}),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  .then(
    res => res.json(),
    err => console.log("An error occured.", err)
  )
}