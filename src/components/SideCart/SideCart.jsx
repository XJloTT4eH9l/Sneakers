import './SideCart.scss';

function SideCart({ cartOpen, setCartOpen }) {
    return (
        <div className={`side-cart ${cartOpen}`}>
            <div className='side-cart__head'>
                <div className='side-cart__header'>
                    <h2 className='side-cart__title'>Корзина</h2>
                    <button onClick={() => setCartOpen('')} className='side-cart__remove'><img src='img/delete.svg' alt='remove' /></button>
                </div>
                <SideCartItem 
                    imgSrc={'img/sneakers2.jpg'}
                    title={'Мужские Кроссовки Nike Air Max 270'}
                    price={'6300грн'}
                />
            </div>
            <div className='side-cart__confirm'>
                <div className='side-cart__summary'>
                    <h3 className='side-cart__summ'>Итого:</h3>
                    <p>6300грн</p>
                </div>
                <button className='side-cart__btn'>Оформить заказ</button>
            </div>
        </div>
    )
}

function SideCartItem({ imgSrc, title, price }) {
    return (
        <div className='side-cart__item'>
            <img src={imgSrc} alt={title}></img>
            <div className='side-cart__descr'>
                <h3 className='side-cart__name'>{title}</h3>
                <p className='side-cart__price'>{price}</p>
            </div>
            <button className='side-cart__remove'><img src='img/delete.svg' alt='remove'></img></button>
        </div>
    )
}

export default SideCart;