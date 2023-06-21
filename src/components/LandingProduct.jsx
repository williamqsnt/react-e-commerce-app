import React, { useState } from 'react';
import styled from '@emotion/styled';
import APMAX from '../assets/img/airpodsmax.png';
import BBE from '../assets/img/BBE.png';
import WE from '../assets/img/WE.png';
import JBTLT600 from '../assets/img/JBLT600.png';
import A2 from '../assets/img/A2.png';
import Apro from '../assets/img/Apro.png';
import SonyWH from '../assets/img/SonyWH.png';

const products = [
  { id: 1, title: 'Wireless Earbuds', price: 89, image: WE },
  { id: 2, title: 'AirPods Max', price: 559, image: APMAX },
  { id: 3, title: 'Bose BT Earphones', price: 289, image: BBE },
  { id: 4, title: 'JBL TUNE 600BTNC', price: 59, image: JBTLT600 },
  { id: 5, title: 'Airpods (2e génération)', price: 124, image: A2 },
  { id: 6, title: 'Airpods Pro (2e génération)', price: 239, image: Apro },
  { id : 7, title : 'Sony WH-CH720N', price : 119, image : SonyWH}
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
  margin-bottom: 5px;
`;

const AddToCartButton = styled.button`
  background-color: unset;
  color: black;
  border: 1px solid black;
  border-radius : 50px; 
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  :hover{
    background-color : darkgreen;
    color : white;
    border : none;
    transition : 0.2s;
  }
`;

const Popup = styled.div`
  background-color: #fff;
  padding: 10px;
  z-index: 1;
`;

const ResetFiltersButton = styled.button`
  position: relative;
  background-color: ${({ active }) => (active ? 'green' : 'lightgrey')};
  border-radius: 50px;
  color: ${({ active }) => (active ? '#fff' : 'black')};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const LandingProduct = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    if (term === '') {
      return [];
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  const getSortedProducts = () => {
    let sortedProducts = [...products];

    if (sortBy === 'lowest') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'highest') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts;
  };

  const resetAllFilters = () => {
    setSortBy('');
    setSearchTerm('');
    setSearchResults([]);
  };

  const renderProductList = () => {
    const productList = searchTerm !== '' ? searchResults : getSortedProducts();

    return (
      <>
        {productList.map((product) => (
          <ProductItem key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <div style={{display : 'flex', justifyContent : 'space-between', width:'100%'}}>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
            </div>
            <AddToCartButton>Ajouter au panier</AddToCartButton>
          </ProductItem>
        ))}
      </>
    );
  };

  const renderPopup = () => {
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
          <option value="lowest">Prix croissant</option>
          <option value="highest">Prix décroissant</option>
        </FilterSelect>
        <SearchBar
          type="text"
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        {sortBy && (
          <ResetFiltersButton active={true} onClick={resetAllFilters}>
            Annuler le filtre
          </ResetFiltersButton>
        )}
      </FiltersContainer>
      {renderPopup()}
      <ProductList>{renderProductList()}</ProductList>
    </Container>
  );
};

export default LandingProduct;
