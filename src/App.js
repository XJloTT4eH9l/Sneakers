import {Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import axios from "axios";

import Home from './pages/Home';
import Favorites from './pages/Favorites';

import Header from "./components/Header/Header";
import SideCart from "./components/SideCart/SideCart";

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem('favoritesItems')));
  const [scroll, setScroll] = useState('');
  const [value, setValue] = useState('');

  useEffect(()=> {
    getSneakers('https://631ae489dc236c0b1ee6bc11.mockapi.io/sneakers');
    axios.get('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems').then(res => {
      setCartItems(res.data);
    })
    const favoritesData = window.localStorage.getItem('favoritesItems');
    if(favoritesData !== null) setFavorites(JSON.parse(favoritesData));
  }, [])

  useEffect(() => {
    window.localStorage.setItem('favoritesItems', JSON.stringify(favorites));
    console.log(favorites);
  }, [favorites])

  async function getSneakers(url) {
    await axios.get(url).then(res => {
      setSneakers(res.data);
    })
  }

  const onAddToCart = async (obj) => {
    // obj.idL = cartCounter; 
    // cartCounter++;
    const {data} = await axios.post('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems', obj);
    if(cartItems.length > 3) {
      setScroll('side-cart--scroll');
    }
    setCartItems(prev => [...prev, data]);
  }
 
  const onRemoveItem = async (id) => {
    // cartCounter--;
    setCartItems(prev => prev.filter(item => item.id !== id));
    await axios.delete(`https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems/${id}`);
  }

  const onAddToFavorite = (obj) => {
    if(favorites.find(favObj => favObj.id === obj.id)) {
      setFavorites(prev => prev.filter(item => item.id !== obj.id));
    } else {
      setFavorites(prev => [...prev, obj]);
    }
  }

  useEffect(() => {
    cartOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow ='visible';
  }, [cartOpen])

  return (
    <div className="app">
      <Header setCartOpen={setCartOpen} />
      <SideCart
        scroll={scroll}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems} 
        onRemoveItem={onRemoveItem}
      />
      <Routes>
        <Route path='/' element={<Home 
              sneakers={sneakers}
              value={value}
              setValue={setValue}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              />}>
        </Route>
          <Route path='/favorites' element={<Favorites 
            favorites={favorites}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
          />}>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
