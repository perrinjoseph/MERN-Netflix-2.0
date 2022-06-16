import React, { useEffect, useRef, useState } from "react";
import NetflixLogo from "../../Assets/netflix-logo.png";
import NetflixLogoSmall from "../../Assets/netflix-logo-small.png";
import Avatar3 from "../../Assets/avatar3.png";
import { navBarRoutes } from "../../Constants/constant";
import { FiSearch, FiBell, FiChevronDown, FiLogOut } from "react-icons/fi";
import { navbarTypes } from "./constants";
import Button from "../Button/Button";
import { buttonTypes } from "../Button/constants";
import { AiFillHome } from "react-icons/ai";
import { BsCollectionPlayFill } from "react-icons/bs";
import { MdLibraryAdd, MdWhatshot } from "react-icons/md";
import { FiCast } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
import { logoutUserThunk } from "../../Redux/thunks";
import useToggle from "../../Hooks/useToggle";

function Navbar({ type }) {
  const chevronRef = useRef();
  const [toggle, setToggle] = useToggle(chevronRef);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const { data } = useSelector(({ user: { data } }) => ({ data }));

  useEffect(() => {
    const listener = window.addEventListener("scroll", () => {
      setIsScrolled(window.pageYOffset > 0);
    });
    return () => listener;
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setToggle(true);
    dispatch(logoutUserThunk());
  };

  if (type === navbarTypes.MOBILE_HOME) {
    return (
      <nav className="navbar-mobile">
        <button
          className={`navbar-mobile--buttons ${
            activeLink === 1 ? "navbar-mobile--buttons-clicked" : ""
          }`}
          onClick={() => setActiveLink(1)}
        >
          <AiFillHome size={23} />
          Home
        </button>
        <button
          className={`navbar-mobile--buttons ${
            activeLink === 2 ? "navbar-mobile--buttons-clicked" : ""
          }`}
          onClick={() => setActiveLink(2)}
        >
          <BsCollectionPlayFill size={23} />
          New
        </button>
        <button
          className={`navbar-mobile--buttons ${
            activeLink === 3 ? "navbar-mobile--buttons-clicked" : ""
          }`}
          onClick={() => setActiveLink(3)}
        >
          <MdLibraryAdd size={23} />
          My List
        </button>
        <button
          className={`navbar-mobile--buttons ${
            activeLink === 4 ? "navbar-mobile--buttons-clicked" : ""
          }`}
          onClick={() => setActiveLink(4)}
        >
          <FiSearch size={23} />
          Search
        </button>
        <button
          className={`navbar-mobile--buttons ${
            activeLink === 5 ? "navbar-mobile--buttons-clicked" : ""
          }`}
          onClick={() => setActiveLink(5)}
        >
          <MdWhatshot size={23} />
          Top 10
        </button>
      </nav>
    );
  }

  return (
    <section
      className={`navbar ${
        isScrolled && type !== navbarTypes.ACCOUNT_SETUP
          ? "navbar-scrolled"
          : ""
      } ${type}`}
    >
      <nav className="navbar--section">
        <Link to={`${data ? "/home" : "/"}`}>
          <img
            src={NetflixLogo}
            alt="Netflix Logo"
            className={
              type === navbarTypes.SIGN_UP || type === navbarTypes.LOGIN
                ? `navbar--section--netflix-logo-xl`
                : `navbar--section--netflix-logo`
            }
          ></img>
          <img
            src={NetflixLogoSmall}
            alt="Netflix Logo"
            className="navbar--section--netflix-logo-xs"
          ></img>
        </Link>

        {type === navbarTypes.HOME_SCREEN && (
          <ul className="navbar--section--links" id="navbar-left-links">
            {navBarRoutes.map((route, index) => (
              <li
                key={`${route}-${index}`}
                className="navbar--section--links--link navbar--section--links--link-mobile"
              >
                {route}
              </li>
            ))}
          </ul>
        )}
      </nav>
      <aside className="navbar--section" id="navbar-right-section">
        <ul className="navbar--section--links">
          {type === navbarTypes.HOME_SCREEN && (
            <>
              <li className="navbar--section--links--link navbar--icons navbar--icons-hidable">
                <FiSearch color="white" />
              </li>
              <li className="navbar--section--links--link navbar--icons navbar--icons-showable">
                <FiCast color="white" />
              </li>
              <li className="navbar--section--links--link navbar--icons navbar--icons">
                <FiBell color="white" />
              </li>
              <li className="navbar--section--links--link ">
                <img
                  className="navbar--section--links--link navbar--avatar"
                  src={Avatar3}
                  alt="avatar logo"
                ></img>

                <div
                  ref={chevronRef}
                  onClick={() => {
                    setToggle((toggle) => !toggle);
                  }}
                >
                  {toggle && (
                    <aside className="navbar--section--links--dropdown">
                      <div className="navbar--section--links--dropdown--item">
                        <article className="navbar--section--links--dropdown--item--icon">
                          <BsFillPersonFill size={22} />
                        </article>
                        <article className="navbar--section--links--dropdown--item--option">
                          Account
                        </article>
                      </div>
                      <div className="navbar--section--links--dropdown--item">
                        <article className="navbar--section--links--dropdown--item--icon">
                          $
                        </article>
                        <article className="navbar--section--links--dropdown--item--option">
                          Donate
                        </article>
                      </div>
                      <div
                        className="navbar--section--links--dropdown--item"
                        onClick={handleLogout}
                      >
                        <article className="navbar--section--links--dropdown--item--icon">
                          <FiLogOut size={22} />
                        </article>
                        <article className="navbar--section--links--dropdown--item--option">
                          Sign Out
                        </article>
                      </div>
                    </aside>
                  )}
                  <FiChevronDown
                    color="white"
                    size={15}
                    className={` cheveron--container ${
                      toggle && "cheveron--container-flipped"
                    }`}
                  />
                </div>
              </li>
            </>
          )}
          {type === navbarTypes.SIGN_UP && (
            <Link to={"/login"} className="link-styles-reset">
              <Button type={buttonTypes.PRIMARY} title={navbarTypes.LOGIN} />
            </Link>
          )}
        </ul>
      </aside>
      {type === navbarTypes.HOME_SCREEN && (
        <section
          className={`navbar--overlay ${
            type === navbarTypes.HOME_SCREEN ? "navbar--overlay-show" : ""
          }`}
        ></section>
      )}
    </section>
  );
}

export default Navbar;