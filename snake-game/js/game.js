//get canvas, width of canvas, height of canvas
const mCanvas = document.getElementById('myCanvas');
const mtx = mCanvas.getContext("2d");
let width = mCanvas.offsetWidth;
let height = mCanvas.offsetHeight;

let w = 20;// number to which snake is going to move and size for each column/row
let cols = width/w;
let rows = height/w;

let speed = 200;
let startGame = false;
let tailIncresedBy = 1;
let snake;

// Keaboard events and click event
window.addEventListener("keydown", (e) => {
  snake.move(e.code);
});
      //if snake touches the wall game is over
const gameoverBtn = document.getElementById('gameoverBtn');
const gameOver = document.getElementById('gameover');
gameoverBtn.addEventListener('click', () => {
  gameOver.style.display = 'none';
})

// create a snake obj and apple obj,call function on them
let interval; // for turning interval on and off
const totalScore = document.getElementById('totalScore');

function setup() { // setup snake and apple on canvas
  snake = new Snake();
  apple = new Apple();
  apple.appleLocation();
}
setup()

function start() { // start the interval
  interval = window.setInterval(() => {
    // clear the pass of the snake each interval
    mtx.clearRect(0, 0, width, height);
    //call update and draw each interval
    apple.draw();
    snake.draw();
    snake.eatTail();
    //when snake eats an apple changes the location and increase score
    if (snake.eat(apple)) {
      apple.appleLocation();
      totalScore.innerHTML = snake.tail.length +1;
    }
    if(startGame !== false) {
      snake.update();
    } 
  }, speed);
}
start()

function stop() { //stop the interval
  clearInterval(interval);
}

//change snakes speed;
const spButtons = document.querySelectorAll('.sp-button');
spButtons.forEach(button => {
  button.addEventListener('click', () => {
    spButtons.forEach(btn => btn.classList.remove('sp-button--active'));
    if(button.id === 'sp1') {
      stop();
      speed = 200;
      console.log(speed);
      start();
      button.classList.add('sp-button--active');
    } else if (button.id === 'sp2') {
      stop();
      speed = 100;
      console.log(speed);
      start();
      button.classList.add('sp-button--active');
    } else if (button.id === 'sp3') {
      stop();
      speed = 50;
      console.log(speed);
      start();
      button.classList.add('sp-button--active');
    }
  });
}); 

