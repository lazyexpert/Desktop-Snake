"use strict";
let gamePlayObserver = {
  gameStarted : false,
  menuWrapperSelector : '.menu-wrapper',
  gameWrapperSelector : '.gameplay-wrapper',
  initListeners : function() {
    document.addEventListener('menuClick', this.router.onMenuClick.bind(this));
    document.addEventListener('continueClick', this.router.onContinueClick.bind(this));
    document.addEventListener('newGameClick', this.router.onNewGameClick.bind(this));
    document.addEventListener('highScoresClick', this.router.onHighScoresClick.bind(this));
    document.addEventListener('rulesClick', this.router.onRulesClick.bind(this));
    document.addEventListener('optionsClick', this.router.onOptionsClick.bind(this));
    document.addEventListener('exitClick', this.router.onExitClick.bind(this));
    document.addEventListener('keydown', this.onKeyboardClick.bind(this));

    this.onLoad();
  },
  onLoad : function() {
    hideElements([
      getElement(this.gameWrapperSelector)
    ]);
  },
  router : {
    onMenuClick : function() {
      // Hide all wrappers
      hideElements([
        getElement(this.gameWrapperSelector)
      ]);

      // Show menu wrapper
      showElements([
        getElement(this.menuWrapperSelector)
      ]);

      // Stop rendering canvas
      gameplayController.stopRendering();

      // Snake un init
      snake.clear();
    },
    onContinueClick : function() {
      // Hide menu wrapper
      // Show gameplay wrapper with old session

      // Start rendering canvas
      gameplayController.init();
    },
    onNewGameClick : function() {
      // Re init gameboard
      gameboard.initBoard();

      // Hide menu wrapper
      hideElements(getElement(this.menuWrapperSelector));

      // Show gameplay wrapper with new session
      showElements(getElement(this.gameWrapperSelector));

      // Start rendering canvas
      gameplayController.init();

      // Snake init
      snake.init();

      // Apples init
      apples.init();
    },
    onHighScoresClick : function() {
      // Hide menu wrapper
      // Show HighScoresWrapper
    },
    onRulesClick : function() {
      // Hide menu wrapper
      // Show Rules wrapper
    },
    onOptionsClick : function() {
      // Hide menu wrapper
      // Show Options wrapper
    },
    onExitClick : function() {
      // Hide all wrappers
      // Show bye etc..
      // And after - close
      close();
    }
  },
  onKeyboardClick : function(e) {
    let direction = '';

    switch (e.which) {
      case 37:
        direction = "left";
        if( snake.direction === "right")
          return;
        break;
      case 38:
        direction = "up";
        if( snake.direction === "down" )
          return;
        break;
      case 39:
        direction = "right";
        if( snake.direction === "left" )
          return;
        break;
      case 40:
        direction = "down";
        if( snake.direction === "up" )
          return;
        break;
      default:
        break;
    }
    snake.setDirection(direction);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  document.dispatchEvent( new Event('appLoad') );
  gamePlayObserver.initListeners();
}.bind(this));
