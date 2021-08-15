const dist = require("./dist");
const pointCircle = require("./pointCircle");
const pointLine = require("./pointLine");
const lineLine = require("./lineLine");
const lineCircle = require("./lineCircle");
const circleCircle = require("./circleCircle");

const collisionCheck = (current, neighbour) => {
  const x = current.x;
  const y = current.y;
  const cX = current.center.x;
  const cY = current.center.y;
  const d = current.diameter;

  const x2 = neighbour.x;
  const y2 = neighbour.y;
  const cX2 = neighbour.center.x;
  const cY2 = neighbour.center.y;
  const d2 = neighbour.d;
  // checks if current circle touches neighbour circle
  if (circleCircle(x, y, d, x2, y2, d2)) return true;

  // checks if current line touches neighbour circle
  if (lineCircle(cX, cY, x, y, x2, y2, d2)) return true;

  // checks if two lines cross
  if (lineLine(cX, cY, x, y, cX2, cY2, x2, y2)) return true;
};

module.exports = {
  dist,
  pointCircle,
  pointLine,
  lineLine,
  lineCircle,
  circleCircle,
  collisionCheck,
};
