export const toTime = (minutes, seconds) => {
  return `${minutes}:${seconds}`
}

export const totalSeconds = (minutes, seconds) => {
  return (minutes * 60) + seconds
}

export const formatSeconds = (seconds) => {
  if(seconds < 10){
    return "0" + seconds
  }
}