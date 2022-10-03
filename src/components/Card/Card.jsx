import { useContext } from 'react';
import AppContext from '../../context';

import './Card.scss';
import Svg from '../Svg/Svg';

function Card({ id, imgUrl, title, price, onCart, onFavorit }) {

    const { isItemAdded, isItemFavorit } = useContext(AppContext);

    function onCartAdded() {
        onCart({ id, imgUrl, title, price});
    }

    function onFavoritAdded() {
        onFavorit({ id, imgUrl, title, price })
    }

    return (
        <div className='card'>
            <Svg />
            <button className='card__favorit' onClick={onFavoritAdded}>
                {isItemFavorit(title) ? <img src='img/fav.png' alt='Add to favorit'></img> : <svg className='card__like'><use href='#like'></use></svg>}
            </button>
            <img className='card__img' src={imgUrl} alt={title}/>
            <h3 className='card__title'>{title}</h3>
            <p className='card__text'>Цена:</p>
            <p className='card__price'>{price} грн</p>
            <button className='card__add' onClick={onCartAdded}>
                {isItemAdded(id) ? <img src='img/added.svg' alt='added'></img> : <svg className='card__plus'><use href='#plus'></use></svg>}
            </button>
        </div>
    )
}

export default Card;