
const isEmpty = (obj) => {
  const keys = Object.keys(obj);
  if (keys.length === 0){
    throw new Error("Object is empty");
  }
  return false;
}

module.exports = {
  isEmpty
}