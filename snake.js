// Board elements
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const boardCVS = document.getElementById("board");
const boardCTX = boardCVS.getContext("2d");
const TO_RADIANS = Math.PI / 180;
const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const contentWidth = cvs.width + document.getElementById("score-area").offsetWidth;
const contentHeight = cvs.height;
// UI elements
let scoreElement = document.getElementById("score-number");
let levelElement = document.getElementById("number");
let upgradeElement = document.getElementById("upgrade-number");
let powerElement = document.getElementById("power-up");
let powerImage = document.getElementById("power-up-image");
let time = document.getElementById("timer");
// Pop-up elements
let table = document.getElementById("pop-up");
let headText = document.getElementById("head-text");
let questionText = document.getElementById("pop-up-text");
let rowTwo = document.getElementById("row2");
let powerImageRow = document.getElementById("power-images");
let powerInfoRow = document.getElementById("power-info");
let circleRow = document.getElementById("row3");
let rowFour = document.getElementById("row4");
let circleContainers = document.getElementsByClassName("answer-circle-container");
let aCircle = document.getElementById("circle-a");
let bCircle = document.getElementById("circle-b");
let cCircle = document.getElementById("circle-c");
let dCircle = document.getElementById("circle-d");
let aCircleText = document.getElementById("a-circle-text");
let bCircleText = document.getElementById("b-circle-text");
let cCircleText = document.getElementById("c-circle-text");
let dCircleText = document.getElementById("d-circle-text");
let aCircleCell = document.getElementById("a");
let bCircleCell = document.getElementById("b");
let cCircleCell = document.getElementById("c");
let dCircleCell = document.getElementById("d");
let aAnswerCell = document.getElementById("a-answer");
let bAnswerCell = document.getElementById("b-answer");
let cAnswerCell = document.getElementById("c-answer");
let dAnswerCell = document.getElementById("d-answer");
let aText = document.getElementById("a-text");
let bText = document.getElementById("b-text");
let cText = document.getElementById("c-text");
let dText = document.getElementById("d-text");
let aDifficultyText = document.getElementById("power-a-info");
let bDifficultyText = document.getElementById("power-b-info");
let cDifficultyText = document.getElementById("power-c-info");
let dDifficultyText = document.getElementById("power-d-info");

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

// Default pop-up style
function defaultStyle() {
    table.style.display = "flex";
    table.style.height = "600px";
    table.style.top = "60px";
    questionText.style.paddingBottom = "0";
    powerImageRow.style.display = "table-row";
    powerInfoRow.style.display = "table-row";
    circleRow.style.height = "32px";
    for (let i = 0; i < circleContainers.length; i++){
        circleContainers[i].style.width = "32px";
        circleContainers[i].style.height = "32px";
    }
    aCircle.setAttribute("id", "circle-a");
    bCircle.setAttribute("id", "circle-b");
    cCircle.setAttribute("id", "circle-c");
    dCircle.setAttribute("id", "circle-d");
    aCircle.style.r = "15px";
    aCircle.style.cx = "16px";
    aCircle.style.cy = "16px";
    bCircle.style.r = "15px";
    bCircle.style.cx = "16px";
    bCircle.style.cy = "16px";
    cCircle.style.r = "15px";
    cCircle.style.cx = "16px";
    cCircle.style.cy = "16px";
    dCircle.style.r = "15px";
    dCircle.style.cx = "16px";
    dCircle.style.cy = "16px";
    aCircleCell.style.display = "table-cell";
    aAnswerCell.style.display = "table-cell";
    bCircleCell.style.display = "table-cell";
    bAnswerCell.style.display = "table-cell";
    cCircleCell.style.display = "table-cell";
    cAnswerCell.style.display = "table-cell";
    dCircleCell.style.display = "table-cell";
    dAnswerCell.style.display = "table-cell";
}

// Welcome function
function welcome() {
    headText.innerHTML = "Seasons Greetings!";
    questionText.innerHTML = "Welcome to the Connie Boi and Paulie Girl 2-year anniversary snake game!<br/>" +
        "The rules are simple. Read the descriptions for each power-up, choose a difficulty, and begin.<br/>" +
        "There is a twist though. Touching a power-up is half the battle. You also need to answer a question about " +
        "our relationship <strong>CORRECTLY</strong> if you want to receive its effects.<br/><br/>Good luck!";

    aCircleText.textContent = "0";
    bCircleText.textContent = "1";
    cCircleText.textContent = "2";
    dCircleText.textContent = "3";

    aText.innerHTML = "Paulie Girl Speed<br/>(If you have issues, the issue is you)<br/>";
    aDifficultyText.innerHTML = "Speed: Very Slow<br/>Max Speed: Very Slow<br/>Power-ups: Very common";
    bText.innerHTML = "Easy<br/>(For the... mechanically uninclined)<br/>";
    bDifficultyText.innerHTML = "Speed: Slow<br/>Max Speed: Slow<br/>Power-ups: Common";
    cText.innerHTML = "Normal<br/><br/>";
    cDifficultyText.innerHTML = "Speed: Normal<br/>Max Speed: You get it<br/>Power-ups: Still get it";
    dText.innerHTML = "Hard<br/>(Godspeed)<br/>";
    dDifficultyText.innerHTML = "Speed: Fast<br/>Max Speed: Fast<br/>Power-ups: Uncommon";

    aCircle.addEventListener("click", welcomeDifficulty, {once: true});
    bCircle.addEventListener("click", welcomeDifficulty, {once: true});
    cCircle.addEventListener("click", welcomeDifficulty, {once: true});
    dCircle.addEventListener("click", welcomeDifficulty, {once: true});
}

// Determines values for game variables based off welcome screen input
function welcomeDifficulty(event) {
    gameReset();
    powerImageRow.style.display = "table-row";
    powerInfoRow.style.display = "table-row";
    if (event.target.id == "circle-a") {
        SPEED = 350;
        MAX_SPEED = 150;
        POWER_CHANCE = 0.6;
    }
    else if (event.target.id == "circle-b") {
        SPEED = 250;
        MAX_SPEED = 100;
        POWER_CHANCE = 0.5;
    }
    else if (event.target.id == "circle-c") {
    SPEED = 200;
    MAX_SPEED = 50;
    POWER_CHANCE = 0.4;
    }
    else if (event.target.id == "circle-d") {
        SPEED = 150;
        MAX_SPEED = 50;
        POWER_CHANCE = 0.3;
    }
    powerImageRow.style.display = "none";
    powerInfoRow.style.display = "none";
    table.style.display = "none";
    game = setInterval(draw, SPEED);
}

function gameReset() {
    d = "";
    clearInterval(game);
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    snake.length = 1;
    snake[0] = {
    x: (~~(COLUMNS / 2) - 1) * box,
    y: (~~(COLUMNS / 2) - 2) * box
    }
    // Initializes taco location
    foodX, foodY = 0;
    foodIntersection = true;
    foodIntersectCount = 0;
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
    food = {
        x: foodX,
        y: foodY
    }

    // Initializes half-speed power-up variables
    halfSpeedActive = false;
    halfSpeedInUse = false;
    halfSpeed = {
        x: -box,
        y: -box
    }

    // Initializes -4 length power-up variables
    smallActive = false;
    small = {
        x: -box,
        y: -box
    }

    // Initializes bonus points power-up variables
    pointsActive = false;
    points = {
        x: -box,
        y: -box
    }

    // Initializes extra tacos power-up variables
    extraActive = false;
    extra = {
        x: -box,
        y: -box
    }

    // Initializes extra taco 1 variables
    extraOneActive = false;
    extraOne = {
        x: -box,
        y: -box
    }

    // Initializes extra taco 2 variables
    extraTwoActive = false;
    extraTwo = {
        x: -box,
        y: -box
    }

    // Initializes extra taco 3 variables
    extraThreeActive = false;
    extraThree = {
        x: -box,
        y: -box
    }

    // Initializes the score and score until speed increase variables
    score = 0;
    scoreNeeded = UPGRADE;
}

// Game over function
function gameOver() {
    gameOverStyle();

    aCircle.addEventListener("click", gameOverLogic, {once: true});
    bCircle.addEventListener("click", gameOverLogic, {once: true});
}

// Game over logic
function gameOverLogic(event) {
    if (event.target.id == "circle-a1") {
        defaultStyle();
        welcome();
    }
    else if (event.target.id == "circle-b1") {
        table.style.display = "flex";
        rowTwo.style.display = "none";
        powerImageRow.style.display = "none";
        powerInfoRow.style.display = "none";
        circleRow.style.display = "none";
        rowFour.style.display = "none";
        headText.style.fontSize = "150pt";
        headText.innerHTML = "BORING";
        setTimeout(function () {
            document.body.style.display = "none";
        }, 5000);
    }
}

// CSS style for game over window
function gameOverStyle() {
    table.style.display = "flex";
    table.style.height = "400px";
    table.style.top = "160px";
    questionText.style.paddingBottom = "30px";
    powerImageRow.style.display = "none";
    powerInfoRow.style.display = "none";
    circleRow.style.height = "75px";
    circleContainers[0].style.width = "42px";
    circleContainers[0].style.height = "42px";
    circleContainers[1].style.width = "42px";
    circleContainers[1].style.height = "42px";
    aCircle.setAttribute("id", "circle-a1");
    bCircle.setAttribute("id", "circle-b1");
    aCircle.style.r = "20px";
    aCircle.style.cx = "21px";
    aCircle.style.cy = "21px";
    bCircle.style.r = "20px";
    bCircle.style.cx = "21px";
    bCircle.style.cy = "21px";
    cCircleCell.style.display = "none";
    cAnswerCell.style.display = "none";
    dCircleCell.style.display = "none";
    dAnswerCell.style.display = "none";

    headText.innerHTML = "You Died";
    questionText.innerHTML = "What are you stupid? You can do better than <span style=\"font-size:20pt; color:red\";> " + score + "</span><br><br>" +
    "<span style=\"font-size:20pt;\";>Do you want to play again?";

    aCircleText.textContent = "Yes";
    bCircleText.textContent = "No";
    cCircleText.textContent = "";
    dCircleText.textContent = "";

    aText.innerHTML = "You don't have the guts";
    aDifficultyText.innerHTML = "";
    bText.innerHTML = "Coward";
    bDifficultyText.innerHTML = "";
    cDifficultyText.innerHTML = "";
    dDifficultyText.innerHTML = "";
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
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

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
        let powerChoice = Math.random();

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
        halfSpeedActive = false;
        halfSpeedInUse = true;
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(speedSRC);
        }
        else {
            drawPowerImage(speedSRC);
        }
        let counter = 15;
        let speedDifference = SPEED;
        SPEED *= 2;
        clearInterval(game);
        game = setInterval(draw, SPEED);
        countDown = setInterval(function () {
            time.classList.add('animation');
            time.innerHTML = counter;
            counter--;
            if (counter < 0) {
                time.innerHTML = "";
                time.classList.remove('animation');
                clearInterval(countDown);
                SPEED -= speedDifference;
                halfSpeedInUse = false;
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
        ctx.drawImage(speedImage, halfSpeed.x, halfSpeed.y, box, box);
    }

    /* Logic for colliding with -4 length power-up
    Removes the last 4 tail pieces from the snake (if they exist)
    */
    if (snakeX == small.x && snakeY == small.y) {
        smallActive = false;
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(smallSRC);
        }
        else {
            drawPowerImage(smallSRC);
        }
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
        ctx.drawImage(smallImage, small.x, small.y, box, box);
    }

    /* Logic for colliding with bonus points power-up
    Adds 10 points to current score without incrementing speed of game
    */
    if (snakeX == points.x && snakeY == points.y) {
        clearTimeout(scoreTimeout);
        pointsActive = false;
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(pointsSRC);
        }
        else {
            drawPowerImage(pointsSRC);
        }
        score += 10;
        scoreElement.classList.add('animation');
        scoreTimeout = setTimeout(function () {
            scoreElement.classList.remove('animation');
        }, 1000);
        points = {
            x: -box,
            y: -box
        }
    }

    // If bonus points power-up is in play, it will be drawn in a static position
    if (pointsActive == true) {
        ctx.drawImage(pointsImage, points.x, points.y, box, box);
    }

    /* Logic for colliding with extra tacos power-up
    Spawns three golden tacos
    */
    if (snakeX == extra.x && snakeY == extra.y) {
        extraActive = false;
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(extraSRC);
        }
        else {
            drawPowerImage(extraSRC);
        }
        extra = {
            x: -box,
            y: -box
        }
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
        ctx.drawImage(extraImage, extra.x, extra.y, box, box);
    }

    /* Logic for colliding with golden tacos
    Increase score by 2 and increase tacos until speed-up by 1 per taco
    */
    if (snakeX == extraOne.x && snakeY == extraOne.y || snakeX == extraTwo.x && snakeY == extraTwo.y ||
        snakeX == extraThree.x && snakeY == extraThree.y) {
        clearTimeout(scoreTimeout);
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(goldenSRC);
        }
        else {
            drawPowerImage(goldenSRC);
        }
        score += 2;
        scoreNeeded += 1;
        scoreElement.classList.add('animation');
        scoreTimeout = setTimeout(function () {
            scoreElement.classList.remove('animation');
        }, 1000);
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
let game = setInterval(draw, SPEED);
welcome();
//gameOver();