import React from 'react';
import '../styles/ProductItem.css';

const ProductItem = ({ product, onDragStart, onRemove }) => {
    const handleDragStart = (e) => {
      e.dataTransfer.setData('product', JSON.stringify(product));
      onDragStart(product);
    };
  
    return (
      <div
        className="product-item"
        draggable
        onDragStart={handleDragStart}
        onAnimationEnd={onRemove}
      >
        <img src={product.image} alt={product.name} />
        <p>{product.name}</p>
      </div>
    );
  };
  
  export default ProductItem;