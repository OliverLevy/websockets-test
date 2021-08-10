class Pend {
  constructor({ id, position, port }) {
    // console.log(props.position);
    this.position = position;
    this.id = id;
    this.port = port;
  }

  isRunning = false;
  timer = null;

  start() {
    if (this.isRunning === false) {
      this.isRunning = true;
      this.timer = setInterval(() => {
        this.position.x += 10 * Math.random();
        this.position.y += 10 * Math.random();
      }, 200);
    }
    // return this.position
  }

  stop() {
    if (this.isRunning === true) {
      clearInterval(this.timer);
      this.timer = null;
      this.isRunning = false;
    }
  }

  reset(ogObj) {
    this.stop();
    this.position = ogObj.position;
  }
}

module.exports = Pend;
