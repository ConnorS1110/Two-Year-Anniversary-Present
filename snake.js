// Board elements
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const boardCVS = document.getElementById("board");
const boardCTX = boardCVS.getContext("2d");
const TO_RADIANS = Math.PI / 180;
let viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
let viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const contentWidth = cvs.width + document.getElementById("score-area").offsetWidth;
const contentHeight = cvs.height;

//How many columns. There will be 0.8 times as many rows
const COLUMNS = 25;

//How many initial ms for each move tick
let SPEED = 200;

// The max speed in ms the game will run
let MAX_SPEED = 50;

//Score needed for speedup and initial level
const UPGRADE = 10;
let level = 1;

//Chance for a power-up to spawn
let POWER_CHANCE = 0.4;

// The size of each square in the grid based off the number of columns
const box = cvs.width / COLUMNS;

// Initializes snake position
let snake = [];
snake[0] = {
    x: ~~(COLUMNS / 2) * box,
    y: ~~((COLUMNS / 2) * 0.8) * box
}
let snakeX = snake[0].x;
let snakeY = snake[0].y;

// Initializes array that keeps track of questions used
let questionsUsed = [];

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

// Loads needed image files
headSRC = "img/head.webp";
hairSRC = "img/hair.webp";
tailSRC = "img/tail.webp";
tacoSRC = "img/taco.webp";
goldenSRC = "img/golden_taco.webp";
extraSRC = "img/extra.webp";
pointsSRC = "img/points.webp";
speedSRC = "img/speed.webp";
smallSRC = "img/small.webp";

const head = new Image();
const hair = new Image();
const tail = new Image();
const taco = new Image();
const goldenTaco = new Image();
const extraImage = new Image();
const pointsImage = new Image();
const speedImage = new Image();
const smallImage = new Image();

head.src = headSRC;
hair.src = hairSRC;
tail.src = tailSRC;
taco.src = tacoSRC;
goldenTaco.src = goldenSRC;
extraImage.src = extraSRC;
pointsImage.src = pointsSRC;
speedImage.src = speedSRC;
smallImage.src = smallSRC;

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
let halfSpeedInUse = false;
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
                boardCTX.fillStyle = "#A227D6";
                boardCTX.fillRect(box * i , box * j, box, box);
            }
            else {
                boardCTX.fillStyle = "#6E14A7";
                boardCTX.fillRect(box * i, box * j, box, box);
            }
        }
    }
}

// Calculates proper zoom to fit game to page
function zoomPage() {
    if ((viewWidth / viewHeight) > (contentWidth / contentHeight)) {
        document.body.style.transformOrigin = "top left";
        document.body.style.transform = "scale(" + (viewHeight / contentHeight) * 1 + ", " + (viewHeight / contentHeight) * 1 + ")";
    }
    else {
        document.body.style.transformOrigin = "top left";
        document.body.style.transform = "scale(" + (viewWidth / contentWidth) * 1 + ", " + (viewWidth / contentWidth) * 1 + ")";
    }
}

// Places context to rotate current image to be drawn
function rotateDraw(image, x, y, angle) {
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    if (image == head) {
        ctx.scale(-1, 1);
    }
    ctx.drawImage(image, -(box / 2), -(box / 2), box, box);
    if (image == head) {
        ctx.scale(-1, 1);
    }
    ctx.rotate(-(angle * TO_RADIANS));
    ctx.translate(-x, -y);
}

// Places context to flip current image to be drawn horizontally
function flipDraw(image, x, y) {
    ctx.translate(x, y);
    ctx.scale(-1, 1);
    ctx.drawImage(image, -(box / 2), -(box / 2), box, box);
    ctx.scale(-1, 1);
    ctx.translate(-x, -y);
}

// Initializes info needed to draw power-ups image to display
let drawDone = false;
let firstPower = false;
var img = document.createElement('img');
let powerDraw = setTimeout(function () {
    return 0;
}, 0);

// Removes current power-up image from HTML
function revertPowerImage() {
    img.classList.remove("power-image-changes");
    powerImage.removeChild(img);
    drawDone = true;
}

// Function for adding power-up image with animation to display
function drawPowerImage(imgSource) {
    if (firstPower == false) {
        firstPower = true;
    }
    drawDone = false;
    img.src = imgSource;
    img.style.height = '75px';
    img.style.width = 'auto';
    powerImage.appendChild(img);
    img.classList.add("power-image-changes");
    powerDraw = setTimeout(function () {
        revertPowerImage();
    }, 1000);
}

// Initialize setInterval function for countdown timer
let countDown = setInterval(function () {
    return 0;
}, 1000);

// Initialize setInterval function to remove animation class from score UI
let scoreTimeout = setTimeout(function () {
    scoreElement.classList.remove('animation');
}, 1000);

// Initialize setInterval function to remove animation class from level UI
let levelTimeout = setTimeout(function () {
    levelElement.classList.remove('animation');
}, 1000);

// Function for drawing all parts of the game and UI
function draw() {
    // Clears the board
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Draws the snake
    for (let i = 0; i < snake.length; i++){
        // Head
        if (i == 0) {
            // Down
            if (d == "DOWN") {
                rotateDraw(head, snake[i].x + (box / 2), snake[i].y + (box / 2), 90);
            }
            // Up
            else if (d == "UP") {
                rotateDraw(head, snake[i].x + (box / 2), snake[i].y + (box / 2), -90);
            }
            // Left
            else if (d == "RIGHT") {
                flipDraw(head, snake[i].x + (box / 2), snake[i].y + (box / 2));
            }
            // Left
            else {
                ctx.drawImage(head, snake[i].x, snake[i].y, box, box);
            }
            
        }
        // Main body
        else if (i != (snake.length - 1)) {
            // Down
            if ((snake[i].y < snake[i - 1].y) && (snake[i].x == snake[i - 1].x)) {
                rotateDraw(hair, snake[i].x + (box / 2), snake[i].y + (box / 2), 90);
            }
            // Up
            else if ((snake[i].y > snake[i - 1].y) && (snake[i].x == snake[i - 1].x)) {
                rotateDraw(hair, snake[i].x + (box / 2), snake[i].y + (box / 2), -90);
            }
            // Right
            else if ((snake[i].x < snake[i - 1].x) && (snake[i].y == snake[i - 1].y)) {
                ctx.drawImage(hair, snake[i].x, snake[i].y, box, box);
            }
            // Left
            else {
                flipDraw(hair, snake[i].x + (box / 2), snake[i].y + (box / 2));
            }
        }
        // Tail piece
        else {
            // Down
            if ((snake[i].y < snake[i - 1].y) && (snake[i].x == snake[i - 1].x)) {
                rotateDraw(tail, snake[i].x + (box / 2), snake[i].y + (box / 2), 90);
            }
            // Up
            else if ((snake[i].y > snake[i - 1].y) && (snake[i].x == snake[i - 1].x)) {
                rotateDraw(tail, snake[i].x + (box / 2), snake[i].y + (box / 2), -90);
            }
            // Right
            else if ((snake[i].x < snake[i - 1].x) && (snake[i].y == snake[i - 1].y)) {
                ctx.drawImage(tail, snake[i].x, snake[i].y, box, box);
            }
            // Left
            else {
                flipDraw(tail, snake[i].x + (box / 2), snake[i].y + (box / 2));
            }
        }
    }

    // Draws tacos
    ctx.drawImage(taco, food.x, food.y, box, box);

    // Head of the snake
    snakeX = snake[0].x;
    snakeY = snake[0].y;

    // Logic for eating a taco
    if (snakeX == food.x && snakeY == food.y) {
        clearTimeout(scoreTimeout);
        score++;
        scoreElement.classList.add('animation');
        scoreTimeout = setTimeout(function () {
            scoreElement.classList.remove('animation');
        }, 1000);
        
        /* If score is a multiple of speed upgrade interval, the time is sped
        up by 20ms and the interval of the game is reset */
        if (scoreNeeded % UPGRADE == 1 && SPEED >= MAX_SPEED && scoreNeeded < 10) {
            SPEED -= 20;
            clearInterval(game);
            game = setInterval(draw, SPEED);
            scoreNeeded = UPGRADE;
            level++;
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
        //let powerChoice = Math.random();
        let powerChoice = 0.25;
        if (powerChoice <= POWER_CHANCE) {
            // Case for half-speed power-up
            if (powerChoice <= (POWER_CHANCE / 4) && halfSpeedActive == false && halfSpeedInUse == false) {
                halfSpeedX = halfSpeedY = -box;
                let hsIntersection = true;
                let hsIntersectCount = 0;
                while (hsIntersection == true) {
                    hsIntersectCount = 0;
                    halfSpeedX = ~~(Math.random() * COLUMNS) * box;
                    halfSpeedY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++) {
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
            }
            
            // Case for -4 length power-up
            else if (powerChoice <= ((POWER_CHANCE / 4) * 2) && smallActive == false) {
                smallX = smallY = -box;
                let smallIntersection = true;
                let smallIntersectCount = 0;
                while (smallIntersection == true) {
                    smallIntersectCount = 0;
                    smallX = ~~(Math.random() * COLUMNS) * box;
                    smallY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++) {
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
            }
            
            // Case for bonus points power-up
            else if (powerChoice <= ((POWER_CHANCE / 4) * 3) && pointsActive == false) {
                pointsX = pointsY = -box;
                let pointsIntersection = true;
                let pointsIntersectCount = 0;
                while (pointsIntersection == true) {
                    pointsIntersectCount = 0;
                    pointsX = ~~(Math.random() * COLUMNS) * box;
                    pointsY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++) {
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
            }
            
            // Case for extra food power-up
            else if (extraActive == false && (extraOneActive == false && extraTwoActive == false && extraThreeActive == false)) {
                extraX = extraY = -box;
                let extraIntersection = true;
                let extraIntersectCount = 0;
                while (extraIntersection == true) {
                    extraIntersectCount = 0;
                    extraX = ~~(Math.random() * COLUMNS) * box;
                    extraY = ~~(Math.random() * (COLUMNS * 0.8)) * box;
                    for (let i = 0; i < snake.length; i++) {
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
        activatePower("half-speed");
    }
    

    // If half-speed power-up is in play, it will be drawn in a static position
    if (halfSpeedActive == true) {
        ctx.drawImage(speedImage, halfSpeed.x, halfSpeed.y, box, box);
    }

    /* Logic for colliding with -4 length power-up
    Removes the last 4 tail pieces from the snake (if they exist)
    */
    if (snakeX == small.x && snakeY == small.y) {
        activatePower("-4 length");
    }

    // If -4 length power-up is in play, it will be drawn in a static position
    if (smallActive == true) {
        ctx.drawImage(smallImage, small.x, small.y, box, box);
    }

    /* Logic for colliding with bonus points power-up
    Adds 10 points to current score without incrementing speed of game
    */
    if (snakeX == points.x && snakeY == points.y) {
        activatePower("bonus-points");
    }

    // If bonus points power-up is in play, it will be drawn in a static position
    if (pointsActive == true) {
        ctx.drawImage(pointsImage, points.x, points.y, box, box);
    }

    /* Logic for colliding with extra tacos power-up (spawns three golden tacos)
    */
    if (snakeX == extra.x && snakeY == extra.y) {
        activatePower("extra-tacos");
    }

    // If extra tacos power-up is in play, it will be drawn in a static position
    if (extraActive == true) {
        ctx.drawImage(extraImage, extra.x, extra.y, box, box);
    }

    /* Logic for colliding with golden tacos
    Increase score by 2 and increase tacos until speed-up by 1 per taco
    */
    if (snakeX == extraOne.x && snakeY == extraOne.y || snakeX == extraTwo.x && snakeY == extraTwo.y ||
        snakeX == extraThree.x && snakeY == extraThree.y) {
        activatePower("golden-tacos");
    }

    // If golden tacos are in play, it will be drawn in a static position
    if (extraOneActive == true || extraTwoActive == true || extraThreeActive == true) {
        if (extraOneActive == true) {
            ctx.drawImage(goldenTaco, extraOne.x, extraOne.y, box, box);
        }
        if (extraTwoActive == true) {
            ctx.drawImage(goldenTaco, extraTwo.x, extraTwo.y, box, box);
        }
        if (extraThreeActive == true) {
            ctx.drawImage(goldenTaco, extraThree.x, extraThree.y, box, box);
        }
    }

    // Updates score, "score until speedup", and power-up UI
    scoreElement.innerHTML = score;
    levelElement.innerHTML = level;
    upgradeElement.innerHTML = scoreNeeded;

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
        clearInterval(countDown);
        time.classList.remove('animation');
        time.innerHTML = "";
        clearTimeout(scoreTimeout);
        clearTimeout(powerDraw);
        if (drawDone == false && firstPower == true) {
            revertPowerImage();
        }
        removeOnClicks();
        gameOver();
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
zoomPage();
// Dynamically zooms page
setInterval(function () {
    if ((viewWidth != Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)) ||
    (viewHeight != Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))) {
        viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        zoomPage();
        }
}, 1000);
let game = setInterval(draw, SPEED);
welcome();
