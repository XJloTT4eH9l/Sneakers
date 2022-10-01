import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import AppContext from './context';
import axios from "axios";

import Home from './pages/Home';
import Favorites from './pages/Favorites';

import Header from "./components/Header/Header";
import SideCart from "./components/SideCart/SideCart";

let cartCounter = 1;

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem('favoritesItems')));
  const [scroll, setScroll] = useState('');
  const [value, setValue] = useState('');

  useEffect(()=> {
    async function fetchData() {
      const cartResponce = await axios.get('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems');
      const sneakersResponce = await axios.get('https://631ae489dc236c0b1ee6bc11.mockapi.io/sneakers');
      
      setCartItems(cartResponce.data);
      setSneakers(sneakersResponce.data);
    }
    
    fetchData();
    const favoritesData = window.localStorage.getItem('favoritesItems');
    if(favoritesData !== null) setFavorites(JSON.parse(favoritesData));
  }, [])

  useEffect(() => {
    window.localStorage.setItem('favoritesItems', JSON.stringify(favorites));
  }, [favorites])

  // async function getSneakers(url) {
  //   await axios.get(url).then(res => {
  //     setSneakers(res.data);
  //   })
  // }

  const onAddToCart = (obj) => {
    // const {data} = await axios.post('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems', obj);
    // 
    // setCartItems(prev => [...prev, data]);

    if(cartItems.find(item => item.title === obj.title)) {
      console.log('copy');
      cartCounter--;
      axios.delete(`https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems/${obj.id1}`);
      setCartItems(prev => prev.filter(item =>item.title !== obj.title));
    } else {
      obj.id1 = cartCounter;
      console.log(cartCounter);
      cartCounter++;
      axios.post('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems', obj);
      setCartItems(prev => [...prev, obj]);
      if(cartItems.length > 3) {
          setScroll('side-cart--scroll');
        }
    }
  }
 
  const onRemoveItem = async (id1) => {
    if(cartCounter <= 0) cartCounter = 1;
    cartCounter--;
    setCartItems(prev => prev.filter(item => item.id1 !== id1));
    await axios.delete(`https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems/${id1}`);
  }

  const onAddToFavorite = (obj) => {
    if(favorites.find(favObj => favObj.id === obj.id)) {
      setFavorites(prev => prev.filter(item => item.id !== obj.id));
    } else {
      setFavorites(prev => [...prev, obj]);
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  useEffect(() => {
    cartOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow ='visible';
  }, [cartOpen])

  return (
    <AppContext.Provider value={ 
      { sneakers,
        cartItems,
        favorites,
        isItemAdded,
        onAddToCart,
        onAddToFavorite,
        setCartItems,
        setCartOpen} 
    }>
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
              cartItems={cartItems}
              value={value}
              setValue={setValue}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              />}>
        </Route>
          <Route path='/favorites' element={ <Favorites /> }></Route>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
