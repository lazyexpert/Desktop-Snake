"use strict";

let gameplayController = {
  canvasSelector : '.gameboard',
  cellSize : 30,
  strokeWidth : 5,
  strokeColor : "black",
  fillColors : {
    0 : "yellow",
    1 : "black",
    2 : "red"
  },
  renderingInterval : null,
  fps : 25,
  init: function(){
    this.startRendering();
  },
  renderCanvas : function() {
    this.renderCanvasFill(gameboard.board);
    this.renderCanvasStroke(gameboard.board);
  },
  renderCanvasStroke : function(board) {
    function renderCell(cell) {
      let size = this.cellSize;
      let x = cell.col * size;
      let y = cell.row * size;
      context.rect(x, y, size , size );
    }

    function renderRow(row) {
      row.forEach(cell=>renderCell.call(this,cell));
    }

    let context = getElement(this.canvasSelector).getContext('2d');
    context.beginPath();
    board.forEach(row => renderRow.call(this,row));
    context.strokeWidth = this.strokeWidth;
    context.strokeStyle = this.strokeColor;
    context.stroke();
  },
  renderCanvasFill : function(board) {
    var self = this;
    function renderCellsFill(cells, color) {
      context.beginPath();
      cells.forEach( (cell) => {
        let size = self.cellSize;
        let x = cell.col * size;
        let y = cell.row * size;
        context.rect(x, y, size, size);
      });
      context.fillStyle = color;
      context.fill();
    }

    let context = getElement(self.canvasSelector).getContext('2d');

    // Spread into different fills
    let freeCells = [];
    board.forEach(function(row) {
      freeCells = freeCells.concat(row.filter( cell => cell.busy == 0 ));
    });

    renderCellsFill( freeCells, self.fillColors[0] );

    let busyCells = []
    board.forEach(function(row) {
      busyCells = busyCells.concat(row.filter( cell => cell.busy == 1 ));
    });

    renderCellsFill( busyCells, self.fillColors[1] );

    let head = [];
    board.forEach( function(row) {
      busyCells = busyCells.concat(row.filter( cell => cell.busy == 2 ));
    });

    renderCellsFill( head, self.fillColors[2]);
  },
  startRendering : function() {
    this.renderingInterval = setInterval( function() {
      this.renderCanvas();
    }.bind(this), 1000/this.fps);
  },
  stopRendering : function() {
    if( this.renderingInterval )
      clearInterval(this.renderingInterval);
  }

};
