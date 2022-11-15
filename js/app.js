'use strict';

let recipeArray = [];

let recipeContainer = document.getElementById('recipeContainer');

let selectorRecipe = document.getElementById('selectorRecipe');

let recipeName = document.getElementById('recipeName');

let recipeIng = document.getElementById('recipeIng');

function Recipe(name, ingredients, fileExtension) {
  this.name = name;
  this.ingredients = ingredients;
  this.imagePath = `img/${name}.${fileExtension}`;
}

Recipe.prototype.render = function () {
  let ulElem = document.createElement('ul');
  recipeContainer.appendChild(ulElem);
  let liElem = document.createElement('li');
  liElem.textContent = this.name;
  ulElem.appendChild(liElem);


  recipeArray.push(this);
}

// push
let test = new Recipe('hello');

test.render();