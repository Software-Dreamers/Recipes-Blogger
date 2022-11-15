'use strict';
// Global Varible
let recipeArray = [];

// DOM REFERENCES

let recipeContainer = document.getElementById('recipeContainer');

let selectorRecipe = document.getElementById('selectorRecipe');

let recipeName = document.getElementById('recipeName');

let recipeIng = document.getElementById('recipeIng');

function Recipe(name, ingredients, fileExtension) {
  this.name = name;
  this.ingredients = ingredients;
  this.imagePath = `img/${name}.${fileExtension}`;
  recipeArray.push(this);
}

Recipe.prototype.render = function () {
  let ulElem = document.createElement('ul');
  recipeContainer.appendChild(ulElem);
  let liElem = document.createElement('li');
  liElem.textContent = this.name;
  ulElem.appendChild(liElem);
};


// EVENT HANDLER
function handleClick(event) {
  console.log(event.target.id);
  let index = event.target.id;
  let clickRecipe = recipeArray[index];
  console.log(clickRecipe);
  //selectorRecipe.textContent = event.target.clickRecipe[index].ingredients;
  clickRecipe.textContent = 'ingridents';
}



let mac = new Recipe('Mac & Cheese', ['Noodle', 'Cheese', 'Milk', 'Butter']);
let burger = new Recipe('CheeseBurger', ['Bun', 'Patty', 'Cheese', 'Tomato', 'Ketchup', 'Mustard', 'Pickle', 'Lettuce']);


function renderList() {
  for (let i = 0; i < recipeArray.length; i++) {
    let liElem = document.createElement('li');
    liElem.id = i;
    liElem.textContent = recipeArray[i].name;
    recipeIng.appendChild(liElem);
  }
}
renderList();
recipeIng.addEventListener('click', handleClick);
