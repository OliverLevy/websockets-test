const dist = (x1, y1, x2, y2) => {
  // distance between two points
  const a = x2 - x1;
  const b = y2 - y1;

  return Math.sqrt(a * a + b * b);
};

module.exports = dist