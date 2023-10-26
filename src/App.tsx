import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import ShoppingCart from './pages/shoppingcart/index';
import ProductDetails from './pages/productDetails';
import { CartItem } from './utils/types';
import Checkout from './pages/CheckOut/checkout';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const carrinhoAbandonado = localStorage.getItem('cart');
    if (carrinhoAbandonado) {
      setCart(JSON.parse(carrinhoAbandonado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart((prevCart) => {
      console.log('Carrinho atualizado:', prevCart);
      return prevCart;
    });
  }, [cart]);

  return (
    <Routes>
      <Route path="/" element={ <Home cart={ cart } setCart={ setCart } /> } />
      <Route
        path="/shoppingcart"
        element={ <ShoppingCart
          cart={ cart }
          setCart={ setCart }
        /> }
      />
      <Route
        path="/productdetails/:idProduct"
        element={ <ProductDetails
          cart={ cart }
          setCart={ setCart }
        /> }
      />
      <Route
        path="/checkout"
        element={ <Checkout cart={ cart } setCart={ setCart } /> }
      />
    </Routes>
  );
}

export default App;
