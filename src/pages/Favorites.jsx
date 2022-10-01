import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../context';
import Card from "../components/Card/Card";

function Favorites() {
    const { favorites, onAddToCart, onAddToFavorite } = useContext(AppContext);

    return (
        <section className="catalog">
            <div className="container">
                {favorites.length > 0 ? (
                    <>
                        <h1 className="title">Мои закладки</h1>
                        <div className="items">
                            {favorites.map(item => {
                                return (
                                    <Card 
                                    key={item.title}
                                    id={item.id}
                                    imgUrl={item.imgUrl}
                                    title={item.title}
                                    price={item.price}
                                    favorited={true}
                                    onCart={onAddToCart}
                                    onFavorit={onAddToFavorite}
                                    />
                                ) 
                            })}
                        </div>
                    </>
                ) : (
                    <div className="empty-section">
                        <div className="empty-section__content">
                            <img src='img/sad.png' alt='sad' />
                            <h2 className="empty-section__title">Закладок нет :(</h2>
                            <p className="empty-section__text">Вы ничего не добавляли в закладки</p>
                            <Link to='/'><button className='side-cart__empty-close'><img src='img/arrow-left.png' alt='Back'/> Вернуться назад</button></Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Favorites;