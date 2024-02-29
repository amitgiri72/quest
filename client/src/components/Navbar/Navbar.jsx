import React, { useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import decode from "jwt-decode";

import Avatar from '../Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'


import search from '../../assets/search-solid.svg'
import bars from "../../assets/bars-solid.svg";
import './Navbar.css'


// ... (import statements)

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
    navigate('/');
    dispatch(setCurrentUser(null));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    if (user?.result) {
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }
  }, [user?.token, dispatch]);

  return (
    <nav className={`main-nav ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className={`navbar-1 ${isMenuOpen ? 'show-menu' : ''}`}>
          <Link to="/" className="nav-item nav-logo" onClick={closeMenu}>
            <h1>QUEST</h1>
          </Link>
          <Link to="/player" className="nav-item nav-btn res-nav" onClick={closeMenu}>
            Player
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav" onClick={closeMenu}>
            Community
          </Link>
        </div>
        <div className="navbar-2">
          <form>
            <input type="text" placeholder="   Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
          {user === null ? (
            <Link to={'/Auth'} className="nav-item nav-links" onClick={closeMenu}>
              Log In
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${user?.result?._id}`}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  {user.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={() => { closeMenu(); handleLogout(); }}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

