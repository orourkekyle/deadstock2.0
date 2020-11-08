import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Browsing from './pages/Browsing';
import SignUp from "../src/pages/SignUp";
// import API from "./utils/API.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { NavbarText } from 'reactstrap';

class App extends Component {

  // state = {
  //   user: {},
  //   authenticated: false,
  //   error: null,
  // };

  componentDidMount = () => {
    fetch("http://localhost:3001/", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response  => {
      if (response.status === 200) {
        redirect("/profile");
      }
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/browsing"} component={Browsing} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;