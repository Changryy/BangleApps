var counterJSON = require("Storage").readJSON("counter.json");
var counter = counterJSON.current_count;

function save() {
    counterJSON.current_count = counter;
    require("Storage").writeJSON("counter.json", counterJSON);
}

function updateScreen() {
  g.clearRect(0, 50, 250, 150);
  g.setColor(0xFFFF);
  g.setFont("Vector",100).setFontAlign(0,0);
  g.drawString(Math.floor(counter), g.getWidth()/2, 120);
}


// add a count by using BTN1
setWatch(() => {
  counter += 1;
  save();
  updateScreen();
}, BTN1, {repeat:true});


// subtract a count by using BTN3

setWatch(() => {
  counter -= 1;
  save();
  updateScreen();
}, BTN3, {repeat:true});

// reset by using BTN2 for 1s
setWatch(() => {
  counter = 0;
  save();
  updateScreen();
}, BTN2, {repeat:true,debounce:1000});

g.clear(1).setFont("6x8");


flipInterval = setInterval(g.flip, 5000);

Bangle.loadWidgets();
Bangle.drawWidgets();
updateScreen();