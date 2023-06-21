import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import avatar from '../assets/icons/avatar.svg';
import panier from '../assets/icons/cart.svg';

const Container = styled.div`
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: green;
`;

const MenuItem = styled.div`
  font-size: 14px;
`;

const Button = styled.button`
  color: black;
  border: none;
  background-color: unset;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: white;
  padding: 20px;
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  animation: ${({ isOpen }) => (isOpen ? slideInAnimation : slideOutAnimation)} 0.3s forwards;
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const CartPopup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  background-color: #f0f0f2;
  border-radius: 4px;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const ProductTitle = styled.div`
  flex-grow: 1;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const QuantityButton = styled.button`
  padding: 3px 6px;
  border: none;
  background-color: #ccc;
  cursor: pointer;
`;

const Quantity = styled.div``;

const RemoveButton = styled.button`
  color: red;
  border: none;
  background-color: unset;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  font-weight: bold;
`;

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 998;
`;

const Menu = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <Container>
      <Logo>ShopCart</Logo>
      <MenuItem>
        <Link to="/categories">Categories</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/deals">Deals</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/new">What's New</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/delivery">Delivery</Link>
      </MenuItem>
      <Button style={{ display: 'flex', alignItems: 'center' }}>
        <img src={avatar} width={20} alt="avatar" />
        <Link to="/account">Account</Link>
      </Button>
      <Button style={{ display: 'flex', alignItems: 'center' }} onClick={togglePopup}>
        <img src={panier} width={20} alt="panier" />
        Cart
      </Button>
      {isPopupOpen && <PopupBackground onClick={togglePopup} />}
      <Popup isOpen={isPopupOpen}>
        <CartPopup>
          {cartItems.length === 0 ? (
            <span>Votre panier est vide.</span>
          ) : (
            <>
              <Button onClick={togglePopup} style={{ fontSize: '2em' }}>
                &times;
              </Button>
              {cartItems.map((item) => (
                <CartItem key={item.id}>
                  <ProductImage src={item.image} alt={item.title} />
                  <ProductTitle>{item.title}</ProductTitle>
                  <p>${item.price * item.quantity}</p>
                  <QuantityContainer>
                    <QuantityButton onClick={() => handleDecreaseQuantity(item.id)}>
                      -
                    </QuantityButton>
                    <Quantity>{item.quantity}</Quantity>
                    <QuantityButton onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </QuantityButton>
                  </QuantityContainer>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>Supprimer</RemoveButton>
                </CartItem>
              ))}
              <TotalPrice>Total: ${calculateTotalPrice()}</TotalPrice>
              <Button onClick={handleClearCart}>Vider le panier</Button>
            </>
          )}
        </CartPopup>
      </Popup>
    </Container>
  );
};

export default Menu;
