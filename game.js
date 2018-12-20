var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "bg.png";

var tomteReady = false;
var tomteImage = new Image();
tomteImage.onload = function () {
  tomteReady = true;
};
tomteImage.src = "tomte.png";

var paketReady = false;
var paketImage = new Image();
paketImage.onload = function () {
  paketReady = true;
};
paketImage.src = "paket.png";

var tomte = {
  speed: 256
};
var paket = {};
var paketsCaught = 0;
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

var reset = function () {
  tomte.x = 230;
  tomte.y = 200;

  // Placerar paketet random på banan
  paket.x = 32 + (Math.random() * (canvas.width - 64));
  paket.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
  if (38 in keysDown) {
    if (tomte.y > 0) {
    tomte.y -= tomte.speed * modifier;
}
  }
  if (40 in keysDown) { 
    if (tomte.y < 410) {
    tomte.y += tomte.speed * modifier;
}
  }
  if (37 in keysDown) {
    if (tomte.x > 0){
    tomte.x -= tomte.speed * modifier;
}
  }
  if (39 in keysDown) {
    if (tomte.x < 490){
    tomte.x += tomte.speed * modifier;
}
  }


  if (
    tomte.x <= (paket.x + 25)
    && paket.x <= (tomte.x + 50)
    && tomte.y <= (paket.y + 25)
    && paket.y <= (tomte.y + 50)
  ) {
    ++paketsCaught;
    reset();
  }
};

// Ritar allt
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (tomteReady) {
    ctx.drawImage(tomteImage, tomte.x, tomte.y);
  }

  if (paketReady) {
    ctx.drawImage(paketImage, paket.x, paket.y);
  }

  // Poäng
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Paket Hämtade: " + paketsCaught, 32, 32);
  if (paketsCaught > 10){
    bgImage.src = "bg2.png";
  }
  if (paketsCaught > 20){
    bgImage.src = "bg3.png";
  }
  if (paketsCaught > 50){
    bgImage.src = "bg4.png";
  }
  if (paketsCaught > 100){
    bgImage.src = "bg5.png";
  }
  if (paketsCaught > 200){
    bgImage.src = "bg6.png";
  }
  if (paketsCaught > 300){
    bgImage.src = "bg7.png";
    tomteImage.src = "tomte2.png";
  }
};

var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;
  requestAnimationFrame(main);
};

var then = Date.now();
reset();
main();