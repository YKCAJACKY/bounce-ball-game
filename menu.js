let easyButton, mediumButton, hardButton;

const THEME = {
  bg: 0,
  fg: 255,
  easy: [90, 255, 140],
  medium: [110, 180, 255],
  hard: [255, 90, 90]
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  setupButtons();
}

function draw() {
  background(THEME.bg);

  fill(THEME.fg);
  noStroke();
  textSize(min(width, height) * 0.065);
  text('Bounce Ball', width / 2, height * 0.22);

  textSize(min(width, height) * 0.028);
  text('Choose a difficulty', width / 2, height * 0.22 + 55);
  text('Each round lasts 30 seconds', width / 2, height * 0.22 + 90);
  text('Each hit reverses the colors', width / 2, height * 0.22 + 125);

  drawButton(easyButton, THEME.easy);
  drawButton(mediumButton, THEME.medium);
  drawButton(hardButton, THEME.hard);
}

function setupButtons() {
  const bw = min(280, width * 0.42);
  const bh = 58;
  const x = width / 2 - bw / 2;
  const startY = height / 2 - 90;
  const gap = 84;

  easyButton = { x, y: startY, w: bw, h: bh, label: 'Easy', page: 'easy.html' };
  mediumButton = { x, y: startY + gap, w: bw, h: bh, label: 'Medium', page: 'medium.html' };
  hardButton = { x, y: startY + gap * 2, w: bw, h: bh, label: 'Hard', page: 'hard.html' };
}

function drawButton(btn, accent) {
  const hover = overButton(btn);
  stroke(...accent);
  strokeWeight(2);
  fill(hover ? accent[0] * 0.15 + 20 : 0);
  rect(btn.x, btn.y, btn.w, btn.h, 12);

  noStroke();
  fill(hover ? 255 : accent[0] === 255 ? 255 : accent[0], hover ? 255 : accent[1], hover ? 255 : accent[2]);
  textSize(24);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function overButton(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mousePressed() {
  if (overButton(easyButton)) {
    window.location.href = easyButton.page;
  } else if (overButton(mediumButton)) {
    window.location.href = mediumButton.page;
  } else if (overButton(hardButton)) {
    window.location.href = hardButton.page;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupButtons();
}
