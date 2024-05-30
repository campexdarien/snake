const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const maxScoreElement = document.querySelector(".max-score");

let gameOver = false;
let foodX;
let foodY;
let snakeX;
let snakeY;
let snakeBody;
let velocityX;
let velocityY;
let gameInterval;
let score;
const maxScore = 100;

const handleGameOver = () => {
    alert("Game Over. Presiona Ok para volver a jugar.");
    clearInterval(gameInterval); // Detener el juego
    resetGame(); // Reiniciar el juego
}

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
  
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY === 0) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY === 0) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX === 0) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX === 0) {
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    if (gameOver) return handleGameOver();

    // Update the snake's head position
    snakeX += velocityX;
    snakeY += velocityY;

    // Check if the snake hits the boundaries
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
        return handleGameOver();
    }

    // Check if the snake hits itself
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] === snakeX && snakeBody[i][1] === snakeY) {
            gameOver = true;
            return handleGameOver();
        }
    }

    // Check if the snake eats the food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([snakeX, snakeY]);
        score += 1;
        if (score >= maxScore) {
            alert(`¡Felicidades! Alcanzaste la puntuación máxima de ${maxScore}.`);
            gameOver = true;
            return handleGameOver();
        }
    }

    // Move the snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Render the game board
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

    playBoard.innerHTML = htmlMarkup;

    // Update the score display
    scoreElement.innerText = `Puntuación: ${score}`;
    maxScoreElement.innerText = `Puntuación Máxima: ${maxScore}`;
}

const resetGame = () => {
    // Reset all game variables
    gameOver = false;
    snakeX = 5;
    snakeY = 20;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    changeFoodPosition();
    // Restart the game loop
    gameInterval = setInterval(initGame, 125);
}

// Initial setup
resetGame();
document.addEventListener("keydown", changeDirection);