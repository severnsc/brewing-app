export const createRemoteTimer = minutes => {
  return fetch('http://localhost:3001/timers/new', {
    body: JSON.stringify({initialMinutes: minutes}),
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

export const startRemoteTimer = remoteTimerID => {
  return fetch(`http://localhost:3001/timer/${remoteTimerID}/start`, {
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

export const stopRemoteTimer = remoteTimerID => {
  return fetch(`http://localhost:3001/timer/${remoteTimerID}/stop`, {
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

export const updateRemoteTimer = (remoteTimerID, timerToSend) => {
  return fetch(`http://localhost:3001/timer/${remoteTimerID}/update`, {
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

export const resetRemoteTimer = remoteTimerID => {
  return fetch(`http://localhost:3001/timer/${remoteTimerID}/reset`, {
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