export const isMinutesInteger = (minutes) => {
  return isNaN(minutes) ? false : true
}

export const isMinutesPositive = (minutes) => {
  return minutes < 0 ? false : true
}

export const isMinutesUnderMax = (minutes, maxMinutes) => {
  return minutes > maxMinutes ? false : true
}

export const isSecondsInteger = (seconds) => {
  return isNaN(seconds) ? false : true
}

export const isSecondsPositive = (seconds) => {
  return seconds < 0 ? false : true
}

export const isSecondsUnderMax = (seconds) => {
  return seconds > 59 ? false : true
}

export const isTimeUnderMax = (minutes, seconds, maxTime) => {
  if((minutes * 60000) + (seconds * 1000) > maxTime){
    return false
  }else{
    return true
  }
}