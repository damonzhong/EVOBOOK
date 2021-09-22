import React from "react";
import Axios from "axios";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import logo from "../images/Logo.png";
import Footer from "./Footer";

import "../styles/Form.css";

const Login = ({ appUser, setAppUser }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    const body = {
      uname: username,
      password: password,
    };
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    Axios.post("/users/api/auth", body).then((res) => {
      console.log(res.data.success == true);
      if (res.data.success == true) {
        // it worked

        setIsLoggedIn(true);
        setAppUser(username);
        //console.log(isLoggedIn);
        //console.log(username)
      } else {
        // Auth Error
        setError(res.data.response);
        alert(res.data.response);
      }
    });
  };

  if (appUser) {
    console.log(appUser);
    return <Redirect to="/Profile" appUser={appUser} setAppUser={setAppUser} />;
  }

  return (
    <div className="Login">
      <header className="App-header">
        <Link to="/Home">
          <img src={logo} />
        </Link>
      </header>
      <form class="App-body Register-Login-Form" onSubmit={handleLogin}>
        <h1>Member Login</h1>
        <fieldset>
          <div className="Line">
            <label> Username </label>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="Line">
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
        </fieldset>

        <fieldset>
          <button
            type="submit"
            disabled={!username || !password}
            onSubmit={handleLogin}
            className="btn btn-secondary btn-sm"
            value="submit"
          >
            {" "}
            Login{" "}
          </button>
        </fieldset>
        <div>{error && <strong> {error} </strong>}</div>
      </form>

      <fieldset>
        <a href="/Construction">Forgot Username/Password</a>
      </fieldset>
      <fieldset>
        <label>Don't have any account?</label>
        <a href="/Register" className="badge m-2 badge-primary">
          Click here to Register
        </a>
      </fieldset>
      <Footer></Footer>
    </div>
  );
};

export default Login;
