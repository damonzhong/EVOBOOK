import React from "react";
import logo from "../images/Logo.png";
import activityBook from "../images/icons/openBook.png";
import insights from "../images/icons/graph.png";
import shop from "../images/icons/shopping-cart.png";
import inventory from "../images/icons/school-book-bag.png";
import profile from "../images/icons/user.png";
import settings from "../images/icons/settings.png";
import { Link } from "react-router-dom";

import "../styles/Header.css";

const Header = ({ appUser, setAppUser }) => {
  return (
    <div class="navBar">
      <Link to="/home">
        <img class="logo" src={logo} href="/home" />
      </Link>

      <div class="navItems">
        <Link to="/ActivityBook" appUser={appUser} setAppUser={setAppUser}>
          <button class="navItem">
            <img class="navPic" src={activityBook} />
            Activity Book
          </button>
        </Link>
        <Link to="/Insights" appUser={appUser} setAppUser={setAppUser}>
          <button class="navItem">
            <img class="navPic" src={insights} />
            Insights
          </button>
        </Link>
        <Link to="/Shop">
          <button class="navItem" appUser={appUser} setAppUser={setAppUser}>
            <img class="navPic" src={shop} />
            Shop
          </button>
        </Link>
        <Link to="/Inventory" appUser={appUser} setAppUser={setAppUser}>
          <button class="navItem">
            <img class="navPic" src={inventory} />
            Inventory
          </button>
        </Link>
        <Link to="/Profile" appUser={appUser} setAppUser={setAppUser}>
          <button class="navItem">
            <img class="navPic" src={profile} />
            Profile
          </button>
        </Link>
        <Link to="/Settings" appUser={appUser} setAppUser={setAppUser}>
          <button class="navItem">
            <img class="navPic" src={settings} />
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
