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




let chickenQuesadilla = new Recipe('Chicken Quesadilla', ['1 tbsp. extra-virgin olive oil', '2 peppers, thinly sliced', '1/2 onion', '450 g boneless skinless chicken breasts', '1/2 tsp. chilli powder', '1/2 tsp. dried oregano', '4 medium flour tortillas', '200 g grated cheddar', '1 avocado, sliced', 'Sour cream, for serving'], 'img/chickenQuesadilla.jpg', '10 min', '25 min', 'In a large skillet over medium-high heat, heat olive oil. Add peppers and onion and season with salt and pepper. Cook until soft, 5 minutes. Transfer to a plate.Heat remaining tablespoon vegetable oil over medium-high heat. Season chicken with spices, salt, and pepper and cook, stirring occasionally, until golden and cooked through, 8 minutes. Transfer to a plate.Add 1 flour tortilla to skillet and top half of the tortilla with a heavy sprinkling of both cheeses, cooked chicken mixture,pepper-onion mixture, a few slices of avocado, and spring onions.Fold the other half of the tortilla over and cook.')

let casserole = new Recipe('Casserole', ['1 pound lean ground beef', '2 cups salsa', '1 (16 ounce) can chili beans, drained', '3 cups tortilla chips, crushed', '2 cups sour cream', '1 (2 ounce) can sliced black olives, drained', '½ cup chopped green onion', '½ cup chopped fresh tomato', '2 cups shredded Cheddar cheese'], 'img/casserole.jpeg', '15 min', '1 hour', 'Preheat the oven to 350 degrees F (175 degrees C). Spray a 9x13-baking dish with cooking spray.Heat a large skillet over medium-high heat. Cook and stir ground beef in the hot skillet until browned and crumbly, 8 to 10 minutes.Stir in salsa, reduce heat, and simmer until liquid is absorbed, about 20 minutes. Stir in beans; cook until heated through.Spread crushed tortilla chips over the bottom of the baking dish; spoon beef mixture on top. Spread sour cream over beef, then sprinkle olives, green onion, and tomatoes on top. Cover with Cheddar cheese.Bake in the preheated oven until hot and bubbly, about 30 minutes.');

let chips = new Recipe('Baked Tortilla Chips', ['1 (12 ounce) package corn tortillas', '3 tablespoons lime juice', '1 tablespoon vegetable oil', '1 teaspoon ground cumin', '1 teaspoon chili powder', '1 teaspoon salt'], 'img/chips.jpeg', '10 min', '15min', 'Preheat oven to 350 degrees F (175 degrees C).Stack tortillas in layers of 5 or 6. Cut through each stack to make 8 wedges. Arrange wedges in a single layer on rimmed baking sheets.Combine lime juice and oil in a spray bottle or mister; shake until well mixed. Spray the tops of the tortilla wedges until slightly moist.Combine cumin, chili powder, and salt in a small bowl; sprinkle mixture over the chips.Bake in the preheated oven for 7 minutes.Remove from the oven. Flip chips, then mist and season again.Return to the oven, rotating the pans and switching racks. Bake, checking often to ensure they do not burn, until chips are lightly browned and crisp, 5 to 8 more minutes.Remove from the oven and cool slightly before serving.')


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