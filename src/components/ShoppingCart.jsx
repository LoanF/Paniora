import React from 'react';
import '../styles/ShoppingCart.css';

const ShoppingCart = ({ items, onDrop }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const product = JSON.parse(e.dataTransfer.getData('product'));
    onDrop(product);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="shopping-cart"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>Mon Panier</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;