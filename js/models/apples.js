"use strict";

let apples = {
  displayedApples : 3,
  displayed : [],
  addApple : function() {
    let freeCells = gameboard.getFreeCells();
    let random = getRandomInt(0, freeCells.length-1);
    let cell = freeCells[random];
    gameboard.setCellApple(cell.row, cell.col);
    this.displayed.push(cell);
  },
  init : function() {
    this.displayed = [];
    
    for( let t = 0; t < this.displayedApples; t++ )
      this.addApple();
  },
  removeApple : function(row,col) {
    let index = 0;
    for( var t = 0; t < this.displayed.length; t++ ) {
      if( this.displayed[t].row == row && this.displayed[t].col == col) {
        index = t;
        break;
      }
    }
    this.displayed.splice(index, 1);
  },
  checkApples : function() {
    if( this.displayed.length < this.displayedApples ) {
      this.addApple();
    }
  }
};
