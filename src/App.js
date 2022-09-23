import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import SideCart from "./components/SideCart/SideCart";

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartOpen, setCartOpen] = useState(['']);

  async function getSneakers(url) {
    const responce = await fetch(url);
    const json = await responce.json();
    setSneakers(json);
  }

  useEffect(()=> {
    getSneakers('https://631ae489dc236c0b1ee6bc11.mockapi.io/sneakers');
  }, [])

  return (
    <div className="app">
      <Header setCartOpen={setCartOpen} />
      <SideCart cartOpen={cartOpen} setCartOpen={setCartOpen} />
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
