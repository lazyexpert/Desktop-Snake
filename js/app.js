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
  },
  router : {
    onMenuClick : function() {
      // Hide all wrappers
      // Show menu wrapper

      // Stop rendering canvas
      gameplayController.stopRendering();
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
  }
};

document.addEventListener('DOMContentLoaded', function() {
  document.dispatchEvent( new Event('appLoad') );
  gamePlayObserver.initListeners();
}.bind(this));
