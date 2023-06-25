import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../utils";
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
        <div className="title-login">
          <h3>🔰 kichat</h3>
          <p>Minimal Chat App</p>
        </div>
        <form onSubmit={handleLogin} className="form-login">
          <div className="input-form">
            <label htmlFor="email">Your email address</label>
            <Input
              name="email"
              placeholder="xxx@gmail.com"
              type="email"
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="input-form">
            <label htmlFor="password">Your password</label>
            <Input
              name="password"
              placeholder="#Xxx47"
              type="password"
              value={password}
              setValue={setPassword}
            />
          </div>
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
