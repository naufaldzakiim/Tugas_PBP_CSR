const searchInput = document.getElementById("search-input");
const foodList = document.getElementById("food");
const foodDetailsContent = document.getElementById("food-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

foodListInit();

searchInput.addEventListener("input", () => {
  if (searchInput.value == "") {
    foodListInit();
  } else {
    getFoodList();
  }
});

recipeCloseBtn.addEventListener("click", () => {
  foodDetailsContent.parentElement.classList.remove("show-recipe");
});

async function getFoodList() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`
  );
  const data = await response.json();
  let html = "";
  if (data.meals) {
    data.meals.forEach((meal) => {
      html += `
        <div class="food-item neumorp-card">
          <div class="food-image">
            <img src="${meal.strMealThumb}" alt="food">
          </div>
          <div class="food-name">
            <h3>${meal.strMeal}</h3>
            <button class="recipe-btn" onClick="getFoodRecipe(${meal.idMeal})">Get Recipe</button>
          </div>
        </div>
                `;
    });
    foodList.classList.remove("not-found");
  } else {
    html = "Makanan tidak ditemukan";
    foodList.classList.add("not-found");
  }

  foodList.innerHTML = html;
}

async function foodListInit() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  const data = await response.json();
  if (data.meals) {
    let html = "";
    if (data.meals) {
      data.meals.forEach((meal) => {
        html += `
          <div class="food-item neumorp-card" data-id="${meal.idMeal}">
            <div class="food-image">
              <img src="${meal.strMealThumb}" alt="food">
            </div>
            <div class="food-name">
              <h3>${meal.strMeal}</h3>
              <button class="recipe-btn" onClick="getFoodRecipe(${meal.idMeal})">Get Recipe</button>
            </div>
          </div>
                `;
      });
    }
    foodList.innerHTML = html;
  }
}

function foodRecipeModal(food) {
  //   console.log(food);
  food = food[0];
  let html = `
    <h2 class="recipe-title">${food.strMeal}</h2>
    <div class="recipe-food-img">
      <img src="${food.strMealThumb}" alt="food">
    </div>
    <p class="recipe-category">${food.strCategory}</p>
    <div class="recipe-instruction">
      <h3>Instruction:</h3>
      <p>${food.strInstructions}</p>
    </div>
    <div class="recipe-link">
      <a href="${food.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;

  foodDetailsContent.innerHTML = html;
  foodDetailsContent.parentElement.classList.add("show-recipe");
}

async function getFoodRecipe(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  foodRecipeModal(data.meals);
}
