import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./utils/firebase";
import styled from '@emotion/styled';
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  a{
    text-decoration :none;
    color : black;
  }
`;

const Form = styled.form`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  display : flex;
  flex-direction : column;
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

const Message = styled.p`
  text-align: center;
  color: green;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  const signUp = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccessMessage("Votre compte a été créé. Veuillez vous connecter.");
        setErrorMessage("");
        formRef.current.reset();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Une erreur s'est produite lors de la création du compte.");
      });
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={signUp}>
        <Title>Se créer un compte</Title>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Créer un compte</Button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/SignIn">Vous avez déjà un compte ? <span style={{color : 'blue'}}>Connectez-vous</span> </Link>
        {successMessage && <Message>{successMessage}</Message>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default SignUp;
