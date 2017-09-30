Array.prototype.excludes = function(search) {
  if(this.includes(search)){
    return false
  }else{
    return true
  }
}