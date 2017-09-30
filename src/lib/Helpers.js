export const excludes = (array, search) => {
  if(array.includes(search)){
    return false
  }else{
    return true
  }
}