import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./utils/firebase";
import styled from '@emotion/styled';
import { Link, useNavigate } from "react-router-dom";
import Menu from "../Menu";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color : #f8f8f8;

  a {
    color : black;
    text-decoration :none;
  }
`;

const Form = styled.form`
  background-color: #f8f8f8;
  display : flex;
  flex-direction : column;
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 500px;
  height: 30px;
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("L'email ou le mot de passe est invalide");
      });
  };

  return (
    <Container>
      <Menu />
      <Form onSubmit={signIn}>
        <Title>S'identifier</Title>
        <Input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Se connecter</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/Account">
          Pas encore de compte ? <span style={{ color: 'blue' }}> Inscrivez-vous</span>
        </Link>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default SignIn;
