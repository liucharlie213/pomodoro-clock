export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();
   
    this.el = {
      pomodoro: root.querySelector(".timer-btn-pomo"),
      short: root.querySelector(".timer-btn-short"),
      long: root.querySelector(".timer-btn-long"),
      minutes: root.querySelector(".timer-part-min"),
      seconds: root.querySelector(".timer-part-sec"),
      control: root.querySelector(".timer-btn-control"),
      refresh: root.querySelector(".timer-btn-refresh"),
      settings: root.querySelector(".timer-btn-settings")
    };

    this.interval = null;
    this.remainingSeconds = 1500;
    this.updateInterfaceTime();
    // this.updateControl();

    this.control = false; //button says start
    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start()
      }
      else {
        this.stop();
      }
      this.updateControl();
    })

    this.pomoOn = true;
    this.shortOn = false;
    this.longOn = false;
    this.el.pomodoro.addEventListener("click", () => {
      this.updatePomo();
      this.stop();
      this.control = true;
      this.updateControl();
    })
    this.el.short.addEventListener("click", () => {
      this.updateShort();
      this.stop();
      this.control = true;
      this.updateControl();
    })
    this.el.long.addEventListener("click", () => {
      this.updateLong();
      this.stop();
      this.control = true;
      this.updateControl();
    })

    this.el.refresh.addEventListener("click", () => {
      if (this.remainingSeconds === 1500 || this.remainingSeconds === 300 || this.remainingSeconds === 600){
        return;
      }
      else if (this.pomoOn === true) {
        this.remainingSeconds = 1500;
      }
      else if (this.shortOn === true) {
        this.remainingSeconds = 300;
      }
      else if (this.longOn === true) {
        this.remainingSeconds = 600;
      }
      this.stop();
      this.updateInterfaceTime();
      if (this.control === true) {
        this.updateControl();
      }
      // this.updateControl();
    })

    this.el.settings.addEventListener("click", () => {
      const inputMinutes = prompt("Enter a number of minutes (less than 60!)");
      if (Number.isInteger(parseInt(inputMinutes)) === false || inputMinutes > 60 || inputMinutes< 0) {
        alert("Please enter a valid number");
      }
      else {
        this.stop();
        this.remainingSeconds = inputMinutes*60;
        this.updateInterfaceTime();
      }
    })
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds/60);
    const seconds = this.remainingSeconds % 60;
    this.el.minutes.innerHTML = minutes.toString().padStart(2, "0");
    this.el.seconds.innerHTML = seconds.toString().padStart(2, "0");
  }

  start() {
    if (this.remainingSeconds === 0) {
      return;
    }
    else {
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
        if (this.remainingSeconds === 0) {
          this.stop();
        }
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  updateControl() {
    if (this.control === false) {
      this.el.control.innerHTML = `<span>pause</span>`
      this.el.control.classList.add("timer-btn-pause");
      this.el.control.classList.remove("timer-btn-start");
      this.control = true;
    }
    else {
      this.el.control.innerHTML = `<span>start</span>`
      this.el.control.classList.add("timer-btn-start");
      this.el.control.classList.remove("timer-btn-pause");
      this.control = false;
    }
  }
  
  updatePomo() {
    if (this.pomoOn === true) {
      return;
    }
    else {
      this.remainingSeconds = 1500;
      this.updateInterfaceTime();
      this.turnPomoOn();
      this.turnShortOff();
      this.turnLongOff();
    }
  }
  updateShort() {
    if (this.shortOn === false) {
      this.remainingSeconds = 300;
      this.updateInterfaceTime();
      this.turnShortOn();
      this.turnPomoOff();
      this.turnLongOff();
    }
    else {
      return;
    }
  }
  updateLong() {
    if (this.longOn === false) {
      this.remainingSeconds = 600;
      this.updateInterfaceTime();
      this.turnLongOn();
      this.turnPomoOff();
      this.turnShortOff();
    }
    else {
      return;
    }
  }

  turnPomoOn() {
    this.el.pomodoro.classList.add("pomo-on");
    this.el.pomodoro.classList.remove("pomo-off");
    this.pomoOn = true;
  }
  turnShortOn() {
    this.el.short.classList.add("short-on");
    this.el.short.classList.remove("short-off");
    this.shortOn = true;
  }
  turnLongOn() {
    this.el.long.classList.add("long-on");
    this.el.long.classList.remove("long-off");
    this.longOn = true;
  }

  turnPomoOff() {
    this.el.pomodoro.classList.add("pomo-off");
    this.el.pomodoro.classList.remove("pomo-on");
    this.pomoOn = false;   
  }
  turnShortOff() {
    this.el.short.classList.add("short-off");
    this.el.short.classList.remove("short-on");
    this.shortOn = false;
  }
  turnLongOff() {
    this.el.long.classList.add("long-off");
    this.el.long.classList.remove("long-on");
    this.longOn = false;
  }

  static getHTML() {
    return `
    <div class="top">
    <button type="button" class="timer-btn timer-btn-pomo pomo-on">pomodoro</button>
    <button type="button" class="timer-btn timer-btn-short short-off">short break</button>
    <button type="button" class="timer-btn timer-btn-long long-off">long break</button>
    </div>

    <div class="clock">
      <span class="timer-part timer-part-min">00</span>
      <span class="timer-part timer-part-middle">:</span>
      <span class="timer-part timer-part-sec">00</span>
    </div>
    <div class="bottom">
      <button type="button" class="timer-btn timer-btn-control timer-btn-start">start</button>
      <button type="button" class="timer-btn timer-btn-refresh">
        <img class="refresh" class="reset" src="icons/refresh.png">
      </button>
      <button type="button" class="timer-btn timer-btn-settings">
        <img class="settings" class="default" src="icons/clock.png">
      </button>
    </div> `
  }
}

