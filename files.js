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

const threeAudioSRC = 'img/3-bar.webp';
const twoAudioSRC = 'img/2-bar.webp';
const oneAudioSRC = 'img/1-bar.webp';
const noAudioSRC = 'img/silent.webp';

// Loads needed audio files
const welcomeHey = new Audio('audio/hey.mp3');
const gameStart = new Audio('audio/start.mp3');
const bell = new Audio('audio/bell.mp3');
bell.volume = 0.75;
const goldenAudio = new Audio('audio/like.mp3');
const goldenSpawnAudio = new Audio('audio/what.mp3');
const bonusAudio = new Audio('audio/cheer.mp3');
const smallAudio = new Audio('audio/small.mp3');
const halfSpeedAudio = new Audio('audio/half.mp3');
const fart = new Audio('audio/fart.mp3');
const clickBass = new Audio('audio/click_bass.mp3');
const correctAudio = new Audio('audio/correct.mp3');
const clockShort = new Audio('audio/clock_5.mp3');
const clockLong = new Audio('audio/clock_15.mp3');
const endGameOne = new Audio('audio/end_game1.mp3');
const endGameTwo = new Audio('audio/end_game2.mp3');
const endGameThree = new Audio('audio/end_game3.mp3');
clockLong.volume = 0.65;
const music = new Audio('audio/music.mp3');

const soundEffects = [welcomeHey, gameStart, bell, goldenAudio, goldenSpawnAudio, bonusAudio, smallAudio, halfSpeedAudio,
    fart, clickBass, correctAudio, clockShort, clockLong, endGameOne, endGameTwo, endGameThree];