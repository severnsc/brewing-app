export const toTimeString = (minutes, seconds) => {
  return `${minutes}:${seconds}`
}

export const totalSeconds = (minutes, seconds) => {
  return (minutes * 60) + seconds
}

export const formatSeconds = (seconds) => {
  if(seconds < 10){
    return "0" + seconds
  }else{
    return seconds
  }
}

export const calculateMinutesFromMs = (ms) => {
  return Math.floor(ms / 60000)
}

export const calculateSecondsFromMs = (ms) => {
  return (ms % 60000) / 1000;
}