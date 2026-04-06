const GAME_CONFIG = {
  level: 'easy',
  ballDiameter: 120,
  baseSpeed: 3,
  minBallDiameter: 24,
  shrinkPerHit: 4,
  explosionGrowSpeed: 8,
  explosionScale: 2.8,
  accent: [90, 255, 140]
};

let ballx, bally;
let vx, vy;
let ballDiameter = GAME_CONFIG.ballDiameter;
let score = 0;
let gameState = 'play';
let roundTime = 30;
let startTime = 0;
let timeLeft = 30;
let explosionSize = 0;
let explosionMax = 0;
let colorInverted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  localStorage.setItem('level', GAME_CONFIG.level);
  respawnBall();
  startTime = millis();
}

function draw() {
  const bgValue = colorInverted ? 255 : 0;
  background(bgValue);

  if (gameState === 'play') runGame();
  else if (gameState === 'explode') runExplosionState();
}

function runGame() {
  updateTimer();
  if (timeLeft <= 0) return endRound();
  updateBall();
  drawBall();
  drawHUD();
}

function runExplosionState() {
  updateTimer();
  if (timeLeft <= 0) return endRound();
  drawExplosion();
  drawHUD();
}

function updateTimer() {
  timeLeft = max(0, roundTime - floor((millis() - startTime) / 1000));
}

function updateBall() {
  ballx += vx;
  bally += vy;

  let r = ballDiameter / 2;

  if (ballx <= r || ballx >= width - r) {
    vx *= -1;
    ballx = constrain(ballx, r, width - r);
  }

  if (bally <= r || bally >= height - r) {
    vy *= -1;
    bally = constrain(bally, r, height - r);
  }
}

function drawBall() {
  noStroke();
  if (colorInverted) fill(...GAME_CONFIG.accent);
  else fill(255);
  circle(ballx, bally, ballDiameter);
}

function drawExplosion() {
  noStroke();
  const light = colorInverted ? 0 : 255;
  const dark = colorInverted ? 255 : 0;
  const accent = GAME_CONFIG.accent;

  if (colorInverted) {
    fill(accent[0], accent[1], accent[2], 40);
    circle(ballx, bally, explosionSize * 1.6);
    fill(dark, 80);
    circle(ballx, bally, explosionSize * 1.1);
    fill(light, 200);
    circle(ballx, bally, explosionSize * 0.45);
  } else {
    fill(accent[0], accent[1], accent[2], 40);
    circle(ballx, bally, explosionSize * 1.6);
    fill(accent[0], accent[1], accent[2], 110);
    circle(ballx, bally, explosionSize * 1.15);
    fill(255, 180);
    circle(ballx, bally, explosionSize * 0.8);
    fill(255);
    circle(ballx, bally, explosionSize * 0.35);
  }

  for (let i = 0; i < 10; i++) {
    let angle = TWO_PI / 10 * i;
    let sparkX = ballx + cos(angle) * explosionSize * 0.72;
    let sparkY = bally + sin(angle) * explosionSize * 0.72;
    fill(...accent, 180);
    circle(sparkX, sparkY, 5);
  }

  explosionSize += GAME_CONFIG.explosionGrowSpeed;

  if (explosionSize >= explosionMax) {
    score++;
    ballDiameter = max(GAME_CONFIG.minBallDiameter, ballDiameter - GAME_CONFIG.shrinkPerHit);
    respawnBall();
    gameState = 'play';
  }
}

function mousePressed() {
  if (gameState !== 'play') return;

  let d = dist(mouseX, mouseY, ballx, bally);
  if (d <= ballDiameter / 2) {
    colorInverted = !colorInverted;
    startExplosion();
  }
}

function startExplosion() {
  gameState = 'explode';
  explosionSize = ballDiameter * 0.2;
  explosionMax = ballDiameter * GAME_CONFIG.explosionScale;
}

function respawnBall() {
  let r = ballDiameter / 2;
  ballx = random(r, width - r);
  bally = random(r, height - r);

  let speed = GAME_CONFIG.baseSpeed + score * 0.4;
  let angle = random(TWO_PI);
  vx = cos(angle) * speed;
  vy = sin(angle) * speed;
}

function drawHUD() {
  const fg = colorInverted ? 0 : 255;
  fill(fg);
  textSize(18);
  text('Hits: ' + score, 20, 20);
  text('Time: ' + timeLeft, 20, 45);
  text('Level: Easy', 20, 70);
  text('Speed: ' + nf(sqrt(vx * vx + vy * vy), 1, 2), 20, 95);
  text('Ball Size: ' + int(ballDiameter), 20, 120);
}

function endRound() {
  localStorage.setItem('finalScore', score);
  localStorage.setItem('level', GAME_CONFIG.level);
  window.location.href = 'result.html';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
