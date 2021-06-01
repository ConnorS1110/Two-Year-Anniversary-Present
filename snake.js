const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//How many columns. There will be 0.8 times as many rows
const COLUMNS = 25;

//How many ms for each move tick
const SPEED = 400;

const box = cvs.width / COLUMNS;

let snake = [];
snake[0] = {
    x: (~~(COLUMNS / 2) - 1) * box,
    y: (~~(COLUMNS / 2) - 2) * box
}

let food = {
    x: Math.floor(Math.random() * COLUMNS) * box,
    y: Math.floor(Math.random() * (COLUMNS * 0.8)) * box
}

let score = 0;
let scoreNeeded = 0;

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT"
    }
    else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP"
    }
    else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT"
    }
    else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN"
    }
}

function draw() {
    for (let i = 0; i < COLUMNS; i++){
        for (let j = 0; j < (COLUMNS * 0.8); j++){
            if (i % 2 == j % 2) {
                ctx.fillStyle = "purple";
                ctx.fillRect(box * i , box * j, box, box);
            }
            else {
                ctx.fillStyle = "pink";
                ctx.fillRect(box * i, box * j, box, box);
            }
        }
    }

    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        if (score % 10 == 0 && SPEED >= 50) {
            SPEED -= 25;
        }
        else {
            scoreNeeded = score % 10;
        }
        food = {
            x: Math.floor(Math.random() * COLUMNS) * box,
            y: Math.floor(Math.random() * (COLUMNS * 0.8)) * box
        }
    }
    else {
        snake.pop();
    }

    if (d == "LEFT") {
        snakeX -= box;
    }
    if (d == "UP") {
        snakeY -= box;
    }
    if (d == "RIGHT") {
        snakeX += box;
    }
    if (d == "DOWN") {
        snakeY += box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, SPEED);