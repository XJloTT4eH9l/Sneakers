import './Card.scss';
import Svg from '../Svg/Svg';

function Card({ imgUrl, title, price }) {
    return (
        <div className='card'>
            <Svg />
            <button className='card__favorit'>
                <svg className='card__like'>
                    <use href='#like'></use>
                </svg>
            </button>
            <img className='card__img' src={imgUrl} alt={title}/>
            <h3 className='card__title'>{title}</h3>
            <p className='card__text'>Цена:</p>
            <p className='card__price'>{price}</p>
            <button className='card__add'>
                <svg className='card__plus'>
                    <use href='#plus'></use>
                </svg>
            </button>
        </div>
    )
}

export default Card;