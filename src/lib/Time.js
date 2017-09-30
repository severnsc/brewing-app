export const toTime = (minutes, seconds) => {
  return `${minutes}:${seconds}`
}

export const totalSeconds = (minutes, seconds) => {
  return (minutes * 60) + seconds
}