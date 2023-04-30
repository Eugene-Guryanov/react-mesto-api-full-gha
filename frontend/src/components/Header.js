import logo from "../img/Vector.svg"
import { Link, useLocation } from 'react-router-dom'

function Header(props) {
  let location = useLocation()
  return (<header className="header">
    <img className="header__logo" src={logo} alt="логотип" />
    {props.loggedIn ?
      (<div className="header__container">
        <Link className="header__email" to="/">{props.email}</Link>
        <Link className="header__button" onClick={props.onSignOut} to="/logout" >Выйти</Link>
      </div>)
      : (<>{
        location.pathname === '/signup' ? (<div className="header__container">
          <Link className="header__button" to="/signin">Войти</Link>
        </div>) : (<div className="header__container">
          <Link className="header__button" to="/signup">Регистрация</Link>
        </div>)
      }
      </>)
    }
  </header>)

}

export default Header