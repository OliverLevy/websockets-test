const pointCircle = require('./pointCircle')
const pointLine = require('./pointLine')

const lineCircle = (x1, y1, x2, y2, cx, cy, diameter) => {
  // check if anything is inside the circle
  var inside1 = pointCircle(x1, y1, cx, cy, diameter);
  var inside2 = pointCircle(x2, y2, cx, cy, diameter);
  if (inside1 || inside2) return true;

  // get length of the line
  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = Math.sqrt(distX * distX + distY * distY);

  // get dot product of the line and circle
  var dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(len, 2);

  // find the closest point on the line
  var closestX = x1 + dot * (x2 - x1);
  var closestY = y1 + dot * (y2 - y1);

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  var onSegment = pointLine(closestX, closestY, x1, y1, x2, y2);
  if (!onSegment) return false;

  // draw a debug circle at the closest point on the line

  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  var distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= diameter / 2) {
    return true;
  }
  return false;
};


module.exports = lineCircle