import { useState, useContext } from 'react';
import AppContext from '../../context';

import './Card.scss';
import Svg from '../Svg/Svg';

function Card({ id, imgUrl, title, price, onCart, onFavorit, favorited = false }) {

    const { isItemAdded } = useContext(AppContext);
    const [favorit, setFavorit] = useState(favorited);

    function onCartAdded() {
        onCart({ id, imgUrl, title, price});
    }

    function onFavoritAdded() {
        onFavorit({ id, imgUrl, title, price })
        setFavorit((prev) => !prev);
    }

    return (
        <div className='card'>
            <Svg />
            <button className='card__favorit' onClick={onFavoritAdded}>
                {favorit ? <img src='img/fav.png' alt='Add to favorit'></img> : <svg className='card__like'><use href='#like'></use></svg>}
            </button>
            <img className='card__img' src={imgUrl} alt={title}/>
            <h3 className='card__title'>{title}</h3>
            <p className='card__text'>Цена:</p>
            <p className='card__price'>{price}</p>
            <button className='card__add' onClick={onCartAdded}>
                {isItemAdded(id) ? <img src='img/added.svg' alt='added'></img> : <svg className='card__plus'><use href='#plus'></use></svg>}
            </button>
        </div>
    )
}

export default Card;