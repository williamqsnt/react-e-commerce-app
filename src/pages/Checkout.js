import React, { useState } from "react";
import styled from "@emotion/styled";
import Menu from "../components/Menu";

const Checkout = () => {
  const cartTotalPrice = localStorage.getItem("cartTotalPrice");
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardFullName, setCardFullName] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleAddCard = () => {
    setShowPopup(true);
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
  };

  let content;

  if (!submitted) {
    content = (
      <FormContainer onSubmit={handleSubmit}>
        <SectionTitle>1. Adresse de Livraison</SectionTitle>
        <InputLabel>
          Nom complet :
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nom complet"
          />
        </InputLabel>
        <InputLabel>
          Rue :
          <Input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Rue"
          />
        </InputLabel>
        <InputLabel>
          Ville :
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ville"
          />
        </InputLabel>
        <InputLabel>
          Code postal :
          <Input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Code postal"
          />
        </InputLabel>
        <EditButton type="button" onClick={handleAddCard}>
          Modifier
        </EditButton>
        <SubmitButton type="submit" value="Valider" />
      </FormContainer>
    );
  } else {
    content = (
      <p>
        <p style={{ fontWeight: "bold", fontSize: "1.5em" }}>
          1. Adresse de Livraison:
        </p>
        {fullName} {street}, {city} {postalCode}
      </p>
    );
  }

  return (
    <Container>
      <Menu />
      <ContentWrapper>
        <GridContainer>
          <div>
            {content}
            <SectionTitle>2. Mode de Paiement</SectionTitle>
            <InputLabel>Vos cartes de crédit et de débit :</InputLabel>
            <AddCardButton type="button" onClick={handleAddCard}>
              Ajouter une carte de crédit
            </AddCardButton>
          </div>
          <div>
            <TotalPrice>
              <p>Montant Total du Panier</p>
              <p>${cartTotalPrice}</p>
            </TotalPrice>
          </div>
        </GridContainer>
      </ContentWrapper>
      {showPopup && (
        <PopupContainer>
          <PopupContent>
            <PopupTitle>Ajouter une carte de crédit</PopupTitle>
            <PopupForm onSubmit={handlePopupSubmit}>
              <PopupInputLabel>
                Numéro de carte :
                <PopupInput
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Numéro de carte"
                />
              </PopupInputLabel>
              <PopupInputLabel>
                Nom complet :
                <PopupInput
                  type="text"
                  value={cardFullName}
                  onChange={(e) => setCardFullName(e.target.value)}
                  placeholder="Nom complet"
                />
              </PopupInputLabel>
              <PopupInputLabel>
                Date d'expiration :
                <PopupInput
                  type="text"
                  value={cardExpiration}
                  onChange={(e) => setCardExpiration(e.target.value)}
                  placeholder="Date d'expiration"
                />
              </PopupInputLabel>
              <PopupInputLabel>
                CVV :
                <PopupInput
                  type="text"
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value)}
                  placeholder="CVV"
                />
              </PopupInputLabel>
              <PopupSubmitButton type="submit" value="Valider" />
            </PopupForm>
          </PopupContent>
        </PopupContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 5em;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2em;
`;

const SectionTitle = styled.h2`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-gap: 20px;
  margin-top: 2em;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

const Input = styled.input`
  padding: 0.5em;
  border: none;
  background-color: #f4f4f4;
`;

const EditButton = styled.button`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.input`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  background-color: #f4f4f4;
  padding: 1em;
  text-align: center;
`;

const AddCardButton = styled.button`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 2em;
`;

const PopupTitle = styled.h3`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const PopupForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const PopupInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

const PopupInput = styled.input`
  padding: 0.5em;
  border: none;
  background-color: #f4f4f4;
`;

const PopupSubmitButton = styled.input`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

export default Checkout;
