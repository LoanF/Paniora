import React, {useState} from 'react';
import SplashScreen from './pages/SplashScreen';
import ProductItem from './components/ProductItem';
import ShoppingCart from './components/ShoppingCart';
import items from './assets/items.json';
import './styles/MainApp.css';

const MainApp = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState(items);

    const handleSwipeUp = () => {
        setShowSplash(false);
    };

    const handleDragStart = (e, product) => {
        e.dataTransfer.setData('product', JSON.stringify(product));
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
            {showSplash ? (
                <SplashScreen onSwipeUp={handleSwipeUp}/>
            ) : (
                <>
                    <div className="products-list">
                        {products.map((product) => (
                            <ProductItem
                                key={product.id}
                                product={product}
                                onDragStart={handleDragStart}
                            />
                        ))}
                    </div>
                    <ShoppingCart items={cartItems} onDrop={handleDrop}/>
                </>
            )}
        </div>
    );
};

export default MainApp;