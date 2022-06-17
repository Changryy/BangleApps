var data = require("Storage").readJSON("swatch.json");
function save() {require("Storage").writeJSON(data, "swatch.json");}

timeInterval = undefined;


function start() {
  data.isPaused = false;
  var timeSincePause = Date.now() - data.pauseTime;
  data.startTime = data.startTime + timeSincePause;
  save();
}

function pause() {
  data.isPaused = true;
  data.pauseTime = Date.now();
  save();
}

function reset() {
  data.startTime = data.pauseTime = Date.now();
  save();
}
function getTime() {return Date.now() - data.startTime;}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 10),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function drawTime() {
  g.reset();
  g.flip();
  g.setColor(0xFFFF);
  g.setFont("4x6",4).setFontAlign(0,0);
  g.drawString(msToTime(getTime()), 120, 100, true);
}

setWatch(() => {
  if (data.isPaused) {
    start();
    timeInterval = setInterval(drawTime, 20);
  }
  else {
    pause();
    clearInterval(timeInterval);
    timeInterval = undefined;
  }
}, BTN2, {repeat:true});

setWatch(() => {
  if (data.isPaused) {
    reset();
    drawTime();
  }
}, BTN3, {repeat:true});

g.clear();
g.reset();
drawTime();
if (!data.isPaused)
  Terminal.println();
  timeInterval = setInterval(drawTime, 20);
