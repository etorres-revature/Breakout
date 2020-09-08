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
    visible: true
}

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
    bricks[i]=[];
    for (let j = 0; j <brickCols; j++) {
        const x = i * (brick.w +brick.padding) + brick.offsetX;
        const y = j * (brick.h +brick.padding) + brick.offsetY;
        bricks[i][j] = {x,y,...brick}
    }
}

//draw score on canvas
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? "#333" : "transparent";
            ctx.fill();
            ctx.closePath();
        })
    })
}

//draw everything
function draw() {
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

draw();

//rules and close event handlers
rulesBtn.addEventListener("click", () => rulesEl.classList.add("show"));
closeBtn.addEventListener("click", () => rulesEl.classList.remove("show"));
