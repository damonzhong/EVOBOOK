import React, { useState, Component } from "react";
import axios from 'axios'
import styled from "styled-components";
import ReactModal from "react-modal";
import sprout from "../images/sprout.png";

import coin from "../images/coin.png";
import Header from "./Header";
import "../styles/Shop.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const ItemImage = styled.img`
  margin: 10px;
  width: 200px;
  height: 150px;
  object-fit: contain;
  cursor: pointer;
`;

const ItemImage2 = styled.img`
  margin: 10px;
  width: 150px;
  height: 150px;
  object-fit: contain;
  position: absolute;
  left: 33%;
  top: -25%;
`;

const ItemImage3 = styled.img`
  margin: 10px;
  width: 150px;
  height: 150px;
  object-fit: contain;
  position: absolute;
  left: 33%;
  top: 30%;
`;

const CoinImage = styled.img`
  width: 50px;
  height: 50px;
`;

const CoinImage2 = styled.img`
  width: 50px;
  height: 50px;
  position: relative;
  bottom: -17.3vh;
  left: 9vh;
`;

const CustomModal = (props) => {
  const { isOpen } = props;
  return isOpen ? <ReactModal {...props} /> : null;
};

const useItem = () => {
  alert(`You are attempting to use a progressive item!\n
    This requires more backend development. Please check back later!`);
};

function Shop({ appUser, setAppUser }) {
  const [useCustomModal, setUseCustomModal] = React.useState(false);
  const [showModalCat1, setShowModalCat1] = React.useState(false);
  const [showModalCat2, setShowModalCat2] = React.useState(false);
  const [showModalCat3, setShowModalCat3] = React.useState(false);

  //   TODO: Change Cat4 and Cat5 to corresponding Sell Modals
  const [showModalCat4, setShowModalCat4] = React.useState(false);
  const [showModalCat5, setShowModalCat5] = React.useState(false);

    //The currency the user currently has
    const [curr, setCurr] = React.useState("");

  const ModalComponent = useCustomModal ? CustomModal : ReactModal;

  
  //getting Data from the backend
  const getCurrency =() => {
	  const body = {
		  uname: appUser
	  };
  // Request User Data from Backend

    // This should probably be in the form of a GET request instead of post
    axios.post("/users/api/data", body).then((res) => {
      setCurr(res.data.currency);
    });
};

  React.useEffect(() => {
    getCurrency();
    return;
  }, []);


  //   const deleteHabit = () => {
  //     alert(`You are attempting to delete your habit.\n
  //     This requires more backend development. Please check back later!`);
  //     setShowHabitEdit(false);
  //   };
  //console.log("This is Inventory Progressive     " + appUser);
  document.body.style = "background: #F6F2EF";
  return (
    <>
      <div className="Inventory">
        <Header appUser={appUser} setAppUser={setAppUser}></Header>

        <p class="userInfo">{appUser}</p>
        <div class="currencyDiv">
          <div>
            <CoinImage src={coin} alt="coin" />
          </div>
          <p class="currencyInfo">{curr}</p>
        </div>
        <div>
          <p class="shopText">Inventory</p>
        </div>

        <div>
          <Link to="/Inventory">
            <button class="decorativeButton">Decorative</button>
          </Link>
          <Link to="/inventoryProgressive">
            <button class="progressiveButton">Progressive</button>
          </Link>
        </div>

        <div class="bgContainer">
          <div class="flex">
            {/* Cat Item */}

            <div class="container-1-box">
              <section>
                <br />
                {/* Item Name */}
                <p class="itemName">Sprout</p>
                <br />
                {/* Cat Image */}
                <ItemImage
                  src={sprout}
                  alt="sprout"
                  onClick={() => setShowModalCat2(true)}
                />
                <br />
                <br />
                <aside>
                  {/* Purchase and sell button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => setShowModalCat3(true)}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalCat3}
                    onRequestClose={() => setShowModalCat3(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Sprout</p>
                        <ItemImage2 src={sprout} alt="sprout" />
                        <p class="itemType">Type: Progressive</p>
                        <p class="itemDesc">"Your journey begins here."</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,000</p>
                        <div class="button-box">
                          {/* Close Modal 2 */}
                          <button
                            class="closeButton"
                            onClick={() => setShowModalCat3(false)}
                          >
                            Close
                          </button>
                          {/* Show Modal 1 */}
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalCat4(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalCat4}
                            onRequestClose={() => setShowModalCat4(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Cat for 1000 Gold?
                            </p>
                            <ItemImage3 src={sprout} alt="sprout" />

                            <button
                              class="closeButton"
                              onClick={() => setShowModalCat3(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => setShowModalCat5(true)}
                            >
                              OK
                            </button>
                            {/* Sell Confirmation Modal */}
                            <ModalComponent
                              isOpen={showModalCat5}
                              onRequestClose={() => setShowModalCat5(false)}
                              className="Modal2"
                              overlayClassName="Overlay"
                            >
                              <p class="purchaseComplete">Sold Successfully!</p>
                              <button
                                class="closeButton2"
                                onClick={() => {
                                  setShowModalCat3(false);
                                  setShowModalCat4(false);
                                  setShowModalCat5(false);
                                }}
                              >
                                Close
                              </button>
                            </ModalComponent>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>

                  <button class="purchaseButton" onClick={useItem}>
                    Use
                  </button>
                </aside>
              </section>
            </div>

            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
          </div>

          {/* TODO: turn this into one flex class */}

          <div class="flex">
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
          </div>
          <div class="flex">
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
          </div>
          <div class="flex">
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
            <div class="container-1-box"></div>
          </div>
        </div>

        <Footer></Footer>
      </div>
      );
    </>
  );
}

export default Shop;
