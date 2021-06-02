const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
let scoreElement = document.getElementById("score-number");
let upgradeElement = document.getElementById("score-upgrade");

//How many columns. There will be 0.8 times as many rows
const COLUMNS = 25;

//How many initial ms for each move tick
let SPEED = 200;

//Score needed for speedup
const UPGRADE = 10;

//Chance for a power-up to spawn
const POWER_CHANCE = 1.0;

// The size of each square in the grid based off the number of columns
const box = cvs.width / COLUMNS;

// Initializes snake position
let snake = [];
snake[0] = {
    x: (~~(COLUMNS / 2) - 1) * box,
    y: (~~(COLUMNS / 2) - 2) * box
}

// Initializes taco location
let foodX, foodY = 0;
let foodIntersection = true;
let foodIntersectCount = 0;
while (foodIntersection == true) {
    foodX = Math.floor(Math.random() * COLUMNS) * box;
    foodY = Math.floor(Math.random() * (COLUMNS * 0.8)) * box;
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == foodX && snake[i].y == foodY) {
                foodIntersectCount++;
            }
    }
    if (foodIntersectCount == 0) {
        foodIntersection = false;
    }
}
let food = {
    x: foodX,
    y: foodY
}

// Initializes half-speed power-up variables
let halfSpeedActive = false;
let halfSpeed = {
    x: 0,
    y: 0
}

// Initializes the score and score until speed increase variables
let score = 0;
let scoreNeeded = UPGRADE;

// Initializes variable to keep track of direction
let d;

document.addEventListener("keydown", direction);

// Determines which direction the player presses
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

// Function for drawing all parts of the game and UI
function draw() {
    // Draws the board
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

    // Draws the snake
    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draws initial taco
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Head of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Logic for eating a taco
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        /* If score is a multiple of speed upgrade interval, the time is sped
        up by 20ms and the interval of the game is reset */
        if (score % UPGRADE == 0 && SPEED >= 50) {
            SPEED -= 20;
            clearInterval(game);
            game = setInterval(draw, SPEED);
            scoreNeeded = UPGRADE;
        }
        else {
            scoreNeeded = UPGRADE - (score % UPGRADE);
        }

        // Determines new location of taco
        foodX, foodY = 0;
        foodIntersection = true;
        foodIntersectCount = 0;
        while (foodIntersection == true) {
            foodX = Math.floor(Math.random() * COLUMNS) * box;
            foodY = Math.floor(Math.random() * (COLUMNS * 0.8)) * box;
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x == foodX && snake[i].y == foodY) {
                        foodIntersectCount++;
                    }
            }
            if (foodIntersectCount == 0) {
                foodIntersection = false;
            }
        }
        food = {
            x: foodX,
            y: foodY
        }

        // Determines which (if any) power-up will spawn
        let powerChoice = Math.random();
        switch (powerChoice <= POWER_CHANCE) {
            // Case for half-speed power-up
            case (powerChoice <= (POWER_CHANCE / 4) && halfSpeedActive == false):
                let halfSpeedX, halfSpeedY = 0;
                let intersection = true;
                let intersectCount = 0;
                while (intersection == true) {
                    halfSpeedX = Math.floor(Math.random() * COLUMNS) * box;
                    halfSpeedY = Math.floor(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++){
                        if ((snake[i].x == halfSpeedX && snake[i].y == halfSpeedY) ||
                            (food.x == halfSpeedX && food.y == halfSpeedY)) {
                            intersectCount++;
                        }
                    }
                    if (intersectCount == 0) {
                        intersection = false;
                    }
                }
                halfSpeed = {
                    x: halfSpeedX,
                    y: halfSpeedY
                }
                halfSpeedActive = true;
                break;
            case (powerChoice <= ((POWER_CHANCE / 4) * 2)):
                break;
            case (powerChoice <= ((POWER_CHANCE / 4) * 3)):
                break;
            default:
                
        }
    }
    else {
        snake.pop(); // Removes tail if not eating a taco
    }

    /* Logic for colliding with half-speed power-up
    Doubles speed and keeps track of speed at time power-up is acquired
    to prevent unfair change in speed after 15 second time runs out
    in case player earns enough points for a speed boost
    */
    if (snakeX == halfSpeed.x && snakeY == halfSpeed.y) {
        halfSpeedActive = false;
        let speedDifference = SPEED;
        SPEED *= 2;
        clearInterval(game);
        game = setInterval(draw, SPEED);
        setTimeout(function () {
            SPEED -= speedDifference;
            clearInterval(game);
            game = setInterval(draw, SPEED);
        }, 15000);
    }

    // If half-speed power-up is in play, it will be drawn in a static position
    if (halfSpeedActive == true) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(halfSpeed.x, halfSpeed.y, box, box);
    }

    // Updates score and "score until speedup" UI
    scoreElement.innerHTML = score;
    upgradeElement.innerHTML = scoreNeeded + " tacos until speedup";

    // Determines how to move snake depending on the direction it is moving
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

    // Game over conditions
    if (snakeX < 0 || snakeX > box * (COLUMNS - 1) || snakeY < 0 ||
        snakeY > ~~(box * (COLUMNS - 1) * 0.8) || collision(newHead, snake)) {
        clearInterval(game);
    }

    // Checks for a collision
    function collision(head, array) {
        for (let i = 0; i < array.length; i++){
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    // Moves snake forward
    snake.unshift(newHead);
}

// Starts game
let game = setInterval(draw, SPEED);