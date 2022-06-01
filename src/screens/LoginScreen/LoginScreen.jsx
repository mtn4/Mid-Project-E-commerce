import React, { useState, useRef } from "react";
import "./LoginScreen.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function LoginScreen() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">Sign In to Buy Now</div>
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input type="email" placeholder="Email Address" ref={emailRef} />
          </div>
          <div id="password">
            <input type="password" placeholder="Password" ref={passwordRef} />
          </div>
          <button className="form-submit-btn" type="submit" disabled={loading}>
            Log In
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <hr />
        <div className="login-small">
          Don't have an account? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
