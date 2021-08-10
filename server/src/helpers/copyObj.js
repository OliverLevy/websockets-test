const copyObj = (ogObj) => {
  return JSON.parse(JSON.stringify(ogObj)).reduce((pends, pend) => {
    if (!pends[pend.id]) {
      pends[pend.id] = pend;
    }
    return pends;
  }, {});
};

module.exports = copyObj;
