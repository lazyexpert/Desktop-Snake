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
  }
};

gameboard.initBoard();
