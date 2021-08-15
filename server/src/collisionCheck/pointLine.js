const dist = require('./dist')

const pointLine = (px, py, x1, y1, x2, y2, buffer) => {
  // get distance from the point to the two ends of the line
  const d1 = dist(px, py, x1, y1);
  const d2 = dist(px, py, x2, y2);

  // get the length of the line
  const lineLen = dist(x1, y1, x2, y2);

  // since floats are so minutely accurate, add a little buffer zone that will give collision
  if (buffer === undefined) {
    buffer = 0.5;
  } // higher # = less accurate

  // if the two distances are equal to the line's length, the point is on the line!
  // note we use the buffer here to give a range, rather than one #
  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
};

module.exports = pointLine