const dist = require("./dist");

const circleCircle = (x, y, d, x2, y2, d2) => {
  if (dist(x, y, x2, y2) <= d / 2 + d2 / 2) {
    return true;
  }
  return false;
};

module.exports = circleCircle;
