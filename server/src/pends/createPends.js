const objToArray = require("../helpers/objToArray");
const Pend = require("./Pend");
const findNeighbours = require("../helpers/findNeighbours");

const createPends = (pends) => {
  findNeighbours(objToArray(pends), objToArray(pends)[1]);

  const array = objToArray(pends);

  array.forEach((item) => {
    const app = require("express")();
    const http = require("http").Server(app);
    const io = require("socket.io-client");
    const socket = io("http://localhost:4000");
    const pend = new Pend(item);
    let timer = null;

    const neighbours = findNeighbours(array, item);
    pend.setNeighbours(neighbours);

    app.get("/position", (req, res) => {
      res.json({ x: pend.x, y: pend.y, center: pend.center, d: pend.diameter });
    });

    socket.on("init-pend", () => {
      pend.init();
      socket.emit("set-position", pend.id, pend.x, pend.y);
    });

    socket.on("start-pend", () => {
      pend.start();
      if (timer === null) {
        timer = setInterval(() => {
          socket.emit("set-position", pend.id, pend.x, pend.y);
        }, 50);
      }
    });

    socket.on("stop-pend", () => {
      pend.stop();
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
      socket.emit("set-position", pend.id, pend.x, pend.y);
    });

    socket.on("reset-pend", (obj) => {
      pend.reset(obj[pend.id]);
    });

    socket.on("set-pend", (obj, key) => {
      pend.setKey(obj[pend.id], key);
    });

    socket.on("set-canvas-position-pend", (id, obj) => {
      if (item.id == id) {
        pend.calcAngles(obj[id]);
      }
    });

    http.listen(item.port, () => {
      // console.log(`listening on port ${item.port}`);
    });
  });
};

module.exports = createPends;
