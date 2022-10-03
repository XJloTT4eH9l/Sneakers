import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../context';

import Card from '../components/Card/Card';

 
function Orders() {
    
    const { orders, onAddToCart, onAddToFavorite } = useContext(AppContext);

    return (
        <section className="catalog">
            <div className="container">
                <div className='orders'>
                <h2 className='title'>Мои заказы</h2>
                    { orders.length > 0 ? (
                        orders.map(order => {
                            return (
                                <div key={order.id}>
                                    <div className='order'>
                                        <h2 className='title'>Заказ №{order.id}</h2>
                                        <div className='items'>
                                            {order.items.map(item => {
                                                return(
                                                    <Card 
                                                        key={item.title}
                                                        id={item.id}
                                                        imgUrl={item.imgUrl}
                                                        title={item.title}
                                                        price={item.price}
                                                        onCart={onAddToCart}
                                                        onFavorit={onAddToFavorite}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="empty-section">
                            <div className="empty-section__content">
                                <img src='img/sad.png' alt='sad' />
                                <h2 className="empty-section__title">Заказов нет :(</h2>
                                <p className="empty-section__text">Вы ничего не покупали</p>
                                <Link to='/'><button className='side-cart__empty-close'><img src='img/arrow-left.png' alt='Back'/> Вернуться назад</button></Link>
                            </div>
                        </div>
                        )  
                    }
                </div>
            </div>
        </section>
    )
}

export default Orders;