import { useState } from 'react';

import './Card.scss';
import Svg from '../Svg/Svg';

function Card({ imgUrl, title, price }) {

    const [cartAdded, setCartAdded] = useState(false);
    const [favorit, setFavorit] = useState();

    function onCartAdded() {
        setCartAdded((prev) => !prev);
    }

    function onFavorit() {
        setFavorit((prev) => !prev);
    }

    return (
        <div className='card'>
            <Svg />
            <button className='card__favorit' onClick={onFavorit}>
                {favorit ? <img src='img/fav.png' alt='Add to favorit'></img> : <svg className='card__like'><use href='#like'></use></svg>}
            </button>
            <img className='card__img' src={imgUrl} alt={title}/>
            <h3 className='card__title'>{title}</h3>
            <p className='card__text'>Цена:</p>
            <p className='card__price'>{price}</p>
            <button className='card__add' onClick={onCartAdded}>
                {cartAdded ? <img src='img/added.svg' alt='added'></img> : <svg className='card__plus'><use href='#plus'></use></svg>}
            </button>
        </div>
    )
}

export default Card;