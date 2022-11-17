// // let recipeArray = [];

// // function Recipe(name, ingredients, img, prepTime, cookTime, description) {

// //   this.name = name;
// //   this.ingredients = ingredients;
// //   this.img = img;
// //   this.description = description;
// //   this.prepTime = prepTime;
// //   this.cookTime = cookTime;
// //   this.isClicked = false;

// //   recipeArray.push(this);


// // }


// // let stringifiedRecipe = JSON.stringify(recipeArray);

// // localStorage.setItem('favRecipies', stringifiedRecipe);

// let retrieveRecipe = localStorage.getItem('favRecipies');

// let parsedRecipe = JSON.parse(retrieveRecipe);


//let selectorRecipe = document.getElementById('selectorRecipe');

// console.log(parsedRecipe);
// // console.log(parsedRecipe);
// let displayFavRecipe = document.getElementById('favRecipe');

// function renderFavoritesList () {
//   for (let i = 0; i < parsedRecipe.length; i++) {
//     if (parsedRecipe[i].isClicked) {
//       console.log(parsedRecipe[i].name);
//       console.log(parsedRecipe[i].description);
//     }
//   }
// }

