import './SideCart.scss';

function SideCart({ scroll, cartOpen, setCartOpen, cartItems, onRemoveItem }) {

    function onCartClose() {
        setCartOpen(!cartOpen);
    }


    return (
        <div className={cartOpen ? 'overlay--active' : 'overlay'}>
            <div className={cartOpen ? `side-cart--active ${scroll}` : `side-cart ${scroll}`}>
                <div className='side-cart__head'>
                    <div className='side-cart__header'>
                        <h2 className='side-cart__title'>Корзина</h2>
                        <button onClick={onCartClose} className='side-cart__remove'>
                            <img src='img/delete.svg' alt='remove' />
                        </button>
                    </div>
                    {cartItems.length > 0 ? 
                        cartItems.map(item => {
                            return (
                            <div className='side-cart__item' key={item.id}>
                                <img src={item.imgUrl} alt={item.title}></img>
                                <div className='side-cart__descr'>
                                    <h3 className='side-cart__name'>{item.title}</h3>
                                    <p className='side-cart__price'>{item.price}</p>
                                </div>
                                <button onClick={() => onRemoveItem(item.id)} className='side-cart__remove'><img src='img/delete.svg' alt='remove'></img></button>
                            </div>
                            )
                        }) : 
                        <div className='side-cart__empty'>
                            <img className='side-cart__img' src='img/cart-empty.jpg' alt='Empty Cart'/>
                            <h2 className='side-cart__empty-title'>Корзина пустая</h2>
                            <p className='side-cart__text'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                            <button onClick={() => setCartOpen(false)} className='side-cart__empty-close'><img src='img/arrow-left.png' alt='Back'/> Вернуться назад</button>
                        </div>
                    }
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

export default SideCart;