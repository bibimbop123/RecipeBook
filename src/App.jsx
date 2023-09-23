import { useState } from "react";
import "./App.css";
import chef from "./assets/chef.gif";

function App() {
  const [recipes, setRecipes] = useState([]);
  // const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  console.log({
    recipes,
    query,
  });

  async function getRecipes() {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${
        import.meta.env.VITE_REACT_APP_ID
      }&app_key=${import.meta.env.VITE_REACT_APP_KEY}`
    );
    const { hits } = await response.json();

    setRecipes(hits);
  }

  return (
    <div className="App">
      <h1>Brian's Recipe Book </h1>
      <img src={chef} alt="chef" />
      <p>Search for recipes by ingredient</p>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="search-button"
        onClick={() => {
          getRecipes();
          setQuery("");
        }}
      >
        Search
      </button>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div className="recipe">
            <h2>{recipe.recipe.label}</h2>
            <p>Calories: {recipe.recipe.calories}</p>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
