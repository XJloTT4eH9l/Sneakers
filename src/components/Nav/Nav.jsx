import './Nav.scss';

function Nav() {
    return (
        <nav className='nav'>
            <ul className='nav__list'>
                <li className='nav__item'><a href="index.html" className='nav__link'><img src='img/cart.svg' alt='cart'></img></a></li>
                <li className='nav__item'><a href="index.html" className='nav__link'><img src='img/favorit.svg' alt='favorit'></img></a></li>
                <li className='nav__item'><a href="index.html" className='nav__link'><img src='img/profile.svg' alt='profile'></img></a></li>
            </ul>
        </nav>
    )
}

export default Nav;