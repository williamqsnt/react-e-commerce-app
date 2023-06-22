import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import APMAX from '../assets/img/airpodsmax.png';
import BBE from '../assets/img/BBE.png';
import WE from '../assets/img/WE.png';
import JBTLT600 from '../assets/img/JBLT600.png';
import A2 from '../assets/img/A2.png';
import Apro from '../assets/img/Apro.png';
import SonyWH from '../assets/img/SonyWH.png';
import BS3 from '../assets/img/BS3.png';
import JBLT510 from '../assets/img/JBLT510.png';
import BSB from '../assets/img/BSB.png';

const products = [
  { id: 1, title: 'Wireless Earbuds', price: 89, image: WE },
  { id: 2, title: 'AirPods Max', price: 559, image: APMAX },
  { id: 3, title: 'Bose BT Earphones', price: 289, image: BBE },
  { id: 4, title: 'JBL TUNE 600BTNC', price: 59, image: JBTLT600 },
  { id: 5, title: 'Airpods (2e génération)', price: 124, image: A2 },
  { id: 6, title: 'Airpods Pro (2e génération)', price: 239, image: Apro },
  { id: 7, title: 'Sony WH-CH720N', price: 119, image: SonyWH },
  { id: 8, title: 'Beats Studio 3', price: 255, image: BS3 },
  { id: 9, title: 'JBL TUNE 510Bt', price: 44.95, image: JBLT510 },
  { id: 10, title: 'Beats Studio Buds', price: 170, image: BSB }
];

const Container = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterSelect = styled.select`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 50px;
  border: none;
  background-color: #f0f0f2;
`;

const SearchBar = styled.input`
  padding: 1em;
  font-size: 16px;
  border-radius: 50px;
  border: none;
  background-color: #f0f0f2;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ProductItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin-bottom: 20px;
  margin: 2em;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductTitle = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductPrice = styled.span`
  margin-bottom: 10px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 50px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  z-index: 999;
`;

const LandingProduct = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
const [cartItems, setCartItems] = useState(() => {
  const storedCartItems = localStorage.getItem('cartItems');
  return storedCartItems ? JSON.parse(storedCartItems) : [];
});  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleAddToCart = (product) => {
    const productIndex = cartItems.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[productIndex].quantity += 1;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    setShowPopup(true);
  };

  const handleSortByChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSearchTermChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = performSearch(term);
    setSearchResults(results);
  };

  const performSearch = (term) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  const renderPopup = () => {
    if (showPopup) {
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      return <Popup>Un produit a été ajouté au panier.</Popup>;
    }

    if (searchTerm !== '' && searchResults.length === 0) {
      return <Popup>Aucun produit trouvé.</Popup>;
    }

    return null;
  };

  return (
    <Container>
      <FiltersContainer>
        <FilterSelect value={sortBy} onChange={handleSortByChange}>
          <option value="">Trier par</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </FilterSelect>
        <SearchBar
          type="text"
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </FiltersContainer>
      <ProductList>
        {searchTerm !== '' && searchResults.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          (searchTerm === '' ? products : searchResults).map((product) => (
            <ProductItem key={product.id}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>{product.price} €</ProductPrice>
              <AddToCartButton onClick={() => handleAddToCart(product)}>
                Ajouter au panier
              </AddToCartButton>
            </ProductItem>
          ))
        )}
      </ProductList>
      {renderPopup()}
    </Container>
  );
};

export default LandingProduct;
