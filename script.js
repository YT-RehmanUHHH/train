// Setup canvas
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 400;
cnv.height = 400;

// Animation variables
let trainX = -100; // Initial position of the train
let trainSpeed = 1; // Speed of the train movement
let cloud1X = 50;
let cloud1Y = 40;
let cloud2X = 150;
let cloud2Y = 10;
let cloud3X = 250; // Position of the third cloud
let cloud3Y = 80; 
let sunY = 50;
let skyR = 173;
let skyG = 216;
let skyB = 230;
let sunX = 75; // 
let sunRadius = 20; 
let smokeY = 160; // Initial position of smoke
let smokeS = 0.5; // Speed of smoke movement
let smokeX = 1; 
let smokeColor = "rgba(100, 100, 100, 1)"; 

// Track frames gone by
let frame = 0;

// Triggers the start of the animation
requestAnimationFrame(draw);

// Put ALL drawing code in the draw function
function draw() {
  
  // Sky
  ctx.fillStyle = `rgb(${skyR}, ${skyG}, ${skyB})`;
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // time
  frame++;

  // Sun
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Clouds
  let cloud = document.getElementById("cloud");
  ctx.drawImage(cloud, cloud1X, cloud1Y, 75, 50);
  ctx.drawImage(cloud, cloud2X, cloud2Y, 75, 50);
  ctx.drawImage(cloud, cloud3X, cloud3Y, 75, 50); 
  // Ground

  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 250, cnv.width, cnv.height - 250);

  // Train
  // Train body
  ctx.fillStyle = "gray";
  ctx.fillRect(trainX, 200, 200, 100);

  // Train windows
  ctx.fillStyle = "lightblue";
  ctx.fillRect(trainX + 10, 220, 40, 60);
  ctx.fillRect(trainX + 60, 220, 40, 60);
  ctx.fillRect(trainX + 110, 220, 40, 60);
  ctx.fillRect(trainX + 160, 220, 30, 60);

  // Train wheels
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(trainX + 30, 300, 15, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(trainX + 80, 300, 15, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(trainX + 130, 300, 15, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(trainX + 190, 300, 15, 0, 2 * Math.PI);
  ctx.fill();

  // Smokestack
  ctx.fillStyle = "darkgray";
  ctx.fillRect(trainX + 180, 160, 20, 40);

  // Draw smoke
  drawSmoke();

  ctx.font = "20px Georgia";
  ctx.fillText("Frame: " + frame, 20, 20);

  // ANIMATION
  trainX += trainSpeed; // Move the train horizontally

  // If train goes off the canvas, reset its position
  if (trainX > cnv.width) {
    trainX = -200;
  }

  // Cloud movement
  cloud1X += 0.5;
  cloud2X += 1;
  cloud3X -= 0.7; 

 

  // When clouds exit the canvas, reset their position
  if (cloud1X > cnv.width) {
    cloud1X = -75;
    cloud1Y = Math.random() * 150;

  }
  if (cloud2X > cnv.width + 75) {
    cloud2X = -75;
    cloud2Y = Math.random() * 150;
  }
  if (cloud3X > cnv.width + 75) {
    cloud3X = -75;
    cloud3Y = Math.random() * 150;
  }

  // Sun sets and changes sky color
  if (sunY <= 250 && frame >= 200) {
    sunY++;
    sunRadius -= 0.1; // Gradually decrease sun's size
    // Gradually darken the sky
    if (skyR < 255) {
      skyR++;
    }
    if (skyG > 165) {
      skyG--;
    }
    if (skyB > 0) {
      skyB--;
    }
  }

  requestAnimationFrame(draw);
}

// Function to draw smoke
function drawSmoke() {
  ctx.fillStyle = smokeColor;
  ctx.beginPath();
  ctx.arc(trainX + 190, smokeY, 10, 0, Math.PI * 2);
  ctx.fill();

  //  smoke position 
  smokeY -= smokeS;
  smokeX -= 0.01;
  if (smokeY < 120) {
    smokeY = 160;
    smokeX = 1;
  }
}

// Keyboard handler
document.addEventListener("keypress", keyboardHandler);

function keyboardHandler(event) {
  if (event.code == "KeyS") {
    // Change smoke color when "s" key is pressed
    smokeColor = "rgba(255, 0, 0, 1)"; // Change to red
  }
}