const createPend = (pends) => {
  const array = Object.keys(pends).map((key) => pends[key]);

  array.forEach((item) => {
    const app = require("express")();
    const http = require("http").Server(app);
    const io = require("socket.io")(http, { cors: { origin: "*" } });
    console.log(item);

    let count = 0;

    app.get("/", (req, res) => {
      res.send(`hello from port ${item.port}`);
    });

    io.on("connection", (socket) => {
      socket.on("start", (message) => {
        setInterval(() => {
          item.position.x += 1
          io.emit('position', item)
          // console.log(count);
        }, 1000);
      });

      console.log(`connected to pend ${item.id}`);
    });

    http.listen(item.port, () => {
      console.log(`listening on port ${item.port}`);
    });
  });
};

module.exports = createPend;
