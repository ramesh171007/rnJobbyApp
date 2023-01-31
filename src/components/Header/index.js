import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {GiSuitcase} from 'react-icons/gi'
import {MdExitToApp} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onLogoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo-home-style"
          alt="website logo"
        />
      </Link>
      <div className="nav-options">
        <Link to="/">
          <AiFillHome className="react-icons-style" />
        </Link>
        <Link to="/jobs">
          <GiSuitcase className="react-icons-style" />
        </Link>
        <MdExitToApp className="react-icons-style" onClick={onLogoutUser} />
      </div>
      <div className="nav-option-lg">
        <ul className="options">
          <Link className="link-style" to="/">
            <li className="li-style">Home</li>
          </Link>
          <Link className="link-style" to="/jobs">
            <li className="li-style">Jobs</li>
          </Link>
        </ul>
      </div>
      <div className="logout-container">
        <button type="button" className="logout-style" onClick={onLogoutUser}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
