import React, { useState, useRef } from "react";
import "./RegisterScreen.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function RegisterScreen() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      console.log(e);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">Create an Account</div>
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input type="email" placeholder="Email Address" ref={emailRef} />
          </div>
          <div id="password">
            <input type="password" placeholder="Password" ref={passwordRef} />
          </div>
          <div id="password-confirm">
            <input
              type="password"
              placeholder="Confirm Password"
              ref={passwordConfirmRef}
            />
          </div>
          <button className="form-submit-btn" type="submit" disabled={loading}>
            Sign Up
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <hr />
        <div className="login-small">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
