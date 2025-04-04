// /pages/api/getRecipes.js

export default async function handler(req, res) {
    const { ingredients } = req.query;  // Get ingredients from the query params
    const apiKey = process.env.api_key;  // Get the API key from the environment variables

    if (!ingredients) {
        return res.status(400).json({ error: "Ingredients are required" });
    }

    // Fetch from Spoonacular API
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // If response is not OK, throw error
        if (!response.ok) {
            throw new Error('Error fetching recipes');
        }

        return res.status(200).json(data);  // Send the recipes data to the client
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch recipes" });
    }
}
