import React from 'react';
import '../styles/ProductItem.css';
import tomateImage from '../assets/tomate.png';
import pommeImage from '../assets/pomme.png';
import bananeImage from '../assets/banane.png';
import poireImage from '../assets/poire.png';
import orangeImage from '../assets/orange.png';
import carotteImage from '../assets/carotte.png';

const ProductItem = ({ product, onDragStart }) => {
  const images = {
    'tomate.png': tomateImage,
    'pomme.png': pommeImage,
    'banane.png': bananeImage,
    'poire.png': poireImage,
    'orange.png': orangeImage,
    'carotte.png': carotteImage,
  };

  return (
    <div
      className="product-item"
      draggable
      onDragStart={(e) => onDragStart(e, product)}
    >
      <img src={images[product.image]} alt={product.name} />
      <p>{product.name}</p>
      <p className="price">💰{product.price} € -🌿{product.carbon}</p>
      <p className="producer">{product.producer}</p>
    </div>
  );
};

export default ProductItem;