import "./App.css";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import Test from "./pages/getAllItems";
import Login from "./pages/login";
import Register from "./pages/Register";
import Construction from "./pages/Construction";
import Results from "./pages/Results";
import Header from "./pages/Header";
import ActivityBook from "./pages/ActivityBook";
import Insights from "./pages/Insights";
import Shop from "./pages/Shop";
import Inventory from "./pages/Inventory";
import InventoryProgressive from "./pages/InventoryProgressive";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SettingsProfile from "./pages/SettingsProfile";
import DeleteAccount from "./pages/DeleteAccount";
import DeleteAccountMessage from "./pages/DeleteAccountMessage";

const App = () => {
  const [appUser, setAppUser] = React.useState(null);

  React.useEffect(() => {
    /*
    const userLoggedIn = localStorage.getItem('user');
    console.log(userLoggedIn);
    if (userLoggedIn) setAppUser(userLoggedIn);
    */
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="NavBar">
          {!appUser && (
            <Link class="navLink" to="/home">
              Home
            </Link>
          )}

          {!appUser && (
            <Link class="navLink" to="/Construction">
              Contact Us
            </Link>
          )}

          {!appUser && (
            <Link class="navLink" to="/Construction">
              FAQ
            </Link>
          )}

          {!appUser && (
            <Link class="navLink" to="/Login">
              Login
            </Link>
          )}

          {!appUser && (
            <Link class="navLink" to="/Register">
              Register
            </Link>
          )}
        </div>

        <Switch>
          <Route path="/Construction">
            <Construction />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Login">
            <Login appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Register">
            <Register appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/getAllItems">
            <Test />
          </Route>
        </Switch>

        <Switch>
          <Route path="/home">
            <Home appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Results">
            <Results />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Header">
            <Header appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/ActivityBook">
            <ActivityBook appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Shop">
            <Shop appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Insights">
            <Insights appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Inventory">
            <Inventory appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Settings">
            <Settings appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/InventoryProgressive">
              <InventoryProgressive appUser={appUser} setAppUser={setAppUser} />
            </Route>
          </Switch>

        <Switch>
          <Route path="/Profile">
            <Profile appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>

        <Switch>
          <Route path="/SettingsProfile">
            <SettingsProfile appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>


        <Switch>
          <Route path="/DeleteAccount">
              <DeleteAccount appUser={appUser} setAppUser={setAppUser} />
            </Route>
          </Switch>

          <Switch>
          <Route path="/DeleteAccountMessage">
              <DeleteAccountMessage appUser = {appUser} setAppUser={setAppUser} />
            </Route>
          </Switch>


        <Switch>
          <Route exact path="/">
            <Home appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;