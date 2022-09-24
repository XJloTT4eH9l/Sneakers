import './Nav.scss';

function Nav({ setCartOpen, setOverlay }) {

    function onCartClick() {
        setCartOpen('side-cart--active');
        setOverlay('overlay--active');
    }
    return (
        <nav className='nav'>
            <ul className='nav__list'>
                <li onClick={onCartClick} className='nav__item'><img src='img/cart.svg' alt='cart'></img></li>
                <li className='nav__item'><a href="index.html" className='nav__link'><img src='img/favorit.svg' alt='favorit'></img></a></li>
                <li className='nav__item'><a href="index.html" className='nav__link'><img src='img/profile.svg' alt='profile'></img></a></li>
            </ul>
        </nav>
    )
}

export default Nav;