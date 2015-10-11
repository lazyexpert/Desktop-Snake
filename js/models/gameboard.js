"use strict";

/*
 * Each cell has information:
 * Busy or not, cell's row and cell's number
 */
let gameboard = {
  board : [],
  height: 20,
  width : 20,
  direction : "right",
  initBoard : function() {
    function createRow(rowNum) {
      let row = [];

      for( let t = 0; t < this.width ; t++ )
        row.push(createCell.call(this,rowNum, t));

      return row;
    }

    function createCell(row, col) {
      return {
        busy : 0,
        row : row,
        col : col
      };
    }

    function createBoard() {
      let board = [];

      for( let t = 0; t < this.height; t++)
        board.push(createRow.call(this,t));

      return board;
    }

      this.board = createBoard.call(this);
  },
  setCellBusy : function(row,col) {    
    this.board[row][col].busy = 1;
    return this.board[row][col];
  },
  setCellFree : function(row,col) {
    this.board[row][col].busy = 0;
    return this.board[row][col];
  },
  setCellHead : function(row,col) {
    this.board[row][col].busy = 2;
    return this.board[row][col];
  },
  setCellApple : function(row,col)  {
    this.board[row][col].busy = 3;
    return this.board[row][col];
  }
};

gameboard.initBoard();
