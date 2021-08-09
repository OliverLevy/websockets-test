const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const ogObj = require("./ogObj.json");
const createPend = require("./pends/createPend");

let obj = JSON.parse(JSON.stringify(ogObj)).reduce((pends, pend) => {
  if (!pends[pend.id]) {
    pends[pend.id] = pend;
  }
  return pends;
}, {});

createPend(obj);

app.get("/", (req, res) => {
  res.send("hi");
});

io.on("connection", (socket) => {
  socket.emit("init", obj);

  socket.on("reset", () => {
    obj = JSON.parse(JSON.stringify(ogObj)).reduce((pends, pend) => {
      if (!pends[pend.id]) {
        pends[pend.id] = pend;
      }
      return pends;
    }, {});
    io.emit("new-position", obj);
  });

  socket.on("set-position", (id, newPos) => {
    obj[id].position = newPos;
    console.log("setting position");
    io.emit("new-position", obj);
  });

  socket.on("start", () => {
    const array = Object.keys(obj).map((key) => obj[key]);
    array.forEach((item) => {
      const ioClient = require("socket.io-client");
      const socket = ioClient(`http://localhost:${item.port}`);

      socket.emit("start", "this is pend");

      socket.on("position", (count) => {
        console.log("this is the count from index.js", count);
      });
    });
  });

  console.log("a user connected");
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
