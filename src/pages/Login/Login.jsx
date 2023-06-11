import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);
  return (
    <div className="container">
      <div className="login">
        <h3 className="title-login">Login</h3>
        <form onSubmit={handleLogin} className="form-login">
          <input
            className="input-form"
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            className="input-form"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {error ? <Error message={error} /> : null}
          <button type="submit" className="btn-login">
            login
          </button>
        </form>
        <span className="to-register">
          Don't you have an account? <a href="/register">register</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
