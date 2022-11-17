'use strict';
// Global Varible
let recipeArray = [];

let selectedRecipe;

let notesArray = [];

//used for local storge notes
let notesObject = {};

//used for localStorage and for creating recipe title.
let heading = document.createElement('h2');

// DOM REFERENCES

let commentBox = document.createElement('input');

let notesContainer = document.getElementById('formContainer');

let recipeContainer = document.getElementById('recipeContainer');

let selectorRecipe = document.getElementById('selectorRecipe');

// let recipeName = document.getElementById('recipeName');

let recipeIng = document.getElementById('recipeIng');

let submit = document.createElement('button');

const likeButton = document.getElementById('like-button');

function Recipe(name, ingredients, img, prepTime, cookTime, description, isAmerican, isMexican, isThai, isVegan = false) {
  this.name = name;
  this.ingredients = ingredients;
  this.notes = [];
  this.img = img;
  this.description = description;
  this.prepTime = prepTime;
  this.cookTime = cookTime;
  this.isClicked = false;
  this.isAmerican = isAmerican;
  this.isMexican = isMexican;
  this.isThai = isThai;
  this.isVegan = isVegan;
  recipeArray.push(this);
}

if (likeButton) {

  // Hide likeButton until a recipe is loaded
  likeButton.style.visibility = 'hidden';

  likeButton.addEventListener('click', () => {

    likeButton.classList.toggle('liked');

    selectedRecipe.isClicked = !selectedRecipe.isClicked;

    let stringifiedRecipe = JSON.stringify(recipeArray);

    localStorage.setItem('favRecipies', stringifiedRecipe);
  });
}

function handleRecipeClick(event) {
  selectedRecipe = recipeArray[event.target.id];
  renderSelectedRecipe(selectedRecipe);
}

// let clickRecipe;
// EVENT HANDLER
function renderSelectedRecipe(selectedRecipe) {

  if (likeButton) {
    // Show the like button when a recipe is selected
    likeButton.style.visibility = 'visible';

    if (selectedRecipe.isClicked) {
      likeButton.classList.toggle('liked');
    }
    else {
      likeButton.classList.remove('liked');
    }
  }
  
  if (selectorRecipe) {
    while (selectorRecipe.firstChild) {
      selectorRecipe.removeChild(selectorRecipe.firstChild);
    }
  }
  

  //todo keep this
  notesContainer.innerHTML = '';
  document.getElementById('commentList').innerHTML = '';
  //making heading a global variable. so we can access localStorage.

  heading.textContent = selectedRecipe.name;
  selectorRecipe.appendChild(heading);
  //todo keep this

  // let heading = document.createElement('h2');
  // heading.textContent = selectedRecipe.name;
  // selectorRecipe.appendChild(heading);

  let ingredientHeading = document.createElement('ingredientHeading');
  ingredientHeading.innerHTML = 'Ingredients';
  heading.appendChild(ingredientHeading);

  // let ingredientHeading = document.createElement('ingredientHeading');
  // ingredientHeading.innerHTML = '<br />' + 'Ingredients';
  // heading.appendChild(ingredientHeading);

  let imgElem = document.createElement('img');
  imgElem.src = selectedRecipe.img;
  selectorRecipe.appendChild(imgElem);

  // let imgElem = document.createElement('img');
  // imgElem.src = clickRecipe.img;
  // selectorRecipe.appendChild(imgElem);

  let prepTime = document.createElement('h4');
  prepTime.innerHTML = 'Prep Time: ' + selectedRecipe.prepTime;
  selectorRecipe.appendChild(prepTime);

  // let prepTime = document.createElement('h4');
  // prepTime.innerHTML = 'Prep Time: ' + clickRecipe.prepTime;
  // selectorRecipe.appendChild(prepTime);

  let cookTime = document.createElement('h4');
  cookTime.innerHTML = 'Cook Time: ' + selectedRecipe.cookTime;
  selectorRecipe.appendChild(cookTime);

  // let cookTime = document.createElement('h4');
  // cookTime.innerHTML = 'Cook Time: ' + clickRecipe.cookTime;
  // selectorRecipe.appendChild(cookTime);

  selectorRecipe.appendChild(ingredientHeading);

  let ulElem = document.createElement('ul');
  selectorRecipe.appendChild(ulElem);

  for (let i = 0; i < selectedRecipe.ingredients.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = selectedRecipe.ingredients[i];
    ulElem.appendChild(liElem);
  }

  // for (let i = 0; i < clickRecipe.ingredients.length; i++) {
  //   let liElem = document.createElement('li');
  //   liElem.textContent = clickRecipe.ingredients[i];
  //   ulElem.appendChild(liElem);
  // }

  let displayButton = document.createElement('button');
  displayButton.textContent = likeButton.isClicked;

  //todo keep
  let retrievedNotes = localStorage.getItem('myNotes');
  notesObject = JSON.parse(retrievedNotes) || {};

  if (notesObject && notesObject[heading.textContent]) {
    for (let i = 0; i < notesObject[heading.textContent].length; i++) {
      let newNotes = notesObject[heading.textContent][i];
      // console.log('test', parsedNotes[i]);
      let li = document.createElement('li');
      let text = document.createTextNode(newNotes);
      li.appendChild(text);
      document.getElementById('commentList').appendChild(li);
      notesArray.push(newNotes);
    }
  }

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
      notesArray.push(commentBox.value);

      console.log(notesObject);

      notesObject[heading.textContent] = notesArray;
      let stringifiedNotes = JSON.stringify(notesObject);
      localStorage.setItem('myNotes', stringifiedNotes);
      commentBox.value = '';
      submit.disabled = true;
      return false;
    });
  }
  //todo keep


  let recipeDescription = document.createElement('h3');
  recipeDescription.innerHTML = 'Procedure';
  selectorRecipe.appendChild(recipeDescription);

  let pElem = document.createElement('p-description');
  pElem.textContent = selectedRecipe.description;
  selectorRecipe.appendChild(pElem);

  //Favorite recipe function
  // TODO: Set the class on likeButton based on isLiked of recipe in recipeArray

  // let pElem = document.createElement('p-description');
  // pElem.textContent = clickRecipe.description;
  // selectorRecipe.appendChild(pElem);

  // likeIncrement(clickRecipe);

}

function initializeRecipies(cuisine) {
  switch (cuisine) {
    case 'american': initializeAmericanCuisine();
      break;
    case 'mexican': initializeMexicanCuisine();
      break;
    case 'thai': intializeThaiCuisine();
      break;
    default:
      break;
  }

  renderList();

}

function initializeAmericanCuisine() {
  let mac = new Recipe('Mac & Cheese', ['Pasta', 'Cheese', 'Milk', 'Butter', 'Salt'], 'img/macNcheese.jpeg', '10 min', '45 min', 'Boil the macaroni in salted water until the noodles are al dente. Drain and transfer to a prepared baking dish.Then Melt butter, then whisk in the flour. Whisk in the milk, bring to a simmer, and stir in the cheeses. Season with salt and pepper and continue simmering until the sauce is thick. Pour the sauce over the noodles and stir.Melt two tablespoons of butter in a skillet, add the bread crumbs, and toast until the crumbs are brown. Spread the topping over the macaroni and cheese, then sprinkle with paprika.Bake in the preheated oven(350 degrees F) until the topping is golden brown.');


  let burger = new Recipe('Cheese Burger', ['Bun', 'Patty', 'Cheese', 'Tomato', 'Ketchup', 'Mustard', 'Pickle', 'Lettuce'], 'img/cheese-burger.jpeg', '15 min', '40 min');


  let barbequreRibs = new Recipe('Barbeque Ribs', ['1 rack baby back ribs', '2 Tbsp olive oil', '2 tsp salt', '2 tsp garlic powder', '2 tsp paprika', '1 tsp onion powder', '1 tsp black pepper', 'BBQ sauce'], 'img/ribs.jpeg', '15 min', '20 min', 'Preheat oven to 275°F.Pat ribs dry with a paper towel. Rub on olive oil. Combine dry spices, then rub all over ribs.Wrap ribs in foil, then place on baking sheet. Bake 4 hours, or until the ribs are fork tender.Open foil. Slather BBQ sauce all over ribs, then bake uncovered another 15 minutes. If desired, broil for a few minutes at the end to caramelize the sauce.Allow to rest for 10 minutes before cutting.');

    
  }

function initializeMexicanCuisine() {
    let chickenQuesadilla = new Recipe('Chicken Quesadilla', ['1 tbsp. extra-virgin olive oil', '2 peppers, thinly sliced', '1/2 onion', '450 g boneless skinless chicken breasts', '1/2 tsp. chilli powder', '1/2 tsp. dried oregano', '4 medium flour tortillas', '200 g grated cheddar', '1 avocado, sliced', 'Sour cream, for serving'], 'img/chickenQuesadilla.jpg', '10 min', '25 min', 'In a large skillet over medium-high heat, heat olive oil. Add peppers and onion and season with salt and pepper. Cook until soft, 5 minutes. Transfer to a plate.Heat remaining tablespoon vegetable oil over medium-high heat. Season chicken with spices, salt, and pepper and cook, stirring occasionally, until golden and cooked through, 8 minutes. Transfer to a plate.Add 1 flour tortilla to skillet and top half of the tortilla with a heavy sprinkling of both cheeses, cooked chicken mixture,pepper-onion mixture, a few slices of avocado, and spring onions.Fold the other half of the tortilla over and cook.')

  let casserole = new Recipe('Casserole', ['1 pound lean ground beef', '2 cups salsa', '1 (16 ounce) can chili beans, drained', '3 cups tortilla chips, crushed', '2 cups sour cream', '1 (2 ounce) can sliced black olives, drained', '½ cup chopped green onion', '½ cup chopped fresh tomato', '2 cups shredded Cheddar cheese'], 'img/casserole.jpeg', '15 min', '1 hour', 'Preheat the oven to 350 degrees F (175 degrees C). Spray a 9x13-baking dish with cooking spray.Heat a large skillet over medium-high heat. Cook and stir ground beef in the hot skillet until browned and crumbly, 8 to 10 minutes.Stir in salsa, reduce heat, and simmer until liquid is absorbed, about 20 minutes. Stir in beans; cook until heated through.Spread crushed tortilla chips over the bottom of the baking dish; spoon beef mixture on top. Spread sour cream over beef, then sprinkle olives, green onion, and tomatoes on top. Cover with Cheddar cheese.Bake in the preheated oven until hot and bubbly, about 30 minutes.');

  let chips = new Recipe('Baked Tortilla Chips', ['1 (12 ounce) package corn tortillas', '3 tablespoons lime juice', '1 tablespoon vegetable oil', '1 teaspoon ground cumin', '1 teaspoon chili powder', '1 teaspoon salt'], 'img/chips.jpeg', '10 min', '15min', 'Preheat oven to 350 degrees F (175 degrees C).Stack tortillas in layers of 5 or 6. Cut through each stack to make 8 wedges. Arrange wedges in a single layer on rimmed baking sheets.Combine lime juice and oil in a spray bottle or mister; shake until well mixed. Spray the tops of the tortilla wedges until slightly moist.Combine cumin, chili powder, and salt in a small bowl; sprinkle mixture over the chips.Bake in the preheated oven for 7 minutes.Remove from the oven. Flip chips, then mist and season again.Return to the oven, rotating the pans and switching racks. Bake, checking often to ensure they do not burn, until chips are lightly browned and crisp, 5 to 8 more minutes.Remove from the oven and cool slightly before serving.')


}

function intializeThaiCuisine(){

let ThaiGreenCurry = new Recipe('Thai green curry', ['Thai curry paste', 'rice', 'ginger', 'lemon grass paste', 'oil', 'fish sauce', 'basil leaves', 'vegetables', 'meat-optional'], 'img/Thai-Green-Curry.jpeg', '15 min', '40 min', 'Heat oil in a heavy based skillet or pot over medium high heat.Add curry paste (and garlic, ginger and lemongrass Extras, if using) and cook for 2 to 3 minutes until it mostly "dries out".Add chicken broth and coconut milk, mix to dissolve paste.Add 1 tsp fish sauce, 1 tsp sugar, no salt.Add 3 tsp fish sauce, 3 tsp sugar, 1/8 tsp salt.Add chicken, stir then lower heat to medium so it iss bubbling gently. Cook for 7 minutes.Add snow peas, cook 2 minutes until a bit softened, then stir through basil and lime juice. Sauce should have reduced but will still be a be on the thin side, not thick - that is how it should be. DO NOT keep simmering - sauce will darken.Serve curry over jasmine rice with garnishes of choice.');

//let mac = new Recipe('Mac & Cheese', ['Pasta', 'Cheese', 'Milk', 'Butter', 'Salt'], 'img/macNcheese.jpeg', '10 min', '45 min', 'Boil the macaroni in salted water until the noodles are al dente. Drain and transfer to a prepared baking dish.Then Melt butter, then whisk in the flour. Whisk in the milk, bring to a simmer, and stir in the cheeses. Season with salt and pepper and continue simmering until the sauce is thick. Pour the sauce over the noodles and stir.Melt two tablespoons of butter in a skillet, add the bread crumbs, and toast until the crumbs are brown. Spread the topping over the macaroni and cheese, then sprinkle with paprika.Bake in the preheated oven(350 degrees F) until the topping is golden brown.', true);


//let burger = new Recipe('Cheese Burger', ['Bun', 'Patty', 'Cheese', 'Tomato', 'Ketchup', 'Mustard', 'Pickle', 'Lettuce'], 'img/cheese-burger.jpeg', '15 min', '40 min', false);

//let barbequreRibs = new Recipe('Barbeque Ribs', ['1 rack baby back ribs', '2 Tbsp olive oil', '2 tsp salt', '2 tsp garlic powder', '2 tsp paprika', '1 tsp onion powder', '1 tsp black pepper', 'BBQ sauce'], 'img/ribs.jpeg', '15 min', '20 min', 'Preheat oven to 275°F.Pat ribs dry with a paper towel. Rub on olive oil. Combine dry spices, then rub all over ribs.Wrap ribs in foil, then place on baking sheet. Bake 4 hours, or until the ribs are fork tender.Open foil. Slather BBQ sauce all over ribs, then bake uncovered another 15 minutes. If desired, broil for a few minutes at the end to caramelize the sauce.Allow to rest for 10 minutes before cutting.', false);



let padThai = new Recipe('Pad Thai', ['dry pad thai noodels', '4 garlic cloves', '1 tbsp ginger', '2 eggs', 'chicken/tofu', 'peanut oil', 'fish sauce', 'rice vineger', 'soy suace'], 'img/pad-thai.jpeg', '20 min', '35 min', 'COOK NOODLES: Cook noodles according to package instructions or place rice noodles in a shallow bowl or baking dish and boil enough water to cover them. Cover with boiling water for 7- 8 minutes, until tender, then drain. They do not have to be totally soft, just bendy and pliable. Whisk the two eggs in a bowl with a fork and add a generous, 3-finger pinch of salt. Set aside.Make the Pad Thai Sauce: whisk fish sauce,  rice vinegar, brown sugar and soy sauce. Set aside.slice chicken into very thin strips and season with salt and pepper.Make a well in the center of the wok, scooting the shallot mixture to the side of the pan, add the whisked eggs.Garnish with more bean sprouts, fresh scallions, cilantro or basil, chili flakes, lime wedges');

let ThaiPineaapleRice = new Recipe('Pineapple rice', ['1 Cilantro leaves', '2 tbsp Garlic', '2 tsp Ginger', '1/4 cup Green onions', '1/2 cup Green peas, fresh or frozen', '1 Pineapple', '1/2 cup Red bell pepper', '1/4 cup Red onion'], 'img/pinappleRice.jpeg', '15 min', '40 min', 'In a 3-quart sized saucepan, add rice and water. Bring to a boil and then turn down heat to a simmer and cover with a lid.Simmer rice for 10 to 12 minutes, or until all of the water is absorbed and rice is tender.Cut the pineapple in half lengthwise and carve out wedges from both sides of the core.Carefully cut out the core, to create a hollow bowl. Scrape the inside flesh with a spoon if needed after removing the core.Cut the removed pineapple flesh into pieces, reserving about 1 cup 7 ounces, 200g. In a small bowl mix together fish sauce, soy sauce, sugar, and curry powder.Heat a wok or large saute pan over high heat.Add the vegetable oil, once hot add the onions, ginger, and garlic, stir-fry for 30sec.');
}
// Load favorites
let retrieveRecipe = localStorage.getItem('favRecipies');
let parsedRecipe = JSON.parse(retrieveRecipe);

// TODO: Mark recipies in recipeArray as liked based on
// parsedRecipe

//adding changes
function renderList() {
  for (let i = 0; i < recipeArray.length; i++) {
    let liElem = document.createElement('li');
    liElem.id = i;
    liElem.textContent = recipeArray[i].name;
    recipeIng.appendChild(liElem);
    if (parsedRecipe) {
      for (let j = 0; j < parsedRecipe.length; j++) {
        if (parsedRecipe[j].name === recipeArray[i].name && parsedRecipe[j].isClicked) {
          recipeArray[i].isClicked = true;
        }
      }
    }
  }
}

if (recipeIng) {
  
  recipeIng.addEventListener('click', handleRecipeClick);
}

function renderFavoritesList (parentId) {

  let ulElem = document.getElementById(parentId);

  // Read favorites from local storage
  let retrieveRecipe = localStorage.getItem('favRecipies');
  let parsedRecipe = JSON.parse(retrieveRecipe);

  // Add favorites as li under the parent ul
  for (let i = 0; i < parsedRecipe.length; i++) {
    if (parsedRecipe[i].isClicked) {

      let liElem = document.createElement('li');
      liElem.textContent = parsedRecipe[i].name;
      
      /* todo: uncomment following and fix
         renderSelectedRecipe so it can render the 
         favorite recipe properly.
         Check favorite.html as well.
       */
      liElem.addEventListener('click', () => {
        renderSelectedRecipe(parsedRecipe[i]);
      });
     

      ulElem.appendChild(liElem);
    }
  }
}


// function renderList() {
//   for (let i = 0; i < recipeArray.length; i++) {
//     let liElem = document.createElement('li');
//     liElem.id = i;
//     liElem.textContent = recipeArray[i].name;
//     recipeIng.appendChild(liElem);
//   }
// }

// renderList();

// recipeIng.addEventListener('click', handleClick);





// const getLike = document.querySelector('.like');
// const getLikeNum = document.querySelector('.likeNum');




// function likeIncrement() {
//   console.log(clickRecipe);
//   clickRecipe.likes++;
//   getLikeNum.innerHTML = `${clickRecipe.likes}`;
// }

// getLike.addEventListener('click', likeIncrement);

// let food = localStorage.getItem('myFood');


// function saveFood() {
//   let foodString = JSON.stringify(recipeArray);
//   localStorage.setItem('food', foodString);

// }


