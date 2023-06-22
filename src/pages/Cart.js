import React, { useState, useEffect } from 'react';

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div>
      <h1>Panier</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Panier;

