'use strict';
// Global Varible
let recipeArray = [];
let selectedRecipe;

// DOM REFERENCES

let selectorRecipe = document.getElementById('selectorRecipe');
let recipeIng = document.getElementById('recipeIng');
const likeButton = document.querySelector('.btn');

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
  console.log(index);

  selectedRecipe = recipeArray[index];


  likeButton.classList.remove('liked');

  while (selectorRecipe.firstChild) {
    selectorRecipe.removeChild(selectorRecipe.firstChild);
  }

  let heading = document.createElement('h2');
  heading.textContent = selectedRecipe.name;
  selectorRecipe.appendChild(heading);


  let ingredientHeading = document.createElement('ingredientHeading');
  ingredientHeading.innerHTML = '<br />' + 'Ingredients';
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
  pElem.textContent = selectedRecipe.description;
  selectorRecipe.appendChild(pElem);


  //Favorite recipe function
  // TODO: Set the class on likeButton based on isLiked of recipe in recipeArray


}




let ThaiGreenCurry = new Recipe('Thai green curry', ['Thai curry paste', 'rice', 'ginger', 'lemon grass paste', 'oil', 'fish sauce', 'basil leaves', 'vegetables', 'meat-optional'], 'img/Thai-Green-Curry.jpeg', '15 min', '40 min', 'Heat oil in a heavy based skillet or pot over medium high heat.Add curry paste (and garlic, ginger and lemongrass Extras, if using) and cook for 2 to 3 minutes until it mostly "dries out".Add chicken broth and coconut milk, mix to dissolve paste.Add 1 tsp fish sauce, 1 tsp sugar, no salt.Add 3 tsp fish sauce, 3 tsp sugar, 1/8 tsp salt.Add chicken, stir then lower heat to medium so it iss bubbling gently. Cook for 7 minutes.Add snow peas, cook 2 minutes until a bit softened, then stir through basil and lime juice. Sauce should have reduced but will still be a be on the thin side, not thick - that is how it should be. DO NOT keep simmering - sauce will darken.Serve curry over jasmine rice with garnishes of choice.');


let padThai = new Recipe('Pad Thai', ['dry pad thai noodels', '4 garlic cloves', '1 tbsp ginger', '2 eggs', 'chicken/tofu', 'peanut oil', 'fish sauce', 'rice vineger', 'soy suace'], 'img/pad-thai.jpeg', '20 min', '35 min', 'COOK NOODLES: Cook noodles according to package instructions (or place rice noodles in a shallow bowl or baking dish and boil enough water to cover them. Cover with boiling water for 7- 8 minutes, until tender, then drain. They do not have to be totally soft, just bendy and pliable). Whisk the two eggs in a bowl with a fork and add a generous, 3-finger pinch of salt. Set aside.Make the Pad Thai Sauce: whisk fish sauce,  rice vinegar, brown sugar and soy sauce. (see notes) in a small bowl. Set aside.slice chicken into very thin strips and season with salt and pepper.Make a well in the center of the wok, scooting the shallot mixture to the side of the pan, add the whisked eggs.Garnish with more bean sprouts, fresh scallions, cilantro or basil, chili flakes, lime wedges')

let ThaiPineaapleRice = new Recipe('Pineapple rice', ['1 Cilantro leaves', '2 tbsp Garlic', '2 tsp Ginger', '1/4 cup Green onions', '1/2 cup Green peas, fresh or frozen', '1 Pineapple', '1/2 cup Red bell pepper', '1/4 cup Red onion'], 'img/pinappleRice.jpeg', '15 min', '40 min', 'In a 3-quart sized saucepan, add rice and water. Bring to a boil and then turn down heat to a simmer and cover with a lid.Simmer rice for 10 to 12 minutes, or until all of the water is absorbed and rice is tender.Cut the pineapple in half lengthwise and carve out wedges from both sides of the core.Carefully cut out the core, to create a hollow bowl. Scrape the inside flesh with a spoon if needed after removing the core.Cut the removed pineapple flesh into ½-inch pieces, reserving about 1 cup (7 ounces, 200g).In a small bowl mix together fish sauce, soy sauce, sugar, and curry powder.Heat a wok or large saute pan over high heat.Add the vegetable oil, once hot add the onions, ginger, and garlic, stir-fry for 30 seconds.')

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
  }


}

renderList();

recipeIng.addEventListener('click', handleRecipeClick);