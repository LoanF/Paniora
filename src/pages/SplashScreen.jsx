import React, { useState, useEffect, useRef } from 'react';
import '../styles/SplashScreen.css';

const SplashScreen = ({ onSwipeUp }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const splashRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaY = e.clientY - startY;
      setTranslateY(Math.min(0, deltaY));
      document.body.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    document.body.style.cursor = 'grab';

    if (translateY < -window.innerHeight * 0.1) {
      // Si le déplacement est supérieur à 50% de la hauteur de l'écran
      splashRef.current.style.transition = 'transform 0.5s ease';
      setTranslateY(-window.innerHeight);
      setTimeout(() => {
        onSwipeUp();
        document.querySelector('.app-content').classList.add('visible');
      }, 500); // Attendre la fin de l'animation
    } else {
      // Revenir à la position initiale
      splashRef.current.style.transition = 'transform 0.5s ease';
      setTranslateY(0);
    }
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsDragging(false);
      document.body.style.cursor = 'grab';
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging, startY, translateY]);

  return (
    <div
      ref={splashRef}
      className="splash-screen"
      onMouseDown={handleMouseDown}
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <h1>Paniora</h1>
      <p>Mon Panier Idéal – Le jeu des courses locales</p>
      <p>Consultez local, vivez global.</p>
      <p>Chaque achat local est un pas vers un avenir durable.</p>
    </div>
  );
};

export default SplashScreen;
