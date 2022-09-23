import './Header.scss';
import Nav from '../Nav/Nav';


function Header({ setCartOpen }) {
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__logo">
                        <img src="img/logo.png" alt="logo"></img>
                        <div className='header__text'>
                            <h1 className='header__title'>REACT SNEAKERS</h1>
                            <span>Магазин лучших кроссовок</span>
                        </div>
                    </div>
                    <Nav setCartOpen={setCartOpen} />
                </div>
            </div>
        </header>
    )
}

export default Header;