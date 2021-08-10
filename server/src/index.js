const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const ogObj = require("./ogObj.json");
const createPends = require("./pends/createPends");
const copyObj = require("./helpers/copyObj");

let obj = copyObj(ogObj);

createPends(obj);

// app.get("/", (req, res) => {
//   res.send("hi");
// });

io.on("connection", (socket) => {
  // should check if there's already instances of the Pend class.
  socket.emit("init", obj);

  socket.on("reset", () => {
    obj = copyObj(ogObj);
    io.emit("reset-pend", obj);
    io.emit("new-position", obj);
  });

  socket.on("start", () => {
    io.emit("start-pend");
  });

  socket.on("stop", () => {
    io.emit("stop-pend");
  });

  socket.on("set-position-test", (id, newPos) => {
    // obj = copyObj(ogObj);
    obj[id].position = newPos;
    io.emit("reset-pend", obj);
    io.emit("new-position", obj);
  });

  socket.on("set-position", (id, newPos) => {
    obj[id].position = newPos;
    // io.emit("reset-pend", obj);

    // console.log("setting position");
    io.emit("new-position", obj);
  });

  // console.log("a user connected");
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
