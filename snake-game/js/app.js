//get canvas, width of canvas, height of canvas
const mCanvas = document.getElementById('myCanvas');
const mtx = mCanvas.getContext("2d");
const width = mCanvas.offsetWidth;
const height = mCanvas.offsetHeight;

let w = 20;// number to which snake is going to move and size for each column/row
const cols = width/w;
const rows = height/w;

let speed = 200;
let startGame = false;
let tailIncresedBy = 1;

let snake;

//get from DOM
const gameOver = document.getElementById('gameover');
const totalScore = document.getElementById('totalScore');
const gameoverBtn = document.getElementById('gameoverBtn');

// --------- Snake class--------- //
class Snake {
  constructor(){
    this.i = (Math.floor(Math.random() * rows -1) +1) * w; // мб изменить
    this.j = (Math.floor(Math.random() * cols -1) +1) * w; // мб изменить
    this.iSpeed = w;
    this.jSpeed = 0;
    this.totalEaten = 0;
    this.tail = [];
  }
  stopGame() {
    gameOver.style.display = 'flex';
    startGame = false;
    this.totalEaten = 0;
    this.tail = [];
  }
  draw(){
    //draw the snake
    mtx.fillStyle = "green";
    // draw rect for each cell in tail
    for(let i = 0; i < this.tail.length; i++) {
      mtx.fillRect(this.tail[i].i, this.tail[i].j, w, w);
    }
    // draw snakes current position
    mtx.fillRect(this.i, this.j, w, w);
  }
  update() {
    if(startGame === true) {
       // shift cell in tail array
    for(let i = 0; i < this.tail.length -1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    //add cell to and array
    this.tail[this.totalEaten -1] = {i: this.i, j: this.j}

    //update the snake position on canvas, update will be called with intervals
    this.i += this.iSpeed;
    this.j += this.jSpeed;

    // If snake reaches the end of canvas set tail to 0
    if (this.i > width) {
      this.i = 0;
      if(this.i === 0) {
      this.stopGame();
      setup()
      } 
    } else if (this.j > height) {
      this.j = 0;
      if(this.j === 0) {
       this.stopGame();
       setup()
      } 
    } else if (this.i < -20) {
      this.i = width;
      if(this.i === width) {
      this.stopGame();
      setup()
      } 
    } else if (this.j < -20) {
      this.j = height;
      if(this.j === height) {
       this.stopGame();
       setup()
      } 
    }
    }
  }
  // When arrow is pressed
  moveUp() {
    //if snake is already going down ,do not go up/ else go up
    if(this.iSpeed !== 0 && this.jSpeed !== w || startGame === false) {
      startGame = true;
      this.iSpeed = 0;
      this.jSpeed = -w
    }
  }
  moveRight(){
    //if snake is already going left ,do not go right/ else go right
    if(this.iSpeed !== -w && this.jSpeed !== 0 || startGame === false) {
      startGame = true;
      this.iSpeed = w;
      this.jSpeed = 0;
    }
 
  }
  moveDown(){
    //if snake is already going up ,do not go down/ else go down
    if(this.iSpeed !== 0 && this.jSpeed !== -w || startGame === false) {
      startGame = true;
      this.iSpeed = 0;
      this.jSpeed = w
    }
  }
  moveLeft(){
    //if snake is already going right ,do not go left/ else go left
      if(this.iSpeed !== w && this.jSpeed !== 0 || startGame === false) {
        startGame = true;
        this.iSpeed = -w;
        this.jSpeed = 0; 
      }
  }
  //when snake eats an apple changes the location 
  eat(apple){
    if(this.i === apple.i && this.j === apple.j) {
      this.totalEaten += tailIncresedBy;
      return true;
    } else {
      return false;
    }
  }
  eatTail() {
    for (let i = 0; i < this.tail.length; i++) {
     let iDistance = Math.abs(this.i - this.tail[i].i);
     let jDistance = Math.abs(this.j - this.tail[i].j);
     //if distance btw snake's head and snake's tail is = 0, set tail to 0
     if(iDistance < 1 && jDistance < 1) {
       this.totalEaten = 0;
       this.tail = [];
     }
    }
  }
}
// --------- Snake class end--------- //

// Keaboard events and click event
function moveK(e) {
  // When top arrow is pressed 
 if(e.isComposing || e.keyCode === 38) {
 snake.moveUp();
 }
// When right arrow is pressed 
 else if (e.isComposing || e.keyCode === 39) {
  snake.moveRight();
 }
// When down arrow is pressed 
 else if (e.isComposing || e.keyCode === 40) {
  snake.moveDown();
 }
// When left arrow is pressed 
 else if (e.isComposing || e.keyCode === 37) {
  snake.moveLeft();
 }
}
window.addEventListener("keydown", moveK);

gameoverBtn.addEventListener('click', () => {
  gameOver.style.display = 'none';
})

// --------- Apple class--------- //
class Apple {
  constructor() {
    this.i;
    this.j;
  }
  appleLocation() {
    this.i = (Math.floor(Math.random() * rows -1) +1) * w; //generate random place 
    this.j = (Math.floor(Math.random() * cols -1) +1) * w; 
  }
  draw() {
    mtx.fillStyle = "red";
    mtx.fillRect(this.i, this.j, w ,w)
  }
}
// --------- Apple class End --------- //

// create a snake obj and apple obj,call function on them

let interval; // for turning interval on and off

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

