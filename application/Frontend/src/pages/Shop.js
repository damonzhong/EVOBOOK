import React, { useState, Component } from "react";
//import axios from "axios"
import styled from "styled-components";
import ReactModal from "react-modal";
import cat from "../images/cat.png";
import dog from "../images/dog 1.png";
import cactus from "../images/cactus.png";
import waterBottle from "../images/water bottle.png";
import skateboard from "../images/skateboard.png";
import sword from "../images/sword.png";
import computer from "../images/computer.png";
import computerChair from "../images/computer chair.png";
import coin from "../images/coin.png";
import Header from "./Header";
import "../styles/Shop.css";
import Footer from "./Footer";
import Axios from "axios";


// Item Image on the Shop page
const ItemImage = styled.img`
  margin: 10px;
  width: 100px;
  height: 100px;
  object-fit: contain;
  cursor: pointer;
`;

// Item Image on the purchase/sell modal
const ItemImage2 = styled.img`
  margin: 10px;
  width: 150px;
  height: 150px;
  object-fit: contain;
  position: absolute;
  left: 33%;
  top: -25%;
`;

// Item image on the Sell Confirmation Modal
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

// Coin Image for modals
const CoinImage2 = styled.img`
  width: 50px;
  height: 50px;
  position: relative;
  bottom: -17.5vh;
  left: 9vh;
`;

const CustomModal = (props) => {
  const { isOpen } = props;
  return isOpen ? <ReactModal {...props} /> : null;
};

function Shop({ appUser, setAppUser }) {
  const [useCustomModal, setUseCustomModal] = React.useState(false);

  //Item Modals
  //Buy suffix -> pre-purchase modal
  //Sell suffix -> sell confirmation modal

  const [showModalCatBuy, setShowModalCatBuy] = React.useState(false);
  const [showModalCatSell, setShowModalCatSell] = React.useState(false);

  const [showModalDogBuy, setShowModalDogBuy] = React.useState(false);
  const [showModalDogSell, setShowModalDogSell] = React.useState(false);

  const [showModalCactusBuy, setShowModalCactusBuy] = React.useState(false);
  const [showModalCactusSell, setShowModalCactusSell] = React.useState(false);

  const [showModalBottleBuy, setShowModalBottleBuy] = React.useState(false);
  const [showModalBottleSell, setShowModalBottleSell] = React.useState(false);

  const [showModalSkateboardBuy, setShowModalSkateboardBuy] = React.useState(
    false
  );
  const [showModalSkateboardSell, setShowModalSkateboardSell] = React.useState(
    false
  );

  const [showModalSwordBuy, setShowModalSwordBuy] = React.useState(false);
  const [showModalSwordSell, setShowModalSwordSell] = React.useState(false);

  const [showModalComputerBuy, setShowModalComputerBuy] = React.useState(false);
  const [showModalComputerSell, setShowModalComputerSell] = React.useState(
    false
  );

  const [
    showModalComputerChairBuy,
    setShowModalComputerChairBuy,
  ] = React.useState(false);
  const [
    showModalComputerChairSell,
    setShowModalComputerChairSell,
  ] = React.useState(false);

  //Successful Purchase modal
  const [showModalPurchase, setShowModalPurchase] = React.useState(false);

  //Sell1 is Sell Confirmation Modal while Sell2 is Sold Successful Modal
  const [showModalSell1, setShowModalSell1] = React.useState(false);
  const [showModalSell2, setShowModalSell2] = React.useState(false);

  //The currency the user currently has
  const [curr, setCurr] = React.useState("");

  const [uid, setUid] = useState("");

  const ModalComponent = useCustomModal ? CustomModal : ReactModal;
  
  //getting Data from the backend
  const getCurrency =() => {
	  const body = {
		  uname: appUser
	  };
  // Request User Data from Backend

    // This should probably be in the form of a GET request instead of post
    Axios.post("/users/api/data", body).then((res) => {
      setCurr(res.data.currency);
      setUid(res.data.uid);
    });
};

  React.useEffect(() => {
    getCurrency();
    return;
  }, []);

  //console.log("This is Shop     " + appUser);
  // const [itemID, setItemID] = useState(0);
  const [itemName, setItemName] = useState('')


  const buyItem = () => {

    const body = {
      itemName: itemName,
      uid: uid,
    };
    //e.preventDefault()
    console.log('buy')
    console.log(itemName)
    console.log(uid)
    //console.log("This is Shop     " + appUser)
    // Axios.post('localhost:1234/Items/api/bItem', body)
    // if(itemID == 0){
    //   setShowModalPurchase(true)
    // }
    // else{
    //   setShowModalSell(true)
    // }
    Axios.post('/api/bItem', body)
      .then((res) => {
        console.log('res axios')
        console.log(res.data.success)
        console.log(res.data.success == true);
        if (res.data.success == true) {
          setShowModalPurchase(true)
        } else {
          console.log(res.data.response)
        }
      })
      .catch(error =>{
        console.log(error)
      })
}

const sellItem = e => {
    //e.preventDefault()
    const body = {
      itemName: itemName,
      uid: uid,
    };
    console.log('sell')
    console.log(itemName)
    console.log(uid)
    Axios.post('/api/sellItems', body)
    // if(itemID == 0){
    //   setShowModalSell2(true)
    // }
    // else if(itemID == 1){
    //   setShowModalCactusBuy(true)
    // }
    // else{
    //   setShowModalBottleBuy(true)
    // }
    .then(response => {
      console.log(response)
      setShowModalPurchase(true)
    })
    .catch(error =>{
      console.log(error)
    })
  }


  document.body.style = "background: #F6F2EF";
  return (
    <>
      <div className="Shop">
        <Header appUser={appUser} setAppUser={setAppUser}></Header>
        <div>
        <p class="userInfo">{appUser}</p>
          <div class="currencyDiv">
            <div class="content">
              <CoinImage src={coin} alt="coin" />
            </div>
            <p class="currencyInfo">{curr}</p>
          </div>
          <p class="shopText">Shop</p>
        </div>

        <ModalComponent
          isOpen={showModalPurchase}
          onRequestClose={() => setShowModalPurchase(false)}
          className="Modal2"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <p class="purchaseComplete">Purchase Complete!</p>
          <button
            class="closeButton2"
            onClick={() => {
            setShowModalPurchase(false);
          }}
        >
          Close
        </button>
      </ModalComponent>

      {/* Sell Confirmation Modal */}
      <ModalComponent
        isOpen={showModalSell2}
        onRequestClose={() => setShowModalSell2(false)}
        className="Modal2"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <p class="purchaseComplete">Sold Successfully!</p>
         <button
           class="closeButton2"
           onClick={() => {
              setShowModalSell1(false);
              setShowModalSell2(false);
            }}
          >
            Close
         </button>
      </ModalComponent>

        {/* Contains the brown background behind the 8 items */}
        <div class="bgContainer">
          <div class="flex">
            {/* Cat Item */}
            <div class="container-1-box">
              <section>
                <br />
                {/* Item Name */}
                <p class="itemName">Cat</p>
                <br />
                {/* Cat Image */}
                <ItemImage
                  src={cat}
                  alt="cat"
                  onClick={() => setShowModalCatBuy(true)}
                />
                <div class="coinDiv">
                  {/* Coin image */}
                  <div class="content">
                    <CoinImage src={coin} alt="coin" />
                  </div>
                  {/* Item Cost */}
                  <p class="currencyTextTest">1,000</p>
                </div>
                <aside>
                  {/* Purchase and sell button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalCatSell(true); setItemName('cat')}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalCatSell}
                    onRequestClose={() => setShowModalCatSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        {/*Item Description*/}
                        <p class="itemName2">Cat</p>
                        <ItemImage2 src={cat} alt="cat" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Look at him, he's so cute!"</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,000</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalCatSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Cat for 1000 Gold?
                            </p>
                            <ItemImage3 src={cat} alt="cat" />
                            <button
                              class="closeButton"
                              onClick={() => setShowModalCatSell(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalCatSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  {/* Purchase Button */}
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalCatBuy(true); setItemName('cat');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalCatBuy}
                    onRequestClose={() => setShowModalCatBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Cat</p>
                        <ItemImage2 src={cat} alt="cat" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Look at him, he's so cute!"</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,000</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalCatBuy(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalCatBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>

            {/* Dog Item */}
            <div class="container-1-box">
              <section>
                <br />
                <p class="itemName">Dog</p>
                <br />
                <ItemImage
                  src={dog}
                  alt="dog"
                  onClick={() => setShowModalDogBuy(true)}
                />
                <div class="coinDiv">
                  <CoinImage src={coin} alt="coin" />
                  <p class="currencyTextTest">1,000</p>
                </div>
                <aside>
                  {/* Purchase button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalDogSell(true); setItemName('dog');}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalDogSell}
                    onRequestClose={() => setShowModalDogSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Dog</p>
                        <ItemImage2 src={dog} alt="dog" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">
                          "A man's (or woman's) best friend."
                        </p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,000</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalDogSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Dog for 1000 Gold?
                            </p>
                            <ItemImage3 src={dog} alt="dog" />
                            <button
                              class="closeButton"
                              onClick={() => setShowModalDogSell(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalDogSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  {/* Purchase Button */}
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalDogBuy(true); setItemName('dog');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalDogBuy}
                    onRequestClose={() => setShowModalDogBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >  
                    {/* Product Details */}
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Dog</p>
                        <ItemImage2 src={dog} alt="dog" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">
                          "A man's (or woman's) best friend."
                        </p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,000</p>
                        <div class="button-box">
                          {/* Close Modal 2 */}
                          <button
                            class="closeButton"
                            onClick={() => setShowModalDogBuy(false)}
                          >
                            Close
                          </button>
                          {/* Show Modal 1 */}
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalDogBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>

            {/* Cactus Item */}
            <div class="container-1-box">
              <section>
                <br />
                <p class="itemName">Cactus</p>
                <br />
                <ItemImage
                  src={cactus}
                  alt="cactus"
                  onClick={() => setShowModalCactusBuy(true)}
                />
                <div class="coinDiv">
                  <CoinImage src={coin} alt="coin" />
                  <p class="currencyTextTest">1,500</p>
                </div>
                <aside>
                  {/* Purchase button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalCactusSell(true); setItemName('cactus');}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalCactusSell}
                    onRequestClose={() => setShowModalCactusSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Cactus</p>
                        <ItemImage2 src={cactus} alt="Cactus" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">
                          "Ouch."
                        </p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,500</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalCactusSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Cactus for 1500 Gold?
                            </p>
                            <ItemImage3 src={cactus} alt="cactus" />

                            <button
                              class="closeButton"
                              onClick={() => setShowModalCactusSell(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalCactusSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalCactusBuy(true); setItemName('cactus');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalCactusBuy}
                    onRequestClose={() => setShowModalCactusBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    {/* Product Details */}
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Cactus</p>
                        <ItemImage2 src={cactus} alt="cactus" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">
                          "Ouch."
                        </p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,500</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalCactusBuy(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalCactusBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>

            {/* Water Bottle Item */}

            <div class="container-1-box">
              <section>
                <br />
                <p class="itemName">Water Bottle</p>
                <br />
                <ItemImage
                  src={waterBottle}
                  alt="Water Bottle"
                  onClick={() => setShowModalBottleBuy(true)}
                />
                <div class="coinDiv">
                  <CoinImage src={coin} alt="coin" />
                  <p class="currencyTextTest">3,500</p>
                </div>
                <aside>
                  {/* Purchase button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalBottleSell(true); setItemName('bottle');}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalBottleSell}
                    onRequestClose={() => setShowModalBottleSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Water Bottle</p>
                        <ItemImage2 src={waterBottle} alt="Water Bottle" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"The ultimate H20 container"</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">3,500</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalBottleSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Water Bottle for 3000 Gold?
                            </p>
                            <ItemImage3 src={waterBottle} alt="Water Bottle" />

                            <button
                              class="closeButton"
                              onClick={() => setShowModalBottleSell(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalBottleSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalBottleBuy(true); setItemName('bottle');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalBottleBuy}
                    onRequestClose={() => setShowModalBottleBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    {/* Product Details */}
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Water Bottle</p>
                        <ItemImage2 src={waterBottle} alt="Water Bottle" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"The ultimate H20 container."</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,500</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalBottleBuy(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalBottleBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>
          </div>

          {/* TODO: turn this into one flex class */}

          <div class="flex">
            {/* Skateboard item */}
            <div class="container-1-box">
              <section>
                <br />
                <p class="itemName">Skateboard</p>
                <br />
                <ItemImage
                  src={skateboard}
                  alt="Skateboard"
                  onClick={() => setShowModalSkateboardBuy(true)}
                />
                <div class="coinDiv">
                  <CoinImage src={coin} alt="coin" />
                  <p class="currencyTextTest">1,100</p>
                </div>
                <aside>
                  {/* Purchase button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalSkateboardSell(true); setItemName('skateboard');}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalSkateboardSell}
                    onRequestClose={() => setShowModalSkateboardSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Skateboard</p>
                        <ItemImage2 src={skateboard} alt="Skateboard" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Totally radical."</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,100</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalSkateboardSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Skateboard for 1100 Gold?
                            </p>
                            <ItemImage3 src={skateboard} alt="Skateboard" />

                            <button
                              class="closeButton"
                              onClick={() => setShowModalSkateboardSell(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalSkateboardSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalSkateboardBuy(true); setItemName('skateboard');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalSkateboardBuy}
                    onRequestClose={() => setShowModalSkateboardBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    {/* Product Details */}
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Skateboard</p>
                        <ItemImage2 src={skateboard} alt="Skateboard" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Totally radical."</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,100</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalSkateboardBuy(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalSkateboardBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>

            {/* Sword Item */}
            <div class="container-1-box">
              <section>
                <br />
                <p class="itemName">Sword</p>
                <br />
                <ItemImage
                  src={sword}
                  alt="Sword"
                  onClick={() => setShowModalSwordBuy(true)}
                />
                <div class="coinDiv">
                  <CoinImage src={coin} alt="coin" />
                  <p class="currencyTextTest">1,600</p>
                </div>
                <aside>
                  {/* Purchase button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalSwordSell(true); setItemName('sword');}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalSwordSell}
                    onRequestClose={() => setShowModalSwordSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Sword</p>
                        <ItemImage2 src={sword} alt="Sword" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Every hero needs one."</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,600</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalSwordSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Sword for 1600 Gold?
                            </p>
                            <ItemImage3 src={sword} alt="Sword" />
                            <button
                              class="closeButton"
                              onClick={() => setShowModalSwordSell(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalSwordSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalSwordBuy(true); setItemName('sword');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalSwordBuy}
                    onRequestClose={() => setShowModalSwordBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    {/* Product Details */}
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Sword</p>
                        <ItemImage2 src={sword} alt="Sword" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Every hero needs one."</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">1,600</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalSwordBuy(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalSwordBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>

            {/* Computer Item */}
            <div class="container-1-box">
              <section>
                <br />
                <p class="itemName">Computer</p>
                <br />
                <ItemImage
                  src={computer}
                  alt="computer"
                  onClick={() => setShowModalComputerBuy(true)}
                />
                <div class="coinDiv">
                  <CoinImage src={coin} alt="coin" />
                  <p class="currencyTextTest">10,000</p>
                </div>
                <aside>
                  {/* Purchase button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalComputerSell(true); setItemName('computer');}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalComputerSell}
                    onRequestClose={() => setShowModalComputerSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Computer</p>
                        <ItemImage2 src={computer} alt="Computer" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">
                          "This is actually just a monitor."
                        </p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">10,000</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalComputerSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Computer for 10,000 Gold?
                            </p>
                            <ItemImage3 src={computer} alt="Computer" />
                            <button
                              class="closeButton"
                              onClick={() => setShowModalComputerSell(false)}
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalComputerSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalComputerBuy(true); setItemName('computer');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalComputerBuy}
                    onRequestClose={() => setShowModalComputerBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    {/* Product Details */}
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Computer</p>
                        <ItemImage2 src={computer} alt="computer" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">
                          "This is actually just a monitor."
                        </p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">10,000</p>
                        <div class="button-box">
                          {/* Close Modal 2 */}
                          <button
                            class="closeButton"
                            onClick={() => setShowModalComputerBuy(false)}
                          >
                            Close
                          </button>
                          {/* Show Modal 1 */}
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalComputerBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>

            {/* Chair item */}
            <div class="container-1-box">
              <section>
                <br />
                <p class="itemName">Chair</p>
                <br />
                <ItemImage
                  src={computerChair}
                  alt="computerChair"
                  onClick={() => setShowModalComputerChairBuy(true)}
                />
                <div class="coinDiv">
                  <CoinImage src={coin} alt="coin" />
                  <p class="currencyTextTest">650</p>
                </div>
                <aside>
                  {/* Purchase button that launches item description */}
                  <button
                    class="sellButton"
                    onClick={() => {setShowModalComputerChairSell(true); setItemName('computerchair');}}
                  >
                    Sell
                  </button>
                  <ModalComponent
                    isOpen={showModalComputerChairSell}
                    onRequestClose={() => setShowModalComputerChairSell(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Chair</p>
                        <ItemImage2 src={computerChair} alt="Computer Chair" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Give it a spin. (Get it?)"</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">650</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalComputerChairSell(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => setShowModalSell1(true)}
                          >
                            Sell
                          </button>
                          {/* Sell Modal */}
                          <ModalComponent
                            isOpen={showModalSell1}
                            onRequestClose={() => setShowModalSell1(false)}
                            className="Modal4"
                            overlayClassName="Overlay"
                          >
                            <p class="purchaseComplete">
                              Sell Computer Chair for 650 Gold?
                            </p>
                            <ItemImage3
                              src={computerChair}
                              alt="Computer Chair"
                            />
                            <button
                              class="closeButton"
                              onClick={() =>
                                setShowModalComputerChairSell(false)
                              }
                            >
                              Cancel
                            </button>
                            <button
                              class="purchaseButton2"
                              onClick={() => {sellItem(); setShowModalComputerChairSell(false);}}
                            >
                              OK
                            </button>
                          </ModalComponent>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                  <button
                    class="purchaseButton"
                    onClick={() => {setShowModalComputerChairBuy(true); setItemName('computerchair');}}
                  >
                    Purchase
                  </button>
                  {/* Modal 2 Component */}
                  <ModalComponent
                    isOpen={showModalComputerChairBuy}
                    onRequestClose={() => setShowModalComputerChairBuy(false)}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    {/* Product Details */}
                    <div class="container-1-itemBox">
                      <section>
                        <p class="itemName2">Chair</p>
                        <ItemImage2 src={computerChair} alt="computer chair" />
                        <p class="itemType">Type: Decorative</p>
                        <p class="itemDesc">"Give it a spin. (Get it?)"</p>
                        <div class="content">
                          <CoinImage2 src={coin} alt="coin" />
                        </div>
                        <p class="currencyText2">650</p>
                        <div class="button-box">
                          <button
                            class="closeButton"
                            onClick={() => setShowModalComputerChairBuy(false)}
                          >
                            Close
                          </button>
                          <button
                            class="purchaseButton2"
                            onClick={() => {{buyItem()}; {setShowModalComputerChairBuy(false);}}}
                          >
                            Purchase
                          </button>
                        </div>
                      </section>
                    </div>
                  </ModalComponent>
                </aside>
              </section>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
      );
    </>
  );
}
export default Shop;