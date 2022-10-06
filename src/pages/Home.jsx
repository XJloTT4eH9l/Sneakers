import { useContext } from "react";

import Card from "../components/Card/Card";
import Search from "../components/Search/Search";
import AppContext from "../context";

function Home() {

  const { sneakers, value, setValue , onAddToCart, onAddToFavorite } = useContext(AppContext);

  const renderItems = () => {
    return sneakers
      .filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
      .map(item => {
        return (
          <Card 
            key={item.title}
            id={item.id}
            imgUrl={item.imgUrl}
            title={item.title}
            price={item.price}
            onCart={onAddToCart}
            onFavorit={onAddToFavorite}
          />
        ) 
      })
  }

    return(
        <section className="catalog">
        <div className="container">
          <Search value={value} setValue={setValue} placeholder='Поиск...'/>
          <div className="items">
            {renderItems()}
          </div>
        </div>
      </section>
    )
}

export default Home;