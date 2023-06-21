import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
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

const SearchBar = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 20px;
  background-color: lightgrey;
  color: black;
  border: none;
  padding: 0.5em;
`;

const Button = styled.button`
  color: black;
  border: none;
  background-color: unset;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const SearchResultContainer = styled.div`
  position: absolute;
  top: 40px;
  background-color: white;
  width: 100%;
  padding : 1em;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const Menu = () => {
  

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
      <Button style={{ display: 'flex', alignItems: 'center' }}>
        <img src={panier} width={20} alt="panier" />
        <Link to="/cart">Cart</Link>
      </Button>
    </Container>
  );
};

export default Menu;
