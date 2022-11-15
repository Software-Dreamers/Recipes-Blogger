'use strict';
// Global Varible
let recipeArray = [];

// DOM REFERENCES

let recipeContainer = document.getElementById('recipeContainer');

let selectorRecipe = document.getElementById('selectorRecipe');

let recipeName = document.getElementById('recipeName');

let recipeIng = document.getElementById('recipeIng');

function Recipe(name, ingredients, img) {
  this.name = name;
  this.ingredients = ingredients;
  this.img = img ;
  recipeArray.push(this);
}


// EVENT HANDLER
function handleClick(event) {

  let index = event.target.id;
  let clickRecipe = recipeArray[index];


  while(selectorRecipe.firstChild){
    selectorRecipe.removeChild(selectorRecipe.firstChild);
  }

  let heading = document.createElement('heading');
  heading.textContent = clickRecipe.name;
  selectorRecipe.appendChild(heading);

  let ingredientHeading = document.createElement('ingredientHeading');
  ingredientHeading.innerHTML = '<br />' +" Ingredients";
  heading.appendChild(ingredientHeading);


  let imgElem = document.createElement('img');
  imgElem.src = clickRecipe.img;
  selectorRecipe.appendChild(imgElem);

  for(let i =0; i<clickRecipe.ingredients.length;i++){
    let liElem = document.createElement('li');
    liElem.textContent = clickRecipe.ingredients[i];
    selectorRecipe.appendChild(liElem);
  }
}


let mac = new Recipe('Mac & Cheese', ['Pasta', 'Cheese', 'Milk', 'Butter','Salt'],'img/macNcheese.jpeg');

let burger = new Recipe('Cheese Burger', ['Bun', 'Patty', 'Cheese', 'Tomato', 'Ketchup', 'Mustard', 'Pickle', 'Lettuce'],'img/cheese-burger.jpeg');


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
