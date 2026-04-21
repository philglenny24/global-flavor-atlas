const recipes = {
  sushi: {
    title: "Sushi Roll",
    description: "Simple sushi roll with seasoned rice and fresh fillings.",
    ingredients: [
      "2 cups sushi rice",
      "2 1/2 cups water",
      "1/3 cup rice vinegar",
      "2 tbsp sugar",
      "1 tsp salt",
      "4 sheets nori",
      "1 avocado, sliced",
      "1 cucumber, julienned",
      "200g sashimi-grade salmon or tuna",
      "Soy sauce, wasabi, pickled ginger",
    ],
    instructions: [
      "Rinse sushi rice until water runs clear, then combine with water and cook.",
      "Mix rice vinegar, sugar, and salt until dissolved. Fold into warm rice.",
      "Lay nori on a bamboo mat. Spread rice evenly, leaving a 1-inch border.",
      "Arrange avocado, cucumber, and fish across the rice.",
      "Roll tightly with the mat, then slice into 6–8 pieces.",
      "Serve immediately with soy sauce, wasabi, and pickled ginger.",
    ],
  },
  padThai: {
    title: "Pad Thai",
    description:
      "Classic Thai stir-fry with rice noodles, tamarind, and crunchy peanuts.",
    ingredients: [
      "200g rice noodles",
      "2 tbsp tamarind paste",
      "2 tbsp fish sauce",
      "1 tbsp palm sugar",
      "2 eggs",
      "100g shrimp or chicken",
      "100g firm tofu, cubed",
      "1 cup bean sprouts",
      "2 green onions, sliced",
      "2 tbsp crushed peanuts",
      "Lime wedges",
    ],
    instructions: [
      "Soak rice noodles in warm water until pliable, then drain.",
      "Whisk tamarind, fish sauce, and sugar to make the sauce.",
      "Stir-fry tofu and protein until cooked through, then push aside.",
      "Add noodles and sauce, toss to coat, then scramble in eggs.",
      "Mix in bean sprouts and green onions.",
      "Plate and garnish with crushed peanuts and lime wedges.",
    ],
  },
  tacos: {
    title: "Tacos al Pastor",
    description:
      "Flavorful Mexican tacos with marinated pork, pineapple, and cilantro.",
    ingredients: [
      "500g pork shoulder, thinly sliced",
      "1/2 pineapple, chopped",
      "2 tbsp chili powder",
      "1 tbsp smoked paprika",
      "1 tsp cumin",
      "1 tsp oregano",
      "2 cloves garlic, minced",
      "Corn tortillas",
      "Cilantro, onion, lime",
    ],
    instructions: [
      "Combine spices, garlic, and a splash of orange juice to make a marinade.",
      "Coat pork slices and marinate for at least 1 hour.",
      "Cook pork in a hot skillet until caramelized and cooked through.",
      "Warm tortillas and fill with pork and pineapple.",
      "Top with chopped onion, cilantro, and a squeeze of lime.",
      "Serve immediately with salsa on the side.",
    ],
  },
  pizza: {
    title: "Margherita Pizza",
    description: "Fresh Neapolitan pizza with tomato, mozzarella, and basil.",
    ingredients: [
      "300g pizza dough",
      "1/2 cup tomato sauce",
      "150g fresh mozzarella, sliced",
      "Handful of fresh basil leaves",
      "2 tbsp olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Preheat oven to 250°C (480°F) with a pizza stone if available.",
      "Stretch dough into a thin round on a floured surface.",
      "Spread tomato sauce over the dough, leaving a small border.",
      "Top with mozzarella slices and drizzle olive oil.",
      "Bake until crust is golden and cheese is bubbling.",
      "Finish with fresh basil leaves and a sprinkle of salt.",
    ],
  },
};

function openRecipe(key) {
  const recipe = recipes[key];
  const details = document.getElementById("recipeDetails");
  details.innerHTML = `
            <h2>${recipe.title}</h2>
            <p class="explore-recipe-description">${recipe.description}</p>
            <div class="explore-recipe-section">
                <h4>Ingredients</h4>
                <ul>${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div class="explore-recipe-section">
                <h4>Directions</h4>
                <ol>${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}</ol>
            </div>
        `;
  document.getElementById("recipeModal").classList.add("show");
}

function closeRecipe() {
  document.getElementById("recipeModal").classList.remove("show");
}

// Expose functions globally for onclick handlers
window.openRecipe = openRecipe;
window.closeRecipe = closeRecipe;
window.recipes = recipes;

// Search functionality for homepage
const searchBtn = document.getElementById("search-btn");
const searchType = document.getElementById("search-type");
const searchInput = document.getElementById("search-input");

if (searchBtn && searchInput && searchType) {
  searchBtn.addEventListener("click", searchRecipe);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchRecipe();
  });
}

async function searchRecipe() {
  const query = searchInput.value.trim();
  const type = searchType.value;

  if (!query) {
    alert("Please enter an ingredient, meal name, or country.");
    return;
  }

  try {
    if (type === "country") {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        displayCountryResults(data.meals, query);
      } else {
        alert(`No meals found for country '${query}'. Try another country.`);
      }
      return;
    }

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
    );
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      displaySearchResult(data.meals[0]);
    } else {
      const ingredientResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`,
      );
      const ingredientData = await ingredientResponse.json();

      if (ingredientData.meals && ingredientData.meals.length > 0) {
        const mealId = ingredientData.meals[0].idMeal;
        const detailResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        );
        const detailData = await detailResponse.json();
        displaySearchResult(detailData.meals[0]);
      } else {
        alert("No recipes found for '" + query + "'. Try another search.");
      }
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    alert("Error fetching recipe. Please try again.");
  }
}

function displayCountryResults(meals, country) {
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = `
    <h2>Meals from ${country}</h2>
    <div class="country-grid">
      ${meals
        .map(
          (meal) => `
      <div class="country-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
      </div>
      `,
        )
        .join("")}
    </div>
  `;

  document.getElementById("searchModal").classList.add("show");
}

function displaySearchResult(meal) {
  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <p class="explore-recipe-description">${meal.strCategory} - ${meal.strArea}</p>
    
    <div class="explore-recipe-section">
      <h4>Ingredients</h4>
      <ul>${ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>

    <div class="explore-recipe-section">
      <h4>Instructions</h4>
      <p>${meal.strInstructions}</p>
    </div>
  `;

  document.getElementById("searchModal").classList.add("show");
}

function closeSearch() {
  document.getElementById("searchModal").classList.remove("show");
}

window.closeSearch = closeSearch;
