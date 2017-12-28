const constructURL = (id, path) => {
  return `http://localhost:3001/timer/${id}/${path}`
}

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
  return fetch(constructURL(remoteTimerID, 'start'), {
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
  return fetch(constructURL(remoteTimerID, 'stop'), {
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
  return fetch(constructURL(remoteTimerID, 'update'), {
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
  return fetch(constructURL(remoteTimerID, 'reset'), {
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