// UI elements
let scoreArea = document.getElementById("score-area");
let scoreElement = document.getElementById("score-number");
let levelElement = document.getElementById("number");
let upgradeElement = document.getElementById("upgrade-number");
let powerElement = document.getElementById("power-up");
let powerImage = document.getElementById("power-up-image");
let time = document.getElementById("timer");
// Pop-up elements
let table = document.getElementById("pop-up");
let rowOne = document.getElementById("row1");
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

// Initializes array that keeps track of questions used
let questionsUsed = [];

// Default pop-up style
function defaultStyle() {
    table.style.display = "flex";
    table.style.width = "800px";
    table.style.height = "600px";
    table.style.top = "60px";
    table.style.left = "60px";

    rowOne.style.display = "table-row";
    headText.style.fontSize = "30pt";

    rowTwo.style.display = "table-row";
    questionText.style.fontSize = "12pt";
    questionText.style.paddingBottom = "0";

    powerImageRow.style.display = "table-row";
    powerInfoRow.style.display = "table-row";

    circleRow.style.display = "table-row";
    circleRow.style.height = "32px";
    for (let i = 0; i < circleContainers.length; i++){
        circleContainers[i].style.width = "32px";
        circleContainers[i].style.height = "32px";
    }
    aCircle.setAttribute("id", "circle-a");
    bCircle.setAttribute("id", "circle-b");
    cCircle.setAttribute("id", "circle-c");
    dCircle.setAttribute("id", "circle-d");
    aCircle.setAttribute("class", "answer-circle");
    bCircle.setAttribute("class", "answer-circle");
    cCircle.setAttribute("class", "answer-circle");
    dCircle.setAttribute("class", "answer-circle");
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
    bCircleCell.style.display = "table-cell";
    cCircleCell.style.display = "table-cell";
    dCircleCell.style.display = "table-cell";
    aCircleText.style.fontSize = "20px";
    bCircleText.style.fontSize = "20px";
    cCircleText.style.fontSize = "20px";
    dCircleText.style.fontSize = "20px";
    
    rowFour.style.display = "table-row";
    aAnswerCell.style.display = "table-cell";
    bAnswerCell.style.display = "table-cell";
    cAnswerCell.style.display = "table-cell";
    dAnswerCell.style.display = "table-cell";
    aText.style.fontSize = "12pt";
    bText.style.fontSize = "12pt";
    cText.style.fontSize = "12pt";
    dText.style.fontSize = "12pt";
    aText.style.marginTop = "5px";
    bText.style.marginTop = "5px";
    cText.style.marginTop = "5px";
    dText.style.marginTop = "5px";
}

// Resets the game board
function gameReset() {
    d = "";
    keyBuffer = [];
    dontRun = true;
    clearInterval(game);
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    snake.length = 1;
    snake[0] = {
        x: ~~(COLUMNS / 2) * box,
        y: ~~((COLUMNS / 2) * 0.8) * box
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

// CSS style for a small text message on screen
function justTextStyle() {
    table.style.display = "flex";
    rowOne.style.display = "table-row";
    rowTwo.style.display = "none";
    powerImageRow.style.display = "none";
    powerInfoRow.style.display = "none";
    circleRow.style.display = "none";
    rowFour.style.display = "none";
    headText.style.fontSize = "150pt";
}

// Golden taco point changes
function goldenScore() {
    clearTimeout(scoreTimeout);
    score += 2;
    scoreNeeded += 1;
    scoreElement.classList.add('animation');
    scoreTimeout = setTimeout(function () {
        scoreElement.classList.remove('animation');
    }, 1000);
    upgradeElement.innerHTML = scoreNeeded;
}

// Sets onclick functions for all buttons to null
function removeOnClicks() {
    aCircle.onclick = '';
    bCircle.onclick = '';
    cCircle.onclick = '';
    dCircle.onclick = '';
}

// Welcome function
function welcome() {
    headText.innerHTML = "Seasons Greetings!";
    questionText.innerHTML = "Welcome to the Connie Boi and Paulie Girl 2-year anniversary snake game!<br/>" +
        "Use the arrow keys to move, read the descriptions for each power-up, choose a difficulty, and begin.<br/>" +
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

    aCircle.addEventListener("click", welcomeDifficulty);
    bCircle.addEventListener("click", welcomeDifficulty);
    cCircle.addEventListener("click", welcomeDifficulty);
    dCircle.addEventListener("click", welcomeDifficulty);
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

    aCircle.removeEventListener("click", welcomeDifficulty);
    bCircle.removeEventListener("click", welcomeDifficulty);
    cCircle.removeEventListener("click", welcomeDifficulty);
    dCircle.removeEventListener("click", welcomeDifficulty);

    window.addEventListener("keydown", handler);
    dontRun = false;
    game = setInterval(draw, SPEED);
}

// Game over function
function gameOver() {
    window.removeEventListener("keydown", handler);
    gameOverStyle();

    aCircle.addEventListener("click", gameOverLogic);
    bCircle.addEventListener("click", gameOverLogic);
}

// CSS style for game over window
function gameOverStyle() {
    table.style.display = "flex";
    table.style.width = "600px";
    table.style.height = "400px";
    table.style.top = "160px";
    table.style.left = "150px";
    questionText.style.paddingBottom = "30px";
    rowOne.style.display = "table-row";
    rowTwo.style.display = "table-row";
    powerImageRow.style.display = "none";
    powerInfoRow.style.display = "none";
    circleRow.style.display = "table-row";
    rowFour.style.display = "table-row";
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

    headText.style.fontSize = "30px";
    headText.innerHTML = "You Died";
    questionText.style.fontSize = "12pt";
    questionText.innerHTML = "What are you stupid? You can do better than <span style=\"font-size:20pt; color:red\";> " + score + "</span><br><br>" +
    "<span style=\"font-size:20pt;\";>Do you want to play again?";

    aCircleText.style.fontSize = "20px";
    aCircleText.textContent = "Yes";
    bCircleText.style.fontSize = "20px";
    bCircleText.textContent = "No";
    cCircleText.textContent = "";
    dCircleText.textContent = "";

    aText.style.fontSize = "12pt";
    aText.style.marginTop = "5px";
    aText.innerHTML = "You don't have the guts";
    aDifficultyText.innerHTML = "";
    bText.style.fontSize = "12pt";
    bText.style.marginTop = "5px";
    bText.innerHTML = "Coward";
    bDifficultyText.innerHTML = "";
    cDifficultyText.innerHTML = "";
    dDifficultyText.innerHTML = "";
}

// Game over logic
function gameOverLogic(event) {
    if (event.target.id == "circle-a1") {
        defaultStyle();
        welcome();
    }
    else if (event.target.id == "circle-b1") {
        justTextStyle();
        table.style.width = "700px";
        table.style.left = "100px";
        headText.innerHTML = "BORING";

        aCircle.removeEventListener("click", gameOverLogic);
        bCircle.removeEventListener("click", gameOverLogic);

        setTimeout(function () {
            cvs.style.display = "none";
            boardCVS.style.display = "none";
            table.style.display = "none";
            scoreArea.style.display = "none";
        }, 5000);
    }
}

// Function to determine if you get power-up effects or not
function activatePower(type) {
    dontRun = true;
    clearInterval(game);
    let questionNumber = ~~(Math.random() * questions.length);
    //let questionNumber = 0;
    let validNumber = false;
    while (validNumber == false) {
        if (questionsUsed.includes(questionNumber) == false) {
            questionsUsed.push(questionNumber);
            validNumber = true;
        }
        else {
            questionNumber = ~~(Math.random() * questions.length);
        }
    }
    if (questions[questionNumber].type == "4-choice") {
        fourChoiceStyle(questions[questionNumber].choice1, questions[questionNumber].choice2,
            questions[questionNumber].choice3, questions[questionNumber].choice4, questions[questionNumber].question);
        aCircle.onclick = function () { fourChoiceLogic(type, "circle-a", questions[questionNumber].correct) };
        bCircle.onclick = function () { fourChoiceLogic(type, "circle-b", questions[questionNumber].correct) };
        cCircle.onclick = function () { fourChoiceLogic(type, "circle-c", questions[questionNumber].correct) };
        dCircle.onclick = function () { fourChoiceLogic(type, "circle-d", questions[questionNumber].correct) };
    }
    else if (questions[questionNumber].type == "3-choice") {
        threeChoiceStyle(questions[questionNumber].choice1, questions[questionNumber].choice2,
            questions[questionNumber].choice3, questions[questionNumber].question);
        aCircle.onclick = function () { threeChoiceLogic(type, "circle-a", questions[questionNumber].correct) };
        bCircle.onclick = function () { threeChoiceLogic(type, "circle-b", questions[questionNumber].correct) };
        cCircle.onclick = function () { threeChoiceLogic(type, "circle-c", questions[questionNumber].correct) };
    }
    else if (questions[questionNumber].type == "2-choice") {
        twoChoiceStyle(questions[questionNumber].question);
        aCircle.onclick = function () { twoChoiceLogic(type, "circle-a", questions[questionNumber].correct) };
        bCircle.onclick = function () { twoChoiceLogic(type, "circle-b", questions[questionNumber].correct) };
    }
    if (questionsUsed.length == questions.length) {
        questionsUsed = [];
    }
}

// Performs functions needed when getting a right answer
function rightAnswer(type) {
    justTextStyle();
    table.style.width = "300px";
    table.style.height = "300px";
    table.style.top = "210px";
    table.style.left = "300px";
    if (type != "half-speed" && type != "bonus-points") {
        powerUpLogic(type);
    }
    let timeRemaining = 5;
    headText.innerHTML = timeRemaining;
    headText.classList.add('animation-timer');
    let gameRestart = setInterval(function () {
        headText.innerHTML = timeRemaining;
        headText.classList.add('animation-timer');
        timeRemaining--;
        if (timeRemaining <= 0) {
            headText.innerHTML = "";
            headText.classList.remove('animation-timer');
            table.style.display = "none";
            if (type != "half-speed" && type != "bonus-points") {
                dontRun = false;
                game = setInterval(draw, SPEED);
            }
            else if (type == "bonus-points") {
                powerUpLogic(type);
                dontRun = false;
                game = setInterval(draw, SPEED);
            }
            else {
                powerUpLogic(type);
            }
            addPowerImageUI(type);
            clearInterval(gameRestart);
        }
    }, 1000);
}

// Disables power-up if question is answered incorrectly
function wrongAnswer(type) {
    justTextStyle();
    table.style.height = "400px";
    table.style.top = "160px";
    headText.style.fontSize = "80pt";
    headText.innerHTML = "What are you stupid?";
    if (type == "half-speed") {
        halfSpeedActive = false;
        halfSpeed = {
            x: -box,
            y: -box
        }
    }
    else if (type == "-4 length") {
        smallActive = false;
        small = {
            x: -box,
            y: -box
        }
    }
    else if (type == "bonus-points") {
        pointsActive = false;
        points = {
            x: -box,
            y: -box
        }
    }
    else if (type == "extra-tacos") {
        extraActive = false;
        extra = {
            x: -box,
            y: -box
        }
    }
    else if (type == "golden-tacos") {
        if (snake[1].x == extraOne.x && snake[1].y == extraOne.y) {
            extraOneActive = false;
            extraOne = {
                x: -box,
                y: -box
            }
        }
        else if (snake[1].x == extraTwo.x && snake[1].y == extraTwo.y) {
            extraTwoActive = false;
            extraTwo = {
                x: -box,
                y: -box
            }
        }
        else {
            extraThreeActive = false;
            extraThree = {
                x: -box,
                y: -box
            }
        }
    }
}

// Adds power-up image to UI
function addPowerImageUI(type) {
    if (type == "half-speed") {
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(speedSRC);
        }
        else {
            drawPowerImage(speedSRC);
        }
    }
    else if (type == "-4 length") {
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(smallSRC);
        }
        else {
            drawPowerImage(smallSRC);
        }
    }
    else if (type == "bonus-points") {
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(pointsSRC);
        }
        else {
            drawPowerImage(pointsSRC);
        }
    }
    else if (type == "extra-tacos") {
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(extraSRC);
        }
        else {
            drawPowerImage(extraSRC);
        }
    }
    else if (type == "golden-tacos") {
        if (drawDone == false && firstPower == true) {
            clearTimeout(powerDraw);
            revertPowerImage();
            drawPowerImage(goldenSRC);
        }
        else {
            drawPowerImage(goldenSRC);
        }
    }
}

// Applies effects of acquired power-up
function powerUpLogic(type) {
    if (type == "half-speed") {
        halfSpeedActive = false;
        halfSpeedInUse = true;
        let counter = 15;
        dontRun = true;
        clearInterval(game);
        let speedDifference = SPEED;
        SPEED *= 2;
        dontRun = false;
        game = setInterval(draw, SPEED);
        countDown = setInterval(function () {
            time.classList.add('animation');
            time.innerHTML = counter;
            counter--;
            if (counter < 0) {
                time.innerHTML = "";
                time.classList.remove('animation');
                clearInterval(countDown);
                dontRun = true;
                clearInterval(game);
                SPEED -= speedDifference;
                halfSpeedInUse = false;
                dontRun = false;
                game = setInterval(draw, SPEED);
            }
        }, 1000);
        halfSpeed = {
            x: -box,
            y: -box
        }
    }
    else if (type == "-4 length") {
        smallActive = false;
        for (let i = 1; i <= 4; i++) {
            if (snake.length > 1) {
                snake.pop();
            }
        }
        small = {
            x: -box,
            y: -box
        }
    }
    else if (type == "bonus-points") {
        pointsActive = false;
        clearTimeout(scoreTimeout);
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
    else if (type == "extra-tacos") {
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
        extra = {
            x: -box,
            y: -box
        }
    }
    else if (type == "golden-tacos") {
        if (snakeX == extraOne.x && snakeY == extraOne.y) {
            extraOneActive = false;
            goldenScore();
            extraOne = {
                x: -box,
                y: -box
            }
        }
        else if (snakeX == extraTwo.x && snakeY == extraTwo.y) {
            extraTwoActive = false;
            goldenScore();
            extraTwo = {
                x: -box,
                y: -box
            }
        }
        else if (snakeX == extraThree.x && snakeY == extraThree.y) {
            extraThreeActive = false;
            goldenScore();
            extraThree = {
                x: -box,
                y: -box
            }
        }
    }
}

// CSS style for 4-choice questions
function fourChoiceStyle(choiceOne, choiceTwo, choiceThree, choiceFour, question) {
    table.style.width = "800px";
    table.style.height = "450px";
    table.style.top = "135px";
    table.style.left = "50px";
    rowOne.style.display = "none";
    rowTwo.style.display = "table-row";
    circleRow.style.display = "table-row";
    circleRow.style.height = "48px";
    for (let i = 0; i < circleContainers.length; i++){
        circleContainers[i].style.width = "32px";
        circleContainers[i].style.height = "32px";
    }
    rowFour.style.display = "table-row";
    cCircleCell.style.display = "table-cell";
    cAnswerCell.style.display = "table-cell";
    dCircleCell.style.display = "table-cell";
    dAnswerCell.style.display = "table-cell";
    aCircle.setAttribute("class", "answer-circle-active");
    bCircle.setAttribute("class", "answer-circle-active");
    cCircle.setAttribute("class", "answer-circle-active");
    dCircle.setAttribute("class", "answer-circle-active");
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
    aDifficultyText.innerHTML = "";
    bDifficultyText.innerHTML = "";
    cDifficultyText.innerHTML = "";
    dDifficultyText.innerHTML = "";
    aCircleText.textContent = 'A';
    bCircleText.textContent = 'B';
    cCircleText.textContent = 'C';
    dCircleText.textContent = 'D';
    table.style.display = "flex";
    questionText.style.fontSize = "40pt";
    questionText.innerHTML = question;
    aText.style.marginTop = "16px";
    bText.style.marginTop = "16px";
    cText.style.marginTop = "16px";
    dText.style.marginTop = "16px";
    aText.style.fontSize = "16px";
    bText.style.fontSize = "16px";
    cText.style.fontSize = "16px";
    dText.style.fontSize = "16px";
    let answerPlacement = [];
    while(answerPlacement.length < 4){
        let current = Math.floor(Math.random() * 4) + 1;
        if(answerPlacement.indexOf(current) === -1) answerPlacement.push(current);
    }
    for (let i = 0; i < answerPlacement.length; i++) {
        if (i == 0) {
            if (answerPlacement[i] == 1) {
                aText.innerHTML = choiceOne;
            }
            else if (answerPlacement[i] == 2) {
                aText.innerHTML = choiceTwo;
            }
            else if (answerPlacement[i] == 3) {
                aText.innerHTML = choiceThree;
            }
            else {
                aText.innerHTML = choiceFour;
            }
        }
        else if (i == 1) {
            if (answerPlacement[i] == 1) {
                bText.innerHTML = choiceOne;
            }
            else if (answerPlacement[i] == 2) {
                bText.innerHTML = choiceTwo;
            }
            else if (answerPlacement[i] == 3) {
                bText.innerHTML = choiceThree;
            }
            else {
                bText.innerHTML = choiceFour;
            }
        }
        else if (i == 2) {
            if (answerPlacement[i] == 1) {
                cText.innerHTML = choiceOne;
            }
            else if (answerPlacement[i] == 2) {
                cText.innerHTML = choiceTwo;
            }
            else if (answerPlacement[i] == 3) {
                cText.innerHTML = choiceThree;
            }
            else {
                cText.innerHTML = choiceFour;
            }
        }
        else {
            if (answerPlacement[i] == 1) {
                dText.innerHTML = choiceOne;
            }
            else if (answerPlacement[i] == 2) {
                dText.innerHTML = choiceTwo;
            }
            else if (answerPlacement[i] == 3) {
                dText.innerHTML = choiceThree;
            }
            else {
                dText.innerHTML = choiceFour;
            }
        }
    }
}

// Logic for handling 4-choice questions
function fourChoiceLogic(type, id, correct) {
    removeOnClicks();
    if (id == "circle-a") {
        if (aText.innerHTML == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
    else if (id == "circle-b") {
        if (bText.innerHTML == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
    else if (id == "circle-c") {
        if (cText.innerHTML == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
    else {
        if (dText.innerHTML == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
}

// CSS style for 3-choice questions
function threeChoiceStyle(choiceOne, choiceTwo, choiceThree, question) {
    table.style.width = "700px";
    table.style.height = "400px";
    table.style.top = "160px";
    table.style.left = "100px";
    rowOne.style.display = "none";
    rowTwo.style.display = "table-row";
    circleRow.style.display = "table-row";
    circleRow.style.height = "60px";
    for (let i = 0; i < circleContainers.length - 1; i++){
        circleContainers[i].style.width = "42px";
        circleContainers[i].style.height = "42px";
    }
    rowFour.style.display = "table-row";
    cCircleCell.style.display = "table-cell";
    cAnswerCell.style.display = "table-cell";
    dCircleCell.style.display = "none";
    dAnswerCell.style.display = "none";
    aCircle.setAttribute("class", "answer-circle-active");
    bCircle.setAttribute("class", "answer-circle-active");
    cCircle.setAttribute("class", "answer-circle-active");
    aCircle.style.r = "20px";
    aCircle.style.cx = "21px";
    aCircle.style.cy = "21px";
    bCircle.style.r = "20px";
    bCircle.style.cx = "21px";
    bCircle.style.cy = "21px";
    cCircle.style.r = "20px";
    cCircle.style.cx = "21px";
    cCircle.style.cy = "21px";
    aDifficultyText.innerHTML = "";
    bDifficultyText.innerHTML = "";
    cDifficultyText.innerHTML = "";
    aCircleText.textContent = 'A';
    bCircleText.textContent = 'B';
    cCircleText.textContent = 'C';
    table.style.display = "flex";
    questionText.style.fontSize = "40pt";
    questionText.innerHTML = question;
    aText.style.marginTop = "16px";
    bText.style.marginTop = "16px";
    cText.style.marginTop = "16px";
    aText.style.fontSize = "18px";
    bText.style.fontSize = "18px";
    cText.style.fontSize = "18px";
    let answerPlacement = [];
    while(answerPlacement.length < 3){
        let current = Math.floor(Math.random() * 3) + 1;
        if(answerPlacement.indexOf(current) === -1) answerPlacement.push(current);
    }
    for (let i = 0; i < answerPlacement.length; i++) {
        if (i == 0) {
            if (answerPlacement[i] == 1) {
                aText.innerHTML = choiceOne;
            }
            else if (answerPlacement[i] == 2) {
                aText.innerHTML = choiceTwo;
            }
            else {
                aText.innerHTML = choiceThree;
            }
        }
        else if (i == 1) {
            if (answerPlacement[i] == 1) {
                bText.innerHTML = choiceOne;
            }
            else if (answerPlacement[i] == 2) {
                bText.innerHTML = choiceTwo;
            }
            else {
                bText.innerHTML = choiceThree;
            }
        }
        else {
            if (answerPlacement[i] == 1) {
                cText.innerHTML = choiceOne;
            }
            else if (answerPlacement[i] == 2) {
                cText.innerHTML = choiceTwo;
            }
            else {
                cText.innerHTML = choiceThree;
            }
        }
    }
}

// Logic for handling 3-choice questions
function threeChoiceLogic(type, id, correct) {
    removeOnClicks();
    if (id == "circle-a") {
        if (aText.innerHTML == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
    else if (id == "circle-b") {
        if (bText.innerHTML == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
    else {
        if (cText.innerHTML == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
}

// CSS style for true/false questions
function twoChoiceStyle(question) {
    table.style.width = "600px";
    table.style.height = "400px";
    table.style.top = "160px";
    table.style.left = "150px";
    rowOne.style.display = "none";
    rowTwo.style.display = "table-row";
    circleRow.style.display = "table-row";
    circleRow.style.height = "70px";
    for (let i = 0; i < circleContainers.length - 1; i++){
        circleContainers[i].style.width = "62px";
        circleContainers[i].style.height = "62px";
    }
    rowFour.style.display = "none";
    cCircleCell.style.display = "none";
    cAnswerCell.style.display = "none";
    dCircleCell.style.display = "none";
    dAnswerCell.style.display = "none";
    aCircle.setAttribute("class", "answer-circle-active");
    bCircle.setAttribute("class", "answer-circle-active");
    aCircle.style.r = "30px";
    aCircle.style.cx = "31px";
    aCircle.style.cy = "31px";
    bCircle.style.r = "30px";
    bCircle.style.cx = "31px";
    bCircle.style.cy = "31px";
    aCircleText.textContent = 'True';
    bCircleText.textContent = 'False';
    table.style.display = "flex";
    questionText.style.fontSize = "40pt";
    questionText.innerHTML = question;
}

// Logic for handling true/false questions
function twoChoiceLogic(type, id, correct) {
    removeOnClicks();
    if (id == "circle-a") {
        if (aCircleText.textContent == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
    else {
        if (bCircleText.textContent == correct) {
            rightAnswer(type);
        }
        else {
            wrongAnswer(type);
            setTimeout(function () {
                table.style.display = "none";
                dontRun = false;
                game = setInterval(draw, SPEED);
            }, 3000);
        }
    }
}