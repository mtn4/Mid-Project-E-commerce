import React, { useState, useContext, useRef, useEffect } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { productsContext } from "../../contexts/productsContext";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { BsFillPersonFill, BsFillCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowRightSLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";

export default function Header() {
  const { cartObj } = useContext(productsContext);
  const [error, setError] = useState("");
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { logout, currentUser } = useAuth();
  const history = useHistory();
  const ref = useRef(null);
  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsHamburgerOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      history.push(`/${searchTerm}`);
    }
  };
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="hamburger-container">
          {isHamburgerOpen ? (
            <>
              <div className="hamburger-menu-flyout" ref={ref}>
                <div className="hamburger-menu-flyout-list-wrapper">
                  <div className="hamburger-list">
                    <Link to="/products">
                      <div
                        className="hamburger-list-item"
                        onClick={handleHamburgerClick}
                      >
                        <div className="product-category">All Products</div>
                        <div className="arrow-right">
                          <RiArrowRightSLine />
                        </div>
                      </div>
                    </Link>
                    <div
                      className="hamburger-list-item"
                      style={{ fontWeight: 700 }}
                    >
                      Shop By Department
                    </div>
                    <Link to="/audio">
                      <div
                        className="hamburger-list-item"
                        onClick={handleHamburgerClick}
                      >
                        <div className="product-category">Audio</div>
                        <div className="arrow-right">
                          <RiArrowRightSLine />
                        </div>
                      </div>
                    </Link>
                    <Link to="/cellphones">
                      <div
                        className="hamburger-list-item"
                        onClick={handleHamburgerClick}
                      >
                        <div className="product-category">Cellphones</div>
                        <div className="arrow-right">
                          <RiArrowRightSLine />
                        </div>
                      </div>
                    </Link>
                    <Link to="/computers">
                      <div
                        className="hamburger-list-item"
                        onClick={handleHamburgerClick}
                      >
                        <div className="product-category">Computers</div>
                        <div className="arrow-right">
                          <RiArrowRightSLine />
                        </div>
                      </div>
                    </Link>
                    <Link to="/videogames">
                      <div
                        className="hamburger-list-item"
                        onClick={handleHamburgerClick}
                      >
                        <div className="product-category">Video Games</div>
                        <div className="arrow-right">
                          <RiArrowRightSLine />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="c-overlay-backdrop"></div>
            </>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={handleHamburgerClick}
          className={`hamburger ${isHamburgerOpen === true ? "is-active" : ""}`}
        >
          <GiHamburgerMenu />
        </div>
        <div className="logo">
          <Link to="/">BuyNow</Link>
        </div>
        <div className="search-inner">
          <div className="search-bar">
            <input
              onChange={handleInputChange}
              onKeyPress={handleEnter}
              value={searchTerm}
              type="search"
            />
          </div>
          <div className="search-button">
            <button>
              <Link to={`/${searchTerm}`}>
                <FiSearch />
              </Link>
            </button>
          </div>
        </div>
        <div className="user-container">
          <span className="face">
            <BsFillPersonFill />
          </span>
          <div>
            <div className="welcome">Welcome</div>
            <div className="user">
              {currentUser ? (
                <>
                  <Link to="/orders">{currentUser.multiFactor.user.email}</Link>
                </>
              ) : (
                <Link to="/login">Sign In / Register</Link>
              )}
            </div>
          </div>
        </div>
        <div
          className="log-out"
          style={{ display: currentUser ? "block" : "none" }}
        >
          <Link to="/" onClick={handleLogout}>
            <FiLogOut />
          </Link>
        </div>
        <div
          className="log-out"
          style={{ display: currentUser ? "block" : "none" }}
        >
          <Link to="/wishlist">
            <AiFillHeart />
          </Link>
        </div>
        <div className="cart">
          <Link to="/cart">
            <BsFillCartFill />
            <div className="cart-amount">{cartObj.total}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
