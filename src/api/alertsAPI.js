export const createRemoteAlert = alert => {
  return fetch(`http://localhost:3001/alerts/new`, {
    body: JSON.stringify({alert}),
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

export const updateRemoteAlert = alert => {
  return fetch(`http://localhost:3001/alert/${alert.id}/update`, {
    body: JSON.stringify({alert}),
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