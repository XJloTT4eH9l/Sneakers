import { useState, useEffect } from "react";

import axios from "axios";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import SideCart from "./components/SideCart/SideCart";

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scroll, setScroll] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [value, setValue] = useState('');

  async function getSneakers(url) {
    await axios.get(url).then(res => {
      setSneakers(res.data);
    })
  }

  const onAddToCart = (obj) => {
    axios.post('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems', obj);
    if(cartItems.length > 3) {
      setScroll('side-cart--scroll');
    }
    setCartItems(prev => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  useEffect(()=> {
    getSneakers('https://631ae489dc236c0b1ee6bc11.mockapi.io/sneakers');
    axios.get('https://631ae489dc236c0b1ee6bc11.mockapi.io/cartItems').then(res => {
      setCartItems(res.data);
    })
  }, [])

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
      <section className="catalog">
        <div className="container">
          <Search value={value} setValue={setValue} placeholder='Поиск...'/>
          <div className="items">
            {sneakers
            .filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
            .map(item => {
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
