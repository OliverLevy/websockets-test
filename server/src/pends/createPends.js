const objToArray = require("../helpers/objToArray");
const Pend = require("./Pend");

const createPends = (pends) => {
  objToArray(pends).forEach((item) => {
    const app = require("express")();
    const http = require("http").Server(app);
    const io = require("socket.io-client");
    const socket = io("http://localhost:4000");
    const pend = new Pend(item);
    let timer = null;

    socket.on("start-pend", () => {
      pend.start();
      if (timer === null) {
        timer = setInterval(() => {
          socket.emit("set-position", pend.id, pend.position);
        }, 500);
      }
    });

    socket.on("stop-pend", () => {
      pend.stop();
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
      socket.emit("set-position", pend.id, pend.position);
    });

    socket.on("reset-pend", (obj) => {
      pend.reset(obj[pend.id]);
    });

    http.listen(item.port, () => {
      // console.log(`listening on port ${item.port}`);
    });
  });
};

module.exports = createPends;
