import React, { useState } from "react";
import styled from "@emotion/styled";
import Menu from "../components/Menu";
import { PayPalButton } from "react-paypal-button-v2";

const Checkout = () => {
  const cartTotalPrice = localStorage.getItem("cartTotalPrice");
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardFullName, setCardFullName] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === "WILLI20") {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };

  let content;

  if (!submitted) {
    content = (
      <FormContainer onSubmit={handleSubmit}>
        <SectionTitle>1. Adresse de Livraison</SectionTitle>
        <InputLabel>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nom complet"
          />
        </InputLabel>
        <InputLabel>
          <Input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Rue"
          />
        </InputLabel>
        <InputLabel>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ville"
          />
        </InputLabel>
        <InputLabel>
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
        <EditButton type="button" onChange={street}>
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
        <p style={{ fontWeight: "bold", fontSize: "2em" }}>
          2. Mode de Paiement:
        </p>
        Nom complet: {cardFullName}
        <br />
        Derniers chiffres de la carte: {lastFourDigits}
      </p>
    );
  } else {
    cardContent = (
      <div>
        <SectionTitle>3. Mode de Paiement</SectionTitle>
        <PayPalButton />
      </div>
    );
  }

  const totalPriceHT = cartTotalPrice - (discountApplied ? cartTotalPrice * 0.2 : 0);
  const totalPriceTTC = cartTotalPrice - (discountApplied ? cartTotalPrice * 0.2 : 0);

  return (
    <Container>
      <Menu />
      <ContentWrapper>
        <GridContainer>
          <div>
            {content}
            <SectionTitle>2. Ajouter un code promotionnel (optionnel)</SectionTitle>
            <InputLabel>
              <Input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder="Code promotionnel"
              />
            </InputLabel>
            <ApplyPromoButton onClick={applyPromoCode}>
              Appliquer le code promotionnel
            </ApplyPromoButton>
            {discountApplied ? (
              <div style={{margin : '1em', backgroundColor : 'green', color : 'white', padding : '1em'}}>-20% a été appliqué à votre commande</div>
            ) : (
              promoCode && <div style={{margin : '1em', backgroundColor : 'red', color : 'white', padding : '1em'}}>Ce code est inexistant</div>

            )}
            {cardContent}
          </div>
          <div>
            <TotalPrice>
            <p>Montant total TTC</p>
              <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between', width : '100%'}}>
                {discountApplied ? (<div>-20% appliquée</div>) : " "}
                <p style={{textAlign : 'end', width : '100%'}}>{totalPriceTTC} €</p>
              </div>
            </TotalPrice>
          </div>
        </GridContainer>
      </ContentWrapper>
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
  grid-template-columns: 1fr 350px;
  grid-gap: 20px;
  margin-top: 2em;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

const Input = styled.input`
  padding: 1em 4em;
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
  font-size : 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
padding : 2em;
 
`;

const AddCardButton = styled.button`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const ApplyPromoButton = styled.button`
  padding: 0.5em 1em;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
  margin-top: 1em;
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
