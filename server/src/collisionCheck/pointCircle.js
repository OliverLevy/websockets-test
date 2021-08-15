const dist = require("./dist");
const pointCircle = (x, y, cx, cy, d) => {
  if (dist(x, y, cx, cy) <= d / 2) {
    return true;
  }
  return false;
};

module.exports = pointCircle;
