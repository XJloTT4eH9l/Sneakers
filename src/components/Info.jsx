import { useContext } from "react";
import AppContext from "../context";

function Info({ imgSrc, title, text}) {
    const {setCartOpen} = useContext(AppContext)
    return (
        <div className='side-cart__empty'>
            <img className='side-cart__img' src={imgSrc} alt={title}/>
            <h2 className='side-cart__empty-title'>{title}</h2>
            <p className='side-cart__text'>{text}</p>
            <button onClick={() => setCartOpen(false)} className='side-cart__empty-close'>
                <img src='img/arrow-left.png' alt='Back'/>
                 Вернуться назад
            </button>
        </div>
    )
}

export default Info;