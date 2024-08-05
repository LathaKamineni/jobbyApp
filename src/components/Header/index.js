import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {GoHome} from 'react-icons/go'
import {IoBagHandleOutline} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'
const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-home-header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="header-mobile-view-container">
        <ul className="nav-items-list">
          <li>
            <Link to="/" className="link-item">
              <GoHome size={30} />
            </Link>
          </li>
          <li>
            <Link className="link-item" to="/jobs">
              <IoBagHandleOutline size={30} />
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          <FiLogOut className="logout-button-icon" size={30} />
        </button>
      </div>
      <div className="header-desktop-view-container">
        <ul className="nav-items-list">
          <li>
            <Link to="/" className="home-link">
              Home
            </Link>
          </li>
          <li>
            <Link className="home-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logout-desktop-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
