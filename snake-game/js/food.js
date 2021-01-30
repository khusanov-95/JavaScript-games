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