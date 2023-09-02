const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
const foodDetailsContent = document.querySelector('.food-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

function getFoodList() {
    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class="food-item neumorp-card" data-id="${meal.idMeal}">
                        <div class="food-image">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="food-name">
                            <h3>${meal.strMeal}</h3>
                            <a class="recipe-btn" id="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            foodList.classList.remove('not-found');
        }
        
        else {
            html = "Makanan tidak ditemukan";
            foodList.classList.add('not-found');
        }

        foodList.innerHTML = html;
    });
}

const foodListInit = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class="food-item neumorp-card" data-id="${meal.idMeal}">
                        <div class="food-image">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="food-name">
                            <h3>${meal.strMeal}</h3>
                            <a class="recipe-btn" id="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
        }

        foodList.innerHTML = html;
    });
};

function foodRecipeModal(food) {
    console.log(food);
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
    foodDetailsContent.parentElement.classList.add('show-recipe');
}

function getFoodRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let foodItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodRecipeModal(data.meals));
    }
}

searchBtn.addEventListener('click', getFoodList);
foodList.addEventListener('click', getFoodRecipe);
recipeCloseBtn.addEventListener('click', () => {
    foodDetailsContent.parentElement.classList.remove('show-recipe');
});

foodListInit();