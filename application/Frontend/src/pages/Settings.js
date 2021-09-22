import React from "react";
import Header from "./Header";
import "../styles/Settings.css";
import "../styles/Insights.css";
import "../styles/ActivityBook.css";
import Footer from "./Footer";
import ReactModal from "react-modal";

const Settings = ({ appUser, setAppUser }) => {
  const ModalComponent = ReactModal;
  const [showDelete, setShowDelete] = React.useState(false);
  const [showSave, setShowSave] = React.useState(false);

  const deleteAccount = () => {
    setShowDelete(false);
    // return <Redirect to="/Delete" />;
    window.location.replace("/DeleteAccount");
  };

  const General = () => {
    setShowSave(false);
    window.location.replace("/Settings");
  };
  const Profile = () => {
    window.location.replace("/SettingsProfile");
  };

  //console.log("This is Settings     " + appUser);

  return (
    <div>
      <Header appUser={appUser} setAppUser={setAppUser}></Header>

      <ModalComponent
        isOpen={showDelete}
        onRequestClose={() => setShowDelete(false)}
        className="popUpWindow centerJust"
        overlayClassName="Overlay"
      >
        <p class="brownText popNormalText">
          Are you sure you want to delete this account?
        </p>

        <div class="flexRow centerJust">
          <p class="bigRedOutlineButton" onClick={(e) => setShowDelete(false)}>
            No
          </p>

          <p class="bigGreenButton" onClick={deleteAccount}>
            Yes
          </p>
        </div>
      </ModalComponent>

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
          <p class="bigGreenButton" onClick={General}>
            Close
          </p>
        </div>
      </ModalComponent>

      <div class="setting">
        <h1>Settings</h1>
        <button class="General-button" onClick={General}>
          General
        </button>
        <button class="Profile-button" onClick={Profile}>
          Profile
        </button>
        <form class="setting-form" id="form-s">
          <label class="Setting-form-header">Account</label>
          <label class="Setting-form-field">Change Email</label>
          <div>
            New Email: <input type="text" placeholder="Email" />
          </div>
          <label></label>
          <label class="Setting-form-field">Change Password</label>
          <div>
            Old Password: <input type="password" placeholder="Old Password" />
          </div>
          <div>
            New Password:{" "}
            <input type="text" type="password" placeholder="New Password" />
          </div>
          <div>
            Confirm New Password:{" "}
            <input type="password" placeholder="Confirm" />
          </div>
          <div>
            <button
              type="submit"
              value="submit"
              className="settingSubmitButton"
            >
              Submit
            </button>
          </div>
          <fieldset>
            <a
              className="deleteAccountButton"
              onClick={() => setShowDelete(true)}
            >
              Delete Account
            </a>
          </fieldset>
          <label class="Setting-form-header">Notifications</label>
          <div>
            <input type="checkbox"></input> Enable Email Notification
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

export default Settings;
