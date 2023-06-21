import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ProductName = styled.div`
  font-size: 18px;
`;

const Cart = () => {
  // Mock data for the cart
  const cartItems = [
    {
      id: 1,
      name: 'Product 1',
      image: 'product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'product2.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'product3.jpg',
    },
  ];

  return (
    <Container>
      <Title>Cart</Title>
      {cartItems.map((item) => (
        <Product key={item.id}>
          <ProductImage src={item.image} alt={item.name} />
          <ProductName>{item.name}</ProductName>
        </Product>
      ))}
    </Container>
  );
};

export default Cart;
