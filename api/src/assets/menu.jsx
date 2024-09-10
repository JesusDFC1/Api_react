

const Menu = ({ onSelectCategory, onSelectPopular }) => {
  return (
    <div className="menu">
      <button onClick={() => onSelectCategory('Beef')}>Beef</button>
      <button onClick={() => onSelectCategory('Chicken')}>Chicken</button>
      <button onClick={() => onSelectCategory('Seafood')}>Seafood</button>
      <button onClick={() => onSelectCategory('Dessert')}>Dessert</button>
      
    </div>
  );
};

export default Menu;
