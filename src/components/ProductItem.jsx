import React from 'react';
import '../styles/ProductItem.css';

const ProductItem = ({ product, onDragStart }) => {
  return (
    <div
      className="product-item"
      draggable
      onDragStart={(e) => onDragStart(e, product)}
    >
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
    </div>
  );
};

export default ProductItem;