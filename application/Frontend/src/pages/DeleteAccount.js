import React from "react";
import logo from "../images/Logo.png";
import Footer from "./Footer";
import { Redirect, Link } from "react-router-dom";

const DeleteAccount = ({appUser, setAppUser}) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleDelete = () => {
        const body = {
          uname: username,
          password: password,
        };
        setAppUser(null)
        alert("we're Sorry to See you Go")
    };

    if (!appUser) return (<Redirect to='/DeleteAccountMessage' > </Redirect>)

  return (
    <div>
      <header className="App-header">
        <Link to="/Home">
          <img src={logo} />
        </Link>
      </header>
      <fieldset className="App-body">
        <h1 class="text-danger">Delete Account</h1>
        <form  onSubmit={handleDelete}>
          <tr>
            <div>
              <input type="text" 
              placeholder="UserName" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required />
            </div>

            <div>
              <input type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required />
            </div>
          </tr>
          <tr>
          <Link to="/DeleteMessage">
            <button 
            type="submit" 
            className="btn btn-primary btn-sm m-2"
            disabled={!username || !password}
            onSubmit={handleDelete}
            >
              {" "}
              Delete{" "}
            </button>
            </Link>
          </tr>
        </form>
      </fieldset>
      <Footer></Footer>
    </div>
  );
};

export default DeleteAccount;
