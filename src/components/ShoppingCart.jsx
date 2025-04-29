import React from 'react';
import '../styles/ShoppingCart.css';

const ShoppingCart = ({ items, onDrop }) => {
  const [isOver, setIsOver] = React.useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const product = JSON.parse(e.dataTransfer.getData('product'));
    onDrop(product);
    setIsOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  // Agrège les produits par ID et calcule la quantité
  const aggregateItems = () => {
    const map = new Map();
    items.forEach((item) => {
      if (map.has(item.id)) {
        map.get(item.id).quantity += 1;
      } else {
        map.set(item.id, { ...item, quantity: 1 });
      }
    });
    return Array.from(map.values());
  };

  const aggregatedItems = aggregateItems();

  return (
      <div
          className={`shopping-cart ${isOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
      >
        <h2>🧺 Mon Panier</h2>
        {aggregatedItems.length === 0 ? (
            <p className="empty">Glisse ici tes produits !</p>
        ) : (
            <ul>
              {aggregatedItems.map((item, index) => (
                  <li key={index}>
                    <span className="quantity">×{item.quantity}</span>
                    <span className="name">{item.name}</span>
                    <span className="price">{(item.price * item.quantity).toFixed(2)} €</span>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default ShoppingCart;