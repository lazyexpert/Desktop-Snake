"use strict";

function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

function hideElements( elements ) {
  if(Array.isArray(elements))
    elements.forEach( el => el.style.display = "none" );
  else
    elements.style.display = "none";
}

function showElements( elements ) {

  if( Array.isArray(elements) )
    elements.forEach( el => el.style.display = "");
  else
    elements.style.display = "";
}
