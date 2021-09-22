import React, { useState, Component } from "react";
import Axios from 'axios';
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

import { Link } from "react-router-dom";
import Footer from "./Footer";

const ItemImage = styled.img`
  margin: 10px;
  width: 100px;
  height: 100px;
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

function Shop({ appUser, setAppUser }) {
  const [useCustomModal, setUseCustomModal] = React.useState(false);

  const [showModalCat2, setShowModalCat2] = React.useState(false);

  //   TODO: Change Cat4 and Cat5 to corresponding Sell Modals

  const [showModalDog2, setShowModalDog2] = React.useState(false);

  const [showModalCactus2, setShowModalCactus2] = React.useState(false);

  const [showModalBottle2, setShowModalBottle2] = React.useState(false);

  //Item Modals
  //Buy suffix -> pre-purchase modal
  //Sell suffix -> sell confirmation modal

  const [showModalCatSell, setShowModalCatSell] = React.useState(false);
  const [showModalDogSell, setShowModalDogSell] = React.useState(false);
  const [showModalCactusSell, setShowModalCactusSell] = React.useState(false);
  const [showModalBottleSell, setShowModalBottleSell] = React.useState(false);
  const [showModalSkateboardSell, setShowModalSkateboardSell] = React.useState(false);
  const [showModalSwordSell, setShowModalSwordSell] = React.useState(false);
  const [showModalSword2, setShowModalSword2] = React.useState(false);
  const [showModalComputerSell, setShowModalComputerSell] = React.useState(false);
  const [showModalComputerChairSell, setShowModalComputerChairSell] = React.useState(false);

  //Sell1 is Sell Confirmation Modal while Sell2 is Sold Successful Modal
  const [showModalSell1, setShowModalSell1] = React.useState(false);
  const [showModalSell2, setShowModalSell2] = React.useState(false);

  //Successful Purchase modal
  const [showModalPurchase, setShowModalPurchase] = React.useState(false);

    //The currency the user currently has
    const [curr, setCurr] = React.useState("");
    const [uid, setUid] = React.useState("");
    const [myItems, setMyItems] = React.useState([]);
    const [itemName, setItemName] = useState('');

    //Item Quantity
  const [catQuantity, setCatQuantity] = useState(0);
  const [dogQuantity, setDogQuantity] = useState(0);
  const [cactusQuantity, setCactusQuantity] = useState(0);
  const [waterBottleQuantity, setWaterBottleQuantity] = useState(0);
  const [skateboardQuantity, setSkateboardQuantity] = useState(0);
  const [swordQuantity, setSwordQuantity] = useState(0);
  const [computerQuantity, setComputerQuantity] = useState(0);
  const [chairQuantity, setChairQuantity] = useState(0);

  const ModalComponent = useCustomModal ? CustomModal : ReactModal;
  
  //getting Data from the backend
  const getUserItems =() => {
	  const body = {
		  uname: appUser,
      //uid: uid,
	  };

  // Request User Data from Backend

    // This should probably be in the form of a GET request instead of post
    Axios.post("/users/api/data", body).then((res) => {
      const body2 = {
        uid: res.data.uid
      };
      Axios.post("/api/userItems", body2).then((res) => {
      //console.log("///// front end dataarry with inventory items:  " + res.data.items)
      setMyItems(res.data.items);
      itemCount(res.data.items);
      });
      setCurr(res.data.currency);
      setUid(res.data.uid);
    });

    // const body2 = {
    //   uid: uid
	  // };

    // axios.post("/api/userItems", body2).then((res) => {
    //   console.log("came back to inventory .js")
    // });
};

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

const itemCount = (myItems) => {
  var numofCats = 0;
  var numofDogs = 0;
  var numofCactus = 0;
  var numofWaterBottle = 0;
  var numofSkateboard = 0;
  var numofSword = 0;
  var numofComputer = 0;
  var numofComputerChair = 0;
  
  

  //Loops through items in inventory and updates the states for that particular item
for (var i = 0; i < myItems.length; i++){
  if(myItems[i] == "\"cat\""){
    console.log("This is A Cat Item");
    numofCats++;
  }
  else if(myItems[i] == "\"dog\""){
    console.log("This is A Dog Item");
    numofDogs++;
    
  }
  else if(myItems[i] == "\"cactus\""){
    numofCactus++;
  }
  else if(myItems[i] == "\"waterBottle\""){
    numofWaterBottle++;
  }
  else if(myItems[i] == "\"skateboard\""){
    console.log("This is A Skateboard Item");
    numofSkateboard++;    
  }
  else if(myItems[i] == "\"sword\""){
    numofSword++;    
  }
  else if(myItems[i] == "\"computer\""){
    numofComputer++;
  }
  else if(myItems[i] == "\"computerChair\""){
    numofComputerChair++;
  }
}
setCatQuantity(numofCats);
setDogQuantity(numofDogs);
setCactusQuantity(numofCactus);
setWaterBottleQuantity(numofWaterBottle);
setSkateboardQuantity(numofSkateboard);
setSwordQuantity(numofSword);
setComputerQuantity(numofComputer);
setChairQuantity(numofComputerChair);

}


  React.useEffect(() => {
    //getCurrency();
    getUserItems();
    return;
  }, []);

  

  const placeItem = () => {
    alert(`You are attempting to place a decorative item!\n

    This requires more backend development. Please check back later!`);
  };


  document.body.style = "background: #F6F2EF";
  //console.log("This is Inventory     " + appUser);
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
                  onClick={() => setShowModalCat2(true)}
                />

                {/* Coin image */}

                <div class="coinDiv">
                  {/* Item Cost */}
                  <p class="currencyTextTest">Owned: {catQuantity}</p>
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

                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
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
                  onClick={() => setShowModalDog2(true)}
                />

                <div class="coinDiv">
                  <p class="currencyTextTest">Owned: {dogQuantity}</p>
                </div>

                <aside>
                  {/* Purchase button that launches item description */}

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

                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
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
                  onClick={() => setShowModalCactus2(true)}
                />
                <div class="coinDiv">
                  <p class="currencyTextTest">Owned: {cactusQuantity}</p>
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

                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
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
                  alt="water bottle"
                  onClick={() => setShowModalBottle2(true)}
                />

                <div class="coinDiv">
                  <p class="currencyTextTest">Owned: {waterBottleQuantity}</p>
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

                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
                </aside>
              </section>
            </div>
          </div>

          {/* TODO: turn this into one flex class */}

          <div class="flex">
            <div class="container-1-box">
            <section>
                <br />
                <p class="itemName">Skateboard</p>
                <br />
                <ItemImage
                  src={skateboard}
                  alt="skateboard"
                />
                <div class="coinDiv">
                  <p class="currencyTextTest">Owned: {skateboardQuantity}</p>
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

                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
                </aside>
              </section>                   
            </div>
                
            <div class="container-1-box">
            <section>
                <br />
                <p class="itemName">Sword</p>
                <br />
                <ItemImage
                  src={sword}
                  alt="sword"
                  onClick={() => setShowModalSword2(true)}
                />
                <div class="coinDiv">
                  <p class="currencyTextTest">Owned: {swordQuantity}</p>
                </div>

                <aside>
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

                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
                </aside>
              </section>                   
            </div>

            <div class="container-1-box">
            <section>
                <br />
                <p class="itemName">Computer</p>
                <br />
                <ItemImage
                  src={computer}
                  alt="computer"
                  onClick={() => setShowModalBottle2(true)}
                />
                <div class="coinDiv">
                  <p class="currencyTextTest">Owned: {computerQuantity}</p>
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
                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
                </aside>
              </section>
            </div>

            <div class="container-1-box">
            <section>
                <br />
                <p class="itemName">Chair</p>
                <br />

                <ItemImage
                  src={computerChair}
                  alt="computer chair"
                  onClick={() => setShowModalBottle2(true)}
                />

                <div class="coinDiv">
                  <p class="currencyTextTest">Owned: {chairQuantity}</p>
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

                  <button class="purchaseButton" onClick={placeItem}>
                    Place
                  </button>
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
