/*Timer para el juego */
class Stopwatch {
  constructor() {
    this.ms = 0;
    this.sec = 0;
    this.min = 0;
    this.count = null;
  }

  start() {
    this.ms = 0;
    this.sec = 0;
    this.min = 0;

    this.count = setInterval(() => {
      if (this.ms === 100) {
        this.ms = 0;

        if (this.sec === 60) {
          this.sec = 0;
          this.min++;
        } else {
          this.sec++;
        }
      } else {
        this.ms++;
      }

      const malt = this.pad(this.min);
      const salt = this.pad(this.sec);
      const msalt = this.pad(this.ms);

      this.update(`${malt}:${salt}:${msalt}`);
    }, 10);
  }

  stop() {
    clearInterval(this.count);
  }

  update(txt) {
    const temp = document.getElementById("timer");
    temp.firstChild.nodeValue = txt;
  }

  resume() {
    this.count = setInterval(() => {
      if (this.ms === 100) {
        this.ms = 0;
        if (this.sec === 60) {
          this.sec = 0;
          this.min++;
        } else {
          this.sec++;
        }
      } else {
        this.ms++;
      }

      const malt = this.pad(this.min);
      const salt = this.pad(this.sec);
      const msalt = this.pad(this.ms);

      this.update(`${malt}:${salt}:${msalt}`);
    }, 10);
  }

  pad(time) {
    return time < 10 ? "0" + time : time;
  }
}

export default Stopwatch;
