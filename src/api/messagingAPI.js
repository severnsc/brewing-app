const sendMessage = (message) => {
  const messageEndpoint = 'http://localhost:3001/messages'
  return fetch(messageEndpoint, {
    body: JSON.stringify({message}),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
}

export default sendMessage