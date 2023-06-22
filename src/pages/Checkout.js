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

  const handlePopupCancel = () => {
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
        &nbsp;&nbsp;
        <EditButton type="button" onClick={handleAddCard}>
          Modifier
        </EditButton>
      </p>
      
    );
  }

  let cardContent;

  if (cardNumber !== "") {
    const lastFourDigits = cardNumber.slice(-4);
    cardContent = (
      <p>
        <p style={{ fontWeight: "bold", fontSize: "1.5em" }}>
          2. Mode de Paiement:
        </p>
        Nom complet: {cardFullName}<br />
        Derniers chiffres de la carte: {lastFourDigits}
      </p>
    );
  } else {
    cardContent = (
      <div>
        <SectionTitle>2. Mode de Paiement</SectionTitle>
        <InputLabel>Vos cartes de crédit et de débit :</InputLabel>
        <AddCardButton type="button" onClick={handleAddCard}>
          Ajouter une carte de crédit
        </AddCardButton>
      </div>
    );
  }

  return (
    <Container>
      <Menu />
      <ContentWrapper>
        <GridContainer>
          <div>
            {content}
            {cardContent}
          </div>
          <div>
            <TotalPrice>
              <p>Montant Total HT</p>
              <p>${cartTotalPrice - cartTotalPrice * 0.2}</p>
              <p>Montant Total TTC :</p>
              <p>${cartTotalPrice}</p>
            </TotalPrice>
          </div>
        </GridContainer>
      </ContentWrapper>
      {showPopup && (
        <PopupContainer>
          <PopupContent>
            <PopupTitle>Ajouter une carte de crédit</PopupTitle>
            <CreditCardImage
              src="https://example.com/credit-card-image.png" // Remplacez l'URL par l'image de la carte de crédit souhaitée
              alt="Credit Card"
            />
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
              <PopupCancelButton type="button" onClick={handlePopupCancel}>
                Annuler
              </PopupCancelButton>
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
  padding : 1em;
  width : 400px;
  background-color: #f4f4f4;
`;

const EditButton = styled.button`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  color : blue;
  cursor: pointer;
`;

const SubmitButton = styled.input`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  background-color: #f4f4f4;
  padding: 1em;
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 2em;
`;

const PopupTitle = styled.h3`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const CreditCardImage = styled.img`
  width: 200px;
  height: auto;
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

const PopupCancelButton = styled.button`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const PopupSubmitButton = styled.input`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

export default Checkout;
