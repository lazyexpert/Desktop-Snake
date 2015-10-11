"use strict";

let snake = {
  body : [],
  direction : "right",
  head : null,
  speed : 1,
  maxSpeed : 10,
  minSpeed : 1,
  snakeInterval : null,
  init : function() {
    this.setDefaults();
    this.startMoving();
  },
  setDirection : function( direction ) {
    this.direction = direction;
  },
  clear : function() {
    this.stopMoving();
  },
  upSpeed : function() {
    if (this.speed !== this.maxSpeed) {
      ++this.speed;
      this.onSpeedChange();
    }
  },
  resetSpeed : () => this.speed = this.minSpeed,
  onSpeedChange : function() {
    this.stopMoving();
    this.startMoving();
  },
  makeMove : function() {
    switch(this.direction) {
      case "right" :
        this.makeMoveRight();
        break;
      case "left" :
        this.makeMoveLeft();
        break;
      case "up" :
        this.makeMoveUp();
        break;
      case "down" :
        this.makeMoveDown();
        break;
      default :
        throw( new Error('unrecognized direction'));
    }
  },
  makeMoveRight : function() {
    this.moveAction(this.head.row, this.head.col + 1 );
  },
  makeMoveLeft : function() {
    this.moveAction( this.head.row, this.head.col - 1 );
  },
  makeMoveUp : function() {
    this.moveAction( this.head.row - 1, this.head.col );
  },
  makeMoveDown : function() {
    this.moveAction( this.head.row + 1, this.head.col );
  },
  moveAction : function(row,col) {
    if( this.canMove(row,col) ) {
      this.addFirstCell();
      this.head = gameboard.board[row][col];
      if( !this.hasApple(this.head) ) this.removeLastCell();

      gameboard.setCellHead(row,col);

    } else {
      // gameplayController catches
      document.dispatchEvent(new Event('defeat'));
      this.clear();
    }
  },
  canMove : function(row, col) {
    if( row >= 0 && row < gameboard.width && col >= 0 && col < gameboard.height ) {
      let cell = gameboard.board[row][col];
      return cell.busy === 1 ? false : true;
    } return false;
  },
  hasApple : function(cell) {
    return cell.busy === 3 ? true : false;
  },
  addFirstCell : function() {
    // Actually its always head
    if( this.body.length ) {
      this.body.splice( 0, 0, this.head );
      gameboard.setCellBusy( this.head.row, this.head.col );
    }
  },
  removeLastCell : function() {
    if( this.body.length ) {
      let cell = this.body.pop();
      gameboard.setCellFree(cell.row, cell.col);
    }
  },
  startMoving : function() {
    this.snakeInterval = setInterval( function(){
      this.makeMove();
    }.bind(this), 1000/this.speed);
  },
  stopMoving : function() {
    if( this.snakeInterval )
      clearInterval( this.snakeInterval );
  },
  setDefaults : function() {
    this.direction = "right";
    this.body = [];
    this.body.push( gameboard.setCellBusy(0,4) );
    this.body.push( gameboard.setCellBusy(0,3) );
    this.body.push( gameboard.setCellBusy(0,2) );
    this.body.push( gameboard.setCellBusy(0,1) );
    this.body.push( gameboard.setCellBusy(0,0) );
    this.head = gameboard.setCellHead(0,5);
  }
}
