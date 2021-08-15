const objToArray = require("../helpers/objToArray");
const axios = require("axios");
const { collisionCheck } = require("../collisionCheck");

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
    diameter,
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
    this.diameter = diameter;
  }

  neighbours = {};
  isRunning = false;
  timer = null;

  setNeighbours(neighbours) {
    this.neighbours = neighbours;
  }

  init() {
    this.stop();
    this.angleV = 0;
    this.angleA = 0;
    this.x = Math.sin(this.angle) * this.length + this.center.x;
    this.y = Math.cos(this.angle) * this.length + this.center.y;
  }

  calcAngles(obj) {
    this.length = Math.sqrt(
      Math.pow(obj.x - this.center.x, 2) + Math.pow(obj.y, 2)
    );
    this.angle = Math.atan((obj.x - this.center.x) / obj.y);
    this.angleA = 0;
    this.angleV = 0;
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
        this.checkForCollision("left");
        this.checkForCollision("right");
      }, 50);
    }
  }

  stop() {
    if (this.isRunning === true) {
      clearInterval(this.timer);
      this.timer = null;
      this.isRunning = false;
    }
  }

  checkForCollision(side) {
    if (this.neighbours[side]) {
      axios
        .get(`http://localhost:${this.neighbours[side]}/position`)
        .then((suc) => {
          // console.log(suc.data);

          if (collisionCheck(this, suc.data)) {

            axios.get("http://localhost:4000/stop")
            // console.log("STOP!");
            // this.stop();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  setKey(ogObj, key) {
    this.stop();
    this[key] = ogObj[key];
  }

  reset(ogObj) {
    const keys = Object.keys(ogObj);
    keys.forEach((key) => {
      this[key] = ogObj[key];
    });
    this.stop();
    this.init();
  }
}

module.exports = Pend;
