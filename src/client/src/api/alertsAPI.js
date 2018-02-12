export const createRemoteAlert = alert => {
  return fetch(`/alerts/new`, {
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
  return fetch(`/alert/${alert.id}/update`, {
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

export const deleteRemoteAlert = id => {
  return fetch(`/alert/${id}/delete`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE"
  })
}