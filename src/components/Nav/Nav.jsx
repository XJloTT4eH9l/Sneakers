import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import AppContext from '../../context';
import Svg from '../Svg/Svg';

function Nav({ setCartOpen }) {
    const { cartItems } = useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    function onCartClick() {
        setCartOpen(prev => !prev);
    }

    return (
        <nav className='nav'>
            <Svg/>
            <ul className='nav__list'>
                <li onClick={onCartClick} className='nav__item'><img src='img/cart.svg' alt='cart'></img>{totalPrice} грн</li>
                <li className='nav__item'><Link to="/favorites" className='nav__link'><svg className='nav__fav'><use href='#favorit'></use></svg></Link></li>
                <li className='nav__item'><Link to="/orders" className='nav__link'><img src='img/profile.svg' alt='profile'></img></Link></li>
            </ul>
        </nav>
    )
}

export default Nav;