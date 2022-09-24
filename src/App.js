import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import SideCart from "./components/SideCart/SideCart";

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartOpen, setCartOpen] = useState('');
  const [overlay, setOverlay] = useState('overlay');
  const [cartItems, setCartItems] = useState([]);
  const [scroll, setScroll] = useState('');

  async function getSneakers(url) {
    const responce = await fetch(url);
    const json = await responce.json();
    setSneakers(json);
  }

  const onAddToCart = (obj) => {
    if(cartItems.length > 3) {
      setScroll('side-cart--scroll');
    }
    setCartItems(prev => [...prev, obj]);
  }

  useEffect(()=> {
    getSneakers('https://631ae489dc236c0b1ee6bc11.mockapi.io/sneakers');
  }, [])

  return (
    <div className="app">
      <Header setCartOpen={setCartOpen} setOverlay={setOverlay} />
      <SideCart
        scroll={scroll}
        overlay={overlay}
        setOverlay={setOverlay}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems} 
      />
      <section className="catalog">
        <div className="container">
          <Search placeholder='Поиск...'/>
          <div className="items">
            {sneakers.map(item => {
              return (
                <Card 
                  key={item.id}
                  imgUrl={item.imgUrl}
                  title={item.title}
                  price={item.price}
                  onCart={onAddToCart}
                />
              ) 
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
