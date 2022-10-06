import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import AppContext from './context';
import axios from "axios";

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import Header from "./components/Header/Header";
import SideCart from "./components/SideCart/SideCart";

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem('favoritesItems')));
  const [cartCounter, setCartCounter] = useState(JSON.parse(localStorage.getItem('cartCounter')));
  const [scroll, setScroll] = useState('');
  const [value, setValue] = useState('');

  useEffect(()=> {
    async function fetchData() {
      const cartResponce = await axios.get('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems');
      const sneakersResponce = await axios.get('https://631ae489dc236c0b1ee6bc11.mockapi.io/sneakers');
      const ordersResponce = await axios.get('https://631ae489dc236c0b1ee6bc11.mockapi.io/orders');
      
      setCartItems(cartResponce.data);
      setSneakers(sneakersResponce.data);
      setOrders(ordersResponce.data);
    }
    
    fetchData();
    const favoritesData = window.localStorage.getItem('favoritesItems');
    if(favoritesData !== null) setFavorites(JSON.parse(favoritesData));

    const cartCounterData = window.localStorage.getItem('cartCounter');
    if(cartCounterData === null) {
      setCartCounter(1);
    } else {
      setCartCounter(JSON.parse(cartCounterData));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('favoritesItems', JSON.stringify(favorites));
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('cartCounter', JSON.stringify(cartCounter))
  }, [cartCounter]);

  const onAddToCart = (obj) => {
    if(cartItems.find(item => item.title === obj.title)) {
      setCartCounter(cartCounter - 1);
      cartItems.forEach(item => {
        if(item.title === obj.title) {
          console.log('copy');
          axios.delete(`https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems/${item.id1}`);
          setCartItems(prev => prev.filter(item => item.title !== obj.title));
        }
      })
    } else {
      obj.id1 = cartCounter;
      setCartCounter(cartCounter + 1);
      axios.post('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems', obj);
      setCartItems(prev => [...prev, obj]);
      if(cartItems.length > 3) {
          setScroll('side-cart--scroll');
        }
    }
  }
 
  const onRemoveItem = async (id1) => {
    setCartItems(prev => prev.filter(item => item.id1 !== id1));
    setCartCounter(cartCounter - 1);
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

  const isItemFavorit = (title) => {
    if(favorites === null) {
      setFavorites([]);
    }
    return favorites.some((obj) => obj.title === title);
  }

  useEffect(() => {
    cartOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow ='visible';
  }, [cartOpen])


  return (
    <AppContext.Provider value={ 
      { sneakers,
        orders,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorit,
        value,
        setValue,
        onAddToCart,
        onAddToFavorite,
        setCartItems,
        setCartOpen,
      } 
    }>
      <div className="app">
      <Header />
      <SideCart
        scroll={scroll}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems} 
        onRemoveItem={onRemoveItem}
        setCartCounter={setCartCounter}
      />
      <Routes>
        <Route path='/Sneakers/' element={ <Home /> }></Route>
        <Route path='/Sneakers/favorites' element={ <Favorites /> }></Route>
        <Route path='/Sneakers/orders' element={ <Orders /> }></Route>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;