import React, { useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import ProductStack from './components/ProductStack';
import ShoppingCart from './components/ShoppingCart';
import './styles/MainApp.css';

const MainApp = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Tomate locale', image: 'tomate.jpg', type: 'local' },
    { id: 2, name: 'Pomme importée', image: 'pomme.jpg', type: 'imported' },
    // Ajoutez d'autres produits ici
  ]);

  const handleSwipeUp = () => {
    setShowSplash(false);
  };

  const handleDragStart = (product) => {
    // Vous pouvez ajouter des logiques supplémentaires ici si nécessaire
  };

  const handleDrop = (product) => {
    setCartItems([...cartItems, product]);
    setProducts(products.filter(p => p.id !== product.id));
  };

  const handleRemove = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="main-app">
      <div className="app-content">
        <ProductStack
          products={products}
          onDragStart={handleDragStart}
          onRemove={handleRemove}
        />
        <ShoppingCart items={cartItems} onDrop={handleDrop} />
      </div>
      {showSplash && <SplashScreen onSwipeUp={handleSwipeUp} />}
    </div>
  );
};

export default MainApp;
