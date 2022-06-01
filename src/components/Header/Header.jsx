import React, { useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Header() {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const history = useHistory();

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
    <div className="navbar">
      <div className="logo">
        <Link to="/">BuyNow</Link>
      </div>
      <div className="search-inner">
        <div className="search-bar">
          <input type="search" />
        </div>
        <div className="search-button">
          <button>
            <FiSearch />
          </button>
        </div>
      </div>
      <div className="navbar-products">
        <Link to="/products">Products</Link>
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
      <div className="cart">
        <Link to="/cart">
          <AiOutlineShoppingCart />
        </Link>
      </div>
    </div>
  );
}
