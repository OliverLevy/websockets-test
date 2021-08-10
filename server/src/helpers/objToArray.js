const objToArray = (obj) => {
  return Object.keys(obj).map((key) => obj[key]);
};

module.exports = objToArray;
