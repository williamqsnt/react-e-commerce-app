import logo from './logo.svg';
import './App.css';
import Account from './pages/Account';
import styled from '@emotion/styled';
import Menu from './components/Menu';
import Discount from './components/Discount';
import LandingProduct from './components/LandingProduct';

function App() {

  
  return (
    <Container>
      <Menu />
      <Discount />
      <LandingProduct />
    </Container>
  );
}

export default App;

const Container = styled.div`


`
