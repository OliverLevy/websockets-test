const objToArray = require("../helpers/objToArray");

class Pend {
  constructor({
    id,
    x,
    y,
    port,
    length,
    center,
    angle,
    angleA,
    angleV,
    gravity,
  }) {
    this.id = id;
    this.port = port;
    this.x = x;
    this.y = y;
    this.length = length;
    this.center = center;
    this.angle = angle;
    this.angleV = angleV;
    this.angleA = angleA;
    this.gravity = gravity;
  }

  isRunning = false;
  timer = null;

  init() {
    clearInterval(this.timer);
    this.timer = null;
    this.isRunning = false;

    
    this.x = Math.sin(this.angle) * this.length + this.center.x;
    this.y = Math.cos(this.angle) * this.length + this.center.y;

    let force = (this.gravity * Math.sin(this.angle)) / this.length;

    this.angleA = -1 * force;
    this.angleV += this.angleA;
    this.angle += this.angleV;
  }

  start() {
    if (this.isRunning === false) {
      this.isRunning = true;
      this.timer = setInterval(() => {
        this.x = Math.sin(this.angle) * this.length + this.center.x;
        this.y = Math.cos(this.angle) * this.length + this.center.y;

        let force = (this.gravity * Math.sin(this.angle)) / this.length;

        this.angleA = -1 * force;
        this.angleV += this.angleA;
        this.angle += this.angleV;
      }, 200);
    }
  }

  stop() {
    if (this.isRunning === true) {
      clearInterval(this.timer);
      this.timer = null;
      this.isRunning = false;
    }
  }

  setKey(ogObj, key) {
    console.log(888, ogObj);
    this.stop();
    this[key] = ogObj[key];
  }

  reset(ogObj) {
    const keys = Object.keys(ogObj);
    keys.forEach((key) => {
      this[key] = ogObj[key];
    });
    this.stop();
    this.init()
  }
}

module.exports = Pend;
