import { useState, useContext } from 'react';
import './SideCart.scss';
import Info from '../Info';
import AppContext from '../../context';
import axios from 'axios';

function SideCart({ scroll, cartOpen, setCartOpen, onRemoveItem }) {
    const { cartItems, setCartItems} = useContext(AppContext);
    const [isOrderComlete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(0);

    async function onclickOrder() {
        try {
            setIsOrderComplete(true);
            setCartItems([]);
            setOrderId(orderId + 1);
            await axios.post('https://631ae489dc236c0b1ee6bc11.mockapi.io/orders', {items: cartItems});
        } catch (error) {
            alert('Не удалось создать заказ((');
        }
    }

    function onCartClose() {
        setCartOpen(!cartOpen);
    }

    return (
        <div className={cartOpen ? 'overlay--active' : 'overlay'}>
            <div className={cartOpen ? `side-cart--active ${scroll}` : `side-cart ${scroll}`}>
                    <div className='side-cart__header'>
                        <h2 className='side-cart__title'>Корзина</h2>
                        <button onClick={onCartClose} className='side-cart__remove'>
                            <img src='img/delete.svg' alt='remove' />
                        </button>
                    </div>
                    {
                        cartItems.length > 0 ? (
                            <>
                                <div className='side-cart__catalog'>
                                    {cartItems.map(item => {
                                    return (
                                    <div className='side-cart__item' key={item.id}>
                                        <img src={item.imgUrl} alt={item.title}></img>
                                        <div className='side-cart__descr'>
                                            <h3 className='side-cart__name'>{item.title}</h3>
                                            <p className='side-cart__price'>{item.price}</p>
                                        </div>
                                        <button onClick={() => onRemoveItem(item.id1)} className='side-cart__remove'><img src='img/delete.svg' alt='remove'></img></button>
                                    </div>
                                    )
                                    })}
                                </div>

                            <div className='side-cart__confirm'>
                                <div className='side-cart__summary'>
                                    <h3 className='side-cart__summ'>Итого:</h3>
                                    <p>6300грн</p>
                                </div>
                                <button onClick={onclickOrder} className='side-cart__btn'>Оформить заказ</button>
                            </div>
                            </>
                        ): (
                            <Info
                                imgSrc= {isOrderComlete ? 'img/order-complete.jpg' : 'img/cart-empty.jpg'}
                                title={isOrderComlete ? 'Заказ оформлен!' : 'Корзина пустая'}
                                text={isOrderComlete ? 
                                        `Ваш заказ №${orderId} скоро будет передан курьерской доставке` :
                                        'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                                }
                            />
                        )
                    }
            </div>
        </div>
    )
}

export default SideCart;