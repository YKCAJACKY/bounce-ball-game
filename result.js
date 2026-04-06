let againButton, menuButton;
let finalScore = 0;
let level = 'easy';

const LEVEL_COLORS = {
  easy: [90, 255, 140],
  medium: [110, 180, 255],
  hard: [255, 90, 90]
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);

  finalScore = Number(localStorage.getItem('finalScore')) || 0;
  level = localStorage.getItem('level') || 'easy';

  setupButtons();
}

function draw() {
  background(0);

  const accent = LEVEL_COLORS[level] || LEVEL_COLORS.easy;

  fill(255);
  noStroke();
  textSize(min(width, height) * 0.07);
  text("Time's Up", width / 2, height * 0.22);

  fill(...accent);
  textSize(min(width, height) * 0.04);
  text('Score: ' + finalScore, width / 2, height * 0.22 + 75);
  text('Level: ' + capitalize(level), width / 2, height * 0.22 + 125);

  drawButton(againButton, accent);
  drawButton(menuButton, [255, 255, 255]);
}

function setupButtons() {
  const bw = min(280, width * 0.42);
  const bh = 58;
  const x = width / 2 - bw / 2;
  const y = height / 2;

  againButton = { x, y, w: bw, h: bh, label: 'Play Again' };
  menuButton = { x, y: y + 84, w: bw, h: bh, label: 'Back to Menu' };
}

function drawButton(btn, accent) {
  const hover = overButton(btn);
  stroke(...accent);
  strokeWeight(2);
  fill(hover ? 255 : 0);
  rect(btn.x, btn.y, btn.w, btn.h, 12);

  noStroke();
  fill(hover ? 0 : accent[0], hover ? 0 : accent[1], hover ? 0 : accent[2]);
  textSize(22);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function overButton(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mousePressed() {
  if (overButton(againButton)) {
    if (level === 'easy') window.location.href = 'easy.html';
    else if (level === 'medium') window.location.href = 'medium.html';
    else window.location.href = 'hard.html';
  } else if (overButton(menuButton)) {
    window.location.href = 'index.html';
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupButtons();
}
