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

  io.emit("init-pend", obj);
  
  // io.emit("new-position", obj);
  
  socket.on("reset", () => {
    obj = copyObj(ogObj);
    io.emit("reset-pend", obj);
    io.emit("init-pend", obj);
    io.emit("new-position", obj);
  });

  socket.on("start", () => {
    io.emit("start-pend");
  });

  socket.on("stop", () => {
    io.emit("stop-pend");
  });

  socket.on("set-position-input", (id, key, newValue) => {
    // obj = copyObj(ogObj);
    obj[id] = newValue;
    console.log(obj[id]);
    io.emit("set-pend", obj, key);
    io.emit("new-position", obj);
  });

  socket.on("set-position", (id, x, y) => {
    obj[id].x = x;
    obj[id].y = y;
    // io.emit("reset-pend", obj);
    io.emit("new-position", obj);
  });

  // console.log("a user connected");
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
