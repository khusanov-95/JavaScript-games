//----------------------Maze generator--------------------// 

//get canvas, width of canvas, height of canvas
const mCanvas = document.getElementById('mazeCanvas');
const mtx = mCanvas.getContext("2d");
const width = mCanvas.offsetWidth;
const height = mCanvas.offsetHeight;

// steps counter
let counter = 0;

//initialize columns, rows, width/height of cell, empty grid and current(for current cell)
let cols;
let rows;
let w = 80;
let grid = [];
let current;

//general function for Maze
function Maze(i,j){
  this.i = i;//col number
  this.j = j;//row number
  this.walls = [true,true,true,true];
  this.visited = false;// at the beginning all cells are not visited

  //play buttons
  this.moveUp = function (){
    let top = grid[index(i,j-1)];
    if(top && this.walls[0] !== true) {
      counter++;
      return top;
    } else {
      return current
    }
  }
  this.moveRight = function (){
    let right = grid[index(i+1,j)];
    if(right && this.walls[1] !== true) {
      counter++;
      return right;
    } else {
      return current
    }
  }
  this.moveDown = function (){
    let bottom = grid[index(i,j +1)];
    if(bottom && this.walls[2] !== true) {
      counter++;
      return bottom;
    } else {
      return current
    }
  }
  this.moveLeft = function (){
    let left = grid[index(i-1,j)];
    if(left && this.walls[3] !== true) {
      counter++;
      return left;
    } else {
      return current
    }
  }
  //check neighbors function
  this.checkNeighbors = function(){
    const neighbors = [];
    let top = grid[index(i,j-1)];
    let right = grid[index(i+1,j)];
    let bottom = grid[index(i,j +1)];
    let left = grid[index(i-1,j)];
    if(top && !top.visited) {
      neighbors.push(top)
    }
    if(right && !right.visited) {
      neighbors.push(right)
    }
    if(bottom && !bottom.visited) {
      neighbors.push(bottom)
    }
    if(left && !left.visited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * neighbors.length);
      return neighbors[random]
    } else {
      return undefined
    }
  }
  //highligt the current cell
  this.highlight = function (){
    const x = this.i*w;
    const y = this.j*w;
    // mtx.beginPath();
    mtx.fillStyle = "rgba(0,255,255,100)";
    mtx.fillRect(x+3, y+3, w-6, w-6);
  }
  //highlight the finish cell
  this.finishColor = function () {
    const x = this.i*w;
    const y = this.j*w;
    // mtx.beginPath();
    mtx.fillStyle = "green";
    mtx.fillRect(x+3, y+3, w-6, w-6);
  }
  //show wall for each side and show visited rectangle
  this.show = function() { 
    const x = this.i*w;
    const y = this.j*w;
    mtx.strokeStyle = "#000000"
  if(this.walls[0]){ // top wall
    mtx.beginPath();
    mtx.moveTo(x, y);
    mtx.lineTo(x+w, y);
    mtx.stroke();
  } 
  if(this.walls[1]){ // right wall
    mtx.beginPath();
    mtx.moveTo(x+w, y);
    mtx.lineTo(x+w, y+w);
    mtx.stroke();
  } 
  if(this.walls[2]){ // bottom wall
    mtx.beginPath();
    mtx.moveTo(x+w, y+w);
    mtx.lineTo(x, y+w);
    mtx.stroke();
  } 
  if(this.walls[3]){ // left wall
    mtx.beginPath();
    mtx.moveTo(x, y+w);
    mtx.lineTo(x, y);
    mtx.stroke();
  }
  if(this.visited){ // draw a rectangle on visited cell
    mtx.beginPath();
    mtx.fillStyle = "yellow";
    mtx.fillRect(x, y, w, w);
  }  
  }
}
// formula for check neighbors function
function index(i, j){
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
    return -1;
  }
  return i + j * cols;
}

//setup function which will create cells in canvas
function setup(){
cols = Math.floor(width/w);
rows = Math.floor(height/w);
//for each column in each row create a cell
for (let rn = 0; rn < rows; rn++){
  for(let cn = 0; cn < cols; cn++){
    const cell = new Maze(cn,rn);
    grid.push(cell);
  }
  current = grid[0]; 
}
}
setup()

let stack = [grid[0]]; // возможно нужно изменить, оставил времмено что бы стак не был пуст в начале - нужно для работы for loop в draw()

//draw function which will draw walls, and implement recursive backtracker in order to: visit all cell, remove walls, and create ready for play maze
function draw(){
  for( let i = 0; i < grid.length; i++){
    grid[i].show();
  }
//  -------- Recuresive backtracker ------------
  //Given a current cell as a parameter,mark the current cell as visited
    current.visited = true;
    current.highlight();
  //While the current cell has any unvisited neighbour cells
    //If the current cell has any neighbors which have not been visited
      let next = current.checkNeighbors();
      if(next){
        //choose randomly one of the unvisited neiaghbours
        next.visited = true;
        //Push the current cell to the stack
        stack.push(current);
        //Remove the wall btw the current cell and the chosen cell
        removeWalls(current, next);
        //Make the chosen cell curent and mark as visited
        current = next;
      }
    //Else if stack is not empty
      else if(stack.length > 0) {
        //Pop a cell from the stack and make it the current cell
        current = stack.pop();
      }
  
  // recursive call
  // window.requestAnimationFrame(() => {
  //   this.draw()      ---- animation for seeing how maze is being generated
  // });
 
  
}
// draw();
// while stack is greater than 0 continue calling draw function -- this will draw ready for play maze
for(let i = 0; stack.length > 0; i++){
  draw();
}
//initialize and highlight finish cell
let finish = grid[grid.length - 1];
finish.finishColor();

// remove walls for visited cell 
function removeWalls(a,b) {
  let x = a.i - b.i;
  if(x === 1){
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j -b.j;
  if(y === 1){
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

//----------------------Play the maze--------------------// 

// get winning message and button
const winMsg = document.getElementById('win-msg');
const winMsgBtn = document.querySelector('#win-msg button');
//get steps
const steps = document.getElementById('steps');
//get start and select difficulty buttons 
const difficulty = document.getElementById('select');
const startGame = document.getElementById('start');

//function for playing game with arrow keys 
function moveK(e) {
   // When top arrow is pressed 
   if(e.isComposing || e.keyCode === 38) {
    current.show();
    current = current.moveUp();
    current.highlight();   
    if(current === finish){
      finishGame();
    } 
  }
// When right arrow is pressed 
  else if (e.isComposing || e.keyCode === 39) {
    current.show();
    current = current.moveRight();
    current.highlight();
    if(current === finish){
      finishGame();
    }
  }
// When down arrow is pressed 
  else if (e.isComposing || e.keyCode === 40) {
    current.show();
    current = current.moveDown();
    current.highlight();
    if(current === finish){
      finishGame();
    }
  }
// When left arrow is pressed 
  else if (e.isComposing || e.keyCode === 37) {
    current.show();
    current = current.moveLeft();
    current.highlight();
    if(current === finish){
      finishGame();
    }
  }
}
//add function as event listener to window
window.addEventListener("keydown", moveK);

//finish game function
function finishGame() {
 //show winning message
 winMsg.classList.remove('dnone');
 //count steps
 steps.innerText = counter;
 counter = 0;
 //disable arrow keys
 window.removeEventListener("keydown", moveK);
}

// decrease with and height for different difficulties
difficulty.addEventListener('change',(e) => {
  if(e.target.value === 'medium') {
    w = 40;
  } else if (e.target.value === 'hard') {
    w = 20; // too slow
  } else {
    w = 80;
  }
});

// generate new maze
startGame.addEventListener('click', () => {
  grid = [];
  setup()
  stack = [grid[0]]; // изменить, оставил времмно что бы стак не был пуст в начале - нужно для работы for loop в draw()
  current.show();
  finish = grid[grid.length - 1];
  for(let i = 0; stack.length > 0; i++){
    draw();
  }
  current.highlight();
  finish.finishColor();
});

//close winning msg and add eventlistener to arrow keys
winMsgBtn.addEventListener('click', () => {
  winMsg.classList.add('dnone');
  current = grid[0];
  current.highlight();
  finish.finishColor();
  window.addEventListener("keydown", moveK);
})