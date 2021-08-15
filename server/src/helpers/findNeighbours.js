const findNeighbours = (array, target) => {
  array.sort((a, b) => {
    return a.center.x - b.center.x;
  });

  const output = array.reduce((neighbours, current, index, array) => {
    if (current.id === target.id) {
      neighbours.left = array[index - 1]?.port;
      neighbours.right = array[index + 1]?.port;
    }
    return neighbours;
  }, {});

  return output;
};

module.exports = findNeighbours;
