import React from "react";
import logo from "../images/Logo.png";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const DeleteAccountMessage = () => {
    return(
        <div>
            <header className="App-header">
        <Link to="/Home">
          <img src={logo} />
        </Link>
      </header>
      <div class="delete-message">
      We are sorry to hear that you would like to delete your account.
      </div>
      <div class="start-account">
      If you would like to start another accout, you can always
      <Link to="/Register"> Register.</Link>
      </div>
      <Link to ='/home'>
      <button class="homepage-button"> Go To Homepage </button>
      </Link>
      <Footer></Footer>
        </div>
    );
};

export default DeleteAccountMessage; 