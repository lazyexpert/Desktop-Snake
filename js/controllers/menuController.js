"use strict";

let menuController = {
  menuButtonSelector : '.menu-button',
  menuContainerSelector : '.menu-wrapper',
  menuSelector : '.menu',
  menuItemSelector : '.menu-item',
  handlersAdded : false,
  show : function() {
    let items = getElements(this.menuItemSelector);
    items[0].innerText = translate.get('Continue');
    items[1].innerText = translate.get('New Game');
    items[2].innerText = translate.get('High Scores');
    items[3].innerText = translate.get('Rules');
    items[4].innerText = translate.get('Options');
    items[5].innerText = translate.get('Exit');

    showElements(getElement(this.menuContainerSelector));

    if( gamePlayObserver.gameStarted )
      showElements(items[0]);
    else
      hideElements(items[0]);
  },
  hide : function() {
    hideElements(getElement(this.menuContainerSelector));
  },
  addHandlers : function() {
    let items = getElements( this.menuItemSelector );

    // Continue click
    items[0].addEventListener('click',
      () => document.dispatchEvent(new Event('continueClick')));

    // New Game click
    items[1].addEventListener('click',
      () => document.dispatchEvent(new Event('newGameClick')));

    // High Scores click
    items[2].addEventListener('click',
      () => document.dispatchEvent(new Event('highScoresClick')));

    // Rules click
    items[3].addEventListener('click',
      () => document.dispatchEvent(new Event('rulesClick')));

    // Options click
    items[4].addEventListener('click',
      () => document.dispatchEvent(new Event('optionsClick')));

    // Exit click
    items[5].addEventListener('click',
      () => document.dispatchEvent(new Event('exitClick')));

    // Menu click
    getElement(this.menuButtonSelector).addEventListener('click',
      () => document.dispatchEvent(new Event('menuClick')));

  },
  onload : function() {
    this.addHandlers();
    this.show();
  },
  init : function(){
    document.addEventListener('appLoad', this.onload.bind(this) )
  }
};

menuController.init();
