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
  move(direction) {
    let Up = direction == "KeyW" || direction == "ArrowUp"
    let Right = direction == "KeyD" || direction == "ArrowRight"
    let Down = direction == "KeyS" || direction == "ArrowDown"
    let Left = direction == "KeyA" || direction == "ArrowLeft"

    let GoingUp = this.iSpeed == 0 && this.jSpeed == -w 
    let GoingRight = this.iSpeed == w && this.jSpeed == 0 
    let GoingDown = this.iSpeed == 0 && this.jSpeed == w
    let GoingLeft =  this.iSpeed == -w && this.jSpeed == 0
    
    if(Up && !GoingDown) {
      startGame = true;
      this.iSpeed = 0;
      this.jSpeed = -w;
    } else if (Right && !GoingLeft) {
      startGame = true;
      this.iSpeed = w;
      this.jSpeed = 0;
    } else if (Down && !GoingUp) {
      startGame = true;
      this.iSpeed = 0;
      this.jSpeed = w
    } else if (Left && !GoingRight || startGame === false) { // need start game false cause snake goes right from the beginning 
      startGame = true;
      this.iSpeed = -w;
      this.jSpeed = 0; 
    }
  }
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