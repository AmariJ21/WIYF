const ingredientsInput = document.getElementById("ingredients");
const searchButton = document.getElementById("search-button");
const recipesContainer = document.getElementById("recipes");
const titleDiv = document.getElementById("title");

searchButton.addEventListener("click", async () => {
  const ingredients = ingredientsInput.value;
  if (!ingredients) {
    alert("Please enter ingredients!");
    return;
  }

  const apiKey = "api_key"; // Replace with your actual Spoonacular API key
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching recipes");
    }
    const data = await response.json();
    displayRecipes(data);
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
});

// Event listener to shift the title and adjust recipes section layout
searchButton.addEventListener("click", () => {
  titleDiv.classList.add("scrolled-top");
});

function displayRecipes(recipes) {
  recipesContainer.innerHTML = ""; // Clear previous results
  recipes.forEach(recipe => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe");
    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p>Used Ingredients: ${recipe.usedIngredients.map(ingredient => ingredient.name).join(", ")}</p>
      <p>Needed Ingredients: ${recipe.missedIngredients.map(ingredient => ingredient.name).join(", ")}</p>
    `;
    recipesContainer.appendChild(recipeElement);
  });
}
