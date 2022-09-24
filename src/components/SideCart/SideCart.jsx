import './SideCart.scss';

function SideCart({ scroll, overlay, setOverlay,  cartOpen, setCartOpen, cartItems, setCartItems }) {

    function onCartClose() {
        setCartOpen('');
        setOverlay('overlay');
    }

    return (
        <div className={overlay}>
            <div className={`side-cart ${cartOpen} ${scroll}`}>
                <div className='side-cart__head'>
                    <div className='side-cart__header'>
                        <h2 className='side-cart__title'>Корзина</h2>
                        <button onClick={onCartClose} className='side-cart__remove'>
                            <img src='img/delete.svg' alt='remove' />
                        </button>
                    </div>

                    {cartItems.map(item => {
                        return (
                            <SideCartItem 
                                key={item.title}
                                title={item.title}
                                imgUrl={item.imgUrl}
                                price={item.price}
                            />
                        )
                    })}

                </div>
                <div className='side-cart__confirm'>
                    <div className='side-cart__summary'>
                        <h3 className='side-cart__summ'>Итого:</h3>
                        <p>6300грн</p>
                    </div>
                    <button className='side-cart__btn'>Оформить заказ</button>
                </div>
            </div>
        </div>
    )
}

function SideCartItem({ imgUrl, title, price }) {
    return (
        <div className='side-cart__item'>
            <img src={imgUrl} alt={title}></img>
            <div className='side-cart__descr'>
                <h3 className='side-cart__name'>{title}</h3>
                <p className='side-cart__price'>{price}</p>
            </div>
            <button className='side-cart__remove'><img src='img/delete.svg' alt='remove'></img></button>
        </div>
    )
}

export default SideCart;