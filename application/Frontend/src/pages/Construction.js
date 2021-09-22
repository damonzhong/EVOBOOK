import React, { Component } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

import logo from "../images/Logo.png";
import construction from "../images/UnderConstruction.png";

class Construction extends Component {
  state = {};
  render() {
    return (
      <div className="Construction">
        <header className="App-header">
          <Link to="/Home">
            <img src={logo} />
          </Link>
        </header>
        <body className="construction">
          <img src={construction} />
        </body>
        <Footer></Footer>
      </div>
    );
  }
}

export default Construction;
