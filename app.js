//canvas API
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

const rulesBtn = document.querySelector("#rules-btn");
const closeBtn = document.querySelector("#close-btn");
const rulesEl = document.querySelector("#rules");
const canvasEl = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRows = 9;
const brickCols = 5;

//create ball properties
const ball = {
  x: canvasEl.width / 2,
  y: canvasEl.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

//create paddle properties
const paddle = {
  x: canvasEl.width / 2 - 40,
  y: canvasEl.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

//create brick properties
const brick = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

//draw ball onto canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

//draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

//create bricks
const bricks = [];
for (let i = 0; i < brickRows; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickCols; j++) {
    const x = i * (brick.w + brick.padding) + brick.offsetX;
    const y = j * (brick.h + brick.padding) + brick.offsetY;
    bricks[i][j] = { x, y, ...brick };
  }
}

//draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#333" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

//draw everything
function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

//move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  //wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

//move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //wall collision (x/right or left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  //wall collision(y/top or bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && //left brick side check
          ball.x + ball.size < brick.x + brick.w && //right brick side check
          ball.y + ball.size > brick.y && //top brick side check
          ball.y - ball.size < brick.y + brick.h //bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  //hit bottom wall - lose
  if(ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
  }
}

//function to increase the score
function increaseScore() {
  score++;

  if (score % (brickRows * brickRows) === 0) {
    showAllBricks();
  }
}

//make all bricks appea
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

//update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();
  //draw everything
  draw();

  requestAnimationFrame(update);
}

update();

//keydown event function
function keyDown(e) {
  //   console.log(1);
  //console.log(e.key);
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}
//keyup event function
function keyUp(e) {
  //   console.log(2);
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

//keyboard event handlers to move paddle
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//rules and close event handlers
rulesBtn.addEventListener("click", () => rulesEl.classList.add("show"));
closeBtn.addEventListener("click", () => rulesEl.classList.remove("show"));
