import React from "react";
import Header from "./Header";
import "../styles/Settings.css";
import "../styles/Insights.css";
import "../styles/ActivityBook.css";
import Footer from "./Footer";
import ReactModal from "react-modal";

const SettingsProfile = ({ appUser, setAppUser }) => {
    const ModalComponent = ReactModal;
    const [showSave, setShowSave] = React.useState(false);


    const General = () => {
        window.location.replace("/Settings");
      };
      const Profile = () => {
        setShowSave(false)
        window.location.replace("/SettingsProfile");
      };
      //console.log("This is Settings Profile     " + appUser);
    return (
      <div>
        <Header appUser={appUser} setAppUser={setAppUser}></Header>
  
        <ModalComponent
          isOpen={showSave}
          onRequestClose={() => setShowSave(false)}
          className="popUpWindow centerJust"
          overlayClassName="Overlay"
        >
          <p class="brownText popNormalText">
            Your settings have been saved successfully
          </p>
  
          <div class="flexRow centerJust">
            <p class="bigGreenButton" onClick={Profile}>
              Close
            </p>
          </div>
        </ModalComponent>
  
        <div class="setting">
          <h1>Settings</h1>
          <button class="General-button-Profile" onClick={General}>General</button>
        <button class="Profile-button-Profile" onClick={Profile}>Profile</button>
          <form class="setting-form" id="form-s">
            <label class="Setting-form-header">Profile</label>
            <label class="Setting-form-field">Create Nickname</label>
            <div>
              Nickname: {" "}
              <input type="text" placeholder="Nickname"/>
            </div>
            <div>
              <input type="checkbox"></input>
            {" "}Show Nickname instead of Username
            </div>

            <div>
              Change Profile Picture {" "}
              <input type="file"></input>
            </div>
          </form>
  
          <div>
            <button
              id="saveButton"
              type="submit"
              className="settingSubmitButton"
              onClick={() => setShowSave(true)}
            >
              Save
            </button>
          </div>
        </div>
  
        <Footer></Footer>
      </div>
    );
};

export default SettingsProfile;