"use strict";

let translate = {
  languages : [
    "ua",
    "ru",
    "en",
  ],
  messages : {
    "Continue" : {
      "en" : "Continue",
      "ru" : "Продолжить",
      "ua" : "Продовжити"
    },
    "New Game" : {
      "en" : "New Game",
      "ru" : "Новая игра",
      "ua" : "Нова гра"
    },
    "High Scores" : {
      "en" : "High Scores",
      "ru" : "Рекорды",
      "ua" : "Рекорди"
    },
    "Rules" : {
      "en" : "Rules",
      "ru" : "Правила",
      "ua" : "Правила"
    },
    "Options" : {
      "en" : "Options",
      "ru" : "Настройки",
      "ua" : "Налаштування"
    },
    "Exit" : {
      "en" : "Exit",
      "ru" : "Рекорды",
      "ua" : "Рекорди"
    }
  },
  lang : 'en',
  get : function(msg){
     return this.messages[msg][this.lang];
  },
  setLang : function(lang) {
    if( ~this.languages.indexOf(lang) )
      return this.lang = lang;
    else return -1;
  },
  getLang : function() {
    return this.lang;
  }
};
