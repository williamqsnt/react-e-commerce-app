import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import avatar from '../assets/icons/avatar.svg';
import panier from '../assets/icons/cart.svg';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  z-index: 999;
  box-shadow: 2px 2px 4px lightgrey;

  a{
    color : unset;
    text-decoration : none;
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

const CartLabel = styled.span`
  font-size: 12px;
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  margin-left: 4px;
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
  margin: 1em;
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
  background-color: white;
  cursor: pointer;
`;

const Quantity = styled.div`
  margin: 1em;
`;

const RemoveButton = styled.button`
  color: red;
  border: none;
  background-color: unset;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  font-weight: medium;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  font-size: 1.5em;
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

const CartItemsContainer = styled.div`
  height: 600px;
  overflow-y: auto;
`;

const ContinueShoppingButton = styled(Button)`
  background-color: black;
  width : 250px;
  color: white;
  border-radius : 10px;
`;

const PayButton = styled(Button)`
  background-color: blue;
  width : 250px;
  border-radius : 10px;
  color: white;
`;

const Menu = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [cartItems]);

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
    const formattedTotalPrice = totalPrice.toFixed(2);
    localStorage.setItem('cartTotalPrice', formattedTotalPrice);
    return formattedTotalPrice;
  };
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <Container>
        <Link to="/">
            <Logo>ShopCart</Logo>
        </Link>
    
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
        <Link to="/account">Mon compte</Link>
      </Button>
      <Button style={{ display: 'flex', alignItems: 'center' }} onClick={togglePopup}>
        {cartItemCount > 0 && <CartLabel>{cartItemCount}</CartLabel>}
        <img src={panier} width={20} alt="panier" />
        Panier
      </Button>
      {isPopupOpen && <PopupBackground onClick={togglePopup} />}
      <Popup isOpen={isPopupOpen}>
        <CartPopup>
          {cartItems.length === 0 ? (
            <span>Votre panier est vide.</span>
          ) : (
            <>
              
              <CartItemsContainer>
                {cartItems.map((item) => (
                  <CartItem key={item.id}>
                    <ProductImage src={item.image} alt={item.title} />
                    <ProductTitle>{item.title}</ProductTitle>
                    <QuantityContainer>
                      <QuantityButton onClick={() => handleDecreaseQuantity(item.id)}>-</QuantityButton>
                      <Quantity>{item.quantity}</Quantity>
                      <QuantityButton onClick={() => handleIncreaseQuantity(item.id)}>+</QuantityButton>
                    </QuantityContainer>
                    <p>${item.price * item.quantity}</p>
                    <RemoveButton onClick={() => handleRemoveItem(item.id)}>Supprimer</RemoveButton>
                  </CartItem>
                ))}
              </CartItemsContainer>
              <Button onClick={handleClearCart}>Vider le panier</Button>
              <TotalPrice>
                <p>Total</p>
                <p>${calculateTotalPrice()} TTC</p>
              </TotalPrice>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <ContinueShoppingButton onClick={togglePopup}><Link to="/">Continuez vos achats</Link></ContinueShoppingButton>
                <Link to="/Checkout"><PayButton>Payer</PayButton></Link>
              </div>
            </>
          )}
        </CartPopup>
      </Popup>
    </Container>
  );
};

export default Menu;
