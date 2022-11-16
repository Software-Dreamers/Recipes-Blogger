'use strict';
// Global Varible
let recipeArray = [];
let selectedRecipe;

// DOM REFERENCES
let notesContainer = document.getElementById('formContainer');

let selectorRecipe = document.getElementById('selectorRecipe');
let recipeIng = document.getElementById('recipeIng');

// const likeButton = document.querySelector('.btn');
const likeButton = document.getElementById('like-button');


let submit = document.createElement('button');


function Recipe(name, ingredients, img, prepTime, cookTime, description) {

  this.name = name;
  this.ingredients = ingredients;
  this.img = img;
  this.description = description;
  this.prepTime = prepTime;
  this.cookTime = cookTime;
  this.isClicked = false;

  recipeArray.push(this);

}

likeButton.addEventListener('click', () => {

  likeButton.classList.toggle('liked');

  selectedRecipe.isClicked = !selectedRecipe.isClicked;

  let stringifiedRecipe = JSON.stringify(recipeArray);

  localStorage.setItem('favRecipies', stringifiedRecipe);
});


// EVENT HANDLER

function handleRecipeClick(event) {

  // eslint-disable-next-line no-const-assign

  let index = event.target.id;
  // console.log(index);

  selectedRecipe = recipeArray[index];





  if (recipeArray[index].isClicked){
    likeButton.classList.toggle('liked');
  }
  else{
    likeButton.classList.remove('liked');
  }

  notesContainer.innerHTML = '';
  document.getElementById('commentList').innerHTML = '';


  while (selectorRecipe.firstChild) {
    selectorRecipe.removeChild(selectorRecipe.firstChild);
  }
  
  let heading = document.createElement('h2');
  heading.textContent = selectedRecipe.name;
  selectorRecipe.appendChild(heading);

  let ingredientHeading = document.createElement('ingredientHeading');
  ingredientHeading.innerHTML = 'Ingredients';
  heading.appendChild(ingredientHeading);

  let imgElem = document.createElement('img');
  imgElem.src = selectedRecipe.img;
  selectorRecipe.appendChild(imgElem);

  let prepTime = document.createElement('h4');
  prepTime.innerHTML = 'Prep Time: ' + selectedRecipe.prepTime;
  selectorRecipe.appendChild(prepTime);

  let cookTime = document.createElement('h4');
  cookTime.innerHTML = 'Cook Time: ' + selectedRecipe.cookTime;
  selectorRecipe.appendChild(cookTime);

  selectorRecipe.appendChild(ingredientHeading);

  let ulElem = document.createElement('ul');
  selectorRecipe.appendChild(ulElem);


  for (let i = 0; i < selectedRecipe.ingredients.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = selectedRecipe.ingredients[i];
    ulElem.appendChild(liElem);
  }


  let displayButton = document.createElement('button');
  displayButton.textContent = likeButton.isClicked;
  
  createForm();


  createForm();
  function createForm() {

    let form = document.createElement('FORM');
    let commentBox = document.createElement('input');
    let submit = document.createElement('button');
    submit.disabled = true;

    commentBox.onkeyup = function () {
      if (commentBox.value.length > 0) {
        submit.disabled = false;
      }
      else {
        submit.disabled = true;
      }
    };

    commentBox.setAttribute('type', 'text');
    commentBox.setAttribute('id', 'commentBox');
    commentBox.setAttribute('placeholder', 'Enter Notes');
    form.appendChild(commentBox);

    submit.setAttribute('type', 'submit');
    submit.setAttribute('name', 'cmtBtn');
    form.appendChild(submit);
    notesContainer.appendChild(form);

    submit.addEventListener('click', function (event) {
      event.preventDefault();
      let li = document.createElement('li');
      let text = document.createTextNode(commentBox.value);
      li.appendChild(text);
      document.getElementById('commentList').appendChild(li);
      commentBox.value = '';
      
      submit.disabled = true;
      return false;
    });



  }




  let recipeDescription = document.createElement('h3');
  recipeDescription.innerHTML = "Procedure";
  selectorRecipe.appendChild(recipeDescription);


  let pElem = document.createElement('p-description');
  pElem.textContent = selectedRecipe.description;
  selectorRecipe.appendChild(pElem);


  //Favorite recipe function
  // TODO: Set the class on likeButton based on isLiked of recipe in recipeArray
 

}



let mac = new Recipe('Mac & Cheese', ['Pasta', 'Cheese', 'Milk', 'Butter', 'Salt'], 'img/macNcheese.jpeg', '10 min', '45 min', 'Boil the macaroni in salted water until the noodles are al dente. Drain and transfer to a prepared baking dish.Then Melt butter, then whisk in the flour. Whisk in the milk, bring to a simmer, and stir in the cheeses. Season with salt and pepper and continue simmering until the sauce is thick. Pour the sauce over the noodles and stir.Melt two tablespoons of butter in a skillet, add the bread crumbs, and toast until the crumbs are brown. Spread the topping over the macaroni and cheese, then sprinkle with paprika.Bake in the preheated oven(350 degrees F) until the topping is golden brown.');


let burger = new Recipe('Cheese Burger', ['Bun', 'Patty', 'Cheese', 'Tomato', 'Ketchup', 'Mustard', 'Pickle', 'Lettuce'], 'img/cheese-burger.jpeg', '15 min', '40 min');

let barbequreRibs = new Recipe('Barbeque Ribs', ['1 rack baby back ribs', '2 Tbsp olive oil', '2 tsp salt', '2 tsp garlic powder', '2 tsp paprika', '1 tsp onion powder', '1 tsp black pepper', 'BBQ sauce'], 'img/ribs.jpeg', '15 min', '20 min','Preheat oven to 275°F.Pat ribs dry with a paper towel. Rub on olive oil. Combine dry spices, then rub all over ribs.Wrap ribs in foil, then place on baking sheet. Bake 4 hours, or until the ribs are fork tender.Open foil. Slather BBQ sauce all over ribs, then bake uncovered another 15 minutes. If desired, broil for a few minutes at the end to caramelize the sauce.Allow to rest for 10 minutes before cutting.');

// Load favorites
let retrieveRecipe = localStorage.getItem('favRecipies');
let parsedRecipe = JSON.parse(retrieveRecipe);

// TODO: Mark recipies in recipeArray as liked based on
// parsedRecipe




function renderList() {
  for (let i = 0; i < recipeArray.length; i++) {
    let liElem = document.createElement('li');
    liElem.id = i;
    liElem.textContent = recipeArray[i].name;
    recipeIng.appendChild(liElem);
    for(let j=0; j<parsedRecipe.length; j++){
    if(parsedRecipe[j].name === recipeArray[i].name && parsedRecipe[j].isClicked){
     recipeArray[i].isClicked = true;
      
    }
  }
}
}



renderList();

recipeIng.addEventListener('click', handleRecipeClick);
