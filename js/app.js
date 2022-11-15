'use strict';
// Global Varible
let recipeArray = [];

// DOM REFERENCES

let recipeContainer = document.getElementById('recipeContainer');

let selectorRecipe = document.getElementById('selectorRecipe');

let recipeName = document.getElementById('recipeName');

let recipeIng = document.getElementById('recipeIng');



function Recipe(name, ingredients, img, prepTime, cookTime, description) {
  this.name = name;
  this.ingredients = ingredients;


  this.img = img;
  this.description = description;
  this.prepTime = prepTime;
  this.cookTime = cookTime;
  this.likes = 0;
  recipeArray.push(this);
}

let clickRecipe;
// EVENT HANDLER
function handleClick(event) {
  let index = event.target.id;
  console.log(index);

  clickRecipe = recipeArray[index];

  while (selectorRecipe.firstChild) {
    selectorRecipe.removeChild(selectorRecipe.firstChild);
  }



  let heading = document.createElement('h2');
  heading.textContent = clickRecipe.name;
  selectorRecipe.appendChild(heading);


  let ingredientHeading = document.createElement('ingredientHeading');
  ingredientHeading.innerHTML = '<br />' + 'Ingredients';
  heading.appendChild(ingredientHeading);



  let imgElem = document.createElement('img');
  imgElem.src = clickRecipe.img;
  selectorRecipe.appendChild(imgElem);


  let prepTime = document.createElement('h4');
  prepTime.innerHTML = 'Prep Time: ' + clickRecipe.prepTime;
  selectorRecipe.appendChild(prepTime);


  let cookTime = document.createElement('h4');
  cookTime.innerHTML = 'Cook Time: ' + clickRecipe.cookTime;
  selectorRecipe.appendChild(cookTime);


  selectorRecipe.appendChild(ingredientHeading);


  let ulElem = document.createElement('ul');
  selectorRecipe.appendChild(ulElem);

  for (let i = 0; i < clickRecipe.ingredients.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = clickRecipe.ingredients[i];
    ulElem.appendChild(liElem);
  }

  createForm();

  function createForm() {
    let container = document.getElementById('formContainer');
    let form = document.createElement('FORM');
    let commentBox = document.createElement('input');
    commentBox.setAttribute('type', 'text');
    commentBox.setAttribute('id', 'commentBox');
    commentBox.setAttribute('placeholder', 'Enter Comment');
    form.appendChild(commentBox);
    let submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('name', 'cmtBtn');
    form.appendChild(submit);
    container.appendChild(form);
    submit.addEventListener('click', function (event) {
      event.preventDefault();
    });
  }




  let recipeDescription = document.createElement('h3');
  recipeDescription.innerHTML = "Procedure";
  selectorRecipe.appendChild(recipeDescription);


  let pElem = document.createElement('p-description');
  pElem.textContent = clickRecipe.description;
  selectorRecipe.appendChild(pElem);

  // likeIncrement(clickRecipe);

}


let mac = new Recipe('Mac & Cheese', ['Pasta', 'Cheese', 'Milk', 'Butter', 'Salt'], 'img/macNcheese.jpeg', '10 min', '45 min', 'Boil the macaroni in salted water until the noodles are al dente. Drain and transfer to a prepared baking dish.Then Melt butter, then whisk in the flour. Whisk in the milk, bring to a simmer, and stir in the cheeses. Season with salt and pepper and continue simmering until the sauce is thick. Pour the sauce over the noodles and stir.Melt two tablespoons of butter in a skillet, add the bread crumbs, and toast until the crumbs are brown. Spread the topping over the macaroni and cheese, then sprinkle with paprika.Bake in the preheated oven(350 degrees F) until the topping is golden brown.');


let burger = new Recipe('Cheese Burger', ['Bun', 'Patty', 'Cheese', 'Tomato', 'Ketchup', 'Mustard', 'Pickle', 'Lettuce'], 'img/cheese-burger.jpeg', '15 min', '40 min');



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





const getLike = document.querySelector('.like');
const getLikeNum = document.querySelector('.likeNum');




function likeIncrement() {
  console.log(clickRecipe);
  clickRecipe.likes++;
  getLikeNum.innerHTML = `${clickRecipe.likes}`;
}

getLike.addEventListener('click', likeIncrement);

let food = localStorage.getItem('myFood');


function saveFood() {
  let foodString = JSON.stringify(recipeArray);
  localStorage.setItem('food', foodString);

}


