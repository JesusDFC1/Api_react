import  { useState, useEffect } from 'react';
import axios from 'axios';
import MealDetail from './MealDetail';
import Menu from './menu';
import './app1.css'


const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [category, setCategory] = useState('Chicken');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeals(category);
  }, [category]);

  const fetchMeals = (category) => {
    setLoading(true);
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => {
        setMeals(response.data.meals);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchPopularMeals = () => {
    setLoading(true);
    axios.get('https://www.themealdb.com/api/json/v1/1/popular.php')
      .then(response => {
        setMeals(response.data.meals);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const handleClick = (id) => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => {
        setSelectedMeal(response.data.meals[0]);
      })
      .catch(err => {
        setError(err);
      });
  };

  const handleCloseCard = () => {
    setSelectedMeal(null);
  };

  const renderIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          <li key={i}>{meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]}</li>
        );
      }
    }
    return ingredients.length ? (
      <ul className="ingredients-list">{ingredients}</ul>
    ) : (
      <p>No ingredients listed</p>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Menu onSelectCategory={setCategory} onSelectPopular={fetchPopularMeals} />
      <div className="meal-list">
        {meals.map(meal => (
          <div
            className="meal-item"
            key={meal.idMeal}
            onClick={() => handleClick(meal.idMeal)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strMeal}</p>
          </div>
        ))}
      </div>
      {selectedMeal && (
        <div className="meal-card">
          <button className="close-btn" onClick={handleCloseCard}>X</button>
          <h2>{selectedMeal.strMeal}</h2>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
          <h3>Ingredients:</h3>
          {renderIngredients(selectedMeal)}
          <h3>Preparation:</h3>
          <p>{selectedMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default MealList;