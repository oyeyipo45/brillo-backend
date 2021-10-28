import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  

  const openMenu = () => {
    document.querySelector(".nav__menu").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".nav__menu").classList.remove("open");
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div>
          <Link to="/" className="nav_logo">
            <h2>Brillo</h2>
          </Link>
        </div>

        {userInfo ? (
          <div className="nav__menu" id="nav-menu">
            <div className="nav__toggle" id="nav-toggle" onClick={closeMenu}>
              <img
                src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png"
                alt="close icon"
              />
            </div>
            <ul className="nav__list">
              <li className="nav__item">
                {" "}
                <Link className="nav__link" to={`/profile/${userInfo._id}`}>
                  {userInfo.name}
                </Link>
              </li>
              {userInfo.role === "hirer" ? (
                <>
                  <li className="nav__item">
                    <Link to={`/createPost`} className="nav__link">
                      Post Job
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav__item">
                  <Link
                    to={`/placedBids/${userInfo._id}`}
                    className="nav__link"
                  >
                    Placed Bids
                  </Link>
                </li>
              )}

              <li className="nav__item">
                <Link to={`/profile/${userInfo._id}`} className="nav__link">
                  Profile
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/login"
                  className="nav__link 
							logout"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav__menu" id="nav-menu">
            <div className="nav__toggle" id="nav-toggle" onClick={closeMenu}>
              <img
                src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png"
                alt="close icon"
              />
            </div>
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/login" className="nav__link">
                  Login
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/register" className="nav__link">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
        <div className="nav__toggle" id="nav-toggle" onClick={openMenu}>
          <img
            src="https://img.icons8.com/android/24/000000/menu.png"
            alt="hamburger icon"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
