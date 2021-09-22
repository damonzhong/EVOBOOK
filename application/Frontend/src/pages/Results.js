import React, { Component } from "react";
import Axios from "axios";
import logo from "../images/Logo.png";
import cat from "../images/cat.png";
import dog from "../images/dog.png";
import skateboard from "../images/skateboard.png";
import sprout from "../images/sprout.png";
import Footer from "./Footer";

class Results extends Component {
  render() {
    var newDiv = [];

    const displaySearch = () => {
      // use searchInput when you want specific results
      Axios.get("/api/getAllItems")
        .then((res) => {
          var data = res.data;
          for (var i = 0; i < data.length; i++) {
            var itemObj = data[i];
            var title = itemObj["itemname"];
            var cost = itemObj["buyvalue"];
            var sell = itemObj["sellvalue"];

            // TODO: Insert div into with each new result
            // var temp = (
            //   <div className="searchResult">
            //     <img src={title} />
            //     <div className="searchAttributes">
            //       <p className="searchTitle" id="itemName">
            //         {title}
            //       </p>
            //       <p id="itemCost">Cost Price: {cost} currency </p>
            //       <p id="itemSell">Sell Price: {sell} currency</p>
            //     </div>
            //   </div>
            // );
            // newDiv.push(temp);
          }
        })
        .catch(() => {
          alert("Failed to Search");
        });
    };

    return (
      <div className="Construction">
        <header className="App-header">
          <img src={logo} />
        </header>
        <body>
          <div className="quoteBox">
            <p>Search Results</p>
          </div>
          <div className="searchResults" id="addToMe">
            {/* <button className="searchButton" onClick={displaySearch}>
              Get Results!
            </button> */}

            {/* TODO: insert div with each new result */}
            {/* <div>{newDiv}</div> */}

            <div className="searchResult">
              <img src={cat} />
              <div className="searchAttributes">
                <p className="searchTitle" id="itemName">
                  Cat
                </p>
                <p id="itemCost">Cost Price: 100 currency </p>
                <p id="itemSell">Sell Price: 20 currency</p>
              </div>
            </div>

            <div className="searchResult">
              <img src={dog} />
              <div className="searchAttributes">
                <p className="searchTitle" id="itemName">
                  Dog
                </p>
                <p id="itemCost">Cost Price: 100 currency</p>
                <p id="itemSell">Sell Price: 20 currency</p>
              </div>
            </div>

            <div className="searchResult">
              <img src={skateboard} />
              <div className="searchAttributes">
                <p className="searchTitle" id="itemName">
                  Skateboard
                </p>
                <p id="itemCost">Cost Price: 50 currency</p>
                <p id="itemSell">Sell Price: 10 currency</p>
              </div>
            </div>

            <div className="searchResult">
              <img src={sprout} />
              <div className="searchAttributes">
                <p className="searchTitle" id="itemName">
                  Sprout
                </p>
                <p id="itemCost">Cost Price: 200 currency</p>
                <p id="itemSell">Sell Price: 100 currency</p>
              </div>
            </div>
          </div>
        </body>
        <Footer></Footer>
      </div>
    );
  }
}

export default Results;
