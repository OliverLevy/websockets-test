const dist = require("./dist");
const pointCircle = require("./pointCircle");
const pointLine = require("./pointLine");
const lineLine = require("./lineLine");
const lineCircle = require("./lineCircle");

const collisionCheck = (current, neighbour) => {
  // console.log(345, current, neighbour);
};

module.exports = {
  dist,
  pointCircle,
  pointLine,
  lineLine,
  lineCircle,
  collisionCheck,
};
