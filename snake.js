const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const boardCVS = document.getElementById("board");
const boardCTX = boardCVS.getContext("2d");
let scoreElement = document.getElementById("score-number");
let upgradeElement = document.getElementById("score-upgrade");
let powerElement = document.getElementById("power-up");
let time = document.getElementById("timer");

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

// Initializes power-up variables
let halfSpeedX, halfSpeedY;
halfSpeedX = halfSpeedY = -box;
let smallX, smallY;
smallX = smallY = -box;
let pointsX, pointsY;
pointsX = pointsY = -box;
let extraX, extraY;
extraX = extraY = -box;
let extraOneX, extraOneY, extraTwoX, extraTwoY, extraThreeX, extraThreeY;
extraOneX = extraOneY = extraTwoX = extraTwoY = extraThreeX = extraThreeY = -box;

// Initializes taco location
let foodX, foodY = 0;
let foodIntersection = true;
let foodIntersectCount = 0;
while (foodIntersection == true) {
    foodIntersectCount = 0;
    foodX = ~~(Math.random() * COLUMNS) * box;
    foodY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
    if (snake[0].x == foodX && snake[0].y == foodY) {
            foodIntersectCount++;
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
    x: -box,
    y: -box
}

// Initializes -4 length power-up variables
let smallActive = false;
let small = {
    x: -box,
    y: -box
}

// Initializes bonus points power-up variables
let pointsActive = false;
let points = {
    x: -box,
    y: -box
}

// Initializes extra tacos power-up variables
let extraActive = false;
let extra = {
    x: -box,
    y: -box
}

// Initializes extra taco 1 variables
let extraOneActive = false;
let extraOne = {
    x: -box,
    y: -box
}

// Initializes extra taco 2 variables
let extraTwoActive = false;
let extraTwo = {
    x: -box,
    y: -box
}

// Initializes extra taco 3 variables
let extraThreeActive = false;
let extraThree = {
    x: -box,
    y: -box
}

// Initializes the score and score until speed increase variables
let score = 0;
let scoreNeeded = UPGRADE;

// Initializes variable to keep track of direction
let d;

window.addEventListener("keydown", function(e) {
    this.keyDown.call(this, e); 
});

// Determines which direction the player presses
var keyBuffer = [];
var keyDown = function(e) {
    var keyCode = e.which ? e.which : e.keyCode;
    // *** Queue the arrow key presses
    if (keyCode >= 37 && keyCode <= 40 && keyCode !==
        keyBuffer[keyBuffer.length - 1]) {
        keyBuffer = keyBuffer.slice(-3).concat(keyCode);
    }
};
function direction() {
    var key = keyBuffer.shift();
    if (key == 37 && d != "RIGHT") {
    d = "LEFT"
    }
    else if (key == 38 && d != "DOWN") {
        d = "UP"
    }
    else if (key == 39 && d != "LEFT") {
        d = "RIGHT"
    }
    else if (key == 40 && d != "UP") {
        d = "DOWN"
    }
}

// Draws initial board
function drawBoard() {
    for (let i = 0; i < COLUMNS; i++){
        for (let j = 0; j < ~~(COLUMNS * 0.8); j++){
            if (i % 2 == j % 2) {
                boardCTX.fillStyle = "purple";
                boardCTX.fillRect(box * i , box * j, box, box);
            }
            else {
                boardCTX.fillStyle = "pink";
                boardCTX.fillRect(box * i, box * j, box, box);
            }
        }
    }
}

// Function for drawing all parts of the game and UI
function draw() {
    // Clears the board
    ctx.clearRect(0, 0, cvs.width, cvs.height);

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
        if (score % UPGRADE == 0 && SPEED >= 50 && scoreNeeded < 10) {
            SPEED -= 20;
            clearInterval(game);
            game = setInterval(draw, SPEED);
            scoreNeeded = UPGRADE;
        }
        else {
            scoreNeeded--;
        }

        // Determines new location of taco
        foodX, foodY = -box;
        foodIntersection = true;
        foodIntersectCount = 0;
        while (foodIntersection == true) {
            foodIntersectCount = 0;
            foodX = ~~(Math.random() * COLUMNS) * box;
            foodY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x == foodX && snake[i].y == foodY) {
                    foodIntersectCount++;
                }
            }
            if ((foodX == extraOneX && foodY == extraOneY) || (foodX == extraTwoX && foodY == extraTwoY) ||
                (foodX == extraThreeX && foodY == extraThreeY) || (foodX == halfSpeed.x && foodY == halfSpeed.y) ||
                (foodX == small.x && foodY == small.y) || (foodX == points.x && foodY == points.y) ||
                (foodX == extra.x && foodY == extra.y)) {
                foodIntersectCount++;
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
                halfSpeedX = halfSpeedY = -box;
                let hsIntersection = true;
                let hsIntersectCount = 0;
                while (hsIntersection == true) {
                    hsIntersectCount = 0;
                    halfSpeedX = ~~(Math.random() * COLUMNS) * box;
                    halfSpeedY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++){
                        if (snake[i].x == halfSpeedX && snake[i].y == halfSpeedY) {
                            hsIntersectCount++;
                        }
                    }
                    if ((halfSpeedX == extraOneX && halfSpeedY == extraOneY) || (halfSpeedX == extraTwoX && halfSpeedY == extraTwoY) ||
                        (halfSpeedX == extraThreeX && halfSpeedY == extraThreeY) || (halfSpeedX == small.x && halfSpeedY == small.y) ||
                        (halfSpeedX == points.x && halfSpeedY == points.y) || (halfSpeedX == food.x && halfSpeedY == food.y) ||
                        (halfSpeedX == extra.x && halfSpeedY == extra.y)) {
                        hsIntersectCount++;
                    }
                    if (hsIntersectCount == 0) {
                        hsIntersection = false;
                    }
                }
                halfSpeed = {
                    x: halfSpeedX,
                    y: halfSpeedY
                }
                halfSpeedActive = true;
                break;
            
            // Case for -4 length power-up
            case (powerChoice <= ((POWER_CHANCE / 4) * 2) && smallActive == false):
                smallX = smallY = -box;
                let smallIntersection = true;
                let smallIntersectCount = 0;
                while (smallIntersection == true) {
                    smallIntersectCount = 0;
                    smallX = ~~(Math.random() * COLUMNS) * box;
                    smallY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++){
                        if (snake[i].x == smallX && snake[i].y == smallY) {
                            smallIntersectCount++;
                        }
                    }
                    if ((smallX == extraOneX && smallY == extraOneY) || (smallX == extraTwoX && smallY == extraTwoY) ||
                        (smallX == extraThreeX && smallY == extraThreeY) || (smallX == halfSpeed.x && smallY == halfSpeed.y) ||
                        (smallX == points.x && smallY == points.y) || (smallX == food.x && smallY == food.y) || 
                        (smallX == extra.x && smallY == extra.y)) {
                        smallIntersectCount++;
                    }
                    if (smallIntersectCount == 0) {
                        smallIntersection = false;
                    }
                }
                small = {
                    x: smallX,
                    y: smallY
                }
                smallActive = true;
                break;
            
            // Case for bonus points power-up
            case (powerChoice <= ((POWER_CHANCE / 4) * 3) && pointsActive == false):
                pointsX = pointsY = -box;
                let pointsIntersection = true;
                let pointsIntersectCount = 0;
                while (pointsIntersection == true) {
                    pointsIntersectCount = 0;
                    pointsX = ~~(Math.random() * COLUMNS) * box;
                    pointsY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++){
                        if ((snake[i].x == pointsX && snake[i].y == pointsY) ||
                            (food.x == pointsX && food.y == pointsY)) {
                            pointsIntersectCount++;
                        }
                    }
                    if ((pointsX == extraOneX && pointsY == extraOneY) || (pointsX == extraTwoX && pointsY == extraTwoY) ||
                        (pointsX == extraThreeX && pointsY == extraThreeY) || (pointsX == halfSpeed.x && pointsY == halfSpeed.y) ||
                        (pointsX == small.x && pointsY == small.y) || (pointsX == food.x && pointsY == food.y) || 
                        (pointsX == extra.x && pointsY == extra.y)) {
                        pointsIntersectCount++;
                    }
                    if (pointsIntersectCount == 0) {
                        pointsIntersection = false;
                    }
                }
                points = {
                    x: pointsX,
                    y: pointsY
                }
                pointsActive = true;
                break;
            
            // Case for extra food power-up
            default:
                if (extraActive == false) {
                    extraX = extraY = -box;
                    let extraIntersection = true;
                    let extraIntersectCount = 0;
                    while (extraIntersection == true) {
                        extraIntersectCount = 0;
                        extraX = ~~(Math.random() * COLUMNS) * box;
                        extraY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                        for (let i = 0; i < snake.length; i++){
                            if (snake[i].x == extraX && snake[i].y == extraY) {
                                extraIntersectCount++;
                            }
                        }
                        if ((extraX == extraOneX && extraY == extraOneY) || (extraX == extraTwoX && extraY == extraTwoY) ||
                            (extraX == extraThreeX && extraY == extraThreeY) || (extraX == halfSpeed.x && extraY == halfSpeed.y) ||
                            (extraX == small.x && extraY == small.y) || (extraX == food.x && extraY == food.y) ||
                            (extraX == points.x && extraY == points.y)) {
                            extraIntersectCount++;
                        }
                        if (extraIntersectCount == 0) {
                            extraIntersection = false;
                        }
                    }
                    extra = {
                        x: extraX,
                        y: extraY
                    }
                    extraActive = true;
                }
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
        let counter = 15;
        let speedDifference = SPEED;
        SPEED *= 2;
        clearInterval(game);
        game = setInterval(draw, SPEED);
        let countDown = setInterval(function () {
            time.classList.add('animation');
            time.innerHTML = counter;
            counter--;
            if (counter < 0) {
                time.innerHTML = "";
                time.classList.remove('animation');
                clearInterval(countDown);
                SPEED -= speedDifference;
                clearInterval(game);
                game = setInterval(draw, SPEED);
            }
        }, 1000);
        halfSpeed = {
            x: -box,
            y: -box
        }    
    }

    // If half-speed power-up is in play, it will be drawn in a static position
    if (halfSpeedActive == true) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(halfSpeed.x, halfSpeed.y, box, box);
    }

    /* Logic for colliding with -4 length power-up
    Removes the last 4 tail pieces from the snake (if they exist)
    */
    if (snakeX == small.x && snakeY == small.y) {
        smallActive = false;
        for (let i = 1; i <= 4; i++) {
            if (snake.length >= 1) {
                snake.pop();
            }
        }
        small = {
            x: -box,
            y: -box
        }
    }

    // If -4 length power-up is in play, it will be drawn in a static position
    if (smallActive == true) {
        ctx.fillStyle = "blue";
        ctx.fillRect(small.x, small.y, box, box);
    }

    /* Logic for colliding with bonus points power-up
    Adds 10 points to current score without incrementing speed of game
    */
    if (snakeX == points.x && snakeY == points.y) {
        pointsActive = false;
        score += 10;
        points = {
            x: -box,
            y: -box
        }
    }

    // If bonus points power-up is in play, it will be drawn in a static position
    if (pointsActive == true) {
        ctx.fillStyle = "orange";
        ctx.fillRect(points.x, points.y, box, box);
    }

    /* Logic for colliding with extra tacos power-up
    Spawns three golden tacos
    */
    if (snakeX == extra.x && snakeY == extra.y) {
        extraActive = false;
        extraOneX = extraOneY = extraTwoX = extraTwoY = extraThreeX = extraThreeY = -box;
        let extraOneIntersection, extraTwoIntersection, extraThreeIntersection;
        extraOneIntersection = extraTwoIntersection = extraThreeIntersection = true;
        let extraOneIntersectCount, extraTwoIntersectCount, extraThreeIntersectCount;
        extraOneIntersectCount = extraTwoIntersectCount = extraThreeIntersectCount = 0;
        while (extraOneIntersection == true) {
            extraOneIntersectCount = 0;
            extraOneX = ~~(Math.random() * COLUMNS) * box;
            extraOneY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
            for (let i = 0; i < snake.length; i++){
                if (snake[i].x == extraOneX && snake[i].y == extraOneY) {
                    extraOneIntersectCount++;
                }
            }
            if ((extraOneX == extra.x && extraOneY == extra.y) || (extraOneX == extraTwoX && extraOneY == extraTwoY) ||
                (extraOneX == extraThreeX && extraOneY == extraThreeY) || (extraOneX == halfSpeed.x && extraOneY == halfSpeed.y) ||
                (extraOneX == small.x && extraOneY == small.y) || (extraOneX == food.x && extraOneY == food.y) ||
                (extraOneX == points.x && extraOneY == points.y)) {
                extraOneIntersectCount++;
            }
            if (extraOneIntersectCount == 0) {
                extraOneIntersection = false;
            }
        }
        extraOne = {
            x: extraOneX,
            y: extraOneY
        }
        
        extraOneActive = true;
        while (extraTwoIntersection == true) {
            extraTwoIntersectCount = 0;
            extraTwoX = ~~(Math.random() * COLUMNS) * box;
            extraTwoY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
            for (let i = 0; i < snake.length; i++){
                if (snake[i].x == extraTwoX && snake[i].y == extraTwoY) {
                    extraTwoIntersectCount++;
                }
            }
            if ((extraTwoX == extraOneX && extraTwoY == extraOneY) || (extraTwoX == extra.x && extraTwoY == extra.y) ||
                (extraTwoX == extraThreeX && extraTwoY == extraThreeY) || (extraTwoX == halfSpeed.x && extraTwoY == halfSpeed.y) ||
                (extraTwoX == small.x && extraTwoY == small.y) || (extraTwoX == food.x && extraTwoY == food.y) ||
                (extraTwoX == points.x && extraTwoY == points.y)) {
                extraTwoIntersectCount++;
            }
            if (extraTwoIntersectCount == 0) {
                extraTwoIntersection = false;
            }
        }
        extraTwo = {
            x: extraTwoX,
            y: extraTwoY
        }
        extraTwoActive = true;
        while (extraThreeIntersection == true) {
            extraThreeIntersectCount = 0;
            extraThreeX = ~~(Math.random() * COLUMNS) * box;
            extraThreeY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
            for (let i = 0; i < snake.length; i++){
                if (snake[i].x == extraThreeX && snake[i].y == extraThreeY) {
                    extraThreeIntersectCount++;
                }
            }
            if ((extraThreeX == extraOneX && extraThreeY == extraOneY) || (extraThreeX == extraTwoX && extraThreeY == extraTwoY) ||
                (extraThreeX == extra.x && extraThreeY == extra.y) || (extraThreeX == halfSpeed.x && extraThreeY == halfSpeed.y) ||
                (extraThreeX == small.x && extraThreeY == small.y) || (extraThreeX == food.x && extraThreeY == food.y) ||
                (extraThreeX == points.x && extraThreeY == points.y)) {
                extraThreeIntersectCount++;
            }
            if (extraThreeIntersectCount == 0) {
                extraThreeIntersection = false;
            }
        }
        extraThree = {
            x: extraThreeX,
            y: extraThreeY
        }
        extraThreeActive = true;
    }

    // If extra tacos power-up is in play, it will be drawn in a static position
    if (extraActive == true) {
        ctx.fillStyle = "gray";
        ctx.fillRect(extra.x, extra.y, box, box);
    }

    /* Logic for colliding with golden tacos
    Increase score by 2 and increase tacos until speed-up by 1 per taco
    */
    if (snakeX == extraOne.x && snakeY == extraOne.y || snakeX == extraTwo.x && snakeY == extraTwo.y ||
        snakeX == extraThree.x && snakeY == extraThree.y) {
        score += 2;
        scoreNeeded += 1;
        if (snakeX == extraOne.x && snakeY == extraOne.y) {
            extraOneActive = false;
            upgradeElement.innerHTML = scoreNeeded + " tacos until speedup";
            extraOne = {
                x: -box,
                y: -box
            }
        }
        else if (snakeX == extraTwo.x && snakeY == extraTwo.y) {
            extraTwoActive = false;
            upgradeElement.innerHTML = scoreNeeded + " tacos until speedup";
            extraTwo = {
                x: -box,
                y: -box
            }
        }
        else {
            extraThreeActive = false;
            upgradeElement.innerHTML = scoreNeeded + " tacos until speedup";
            extraThree = {
                x: -box,
                y: -box
            }
        }
    }

    // If golden tacos are in play, it will be drawn in a static position
    if (extraOneActive == true || extraTwoActive == true || extraThreeActive == true) {
        ctx.fillStyle = "black";
        if (extraOneActive == true) {
            ctx.fillRect(extraOne.x, extraOne.y, box, box);
        }
        if (extraTwoActive == true) {
            ctx.fillRect(extraTwo.x, extraTwo.y, box, box);
        }
        if (extraThreeActive == true) {
            ctx.fillRect(extraThree.x, extraThree.y, box, box);
        }
    }

    // Updates score, "score until speedup", and power-up UI
    scoreElement.innerHTML = score;
    upgradeElement.innerHTML = scoreNeeded + " tacos until speedup";

    // Determines how to move snake depending on the direction it is moving
    direction();
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
drawBoard();
let game = setInterval(draw, SPEED);