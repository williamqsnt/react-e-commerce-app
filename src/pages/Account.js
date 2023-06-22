import React, { useState } from 'react';
import styled from '@emotion/styled';
import SignUp from '../components/auth/SignUp';
import Menu from '../components/Menu';

const Container = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Account = () => {
  const [showSignUp, setShowSignUp] = useState(true);

  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <Container>
      <Menu />
          <SignUp />
    </Container>
  );
};

export default Account;
