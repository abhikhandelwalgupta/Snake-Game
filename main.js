const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector('.score');
const highElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');

let gameOver = false;
let foodY, foodX;
let snakeBody = [];
let snakeX = Math.floor(Math.random() * 30) + 1,
  snakeY = Math.floor(Math.random() * 30) + 1;
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score  = 0 ; 
let hightScore = localStorage.getItem("high-score") || 0;
highElement.innerHTML = `high Score : ${hightScore}`

const changeFoodPostition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = ()=> {
    alert("Game Over!!")
    clearInterval(setIntervalId)
    location.reload();
}
const changeDirection = (e) => {
  if (e.key === "ArrowUp" ) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown"  ) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" ) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" ) {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
};

controls.forEach(key=> {
    key.addEventListener("click" , ()=> changeDirection({key: key.dataset.key}))
});
const initGame = () => {
  if (gameOver) return handleGameOver();
  
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPostition();
    snakeBody.push([foodX, foodY]);
    score++;
    hightScore = score >= hightScore ? score : hightScore;
    localStorage.setItem("high-score" , hightScore)
    scoreElement.innerHTML = `score : ${score}`;
    // highElement.innerHTML = `high Score : ${hightScore}`

  }

  let htmlMarkup = `<div class="food" style="grid-area:${foodY} /${foodX}"></div>`;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]} /${snakeBody[i][0]}"></div>`;
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true;
        console.log("Game Over ");
    }
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPostition();
setIntervalId = setInterval(initGame(), 125);
initGame();

document.addEventListener("keydown", changeDirection);
