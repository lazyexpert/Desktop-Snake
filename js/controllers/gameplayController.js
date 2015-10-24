"use strict";

let gameplayController = {
  canvasSelector : '.gameboard',
  cellSize : 30,
  strokeWidth : 5,
  strokeColor : "black",
  fillColors : {
    0 : "yellow",
    1 : "white",
    2 : "red",
    3 : "green"
  },
  renderingInterval : null,
  fps : 100,
  realfps: 0,
  currfps: 0,
  score : 0,
  lastTimeRedraw: null,
  init: function(){
    this.score = 0;
    this.startRendering();

    document.addEventListener('defeat', this.onDefeat.bind(this));
  },
  onDefeat : function() {
    alert('defeat!');
  },
  renderCanvas : function() {


    this.renderCanvasFill(gameboard.board);
    this.renderCanvasStroke(gameboard.board);
    this.refreshScore();

    // If last redraw was within the last second
    if(new Date().getTime() - this.lastTimeRedraw < 1000 )
      // Count fps
      this.currfps++;
    else {
      this.lastTimeRedraw = new Date().getTime(); // milliseconds storage
      this.realfps = this.currfps;
      this.currfps = 0;
      this.refreshFps();
    }

  },
  refreshScore : function() {
    let scoreLbl = getElement('.score-label');

    if( scoreLbl.innerHTML != this.score )
      scoreLbl.innerHTML = this.score;
  },
  refreshFps : function() {
    let fpsVal = getElement('.fps-val');

    if( fpsVal.innerHTML != this.realfps )
      fpsVal.innerHTML = this.realfps;
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
    // Free cells
    let freeCells = gameboard.getFreeCells();//[];
    // board.forEach(function(row) {
    //   freeCells = freeCells.concat(row.filter( cell => cell.busy == 0 ));
    // });

    renderCellsFill( freeCells, self.fillColors[0] );

    // Busy cells - actually the snake body
    let busyCells = snake.body;
    // [];
    //
    // board.forEach(function(row) {
    //   busyCells = busyCells.concat(row.filter( cell => cell.busy == 1 ));
    // });
    //
    // if( busyCells.length )
    renderCellsFill( busyCells, self.fillColors[1] );

    // Snake head
    renderCellsFill( [snake.head], self.fillColors[2]);

    // Apples
    renderCellsFill( apples.displayed, self.fillColors[3]);
  },
  startRendering : function() {
    this.currfps = 0;
    this.lastTimeRedraw = new Date().getTime(); // milliseconds storage

    this.renderingInterval = setInterval( this.renderCanvas.bind(this), 1000/this.fps);
  },
  stopRendering : function() {
    if( this.renderingInterval )
      clearInterval(this.renderingInterval);
  }

};
