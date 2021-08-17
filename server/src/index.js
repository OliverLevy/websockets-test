const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const ogObj = require("./ogObj.json");
const createPends = require("./pends/createPends");
const copyObj = require("./helpers/copyObj");

let obj = copyObj(ogObj);

createPends(obj);

app.get("/stop", (req, res) => {
  // console.log("pleaseeee stop!")
  io.emit("emergency-stop-pends", "There was a collision!");

  let i = 5;

  const timer = setInterval(() => {
    io.emit(
      "set-state-message",
      `restarting in ${i} ${i === 1 ? "second" : "seconds"}`
    );

    if (i === 3) {
      io.emit("set-state-message", `resetting pendulums...`);
    }

    if (i === 2) {
      obj = copyObj(ogObj);
      io.emit("reset-pend", obj);
      io.emit("init-pend", obj);
      io.emit("new-position", obj);
    }

    if (i <= 0) {
      clearInterval(timer);
      io.emit("set-state-message", `starting...`);
      io.emit("start-pend");
      io.emit("set-state-message", `running...`);
    }
    i--;
  }, 1000);

  res.send("STOP!");
});

io.on("connection", (socket) => {
  // should check if there's already instances of the Pend class.

  io.emit("init-pend", obj);
  io.emit("set-state-message", `pendulums initialized`);

  socket.on("reset", () => {
    obj = copyObj(ogObj);
    io.emit("reset-pend", obj);
    io.emit("init-pend", obj);
    io.emit("new-position", obj);
    io.emit("set-state-message", `pendulums have been reset`);
  });

  socket.on("start", () => {
    io.emit("start-pend");
    io.emit("set-state-message", `running...`);
  });

  socket.on("stop", () => {
    io.emit("stop-pend");
    io.emit("set-state-message", `stopped...`);
  });

  socket.on("set-position-input", (id, key, newValue) => {
    obj[id] = newValue;
    io.emit("set-pend", obj, key);
    io.emit("init-pend", obj);
  });

  socket.on("set-canvas-position", (id, newValue) => {
    obj[id] = newValue;

    io.emit("set-canvas-position-pend", id, obj);
  });

  socket.on("set-position", (id, x, y) => {
    obj[id].x = x;
    obj[id].y = y;
    io.emit("new-position", obj);
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
