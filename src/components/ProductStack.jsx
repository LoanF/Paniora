import React from 'react';
import ProductItem from './ProductItem';
import '../styles/ProductStack.css';

const ProductStack = ({ products, onDragStart, onRemove }) => {
  return (
    <div className="product-stack">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDragStart={onDragStart}
          onRemove={() => onRemove(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductStack;