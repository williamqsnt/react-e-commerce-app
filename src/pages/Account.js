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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  height: 30px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Account = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <Container>
      <Title>Account</Title>
      <LoginForm onSubmit={handleLogin}>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default Account;
