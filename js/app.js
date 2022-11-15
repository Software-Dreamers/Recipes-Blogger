'use strict';
// Global Varible
let recipeArray = [];

// DOM REFERENCES

let recipeContainer = document.getElementById('recipeContainer');

let selectorRecipe = document.getElementById('selectorRecipe');

let recipeName = document.getElementById('recipeName');

let recipeIng = document.getElementById('recipeIng');


  recipeArray.push(this);
}


// EVENT HANDLER
function handleClick(event) {

  let index = event.target.id;
  let clickRecipe = recipeArray[index];


  while(selectorRecipe.firstChild){
    selectorRecipe.removeChild(selectorRecipe.firstChild);
  }

  

  let heading = document.createElement('h2');
  heading.textContent = clickRecipe.name;
  selectorRecipe.appendChild(heading);
  
  let imgElem = document.createElement('img');
  imgElem.src = clickRecipe.img;
  selectorRecipe.appendChild(imgElem);
 

  let prepTime = document.createElement('h4');
  prepTime.innerHTML = 'prep-time';
  selectorRecipe.appendChild(prepTime);

  let ingredientHeading = document.createElement('h3');
  ingredientHeading.innerHTML = "Ingredients";
  ingredientHeading.style.backgroundColor="blue";
  selectorRecipe.appendChild(ingredientHeading);


 
  let ulElem = document.createElement('ul');
  selectorRecipe.appendChild(ulElem);

  for(let i =0; i<clickRecipe.ingredients.length;i++){
    let liElem = document.createElement('li');
    liElem.textContent = clickRecipe.ingredients[i];
    ulElem.appendChild(liElem);
  }

  let recipeDescription = document.createElement('h3');
  recipeDescription.innerHTML = "Procedure";
  recipeContainer.style.backgroundColor="green";
  selectorRecipe.appendChild(recipeDescription);


  let pElem = document.createElement('p-description');
  pElem.textContent = clickRecipe.description;
  pElem.style.backgroundColor="red";
  selectorRecipe.appendChild(pElem);
}


