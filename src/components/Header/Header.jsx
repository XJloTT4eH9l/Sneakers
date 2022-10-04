import { Link } from 'react-router-dom';

import './Header.scss';
import Nav from '../Nav/Nav';


function Header({ setCartOpen }) {
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to='/Sneakers/'>
                        <div className="header__logo">
                            <img src="img/logo.png" alt="logo"></img>
                            <div className='header__text'>
                                <h1 className='header__title'>SNEAKERS</h1>
                                <span>Магазин лучших кроссовок</span>
                            </div>
                        </div>
                    </Link>
                    <Nav setCartOpen={setCartOpen} />
                </div>
            </div>
        </header>
    )
}

export default Header;