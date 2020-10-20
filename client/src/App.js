import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Browsing from './pages/Browsing';
import SignUp from "../src/pages/SignUp";
import API from "./utils/API.js";

function App() {
  // state = {
  //   currentUser: []
  // };

  // checkForUser = () => {
  //   API.getCurrentGoogleUser()
  //     .then(res => {
  //       console.log("res.data inside App.js: ", res.data);
  //     })
  // }
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={"/"} component = { Login } />
          <Route exact path={"/signup"} component = { SignUp } />
          <Route exact path={"/profile"} component = { Profile } />
          <Route exact path={"/browsing"} component = { Browsing } />
        </Switch>
      </div>
    </Router>
  ); 
}
export default App;