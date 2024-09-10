import './app2.css'
 

const MealDetail = ({ meal, onBack }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onBack}>&times;</span>
        <h2>{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%' }} />
        <p><strong>Categoría:</strong> {meal.strCategory}</p>
        <p><strong>Área:</strong> {meal.strArea}</p>
        <h3>Ingredientes</h3>
        <ul>
          {Object.keys(meal).filter(key => key.includes('strIngredient') && meal[key]).map(key => (
            <li key={key}>{meal[key]} - {meal[`strMeasure${key.slice(13)}`]}</li>
          ))}
        </ul>
        <h3>Instrucciones</h3>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealDetail;

